/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import {
    bold, dim, normal, italic, underline, blink, inverse, hidden, strikethrough,
    framed, encircled, overlined, reset
} from "../../../src/ansi/styles";
import { red, green } from "../../../src/ansi/colors";
import { asString } from "@nevware21/ts-utils";
import { setColorLevel } from "../../../src/utils/supported";
import { ColorLevel } from "../../../src/enums/ColorLevel";
import { CsiStyle } from "../../../src/interfaces/types";

const colorNames: { [key: number]: string } = {
    [ColorLevel.None]: "None",
    [ColorLevel.Basic]: "Basic",
    [ColorLevel.Ansi256]: "Rgb256",
    [ColorLevel.Rgb]: "TrueColor"
};

const styles: { [key: string]: { style: CsiStyle, start: string, end: string } } = {
    "bold": { style: bold, start: "\x1b[1m", end: "\x1b[22m" },
    "dim": { style: dim, start: "\x1b[2m", end: "\x1b[22m" },
    "normal": { style: normal, start: "\x1b[22m", end: "\x1b[22m" },
    "italic": { style: italic, start: "\x1b[3m", end: "\x1b[23m" },
    "underline": { style: underline, start: "\x1b[4m", end: "\x1b[24m" },
    "blink": { style: blink, start: "\x1b[5m", end: "\x1b[25m" },
    "inverse": { style: inverse, start: "\x1b[7m", end: "\x1b[27m" },
    "hidden": { style: hidden, start: "\x1b[8m", end: "\x1b[28m" },
    "strikethrough": { style: strikethrough, start: "\x1b[9m", end: "\x1b[29m" },
    "framed": { style: framed, start: "\x1b[51m", end: "\x1b[54m" },
    "encircled": { style: encircled, start: "\x1b[52m", end: "\x1b[0m" },
    "overlined": { style: overlined, start: "\x1b[53m", end: "\x1b[55m" }
};

function _format(value: string) {
    // eslint-disable-next-line no-control-regex
    return value.replace(/\x1b/g, "\\x1b");
}

function _convert(value: string) {
    // eslint-disable-next-line no-control-regex
    return value.replace(/\x1b\[/g, "\x9b");
}

describe("Text Styles", () => {

    describe("basic style tests", () => {
        describe("Simple styles", () => {
            it("Reset style", () => {
                assert.equals(reset("Hello"), "\x1b[0mHello\x1b[0m", _format(reset("Hello")));
            });

            it("Bold style", () => {
                assert.equals(bold("Hello"), "\x1b[1mHello\x1b[22m", _format(bold("Hello")));
            });
        });

        for (let level = ColorLevel.None as number; level <= (ColorLevel.Rgb as number); level++) {
            describe("With ColorLevel:" + colorNames[level], () => {

                beforeEach(() => {
                    setColorLevel(level);
                });

                afterEach(() => {
                    setColorLevel(ColorLevel.AutoDetect);
                });

                for (const styleName in styles) {
                    const { style, start, end } = styles[styleName];
                    if (level !== ColorLevel.None) {
                        
                        it(`Should return a ${style(styleName)} string`, () => {
                            assert.equals(style("Hello"), start + "Hello" + end, _format(style("Hello")));
                            assert.notEquals(style("Hello"), end);
                            assert.notEquals(style("Hello"), "");
                            assert.notEquals(style("Hello"), "Hello");

                            // The converted string should be the same as the style function
                            assert.equals(asString(style).length, start.length);

                            // The "function" should take a single argument
                            assert.isFunction(style);
                            assert.equals(style.length, 1);
                            assert.equals(style, start, "The function should be convertible to the start sequence");

                            // Check implicit conversions
                            assert.equals("" + style, start);
                            if (start !== end) {
                                // Special case for normal which has same start and end
                                assert.notEquals("" + style, end, _format("" + style));
                            }
                            assert.notEquals("" + style, "");

                            // Check explicit conversions
                            assert.equals(style.toString(), start);
                            if (start !== end) {
                                // Special case for normal which has same start and end
                                assert.notEquals(style.toString(), end);
                            }
                            assert.notEquals(style.toString(), "");

                            // Check asString conversions (should be same as toString)
                            assert.equals(asString(style), start);
                            if (start === end) {
                                // Special case for normal which has same start and end
                                assert.equals(asString(style), end, _format(asString(style)));
                            } else {
                                assert.notEquals(asString(style), "");
                                assert.notEquals(asString(style), end);
                            }
                        });

                        it ("should handle nested styles with " + styleName, () => {
                            const nested = bold(style("Hello " + dim("World")));
                            if (style === bold) {
                                // bold(bold(dim())) - duplicate bold removed, dim ends then bold ends
                                assert.equals(nested, start + "Hello " + "\x1b[2mWorld\x1b[22m", _format(nested));
                            } else if (style === dim) {
                                // bold(dim(dim())) - outer bold, nested dim, re-enable bold would be immediately disabled so removed
                                assert.equals(nested, "\x1b[1m" + start + "Hello " + "\x1b[2mWorld\x1b[22m", _format(nested));
                            } else if (style === encircled) {
                                // bold(encircled(dim())) - encircled ends with \x1b[0m (full reset), so \x1b[1m restore removed since immediately followed by \x1b[22m
                                assert.equals(nested, "\x1b[1m" + start + "Hello " + "\x1b[2mWorld" + end + "\x1b[22m", _format(nested));
                            } else if (style === normal) {
                                // Special case: Automatic restore of normal intensity is problematic here as normal ends with \x1b[22m which also ends bold
                                // bold(normal(dim())) - as normal ends with \x1b[22m which also ends bold, the explicit setting of normal is ignored for ANSI operations
                                assert.equals(nested, "\x1b[1mHello " + "\x1b[2mWorld\x1b[22m", _format(nested));
                            } else {
                                // bold(style(dim())) - bold, style, dim, restore bold, end style, end bold
                                assert.equals(nested, "\x1b[1m" + start + "Hello " + "\x1b[2mWorld\x1b[1m" + end + "\x1b[22m", _format(nested));
                            }
                        });

                        it("should handle styles with colors with " + styleName, () => {
                            const nested = style("Hello " + red("World"));
                            if (style === encircled) {
                                // encircled ends with \x1b[0m (full reset) so \x1b[39m is removed by optimizer
                                assert.equals(nested, start + "Hello " + "\x1b[31mWorld" + end, _format(nested));
                            } else {
                                assert.equals(nested, start + "Hello " + "\x1b[31mWorld\x1b[39m" + end, _format(nested));
                            }
                        });

                        it("should handle multiple nested styles and colors with " + styleName, () => {
                            const nested = style("Hello " + bold("World " + red("!")));
                            if (style === bold) {
                                // bold(bold(red())) - duplicate bold removed, only one bold end
                                assert.equals(nested, start + "Hello " + "\x1b[1mWorld " + "\x1b[31m!\x1b[39m\x1b[22m", _format(nested));
                            } else if (style === dim) {
                                // dim(bold(red())) - dim and bold share same reset code \x1b[22m, so only one at end
                                assert.equals(nested, start + "Hello " + "\x1b[1mWorld " + "\x1b[31m!\x1b[39m\x1b[22m", _format(nested));
                            } else if (style === encircled) {
                                // encircled(bold(red())) - encircled ends with \x1b[0m (full reset) so \x1b[39m and \x1b[22m removed by optimizer
                                assert.equals(nested, start + "Hello " + "\x1b[1mWorld " + "\x1b[31m!" + end, _format(nested));
                            } else if (style === normal) {
                                // Special case: Automatic restore of normal intensity is problematic here as normal ends with \x1b[22m which also ends bold
                                // normal(bold(red())) - as normal ends with \x1b[22m which also ends bold, the expliciting setting of normal is ignored for ANSI operations
                                assert.equals(nested, start + "Hello " + "\x1b[1mWorld " + "\x1b[31m!\x1b[39m" + end, _format(nested));
                            } else {
                                // style(bold(red())) - style starts, bold starts, red for !, red ends, bold ends, style ends
                                assert.equals(nested, start + "Hello " + "\x1b[1mWorld " + "\x1b[31m!\x1b[39m\x1b[22m" + end, _format(nested));
                            }
                        });

                    } else {
                        it(`Should not return styled ${styleName} string`, () => {
                            assert.equals(style.toString(), "", _format(style.toString()));
                            assert.notEquals(style.toString(), start);
                            assert.notEquals(style.toString(), end);

                            assert.equals(asString(style), "");
                            assert.notEquals(asString(style), start);
                            assert.notEquals(asString(style), end);

                            assert.equals(style("Hello"), "Hello", _format(style("Hello")));
                            assert.notEquals(style("Hello"), start + "Hello" + end);
                            assert.notEquals(style("Hello"), end);
                            assert.notEquals(style("Hello"), "");

                            // The converted string should be the same as the style function
                            assert.equals(asString(style).length, 0);

                            // The "function" should take a single argument
                            assert.equals(style.length, 1);

                            assert.equals(style, "");
                            assert.notEquals(asString(style), start);
                            assert.notEquals(asString(style), end);
                            assert.isFunction(style);
                        });

                        it ("should handle nested styles with " + styleName, () => {
                            const nested = bold(style("Hello " + dim("World")));
                            assert.equals(nested, "Hello World");
                        });

                        it("should handle styles with colors with " + styleName, () => {
                            const nested = style("Hello " + red("World"));
                            assert.equals(nested, "Hello World");
                        });
                    }
                }
            });
        }
    });

    describe("reset style tests", () => {
        
        for (let level = ColorLevel.None as number; level <= (ColorLevel.Rgb as number); level++) {
            describe("With ColorLevel:" + colorNames[level], () => {

                beforeEach(() => {
                    setColorLevel(level);
                });

                afterEach(() => {
                    setColorLevel(ColorLevel.AutoDetect);
                });

                if (level !== ColorLevel.None) {
                    
                    it("Should return a reset string", () => {
                        assert.equals(reset("Hello"), "\x1b[0mHello\x1b[0m", _format(reset("Hello")));
                        assert.equals(asString(reset).length, "\x1b[0m".length);
                        assert.isFunction(reset);
                        assert.equals(reset.length, 1);
                        assert.equals(reset, "\x1b[0m");
                        assert.equals(reset.toString(), "\x1b[0m");
                        assert.equals(asString(reset), "\x1b[0m");
                    });

                    it("should reset all styles", () => {
                        const nested = bold(red("Hello " + reset("World")));
                        // reset clears all, then restores bold+red for "World", then outer reset clears again, then restores bold+red again but immediately disabled
                        assert.equals(nested, "\x1b[1m\x1b[31mHello \x1b[0m\x1b[1m\x1b[31mWorld\x1b[0m\x1b[1m\x1b[39m\x1b[22m", _format(nested));
                    });

                } else {
                    it("Should not return reset string", () => {
                        assert.equals(reset.toString(), "");
                        assert.equals(asString(reset), "");
                        assert.equals(reset("Hello"), "Hello");
                        assert.equals(asString(reset).length, 0);
                        assert.equals(reset.length, 1);
                        assert.equals(reset, "");
                        assert.isFunction(reset);
                    });

                    it("should handle reset with styles disabled", () => {
                        const nested = bold(red("Hello " + reset("World")));
                        assert.equals(nested, "Hello World");
                    });
                }
            });
        }
    });

    describe("combining multiple styles", () => {
        
        for (let level = ColorLevel.None as number; level <= (ColorLevel.Rgb as number); level++) {
            describe("With ColorLevel:" + colorNames[level], () => {

                beforeEach(() => {
                    setColorLevel(level);
                });

                afterEach(() => {
                    setColorLevel(ColorLevel.AutoDetect);
                });

                if (level !== ColorLevel.None) {
                    
                    it("should combine bold and underline", () => {
                        const nested = bold(underline("Hello"));
                        assert.equals(nested, "\x1b[1m\x1b[4mHello\x1b[24m\x1b[22m", _format(nested));
                    });

                    it("should combine italic and strikethrough", () => {
                        const nested = italic(strikethrough("Hello"));
                        assert.equals(nested, "\x1b[3m\x1b[9mHello\x1b[29m\x1b[23m", _format(nested));
                    });

                    it("should combine bold, italic and underline", () => {
                        const nested = bold(italic(underline("Hello")));
                        assert.equals(nested, "\x1b[1m\x1b[3m\x1b[4mHello\x1b[24m\x1b[23m\x1b[22m", _format(nested));
                    });

                    it("should combine styles with colors", () => {
                        const nested = bold(red(underline("Hello")));
                        assert.equals(nested, "\x1b[1m\x1b[31m\x1b[4mHello\x1b[24m\x1b[39m\x1b[22m", _format(nested));
                    });

                    it("should handle complex nesting of styles and colors", () => {
                        const nested = bold("Start " + red(underline("Middle " + italic("End"))));
                        // bold > red > underline > italic - italic ends (\x1b[23m) kept, underline ends
                        assert.equals(nested, "\x1b[1mStart \x1b[31m\x1b[4mMiddle \x1b[3mEnd\x1b[23m\x1b[24m\x1b[39m\x1b[22m", _format(nested));
                    });

                    it("should handle non-overlapping styles", () => {
                        const nested = bold("Hello ") + italic("World");
                        assert.equals(nested, "\x1b[1mHello \x1b[22m\x1b[3mWorld\x1b[23m", _format(nested));
                    });

                    it("should handle mixed overlapping and non-overlapping styles", () => {
                        const nested = bold("Hello " + underline("Beautiful ") + "World");
                        // bold > underline ends > restore bold would be immediately disabled at end, so removed
                        assert.equals(nested, "\x1b[1mHello \x1b[4mBeautiful \x1b[24mWorld\x1b[22m", _format(nested));
                    });

                } else {
                    it("should not apply styles when disabled", () => {
                        const nested = bold(underline("Hello"));
                        assert.equals(nested, "Hello");

                        const nested2 = italic(strikethrough("Hello"));
                        assert.equals(nested2, "Hello");

                        const nested3 = bold(italic(underline("Hello")));
                        assert.equals(nested3, "Hello");
                    });
                }
            });
        }
    });

    describe("styles with FE (C1 controls) sequences", () => {
        
        for (let level = ColorLevel.None as number; level <= (ColorLevel.Rgb as number); level++) {
            describe("With ColorLevel:" + colorNames[level], () => {

                beforeEach(() => {
                    setColorLevel(level);
                });

                afterEach(() => {
                    setColorLevel(ColorLevel.AutoDetect);
                });

                if (level !== ColorLevel.None) {
                    
                    it("should handle FE sequences in nested styles", () => {
                        const feEmbedded = _convert(dim("Darkness"));
                        assert.equals(feEmbedded, "\x9b2mDarkness\x9b22m", _format(feEmbedded));
                        const feNested = bold("Hello " + feEmbedded);
                        // FE dim with \x9b22m stays, bold adds its own \x1b[22m at end
                        assert.equals(feNested, "\x1b[1mHello \x9b2mDarkness\x9b22m\x1b[22m", _format(feNested));
                    });

                    it("should handle FE sequences with colors", () => {
                        const feEmbedded = _convert(red("World"));
                        assert.equals(feEmbedded, "\x9b31mWorld\x9b39m", _format(feEmbedded));
                        const feNested = bold("Hello " + feEmbedded);
                        assert.equals(feNested, "\x1b[1mHello \x9b31mWorld\x9b39m\x1b[22m", _format(feNested));
                    });

                    it("should handle multiple FE sequences", () => {
                        const feEmbedded = _convert(red("Darkness " + green("My Old Friend")));
                        assert.equals(feEmbedded, "\x9b31mDarkness \x9b32mMy Old Friend\x9b39m", _format(feEmbedded));
                        const feNested = bold("Hello " + feEmbedded);
                        assert.equals(feNested, "\x1b[1mHello \x9b31mDarkness \x9b32mMy Old Friend\x9b39m\x1b[22m", _format(feNested));
                    });

                } else {
                    it("should not apply FE sequences when disabled", () => {
                        const feEmbedded = _convert(dim("Darkness"));
                        const feNested = bold("Hello " + feEmbedded);
                        assert.equals(feNested, "Hello Darkness");
                    });
                }
            });
        }
    });
});
