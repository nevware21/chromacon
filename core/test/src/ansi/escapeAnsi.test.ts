/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { assert, expect } from "@nevware21/tripwire";
import { escapeAnsi } from "../../../src/ansi/escapeAnsi";

describe("escapeAnsi", () => {

    describe("exceptions", () => {
        it("should handle null", () => {
            const input: any = null;
            const expectedOutput: any = null;
            expect(escapeAnsi(input as any)).equal(expectedOutput);
        });
    
        it("should handle undefined", () => {
            const input: any = undefined;
            const expectedOutput: any = undefined;
            expect(escapeAnsi(input as any)).equal(expectedOutput);
        });
    
        it("should handle non-string values", () => {
            const input = 42;
            const expectedOutput = "42";
            expect(escapeAnsi(input as any)).equal(expectedOutput);
        });
    });

    it("should escape standard color ANSI escape codes in a string", () => {
        const input = "\u001b[31mHello\u001b[0m";
        const expectedOutput = "\\x1b[31mHello\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should return the same string if there are no ANSI escape codes", () => {
        const input = "Hello";
        const expectedOutput = "Hello";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle an empty string", () => {
        const input = "";
        const expectedOutput = "";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with multiple ANSI escape codes", () => {
        const input = "\u001b[31mHello\u001b[0m \u001b[32mDarkness\u001b[0m";
        const expectedOutput = "\\x1b[31mHello\\x1b[0m \\x1b[32mDarkness\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with nested ANSI escape codes", () => {
        const input = "\u001b[31mHello \u001b[32mDarkness\u001b[0m\u001b[0m";
        const expectedOutput = "\\x1b[31mHello \\x1b[32mDarkness\\x1b[0m\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with invalid ANSI escape codes", () => {
        const input = "\u001b[31mHello\u001b[0m\u001b[99m";
        const expectedOutput = "\\x1b[31mHello\\x1b[0m\\x1b[99m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and newlines", () => {
        const input = "\u001b[31mHello\nDarkness\u001b[0m";
        const expectedOutput = "\\x1b[31mHello\nDarkness\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and carriage returns", () => {
        const input = "\u001b[31mHello\rDarkness\u001b[0m";
        const expectedOutput = "\\x1b[31mHello\rDarkness\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and tabs", () => {
        const input = "\u001b[31mHello\tDarkness\u001b[0m";
        const expectedOutput = "\\x1b[31mHello\tDarkness\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and backspaces", () => {
        const input = "\u001b[31mHello\bDarkness\u001b[0m";
        const expectedOutput = "\\x1b[31mHello\bDarkness\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and form feeds", () => {
        const input = "\u001b[31mHello\fDarkness\u001b[0m";
        const expectedOutput = "\\x1b[31mHello\fDarkness\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and a mix of control characters", () => {
        const input = "\u001b[31mHello\n\r\t\b\fDarkness\u001b[0m";
        const expectedOutput = "\\x1b[31mHello\n\r\t\b\fDarkness\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle reset, setfg, setbg, italics, strike, underline sequence in a string", () => {
        const input = "Hello \u001B[0;33;49;3;9;4mdarkness\u001B[0m";
        const expectedOutput = "Hello \\x1b[0;33;49;3;9;4mdarkness\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle complex color ANSI escape codes", () => {
        const input = "\u001b[38;2;255;0;0mHello \u001b[0mDarkness \u001B[00;38;5;244m\u001B[m\u001B[00;38;5;33mmy \u001B[0mold";
        const expectedOutput = "\\x1b[38;2;255;0;0mHello \\x1b[0mDarkness \\x1b[00;38;5;244m\\x1b[m\\x1b[00;38;5;33mmy \\x1b[0mold";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and emoji", () => {
        const input = "\u001b[31mHello👋Darkness\u001b[0m";
        const expectedOutput = "\\x1b[31mHello👋Darkness\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle strings with ANSI escape codes and emoji with skin tone modifiers", () => {
        const input = "\u001b[31mHello👋🏽Darkness\u001b[0m";
        const expectedOutput = "\\x1b[31mHello👋🏽Darkness\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle \\x9b as an escape character", () => {
        const input = "\x9b31mHello\x9b0m";
        const expectedOutput = "\\x9b31mHello\\x9b0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle random control characters", () => {
        const input = "\u001b[31mHello\u001b[0m\u0007";
        const expectedOutput = "\\x1b[31mHello\\x1b[0m\u0007";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle random control characters with \\x9b as an escape character", () => {
        const input = "\x9b31mHello\x9b0m\x9b0m";
        const expectedOutput = "\\x9b31mHello\\x9b0m\\x9b0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle random control characters with \\x9b as an escape character and a mix of control characters", () => {
        const input = "\x9b31mHello\x9b0m\u0007";
        const expectedOutput = "\\x9b31mHello\\x9b0m\u0007";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle random control characters with \\x9b as an escape character and emoji", () => {
        const input = "\x9b31mHello👋Darkness\x9b0m";
        const expectedOutput = "\\x9b31mHello👋Darkness\\x9b0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle 256 color ANSI escape codes with a semicolon", () => {
        const input = "\u001b[38;5;196mHello\u001b[0m";
        const expectedOutput = "\\x1b[38;5;196mHello\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle 256 color ANSI escape codes with a semicolon and a mix of control characters", () => {
        const input = "\u001b[38;5;196mHello\u001b[0m\u0007";
        const expectedOutput = "\\x1b[38;5;196mHello\\x1b[0m\u0007";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle cursor movement ANSI escape codes with a mix of control characters", () => {
        const input = "\u001b[2JHello\u0007";
        const expectedOutput = "\\x1b[2JHello\u0007";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle DEC Special Graphics ANSI escape codes", () => {
        const input = "\u001b(0Hello\u001b(B";
        const expectedOutput = "\\x1b(0Hello\\x1b(B";
        const output = escapeAnsi(input);
        expect(output).equal(expectedOutput);
    });

    it("should handle DEC Special Graphics ANSI escape codes with a mix of control characters", () => {
        const input = "\u001b(0Hello\u001b(B\u0007";
        const expectedOutput = "\\x1b(0Hello\\x1b(B\u0007";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle DEC Special Graphics ANSI escape codes with a mix of control characters and emoji", () => {
        const input = "\u001b(0Hello👋Darkness\u001b(B\u0007";
        const expectedOutput = "\\x1b(0Hello👋Darkness\\x1b(B\u0007";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle DEC Special Graphics ANSI escape codes", () => {
        const input = "\u001b(FHello\u001b(B";
        const expectedOutput = "\\x1b(FHello\\x1b(B";
        const output = escapeAnsi(input);
        expect(output).equal(expectedOutput);
    });

    it("should handle DEC Special Graphics ANSI escape codes with a mix of control characters", () => {
        const input = "\u001b(FHello\u001b(B\u0007";
        const expectedOutput = "\\x1b(FHello\\x1b(B\u0007";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle DEC Special Graphics ANSI escape codes with a mix of control characters and emoji", () => {
        const input = "\u001b(FHello👋Darkness\u001b(B\u0007";
        const expectedOutput = "\\x1b(FHello👋Darkness\\x1b(B\u0007";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle 3Fp ANSI escape codes", () => {
        const input = "\u001b0Hello\u001b(B";
        const expectedOutput = "\\x1b0Hello\\x1b(B";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle DEC 3Fp ANSI escape codes with a mix of control characters", () => {
        const input = "\u001b0Hello\u001b(B\u0007";
        const expectedOutput = "\\x1b0Hello\\x1b(B\u0007";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle clear all tabs ANSI escape codes", () => {
        const input = "\u001b[3gHello";
        const expectedOutput = "\\x1b[3gHello";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle clear all tabs ANSI escape codes", () => {
        const input = "\u009b3gHello";
        const expectedOutput = "\\x9b3gHello";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("handle ls ANSI escape codes", () => {
        const input = "\u001b[38;5;196mHello\u001b[0m";
        const expectedOutput = "\\x1b[38;5;196mHello\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should handle 24-bit color ANSI escape codes", () => {
        const input = "\u001b[38;2;255;0;0mHello\u001b[0m";
        const expectedOutput = "\\x1b[38;2;255;0;0mHello\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedOutput);
    });

    it("should escape reset;setfg;setbg;italics;strike;underline sequence in a string", () => {
        const input = "\u001B[0;33;49;3;9;4mHello\u001B[0m";
        const expectedMatch = "\\x1b[0;33;49;3;9;4mHello\\x1b[0m";
        expect(escapeAnsi(input)).equal(expectedMatch);
    });

    it("should escape clear tabs sequence in a string", () => {
        const input = "Hello\u001B[0gDarkness";
        const expectedMatch = "Hello\\x1b[0gDarkness";
        expect(escapeAnsi(input)).equal(expectedMatch);
    });

    it("should escape clear line from cursor right in a string", () => {
        const input = "Hello\u001B[KDarkness";
        const expectedMatch = "Hello\\x1b[KDarkness";
        expect(escapeAnsi(input)).equal(expectedMatch);
    });

    it("should escape clear screen in a string", () => {
        const input = "Hello\u001B[2JDarkness";
        const expectedMatch = "Hello\\x1b[2JDarkness";
        expect(escapeAnsi(input)).equal(expectedMatch);
    });

    it("should escape terminal link", () => {
        for (const ST of ["\u0007", "\u001B\u005C", "\u009C"]) {
            const input1 = `\u000B]8;k=v;https://example-a.com/?a_b=1&c=2#tit%20le${ST}click\u001B]8;;${ST}`;
            const input2 = `\u001B]8;;mailto:no-reply@mail.com${ST}mail\u001B]8;;${ST}`;
            const input3 = `\u001B]8;k=v;https://example-a.com/?a_b=1&c=2#tit%20le${ST}click\u001B]8;;${ST}`;
            const input4 = `\u001B]8;;mailto:no-reply@mail.com${ST}mail-me\u001B]8;;${ST}`;

            const result1 = escapeAnsi(input1);
            const result2 = escapeAnsi(input2);
            const result3 = escapeAnsi(input3);
            const result4 = escapeAnsi(input4);

            // Verify that the escape codes are escaped
            expect(result1).not.equal(input1);
            expect(result2).not.equal(input2);
            expect(result3).not.equal(input3);
            expect(result4).not.equal(input4);

            // Verify that the text portions are preserved
            expect(result1).contains("click");
            expect(result2).contains("mail");
            expect(result3).contains("click");
            expect(result4).contains("mail-me");

            // Verify that escape characters are properly escaped
            expect(result1).contains("\\x1b");
            expect(result2).contains("\\x1b");
            expect(result3).contains("\\x1b");
            expect(result4).contains("\\x1b");
        }
    });

    describe("Additional variants", () => {
        it("should escape ANSI OSC sequences", () => {
            const input = "Hello\x1b]0;darkness\x07 my old friend";
            const expected = "Hello\\x1b]0;darkness\\x07 my old friend";
            assert.equal(escapeAnsi(input), expected);
        });

        it("should escape ANSI DSC sequences", () => {
            const input = "Hello\x1bPdarkness\x9c my old friend";
            const expected = "Hello\\x1bPdarkness\\x9c my old friend";
            assert.equal(escapeAnsi(input), expected);
        });

        it("should escape ANSI APC sequences", () => {
            const input = "Hello\x1b_darkness\x9c my old friend";
            const expected = "Hello\\x1b_darkness\\x9c my old friend";
            assert.equal(escapeAnsi(input), expected);
        });

        it("should escape ANSI PM sequences", () => {
            const input = "Hello\x1b^darkness\x9c my old friend";
            const expected = "Hello\\x1b^darkness\\x9c my old friend";
            assert.equal(escapeAnsi(input), expected);
        });

        it("should escape ANSI SOS sequences", () => {
            const input = "Hello\x1bXdarkness\x9c my old friend";
            const expected = "Hello\\x1bXdarkness\\x9c my old friend";
            assert.equal(escapeAnsi(input), expected);
        });
    });
});
