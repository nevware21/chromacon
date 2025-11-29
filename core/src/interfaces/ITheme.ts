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

export interface ITheme {
    /**
     * Returns the current maximum color level supported by the terminal.
     */
    readonly colorLevel?: ColorLevel;

    /**
     * A function that detects the current color level supported by the terminal.
     * This function is used to determine the maximum color level supported by the terminal.
     * @returns The current color level
     */
    detector?: () => ColorLevel;

    /**
     * Get the theme color code for the given color definition, the returned formatter
     * will be used to format text with the specified color and reset it afterwards.
     * @param colorLevel - The Color Level to use when getting the formatter
     * @param color - the color definition
     * @param reset - the reset color definition
     */
    getFormatter?(colorLevel: ColorLevel, color: IColorDef, reset: IColorDef): IThemeFormatter;
}
