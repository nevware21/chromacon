/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import {
    red, green, blue, bold, underline, bgYellow, black, reset, dim
} from "../../src/index";
import { setColorLevel } from "../../src/utils/supported";
import { ColorLevel } from "../../src/enums/ColorLevel";

function _formatErrorMessage(value: string) {
    // eslint-disable-next-line no-control-regex
    return value.replace(/\x1b/g, "\\x1b");
}

describe("README Examples", () => {
    
    beforeEach(() => {
        setColorLevel(ColorLevel.Basic);
    });

    afterEach(() => {
        setColorLevel(ColorLevel.AutoDetect);
    });

    describe("Function Usage Examples", () => {
        
        it("should wrap text and auto-reset with function usage", () => {
            // Function wraps text and auto-resets
            const result = red("This is red text");
            assert.equals(result, "\x1b[31mThis is red text\x1b[39m");
            
            const boldResult = bold("This is bold text");
            assert.equals(boldResult, "\x1b[1mThis is bold text\x1b[22m");
        });

        it("should handle simple single-color text", () => {
            const result = green("Success!");
            assert.equals(result, "\x1b[32mSuccess!\x1b[39m");
        });
    });

    describe("String Usage Examples", () => {
        
        it("should provide raw ANSI codes for manual control", () => {
            // Manual color control with raw ANSI codes
            const result = `${red}This is red text${reset}`;
            assert.equals(result, "\x1b[31mThis is red text\x1b[0m");
            
            const boldResult = `${bold}This is bold text${reset}`;
            assert.equals(boldResult, "\x1b[1mThis is bold text\x1b[0m");
        });

        it("should build complex strings with multiple colors", () => {
            const result = `${red}Error:${reset} ${green}Operation completed${reset}`;
            assert.equals(result, "\x1b[31mError:\x1b[0m \x1b[32mOperation completed\x1b[0m");
        });
    });

    describe("Smart Color Restoration Examples", () => {
        
        it("should restore previous color after nested function call", () => {
            // Nested colors with automatic restoration
            const result = red("Red " + blue("blue") + " back to red");
            // The text returns to red after the blue section ends
            assert.equals(result, "\x1b[31mRed \x1b[34mblue\x1b[31m back to red\x1b[39m");
        });

        it("should handle complex nesting with multiple colors", () => {
            // "Error in" and "at line 42" are red, "file.ts" is green
            const result = red("Error in " + green("file.ts") + " at line 42");
            assert.equals(result, "\x1b[31mError in \x1b[32mfile.ts\x1b[31m at line 42\x1b[39m");
        });

        it("should mix function and string patterns", () => {
            // "Status:" is red, "OK" is green, "- continuing..." is plain (no restoration in template literals)
            const result = `${red}Status: ${green("OK")} - continuing...${reset}`;
            assert.equals(result, "\x1b[31mStatus: \x1b[32mOK\x1b[39m - continuing...\x1b[0m");
        });

        it("should use function context for color restoration", () => {
            // "Status:" is red, "OK" is green, "- continuing..." is red (restored!)
            const result = red("Status: " + green("OK") + " - continuing...");
            assert.equals(result, "\x1b[31mStatus: \x1b[32mOK\x1b[31m - continuing...\x1b[39m");
            
            // Verify green is properly closed and red is restored before final reset
            assert.isTrue(result.includes("\x1b[32mOK\x1b[31m"));
        });

        it("should track and restore active color automatically", () => {
            // Test that color restoration works correctly
            const nested = red("Start " + blue("middle") + " end");
            assert.equals(nested, "\x1b[31mStart \x1b[34mmiddle\x1b[31m end\x1b[39m");
            
            // Verify the blue section is properly closed and red is restored
            assert.isTrue(nested.includes("\x1b[34mmiddle\x1b[31m"));
        });

        it("should optimize output by removing redundant sequences", () => {
            // When nesting colors, redundant reset codes are removed
            const result = red(blue("text"));
            
            // Should NOT contain blue reset followed immediately by outer color
            // Instead, it directly restores to red, removing the unnecessary blue reset
            assert.equals(result, "\x1b[31m\x1b[34mtext\x1b[39m", _formatErrorMessage(result));
            
            // Verify it doesn't contain the redundant pattern \x1b[39m\x1b[31m
            assert.isFalse(result.includes("\x1b[39m\x1b[31m"));
            assert.isFalse(result.includes("\x1b[31m\x1b[39m"));
            assert.isFalse(result.includes("\x1b[34m\x1b[39m"));
            
            // Should contain the optimized pattern where blue directly transitions to red
            assert.isTrue(result.includes("\x1b[34mtext\x1b[39m"));
        });
    });

    describe("Combining Colors and Styles Examples", () => {
        
        it("should handle function usage with nested formatting", () => {
            // "Error in" and "at" are red, "file.ts" is blue and bold, "line 42" is underlined
            const result = red(`Error in ${blue(bold("file.ts"))} at ${underline("line 42")}`);
            assert.equals(result, "\x1b[31mError in \x1b[34m\x1b[1mfile.ts\x1b[22m\x1b[31m at \x1b[4mline 42\x1b[24m\x1b[39m");
        });

        it("should handle complex combinations", () => {
            const result = bgYellow(black(bold("WARNING: Critical Issue")));
            assert.equals(result, "\x1b[43m\x1b[30m\x1b[1mWARNING: Critical Issue\x1b[22m\x1b[39m\x1b[49m");
        });

        it("should handle string usage for manual control", () => {
            const result = `${red}Error: ${bold}Critical${reset}${red} failure in system${reset}`;
            assert.equals(result, "\x1b[31mError: \x1b[1mCritical\x1b[0m\x1b[31m failure in system\x1b[0m");
        });

        it("should mix both patterns for flexibility", () => {
            const filename = blue(bold("config.json"));
            const result = `${red}Cannot find ${filename} in directory${reset}`;
            // "Cannot find" and "in directory" are red, "config.json" is blue and bold
            assert.equals(result, "\x1b[31mCannot find \x1b[34m\x1b[1mconfig.json\x1b[22m\x1b[39m in directory\x1b[0m");
        });
    });

    describe("Multiple Nesting Scenarios", () => {
        
        it("should handle triple nesting", () => {
            const result = red("Level1 " + green("Level2 " + blue("Level3")));
            assert.equals(result, "\x1b[31mLevel1 \x1b[32mLevel2 \x1b[34mLevel3\x1b[39m", _formatErrorMessage(result));
        });

        it("should handle non-overlapping nested colors", () => {
            const result = red("Start " + blue("middle") + " end " + green("final"));
            assert.equals(result, "\x1b[31mStart \x1b[34mmiddle\x1b[31m end \x1b[32mfinal\x1b[39m", _formatErrorMessage(result));
        });

        it("should handle nesting with multiple styles", () => {
            const result = bold(red("Bold red " + dim("with dim") + " back to bold"));
            assert.equals(result, "\x1b[1m\x1b[31mBold red \x1b[2mwith dim\x1b[1m back to bold\x1b[39m\x1b[22m", _formatErrorMessage(result));
        });

        it("should handle complex template string patterns", () => {
            const status = "running";
            const result = `Status: ${green(status)}`;
            assert.equals(result, "Status: \x1b[32mrunning\x1b[39m");
        });

        it("should restore colors in sequential usage", () => {
            const result = red("First") + " plain " + green("Second");
            assert.equals(result, "\x1b[31mFirst\x1b[39m plain \x1b[32mSecond\x1b[39m");
        });
    });

    describe("Color Restoration Edge Cases", () => {
        
        it("should handle empty strings in nested calls", () => {
            const result = red("Text " + blue("") + " more text");
            assert.equals(result, "\x1b[31mText \x1b[34m\x1b[31m more text\x1b[39m");
        });

        it("should handle only nested content", () => {
            const result = red(blue("blue text"));
            assert.equals(result, "\x1b[31m\x1b[34mblue text\x1b[39m");
        });

        it("should handle multiple adjacent nested calls", () => {
            const result = red(blue("A") + green("B") + blue("C"));
            assert.equals(result, "\x1b[31m\x1b[34mA\x1b[31m\x1b[32mB\x1b[31m\x1b[34mC\x1b[39m");
        });

        it("should work with background and foreground colors", () => {
            const result = red("Text with " + bgYellow(black("highlight")) + " continues");
            assert.equals(result, "\x1b[31mText with \x1b[43m\x1b[30mhighlight\x1b[31m\x1b[49m continues\x1b[39m", _formatErrorMessage(result));
        });
    });

    describe("ColorLevel.None behavior", () => {
        
        beforeEach(() => {
            setColorLevel(ColorLevel.None);
        });

        it("should return plain text without colors", () => {
            const result = red("This is red text");
            assert.equals(result, "This is red text");
        });

        it("should handle nested colors without ANSI codes", () => {
            const result = red("Red " + blue("blue") + " back to red");
            assert.equals(result, "Red blue back to red");
        });

        it("should handle complex nesting without colors", () => {
            const result = bgYellow(black(bold("WARNING: Critical Issue")));
            assert.equals(result, "WARNING: Critical Issue");
        });
    });
});
