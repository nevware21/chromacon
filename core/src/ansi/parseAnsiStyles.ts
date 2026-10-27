/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { isNullOrUndefined } from "@nevware21/ts-utils";

/**
 * A color resolved from an SGR sequence.
 * @since 0.1.5
 */
export type AnsiColor =
    | { type: "basic"; index: number }
    | { type: "ansi256"; index: number }
    | { type: "rgb"; r: number; g: number; b: number };

/**
 * The style resolved from SGR codes, only the attributes that are on are present.
 * @since 0.1.5
 */
export interface IAnsiStyle {
    fg?: AnsiColor;
    bg?: AnsiColor;
    ul?: AnsiColor;
    bold?: boolean;
    dim?: boolean;
    italic?: boolean;
    underline?: boolean | "double";
    blink?: boolean;
    inverse?: boolean;
    hidden?: boolean;
    strikethrough?: boolean;
    overlined?: boolean;
    link?: string;
}

/**
 * A run of text with the style that applies to it.
 * @since 0.1.5
 */
export interface IAnsiStyledRun {
    text: string;
    style: IAnsiStyle;
}

// 1: CSI params (7-bit or 8-bit introducer), 2: CSI final byte, 3: OSC payload, 4: other escape
const TOKEN_REGEXP = "(?:\\x1b\\[|\\x9b)([0-?]*)[ -\\/]*([@-~])|(?:\\x1b\\]|\\x9d)([^\\x07\\x1b\\x9c]*)(?:\\x07|\\x1b\\\\|\\x9c)|\\x1b[ -\\/]*[0-~]";

function _copy<T extends object>(src: T): T {
    const result: any = {};
    Object.keys(src).forEach((k) => {
        result[k] = (src as any)[k];
    });

    return result;
}

function _cloneStyle(style: IAnsiStyle): IAnsiStyle {
    const result: any = _copy(style);
    ["fg", "bg", "ul"].forEach((key) => {
        if (result[key]) {
            result[key] = _copy(result[key]);
        }
    });

    return result;
}

function _sameColor(a?: AnsiColor, b?: AnsiColor): boolean {
    if (!a || !b) {
        return a === b;
    }

    return a.type === b.type && (a as any).index === (b as any).index &&
        (a as any).r === (b as any).r && (a as any).g === (b as any).g && (a as any).b === (b as any).b;
}

function _sameStyle(a: IAnsiStyle, b: IAnsiStyle): boolean {
    return _sameColor(a.fg, b.fg) && _sameColor(a.bg, b.bg) && _sameColor(a.ul, b.ul) &&
        a.bold === b.bold && a.dim === b.dim && a.italic === b.italic && a.underline === b.underline &&
        a.blink === b.blink && a.inverse === b.inverse && a.hidden === b.hidden &&
        a.strikethrough === b.strikethrough && a.overlined === b.overlined && a.link === b.link;
}

function _toNum(value: string | undefined): number {
    return value === undefined || value === "" ? NaN : +value;
}

function _inRange(value: number, max: number): boolean {
    return value === value && value >= 0 && value <= max && value % 1 === 0;
}

function _makeColor(mode: number, args: number[]): AnsiColor | undefined {
    if (mode === 5) {
        const n = args[0];
        if (args.length >= 1 && _inRange(n, 255)) {
            return n < 16 ? { type: "basic", index: n } : { type: "ansi256", index: n };
        }
    } else if (mode === 2 && args.length >= 3 && _inRange(args[0], 255) && _inRange(args[1], 255) && _inRange(args[2], 255)) {
        return { type: "rgb", r: args[0], g: args[1], b: args[2] };
    }

    return undefined;
}

function _off(style: IAnsiStyle, key: string) {
    delete (style as any)[key];
}

function _applySgr(style: IAnsiStyle, paramText: string) {
    const params = paramText === "" ? ["0"] : paramText.split(";");
    for (let i = 0; i < params.length; i++) {
        const sub = params[i].split(":");
        const code = sub[0] === "" ? 0 : +sub[0];
        if (code !== code) {
            continue;
        }

        if (code === 38 || code === 48 || code === 58) {
            let args: number[];
            let mode: number;
            if (sub.length > 1) {
                mode = _toNum(sub[1]);
                // 38:2:<colorspace>:r:g:b or 38:2:r:g:b
                const rest = sub.slice(2);
                args = (mode === 2 && rest.length >= 4 ? rest.slice(1) : rest).map(_toNum);
            } else {
                mode = _toNum(params[i + 1]);
                const count = mode === 5 ? 1 : (mode === 2 ? 3 : 0);
                args = [];
                for (let j = 0; j < count && i + 2 + j < params.length; j++) {
                    args.push(_toNum(params[i + 2 + j]));
                }
                i += 1 + args.length;
            }

            const color = _makeColor(mode, args);
            if (color) {
                (style as any)[code === 38 ? "fg" : (code === 48 ? "bg" : "ul")] = color;
            }
        } else if (code === 0) {
            const link = style.link;
            Object.keys(style).forEach((k) => _off(style, k));
            if (link !== undefined) {
                style.link = link;
            }
        } else if (code === 1) {
            style.bold = true;
        } else if (code === 2) {
            style.dim = true;
        } else if (code === 3) {
            style.italic = true;
        } else if (code === 4) {
            const u = sub.length > 1 ? _toNum(sub[1]) : 1;
            if (u === 0) {
                _off(style, "underline");
            } else {
                style.underline = u === 2 ? "double" : true;
            }
        } else if (code === 5 || code === 6) {
            style.blink = true;
        } else if (code === 7) {
            style.inverse = true;
        } else if (code === 8) {
            style.hidden = true;
        } else if (code === 9) {
            style.strikethrough = true;
        } else if (code === 21) {
            style.underline = "double";
        } else if (code === 22) {
            _off(style, "bold");
            _off(style, "dim");
        } else if (code === 23) {
            _off(style, "italic");
        } else if (code === 24) {
            _off(style, "underline");
        } else if (code === 25) {
            _off(style, "blink");
        } else if (code === 27) {
            _off(style, "inverse");
        } else if (code === 28) {
            _off(style, "hidden");
        } else if (code === 29) {
            _off(style, "strikethrough");
        } else if (code >= 30 && code <= 37) {
            style.fg = { type: "basic", index: code - 30 };
        } else if (code === 39) {
            _off(style, "fg");
        } else if (code >= 40 && code <= 47) {
            style.bg = { type: "basic", index: code - 40 };
        } else if (code === 49) {
            _off(style, "bg");
        } else if (code === 53) {
            style.overlined = true;
        } else if (code === 55) {
            _off(style, "overlined");
        } else if (code === 59) {
            _off(style, "ul");
        } else if (code >= 90 && code <= 97) {
            style.fg = { type: "basic", index: code - 90 + 8 };
        } else if (code >= 100 && code <= 107) {
            style.bg = { type: "basic", index: code - 100 + 8 };
        }
    }
}

function _applyOsc(style: IAnsiStyle, payload: string) {
    // OSC 8 ; params ; uri
    if (payload.substring(0, 2) === "8;") {
        const idx = payload.indexOf(";", 2);
        if (idx >= 0) {
            const uri = payload.substring(idx + 1);
            if (uri) {
                style.link = uri;
            } else {
                _off(style, "link");
            }
        }
    }
}

function _parse(value: string, style: IAnsiStyle): IAnsiStyledRun[] {
    const runs: IAnsiStyledRun[] = [];
    if (isNullOrUndefined(value)) {
        return runs;
    }

    const regexp = new RegExp(TOKEN_REGEXP, "g");
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    const addText = (text: string) => {
        if (text) {
            const last = runs.length ? runs[runs.length - 1] : null;
            if (last && _sameStyle(last.style, style)) {
                last.text += text;
            } else {
                runs.push({ text, style: _cloneStyle(style) });
            }
        }
    };

    while ((match = regexp.exec(value)) !== null) {
        addText(value.substring(lastIndex, match.index));
        lastIndex = match.index + match[0].length;

        if (match[2] !== undefined) {
            if (match[2] === "m" && !/[<=>?]/.test(match[1])) {
                _applySgr(style, match[1]);
            }
        } else if (match[3] !== undefined) {
            _applyOsc(style, match[3]);
        }
    }

    addText(value.substring(lastIndex));

    return runs;
}

/**
 * Parse a string containing ANSI SGR escape sequences into runs of text, each with the style
 * resolved from the sequences preceding it. Non-SGR sequences are dropped, OSC 8 hyperlinks
 * are reported via the `link` style.
 * @param value - The string to parse.
 * @param state - Optional style to start with, allowing the style to be carried between calls.
 * @returns The styled runs; adjacent runs with the same style are merged and empty runs omitted.
 * @since 0.1.5
 * @example
 * ```ts
 * parseAnsiStyles("\u001b[31mred\u001b[0m plain");
 * //=> [{ text: "red", style: { fg: { type: "basic", index: 1 } } }, { text: " plain", style: {} }]
 * ```
 */
export function parseAnsiStyles(value: string, state?: IAnsiStyle): IAnsiStyledRun[] {
    return _parse(value, state ? _cloneStyle(state) : {});
}

/**
 * Create a stateful parser that carries the style from one chunk to the next.
 * @returns An object with a `push` method that returns the runs for the chunk and a `state` method.
 * @since 0.1.5
 */
export function createAnsiStyleParser(): { push(chunk: string): IAnsiStyledRun[]; state(): IAnsiStyle } {
    const current: IAnsiStyle = {};

    return {
        push: (chunk: string) => _parse(chunk, current),
        state: () => _cloneStyle(current)
    };
}
