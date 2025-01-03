/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2024 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

export const enum ColorLevel {
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
    Rgb256 = 2,

    /**
     * True color (24-bit) is supported / enabled
     */
    TrueColor = 3
}