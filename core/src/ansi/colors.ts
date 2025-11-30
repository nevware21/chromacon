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

/**
 * Set the foreground color to black
 * @group Colors
 */
export const black: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Black));

/**
 * Set the foreground color to red
 * @group Colors
 */
export const red: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Red));

/**
 * Set the foreground color to green
 * @group Colors
 */
export const green: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Green));

/**
 * Set the foreground color to yellow
 * @group Colors
 */
export const yellow: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Yellow));

/**
 * Set the foreground color to blue
 * @group Colors
 */
export const blue: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Blue));

/**
 * Set the foreground color to magenta
 * @group Colors
 */
export const magenta: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Magenta));

/**
 * Set the foreground color to cyan
 * @group Colors
 */
export const cyan: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Cyan));

/**
 * Set the foreground color to white
 * @group Colors
 */
export const white: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.White));

/**
 * Set the foreground color to gray
 * @group Colors
 */
export const gray: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Gray));

/**
 * Set the foreground color to grey
 * @group Colors
 */
export const grey: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.Grey));

/**
 * Set the foreground color to bright red
 * @group Colors
 */
export const brightRed: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightRed));

/**
 * Set the foreground color to bright green
 * @group Colors
 */
export const brightGreen: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightGreen));

/**
 * Set the foreground color to bright yellow
 * @group Colors
 */
export const brightYellow: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightYellow));

/**
 * Set the foreground color to bright blue
 * @group Colors
 */
export const brightBlue: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightBlue));

/**
 * Set the foreground color to bright magenta
 * @group Colors
 */
export const brightMagenta: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightMagenta));

/**
 * Set the foreground color to bright cyan
 * @group Colors
 */
export const brightCyan: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightCyan));

/**
 * Set the foreground color to bright white
 * @group Colors
 */
export const brightWhite: ChromaColor = (/*#__PURE__*/createFgColor(CsiBaseColors.BrightWhite));

/**
 * Set the background color to black
 * @group Background Colors
 */
export const bgBlack: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Black));

/**
 * Set the background color to red
 * @group Background Colors
 */
export const bgRed: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Red));

/**
 * Set the background color to green
 * @group Background Colors
 */
export const bgGreen: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Green));

/**
 * Set the background color to yellow
 * @group Background Colors
 */
export const bgYellow: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Yellow));

/**
 * Set the background color to blue
 * @group Background Colors
 */
export const bgBlue: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Blue));

/**
 * Set the background color to magenta
 * @group Background Colors
 */
export const bgMagenta: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Magenta));

/**
 * Set the background color to cyan
 * @group Background Colors
 */
export const bgCyan: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Cyan));

/**
 * Set the background color to white
 * @group Background Colors
 */
export const bgWhite: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.White));

/**
 * Set the background color to gray
 * @group Background Colors
 */
export const bgGray: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Gray));

/**
 * Set the background color to grey
 * @group Background Colors
 */
export const bgGrey: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.Grey));

/**
 * Set the background color to bright red
 * @group Background Colors
 */
export const bgBrightRed: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightRed));

/**
 * Set the background color to bright green
 * @group Background Colors
 */
export const bgBrightGreen: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightGreen));

/**
 * Set the background color to bright yellow
 * @group Background Colors
 */
export const bgBrightYellow: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightYellow));

/**
 * Set the background color to bright blue
 * @group Background Colors
 */
export const bgBrightBlue: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightBlue));

/**
 * Set the background color to bright magenta
 * @group Background Colors
 */
export const bgBrightMagenta: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightMagenta));

/**
 * Set the background color to bright cyan
 * @group Background Colors
 */
export const bgBrightCyan: ChromaColor = (/*#__PURE__*/createBgColor(CsiBaseColors.BrightCyan));

/**
 * Set the background color to bright white
 * @group Background Colors
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
