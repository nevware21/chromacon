<h1 align="center">@nevware21/chromacon</h1>
<h2 align="center">Text formatting utilities to colorize your text output.</h2>

![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/nevware21/chromacon/ci.yml?branch=main)
[![codecov](https://codecov.io/gh/nevware21/chromacon/branch/main/graph/badge.svg?token=KA05820FMO)](https://codecov.io/gh/nevware21/chromacon)
[![npm version](https://badge.fury.io/js/%40nevware21%2Fchromacon.svg)](https://badge.fury.io/js/%40nevware21%2Fchromacon)
[![downloads](https://img.shields.io/npm/dt/%40nevware21/chromacon.svg)](https://www.npmjs.com/package/%40nevware21/chromacon)
[![downloads](https://img.shields.io/npm/dm/%40nevware21/chromacon.svg)](https://www.npmjs.com/package/%40nevware21/chromacon)

## Overview

Chromacon is a powerful, TypeScript/JavaScript library for adding colors and text formatting to your console and terminal output. Built with modern development practices, it provides a comprehensive API for creating rich, colorful text output across different environments and color support levels.

### Key Features

- **Rich Color Support** - Basic 16 colors, 256-color palette, and true color (24-bit RGB)
- **Text Styling** - Bold, italic, underline, strikethrough, and more
- **Theming System** - Built-in theme support with multiple themes in upcoming releases
- **Automatic Detection** - Intelligent color support detection for different environments
- **Type Safety** - Full TypeScript support with comprehensive type definitions
- **Cross-Platform** - Works in Node.js, browsers, and web workers
- **Minimal Dependencies** - Lightweight with only essential utilities
- **Flexible API** - Both functional and string-based usage patterns

## Documentation and Details

See the comprehensive [Core API documentation](https://nevware21.github.io/chromacon/typedoc/core/index.html) generated from source code via TypeDoc for a full list and details of all available types, functions, and interfaces with included examples.

See [Browser Support](#browser-support) for details on the supported browser environments.

## Installation

```bash
npm install @nevware21/chromacon
```

## Quick Start

```typescript
import { red, green, blue, bold, underline, bgYellow } from "@nevware21/chromacon";

// Basic colors - function usage (wraps text and auto-resets)
console.log(red("Error: Something went wrong"));
console.log(green("Success: Operation completed"));
console.log(blue("Info: Processing data..."));

// Text styling
console.log(bold("Important message"));
console.log(underline("Underlined text"));

// Combine colors and styles
console.log(bold(red("Critical Alert")));
console.log(bgYellow(blue("Blue text on yellow background")));

// Template string usage
const status = "running";
console.log(`Status: ${green(status)}`);
```

## API Reference

### Colors

#### Foreground Colors
```typescript
// Basic colors (16-color support)
black, red, green, yellow, blue, magenta, cyan, white, gray, grey

// Bright colors
brightRed, brightGreen, brightYellow, brightBlue, brightMagenta, brightCyan, brightWhite
```

#### Background Colors
```typescript
// Basic background colors
bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgGray, bgGrey

// Bright background colors  
bgBrightRed, bgBrightGreen, bgBrightYellow, bgBrightBlue, bgBrightMagenta, bgBrightCyan, bgBrightWhite
```

### Text Styles

```typescript
// Font styling
bold, dim, italic

// Text decoration
underline, strikethrough, overlined

// Visual effects
blink, inverse, hidden, framed, encircled

// Utility
reset  // Reset all formatting
```

### Utility Functions

```typescript
// Color support detection
isColorSupported()       // Basic color support
isRgb256ColorSupported() // 256-color support  
isTrueColorSupported()   // True color (RGB) support

// Manual configuration
setColorLevel(ColorLevel.Basic | ColorLevel.Ansi256 | ColorLevel.Rgb | ColorLevel.None)
getColorLevel()

// Text processing
stripAnsi(text)  // Remove ANSI codes from text
matchAnsi(text)  // Find ANSI codes in text
```

## Usage Examples

### Two Ways to Use Chromacon

Chromacon provides two flexible usage patterns:

#### 1. Function Usage (Recommended)

Functions wrap your text and automatically handle color reset:

```typescript
import { red, green, bold, italic } from "@nevware21/chromacon";

// Function wraps text and auto-resets
console.log(red("This is red text"));
console.log(bold("This is bold text"));

// Perfect for simple, single-color text
console.log(green("Success!"));
```

#### 2. String Usage (Advanced)

Use color values directly as strings for fine-grained control:

```typescript
import { red, green, bold, reset } from "@nevware21/chromacon";

// Manual color control with raw ANSI codes
console.log(`${red}This is red text${reset}`);
console.log(`${bold}This is bold text${reset}`);

// Build complex strings with multiple colors
console.log(`${red}Error:${reset} ${green}Operation completed${reset}`);
```

#### Smart Color Restoration

When using string values, Chromacon intelligently restores the previous color state:

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

### Combining Colors and Styles

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

### Conditional Formatting

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

### Color Level Configuration

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

### Text Processing

```typescript
import { stripAnsi, matchAnsi, red, bold } from "@nevware21/chromacon";

const coloredText = red(bold("Hello World"));
console.log(coloredText);        // "\x1b[31m\x1b[1mHello World\x1b[22m\x1b[39m"

const plainText = stripAnsi(coloredText);
console.log(plainText);          // "Hello World"

const ansiCodes = matchAnsi(coloredText);
console.log(ansiCodes);          // ["\x1b[31m", "\x1b[1m", "\x1b[22m", "\x1b[39m"]
```

## Color Support Levels

Chromacon automatically detects and adapts to different color support levels:

| Level | Description | Colors Available |
|-------|-------------|------------------|
| `None` | No color support | Text only |
| `Basic` | Standard 16 colors | 8 basic + 8 bright colors |
| `Ansi256` | 8-bit color palette | 256 colors |
| `Rgb` | True color support | 16.7 million colors |

## TypeScript Support

Chromacon is built with TypeScript and provides comprehensive type definitions:

```typescript
import { ChromaColor, ChromaStyle, ColorLevel } from "@nevware21/chromacon";

// Type-safe color functions
const errorColor: ChromaColor = red;
const titleStyle: ChromaStyle = bold;

// Enum support for color levels
const level: ColorLevel = ColorLevel.Ansi256;
```

## Theming System

Chromacon features a built-in theming system that adapts output formatting based on the current theme configuration. The default ANSI theme provides standard terminal color support, with additional themes planned for future releases.

### Current Theme Support

The current implementation uses the **ANSI Theme** as the default:
- Standard ANSI escape sequences for colors and styles
- Automatic color level detection and adaptation
- Cross-platform compatibility

### Upcoming Theme Features

Future releases will include multiple built-in themes:

- **HTML Theme** - Convert colors and styles to HTML markup
- **Markdown Theme** - Generate markdown-compatible formatting
- **Plain Text Theme** - Strip all formatting for plain text output
- **Custom Themes** - Developer-defined theme implementations

### Theme Architecture

```typescript
// Future theme API (planned)
import { setTheme, getTheme, createCustomTheme } from "@nevware21/chromacon";

// Switch to HTML theme (future release)
setTheme('html');
console.log(red("Error")); // Output: <span style="color: red;">Error</span>

// Switch to Markdown theme (future release)  
setTheme('markdown');
console.log(bold("Important")); // Output: **Important**

// Custom theme creation (future release)
const customTheme = createCustomTheme({
    colors: { /* custom color mappings */ },
    styles: { /* custom style mappings */ }
});
```

### Current Theme Configuration

The current ANSI theme can be configured using existing color level settings:

```typescript
import { setColorLevel, ColorLevel } from "@nevware21/chromacon";

// Configure ANSI theme behavior
setColorLevel(ColorLevel.Rgb);      // Enable full color support
setColorLevel(ColorLevel.None);     // Disable color formatting
```

## Environment Support

### Test Environments 
- Node.js (16, 18, 20, 22)
- Browser (Chromium - headless)
- Web Worker (Chromium - headless)

### Platform Compatibility
- ✅ Node.js applications
- ✅ Browser environments
- ✅ Web Workers
- ✅ Terminal applications
- ✅ Console logging

## Performance

Chromacon is designed for minimal overhead:
- Minimal runtime dependencies (@nevware21/ts-utils for cross-platform compatibility and minification improvements)
- Tree-shakable exports
- Lazy initialization
- Efficient string concatenation
- Optimized for frequent usage

## Browser Support

Chromacon provides comprehensive browser support with intelligent feature detection and graceful degradation across different environments.

### Supported Browsers

| Browser | Version | ANSI Support | Notes |
|---------|---------|--------------|--------|
| **Chrome** | 58+ | ✅ Full | Complete ANSI support in DevTools console |
| **Firefox** | 55+ | ✅ Full | Complete ANSI support in DevTools console |
| **Safari** | 11+ | ✅ Full | Complete ANSI support in DevTools console |
| **Edge** | 16+ | ✅ Full | Complete ANSI support in DevTools console |
| **Opera** | 45+ | ✅ Full | Complete ANSI support in DevTools console |

### Console Environment Detection

Chromacon automatically detects console capabilities and adjusts output accordingly:

```typescript
import { isColorSupported, red, green } from "@nevware21/chromacon";

// Automatic detection in different environments
if (isColorSupported()) {
    console.log(red("Colors are supported!"));
} else {
    console.log("Colors not supported - falling back to plain text");
}
```

### Browser-Specific Features

#### Developer Tools Console

Modern browser developer tools provide excellent ANSI escape sequence support:
- Full color palette (16.7M colors)
- Text styling (bold, italic, underline)
- Background colors
- Proper reset handling

#### Web Workers

Chromacon works seamlessly in web worker environments:
```typescript
// In a web worker
import { blue, bold } from "@nevware21/chromacon";

self.postMessage(blue("Worker message with color"));
console.log(bold("Bold text in worker console"));
```

#### Node.js Integration

When using Chromacon in Node.js applications that also run in browsers:
```typescript
import { setColorDetector, red } from "@nevware21/chromacon";

// Custom detection for hybrid environments
setColorDetector(() => {
    // Custom logic for your environment
    return typeof window !== 'undefined' && console.log.toString().indexOf('native') > -1;
});
```

### Fallback Behavior

When ANSI support is not available, Chromacon gracefully degrades:

```typescript
import { isColorSupported, red, bold } from "@nevware21/chromacon";

function formatMessage(text: string, level: 'error' | 'success') {
    if (isColorSupported()) {
        return level === 'error' ? red(bold(text)) : green(bold(text));
    } else {
        // Fallback for unsupported environments
        return `[${level.toUpperCase()}] ${text}`;
    }
}
```

### Browser Console Examples

When viewed in browser developer tools, Chromacon output provides rich visual feedback:

```typescript
// This will render with actual colors in browser console
console.log(red("🔴 Error: Network timeout"));
console.log(green("🟢 Success: Data loaded"));
console.log(blue("🔵 Info: Cache updated"));
console.log(bold("📢 Important announcement"));
```

### Known Limitations

- **Email/Document Export**: ANSI codes don't translate to HTML (use `stripAnsi()` utility)
- **Text Copy/Paste**: ANSI codes may appear as raw text when copied from console

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our development process and how to submit pull requests.

## Support

- [Report Issues](https://github.com/nevware21/chromacon/issues)
- [Discussions](https://github.com/nevware21/chromacon/discussions)
- [Email Support](mailto:github+chromacon@nevware21.com)

## License

Licensed under the [MIT License](LICENSE).
