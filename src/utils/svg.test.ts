import { SvgElement } from './svg'

describe('Util', () => {
  describe('class SvgElement', () => {
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
      expect(`${cssAttrs}`).toBe('"width:100;height:200;"')
      expect('' + cssAttrs).toBe('"width:100;height:200;"')
      expect(cssAttrs.toString()).toBe('"width:100;height:200;"')
      expect(cssAttrs).toEqual([
        ['width', '100'],
        ['height', '200'],
      ])
    })
  })
})
