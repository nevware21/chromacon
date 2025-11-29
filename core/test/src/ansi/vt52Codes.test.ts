/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
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
    name: string;
}

function createTest(code: string, description: string): CodeTableDetail {
    return { abbr: "\x1b" + code, name: description };
}

// From http://www.umich.edu/~archive/apple2/misc/programmers/vt100.codes.txt
const vt52Codes = [
    createTest("A", "Cursor up"),
    createTest("B", "Cursor down"),
    createTest("C", "Cursor right"),
    createTest("D", "Cursor left"),
    createTest("H", "Cursor to home"),
    createTest("I", "Reverse line feed"),
    createTest("J", "Erase to end of screen"),
    createTest("K", "Erase to end of line"),
    createTest("S", "Scroll up"),
    createTest("T", "Scroll down"),
    createTest("Z", "Identify"),
    createTest("=", "Enter alternate keypad mode"),
    createTest(">", "Exit alternate keypad mode"),
    createTest("1", "Graphics processor on"),
    createTest("2", "Graphics processor off"),
    createTest("<", "Enter ANSI mode"),
    createTest("s", "Cursor save"),
    createTest("u", "Cursor restore")
];

describe("VT52 Codes", () => {

    arrForEach(vt52Codes, (code) => {
        it(`VT52: ${code.name}`, () => {
            assert.isTrue(code.abbr.length > 0, `Code ${code.name} should have a length`);
            assert.equal(stripAnsi(code.abbr), "", `Code ${code.name} should be stripped`);
            assert.equal(stripAnsi("Hello" + code.abbr + "Darkness"), "HelloDarkness", `Code ${code.name} should be stripped`);
            assert.equal(stripAnsi("Hello" + code.abbr + "Darkness"), "HelloDarkness", `Code ${code.name} should be stripped`);
            assert.equal(stripAnsi("Hello" + code.abbr + "Darkness" + code.abbr + "MyOldFriend"), "HelloDarknessMyOldFriend", `Code ${code.name} should be stripped`);
        });
    });
});