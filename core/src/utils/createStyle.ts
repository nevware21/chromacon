/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { DEFAULT_RESET } from "./consts";
import { ChromaStyle } from "../interfaces/types";
import { IColorDef } from "../interfaces/IColorDef";
import { _createCsiColor } from "./createColor";

/**
 * Creates a CSI color code
 * @param style The style code to use to enable the style
 * @param reset The code to use to reset the style
 * @returns The CSI color code
 */
/*#__NO_SIDE_EFFECTS__*/
export function _createStyle(style: IColorDef, reset: IColorDef = DEFAULT_RESET): ChromaStyle {
    return _createCsiColor(style, reset);
}