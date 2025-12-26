/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { replaceAnsi } from "./stripAnsi";

/**
 * Escape ANSI escape codes in a string by converting non-printable characters within ANSI sequences to their hex representation.
 * This is useful for displaying ANSI escape codes as visible text in logs or documentation.
 * @param value - The string to escape.
 * @returns The string with ANSI escape codes escaped (non-printable characters converted to \\xNN format).
 * @since 0.1.3
 * @example
 * ```ts
 * import { escapeAnsi, red } from "@nevware21/chromacon";
 *
 * // Escape ANSI codes in colored text
 * const coloredText = red("Hello World");
 * console.log(escapeAnsi(coloredText));
 * //=> "\\x1b[31mHello World\\x1b[0m"
 *
 * // Escape ANSI codes in raw escape sequences
 * escapeAnsi("\u001b[31mError\u001b[0m");
 * //=> "\\x1b[31mError\\x1b[0m"
 *
 * // Useful for logging ANSI sequences as visible text
 * const debugLog = escapeAnsi("\u001b]8;;https://github.com\u0007Click\u001b]8;;\u0007");
 * console.log(debugLog);
 * //=> "\\x1b]8;;https://github.com\\x07Click\\x1b]8;;\\x07"
 *
 * // Regular text remains unchanged
 * escapeAnsi("Hello World");
 * //=> "Hello World"
 * ```
 */

/*#__NO_SIDE_EFFECTS__*/
export function escapeAnsi(value: string): string {
    return replaceAnsi(value, (match) => {
        // Escape the ANSI escape codes by replacing the escape characters with their string representations
        // eslint-disable-next-line no-control-regex
        return match.replace(/[\x00-\x1f\x7f-\x9f]/g, (char) => {
            return "\\x" + char.charCodeAt(0).toString(16).padStart(2, "0");
        });
    });
}
