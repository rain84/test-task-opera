import { addEventListeners, canProcess, omit, filterClassName } from './misc'

describe('Utils', () => {
  describe('Misc', () => {
    describe('addEventListeners()', () => {
      document.body.innerHTML = `
    	<svg width="136" height="136" viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
    	<circle class='bg bg-inner' cx="0" cy="68" r="68" fill="white"
    	style="filter: drop-shadow(0px 4px 5px rgba(190, 200, 216, 0.5))" />
    	<circle class="arc arc-outer" cx="100" cy="100" r="100" stroke-width="1" stroke="#00D2DF" fill="none"
    	stroke-dasharray="0 0">
    	</circle>
    	</svg>
    	`.trim()

      const nodes: MaybeUndefined<SVGElement>[] = []

      beforeEach(() => {
        nodes[0] = document.body.children[0] as SVGElement
        nodes[1] = nodes[0].children[0] as SVGElement
        nodes[2] = nodes[0].children[1] as SVGElement
      })

      it('should have svg-nodes', () => {
        expect(nodes[0]?.tagName).toBe('svg')
        expect(nodes[1]?.tagName).toBe('circle')
        expect(nodes[2]?.tagName).toBe('circle')
      })

      it('addEventListeners', () => {
        expect(typeof addEventListeners([]) === 'function').toBeTruthy()

        const onClick = jest.fn()
        const onMouseDown = jest.fn()
        const unsubscribe = addEventListeners([
          ['click', onClick, ...nodes],
          ['mousedown', onMouseDown, ...nodes],
        ])

        nodes.forEach((node) =>
          ['click', 'mousedown'].forEach((type) =>
            node?.dispatchEvent(new MouseEvent(type))
          )
        )

        expect(onClick.mock.calls.length).toBe(3)
        expect(onMouseDown.mock.calls.length).toBe(3)

        const removeEventListener = jest.fn()
        nodes.forEach(
          (node) => (node!.removeEventListener = removeEventListener)
        )
        unsubscribe()
        const { results, calls } = removeEventListener.mock

        expect(calls.length).toBe(6)
        expect(
          calls.every(
            ([type, listener]) =>
              (type === 'click' && listener === onClick) ||
              (type === 'mousedown' && listener === onMouseDown)
          )
        ).toBeTruthy()
        expect(results.every((res) => res.type === 'return')).toBeTruthy()
      })
    })

    describe('canProcess', () => {
      it('should work', () => {
        const truthyObject = {
          prop1: 'val1',
          prop2: 'val2',
        }

        expect(canProcess({})).toBeTruthy()
        expect(canProcess(truthyObject)).toBeTruthy()

        const falsyObject = {
          prop1: null,
          prop2: 'val2',
          prop3: undefined,
        }
        expect(canProcess(falsyObject)).not.toBeTruthy()
      })
    })

    describe('omit', () => {
      it('should work', () => {
        const obj = { a: 1, b: 2, c: 3 }
        expect(omit(obj)).toMatchObject(obj)
        expect(omit(obj, 'a')).toMatchObject({ b: 2, c: 3 })
        expect(omit(obj, 'a', 'b')).toMatchObject({ c: 3 })
        expect(omit(obj, 'a', 'b', 'c')).toMatchObject({})
      })
    })

    describe('filterClassName', () => {
      it('should work', () => {
        const className =
          'w-[8px] h-[8px] top-1 right-1 absolute z-10 bg-red animate-pulse'
        expect(filterClassName()).toBe('')
        expect(filterClassName(className)).toBe(className)
        expect(filterClassName(className, 'non-existent')).toBe(className)
        expect(filterClassName(className, 'bg-red', 'animate-pulse')).toBe(
          'w-[8px] h-[8px] top-1 right-1 absolute z-10'
        )
        expect(filterClassName(className, 'bg', 'animate')).toBe(
          'w-[8px] h-[8px] top-1 right-1 absolute z-10'
        )
      })
    })
  })
})
