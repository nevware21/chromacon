/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { objHasOwnProperty } from "@nevware21/ts-utils";
import { CodeTable, ICodeTableDetail } from "../interfaces/types";
import { eFeCode } from "../enums/FeCode";

/**
 * Check if a code is a FE code.
 * @param code Code to check.
 */
export function isValidCode(table: CodeTable, code: number): boolean {
    return objHasOwnProperty(table, code);
}

/**
 * Get code name and description.
 * @param code Code to get.
 */
export function getCodeDetails(table: CodeTable, code: number): ICodeTableDetail | null {
    return table[code];
}

/**
 * Check if a string is a FE sequence.
 * @param value String to check.
 * @returns FE enum code and encoded length of the sequence if it is a FE sequence, otherwise null.
 */
export function isFeSequence(value: string): [eFeCode, number] | null {
    let result: [eFeCode, number] | null = null;
    if (value && value.length > 2) {
        let code = value.charCodeAt(0);
        if (code == 0x1B) {
            // Escape sequence
            code = value.charCodeAt(1);
            if (code >= 0x40 && code <= 0x5F) {
                result = [code + 0x40, 2];
            }
        } else if (code >= eFeCode.PAD && code <= eFeCode.APC) {
            result = [code, 1];
        }
    }

    return result;
}