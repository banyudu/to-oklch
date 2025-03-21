import { transform } from '../index.mjs'
import { test, expect } from 'vitest'

test('transform hex colors', () => {
  const cssContent = `
      body {
        background-color: #f00;
        color: #00f;
        border-color: #fafafa;
      }
    `

  const transformed = transform(cssContent)

  expect(transformed).toBe(`
      body {
        background-color: oklch(0.628 0.258 29.234) /* rgba: rgb(255, 0, 0), hex: #f00 */;
        color: oklch(0.452 0.313 264.052) /* rgba: rgb(0, 0, 255), hex: #00f */;
        border-color: oklch(0.985 0 0) /* rgba: rgb(250, 250, 250), hex: #fafafa */;
      }
    `)
})


test('transform rgb colors', () => {
  const cssContent = `
      body {
        background-color: rgb(255, 0, 0);
        color: rgb(0, 0, 255);
        border-color: rgba(250, 250, 250, 0.5);
      }
    `

  const transformed = transform(cssContent)

  expect(transformed).toBe(`
      body {
        background-color: oklch(0.628 0.258 29.234) /* rgba: rgb(255, 0, 0), hex: #f00 */;
        color: oklch(0.452 0.313 264.052) /* rgba: rgb(0, 0, 255), hex: #00f */;
        border-color: oklch(0.985 0 0) /* rgba: rgba(250, 250, 250, 0.5), hex: #fafafa80 */;
      }
    `)
})
