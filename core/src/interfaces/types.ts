/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2024 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */




export interface CodeTableDetail {
    /**
     * The common abbreviation given to the code
     */
    abbr: string;

    /**
     * A descriptive name for the code
     */
    name: string;
}

export type CodeTable = { [key: number]: CodeTableDetail };