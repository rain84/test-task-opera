type Attr = string | number | AttrsArray

interface AttrsArray extends Array<[string, Attr]> {
  [Symbol.toPrimitive]?: (hint: string) => string | AttrsArray
}

type AttrsObject = {
  [K in string]: Attr
}

export type Attrs = AttrsArray | AttrsObject

export class SvgElement<T extends SVGElement> {
  #ref: WeakRef<T>

  constructor(node: Maybe<T>) {
    if (!node)
      throw new Error('class SvgElement: passed wrong node object on creation')

    this.#ref = new WeakRef(node)
  }

  get node() {
    return this.#ref.deref()
  }

  private static regexp = {
    css: /([\w-]+):\s+"?(.+)\b/gm,
    lineBreaks: /\n+\t+(\/\/\s+.*\n\s+)*/g,

		//	TODO: maybe should remove?
		camelCase: /([A-Z]?[a-z-]+)/g,
  }

  static css(str: string): AttrsArray {
    const lines = [...(str.matchAll(SvgElement.regexp.css) ?? [])]
    const attrs = lines.map(
      ([_, ...rest]) => rest as [string, string]
    ) as AttrsArray

    attrs.toString = () =>
      `${attrs.reduce((acc, [key, val]) => acc + `${key}:${val};`, '')}`
    attrs[Symbol.toPrimitive] = (): string | AttrsArray =>
      `${attrs.reduce((acc, [key, val]) => acc + `${key}:${val};`, '')}`

    return attrs
  }

  get attrs(): AttrsObject {
    return (
      this.node?.getAttributeNames().reduce<AttrsObject>((attrs, name) => {
        const attr = this.node?.getAttribute(name)
        if (attr) attrs[name] = attr
        return attrs
      }, {}) ?? {}
    )
  }

  set attrs(attrs: Attrs) {
    const collection = Array.isArray(attrs) ? attrs : Object.entries(attrs)
    if (!collection.length) return

    collection.forEach(([attr, value]) => {
      const sanitizedValue = value
        .toString()
        .replace(SvgElement.regexp.lineBreaks, '')
      this.node?.setAttribute(attr, sanitizedValue)
    })
  }

  get style() {
    return this.node?.getAttribute('style') ?? ''
  }

  set style(str: string) {
    const style = SvgElement.css(str).toString()
    this.attrs = { style }
  }
}

export const css = SvgElement.css
