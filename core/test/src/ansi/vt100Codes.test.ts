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
    desc: string;
}

function createTest(code: string, description: string, name?: string): CodeTableDetail {
    return { abbr: "\x1b" + code, desc: (name ? "[" + name + "] " : "") + description };
}

export const vt100Codes = [
    createTest("[176A", "Cursor up Pn lines"),
    createTest("[176B", "Cursor down Pn lines"),
    createTest("[176C", "Cursor forward Pn characters (right)"),
    createTest("[176D", "Cursor backward Pn characters (left)"),
    createTest("[176;176H", "Direct cursor addressing, where Pl is line#, Pc is column#"),
    createTest("[176;176f", "Direct cursor addressing, where Pl is line#, Pc is column#"),

    createTest("7", "Save cursor and attributes"),
    createTest("8", "Restore cursor and attributes"),

    createTest("#3", "Change this line to double-height top half"),
    createTest("#4", "Change this line to double-height bottom half"),
    createTest("#5", "Change this line to single-width single-height"),
    createTest("#6", "Change this line to double-width single-height"),

    createTest("[176;176;176;176;176;176;176m", "Text Styles"),
    createTest("[176;176;176;176;176;176;176q", "Programmable LEDs"),

    createTest("[K", "Erase from cursor to end of line"),
    createTest("[0K", "Same"),
    createTest("[1K", "Erase from beginning of line to cursor"),
    createTest("[2K", "Erase line containing cursor"),
    createTest("[J", "Erase from cursor to end of screen"),
    createTest("[0J", "Same"),
    createTest("[2J", "Erase entire screen"),
    createTest("[P", "Delete character"),
    createTest("[0P", "Delete character (0P)"),
    createTest("[2P", "Delete 2 characters"),

    createTest("(A", "United Kingdom (UK) (Character Set G0)"),
    createTest(")A", "United Kingdom (UK) (Character Set G1)"),
    createTest("(B", "United States (USASCII) (Character Set G0)"),
    createTest(")B", "United States (USASCII) (Character Set G1)"),
    createTest("(0", "Special graphics/line drawing set (Character Set G0)"),
    createTest(")0", "Special graphics/line drawing set (Character Set G1)"),
    createTest("(1", "Alternative character ROM (Character Set G0)"),
    createTest(")1", "Alternative character ROM (Character Set G1)"),
    createTest("(2", "Alternative graphic ROM (Character Set G0)"),
    createTest(")2", "Alternative graphic ROM (Character Set G1)"),

    createTest("H", "Set tab at current column"),
    createTest("[g", "Clear tab at current column"),
    createTest("[0g", "Same"),
    createTest("[3g", "Clear all tabs"),

    createTest("[6n", "Cursor position report"),
    createTest("[176;176R", "(response; Pl=line#; Pc=column#)"),
    createTest("[5n", "Status report"),
    createTest("[c", "(response; terminal Ok)"),
    createTest("[0c", "(response; teminal not Ok)"),
    createTest("[?1;176c", "response; where Ps is option present:"),

    createTest("c", "Causes power-up reset routine to be executed"),
    createTest("#8", "Fill screen with \"E\""),
    createTest("[2;176y", "Invoke Test(s), where Ps is a decimal computed by adding the numbers of the desired tests to be executed"),

    createTest("[176A", "Move cursor up n lines", "CUU"),
    createTest("[176B", "Move cursor down n lines", "CUD"),
    createTest("[176C", "Move cursor right n lines", "CUF"),
    createTest("[176D", "Move cursor left n lines", "CUB"),
    createTest("[176;176H", "Move cursor to screen location v,h", "CUP"),
    createTest("[176;176f", "Move cursor to screen location v,h", "CUP"),
    createTest("[176;176r", "Set top and bottom lines of a window", "DECSTBM"),
    createTest("[176;176R", "Response: cursor is at v,h", "CPR"),

    createTest("[?1;1760c", "Response: terminal type code n", "DA"),

    createTest("[20h", "Set new line mode", "LMN"),
    createTest("[?1h", "Set cursor key to application", "DECCKM"),
    createTest("[?3h", "Set number of columns to 132", "DECCOLM"),
    createTest("[?4h", "Set smooth scrolling", "DECSCLM"),
    createTest("[?5h", "Set reverse video on screen", "DECSCNM"),
    createTest("[?6h", "Set origin to relative", "DECOM"),
    createTest("[?7h", "Set auto-wrap mode", "DECAWM"),
    createTest("[?8h", "Set auto-repeat mode", "DECARM"),
    createTest("[?9h", "Set interlacing mode", "DECINLM"),
    createTest("[20l", "Set line feed mode", "LMN"),
    createTest("[?1l", "Set cursor key to cursor", "DECCKM"),
    createTest("[?2l", "Set VT52 (versus ANSI)", "DECANM"),
    createTest("[?3l", "Set number of columns to 80", "DECCOLM"),
    createTest("[?4l", "Set jump scrolling", "DECSCLM"),
    createTest("[?5l", "Set normal video on screen", "DECSCNM"),
    createTest("[?6l", "Set origin to absolute", "DECOM"),
    createTest("[?7l", "Reset auto-wrap mode", "DECAWM"),
    createTest("[?8l", "Reset auto-repeat mode", "DECARM"),
    createTest("[?9l", "Reset interlacing mode", "DECINLM"),

    createTest("N", "Set single shift 2", "SS2"),
    createTest("O", "Set single shift 3", "SS3"),

    createTest("[m", "Turn off character attributes", "SGR0"),
    createTest("[0m", "Turn off character attributes", "SGR0"),
    createTest("[1m", "Turn bold mode on", "SGR1"),
    createTest("[2m", "Turn low intensity mode on", "SGR2"),
    createTest("[4m", "Turn underline mode on", "SGR4"),
    createTest("[5m", "Turn blinking mode on", "SGR5"),
    createTest("[7m", "Turn reverse video on", "SGR7"),
    createTest("[8m", "Turn invisible text mode on", "SGR8"),

    createTest("[9m", "strikethrough on", "--"),
    createTest("[22m", "bold off (see below)", "--"),
    createTest("[23m", "italics off", "--"),
    createTest("[24m", "underline off", "--"),
    createTest("[27m", "inverse off", "--"),
    createTest("[29m", "strikethrough off", "--"),
    createTest("[30m", "set foreground color to black", "--"),
    createTest("[31m", "set foreground color to red", "--"),
    createTest("[32m", "set foreground color to green", "--"),
    createTest("[33m", "set foreground color to yellow", "--"),
    createTest("[34m", "set foreground color to blue", "--"),
    createTest("[35m", "set foreground color to magenta (purple)", "--"),
    createTest("[36m", "set foreground color to cyan", "--"),
    createTest("[37m", "set foreground color to white", "--"),
    createTest("[39m", "set foreground color to default (white)", "--"),
    createTest("[40m", "set background color to black", "--"),
    createTest("[41m", "set background color to red", "--"),
    createTest("[42m", "set background color to green", "--"),
    createTest("[43m", "set background color to yellow", "--"),
    createTest("[44m", "set background color to blue", "--"),
    createTest("[45m", "set background color to magenta (purple)", "--"),
    createTest("[46m", "set background color to cyan", "--"),
    createTest("[47m", "set background color to white", "--"),
    createTest("[49m", "set background color to default (black)", "--"),

    createTest("[H", "Move cursor to upper left corner", "cursorhome"),
    createTest("[;H", "Move cursor to upper left corner", "cursorhome"),
    createTest("[f", "Move cursor to upper left corner", "hvhome"),
    createTest("[;f", "Move cursor to upper left corner", "hvhome"),
    createTest("M", "Move/scroll window down one line", "RI"),
    createTest("E", "Move to next line", "NEL"),

    createTest("H", "Set a tab at the current column", "HTS"),
    createTest("[g", "Clear a tab at the current column", "TBC"),
    createTest("[0g", "Clear a tab at the current column", "TBC"),
    createTest("[3g", "Clear all tabs", "TBC"),

    createTest("[K", "Clear line from cursor right", "EL0"),
    createTest("[0K", "Clear line from cursor right", "EL0"),
    createTest("[1K", "Clear line from cursor left", "EL1"),
    createTest("[2K", "Clear entire line", "EL2"),
    createTest("[J", "Clear screen from cursor down", "ED0"),
    createTest("[0J", "Clear screen from cursor down", "ED0"),
    createTest("[1J", "Clear screen from cursor up", "ED1"),
    createTest("[2J", "Clear entire screen", "ED2"),

    createTest("[c", "Identify what terminal type", "DA"),
    createTest("[0c", "Identify what terminal type (another)", "DA"),
    createTest("c", "Reset terminal to initial state", "RIS"),
    createTest("[2;1y", "Confidence power up test", "DECTST"),
    createTest("[2;2y", "Confidence loopback test", "DECTST"),
    createTest("[2;9y", "Repeat power up test", "DECTST"),
    createTest("[2;10y", "Repeat loopback test", "DECTST"),
    createTest("[0q", "Turn off all four leds", "DECLL0"),
    createTest("[1q", "Turn on LED #1", "DECLL1"),
    createTest("[2q", "Turn on LED #2", "DECLL2"),
    createTest("[3q", "Turn on LED #3", "DECLL3"),
    createTest("[4q", "Turn on LED #4", "DECLL4"),

    createTest("7", "Save cursor position and attributes", "DECSC"),
    createTest("8", "Restore cursor position and attributes", "DECSC"),

    createTest("=", "Set alternate keypad mode", "DECKPAM"),
    createTest(">", "Set numeric keypad mode", "DECKPNM"),

    createTest("(A", "Set United Kingdom G0 character set", "setukg0"),
    createTest(")A", "Set United Kingdom G1 character set", "setukg1"),
    createTest("(B", "Set United States G0 character set", "setusg0"),
    createTest(")B", "Set United States G1 character set", "setusg1"),
    createTest("(0", "Set G0 special chars. & line set", "setspecg0"),
    createTest(")0", "Set G1 special chars. & line set", "setspecg1"),
    createTest("(1", "Set G0 alternate character ROM", "setaltg0"),
    createTest(")1", "Set G1 alternate character ROM", "setaltg1"),
    createTest("(2", "Set G0 alt char ROM and spec. graphics", "setaltspecg0"),
    createTest(")2", "Set G1 alt char ROM and spec. graphics", "setaltspecg1"),

    createTest("#3", "Double-height letters, top half", "DECDHL"),
    createTest("#4", "Double-height letters, bottom half", "DECDHL"),
    createTest("#5", "Single width, single height letters", "DECSWL"),
    createTest("#6", "Double width, single height letters", "DECDWL"),
    createTest("#8", "Screen alignment display", "DECALN"),

    createTest("5n", "Device status report", "DSR"),
    createTest("0n", "Response: terminal is OK", "DSR"),
    createTest("3n", "Response: terminal is not OK", "DSR"),
    createTest("6n", "Get cursor position", "DSR")
];

describe("VT100 Ansi compatible Codes", () => {

    arrForEach(vt100Codes, (code) => {
        it(`VT100: ${code.desc}`, () => {
            assert.isTrue(code.abbr.length > 0, `Code ${code.desc} should have a length`);
            assert.equal(stripAnsi(code.abbr), "", `Code ${code.desc} should be stripped`);
            assert.equal(stripAnsi("Hello" + code.abbr + "Darkness"), "HelloDarkness", `Code ${code.desc} should be stripped`);
            assert.equal(stripAnsi("Hello" + code.abbr + "Darkness"), "HelloDarkness", `Code ${code.desc} should be stripped`);
            assert.equal(stripAnsi("Hello" + code.abbr + "Darkness" + code.abbr + "MyOldFriend"), "HelloDarknessMyOldFriend", `Code ${code.desc} should be stripped`);
        });
    });
});