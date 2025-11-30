/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { isUndefined } from "@nevware21/ts-utils";
import { IBaseColor } from "../interfaces/IColorDef";

export function _isBaseColor(color: any): color is IBaseColor {
    return color && !isUndefined(color.b) && !isUndefined(color.o);
}

