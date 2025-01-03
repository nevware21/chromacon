/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2024 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { arrForEach } from "@nevware21/ts-utils";
import { stripAnsi } from "../../../src/ansi/stripAnsi";

interface CodeTableDetail {
    /**
     * The common abbreviation given to the code
     */
    abbr: string;

    /**
     * A descriptive name for the code
     */
    desc: string;
}

function createTest(code: string, description: string): CodeTableDetail {
    return { abbr: "\x1b" + code, desc: description };
}

export const urxvtCodes = [
    createTest("[5~", "URxvt.keysym.Prior"),
    createTest("[6~", "URxvt.keysym.Next"),
    createTest("[7~", "URxvt.keysym.Home"),
    createTest("[8~", "URxvt.keysym.End"),
    createTest("[A", "URxvt.keysym.Up"),
    createTest("[B", "URxvt.keysym.Down"),
    createTest("[C", "URxvt.keysym.Right"),
    createTest("[D", "URxvt.keysym.Left"),
    createTest("[3;5;5t", "URxvt.keysym.C-M-q"),
    createTest("[3;5;606t", "URxvt.keysym.C-M-y"),
    createTest("[3;1605;5t", "URxvt.keysym.C-M-e"),
    createTest("[3;1605;606t", "URxvt.keysym.C-M-c"),
    createTest("]710;9x15bold\u0007", "URxvt.keysym.font")
];

describe("URxvt Codes", () => {

    arrForEach(urxvtCodes, (code) => {
        it(`URxvt: ${code.desc}`, () => {
            assert.isTrue(code.abbr.length > 0, `Code ${code.desc} should have a length`);
            assert.equal(stripAnsi(code.abbr), "", `Code ${code.desc} should be stripped`);
            assert.equal(stripAnsi("Hello" + code.abbr + "Darkness"), "HelloDarkness", `Code ${code.desc} should be stripped`);
            assert.equal(stripAnsi("Hello" + code.abbr + "Darkness"), "HelloDarkness", `Code ${code.desc} should be stripped`);
            assert.equal(stripAnsi("Hello" + code.abbr + "Darkness" + code.abbr + "MyOldFriend"), "HelloDarknessMyOldFriend", `Code ${code.desc} should be stripped`);
        });
    });
});