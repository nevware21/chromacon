/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

export { ColorLevel } from "./enums/ColorLevel";
export { CSIColors } from "./enums/CsiColors";
export {
    CsiStyle, ChromaStyle,
    CsiColor, ChromaColor
} from "./interfaces/types";

export { stripAnsi, matchAnsi } from "./ansi/stripAnsi";

export {
    setColorDetector, setColorLevel, getColorLevel,
    isColorSupported, isRgb256ColorSupported, isTrueColorSupported
} from "./utils/supported";

export {
    // Basic colors
    black, red, green, yellow, blue, magenta, cyan, white,
    gray, grey, brightRed, brightGreen, brightYellow, brightBlue, brightMagenta, brightCyan, brightWhite,
    // Basic background colors
    bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite,
    bgGray, bgGrey, bgBrightRed, bgBrightGreen, bgBrightYellow, bgBrightBlue, bgBrightMagenta, bgBrightCyan, bgBrightWhite,

    ulColor, ulDefaultColor
} from "./ansi/colors";

export {
    // Reset to default
    reset,
    
    // Styles
    bold, dim, italic, underline, blink, inverse, hidden, strikethrough,
    disableProportionalSpacing, framed, encircled, overlined, notFramed, notOverlined
} from "./ansi/styles";