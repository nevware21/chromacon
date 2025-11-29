/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

export const enum ColorLevel {

    /**
     * Automatically detect the color level
     */
    AutoDetect = -1,

    /**
     * Color is not supported or specifically disabled
     */
    None = 0,

    /**
     * Basic 16 colors are supported / enabled
     */
    Basic = 1,

    /**
     * Standard 256 (8-bit) colors is supported / enabled
     */
    Ansi256 = 2,

    /**
     * True color (24-bit) is supported / enabled
     */
    Rgb = 3
}