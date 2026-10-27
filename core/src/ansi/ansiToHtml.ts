/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { ansiColorToCss } from "./ansiColors";
import { AnsiColor, IAnsiStyle, parseAnsiStyles } from "./parseAnsiStyles";

/**
 * Options for {@link ansiToHtml}.
 * @since 0.1.5
 */
export interface IAnsiToHtmlOptions {
    /** Emit inline styles instead of classes. Default false. */
    inlineStyles?: boolean;
    /** Class prefix when using classes, default `ansi-`. */
    classPrefix?: string;
    /** Hex palette for the colors 0-15. */
    palette?: string[];
    /** Set to false to not emit OSC 8 links as anchors. Default true. */
    links?: boolean;
}

function _escape(text: string): string {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function _colorClass(prefix: string, kind: string, c: AnsiColor): string {
    return prefix + kind + "-" + (c.type === "rgb" ? c.r + "-" + c.g + "-" + c.b : (c.type === "basic" ? "" : "256-") + c.index);
}

function _safeLink(url: string): boolean {
    return !/^\s*(?:javascript|data|vbscript):/i.test(url);
}

/**
 * Convert a string containing ANSI SGR sequences to HTML.
 * @param value - The string to convert.
 * @param options - Optional settings.
 * @since 0.1.5
 */
export function ansiToHtml(value: string, options?: IAnsiToHtmlOptions): string {
    const opts = options || {};
    const prefix = opts.classPrefix === undefined ? "ansi-" : opts.classPrefix;
    let out = "";

    parseAnsiStyles(value).forEach((run) => {
        const s: IAnsiStyle = run.style;
        const classes: string[] = [];
        const css: string[] = [];
        const flags: [string, boolean, string][] = [
            ["bold", !!s.bold, "font-weight:bold"], ["dim", !!s.dim, "opacity:0.6"], ["italic", !!s.italic, "font-style:italic"],
            ["underline", !!s.underline, "text-decoration:underline"], ["blink", !!s.blink, ""], ["inverse", !!s.inverse, ""],
            ["hidden", !!s.hidden, "visibility:hidden"], ["strikethrough", !!s.strikethrough, "text-decoration:line-through"],
            ["overlined", !!s.overlined, "text-decoration:overline"]
        ];
        flags.forEach((f) => {
            if (f[1]) {
                classes.push(prefix + f[0]);
                if (f[2]) {
                    css.push(f[2]);
                }
            }
        });
        if (s.underline === "double") {
            classes.push(prefix + "double-underline");
        }
        if (s.fg) {
            classes.push(_colorClass(prefix, "fg", s.fg));
            css.push("color:" + ansiColorToCss(s.fg, opts.palette));
        }
        if (s.bg) {
            classes.push(_colorClass(prefix, "bg", s.bg));
            css.push("background-color:" + ansiColorToCss(s.bg, opts.palette));
        }

        let html = _escape(run.text);
        if (classes.length) {
            html = opts.inlineStyles
                ? (css.length ? "<span style=\"" + css.join(";") + "\">" + html + "</span>" : html)
                : "<span class=\"" + classes.join(" ") + "\">" + html + "</span>";
        }

        if (s.link && opts.links !== false && _safeLink(s.link)) {
            html = "<a href=\"" + _escape(s.link) + "\" rel=\"noopener noreferrer\">" + html + "</a>";
        }

        out += html;
    });

    return out;
}
