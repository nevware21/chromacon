/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { Csi256BaseColors, CsiBaseColors, CSIColors, CsiOffsets } from "../enums/CsiColors";

export interface IBaseColor {
    b: CsiBaseColors;
    o: CsiOffsets;
}

export interface IColorDef {
    /**
     * The color to apply, may be a base color ({@link IBaseColor}), 256 (8-bit) color ({@link Csi256BaseColors} or number), or 24-bit RGB color (number[]).
     */
    c?: IBaseColor | Csi256BaseColors | number | number[];

    /**
     * The CSI Color / Style to use
     */
    s?: CSIColors;
}