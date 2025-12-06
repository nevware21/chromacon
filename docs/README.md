
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

## API Reference

### [Core API Reference](https://nevware21.github.io/chromacon/typedoc/core/index.html)

## Quick Example

```typescript
import { red, green, blue, bold, underline, bgYellow } from "@nevware21/chromacon";

// Basic usage
console.log(red("Error: Something went wrong"));
console.log(green("Success: Operation completed"));
console.log(bold("Important message"));

// Combine colors and styles
console.log(bold(red("Critical Alert")));
console.log(bgYellow(blue("Blue text on yellow background")));
```

## Installation

```bash
npm install @nevware21/chromacon
```

## Resources

- **[Complete Documentation & Examples](https://github.com/nevware21/chromacon/blob/main/README.md)** - Full README with comprehensive examples and API reference
- **[Usage Examples](UsageExamples.md)** - Detailed usage patterns and examples
- **[TypeDoc API Reference](https://nevware21.github.io/chromacon/#api-reference)** - Generated API documentation with detailed type information
- **[NPM Package](https://www.npmjs.com/package/@nevware21/chromacon)** - Install and package information
- **[GitHub Repository](https://github.com/nevware21/chromacon)** - Source code, issues, and contributions

## Quick Links

- [Installation Guide](https://github.com/nevware21/chromacon/blob/main/README.md#installation)
- [Usage Examples](UsageExamples.md)
- [Browser Support](https://github.com/nevware21/chromacon/blob/main/README.md#browser-support)
- [TypeScript Support](https://github.com/nevware21/chromacon/blob/main/README.md#typescript-support)
- [Contributing Guide](https://github.com/nevware21/chromacon/blob/main/CONTRIBUTING.md)
