/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

/**
 * A function that takes a string and returns a string with the CSI code applied
 * @param value The string to apply the CSI code to
 * @returns The string with the CSI code applied
 */
export type CsiStyle = (value: string) => string;

/**
 * A function that takes a string and returns a string with the CSI code applied
 * @param value The string to apply the CSI code to
 * @returns The string with the CSI code applied
 */
export type ChromaStyle = CsiStyle & string;

/**
 * A function that takes a string and returns a string with the CSI code applied
 * @param value The string to apply the CSI code to
 * @returns The string with the CSI code applied
 */
export type CsiColor = (value: string) => string;

/**
 * A function that takes a string and returns a string with the CSI code applied
 * @param value The string to apply the CSI code to
 * @returns The string with the CSI code applied
 */
export type ChromaColor = CsiColor & string;

export interface ICodeTableDetail {
    /**
     * The common abbreviation given to the code
     */
    abbr: string;

    /**
     * A descriptive name for the code
     */
    name: string;
}

export type CodeTable = { [key: number]: ICodeTableDetail };

