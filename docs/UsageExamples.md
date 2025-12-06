# Usage Examples

This guide provides comprehensive examples of using Chromacon in various scenarios.

## Table of Contents

- [Two Ways to Use Chromacon](#two-ways-to-use-chromacon)
  - [Function Usage (Recommended)](#1-function-usage-recommended)
  - [String Usage (Advanced)](#2-string-usage-advanced)
  - [Smart Color Restoration](#smart-color-restoration)
- [Combining Colors and Styles](#combining-colors-and-styles)
- [Conditional Formatting](#conditional-formatting)
- [Color Level Configuration](#color-level-configuration)
- [Text Processing](#text-processing)

## Two Ways to Use Chromacon

Chromacon provides two flexible usage patterns:

### 1. Function Usage (Recommended)

Functions wrap your text and automatically handle color reset:

```typescript
import { red, green, bold, italic } from "@nevware21/chromacon";

// Function wraps text and auto-resets
console.log(red("This is red text"));
console.log(bold("This is bold text"));

// Perfect for simple, single-color text
console.log(green("Success!"));
```

### 2. String Usage (Advanced)

Use color values directly as strings for fine-grained control:

```typescript
import { red, green, bold, reset } from "@nevware21/chromacon";

// Manual color control with raw ANSI codes
console.log(`${red}This is red text${reset}`);
console.log(`${bold}This is bold text${reset}`);

// Build complex strings with multiple colors
console.log(`${red}Error:${reset} ${green}Operation completed${reset}`);
```

### Smart Color Restoration

When nesting color functions, Chromacon intelligently restores the previous color state:

```typescript
import { red, blue, green } from "@nevware21/chromacon";

// Nested colors with automatic restoration (within function context)
console.log(red("Red " + blue("blue") + " back to red"));
// Output: "Red blue back to red"
// The text returns to red after the blue section ends

// Complex nesting
console.log(red("Error in " + green("file.ts") + " at line 42"));
// "Error in" and "at line 42" are red, "file.ts" is green

// Mixing both patterns (no restoration in template literals)
console.log(`${red}Status: ${green("OK")} - continuing...${reset}`);
// "Status:" is red, "OK" is green, "- continuing..." is plain text (not red)
// Color restoration only works within function call context, not template literals

// Using function context for restoration
console.log(red("Status: " + green("OK") + " - continuing..."));
// "Status:" is red, "OK" is green, "- continuing..." is red (restored!)
// Color restoration works because the entire string is passed to red()
```

**Important:** Color restoration automatically tracks and restores the active color when a color function completes, but **only within the string passed to that function**. When using template literals with `${red}` as a string value, the restoration doesn't apply to subsequent text in the template literal since it's outside the function's context.

**Performance Optimization:** The intelligent restoration system also optimizes the output by removing redundant ANSI escape sequences that would be immediately overwritten by subsequent sequences, keeping the output compact and efficient.

## Combining Colors and Styles

```typescript
import { red, blue, bold, underline, bgYellow, black, reset } from "@nevware21/chromacon";

// Function usage - nested formatting with auto-reset
console.log(red(`Error in ${blue(bold("file.ts"))} at ${underline("line 42")}`));
// "Error in" and "at" are red, "file.ts" is blue and bold, "line 42" is underlined

// Complex combinations
console.log(bgYellow(black(bold("WARNING: Critical Issue"))));

// String usage - manual control for complex scenarios
console.log(`${red}Error: ${bold}Critical${reset}${red} failure in system${reset}`);

// Mix both patterns for flexibility
const filename = blue(bold("config.json"));
console.log(`${red}Cannot find ${filename} in directory${reset}`);
// "Cannot find" and "in directory" are red, "config.json" is blue and bold
```

## Conditional Formatting

```typescript
import { isColorSupported, red, green } from "@nevware21/chromacon";

function logStatus(message: string, isSuccess: boolean) {
    if (isColorSupported()) {
        const color = isSuccess ? green : red;
        console.log(color(message));
    } else {
        console.log(`[${isSuccess ? 'OK' : 'ERROR'}] ${message}`);
    }
}
```

## Color Level Configuration

```typescript
import { setColorLevel, ColorLevel, red } from "@nevware21/chromacon";

// Force specific color levels
setColorLevel(ColorLevel.None);     // Disable all colors
setColorLevel(ColorLevel.Basic);    // 16 colors only
setColorLevel(ColorLevel.Ansi256);  // 256 colors
setColorLevel(ColorLevel.Rgb);      // True color (16.7M colors)

// Auto-detect (default)
setColorLevel(ColorLevel.AutoDetect);
```

## Text Processing

```typescript
import { stripAnsi, matchAnsi, red, bold } from "@nevware21/chromacon";

const coloredText = red(bold("Hello World"));
console.log(coloredText);        // "\x1b[31m\x1b[1mHello World\x1b[22m\x1b[39m"

const plainText = stripAnsi(coloredText);
console.log(plainText);          // "Hello World"

const ansiCodes = matchAnsi(coloredText);
console.log(ansiCodes);          // ["\x1b[31m", "\x1b[1m", "\x1b[22m", "\x1b[39m"]
```

## See Also

- [Documentation Home](README.md)
- [Main README](https://github.com/nevware21/chromacon/blob/main/README.md)
- [TypeDoc API Reference](README.md/#api-reference)
