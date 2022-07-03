interface AttrsArray extends Array<[string, string | number]> {
  [Symbol.toPrimitive]?: (hint: string) => string | AttrsArray
}

type AttrsObject = {
  [K in string]: string | number
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

  private static cssRegexp = /([\w-]+):\s*"?([\d\w]+)\s*"?;?\s*$/gm

  static css(str: string): AttrsArray {
    const lines = [...(str.matchAll(SvgElement.cssRegexp) ?? [])]
    const attrs = lines.map(
      ([_, ...rest]) => rest as [string, string]
    ) as AttrsArray

    attrs.toString = () =>
      `"${attrs.reduce((acc, [key, val]) => acc + `${key}:${val};`, '')}"`
    attrs[Symbol.toPrimitive] = (hint): string | AttrsArray => attrs.toString()

    return attrs
  }

  setAttrs(attrs: Attrs) {
    const collection = Array.isArray(attrs) ? attrs : Object.entries(attrs)
    collection.forEach(([attr, value]) =>
      this.#ref.deref()?.setAttribute(attr, value as string)
    )
  }

  set style(str: string) {
    const style = SvgElement.css(str).toString()
    this.setAttrs({ style })
  }
}

export const css = SvgElement.css
