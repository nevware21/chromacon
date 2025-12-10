/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { CSIColors } from "../enums/CsiColors";
import { ChromaStyle } from "../interfaces/types";
import { _createStyle } from "../utils/createStyle";

/**
 * Reset bth the Normal color and style with all attributes off.
 * @group Colors
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * reset("text")        // => "\x1b[0mtext\x1b[0m" (includes reset)
 * `${reset}text`       // => "\x1b[0mtext" (no reset included)
 * reset + "text"       // => "\x1b[0mtext" (no reset included)
 * reset.concat("text") // => "\x1b[0mtext" (no reset included)
 * ```
 */
export const reset: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Reset }));

/**
 * Bold color or style
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * bold("text")        // => "\x1b[1mtext\x1b[22m" (includes reset to normal intensity)
 * `${bold}text`       // => "\x1b[1mtext" (no reset included)
 * bold + "text"       // => "\x1b[1mtext" (no reset included)
 * bold.concat("text") // => "\x1b[1mtext" (no reset included)
 * ```
 */
export const bold: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Bold }, { s: CSIColors.NormalIntensity }));

/**
 * Dim color or style
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * dim("text")        // => "\x1b[2mtext\x1b[22m" (includes reset to normal intensity)
 * `${dim}text`       // => "\x1b[2mtext" (no reset included)
 * dim + "text"       // => "\x1b[2mtext" (no reset included)
 * dim.concat("text") // => "\x1b[2mtext" (no reset included)
 * ```
 */
export const dim: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Dim },{ s: CSIColors.NormalIntensity }));

/**
 * Italic style
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * italic("text")        // => "\x1b[3mtext\x1b[23m" (includes reset to not italic)
 * `${italic}text`       // => "\x1b[3mtext" (no reset included)
 * italic + "text"       // => "\x1b[3mtext" (no reset included)
 * italic.concat("text") // => "\x1b[3mtext" (no reset included)
 * ```
 */
export const italic: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Italic }, { s: CSIColors.NotItalic }));

/**
 * Underline style
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * underline("text")        // => "\x1b[4mtext\x1b[24m" (includes reset to not underline)
 * `${underline}text`       // => "\x1b[4mtext" (no reset included)
 * underline + "text"       // => "\x1b[4mtext" (no reset included)
 * underline.concat("text") // => "\x1b[4mtext" (no reset included)
 * ```
 */
export const underline: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Underline }, { s: CSIColors.NotUnderline }));

/**
 * Blink style
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * blink("text")        // => "\x1b[5mtext\x1b[25m" (includes reset to not blink)
 * `${blink}text`       // => "\x1b[5mtext" (no reset included)
 * blink + "text"       // => "\x1b[5mtext" (no reset included)
 * blink.concat("text") // => "\x1b[5mtext" (no reset included)
 * ```
 */
export const blink: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Blink }, { s: CSIColors.NotBlink }));

/**
 * Reverse or Inverse style. Swaps the foreground and background colors.
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * inverse("text")        // => "\x1b[7mtext\x1b[27m" (includes reset to not inverse)
 * `${inverse}text`       // => "\x1b[7mtext" (no reset included)
 * inverse + "text"       // => "\x1b[7mtext" (no reset included)
 * inverse.concat("text") // => "\x1b[7mtext" (no reset included)
 * ```
 */
export const inverse: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Inverse }, { s: CSIColors.NotInverse }));

/**
 * Hidden style
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * hidden("text")        // => "\x1b[8mtext\x1b[28m" (includes reset to not hidden)
 * `${hidden}text`       // => "\x1b[8mtext" (no reset included)
 * hidden + "text"       // => "\x1b[8mtext" (no reset included)
 * hidden.concat("text") // => "\x1b[8mtext" (no reset included)
 * ```
 */
export const hidden: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Hidden }, { s: CSIColors.NotHidden }));

/**
 * Crossed out / Strikethrough style
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * strikethrough("text")        // => "\x1b[9mtext\x1b[29m" (includes reset to not strikethrough)
 * `${strikethrough}text`       // => "\x1b[9mtext" (no reset included)
 * strikethrough + "text"       // => "\x1b[9mtext" (no reset included)
 * strikethrough.concat("text") // => "\x1b[9mtext" (no reset included)
 * ```
 */
export const strikethrough: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Strikethrough }, { s: CSIColors.NotStrikethrough }));

/**
 * Disable proportional spacing
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * disableProportionalSpacing("text")        // => "\x1b[50mtext" (no reset available)
 * `${disableProportionalSpacing}text`       // => "\x1b[50mtext" (no reset included)
 * disableProportionalSpacing + "text"       // => "\x1b[50mtext" (no reset included)
 * disableProportionalSpacing.concat("text") // => "\x1b[50mtext" (no reset included)
 * ```
 */
export const disableProportionalSpacing: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.DisableProportionalSpacing }));

/**
 * Framed style
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * framed("text")        // => "\x1b[51mtext\x1b[54m" (includes reset to not framed)
 * `${framed}text`       // => "\x1b[51mtext" (no reset included)
 * framed + "text"       // => "\x1b[51mtext" (no reset included)
 * framed.concat("text") // => "\x1b[51mtext" (no reset included)
 * ```
 */
export const framed: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Framed }, { s: CSIColors.NotFramed }));

/**
 * Encircled style
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * encircled("text")        // => "\x1b[52mtext\x1b[0m" (includes full reset)
 * `${encircled}text`       // => "\x1b[52mtext" (no reset included)
 * encircled + "text"       // => "\x1b[52mtext" (no reset included)
 * encircled.concat("text") // => "\x1b[52mtext" (no reset included)
 * ```
 */
export const encircled: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Encircled }));

/**
 * Overlined style (Not supported in Terminal app)
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * overlined("text")        // => "\x1b[53mtext\x1b[55m" (includes reset to not overlined)
 * `${overlined}text`       // => "\x1b[53mtext" (no reset included)
 * overlined + "text"       // => "\x1b[53mtext" (no reset included)
 * overlined.concat("text") // => "\x1b[53mtext" (no reset included)
 * ```
 */
export const overlined: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Overlined }, { s: CSIColors.NotOverlined }));

/**
 * Disable / Not framed style
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * notFramed("text")        // => "\x1b[54mtext" (no reset available)
 * `${notFramed}text`       // => "\x1b[54mtext" (no reset included)
 * notFramed + "text"       // => "\x1b[54mtext" (no reset included)
 * notFramed.concat("text") // => "\x1b[54mtext" (no reset included)
 * ```
 */
export const notFramed: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.NotFramed }));

/**
 * Disable / Not encircled (Overlined) style
 * @group Styles
 * @example
 * ```ts
 * // ANSI Theme
 * notOverlined("text")        // => "\x1b[55mtext" (no reset available)
 * `${notOverlined}text`       // => "\x1b[55mtext" (no reset included)
 * notOverlined + "text"       // => "\x1b[55mtext" (no reset included)
 * notOverlined.concat("text") // => "\x1b[55mtext" (no reset included)
 * ```
 */
export const notOverlined: ChromaStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.NotOverlined }));
