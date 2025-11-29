/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { getSymbol, objDefine, ObjDefinePropDescriptor } from "@nevware21/ts-utils";

/**
 * Sets the toStringTag and toString method on the target object
 * @param target - The target object to set the toStringTag and toString method on
 * @param formatDef - The property descriptor to use for defining the properties
 */
export function _setToString<T>(target: T, formatDef: ObjDefinePropDescriptor): T {
    let sym = getSymbol();
    if (sym) {
        objDefine(target, (sym as any)["toStringTag"] as any, formatDef);
    }

    objDefine(target as any, "toString", formatDef);

    return target;
}