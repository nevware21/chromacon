/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

/**
 * A function type that applies CSI (Control Sequence Introducer) style codes to text strings.
 *
 * `CsiStyle` represents the core functional interface for text style formatting in terminal/console output.
 * It takes a string as input and returns that string wrapped with appropriate CSI escape sequences
 * for style formatting such as bold, italic, underline, and other text appearance modifications.
 * This is the base type that {@link ChromaStyle} extends to provide additional string capabilities.
 *
 * Unlike {@link CsiColor} which handles color formatting, `CsiStyle` focuses exclusively on text
 * styling that affects appearance properties like weight, emphasis, decoration, and intensity.
 *
 * CSI style codes are part of the ANSI escape sequence standard and provide cross-platform
 * text formatting capabilities in modern terminals and console applications.
 *
 * @param value - The input string to be formatted with style codes
 * @returns The input string wrapped with CSI style escape sequences and appropriate reset codes
 *
 * @example
 * **Basic Style Functions**
 * ```ts
 * import { bold, italic, underline, dim } from "@nevware21/chromacon";
 *
 * // These are all CsiStyle functions under the hood
 * const importantText: string = bold("CRITICAL ERROR");
 * const emphasizedText: string = italic("Note: This is important");
 * const linkedText: string = underline("https://example.com");
 * const mutedText: string = dim("(optional parameter)");
 *
 * console.log(importantText);  // "\x1b[1mCRITICAL ERROR\x1b[22m"
 * console.log(emphasizedText); // "\x1b[3mNote: This is important\x1b[23m"
 * console.log(linkedText);     // "\x1b[4mhttps://example.com\x1b[24m"
 * console.log(mutedText);      // "\x1b[2m(optional parameter)\x1b[22m"
 * ```
 *
 * @example
 * **Function Composition and Layering**
 * ```ts
 * import { bold, italic, underline, strikethrough } from "@nevware21/chromacon";
 *
 * // CsiStyle functions can be composed for rich formatting
 * const formatTitle = (text: string) => bold(underline(text));
 * const formatDeprecated = (text: string) => strikethrough(italic(text));
 * const formatEmphasis = (text: string) => bold(italic(text));
 *
 * console.log(formatTitle("Chapter 1: Introduction"));
 * // Output: "\x1b[1m\x1b[4mChapter 1: Introduction\x1b[24m\x1b[22m"
 *
 * console.log(formatDeprecated("old_function()"));
 * // Output: "\x1b[9m\x1b[3mold_function()\x1b[23m\x1b[29m"
 *
 * console.log(formatEmphasis("VERY IMPORTANT"));
 * // Output: "\x1b[1m\x1b[3mVERY IMPORTANT\x1b[23m\x1b[22m"
 * ```
 *
 * @example
 * **Custom Style Function Implementation**
 * ```ts
 * // Hypothetical custom implementation following CsiStyle interface
 * const customBold: CsiStyle = (value: string): string => {
 *     const startCode = '\x1b[1m';   // Bold on
 *     const resetCode = '\x1b[22m';  // Normal intensity
 *     return startCode + value + resetCode;
 * };
 *
 * const customItalic: CsiStyle = (value: string): string => {
 *     const startCode = '\x1b[3m';   // Italic on
 *     const resetCode = '\x1b[23m';  // Not italic
 *     return startCode + value + resetCode;
 * };
 *
 * console.log(customBold("Custom bold text"));
 * // Output: "\x1b[1mCustom bold text\x1b[22m"
 * ```
 *
 * @example
 * **Style Maps for Semantic Formatting**
 * ```ts
 * import { bold, italic, underline, dim, strikethrough } from "@nevware21/chromacon";
 *
 * const textStyles: Record<string, CsiStyle> = {
 *     heading: bold,
 *     emphasis: italic,
 *     link: underline,
 *     muted: dim,
 *     deprecated: strikethrough
 * };
 *
 * function formatSemantic(style: keyof typeof textStyles, text: string): string {
 *     const styleFn = textStyles[style];
 *     return styleFn(text);
 * }
 *
 * console.log(formatSemantic('heading', 'Table of Contents'));
 * console.log(formatSemantic('emphasis', 'important note'));
 * console.log(formatSemantic('link', 'Click here'));
 * console.log(formatSemantic('deprecated', 'legacyMethod()'));
 * ```
 *
 * @example
 * **Pipeline Processing with Styles**
 * ```ts
 * import { bold, italic, underline } from "@nevware21/chromacon";
 *
 * // Chain of style transformations
 * const styleProcessors: CsiStyle[] = [bold, italic, underline];
 *
 * function applyStylePipeline(text: string, styles: CsiStyle[]): string {
 *     return styles.reduce((styledText, styleFn) => styleFn(styledText), text);
 * }
 *
 * const result = applyStylePipeline("Formatted Text", [bold, underline]);
 * console.log(result);
 * // Output: "\x1b[1m\x1b[4mFormatted Text\x1b[24m\x1b[22m"
 * ```
 *
 * @example
 * **Conditional Style Application**
 * ```ts
 * import { bold, dim, italic, isColorSupported } from "@nevware21/chromacon";
 *
 * interface StyleConfig {
 *     error: CsiStyle;
 *     warning: CsiStyle;
 *     info: CsiStyle;
 * }
 *
 * function createStyleConfig(): StyleConfig {
 *     if (!isColorSupported()) {
 *         // Return identity functions when styles not supported
 *         const noStyle: CsiStyle = (text: string) => text;
 *         return { error: noStyle, warning: noStyle, info: noStyle };
 *     }
 *
 *     return {
 *         error: bold,
 *         warning: italic,
 *         info: dim
 *     };
 * }
 *
 * const styles = createStyleConfig();
 * console.log(styles.error("Error: File not found"));
 * console.log(styles.warning("Warning: Deprecated API"));
 * console.log(styles.info("Info: Operation completed"));
 * ```
 *
 * @example
 * **Documentation and Code Formatting**
 * ```ts
 * import { bold, italic, underline, dim } from "@nevware21/chromacon";
 *
 * // Style functions for code documentation
 * const formatKeyword = bold;        // Language keywords
 * const formatType = italic;         // Type annotations
 * const formatFunction = underline;  // Function names
 * const formatComment = dim;         // Comments
 *
 * function formatCodeExample(keyword: string, type: string, funcName: string, comment: string): string {
 *     return `${formatKeyword(keyword)} ${formatType(type)} ${formatFunction(funcName)} ${formatComment(comment)}`;
 * }
 *
 * console.log(formatCodeExample('const', 'string', 'getName()', '// Gets user name'));
 * // Output with appropriate styling for each element
 * ```
 *
 * @see {@link ChromaStyle} - Extended type that combines CsiStyle with string capabilities
 * @see {@link CsiColor} - Similar type for color formatting (red, blue, green, etc.)
 * @see {@link ColorLevel} - Enumeration controlling overall formatting support
 *
 * @since 1.0.0
 */
export type CsiStyle = (value: string) => string;

/**
 * A hybrid type that represents both a style formatting function and a string containing the current
 * theme formatting sequences. For the default ANSI theme, this will be ANSI escape codes.
 *
 * `ChromaStyle` is specifically designed for **text styling** (bold, italic, underline, etc.) rather
 * than color formatting. While {@link ChromaColor} handles color-specific formatting, `ChromaStyle`
 * focuses on text appearance modifications that don't involve color changes.
 *
 * **Key Differences from ChromaColor:**
 * - **Purpose**: `ChromaStyle` applies text styles (bold, italic, underline), while `ChromaColor` applies colors (red, blue, green)
 * - **Reset Behavior**: Style resets typically restore normal intensity/appearance, color resets restore default foreground/background
 * - **Combination**: Styles and colors can be combined together for rich text formatting
 * - **Independence**: Style formatting is independent of color support levels, though both respect the overall theme system
 *
 * Like `ChromaColor`, it can be used in two ways:
 * 1. **As a function** - to apply style formatting to text, automatically wrapping and resetting the style
 * 2. **As a string** - to get the current theme formatting sequences to enable the style
 *
 * The behavior adapts to the current theme system and respects color level settings for consistency.
 *
 * @param value - The input string to be styled when used as a function
 * @returns The input string wrapped with appropriate theme style codes when used as a function
 *
 * @example
 * **Basic Style Usage**
 * ```ts
 * import { bold, italic, underline, dim } from "@nevware21/chromacon";
 *
 * // Apply individual styles
 * console.log(bold("Important message"));
 * // Output: "\x1b[1mImportant message\x1b[22m"
 *
 * console.log(italic("Emphasized text"));
 * // Output: "\x1b[3mEmphasized text\x1b[23m"
 *
 * console.log(underline("Underlined text"));
 * // Output: "\x1b[4mUnderlined text\x1b[24m"
 * ```
 *
 * @example
 * **Style Composition and Nesting**
 * ```ts
 * import { bold, italic, underline, strikethrough } from "@nevware21/chromacon";
 *
 * // Combine multiple styles
 * console.log(bold(italic("Bold and italic")));
 * // Output: "\x1b[1m\x1b[3mBold and italic\x1b[23m\x1b[22m"
 *
 * // Complex style combinations
 * console.log(underline(bold("Underlined and bold")));
 * console.log(strikethrough(italic("Crossed out italic")));
 * ```
 *
 * @example
 * **Combining Styles with Colors**
 * ```ts
 * import { bold, italic, red, green, blue, bgYellow } from "@nevware21/chromacon";
 *
 * // Styles work independently of colors
 * console.log(red(bold("Bold red text")));
 * console.log(bold(green("Bold green text")));
 *
 * // Complex combinations
 * console.log(bgYellow(bold(blue("Bold blue text on yellow background"))));
 * console.log(italic(red("Italic red text")));
 * ```
 *
 * @example
 * **Usage as String (Raw Style Codes)**
 * ```ts
 * import { bold, italic, reset } from "@nevware21/chromacon";
 *
 * // Manual style control using string representation
 * console.log(`${bold}This is bold${reset} and this is normal`);
 * // Output: "\x1b[1mThis is bold\x1b[0m and this is normal"
 *
 * // Build complex formatting manually
 * const styledText = `Normal ${bold}bold ${italic}bold-italic${reset} normal again`;
 * console.log(styledText);
 * ```
 *
 * @example
 * **Dynamic Style Application**
 * ```ts
 * import { bold, italic, underline, dim } from "@nevware21/chromacon";
 *
 * const styleMap: Record<string, ChromaStyle> = {
 *     emphasis: bold,
 *     quote: italic,
 *     link: underline,
 *     muted: dim
 * };
 *
 * function formatText(type: keyof typeof styleMap, text: string): string {
 *     const styleFn = styleMap[type];
 *     return styleFn(text);
 * }
 *
 * console.log(formatText('emphasis', 'Important!'));
 * console.log(formatText('quote', 'Albert Einstein said...'));
 * console.log(formatText('link', 'https://example.com'));
 * ```
 *
 * @example
 * **Conditional Style Formatting**
 * ```ts
 * import { bold, dim, isColorSupported } from "@nevware21/chromacon";
 *
 * function formatHeading(text: string, level: 1 | 2 | 3): string {
 *     if (!isColorSupported()) {
 *         // Fallback formatting without styles
 *         const prefix = '='.repeat(4 - level);
 *         return `${prefix} ${text} ${prefix}`;
 *     }
 *
 *     // Use styles based on heading level
 *     switch (level) {
 *         case 1: return bold(text);
 *         case 2: return text; // Normal weight
 *         case 3: return dim(text);
 *         default: return text;
 *     }
 * }
 *
 * console.log(formatHeading("Main Title", 1));
 * console.log(formatHeading("Subtitle", 2));
 * console.log(formatHeading("Minor heading", 3));
 * ```
 *
 * @example
 * **Style Utility Functions**
 * ```ts
 * import { bold, italic, underline } from "@nevware21/chromacon";
 *
 * // Create reusable style utilities
 * const formatKeyword = (text: string) => bold(text);
 * const formatComment = (text: string) => italic(text);
 * const formatUrl = (text: string) => underline(text);
 *
 * // Use in code documentation
 * console.log(`The ${formatKeyword('const')} keyword declares a constant`);
 * console.log(`${formatComment('// This is a comment')}`);
 * console.log(`Visit ${formatUrl('https://github.com')} for more info`);
 * ```
 *
 * @see {@link CsiStyle} - The base function type for CSI style formatting
 * @see {@link ChromaColor} - Similar type for color formatting (red, blue, green, etc.)
 * @see {@link ColorLevel} - Enumeration controlling overall theme formatting support
 * @see {@link isColorSupported} - Check if formatting output is supported
 *
 * @since 1.0.0
 */
export type ChromaStyle = CsiStyle & string;

/**
 * A function type that applies CSI (Control Sequence Introducer) color codes to text strings.
 *
 * `CsiColor` represents the core functional interface for color formatting in terminal/console output.
 * It takes a string as input and returns that string wrapped with appropriate CSI escape sequences
 * for color formatting. This is the base type that {@link ChromaColor} extends to provide additional
 * string capabilities.
 *
 * CSI codes are part of the ANSI escape sequence standard and are widely supported across modern
 * terminals, console applications, and development tools.
 *
 * @param value - The input string to be formatted with color codes
 * @returns The input string wrapped with CSI color escape sequences and reset codes
 *
 * @example
 * **Basic Function Usage**
 * ```ts
 * import { red, green, blue } from "@nevware21/chromacon";
 *
 * // These are all CsiColor functions under the hood
 * const errorMsg: string = red("Connection failed");
 * const successMsg: string = green("Operation completed");
 * const infoMsg: string = blue("Processing data...");
 *
 * console.log(errorMsg);   // "\x1b[31mConnection failed\x1b[39m"
 * console.log(successMsg); // "\x1b[32mOperation completed\x1b[39m"
 * console.log(infoMsg);    // "\x1b[34mProcessing data...\x1b[39m"
 * ```
 *
 * @example
 * **Function Composition and Chaining**
 * ```ts
 * import { red, bold, underline } from "@nevware21/chromacon";
 *
 * // CsiColor functions can be composed
 * const formatError = (text: string) => red(bold(text));
 * const formatWarning = (text: string) => red(underline(text));
 *
 * console.log(formatError("Critical Error"));
 * // Output: "\x1b[31m\x1b[1mCritical Error\x1b[22m\x1b[39m"
 *
 * console.log(formatWarning("Warning Message"));
 * // Output: "\x1b[31m\x1b[4mWarning Message\x1b[24m\x1b[39m"
 * ```
 *
 * @example
 * **Custom Color Function Implementation**
 * ```ts
 * // Hypothetical custom implementation following CsiColor interface
 * const customRed: CsiColor = (value: string): string => {
 *     const startCode = '\x1b[31m';  // Red foreground
 *     const resetCode = '\x1b[39m';  // Reset to default foreground
 *     return startCode + value + resetCode;
 * };
 *
 * console.log(customRed("Custom red text"));
 * // Output: "\x1b[31mCustom red text\x1b[39m"
 * ```
 *
 * @example
 * **Dynamic Color Application**
 * ```ts
 * import { red, green, yellow, blue } from "@nevware21/chromacon";
 *
 * const colorMap: Record<string, CsiColor> = {
 *     error: red,
 *     success: green,
 *     warning: yellow,
 *     info: blue
 * };
 *
 * function logWithLevel(level: keyof typeof colorMap, message: string) {
 *     const colorFn = colorMap[level];
 *     console.log(colorFn(`[${level.toUpperCase()}] ${message}`));
 * }
 *
 * logWithLevel('error', 'File not found');
 * logWithLevel('success', 'File saved successfully');
 * ```
 *
 * @example
 * **Higher-Order Function Usage**
 * ```ts
 * import { red, green, blue } from "@nevware21/chromacon";
 *
 * // Array of color functions
 * const colors: CsiColor[] = [red, green, blue];
 *
 * // Apply different colors to array items
 * const items = ['Error', 'Success', 'Info'];
 * const coloredItems = items.map((item, index) => {
 *     const colorFn = colors[index % colors.length];
 *     return colorFn(item);
 * });
 *
 * console.log(coloredItems.join(' | '));
 * // Output: "\x1b[31mError\x1b[39m | \x1b[32mSuccess\x1b[39m | \x1b[34mInfo\x1b[39m"
 * ```
 *
 * @example
 * **Conditional Formatting**
 * ```ts
 * import { red, green, isColorSupported } from "@nevware21/chromacon";
 *
 * function conditionalColor(text: string, condition: boolean): string {
 *     const colorFn: CsiColor = condition ? green : red;
 *
 *     // Apply color only if supported
 *     return isColorSupported() ? colorFn(text) : `[${condition ? '✓' : '✗'}] ${text}`;
 * }
 *
 * console.log(conditionalColor("Test passed", true));
 * console.log(conditionalColor("Test failed", false));
 * ```
 *
 * @see {@link ChromaColor} - Extended type that combines CsiColor with string capabilities
 * @see {@link CsiStyle} - Similar type for style formatting (bold, italic, etc.)
 * @see {@link ColorLevel} - Enumeration controlling color support levels
 *
 * @since 1.0.0
 */
export type CsiColor = (value: string) => string;

/**
 * A hybrid type that represents both a color formatting function and a string containing the current
 * theme formatting sequences. For the default ANSI theme, this will be ANSI escape codes.
 *
 * `ChromaColor` can be used in two ways:
 * 1. **As a function** - to apply color formatting to text, automatically wrapping and resetting the color
 * 2. **As a string** - to get the current theme formatting sequences to enable the color, which can be
 * combined with other strings or formatting manually
 *
 * The behavior adapts automatically based on the detected or configured {@link ColorLevel}:
 * - `ColorLevel.None`: No color codes are applied (disabled)
 * - `ColorLevel.Basic`: Uses standard 16 colors (8 basic + 8 bright)
 * - `ColorLevel.Ansi256`: Uses 8-bit color palette (256 colors)
 * - `ColorLevel.Rgb`: Uses 24-bit true color (16.7 million colors)
 *
 * @param value - The input string to be colored when used as a function
 * @returns The input string wrapped with appropriate theme color codes when used as a function
 *
 * @example
 * **Basic Usage as Function**
 * ```ts
 * import { red, green, blue, bold } from "@nevware21/chromacon";
 *
 * // Apply red color to text
 * console.log(red("Error: Something went wrong"));
 * // Output: "\x1b[31mError: Something went wrong\x1b[39m"
 *
 * // Combine with styles
 * console.log(bold(red("Critical Alert")));
 * // Output: "\x1b[1m\x1b[31mCritical Alert\x1b[39m\x1b[22m"
 * ```
 *
 * @example
 * **Usage as String (Raw ANSI Codes)**
 * ```ts
 * import { red, blue, reset } from "@nevware21/chromacon";
 *
 * // Get raw ANSI escape sequence
 * console.log(`${red}This is red text${reset}`);
 * // Output: "\x1b[31mThis is red text\x1b[0m"
 *
 * // Build complex formatting manually
 * const coloredText = `${blue}Blue ${red}Red ${blue}Blue again${reset}`;
 * console.log(coloredText);
 * ```
 *
 * @example
 * **Background Colors**
 * ```ts
 * import { bgRed, bgGreen, white, black } from "@nevware21/chromacon";
 *
 * // White text on red background
 * console.log(bgRed(white("Warning!")));
 *
 * // Black text on green background
 * console.log(bgGreen(black("Success!")));
 * ```
 *
 * @example
 * **Conditional Coloring Based on Support**
 * ```ts
 * import { isColorSupported, red, green } from "@nevware21/chromacon";
 *
 * function logStatus(message: string, isSuccess: boolean) {
 *     const color = isSuccess ? green : red;
 *
 *     if (isColorSupported()) {
 *         console.log(color(message));
 *     } else {
 *         console.log(`[${isSuccess ? 'OK' : 'ERROR'}] ${message}`);
 *     }
 * }
 * ```
 *
 * @example
 * **Nesting and Complex Formatting**
 * ```ts
 * import { red, blue, bold, underline, bgYellow, black } from "@nevware21/chromacon";
 *
 * // Nested colors and styles
 * const message = red(`Error in ${blue(bold("file.ts"))} at ${underline("line 42")}`);
 * console.log(message);
 *
 * // Highlight specific parts
 * const highlighted = `Normal text ${bgYellow(black(" IMPORTANT "))} more text`;
 * console.log(highlighted);
 * ```
 *
 * @example
 * **Template String Integration**
 * ```ts
 * import { green, red, yellow } from "@nevware21/chromacon";
 *
 * const status = "running";
 * const count = 42;
 *
 * console.log(`Status: ${green(status)}, Count: ${yellow(count.toString())}`);
 * // Output with colors: "Status: \x1b[32mrunning\x1b[39m, Count: \x1b[33m42\x1b[39m"
 * ```
 *
 * @example
 * **Color Level Adaptation**
 * ```ts
 * import { setColorLevel, red, ColorLevel } from "@nevware21/chromacon";
 *
 * // Force different color levels
 * setColorLevel(ColorLevel.None);
 * console.log(red("No color"));        // Output: "No color"
 *
 * setColorLevel(ColorLevel.Basic);
 * console.log(red("Basic color"));     // Output: "\x1b[31mBasic color\x1b[39m"
 *
 * setColorLevel(ColorLevel.Ansi256);   // Supports 256 colors
 * setColorLevel(ColorLevel.Rgb);       // Supports true color
 * ```
 *
 * @see {@link CsiColor} - The base function type for CSI color formatting
 * @see {@link ColorLevel} - Enumeration of supported color levels
 * @see {@link isColorSupported} - Check if color output is supported
 * @see {@link setColorLevel} - Manually configure color support level
 */
export type ChromaColor = CsiColor & string;

export interface ICodeTableDetail {
    /**
     * The common abbreviation given to the code
     */
    abbr: string;

    /**
     * A descriptive name for the code
     */
    name: string;
}

export type CodeTable = { [key: number]: ICodeTableDetail };

