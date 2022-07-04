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

    it('should have .setAttrs()', () => {
      svg.attrs = {
        width: 100,
        height: 200,
        style: SvgElement.css(`
					fill:  yellow
					border: 1px solid;
					box-sizing: "content-box"

					background-color: ${'green'}
      	`),
      }

      expect(svg.node?.getAttribute('width')).toBe('100')
      expect(svg.node?.getAttribute('height')).toBe('200')
      expect(svg.node?.style.fill).toBe('yellow')
      expect(svg.node?.style.border).toBe('1px solid')
      expect(svg.node?.style.boxSizing).toBe('content-box')
      expect(svg.node?.style.backgroundColor).toBe('green')
    })

    it('should have "set style()"', () => {
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
  })
})
