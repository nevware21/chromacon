/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

const SGR_NAMES: { [code: number]: string } = {
    0: "reset", 1: "bold", 2: "dim", 3: "italic", 4: "underline", 5: "blink", 6: "rapidBlink",
    7: "inverse", 8: "hidden", 9: "strikethrough", 21: "doubleUnderline", 22: "normal",
    23: "notItalic", 24: "notUnderline", 25: "notBlink", 27: "notInverse", 28: "notHidden",
    29: "notStrikethrough", 38: "fgExtended", 39: "fgDefault", 48: "bgExtended", 49: "bgDefault",
    53: "overlined", 55: "notOverlined", 58: "ulExtended", 59: "ulDefault"
};

const BASIC = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];

/**
 * Get the name of an SGR code at runtime.
 * @param code - The SGR code.
 * @returns The name or undefined if the code is not known.
 * @since 0.1.5
 */
export function getSgrName(code: number): string | undefined {
    if (SGR_NAMES.hasOwnProperty(code)) {
        return SGR_NAMES[code];
    }

    if (code >= 30 && code <= 37) {
        return "fg" + _cap(BASIC[code - 30]);
    }

    if (code >= 40 && code <= 47) {
        return "bg" + _cap(BASIC[code - 40]);
    }

    if (code >= 90 && code <= 97) {
        return "fgBright" + _cap(BASIC[code - 90]);
    }

    if (code >= 100 && code <= 107) {
        return "bgBright" + _cap(BASIC[code - 100]);
    }

    return undefined;
}

function _cap(value: string) {
    return value.charAt(0).toUpperCase() + value.substring(1);
}
