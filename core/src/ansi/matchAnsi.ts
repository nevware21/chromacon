/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { STRIP_ANSI_REGEXP } from "./stripAnsi";

/**
 * Match ANSI escape codes in a string.
 * @param value - The string to match.
 * @returns The ANSI escape codes.
 * @example
 * ```ts
 * matchAnsi("\u001b[31municorn\u001b[39m");
 * //=> ['\u001b[31m', '\u001b[39m']
 *
 * matchAnsi("\u001b]8;;https://github.com\u0007Click\u001b]8;;\u0007");
 * //=> ['\u001b]8;;https://github.com\u0007', '\u001b]8;;\u0007']
 *
 * matchAnsi("\u001b[38;2;255;0;0mHello \u001b[0mDarkness \u001B[00;38;5;244m\u001B[m\u001B[00;38;5;33mmy \u001B[0mold");
 * //=> ["\u001b[38;2;255;0;0m", "\u001b[0m", "\u001B[00;38;5;244m", "\u001B[m", "\u001B[00;38;5;33m", "\u001B[0m"]
 * ```
 */
/*#__NO_SIDE_EFFECTS__*/
export function matchAnsi(value: string): string[] {
    return (value && value.match) ? value.match(STRIP_ANSI_REGEXP) || [] : [];
}
