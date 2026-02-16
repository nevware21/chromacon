/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

export function _debugLog(msg: string): void {
    //#if DEBUG
    console.log(msg);
    //#endif
}

