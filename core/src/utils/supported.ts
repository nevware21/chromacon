/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { isNullOrUndefined } from "@nevware21/ts-utils";
import { ColorLevel } from "../enums/ColorLevel";
import { _detectColorSupport } from "./_detect";
import { _resetRuntime } from "./runtime";
import { _activeTheme } from "../theme/_activeTheme";

/**
 * Manually set the color detector function to use for detecting the color level.
 * If the function is not provided, the default automatic detection will be used.
 * @param detectFn - The function to use for detecting the color level
 * @example
 * ```ts
 * import { setColorDetector, ColorLevel } from "@nevware21/chromacon";
 *
 * setColorDetector(() => {
 *    // Custom detection logic
 *   return ColorLevel.TrueColor;
 * });
 *
 * // Check if the terminal supports true color
 * if (isTrueColorSupported()) {
 *  console.log("True color is supported");
 * }
 *
 * // Reset to automatic detection
 * setColorDetector();
 * ```
 */
/*#__NO_SIDE_EFFECTS__*/
export function setColorDetector(detectFn: () => ColorLevel): void {
    // _resetRuntime();
    if (_activeTheme.v) {
        _activeTheme.v.detector(detectFn);
    }
}

/**
 * Manually set the current color level, overriding the automatic detection.
 * if the level is not provided, the automatic detection will be used, resetting any
 * manual or previously detected level.
 *
 * @param level The color level to set
 * @example
 * ```ts
 * import { setColorLevel, ColorLevel } from "@nevware21/chromacon";
 *
 * // Set the color level to 256 colors
 * setColorLevel(ColorLevel.Rgb256);
 *
 * // Check if the terminal supports 256 colors
 * if (isRgb256ColorSupported()) {
 *   console.log("256 colors are supported");
 * }
 *
 * // Reset to automatic detection
 * setColorLevel();
 *
 * // Check if the terminal supports true color
 * if (isTrueColorSupported()) {
 *  console.log("True color is supported");
 * }
 * ```
 */
/*#__NO_SIDE_EFFECTS__*/
export function setColorLevel(level?: ColorLevel): void {
    // Also reset the runtime for the global colorLevel for compatibility
    // _resetRuntime();

    _activeTheme.v.colorLvl = isNullOrUndefined(level) ? ColorLevel.AutoDetect : level;
}

/**
 * Returns the current maximum color level supported by the terminal.
 * @returns The current color level supported by the terminal
 * @example
 * ```ts
 * import { getColorLevel, ColorLevel } from "@nevware21/chromacon";
 *
 * // Get the current color level
 * let level = getColorLevel();
 *
 * if (level === ColorLevel.TrueColor) {
 *  console.log("True color is supported");
 * }
 *
 * if (level === ColorLevel.Rgb256) {
 *   console.log("256 colors are supported");
 * }
 *
 * if (level === ColorLevel.Basic) {
 *  console.log("Basic 16 colors are supported");
 * }
 * ```
 */
/*#__NO_SIDE_EFFECTS__*/
export function getColorLevel(): ColorLevel {
    return _activeTheme.v ? _activeTheme.v.colorLvl : _detectColorSupport();
}

/**
 * Returns true if the terminal supports at least 16 colors, but may support more.
 * @returns True if the terminal supports at least 16 colors
 * @example
 * ```ts
 * import { isColorSupported } from "@nevware21/chromacon";
 *
 * if (isColorSupported()) {
 *   console.log("Color is supported");
 * }
 * ```
 */
/*#__NO_SIDE_EFFECTS__*/
export function isColorSupported(): boolean {
    return getColorLevel() !== ColorLevel.None;
}

/**
 * Returns true if the terminal supports at least 256 colors, but may support more.
 * @returns True if the terminal supports 256 colors
 * @example
 * ```ts
 * import { isRgb256ColorSupported } from "@nevware21/chromacon";
 *
 * if (isRgb256ColorSupported()) {
 *  console.log("256 colors are supported");
 * }
 * ```
 */
/*#__NO_SIDE_EFFECTS__*/
export function isRgb256ColorSupported(): boolean {
    let level = getColorLevel();
    return level === ColorLevel.Ansi256 || level === ColorLevel.Rgb;
}

/**
 * Returns true if the terminal supports true color (24-bit).
 * @returns True if the terminal supports true color
 * @example
 * ```ts
 * import { isTrueColorSupported } from "@nevware21/chromacon";
 *
 * if (isTrueColorSupported()) {
 *   console.log("True color is supported");
 * }
 * ```
 */
/*#__NO_SIDE_EFFECTS__*/
export function isTrueColorSupported(): boolean {
    return getColorLevel() === ColorLevel.Rgb;
}
