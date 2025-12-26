# v0.1.3, Dec 26th 2025

## New Features

### Text Processing Utilities

- **Added `escapeAnsi()` Function**: New utility that escapes ANSI escape sequences in strings by converting them to their string representation
  - Converts `\x1b` to `\\x1b` for visible display of ANSI codes
  - Useful for debugging, logging, and displaying formatted text as plain text
  - Handles all ANSI escape sequence types including colors, styles, cursor movements, and terminal links
  - See [escapeAnsi API](https://nevware21.github.io/chromacon/typedoc/core/functions/escapeAnsi.html) for details

- **Added `replaceAnsi()` Function**: Replace ANSI escape sequences with custom content
  - Supports string replacement or custom callback functions for advanced transformations
  - Enables flexible text processing and format conversion
  - Perfect for sanitizing or transforming colored output
  - See [replaceAnsi API](https://nevware21.github.io/chromacon/typedoc/core/functions/replaceAnsi.html) for details

- **Exposed `parseAnsi()` Function**: Previously internal, now publicly available for parsing ANSI sequences
  - Parse ANSI escape sequences into structured data
  - Returns detailed information about escape codes, positions, and content
  - Enables advanced ANSI sequence analysis and manipulation
  - See [parseAnsi API](https://nevware21.github.io/chromacon/typedoc/core/functions/parseAnsi.html) for details

### Enhancements

- **Improved Code Organization**: Reordered function files to avoid circular dependencies for better maintainability
- **Enhanced Linting**: Added auto semi-colon fixing to ESLint configuration for consistent code style

### Dependencies

- **Updated Dependencies**: Bumped various development dependencies including:
  - chai from 6.2.1 to 6.2.2
  - puppeteer from 24.32.1 to 24.34.0
  - @microsoft/rush from 5.163.0 to 5.164.0
  - peter-evans/rebase from 2 to 4

### CI/CD Improvements

- **Enhanced sync-rush-versions Workflow**: Multiple improvements to the automated rush version synchronization workflow
  - Added write permissions for commits
  - Fixed detached HEAD error handling
  - Improved git diff glob patterns
  - Added fetch-depth configuration for checkout action
  - Included common/scripts in workflow commits

### Links

- **Pull Requests & Issues**:
  - [#124: Add additional functions, escapeAnsi, replaceAnsi, expose parseAnsi](https://github.com/nevware21/chromacon/pull/124)
  - [#123: Bump chai from 6.2.1 to 6.2.2 in /core](https://github.com/nevware21/chromacon/pull/123)
  - [#122: Bump puppeteer from 24.33.1 to 24.34.0 in the puppeteer group](https://github.com/nevware21/chromacon/pull/122)
  - [#121: Include common/scripts in sync-rush-versions workflow commits](https://github.com/nevware21/chromacon/pull/121)
  - [#120: Add write permissions to sync-rush-versions workflow](https://github.com/nevware21/chromacon/pull/120)
  - [#119: Bump puppeteer from 24.33.0 to 24.33.1 in the puppeteer group](https://github.com/nevware21/chromacon/pull/119)
  - [#118: Fix sync-rush-versions workflow detached HEAD error](https://github.com/nevware21/chromacon/pull/118)
  - [#117: Fix git diff glob pattern in sync-rush-versions workflow](https://github.com/nevware21/chromacon/pull/117)
  - [#116: Update sync-rush-versions.yml](https://github.com/nevware21/chromacon/pull/116)
  - [#115: Add fetch-depth to checkout action in workflow](https://github.com/nevware21/chromacon/pull/115)
  - [#114: Bump @microsoft/rush from 5.163.0 to 5.164.0](https://github.com/nevware21/chromacon/pull/114)
  - [#109: Bump peter-evans/rebase from 2 to 4](https://github.com/nevware21/chromacon/pull/109)
  - [#105: Bump puppeteer from 24.32.1 to 24.33.0 in the puppeteer group](https://github.com/nevware21/chromacon/pull/105)
- **Full Changelog**: https://github.com/nevware21/chromacon/compare/v0.1.2...v0.1.3

---

# v0.1.2, Dec 10th 2025

## New Features

### Enhancements

- **Added `normal` Style**: New text style that sets normal intensity, providing an explicit way to reset bold/dim effects while preserving other formatting
  - Useful for fine-grained control over text intensity within formatted output
  - Complements existing `bold` and `dim` styles
  - See [normal style API](https://nevware21.github.io/chromacon/typedoc/core/variables/normal.html) for details

### Links

- **Pull Requests & Issues**:
  - [#98: Add normal style (sets the normal intensity)](https://github.com/nevware21/chromacon/pull/98)
- **Full Changelog**: https://github.com/nevware21/chromacon/compare/v0.1.1...v0.1.2

---

# v0.1.1, Dec 9th 2025

## Documentation Improvements

### Updates

- **Updated Style Exports**: Styles are now exported as `ChromaStyle` types and not just `CsiStyle` for better TypeScript support
- **Enhanced Examples**: Updated all color and style examples to show all three usage patterns:
  - Function call syntax: `color("text")` - includes automatic reset
  - Template literal syntax: `` `${color}text` `` - no reset included  
  - String concatenation: `color + "text"` - no reset included
  - Concat method: `color.concat("text")` - no reset included
  - *Each example now clearly indicates whether reset codes are included or not

### Links

- **Full Changelog**: https://github.com/nevware21/chromacon/compare/v0.1.0...v0.1.1

---

# v0.1.0, Dec 6th 2025

## Initial Release

This is the first release of **@nevware21/chromacon** - a powerful, TypeScript/JavaScript library for adding colors and text formatting to your console and terminal output.

### Features

#### Rich Color & Text Formatting Support
- **16 Basic Colors**: Standard terminal colors (black, red, green, yellow, blue, magenta, cyan, white, gray)
- **Bright Color Variants**: Enhanced brightness versions of all basic colors
- **Background Colors**: Full background color support for both basic and bright colors
- **Text Styling**: Bold, dim, italic, underline, strikethrough, overlined, blink, inverse, hidden, framed, encircled
- **Advanced Color Support**: 256-color palette and true color (24-bit RGB) support

#### Intelligent Environment Detection
- **Automatic Color Support Detection**: Intelligently detects color capabilities across different environments
- **Color Level Configuration**: Manual override support for specific color levels (None, Basic, 256-color, True color)
- **Cross-Platform Compatibility**: Works seamlessly in Node.js, browsers, and web workers
- **Graceful Degradation**: Automatically falls back to supported color levels

#### Text Processing Utilities
- **`stripAnsi()`**: Remove ANSI escape sequences from text for plain text output
- **`matchAnsi()`**: Find and extract ANSI codes from formatted text
- **Polynomial Regex Protection**: Secure regex implementation to prevent ReDoS attacks

#### Theming Architecture  
- **ANSI Theme**: Default theme with standard ANSI escape sequences
- **Theme System Foundation**: Extensible architecture for future theme implementations
- **Future Theme Support**: Prepared for HTML, Markdown, and custom theme implementations

#### Developer Experience
- **Full TypeScript Support**: Comprehensive type definitions and IntelliSense support
- **Flexible API**: Both functional (`red("text")`) and string-based (`${red}text${reset}`) usage patterns
- **Smart Color Restoration**: Automatic color context restoration when nesting color functions
- **Output Optimization**: Intelligent removal of redundant ANSI escape sequences for cleaner output
- **Tree-Shakable Exports**: Import only what you need for optimal bundle size
- **Minimal Dependencies**: Lightweight with only essential utilities (@nevware21/ts-utils)

#### Platform Support
- **Node.js**: Full support for terminal applications and server-side logging
- **Modern Browsers**: Complete ANSI support in developer tools console
- **Web Workers**: Seamless operation in web worker environments
- **Cross-Environment**: Consistent behavior across different JavaScript runtimes


### Links

- **Pull Requests & Issues**:
  - [#82: Update ansi formatter to reduce duplicates and unnecessary escape codes](https://github.com/nevware21/chromacon/pull/82)
  - [#76: Bump lewagon/wait-on-check-action from 1.3.4 to 1.4.1](https://github.com/nevware21/chromacon/pull/76)
  - [#75: Address karme-typescript browser failures](https://github.com/nevware21/chromacon/pull/75)
  - [#74: Update api-reference links](https://github.com/nevware21/chromacon/pull/74)
  - [#73: Add Dependabot auto approval action](https://github.com/nevware21/chromacon/pull/73)
  - [#72: Update Pure annotations](https://github.com/nevware21/chromacon/pull/72)
  - [#69: Remove the auto merge action](https://github.com/nevware21/chromacon/pull/69)
  - [#68: Update dependabot auto merge action](https://github.com/nevware21/chromacon/pull/68)
  - [#64: Bump puppeteer from 24.31.0 to 24.32.0 in the puppeteer group](https://github.com/nevware21/chromacon/pull/64)
  - [#62: Bump @types/eslint from 8.56.12 to 9.6.1 in the types group](https://github.com/nevware21/chromacon/pull/62)
  - [#60: Update Readme and add examples to better call out color restoration and direct usage](https://github.com/nevware21/chromacon/pull/60)
  - [#57: Bump the rollup group in /core with 3 updates](https://github.com/nevware21/chromacon/pull/57)
  - [#49: Update dependencies](https://github.com/nevware21/chromacon/pull/49)
  - [#46: Bump actions/setup-node from 4 to 6](https://github.com/nevware21/chromacon/pull/46)
  - [#45: Bump actions/checkout from 4 to 6](https://github.com/nevware21/chromacon/pull/45)
  - [#44: Auto sync rush.json dependabot changes](https://github.com/nevware21/chromacon/pull/44)
  - [#2: Initial Support for stripAnsi and color support detection](https://github.com/nevware21/chromacon/pull/2)

### Documentation

- [API Documentation](https://nevware21.github.io/chromacon/#api-reference)
- [GitHub Repository](https://github.com/nevware21/chromacon)
- [NPM Package](https://www.npmjs.com/package/@nevware21/chromacon)

### Planned Features

- **HTML Theme**: Convert colors and styles to HTML markup
- **Markdown Theme**: Generate markdown-compatible formatting  
- **Plain Text Theme**: Strip all formatting for plain text output (Can already be indirectly achieved with the default ANSI theme by setting the color support to None)
- **Custom Themes**: Developer-defined theme implementations
- **Extended Color Palettes**: Additional built-in color schemes
- **Performance Optimizations**: Further runtime improvements

---

**Full Changelog**: https://github.com/nevware21/chromacon/commits/v0.1.0

