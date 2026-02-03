/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { ICachedValue, objDefine, safe } from "@nevware21/ts-utils";

/*#__NO_SIDE_EFFECTS__*/
export function _lazyGetValue<T, F extends (...args: any[]) => T = (...args: any[]) => T>(cb: F | ((...args: any[]) => T), defValue: T, argArray?: Parameters<F>): ICachedValue<T> {
    let lazyValue = { } as ICachedValue<T>;
    objDefine(lazyValue, "v", {
        g: () => {
            let result = safe(cb, argArray);
            let val = result.e ? defValue : result.v;
            // Just replace the value
            objDefine(lazyValue, "v", {
                v: val
            });

            return val;
        }
    });

    return lazyValue;
}