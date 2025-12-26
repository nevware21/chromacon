/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { isNullOrUndefined } from "@nevware21/ts-utils";
import { STRIP_ANSI_REGEXP } from "./stripAnsi";

/**
 * Parse ANSI escape codes in a string, returning both the escape codes and the string components.
 * @param value - The string to parse.
 * @returns The parsed ANSI escape codes and the string components.
 * @example
 * ```ts
 * parseAnsi("\u001b[31municorn\u001b[39m");
 * //=> ["\u001b[31m", "unicorn", "\u001b[39m"]
 * ```
 */
/*#__NO_SIDE_EFFECTS__*/
export function parseAnsi(value: string): string[] {
    const result: string[] = [];
    let match: RegExpExecArray | null;
    let lastIndex = 0;
    if (!isNullOrUndefined(value)) {
        while ((match = STRIP_ANSI_REGEXP.exec(value)) !== null) {
            if (lastIndex !== match.index) {
                result.push(value.substring(lastIndex, match.index));
            }

            result.push(match[0]);
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < value.length) {
            result.push(value.substring(lastIndex));
        }
    }

    return result;
}
