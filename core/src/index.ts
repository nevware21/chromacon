/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2024 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

export { ColorLevel } from "./enums/ColorLevel";

export { stripAnsi, matchAnsi } from "./ansi/stripAnsi";

export { setColorDetector, setColorLevel, getColorLevel, isColorSupported, isRgb256ColorSupported, isTrueColorSupported } from "./utils/supported";
