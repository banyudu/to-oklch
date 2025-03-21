# to-oklch

This is a simple tool to convert color to oklch.

## Usage

### Use as a module

```javascript
import { transform } from 'to-oklch'
const oklch = transform('rgb(255, 0, 0)')
```

### Use as a command

```bash
cat styles.css | npx to-oklch > styles-oklch.css
```

#### Example

Input File

```css
/* styles.css */
body {
  background-color: #f00;
  color: rgb(0, 0, 255);
  border-color: #fafafa;
}
```

Output File

```css
/* styles-oklch.css */
body {
  background-color: oklch(0.628 0.258 29.234) /* rgba: rgb(255, 0, 0), hex: #f00 */;
  color: oklch(0.452 0.313 264.052) /* rgba: rgb(0, 0, 255), hex: #00f */;
  border-color: oklch(0.985 0 0) /* rgba: rgb(250, 250, 250), hex: #fafafa */;
}
```
