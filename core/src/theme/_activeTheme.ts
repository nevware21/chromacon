/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { ICachedValue } from "@nevware21/ts-utils";
import { _ISystemTheme } from "../interfaces/_ISystemTheme";
import { _createSysTheme } from "./sysTheme";
import { ANSI_THEME } from "./ansiTheme";
import { _lazyGetValue } from "../internal/lazyGetValue";

/**
 * @internal
 * Returns the current active theme, this property is currently read-only and direct assignment
 * is not currently supported.
 *
 * Note: Future versions will support multiple themes and the ability to switch between them.
 * @example
 * ```ts
 * import { activeTheme } from "@nevware21/chromacon";
 * console.log(`Current Color Level: ${activeTheme.v.colorLevel.v}`);
 * ```
 */
export const _activeTheme: ICachedValue<_ISystemTheme> = (/*#__PURE__*/_lazyGetValue(_defaultTheme, null));

function _defaultTheme(): _ISystemTheme {
    return _createSysTheme(ANSI_THEME);
}

