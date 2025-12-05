/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { ITheme } from "../interfaces/ITheme";
import { createAnsiFormatter } from "../utils/ansiFormatter";

/*#__NO_SIDE_EFFECTS__*/
function createAnsiTheme(): ITheme {
    return {
        getFormatter: createAnsiFormatter
    };
}

/**
 * A predefined theme that uses ANSI formatting regardless of the detected system color support.
 * This theme can be used when you want to ensure ANSI formatting is always applied.
 */
export const ANSI_THEME: ITheme = /*#__PURE__*/ createAnsiTheme();