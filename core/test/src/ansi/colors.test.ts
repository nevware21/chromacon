/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import {
    bgBlack, bgBlue, bgBrightBlue, bgBrightCyan, bgBrightGreen, bgBrightMagenta, bgBrightRed, bgBrightWhite, bgBrightYellow,
    bgCyan, bgGray, bgGreen, bgMagenta, bgRed, bgWhite, bgYellow, black, blue, brightBlue, brightCyan, brightGreen, brightMagenta,
    brightRed, brightWhite, brightYellow, cyan, gray, green, magenta, red, white, yellow
} from "../../../src/ansi/colors";
import { bold, dim } from "../../../src/ansi/styles";
import { asString } from "@nevware21/ts-utils";
import { setColorLevel } from "../../../src/utils/supported";
import { ColorLevel } from "../../../src/enums/ColorLevel";
import { ChromaColor } from "../../../src/interfaces/types";

const colorNames: { [key: number]: string } = {
    [ColorLevel.None]: "None",
    [ColorLevel.Basic]: "Basic",
    [ColorLevel.Ansi256]: "Rgb256",
    [ColorLevel.Rgb]: "TrueColor"
}

const foregroundColors: { [key: string]: { color: ChromaColor, start: string, end: string } } = {
    "black": { color: black, start: "\x1b[30m", end: "\x1b[39m" },
    "red": { color: red, start: "\x1b[31m", end: "\x1b[39m" },
    "green": { color: green, start: "\x1b[32m", end: "\x1b[39m" },
    "yellow": { color: yellow, start: "\x1b[33m", end: "\x1b[39m" },
    "blue": { color: blue, start: "\x1b[34m", end: "\x1b[39m" },
    "magenta": { color: magenta, start: "\x1b[35m", end: "\x1b[39m" },
    "cyan": { color: cyan, start: "\x1b[36m", end: "\x1b[39m" },
    "white": { color: white, start: "\x1b[37m", end: "\x1b[39m" },
    "gray": { color: gray, start: "\x1b[90m", end: "\x1b[39m" },
    "brightRed": { color: brightRed, start: "\x1b[91m", end: "\x1b[39m" },
    "brightGreen": { color: brightGreen, start: "\x1b[92m", end: "\x1b[39m" },
    "brightYellow": { color: brightYellow, start: "\x1b[93m", end: "\x1b[39m" },
    "brightBlue": { color: brightBlue, start: "\x1b[94m", end: "\x1b[39m" },
    "brightMagenta": { color: brightMagenta, start: "\x1b[95m", end: "\x1b[39m" },
    "brightCyan": { color: brightCyan, start: "\x1b[96m", end: "\x1b[39m" },
    "brightWhite": { color: brightWhite, start: "\x1b[97m", end: "\x1b[39m" }
}

const backgroundColors: { [key: string]: { color: ChromaColor, start: string, end: string } } = {
    black: { color: bgBlack, start: "\x1b[40m", end: "\x1b[49m" },
    red: { color: bgRed, start: "\x1b[41m", end: "\x1b[49m" },
    green: { color: bgGreen, start: "\x1b[42m", end: "\x1b[49m" },
    yellow: { color: bgYellow, start: "\x1b[43m", end: "\x1b[49m" },
    blue: { color: bgBlue, start: "\x1b[44m", end: "\x1b[49m" },
    magenta: { color: bgMagenta, start: "\x1b[45m", end: "\x1b[49m" },
    cyan: { color: bgCyan, start: "\x1b[46m", end: "\x1b[49m" },
    white: { color: bgWhite, start: "\x1b[47m", end: "\x1b[49m" },
    gray: { color: bgGray, start: "\x1b[100m", end: "\x1b[49m" },
    brightRed: { color: bgBrightRed, start: "\x1b[101m", end: "\x1b[49m" },
    brightGreen: { color: bgBrightGreen, start: "\x1b[102m", end: "\x1b[49m" },
    brightYellow: { color: bgBrightYellow, start: "\x1b[103m", end: "\x1b[49m" },
    brightBlue: { color: bgBrightBlue, start: "\x1b[104m", end: "\x1b[49m" },
    brightMagenta: { color: bgBrightMagenta, start: "\x1b[105m", end: "\x1b[49m" },
    brightCyan: { color: bgBrightCyan, start: "\x1b[106m", end: "\x1b[49m" },
    brightWhite: { color: bgBrightWhite, start: "\x1b[107m", end: "\x1b[49m" }
};

function _format(value: string) {
    // eslint-disable-next-line no-control-regex
    return value.replace(/\x1b/g, "\\x1b");
}

function _convert(value: string) {
    // eslint-disable-next-line no-control-regex
    return value.replace(/\x1b\[/g, "\x9b");
}

describe("Basic Colors", () => {

    describe("foreground color tests with Basic Color support", () => {
        
        for (let level = ColorLevel.None as number; level <= (ColorLevel.Rgb as number); level++) {
            describe("With ColorLevel:" + colorNames[level], () => {

                beforeEach(() => {
                    setColorLevel(level);
                });

                afterEach(() => {
                    setColorLevel(ColorLevel.AutoDetect);
                });

                for (const colorName in foregroundColors) {
                    const { color, start, end } = foregroundColors[colorName];
                    if (level !== ColorLevel.None) {
                        
                        it(`Should return a ${color(colorName)} string`, () => {
                            assert.equals(color("Hello"), start + "Hello" + end, _format(color("Hello")));
                            assert.notEquals(color("Hello"), end);
                            assert.notEquals(color("Hello"), "");
                            assert.notEquals(color("Hello"), "Hello");

                            // The converted string should be the same as the color function
                            assert.equals(asString(color).length, start.length);

                            // The "function" should take a single argument
                            assert.isFunction(color);
                            assert.equals(color.length, 1);
                            assert.equals(color, start, "The function should be convertible to the start sequence");

                            // Check implicit conversions
                            assert.equals("" + color, start);
                            assert.notEquals("" + color, end);
                            assert.notEquals("" + color, "");

                            // Check explicit conversions
                            assert.equals(color.toString(), start);
                            assert.notEquals(color.toString(), end);
                            assert.notEquals(color.toString(), "");

                            // Check asString conversions (should be same as toString)
                            assert.equals(asString(color), start);
                            assert.notEquals(asString(color), end);
                            assert.notEquals(asString(color), "");
                        });

                        it ("should handle nested bold and dim styles", () => {
                            const nested = bold(color("Hello " + dim("Darkness")));
                            assert.equals(nested, "\x1b[1m" + start + "Hello " + "\x1b[2mDarkness\x1b[1m\x1b[39m\x1b[22m", _format(nested));
                            //\x1b[1m\x1b[30mHello \x1b[2mDarkness\x1b[1m\x1b[39m\x1b[22m

                            const feEmbedded = _convert(color("Hello " + dim("Darkness")));
                            assert.equals(feEmbedded, _convert(start) + "Hello " + "\x9b2mDarkness\x9b22m\x9b39m", _format(feEmbedded));
                            const feNested = bold(feEmbedded);
                            assert.equals(feNested, "\x1b[1m" + _convert(start) + "Hello " + "\x9b2mDarkness\x9b22m\x9b39m\x1b[22m", _format(feNested));
                        });

                        it("should handle nested colors", () => {
                            const nested = color("Hello " + red("Darkness"));
                            assert.equals(nested, start + "Hello " + foregroundColors.red.start + "Darkness" + end, _format(nested));
                            //\x1b[30mHello \x1b[31mDarkness\x1b[30m\x1b[39m:

                            const feEmbedded = _convert(red("Darkness"));
                            assert.equals(feEmbedded, _convert(foregroundColors.red.start) + "Darkness\x9b39m", _format(feEmbedded));
                            const feNested = color("Hello " + feEmbedded);
                            assert.equals(feNested, start + "Hello " + _convert(foregroundColors.red.start) + "Darkness\x9b39m" + end, _format(nested));
                        });

                        it("should handle multiple nested colors", () => {
                            const nested = color("Hello " + red("Darkness " + green("My Old Friend")));
                            assert.equals(nested, start + "Hello " + foregroundColors.red.start + "Darkness " + foregroundColors.green.start + "My Old Friend" + end, _format(nested));
                            //\x1b[30mHello \x1b[31mDarkness \x1b[32mMy Old Friend\x1b[30m\x1b[39m\x1b[39m:

                            const feEmbedded = _convert(red("Darkness " + green("My Old Friend")));
                            assert.equals(feEmbedded, _convert(foregroundColors.red.start) + "Darkness " + _convert(foregroundColors.green.start) + "My Old Friend\x9b39m", _format(feEmbedded));
                            const feNested = color("Hello " + feEmbedded);
                            assert.equals(feNested, start + "Hello " + _convert(foregroundColors.red.start) + "Darkness " + _convert(foregroundColors.green.start) + "My Old Friend\x9b39m" + end, _format(feNested));
                        });

                        it("should handle multiple nested colors with bold and dim", () => {
                            const nested = bold(color("Hello " + red("Darkness " + dim("My Old Friend"))));
                            assert.equals(nested, "\x1b[1m" + start + "Hello " + foregroundColors.red.start + "Darkness " + "\x1b[2m" + "My Old Friend" + "\x1b[1m\x1b[39m\x1b[22m", _format(nested));
                            //\x1b[1m\x1b[30mHello \x1b[31mDarkness \x1b[2mMy Old Friend\x1b[1m\x1b[39m\x1b[22m

                            const feEmbedded = _convert(red("Darkness " + dim("My Old Friend")));
                            assert.equals(feEmbedded, _convert(foregroundColors.red.start) + "Darkness " + "\x9b2mMy Old Friend\x9b22m\x9b39m", _format(feEmbedded));
                            const feNested = bold(color("Hello " + feEmbedded));
                            assert.equals(feNested, "\x1b[1m" + start + "Hello " + _convert(foregroundColors.red.start) + "Darkness " + "\x9b2mMy Old Friend\x1b[1m\x9b39m" + end + "\x1b[22m", _format(feNested));
                            //\x1b[1m\x1b[30mHello 31mDarkness 2mMy Old Friend\x1b[1m39m\x1b[39m\x1b[22m
                        });

                        it("should handle multiple nested colors even when they don't overlap", () => {
                            const nested = color("Hello " + red("Darkness ") + "My " + green("Old Friend"));
                            assert.equals(nested, start + "Hello " + foregroundColors.red.start + "Darkness " + start + "My " + foregroundColors.green.start + "Old Friend" + end, _format(nested));
                            //\x1b[30mHello \x1b[31mDarkness \x1b[30mMy \x1b[32mOld Friend\x1b[39m

                            const feEmbedded = _convert(red("Darkness ") + "My " + green("Old Friend"));
                            assert.equals(feEmbedded, _convert(foregroundColors.red.start) + "Darkness " + _convert(foregroundColors.red.end) + "My " + _convert(foregroundColors.green.start) + "Old Friend\x9b39m", _format(feEmbedded));
                            const feNested = color("Hello " + feEmbedded);
                            assert.equals(feNested, start + "Hello " + _convert(foregroundColors.red.start) + "Darkness " + _convert(foregroundColors.red.end) + "My " + _convert(foregroundColors.green.start) + "Old Friend" + _convert(foregroundColors.green.end) + end, _format(feNested));
                            //\x1b[30mHello 31mDarkness 39mMy 32mOld Friend39m\x1b[39m
                        });

                        it ("should handle nested colors with bold and dim styles when they don't overlap", () => {
                            const nested = bold(color("Hello " + red("Darkness ") + "My " + dim("Old ") + "Friend"));
                            assert.equals(nested, "\x1b[1m" + start + "Hello " + foregroundColors.red.start + "Darkness " + start + "My " + "\x1b[2m" + "Old " + "\x1b[1m" + "Friend\x1b[39m\x1b[22m", _format(nested));
                            //assert.equals(_format(nested), _format("\x1b[1m" + start + "Hello " + foregroundColors.red.start + "Darkness " + start + "My " + "\x1b[2m" + "Old " + "\x1b[1m" + "Friend\x1b[39m\x1b[22m"));
                            //\x1b[1m\x1b[30mHello \x1b[31mDarkness \x1b[30mMy \x1b[2mOld \x1b[1mFriend\x1b[39m\x1b[22m
                        });

                    } else {
                        it(`Should not return colorized ${colorName} string`, () => {
                            assert.equals(color.toString(), "", _format(color.toString()));
                            assert.notEquals(color.toString(), start);
                            assert.notEquals(color.toString(), end);

                            assert.equals(asString(color), "");
                            assert.notEquals(asString(color), start);
                            assert.notEquals(asString(color), end);

                            assert.equals(color("Hello"), "Hello", _format(color("Hello")));
                            assert.notEquals(color("Hello"), start + "Hello" + end);
                            assert.notEquals(color("Hello"), end);
                            assert.notEquals(color("Hello"), "");

                            // The converted string should be the same as the color function
                            assert.equals(asString(color).length, 0);

                            // The "function" should take a single argument
                            assert.equals(color.length, 1);

                            assert.equals(color, "");
                            assert.notEquals(color, start);
                            assert.notEquals(color, end);
                            assert.isFunction(color);
                        });

                        it ("should handle nested bold and dim styles", () => {
                            const nested = bold(color("Hello " + dim("Darkness")));
                            assert.equals(nested, "Hello Darkness");
                        });

                        it("should handle nested colors", () => {
                            const nested = color("Hello " + red("Darkness"));
                            assert.equals(nested, "Hello Darkness");
                        });
                    }
                }
            });
        }
    });

    describe("background color tests with Basic Color support", () => {
        
        for (let level = ColorLevel.None as number; level <= (ColorLevel.Rgb as number); level++) {
            describe("With ColorLevel:" + colorNames[level], () => {

                beforeEach(() => {
                    setColorLevel(level);
                });

                afterEach(() => {
                    setColorLevel(ColorLevel.AutoDetect);
                });

                for (const colorName in backgroundColors) {
                    const { color, start, end } = backgroundColors[colorName];
                    if (level !== ColorLevel.None) {
                        
                        it(`Should return a ${color(colorName)} string`, () => {
                            assert.equals(color, start);
                            assert.notEquals(color, end);
                            assert.notEquals(color, "");
                            assert.isFunction(color);

                            assert.equals(color.toString(), start);
                            assert.notEquals(color.toString(), end);
                            assert.notEquals(color.toString(), "");

                            assert.equals(asString(color), start);
                            assert.notEquals(asString(color), end);
                            assert.notEquals(asString(color), "");

                            assert.equals(color("Hello"), start + "Hello" + end);
                            assert.notEquals(color("Hello"), end);
                            assert.notEquals(color("Hello"), "");
                            assert.notEquals(color("Hello"), "Hello");

                            // The converted string should be the same as the color function
                            assert.equals(asString(color).length, start.length);

                            // The "function" should take a single argument
                            assert.equals(color.length, 1);
                        });
                    } else {
                        it(`Should not return colorized ${colorName} string`, () => {
                            assert.equals(color, "");
                            assert.notEquals(color, start);
                            assert.notEquals(color, end);
                            assert.isFunction(color);

                            assert.equals(color.toString(), "");
                            assert.notEquals(color.toString(), start);
                            assert.notEquals(color.toString(), end);

                            assert.equals(asString(color), "");
                            assert.notEquals(asString(color), start);
                            assert.notEquals(asString(color), end);

                            assert.equals(color("Hello"), "Hello");
                            assert.notEquals(color("Hello"), start + "Hello" + end);
                            assert.notEquals(color("Hello"), end);
                            assert.notEquals(color("Hello"), "");

                            // The converted string should be the same as the color function
                            assert.equals(asString(color).length, 0);

                            // The "function" should take a single argument
                            assert.equals(color.length, 1);
                        });
                    }
                }
            });
        }
    });

    describe("Nesting foreground and background colors", () => {
        
        for (let level = ColorLevel.None as number; level <= (ColorLevel.Rgb as number); level++) {
            describe("With ColorLevel:" + colorNames[level], () => {

                beforeEach(() => {
                    setColorLevel(level);
                });

                afterEach(() => {
                    setColorLevel(ColorLevel.AutoDetect);
                });

                for (const fgColorName in foregroundColors) {
                    const { color: fgColor, start: fgStart, end: fgEnd } = foregroundColors[fgColorName];

                    for (const bgColorName in backgroundColors) {
                        const { color: bgColor, start: bgStart, end: bgEnd } = backgroundColors[bgColorName];

                        if (level !== ColorLevel.None) {
                            
                            it(`Should return a nested ${fgColor(fgColorName)} on ${bgColor(bgColorName)} string`, () => {
                                assert.equals(_format(fgColor(bgColor("Hello"))), _format(fgStart + bgStart + "Hello" + bgEnd + fgEnd));
                                assert.notEquals(fgColor(bgColor("Hello")), fgEnd);
                                assert.notEquals(fgColor(bgColor("Hello")), "");
                                assert.notEquals(fgColor(bgColor("Hello")), "Hello");
                            });
                        } else {
                            it(`Should not return nested ${fgColor(fgColorName)} on ${bgColor(bgColorName)} string`, () => {
                                assert.equals(fgColor(bgColor("Hello")), "Hello");
                                assert.notEquals(fgColor(bgColor("Hello")), fgStart + bgStart + "Hello" + bgEnd + fgEnd);
                                assert.notEquals(fgColor(bgColor("Hello")), fgEnd);
                                assert.notEquals(fgColor(bgColor("Hello")), "");
                            });
                        }
                    }
                }
            });
        }
    });
});