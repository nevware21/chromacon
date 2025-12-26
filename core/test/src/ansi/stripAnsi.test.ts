/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { assert, expect } from "@nevware21/tripwire";
import { stripAnsi } from "../../../src/ansi/stripAnsi";

describe("stripAnsi", () => {

    describe("exceptions", () => {
        it("should handle null", () => {
            const input: any = null;
            const expectedOutput: any = null;
            expect(stripAnsi(input as any)).equal(expectedOutput);
        });
    
        it("should handle undefined", () => {
            const input: any = undefined;
            const expectedOutput: any = undefined;
            expect(stripAnsi(input as any)).equal(expectedOutput);
        });
    
        it("should handle non-string values", () => {
            const input = 42;
            const expectedOutput = "42";
            expect(stripAnsi(input as any)).equal(expectedOutput);
        });
        
    });

    it("should remove standard color ANSI escape codes from a string", () => {
        const input = "\u001b[31mHello\u001b[0m";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should return the same string if there are no ANSI escape codes", () => {
        const input = "Hello";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle an empty string", () => {
        const input = "";
        const expectedOutput = "";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with multiple ANSI escape codes", () => {
        const input = "\u001b[31mHello\u001b[0m \u001b[32mDarkness\u001b[0m";
        const expectedOutput = "Hello Darkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with nested ANSI escape codes", () => {
        const input = "\u001b[31mHello \u001b[32mDarkness\u001b[0m\u001b[0m";
        const expectedOutput = "Hello Darkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with invalid ANSI escape codes", () => {
        const input = "\u001b[31mHello\u001b[0m\u001b[99m";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and newlines", () => {
        const input = "\u001b[31mHello\nDarkness\u001b[0m";
        const expectedOutput = "Hello\nDarkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and carriage returns", () => {
        const input = "\u001b[31mHello\rDarkness\u001b[0m";
        const expectedOutput = "Hello\rDarkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and tabs", () => {
        const input = "\u001b[31mHello\tDarkness\u001b[0m";
        const expectedOutput = "Hello\tDarkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and backspaces", () => {
        const input = "\u001b[31mHello\bDarkness\u001b[0m";
        const expectedOutput = "Hello\bDarkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and form feeds", () => {
        const input = "\u001b[31mHello\fDarkness\u001b[0m";
        const expectedOutput = "Hello\fDarkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and a mix of control characters", () => {
        const input = "\u001b[31mHello\n\r\t\b\fDarkness\u001b[0m";
        const expectedOutput = "Hello\n\r\t\b\fDarkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle reset, setfg, setbg, italics, strike, underline sequence in a string", () => {
        const input = "Hello \u001B[0;33;49;3;9;4mdarkness\u001B[0m";
        const expectedOutput = "Hello darkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle complex color ANSI escape codes", () => {
        const input = "\u001b[38;2;255;0;0mHello \u001b[0mDarkness \u001B[00;38;5;244m\u001B[m\u001B[00;38;5;33mmy \u001B[0mold";
        const expectedOutput = "Hello Darkness my old";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and emoji", () => {
        const input = "\u001b[31mHello👋Darkness\u001b[0m";
        const expectedOutput = "Hello👋Darkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and emoji with skin tone modifiers", () => {
        const input = "\u001b[31mHello👋🏽Darkness\u001b[0m";
        const expectedOutput = "Hello👋🏽Darkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle \x9b as an escape character", () => {
        const input = "\x9b31mHello\x9b0m";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle random control characters", () => {
        const input = "\u001b[31mHello\u001b[0m\u0007";
        const expectedOutput = "Hello\u0007";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle random control characters with \x9b as an escape character", () => {
        const input = "\x9b31mHello\x9b0m\x9b0m";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle random control characters with \x9b as an escape character and a mix of control characters", () =>{
        const input = "\x9b31mHello\x9b0m\u0007";
        const expectedOutput = "Hello\u0007";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle random control characters with \x9b as an escape character and emoji", () => {
        const input = "\x9b31mHello👋Darkness\x9b0m";
        const expectedOutput = "Hello👋Darkness";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle 256 color ANSI escape codes", () => {
        const input = "\u001b[38;5;196mHello\u001b[0m";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle 256 color ANSI escape codes with a semicolon", () => {
        const input = "\u001b[38;5;196mHello\u001b[0m";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle 256 color ANSI escape codes with a semicolon and a mix of control characters", () => {
        const input = "\u001b[38;5;196mHello\u001b[0m\u0007";
        const expectedOutput = "Hello\u0007";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle cursor movement ANSI escape codes", () => {
        const input = "\u001b[2JHello";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle cursor movement ANSI escape codes with a mix of control characters", () => {
        const input = "\u001b[2JHello\u0007";
        const expectedOutput = "Hello\u0007";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle DEC Special Graphics ANSI escape codes", () => {
        const input = "\u001b(0Hello\u001b(B";
        const expectedOutput = "Hello";
        const output = stripAnsi(input);
        expect(output).equal(expectedOutput);
    });

    it("should handle DEC Special Graphics ANSI escape codes with a mix of control characters", () => {
        const input = "\u001b(0Hello\u001b(B\u0007";
        const expectedOutput = "Hello\u0007";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle DEC Special Graphics ANSI escape codes with a mix of control characters and emoji", () => {
        const input = "\u001b(0Hello👋Darkness\u001b(B\u0007";
        const expectedOutput = "Hello👋Darkness\u0007";
        expect(stripAnsi(input)).equal(expectedOutput);
    });
    it("should handle DEC Special Graphics ANSI escape codes", () => {
        const input = "\u001b(FHello\u001b(B";
        const expectedOutput = "Hello";
        const output = stripAnsi(input);
        expect(output).equal(expectedOutput);
    });

    it("should handle DEC Special Graphics ANSI escape codes with a mix of control characters", () => {
        const input = "\u001b(FHello\u001b(B\u0007";
        const expectedOutput = "Hello\u0007";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle DEC Special Graphics ANSI escape codes with a mix of control characters and emoji", () => {
        const input = "\u001b(FHello👋Darkness\u001b(B\u0007";
        const expectedOutput = "Hello👋Darkness\u0007";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle 3Fp ANSI escape codes", () => {
        const input = "\u001b0Hello\u001b(B";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle DEC 3Fp ANSI escape codes with a mix of control characters", () => {
        const input = "\u001b0Hello\u001b(B\u0007";
        const expectedOutput = "Hello\u0007";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle clear all tabs ANSI escape codes", () => {
        const input = "\u001b[3gHello";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle clear all tabs ANSI escape codes", () => {
        const input = "\u009b3gHello";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("handle ls ANSI escape codes", () => {
        const input = "\u001b[38;5;196mHello\u001b[0m";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should handle 24-bit color ANSI escape codes", () => {
        const input = "\u001b[38;2;255;0;0mHello\u001b[0m";
        const expectedOutput = "Hello";
        expect(stripAnsi(input)).equal(expectedOutput);
    });

    it("should match reset;setfg;setbg;italics;strike;underline sequence in a string", () => {
        const input = "\u001B[0;33;49;3;9;4mHello\u001B[0m";
        const expectedMatch = "Hello";
        expect(stripAnsi(input)).equal(expectedMatch);
    });

    it("should match clear tabs sequence in a string", () => {
        const input = "Hello\u001B[0gDarkness";
        const expectedMatch = "HelloDarkness";
        expect(stripAnsi(input)).equal(expectedMatch);
    });

    it("should match clear line from cursor right in a string", () => {
        const input = "Hello\u001B[KDarkness";
        const expectedMatch = "HelloDarkness";
        expect(stripAnsi(input)).equal(expectedMatch);
    });

    it("should match clear screen in a string", () => {
        const input = "Hello\u001B[2JDarkness";
        const expectedMatch = "HelloDarkness";
        expect(stripAnsi(input)).equal(expectedMatch);
    });

    it("should match terminal link", () => {
        for (const ST of ["\u0007", "\u001B\u005C", "\u009C"]) {
            expect(stripAnsi(`\u000B]8;k=v;https://example-a.com/?a_b=1&c=2#tit%20le${ST}click\u001B]8;;${ST}`)).equals(`\u000B]8;k=v;https://example-a.com/?a_b=1&c=2#tit%20le${ ST == "\x07" ? ST : ""}click`);
            expect(stripAnsi(`\u001B]8;;mailto:no-reply@mail.com${ST}mail\u001B]8;;${ST}`)).equals("mail");
            expect(stripAnsi(`\u001B]8;k=v;https://example-a.com/?a_b=1&c=2#tit%20le${ST}click\u001B]8;;${ST}`)).equals("click");
            expect(stripAnsi(`\u001B]8;;mailto:no-reply@mail.com${ST}mail-me\u001B]8;;${ST}`)).equals("mail-me");
        }
    });


    describe("Additional variants", () => {
        it("should strip ANSI OSC sequences", () => {
            const input = "Hello\x1b]0;darkness\x07 my old friend";
            const expected = "Hello my old friend";
            assert.equal(stripAnsi(input), expected);
        });

        it("should strip ANSI DSC sequences", () => {
            const input = "Hello\x1bPdarkness\x9c my old friend";
            const expected = "Hello my old friend";
            assert.equal(stripAnsi(input), expected);
        });

        it("should strip ANSI APC sequences", () => {
            const input = "Hello\x1b_darkness\x9c my old friend";
            const expected = "Hello my old friend";
            assert.equal(stripAnsi(input), expected);
        });

        it("should strip ANSI PM sequences", () => {
            const input = "Hello\x1b^darkness\x9c my old friend";
            const expected = "Hello my old friend";
            assert.equal(stripAnsi(input), expected);
        });

        it("should strip ANSI SOS sequences", () => {
            const input = "Hello\x1bXdarkness\x9c my old friend";
            const expected = "Hello my old friend";
            assert.equal(stripAnsi(input), expected);
        });
    });
});