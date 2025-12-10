/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { CsiBaseColors, CSIColors, CsiOffsets } from "../enums/CsiColors";
import { ChromaColor } from "../interfaces/types";
import { _createCsiColor } from "../utils/createColor";

const FG_DEFAULT = { s: CSIColors.FgDefault };
const BG_DEFAULT = { s: CSIColors.BgDefault };

// Factory function to create colors more efficiently
/*#__NO_SIDE_EFFECTS__*/
function createFgColor(baseColor: CsiBaseColors): ChromaColor {
    return _createCsiColor({ c: { b: baseColor, o: CsiOffsets.Fg } }, FG_DEFAULT);
}

/*#__NO_SIDE_EFFECTS__*/
function createBgColor(baseColor: CsiBaseColors): ChromaColor {
    return _createCsiColor({ c: { b: baseColor, o: CsiOffsets.Bg } }, BG_DEFAULT);
}

// ANSI Theme
/**
 * Set the foreground color to black
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * black("text")        // => "\x1b[30mtext\x1b[39m" (includes reset to default foreground)
 * `${black}text`       // => "\x1b[30mtext" (no reset included)
 * black + "text"       // => "\x1b[30mtext" (no reset included)
 * black.concat("text") // => "\x1b[30mtext" (no reset included)
 * ```
 */
export const black: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Black));

/**
 * Set the foreground color to red
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * red("text")          // => "\x1b[31mtext\x1b[39m" (includes reset to default foreground)
 * `${red}text`         // => "\x1b[31mtext" (no reset included)
 * red + "text"         // => "\x1b[31mtext" (no reset included)
 * red.concat("text")   // => "\x1b[31mtext" (no reset included)
 * ```
 */
export const red: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Red));

/**
 * Set the foreground color to green
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * green("text")        // => "\x1b[32mtext\x1b[39m" (includes reset to default foreground)
 * `${green}text`       // => "\x1b[32mtext" (no reset included)
 * green + "text"       // => "\x1b[32mtext" (no reset included)
 * green.concat("text") // => "\x1b[32mtext" (no reset included)
 * ```
 */
export const green: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Green));

/**
 * Set the foreground color to yellow
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * yellow("text")           // => "\x1b[33mtext\x1b[39m" (includes reset to default foreground)
 * `${yellow}text`          // => "\x1b[33mtext" (no reset included)
 * yellow + "text"          // => "\x1b[33mtext" (no reset included)
 * yellow.concat("text")    // => "\x1b[33mtext" (no reset included)
 * ```
 */
export const yellow: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Yellow));

/**
 * Set the foreground color to blue
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * blue("text")         // => "\x1b[34mtext\x1b[39m" (includes reset to default foreground)
 * `${blue}text`        // => "\x1b[34mtext" (no reset included)
 * blue + "text"        // => "\x1b[34mtext" (no reset included)
 * blue.concat("text")  // => "\x1b[34mtext" (no reset included)
 * ```
 */
export const blue: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Blue));

/**
 * Set the foreground color to magenta
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * magenta("text")          // => "\x1b[35mtext\x1b[39m" (includes reset to default foreground)
 * `${magenta}text`         // => "\x1b[35mtext" (no reset included)
 * magenta + "text"         // => "\x1b[35mtext" (no reset included)
 * magenta.concat("text")   // => "\x1b[35mtext" (no reset included)
 * ```
 */
export const magenta: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Magenta));

/**
 * Set the foreground color to cyan
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * cyan("text")         // => "\x1b[36mtext\x1b[39m" (includes reset to default foreground)
 * `${cyan}text`        // => "\x1b[36mtext" (no reset included)
 * cyan + "text"        // => "\x1b[36mtext" (no reset included)
 * cyan.concat("text")  // => "\x1b[36mtext" (no reset included)
 * ```
 */
export const cyan: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Cyan));

/**
 * Set the foreground color to white
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * white("text")        // => "\x1b[37mtext\x1b[39m" (includes reset to default foreground)
 * `${white}text`       // => "\x1b[37mtext" (no reset included)
 * white + "text"       // => "\x1b[37mtext" (no reset included)
 * white.concat("text") // => "\x1b[37mtext" (no reset included)
 * ```
 */
export const white: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.White));

/**
 * Set the foreground color to gray
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * gray("text")         // => "\x1b[90mtext\x1b[39m" (includes reset to default foreground)
 * `${gray}text`        // => "\x1b[90mtext" (no reset included)
 * gray + "text"        // => "\x1b[90mtext" (no reset included)
 * gray.concat("text")  // => "\x1b[90mtext" (no reset included)
 * ```
 */
export const gray: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Gray));

/**
 * Set the foreground color to grey
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * grey("text")         // => "\x1b[90mtext\x1b[39m" (includes reset to default foreground)
 * `${grey}text`        // => "\x1b[90mtext" (no reset included)
 * grey + "text"        // => "\x1b[90mtext" (no reset included)
 * grey.concat("text")  // => "\x1b[90mtext" (no reset included)
 * ```
 */
export const grey: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Grey));

/**
 * Set the foreground color to bright red
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * brightRed("text")        // => "\x1b[91mtext\x1b[39m" (includes reset to default foreground)
 * `${brightRed}text`       // => "\x1b[91mtext" (no reset included)
 * brightRed + "text"       // => "\x1b[91mtext" (no reset included)
 * brightRed.concat("text") // => "\x1b[91mtext" (no reset included)
 * ```
 */
export const brightRed: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightRed));

/**
 * Set the foreground color to bright green
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * brightGreen("text")          // => "\x1b[92mtext\x1b[39m" (includes reset to default foreground)
 * `${brightGreen}text`         // => "\x1b[92mtext" (no reset included)
 * brightGreen + "text"         // => "\x1b[92mtext" (no reset included)
 * brightGreen.concat("text")   // => "\x1b[92mtext" (no reset included)
 * ```
 */
export const brightGreen: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightGreen));

/**
 * Set the foreground color to bright yellow
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * brightYellow("text")         // => "\x1b[93mtext\x1b[39m" (includes reset to default foreground)
 * `${brightYellow}text`        // => "\x1b[93mtext" (no reset included)
 * brightYellow + "text"        // => "\x1b[93mtext" (no reset included)
 * brightYellow.concat("text")  // => "\x1b[93mtext" (no reset included)
 * ```
 */
export const brightYellow: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightYellow));

/**
 * Set the foreground color to bright blue
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * brightBlue("text")           // => "\x1b[94mtext\x1b[39m" (includes reset to default foreground)
 * `${brightBlue}text`          // => "\x1b[94mtext" (no reset included)
 * brightBlue + "text"          // => "\x1b[94mtext" (no reset included)
 * brightBlue.concat("text")    // => "\x1b[94mtext" (no reset included)
 * ```
 */
export const brightBlue: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightBlue));

/**
 * Set the foreground color to bright magenta
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * brightMagenta("text")        // => "\x1b[95mtext\x1b[39m" (includes reset to default foreground)
 * `${brightMagenta}text`       // => "\x1b[95mtext" (no reset included)
 * brightMagenta + "text"       // => "\x1b[95mtext" (no reset included)
 * brightMagenta.concat("text") // => "\x1b[95mtext" (no reset included)
 * ```
 */
export const brightMagenta: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightMagenta));

/**
 * Set the foreground color to bright cyan
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * brightCyan("text")           // => "\x1b[96mtext\x1b[39m" (includes reset to default foreground)
 * `${brightCyan}text`          // => "\x1b[96mtext" (no reset included)
 * brightCyan + "text"          // => "\x1b[96mtext" (no reset included)
 * brightCyan.concat("text")    // => "\x1b[96mtext" (no reset included)
 * ```
 */
export const brightCyan: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightCyan));

/**
 * Set the foreground color to bright white
 * @group Colors
 * @example
 * ```ts
 * // ANSI Theme
 * brightWhite("text")          // => "\x1b[97mtext\x1b[39m" (includes reset to default foreground)
 * `${brightWhite}text`         // => "\x1b[97mtext" (no reset included)
 * brightWhite + "text"         // => "\x1b[97mtext" (no reset included)
 * brightWhite.concat("text")   // => "\x1b[97mtext" (no reset included)
 * ```
 */
export const brightWhite: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightWhite));

/**
 * Set the background color to black
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgBlack("text")          // => "\x1b[40mtext\x1b[49m" (includes reset to default background)
 * `${bgBlack}text`         // => "\x1b[40mtext" (no reset included)
 * bgBlack + "text"         // => "\x1b[40mtext" (no reset included)
 * bgBlack.concat("text")   // => "\x1b[40mtext" (no reset included)
 * ```
 */
export const bgBlack: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Black));

/**
 * Set the background color to red
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgRed("text")          // => "\x1b[41mtext\x1b[49m" (includes reset to default background)
 * `${bgRed}text`         // => "\x1b[41mtext" (no reset included)
 * bgRed + "text"         // => "\x1b[41mtext" (no reset included)
 * bgRed.concat("text")   // => "\x1b[41mtext" (no reset included)
 * ```
 */
export const bgRed: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Red));

/**
 * Set the background color to green
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgGreen("text")          // => "\x1b[42mtext\x1b[49m" (includes reset to default background)
 * `${bgGreen}text`         // => "\x1b[42mtext" (no reset included)
 * bgGreen + "text"         // => "\x1b[42mtext" (no reset included)
 * bgGreen.concat("text")   // => "\x1b[42mtext" (no reset included)
 * ```
 */
export const bgGreen: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Green));

/**
 * Set the background color to yellow
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgYellow("text")          // => "\x1b[43mtext\x1b[49m" (includes reset to default background)
 * `${bgYellow}text`         // => "\x1b[43mtext" (no reset included)
 * bgYellow + "text"         // => "\x1b[43mtext" (no reset included)
 * bgYellow.concat("text")   // => "\x1b[43mtext" (no reset included)
 * ```
 */
export const bgYellow: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Yellow));

/**
 * Set the background color to blue
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgBlue("text")          // => "\x1b[44mtext\x1b[49m" (includes reset to default background)
 * `${bgBlue}text`         // => "\x1b[44mtext" (no reset included)
 * bgBlue + "text"         // => "\x1b[44mtext" (no reset included)
 * bgBlue.concat("text")   // => "\x1b[44mtext" (no reset included)
 * ```
 */
export const bgBlue: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Blue));

/**
 * Set the background color to magenta
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgMagenta("text")          // => "\x1b[45mtext\x1b[49m" (includes reset to default background)
 * `${bgMagenta}text`         // => "\x1b[45mtext" (no reset included)
 * bgMagenta + "text"         // => "\x1b[45mtext" (no reset included)
 * bgMagenta.concat("text")   // => "\x1b[45mtext" (no reset included)
 * ```
 */
export const bgMagenta: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Magenta));

/**
 * Set the background color to cyan
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgCyan("text")          // => "\x1b[46mtext\x1b[49m" (includes reset to default background)
 * `${bgCyan}text`         // => "\x1b[46mtext" (no reset included)
 * bgCyan + "text"         // => "\x1b[46mtext" (no reset included)
 * bgCyan.concat("text")   // => "\x1b[46mtext" (no reset included)
 * ```
 */
export const bgCyan: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Cyan));

/**
 * Set the background color to white
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgWhite("text")          // => "\x1b[47mtext\x1b[49m" (includes reset to default background)
 * `${bgWhite}text`         // => "\x1b[47mtext" (no reset included)
 * bgWhite + "text"         // => "\x1b[47mtext" (no reset included)
 * bgWhite.concat("text")   // => "\x1b[47mtext" (no reset included)
 * ```
 */
export const bgWhite: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.White));

/**
 * Set the background color to gray
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgGray("text")          // => "\x1b[100mtext\x1b[49m" (includes reset to default background)
 * `${bgGray}text`         // => "\x1b[100mtext" (no reset included)
 * bgGray + "text"         // => "\x1b[100mtext" (no reset included)
 * bgGray.concat("text")   // => "\x1b[100mtext" (no reset included)
 * ```
 */
export const bgGray: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Gray));

/**
 * Set the background color to grey
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgGrey("text")          // => "\x1b[100mtext\x1b[49m" (includes reset to default background)
 * `${bgGrey}text`         // => "\x1b[100mtext" (no reset included)
 * bgGrey + "text"         // => "\x1b[100mtext" (no reset included)
 * bgGrey.concat("text")   // => "\x1b[100mtext" (no reset included)
 * ```
 */
export const bgGrey: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Grey));

/**
 * Set the background color to bright red
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgBrightRed("text")          // => "\x1b[101mtext\x1b[49m" (includes reset to default background)
 * `${bgBrightRed}text`         // => "\x1b[101mtext" (no reset included)
 * bgBrightRed + "text"         // => "\x1b[101mtext" (no reset included)
 * bgBrightRed.concat("text")   // => "\x1b[101mtext" (no reset included)
 * ```
 */
export const bgBrightRed: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightRed));

/**
 * Set the background color to bright green
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgBrightGreen("text")          // => "\x1b[102mtext\x1b[49m" (includes reset to default background)
 * `${bgBrightGreen}text`         // => "\x1b[102mtext" (no reset included)
 * bgBrightGreen + "text"         // => "\x1b[102mtext" (no reset included)
 * bgBrightGreen.concat("text")   // => "\x1b[102mtext" (no reset included)
 * ```
 */
export const bgBrightGreen: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightGreen));

/**
 * Set the background color to bright yellow
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgBrightYellow("text")          // => "\x1b[103mtext\x1b[49m" (includes reset to default background)
 * `${bgBrightYellow}text`         // => "\x1b[103mtext" (no reset included)
 * bgBrightYellow + "text"         // => "\x1b[103mtext" (no reset included)
 * bgBrightYellow.concat("text")   // => "\x1b[103mtext" (no reset included)
 * ```
 */
export const bgBrightYellow: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightYellow));

/**
 * Set the background color to bright blue
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgBrightBlue("text")          // => "\x1b[104mtext\x1b[49m" (includes reset to default background)
 * `${bgBrightBlue}text`         // => "\x1b[104mtext" (no reset included)
 * bgBrightBlue + "text"         // => "\x1b[104mtext" (no reset included)
 * bgBrightBlue.concat("text")   // => "\x1b[104mtext" (no reset included)
 * ```
 */
export const bgBrightBlue: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightBlue));

/**
 * Set the background color to bright magenta
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgBrightMagenta("text")          // => "\x1b[105mtext\x1b[49m" (includes reset to default background)
 * `${bgBrightMagenta}text`         // => "\x1b[105mtext" (no reset included)
 * bgBrightMagenta + "text"         // => "\x1b[105mtext" (no reset included)
 * bgBrightMagenta.concat("text")   // => "\x1b[105mtext" (no reset included)
 * ```
 */
export const bgBrightMagenta: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightMagenta));

/**
 * Set the background color to bright cyan
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgBrightCyan("text")          // => "\x1b[106mtext\x1b[49m" (includes reset to default background)
 * `${bgBrightCyan}text`         // => "\x1b[106mtext" (no reset included)
 * bgBrightCyan + "text"         // => "\x1b[106mtext" (no reset included)
 * bgBrightCyan.concat("text")   // => "\x1b[106mtext" (no reset included)
 * ```
 */
export const bgBrightCyan: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightCyan));

/**
 * Set the background color to bright white
 * @group Background Colors
 * @example
 * ```ts
 * // ANSI Theme
 * bgBrightWhite("text")          // => "\x1b[107mtext\x1b[49m" (includes reset to default background)
 * `${bgBrightWhite}text`         // => "\x1b[107mtext" (no reset included)
 * bgBrightWhite + "text"         // => "\x1b[107mtext" (no reset included)
 * bgBrightWhite.concat("text")   // => "\x1b[107mtext" (no reset included)
 * ```
 */
export const bgBrightWhite: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightWhite));

/**
 * Set the underline color
 * @group Colors
 */
export const ulColor: ChromaColor = (/*#__PURE__*/_createCsiColor({ s: CSIColors.UlColor }, {s: CSIColors.UlDefaultColor }));

/**
 * Set the default underline color
 * @group Colors
 */
export const ulDefaultColor: ChromaColor = (/*#__PURE__*/_createCsiColor({ s: CSIColors.UlDefaultColor }));
