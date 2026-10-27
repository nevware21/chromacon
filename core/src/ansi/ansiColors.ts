/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { AnsiColor } from "./parseAnsiStyles";

/**
 * The default palette (xterm) used for the colors 0-15.
 * @since 0.1.5
 */
export const DEFAULT_ANSI_PALETTE: string[] = [
    "#000000", "#cd0000", "#00cd00", "#cdcd00", "#0000ee", "#cd00cd", "#00cdcd", "#e5e5e5",
    "#7f7f7f", "#ff0000", "#00ff00", "#ffff00", "#5c5cff", "#ff00ff", "#00ffff", "#ffffff"
];

const CUBE = [0, 95, 135, 175, 215, 255];

function _hexToRgb(hex: string): { r: number; g: number; b: number } {
    let h = hex.replace("#", "");
    if (h.length === 3) {
        h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2);
    }

    return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) };
}

/**
 * Convert an xterm 256 color index to RGB.
 * @param index - The color index (0-255).
 * @param palette - Optional hex colors (`#rrggbb`) overriding the default colors 0-15.
 * @since 0.1.5
 */
export function ansi256ToRgb(index: number, palette?: string[]): { r: number; g: number; b: number } {
    index = Math.max(0, Math.min(255, Math.floor(index) || 0));
    if (index < 16) {
        return _hexToRgb((palette && palette[index]) || DEFAULT_ANSI_PALETTE[index]);
    }

    if (index < 232) {
        const n = index - 16;
        return { r: CUBE[Math.floor(n / 36)], g: CUBE[Math.floor(n / 6) % 6], b: CUBE[n % 6] };
    }

    const v = 8 + (index - 232) * 10;
    return { r: v, g: v, b: v };
}

/**
 * Convert an {@link AnsiColor} to a CSS `rgb(...)` string.
 * @param color - The color to convert.
 * @param palette - Optional hex colors (`#rrggbb`) used for the `basic` colors.
 * @since 0.1.5
 */
export function ansiColorToCss(color: AnsiColor, palette?: string[]): string {
    const rgb = color.type === "rgb" ? color : ansi256ToRgb(color.index, palette);

    return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
}
