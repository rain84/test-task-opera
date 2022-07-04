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

  constructor(node: T) {
    this.#ref = new WeakRef(node)
  }

  get node() {
    return this.#ref.deref()
  }

  private static regexp = {
    css: /([\w-]+):\s+"?(.+)\b/gm,
    lineBreaks: /\n+\t+/g,
  }

  static css(str: string): AttrsArray {
    const lines = [...(str.matchAll(SvgElement.regexp.css) ?? [])]
    const attrs = lines.map(
      ([_, ...rest]) => rest as [string, string]
    ) as AttrsArray

    attrs.toString = () =>
      `${attrs.reduce((acc, [key, val]) => acc + `${key}:${val};`, '')}`
    attrs[Symbol.toPrimitive] = (hint): string | AttrsArray =>
      `${attrs.reduce((acc, [key, val]) => acc + `${key}:${val};`, '')}`

    return attrs
  }

  setAttrs(attrs: Attrs) {
    const collection = Array.isArray(attrs) ? attrs : Object.entries(attrs)
    collection.forEach(([attr, value]) => {
      const sanitizedValue = value
        .toString()
        .replace(SvgElement.regexp.lineBreaks, '')
      this.#ref.deref()?.setAttribute(attr, sanitizedValue)
    })
    return this
  }

  set style(str: string) {
    const style = SvgElement.css(str).toString()
    this.setAttrs({ style })
  }
}

export const css = SvgElement.css
