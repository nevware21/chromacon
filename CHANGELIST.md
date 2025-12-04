# Un-Released Changes

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
- **Tree-Shakable Exports**: Import only what you need for optimal bundle size
- **Minimal Dependencies**: Lightweight with only essential utilities (@nevware21/ts-utils)

#### Platform Support
- **Node.js**: Full support for terminal applications and server-side logging
- **Modern Browsers**: Complete ANSI support in developer tools console
- **Web Workers**: Seamless operation in web worker environments
- **Cross-Environment**: Consistent behavior across different JavaScript runtimes


### Links

- **Pull Requests & Issues**:
  - [#60: Update Readme and add examples to better call out color restoration and direct usage](https://github.com/nevware21/chromacon/pull/60)
  - [#57: Bump the rollup group in /core with 3 updates](https://github.com/nevware21/chromacon/pull/57)
  - [#49: Update dependencies](https://github.com/nevware21/chromacon/pull/49)
  - [#46: Bump actions/setup-node from 4 to 6](https://github.com/nevware21/chromacon/pull/46)
  - [#45: Bump actions/checkout from 4 to 6](https://github.com/nevware21/chromacon/pull/45)
  - [#44: Auto sync rush.json dependabot changes](https://github.com/nevware21/chromacon/pull/44)
  - [#2: Initial Support for stripAnsi and color support detection](https://github.com/nevware21/chromacon/pull/2)

- **Commits**:
  - [`042721c`](https://github.com/nevware21/chromacon/commit/042721caa465d3e35df43b73278f8059862d0c7b): Update Readme and add examples to better call out color restoration and direct usage (#60)
  - [`f482c7a`](https://github.com/nevware21/chromacon/commit/f482c7a16e3dcc0880a74b316b6ae0909556b8a4): Bump the rollup group in /core with 3 updates (#57)
  - [`b6f45a8`](https://github.com/nevware21/chromacon/commit/b6f45a8e7474a8c227d57bf9c597419bdf19d2c9): Update dependencies (#49)
  - [`6d9f9ed`](https://github.com/nevware21/chromacon/commit/6d9f9ed1250e41a9edb2787b8447984723e4eb10): Bump actions/setup-node from 4 to 6 (#46)
  - [`4c595fc`](https://github.com/nevware21/chromacon/commit/4c595fc78c70a1b1a702890fd821b1652d24df0f): Bump actions/checkout from 4 to 6 (#45)
  - [`ea63fff`](https://github.com/nevware21/chromacon/commit/ea63fffa33c7882aaef7037d99a4fb7b425e6ec7): Auto sync rush.json dependabot changes (#44)
  - [`0d585de`](https://github.com/nevware21/chromacon/commit/0d585de99d6cd2c3872f8c297f7ad3d8e0484eb4): Initial Support for stripAnsi and color support detection (#2)

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

