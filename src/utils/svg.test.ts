import { SvgElement } from './svg'

describe('Util', () => {
  describe('class SvgElement', () => {
    const { stringify } = JSON
    let svg: SvgElement<SVGSVGElement>

    beforeEach(() => {
      svg = new SvgElement<SVGSVGElement>(
        document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      )
      console.log(svg)
    })

    it('should exist', () => {
      expect(SVGSVGElement.name).toBe('SVGSVGElement')
    })

    it('should be creatable', () => {
      expect(svg.node instanceof SVGSVGElement).toBeTruthy()
    })

    it('should have .css()', () => {
      const cssAttrs = SvgElement.css(`
			width: 100
			height: 200
			`)

      expect(Array.isArray(cssAttrs)).toBeTruthy()
      expect(`${cssAttrs}`).toBe('width:100;height:200;')
      expect('' + cssAttrs).toBe('width:100;height:200;')
      expect(cssAttrs.toString()).toBe('width:100;height:200;')
      expect(String(cssAttrs)).toBe('width:100;height:200;')
      expect(stringify(cssAttrs)).toBe(
        stringify([
          ['width', '100'],
          ['height', '200'],
        ])
      )
    })

    it('should have attrs() setter', () => {
      svg.attrs = {
        width: 100,
        height: 200,
        strokeDasharray: '0 0',
        someCamelCasedProp: 'value',
        style: SvgElement.css(`
					fill:  yellow
					border: 1px solid;
					box-sizing: "content-box"

					background-color: ${'green'}
      	`),
      }

      expect(svg.node?.getAttribute('width')).toBe('100')
      expect(svg.node?.getAttribute('height')).toBe('200')
      expect(svg.node?.getAttribute('stroke-dasharray')).toBe('0 0')
      expect(svg.node?.getAttribute('some-camel-cased-prop')).toBe('value')
      expect(svg.node?.style.fill).toBe('yellow')
      expect(svg.node?.style.border).toBe('1px solid')
      expect(svg.node?.style.boxSizing).toBe('content-box')
      expect(svg.node?.style.backgroundColor).toBe('green')
    })

    it('should have attrs() getter', () => {
      expect(svg.attrs).toEqual({})

      let attrs: Record<string, string | number> = {
        width: 100,
        height: 200,
      }

      svg.attrs = attrs
      expect(svg.node?.getAttributeNames()).toEqual(Object.keys(attrs))
      expect(svg.attrs).toEqual(convertValuesToStrings(attrs))

      const style = SvgElement.css(`
			fill:  yellow
			border: 1px solid;
			box-sizing: "content-box"

			background-color: ${'green'}
			`)

      Object.assign(attrs, { style })
      svg.attrs = attrs
      expect(svg.attrs).toEqual(convertValuesToStrings(attrs))
    })

    it('should have style() setter', () => {
      svg.style = `
      	fill:  yellow
      	border: 1px solid;
      	box-sizing: "content-box"

      	background-color: ${'green'}
      `
      expect(svg.node?.style.fill).toBe('yellow')
      expect(svg.node?.style.border).toBe('1px solid')
      expect(svg.node?.style.boxSizing).toBe('content-box')
      expect(svg.node?.style.backgroundColor).toBe('green')
    })

    it('should have style() getter', () => {
      expect(svg.style).toBeFalsy()

      svg.style = `
      	fill:  yellow
      	border: 1px solid;
      	box-sizing: "content-box"

      	background-color: ${'green'}
				`
      expect(svg.style).toBe(
        'fill:yellow;border:1px solid;box-sizing:content-box;background-color:green;'
      )
    })
  })
})

function convertValuesToStrings(obj: Record<string, string | number>) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [key, val.toString()])
  )
}
