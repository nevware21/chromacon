/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { ColorLevel } from "../enums/ColorLevel";
import { IColorDef } from "./IColorDef";
import { IThemeFormatter } from "./IThemeFormatter";
import { _IListener } from "./_IListener";

/**
 * @internal
 * Interface representing the system theme for color formatting.
 * This interface provides all of the methods used internally to get the
 * current color level, retrieve a formatter for a specific color, and
 * set the color level or detection function.
 */
export interface _ISystemTheme {
    /**
     * Returns the current maximum color level supported by the terminal. You may also
     * manually override the automatic detection by setting a specific level.
     * If the level is set as {@link ColorLevel.AutoDetect} this will cause the
     * automatic detection to be re-evaluated on the next access.
     */
    colorLvl: ColorLevel;

    /**
     * Get the formatter for the given color definition
     * @param colorLevel - The Color Level to use when getting the formatter
     * @param color - the color definition
     * @param reset - the reset color definition
     */
    formatter(colorLevel: ColorLevel, color: IColorDef, reset: IColorDef): IThemeFormatter;

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
    detector: (detectFn: () => ColorLevel) => void;

    /**
     * Listen to changes to the theme
     * @param cb - The callback to invoke when a change occurs
     */
    listen(cb: (theme: _ISystemTheme) => void): _IListener
}
