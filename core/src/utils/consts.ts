/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { CSIColors } from "../enums/CsiColors";
import { IColorDef } from "../interfaces/IColorDef";

export const EMPTY_STRING = "";
export const CSI = "\x1b[";
// eslint-disable-next-line no-control-regex
export const PARSE_CSI_SGI_REGEXP = /(?:\x1b\[|\x9b)([\x30-\x3f]*)m/g;
//                            <= CSI Sgi variant          =>

export const DEFAULT_RESET: IColorDef = {
    s: CSIColors.Reset
};