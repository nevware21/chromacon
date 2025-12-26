/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { assert, expect } from "@nevware21/tripwire";
import { replaceAnsi } from "../../../src/ansi/stripAnsi";

describe("replaceAnsi", () => {

    describe("exceptions", () => {
        it("should handle null", () => {
            const input: any = null;
            const expectedOutput: any = null;
            expect(replaceAnsi(input as any, "")).equal(expectedOutput);
        });
    
        it("should handle undefined", () => {
            const input: any = undefined;
            const expectedOutput: any = undefined;
            expect(replaceAnsi(input as any, "")).equal(expectedOutput);
        });
    
        it("should handle non-string values", () => {
            const input = 42;
            const expectedOutput = "42";
            expect(replaceAnsi(input as any, "")).equal(expectedOutput);
        });
    });

    describe("string replacer", () => {
        it("should replace ANSI escape codes with an empty string", () => {
            const input = "\u001b[31mHello\u001b[0m";
            const expectedOutput = "Hello";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });

        it("should replace ANSI escape codes with a custom string", () => {
            const input = "\u001b[31mHello\u001b[0m";
            const expectedOutput = "[ANSI]Hello[ANSI]";
            expect(replaceAnsi(input, "[ANSI]")).equal(expectedOutput);
        });

        it("should replace multiple ANSI escape codes", () => {
            const input = "\u001b[31mHello\u001b[0m \u001b[32mDarkness\u001b[0m";
            const expectedOutput = "XXXHelloXXX XXXDarknessXXX";
            expect(replaceAnsi(input, "XXX")).equal(expectedOutput);
        });

        it("should replace nested ANSI escape codes", () => {
            const input = "\u001b[31mHello \u001b[32mDarkness\u001b[0m\u001b[0m";
            const expectedOutput = "---Hello ---Darkness------";
            expect(replaceAnsi(input, "---")).equal(expectedOutput);
        });

        it("should return the same string if there are no ANSI escape codes", () => {
            const input = "Hello";
            const expectedOutput = "Hello";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });

        it("should handle an empty string", () => {
            const input = "";
            const expectedOutput = "";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });
    });

    describe("function replacer", () => {
        it("should replace ANSI escape codes using a function that returns empty string", () => {
            const input = "\u001b[31mHello\u001b[0m";
            const expectedOutput = "Hello";
            expect(replaceAnsi(input, () => "")).equal(expectedOutput);
        });

        it("should replace ANSI escape codes using a function that returns custom string", () => {
            const input = "\u001b[31mHello\u001b[0m";
            const expectedOutput = "[REPLACED]Hello[REPLACED]";
            expect(replaceAnsi(input, () => "[REPLACED]")).equal(expectedOutput);
        });

        it("should provide the matched substring to the replacer function", () => {
            const input = "\u001b[31mHello\u001b[0m";
            const matches: string[] = [];
            replaceAnsi(input, (match) => {
                matches.push(match);
                return "";
            });
            expect(matches.length).equal(2);
            expect(matches[0]).equal("\u001b[31m");
            expect(matches[1]).equal("\u001b[0m");
        });

        it("should allow selective replacement based on the match", () => {
            const input = "\u001b[31mRed\u001b[0m \u001b[32mGreen\u001b[0m";
            const output = replaceAnsi(input, (match) => {
                if (match === "\u001b[31m") {
                    return "[RED]";
                } else if (match === "\u001b[32m") {
                    return "[GREEN]";
                }
                return "";
            });
            expect(output).equal("[RED]Red [GREEN]Green");
        });

        it("should handle complex replacements with function logic", () => {
            const input = "\u001b[31mError\u001b[0m \u001b[32mSuccess\u001b[0m";
            const output = replaceAnsi(input, (match) => {
                if (match.includes("[31m")) {
                    return "<span class='error'>";
                } else if (match.includes("[32m")) {
                    return "<span class='success'>";
                } else if (match === "\u001b[0m") {
                    return "</span>";
                }
                return "";
            });
            expect(output).equal("<span class='error'>Error</span> <span class='success'>Success</span>");
        });

        it("should receive offset and string arguments in replacer function", () => {
            const input = "\u001b[31mHello\u001b[0m";
            let receivedOffset: number | undefined;
            let receivedString: string | undefined;
            
            replaceAnsi(input, (match, offset, string) => {
                if (receivedOffset === undefined) {
                    receivedOffset = offset;
                    receivedString = string;
                }
                return "";
            });
            
            expect(receivedOffset).equal(0);
            expect(receivedString).equal(input);
        });

        it("should handle function that returns the original match", () => {
            const input = "\u001b[31mHello\u001b[0m";
            const output = replaceAnsi(input, (match) => match);
            expect(output).equal(input);
        });
    });

    describe("various ANSI sequences", () => {
        it("should replace 256 color ANSI escape codes", () => {
            const input = "\u001b[38;5;196mHello\u001b[0m";
            const expectedOutput = "Hello";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });

        it("should replace 24-bit color ANSI escape codes", () => {
            const input = "\u001b[38;2;255;0;0mHello\u001b[0m";
            const expectedOutput = "Hello";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });

        it("should replace cursor movement ANSI escape codes", () => {
            const input = "\u001b[2JHello";
            const expectedOutput = "Hello";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });

        it("should replace \\x9b as an escape character", () => {
            const input = "\x9b31mHello\x9b0m";
            const expectedOutput = "Hello";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });

        it("should replace DEC Special Graphics ANSI escape codes", () => {
            const input = "\u001b(0Hello\u001b(B";
            const expectedOutput = "Hello";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });

        it("should replace terminal link sequences", () => {
            const input = "\u001B]8;;https://github.com\u0007click\u001B]8;;\u0007";
            const expectedOutput = "click";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });

        it("should replace complex color sequences", () => {
            const input = "\u001b[38;2;255;0;0mHello \u001b[0mDarkness \u001B[00;38;5;244m\u001B[m\u001B[00;38;5;33mmy \u001B[0mold";
            const expectedOutput = "Hello Darkness my old";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });
    });

    describe("edge cases", () => {
        it("should preserve emoji", () => {
            const input = "\u001b[31mHello👋Darkness\u001b[0m";
            const expectedOutput = "Hello👋Darkness";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });

        it("should preserve newlines", () => {
            const input = "\u001b[31mHello\nDarkness\u001b[0m";
            const expectedOutput = "Hello\nDarkness";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });

        it("should handle strings with only ANSI codes", () => {
            const input = "\u001b[31m\u001b[0m";
            const expectedOutput = "";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });

        it("should handle strings with ANSI codes at the beginning, middle, and end", () => {
            const input = "\u001b[31mStart\u001b[0m Middle \u001b[32mEnd\u001b[0m";
            const expectedOutput = "Start Middle End";
            expect(replaceAnsi(input, "")).equal(expectedOutput);
        });
    });

    describe("Additional variants", () => {
        it("should replace ANSI OSC sequences", () => {
            const input = "Hello\x1b]0;darkness\x07 my old friend";
            const expected = "Hello my old friend";
            assert.equal(replaceAnsi(input, ""), expected);
        });

        it("should replace ANSI DSC sequences", () => {
            const input = "Hello\x1bPdarkness\x9c my old friend";
            const expected = "Hello my old friend";
            assert.equal(replaceAnsi(input, ""), expected);
        });

        it("should replace ANSI APC sequences", () => {
            const input = "Hello\x1b_darkness\x9c my old friend";
            const expected = "Hello my old friend";
            assert.equal(replaceAnsi(input, ""), expected);
        });

        it("should replace ANSI PM sequences", () => {
            const input = "Hello\x1b^darkness\x9c my old friend";
            const expected = "Hello my old friend";
            assert.equal(replaceAnsi(input, ""), expected);
        });

        it("should replace ANSI SOS sequences", () => {
            const input = "Hello\x1bXdarkness\x9c my old friend";
            const expected = "Hello my old friend";
            assert.equal(replaceAnsi(input, ""), expected);
        });

        it("should replace with custom replacer for OSC sequences", () => {
            const input = "Hello\x1b]0;darkness\x07 my old friend";
            const expected = "Hello[OSC] my old friend";
            assert.equal(replaceAnsi(input, "[OSC]"), expected);
        });
    });

    describe("simplistic markdown replacements", () => {
        it("should convert bold ANSI codes to markdown bold", () => {
            const input = "\u001b[1mBold Text\u001b[0m";
            const output = replaceAnsi(input, (match) => {
                if (match === "\u001b[1m") {
                    return "**";
                }
                if (match === "\u001b[0m") {
                    return "**";
                }
                return "";
            });
            expect(output).equal("**Bold Text**");
        });

        it("should convert italic ANSI codes to markdown italic", () => {
            const input = "\u001b[3mItalic Text\u001b[0m";
            const output = replaceAnsi(input, (match) => {
                if (match === "\u001b[3m") {
                    return "_";
                }
                if (match === "\u001b[0m") {
                    return "_";
                }
                return "";
            });
            expect(output).equal("_Italic Text_");
        });

        it("should convert underline ANSI codes to markdown (as emphasis)", () => {
            const input = "\u001b[4mUnderlined Text\u001b[0m";
            const output = replaceAnsi(input, (match) => {
                if (match === "\u001b[4m") {
                    return "_";
                }
                if (match === "\u001b[0m") {
                    return "_";
                }
                return "";
            });
            expect(output).equal("_Underlined Text_");
        });

        it("should convert strikethrough ANSI codes to markdown strikethrough", () => {
            const input = "\u001b[9mStrikethrough Text\u001b[0m";
            const output = replaceAnsi(input, (match) => {
                if (match === "\u001b[9m") {
                    return "~~";
                }
                if (match === "\u001b[0m") {
                    return "~~";
                }
                return "";
            });
            expect(output).equal("~~Strikethrough Text~~");
        });

        it("should convert multiple formatting to markdown", () => {
            const input = "\u001b[1mBold\u001b[0m and \u001b[3mItalic\u001b[0m";
            let closeIdx = 0;
            const output = replaceAnsi(input, (match) => {
                if (match === "\u001b[1m") {
                    return "**";
                }
                if (match === "\u001b[3m") {
                    return "_";
                }
                if (match === "\u001b[0m") {
                    closeIdx++;
                    return closeIdx <= 1 ? "**" : "_";
                }
                return "";
            });
            // Note: This is simplified - real implementation would need state tracking
            expect(output).equal("**Bold** and _Italic_");
        });

        it("should convert colors to markdown (stripped)", () => {
            // In markdown, colors are typically not supported, so we just strip them
            const input = "\u001b[31mRed Text\u001b[0m";
            const output = replaceAnsi(input, "");
            expect(output).equal("Red Text");
        });

        it("should convert code block style formatting", () => {
            const input = "\u001b[7mCode Block\u001b[0m";
            const output = replaceAnsi(input, (match) => {
                if (match === "\u001b[7m") {
                    return "`";
                }
                if (match === "\u001b[0m") {
                    return "`";
                }
                return "";
            });
            expect(output).equal("`Code Block`");
        });

        it("should handle complex mixed formatting for markdown", () => {
            const input = "\u001b[1m\u001b[31mBold Red\u001b[0m\u001b[0m \u001b[3mItalic\u001b[0m";
            // Simplified conversion - just extract text with basic markdown
            const output = replaceAnsi(input, (match) => {
                if (match.includes("[1m")) {
                    return "**";
                }
                if (match.includes("[3m")) {
                    return "_";
                }
                if (match.includes("[31m")) {
                    return "";
                } // Strip color
                if (match === "\u001b[0m") {
                    return "";
                }
                return "";
            });
            // This shows the challenge of nested formatting
            assert.notEqual(output, input);
        });

        it("should create a simple markdown converter", () => {
            function toMarkdown(text: string): string {
                let inBold = false;
                let inItalic = false;
                
                return replaceAnsi(text, (match) => {
                    // Bold
                    if (match === "\u001b[1m") {
                        inBold = true;
                        return "**";
                    }
                    // Italic
                    if (match === "\u001b[3m") {
                        inItalic = true;
                        return "_";
                    }
                    // Strikethrough
                    if (match === "\u001b[9m") {
                        return "~~";
                    }
                    // Reset - close tags in reverse order
                    if (match === "\u001b[0m" || match === "\u001b[22m" || match === "\u001b[23m" || match === "\u001b[29m") {
                        if (match === "\u001b[0m") {
                            // Close all open tags
                            let result = "";
                            if (inBold) {
                                result += "**";
                                inBold = false;
                            } else if (inItalic) {
                                result += "_";
                                inItalic = false;
                            } else {
                                result += "~~";
                            }
                            return result;
                        } else if (match === "\u001b[22m") {
                            inBold = false;
                            return "**";
                        } else if (match === "\u001b[23m") {
                            inItalic = false;
                            return "_";
                        } else if (match === "\u001b[29m") {
                            return "~~";
                        }
                    }
                    
                    // Strip color codes
                    return "";
                });
            }

            const input = "\u001b[1mBold\u001b[0m \u001b[3mItalic\u001b[0m \u001b[9mStrike\u001b[0m";
            const output = toMarkdown(input);
            expect(output).equal("**Bold** _Italic_ ~~Strike~~");
        });

        it("should handle headers with markdown conversion", () => {
            const input = "\u001b[1m# Header\u001b[0m";
            const output = replaceAnsi(input, (match) => {
                if (match === "\u001b[1m") {
                    return "**";
                }
                if (match === "\u001b[0m") {
                    return "**";
                }
                return "";
            });
            expect(output).equal("**# Header**");
        });

        it("should preserve text with no formatting", () => {
            const input = "Plain text with no ANSI codes";
            const output = replaceAnsi(input, (match) => {
                if (match === "\u001b[1m") {
                    return "**";
                }
                if (match === "\u001b[0m") {
                    return "**";
                }
                return "";
            });
            expect(output).equal("Plain text with no ANSI codes");
        });
    });

    describe("integration with stripAnsi", () => {
        it("should work the same as stripAnsi when replacing with empty string", () => {
            const input = "\u001b[31mHello\u001b[0m \u001b[32mDarkness\u001b[0m";
            const withReplaceAnsi = replaceAnsi(input, "");
            // stripAnsi internally uses replaceAnsi
            expect(withReplaceAnsi).equal("Hello Darkness");
        });
    });
});
