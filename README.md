<h1 align="center">@nevware21/chromacon</h1>
<h2 align="center">Text formatting utilities to colorize your text output.</h2>

![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/nevware21/chromacon/ci.yml?branch=main)
[![codecov](https://codecov.io/gh/nevware21/chromacon/branch/main/graph/badge.svg?token=KA05820FMO)](https://codecov.io/gh/nevware21/chromacon)
[![npm version](https://badge.fury.io/js/%40nevware21%2Fchromacon.svg)](https://badge.fury.io/js/%40nevware21%2Fchromacon)
[![downloads](https://img.shields.io/npm/dt/%40nevware21/chromacon.svg)](https://www.npmjs.com/package/%40nevware21/chromacon)
[![downloads](https://img.shields.io/npm/dm/%40nevware21/chromacon.svg)](https://www.npmjs.com/package/%40nevware21/chromacon)
[![Sponsor](https://img.shields.io/badge/Sponsor-444444?logo=githubsponsors
)](https://github.com/sponsors/nevware21)

## Overview

Chromacon is a powerful, TypeScript/JavaScript library for adding colors and text formatting to your console and terminal output. Built with modern development practices, it provides a comprehensive API for creating rich, colorful text output across different environments and color support levels.

## Installation

```bash
npm install @nevware21/chromacon --save
```

**Recommended Version Specification:**
```json
"@nevware21/chromacon": ">= 0.1.2 < 2.x"
```

### Key Features

- **Rich Color Support** - Basic 16 colors, 256-color palette, and true color (24-bit RGB)
- **Text Styling** - Bold, italic, underline, strikethrough, and more
- **Smart Color Restoration** - Automatic color context restoration when nesting color functions
- **Output Optimization** - Intelligent removal of redundant ANSI escape sequences for cleaner output
- **Theming System** - Built-in theme support with multiple themes in upcoming releases
- **Automatic Detection** - Intelligent color support detection for different environments
- **Type Safety** - Full TypeScript support with comprehensive type definitions
- **Cross-Platform** - Works in Node.js, browsers, and web workers
- **Minimal Dependencies** - Lightweight with only essential utilities
- **Flexible API** - Both functional and string-based usage patterns

## Documentation and Details

See the [Documentation Home](https://nevware21.github.io/chromacon/) site which includes access to the [API Reference](https://nevware21.github.io/chromacon/#api-reference) generated from source code via TypeDoc for a full list and details of all available types, functions, and interfaces with included examples.

See [Browser Support](#browser-support) for details on the supported browser environments.


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

## API Overview

Chromacon provides a flexible API with two usage patterns and intelligent color restoration.

### Two Usage Patterns

**1. Function Usage (Recommended)**

Functions wrap your text and automatically handle color reset:

```typescript
import { red, bold } from "@nevware21/chromacon";

console.log(red("This is red text"));
console.log(bold("This is bold text"));
```

**2. String Usage (Advanced)**

Use color values directly as strings for manual control:

```typescript
import { red, reset } from "@nevware21/chromacon";

console.log(`${red}This is red text${reset}`);
console.log(red + "This is red text" + reset);
console.log(red.concat("This is red text").concat(reset))
```

### Smart Color Restoration

When nesting color functions, Chromacon intelligently restores the previous color:

```typescript
import { red, blue } from "@nevware21/chromacon";

// Nested colors with automatic restoration
console.log(red("Error in " + blue("file.ts") + " at line 42"));
// Output: "Error in" and "at line 42" are red, "file.ts" is blue
```

**Note:** Color restoration only works within function call context, not in template literals where colors are used as string values.

See [API Reference](https://nevware21.github.io/chromacon/#api-reference) for full details.

### Colors


| Type | Colors |
|------|--------|
| Foreground Colors | <code>[black](https://nevware21.github.io/chromacon/typedoc/core/variables/black.html); [red](https://nevware21.github.io/chromacon/typedoc/core/variables/red.html); [green](https://nevware21.github.io/chromacon/typedoc/core/variables/green.html); [yellow](https://nevware21.github.io/chromacon/typedoc/core/variables/yellow.html); [blue](https://nevware21.github.io/chromacon/typedoc/core/variables/blue.html); [magenta](https://nevware21.github.io/chromacon/typedoc/core/variables/magenta.html); [cyan](https://nevware21.github.io/chromacon/typedoc/core/variables/cyan.html); [white](https://nevware21.github.io/chromacon/typedoc/core/variables/white.html); [gray](https://nevware21.github.io/chromacon/typedoc/core/variables/gray.html); [grey](https://nevware21.github.io/chromacon/typedoc/core/variables/grey.html)</code> |
| Bright Foreground Colors | <code>[brightRed](https://nevware21.github.io/chromacon/typedoc/core/variables/brightRed.html); [brightGreen](https://nevware21.github.io/chromacon/typedoc/core/variables/brightGreen.html); [brightYellow](https://nevware21.github.io/chromacon/typedoc/core/variables/brightYellow.html); [brightBlue](https://nevware21.github.io/chromacon/typedoc/core/variables/brightBlue.html); [brightMagenta](https://nevware21.github.io/chromacon/typedoc/core/variables/brightMagenta.html); [brightCyan](https://nevware21.github.io/chromacon/typedoc/core/variables/brightCyan.html); [brightWhite](https://nevware21.github.io/chromacon/typedoc/core/variables/brightWhite.html)</code> |
| Background Colors | <code>[bgBlack](https://nevware21.github.io/chromacon/typedoc/core/variables/bgBlack.html); [bgRed](https://nevware21.github.io/chromacon/typedoc/core/variables/bgRed.html); [bgGreen](https://nevware21.github.io/chromacon/typedoc/core/variables/bgGreen.html); [bgYellow](https://nevware21.github.io/chromacon/typedoc/core/variables/bgYellow.html); [bgBlue](https://nevware21.github.io/chromacon/typedoc/core/variables/bgBlue.html); [bgMagenta](https://nevware21.github.io/chromacon/typedoc/core/variables/bgMagenta.html); [bgCyan](https://nevware21.github.io/chromacon/typedoc/core/variables/bgCyan.html); [bgWhite](https://nevware21.github.io/chromacon/typedoc/core/variables/bgWhite.html); [bgGray](https://nevware21.github.io/chromacon/typedoc/core/variables/bgGray.html); [bgGrey](https://nevware21.github.io/chromacon/typedoc/core/variables/bgGrey.html)</code> |
| Bright Background Colors | <code>[bgBrightRed](https://nevware21.github.io/chromacon/typedoc/core/variables/bgBrightRed.html); [bgBrightGreen](https://nevware21.github.io/chromacon/typedoc/core/variables/bgBrightGreen.html); [bgBrightYellow](https://nevware21.github.io/chromacon/typedoc/core/variables/bgBrightYellow.html); [bgBrightBlue](https://nevware21.github.io/chromacon/typedoc/core/variables/bgBrightBlue.html); [bgBrightMagenta](https://nevware21.github.io/chromacon/typedoc/core/variables/bgBrightMagenta.html); [bgBrightCyan](https://nevware21.github.io/chromacon/typedoc/core/variables/bgBrightCyan.html); [bgBrightWhite](https://nevware21.github.io/chromacon/typedoc/core/variables/bgBrightWhite.html)</code> |

### Text Styles


| Type | Styles |
|------|--------|
| Font Styling | <code>[bold](https://nevware21.github.io/chromacon/typedoc/core/variables/bold.html); [dim](https://nevware21.github.io/chromacon/typedoc/core/variables/dim.html); [italic](https://nevware21.github.io/chromacon/typedoc/core/variables/italic.html); [normal](https://nevware21.github.io/chromacon/typedoc/core/variables/normal.html)</code> |
| Text Decoration | <code>[underline](https://nevware21.github.io/chromacon/typedoc/core/variables/underline.html); [strikethrough](https://nevware21.github.io/chromacon/typedoc/core/variables/strikethrough.html); [overlined](https://nevware21.github.io/chromacon/typedoc/core/variables/overlined.html)</code> |
| Visual Effects | <code>[blink](https://nevware21.github.io/chromacon/typedoc/core/variables/blink.html); [inverse](https://nevware21.github.io/chromacon/typedoc/core/variables/inverse.html); [hidden](https://nevware21.github.io/chromacon/typedoc/core/variables/hidden.html); [framed](https://nevware21.github.io/chromacon/typedoc/core/variables/framed.html); [encircled](https://nevware21.github.io/chromacon/typedoc/core/variables/encircled.html)</code> |
| Utility | <code>[reset](https://nevware21.github.io/chromacon/typedoc/core/variables/reset.html)</code> |

### Utility Functions

| Type | Functions |
|------|-----------|
| Color Support Detection | <code>[isColorSupported](https://nevware21.github.io/chromacon/typedoc/core/functions/isColorSupported.html)(); [isRgb256ColorSupported](https://nevware21.github.io/chromacon/typedoc/core/functions/isRgb256ColorSupported.html)(); [isTrueColorSupported](https://nevware21.github.io/chromacon/typedoc/core/functions/isTrueColorSupported.html)()</code> |
| Manual Configuration | <code>[setColorLevel](https://nevware21.github.io/chromacon/typedoc/core/functions/setColorLevel.html)(); [getColorLevel](https://nevware21.github.io/chromacon/typedoc/core/functions/getColorLevel.html)(); [setColorDetector](https://nevware21.github.io/chromacon/typedoc/core/functions/setColorDetector.html)()</code> |
| Text Processing | <code>[stripAnsi](https://nevware21.github.io/chromacon/typedoc/core/functions/stripAnsi.html)(); [matchAnsi](https://nevware21.github.io/chromacon/typedoc/core/functions/matchAnsi.html)()</code> |

## Usage Examples

See [Usage Examples](docs/UsageExamples.md) for comprehensive examples including:

- Function usage vs string usage patterns
- Smart color restoration
- Combining colors and styles
- Conditional formatting
- Color level configuration
- Text processing utilities

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

When ANSI support is not available, Chromacon automatically returns plain text without color codes. You can also add custom fallback behavior for better user experience:

```typescript
import { isColorSupported, red, green, bold } from "@nevware21/chromacon";

function formatMessage(text: string, level: 'error' | 'success') {
    const formattedText = level === 'error' ? red(bold(text)) : green(bold(text));
    
    if (!isColorSupported()) {
        // Colors not supported - so add additional text indicators as fallback
        formattedText = `[${level.toUpperCase()}] ${formattedText}`;
    }

    // return formatted text
    return formattedText;
}

// Example usage:
console.log(formatMessage("Operation failed", "error"));
// With colors: displays red bold text
// Without colors: displays "[ERROR] Operation failed"
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
