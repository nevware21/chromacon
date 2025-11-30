/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { isNullOrUndefined } from "@nevware21/ts-utils";

// https://en.wikipedia.org/wiki/ANSI_escape_code
// ANSI Escape Sequences: https://gist.github.com/ConnerWill/d4b6c776b509add763e17f9f113fd25b#file-ansi-escape-sequences-md
// VT100 escape codes: https://gist.github.com/delameter/b9772a0bf19032f977b985091f0eb5c1

// May be terminated by: BEL (0x07), ST (0x9C), or ESC \ (0x1B 0x5C)
// XTerm End of command sequences
// BEL: 0x07
// ESC \: 0x1B 0x5C
// ST: 0x9C

// SS2 - Single Shift Two Sequence: ESC N ... or \x8e ...
//   - terminated by a character in the range 0x20–0x7F (7-bit) or 0xA0–0xFF (8-bit)
//   /\x1bN[\x20-\x7f]/
//   /\x8e[\x20-\x7f]/
// SS3 - Single Shift Three Sequence: ESC O ... or \x8f ...
//   - terminated by a character in the range 0x20–0x7F (7-bit) or 0xA0–0xFF (8-bit)
//   /\x1bO[\x20-\x7f]/
//   /\x8f[\x20-\x7f]/
// DCS - Device Control String Sequence: ESC P ... ST or \x90 ... ST
//   - terminated by a BEL (0x07), ST (0x9C), or ESC \ (0x1B 0x5C)
//   /\x1bP[\x08-\x0d\x20-\x7e]*(?:[\x07\x9c]|\x1b\\)
// CSI - Control Sequence Introducer ESC [ ... or \x9b ...
// - terminated by a character in the range 0x40–0x7E
// /\x1b\[[\x30-\x3f]*[\x40-\x7e]/
// OSC - Operating System Command Sequence: ESC ] ... or \x9d ...
//   - terminated by a BEL (0x07), ST (0x9C), or ESC \ (0x1B 0x5C)
//   /\x1b\][x08-\x0d\x20-\x7e]*(?:[\x07\x9c]|\x1b\\)
// SOS - Start of String Sequence: ESC X ... or \x98 ...
//   - terminated by a BEL (0x07), ST (0x9C), or ESC \ (0x1B 0x5C)
//   /\x1bX[^\x9c\x07\x1b]*(?:[\x07\x9c]|\x1b\\)
// PM - Privacy Message Sequence: ESC ^ ... or \x9e ...
//   - terminated by a BEL (0x07), ST (0x9C), or ESC \ (0x1B 0x5C)
//   /\x1b\^[x08-\x0d\x20-\x7e]*(?:[\x07\x9c]|\x1b\\)
// APC - Application Program Command Sequence: ESC _ ... or \x9f ...
//   - terminated by a BEL (0x07), ST (0x9C), or ESC \ (0x1B 0x5C)
//   /\x1b_[x08-\x0d\x20-\x7e]*(?:[\x07\x9c]|\x1b\\)
// SCI - Single Character Introducer: ESC Z ... or \x9a ...
//   - single character in the range 0x20–0x7e or 0x08–0x0d
//   /\x1bZ[\x20-\x7e\x08-\x0d]/

// Simple Charcter escape sequences
// --------------------------------
// SPA - Start of Protected Area Sequence: ESC V or \x96
//   /\x1bV/
// EPA - End of Protected Area Sequence: ESC W or \x97
//   /\x1bW/

// Fe Sequence: ESC 0x40—0x5F  (@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_)
// ISO/IEC 6429 and RFC 1345 C1 control codes
//
// | ESC+ | C1   | Abbr   | Name                                     | Terminated | Description
// |------|------|--------|------------------------------------------|------------|-------------------------------------------------------------
// | @    | 0x80 | PAD    | Padding Character                        | No         | Reserved for padding, for example, on a synchronous transmission medium.
// | A    | 0x81 | HOP    | High Octet Preset                        | No         | Reserved for the use of the higher layers. It must not be used for the definition of new control functions.
// | B    | 0x82 | BPH    | Break Permitted Here                     | No         | Soft-hyphen. Indicates a position at which a line break may occur.
// | C    | 0x83 | NBH    | No Break Here                            | No         | Following character that is not to be broken
// | D    | 0x84 | IND    | Index                                    | No         | Moves the active position one line down, without changing the column.
// | E    | 0x85 | NEL    | Next Line                                | No         | Moves the active position to the first character of the next line. (CR+LF)
// | F    | 0x86 | SSA    | Start of Selected Area                   | No         | Starts the definition of a character selection area. (XTERM moves the cursor to the lower-left corner of the screen.)
// | G    | 0x87 | ESA    | End of Selected Area                     | No         | Ends the definition of a character selection area.
// | H    | 0x88 | HTS    | Horizontal Tabulation Set                | No         | Sets a tab stop at the active position.
// | I    | 0x89 | HTJ    | Horizontal Tabulation with Justification | No         | Right-justify the text against the next tab stop.
// | J    | 0x8A | VTS    | Vertical Tabulation Set                  | No         | Sets a vertical tab stop at the active position.
// | K    | 0x8B | PLD    | Partial Line Down                        | No         | Subscript (decreases font size) PLD text PLU
// | L    | 0x8C | PLU    | Partial Line Up                          | No         | Superscript (increases font size) PLU text PLD
// | M    | 0x8D | RI     | Reverse Line Feed                        | No         | Moves the active position one line up, without changing the column.
// | N    | 0x8E | SS2    | Single Shift Two                         | Character  | Next character is from G2 character set as GL. ( 0x20–0x7F (7-bit) or 0xA0–0xFF (8-bit) )
// | O    | 0x8F | SS3    | Single Shift Three                       | Character  | Next character is from G3 character set as GL. ( 0x20–0x7F (7-bit) or 0xA0–0xFF (8-bit) )
// | P    | 0x90 | DCS    | Device Control String                    | ST (0x9c)  | Introduces a device control string, terminated by ST (ESC \ | 0x9c).
// | Q    | 0x91 | PU1    | Private Use One                          | No         | Reserved for the use of a single control function.
// | R    | 0x92 | PU2    | Private Use Two                          | No         | Reserved for the use of a single control function.
// | S    | 0x93 | STS    | Set Transmit State                       | No         | Transmits the communication line status.
// | T    | 0x94 | CCH    | Cancel Character                         | No         | Descructive backspace, to elmiminate the previous character and remove ambiguity meaning of BS.
// | U    | 0x95 | MW     | Message Waiting                          | No         | Reserved for indicating a message waiting.
// | V    | 0x96 | SPA    | Start of Protected Area                  | No         | Starts the protected area.
// | W    | 0x97 | EPA    | End of Protected Area                    | No         | Ends the protected area.
// | X    | 0x98 | SOS    | Start of String                          | ST (0x9c)  | Introduces a control string, terminated by ST (ESC \ | 0x9c).
// | Y    | 0x99 | SGCI   | Single Graphic Character Introducer      | No         | Introduces a single graphic character from the G1 set.
// | Z    | 0x9A | SCI    | Single Character Introducer              | No         | Introduces a single character from the G0 set.
// | [    | 0x9B | CSI    | Control Sequence Introducer              | 0x40–0x7E  | Introduce control sequences that take parameters.
// | \    | 0x9C | ST     | String Terminator                        | No         | Terminates a control string initiated by DCS, SOS, OSC, PM or APC.
// | ]    | 0x9D | OSC    | Operating System Command                 | ST (0x9c)  | Introduces an operating system command, terminated by ST (ESC \ | 0x9c).
// | ^    | 0x9E | PM     | Privacy Message                          | ST (0x9c)  | Introduces a privacy message, terminated by ST (ESC \ | 0x9c).
// | _    | 0x9F | APC    | Application Program Command              | ST (0x9c)  | Introduces an application program command, terminated by ST (ESC \ | 0x9c).

// ST: ESC \ or ESC 0x9C
// Fp Sequence: ESC 0x30—0x3F  (0123456789:;<=>?) - Private Use VT100 codes
// Fs sequence: ESC 0x60—0x7E  (`a-z{|}~)
// nF Sequence: ESC 0x20—0x2F ... ( !"#$%&'()*+,-./)+  0x30-0x7E (0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`a-z{|}~)

// eslint-disable-next-line no-control-regex
const STRIP_ANSI_REGEXP = /(?:(?:\x1b\[|\x9b)[\x30-\x3f]*[\x40-\x7e]|(?:(?:\x1bX|\x98)[^\x98\x9c\x07\x1b]*|(?:\x1b[\]P_^]|[\x90\x9d-\x9f])[\x08-\x0d\x20-\x7e]*)(?:[\x07\x9c]|\x1b\\)|\x1b[\x20-\x2f]+[\x30-\x7e]|(?:\x1b[0356]n{0,1})|(?:\x1b[124\x37-\x4fQ-WYZ\\\x60-\x7e]|[\x80-\x8f\x91-\x9a\x9c]))/g;
//                            <= CSI                              =>|<= SOS (Term with ST)              =>|<= OSC/DSC/APC/PM (Term with ST)           =><=-- ST                  --=>|<= nF                    =>|<= VT100 DSR      =>|<= Fp/Fe/Fs                                                  =>

/**
 * Strip ANSI escape codes from a string.
 * @param value - The string to strip.
 * @returns The string without ANSI escape codes.
 * @example
 * ```ts
 * stripAnsi("\u001b[31municorn\u001b[39m");
 * //=> 'unicorn'
 *
 * stripAnsi("\u001b]8;;https://github.com\u0007Click\u001b]8;;\u0007");
 * //=> 'Click'
 *
 * stripAnsi("\u001b[38;2;255;0;0mHello \u001b[0mDarkness \u001B[00;38;5;244m\u001B[m\u001B[00;38;5;33mmy \u001B[0mold");
 * //=> "Hello Darkness my old"
 */
/*#__NO_SIDE_EFFECTS__*/
export function stripAnsi(value: string): string {
    return (value && value.replace) ? value.replace(STRIP_ANSI_REGEXP, "") : value;
}

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

/**
 * Parse ANSI escape codes in a string.
 * @param value - The string to parse.
 * @returns The parsed ANSI escape codes and the string components.
 */
/*#__NO_SIDE_EFFECTS__*/
export function parseAnsi(value: string): string[] {
    const result: string[] = [];
    let match: RegExpExecArray | null;
    let lastIndex = 0;
    if (!isNullOrUndefined(value)) {
        while ((match = STRIP_ANSI_REGEXP.exec(value)) !== null) {
            if (lastIndex != match.index) {
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