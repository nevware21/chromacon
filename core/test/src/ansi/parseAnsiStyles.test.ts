/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { parseAnsiStyles, createAnsiStyleParser } from "../../../src/ansi/parseAnsiStyles";
import { ansi256ToRgb, ansiColorToCss } from "../../../src/ansi/ansiColors";
import { getSgrName } from "../../../src/ansi/sgrCodes";
import { ansiToHtml } from "../../../src/ansi/ansiToHtml";

describe("parseAnsiStyles", () => {
    const b = (i: number) => ({ type: "basic", index: i });

    it("plain and resets", () => {
        assert.deepEqual(parseAnsiStyles("plain"), [{ text: "plain", style: {} }]);
        assert.deepEqual(parseAnsiStyles("\x1b[1;31mFAIL\x1b[22m still red\x1b[0m plain"), [
            { text: "FAIL", style: { bold: true, fg: b(1) } },
            { text: " still red", style: { fg: b(1) } },
            { text: " plain", style: {} }
        ]);
    });

    it("extended colors", () => {
        assert.deepEqual(parseAnsiStyles("\x1b[38;5;9mx"), [{ text: "x", style: { fg: b(9) } }]);
        assert.deepEqual(parseAnsiStyles("\x1b[38;5;208mx\x1b[48;5;244my"), [
            { text: "x", style: { fg: { type: "ansi256", index: 208 } } },
            { text: "y", style: { fg: { type: "ansi256", index: 208 }, bg: { type: "ansi256", index: 244 } } }
        ]);
        assert.deepEqual(parseAnsiStyles("\x1b[38:2::10:20:30mx"), [{ text: "x", style: { fg: { type: "rgb", r: 10, g: 20, b: 30 } } }]);
        assert.deepEqual(parseAnsiStyles("\x1b[38;2;10;20;30mx")[0].style, { fg: { type: "rgb", r: 10, g: 20, b: 30 } });
        assert.deepEqual(parseAnsiStyles("\x1b[32m\x1b[38;5mx"), [{ text: "x", style: { fg: b(2) } }]);
        assert.deepEqual(parseAnsiStyles("\x1b[38;2;300;0;0mx"), [{ text: "x", style: {} }]);
    });

    it("other sequences", () => {
        assert.deepEqual(parseAnsiStyles("\x1b[2K\x1b[1G\x1b[?25lline"), [{ text: "line", style: {} }]);
        assert.deepEqual(parseAnsiStyles("\x9b31mx"), [{ text: "x", style: { fg: b(1) } }]);
        assert.deepEqual(parseAnsiStyles("see \x1b]8;;https://x.test\x07docs\x1b]8;;\x07 now"), [
            { text: "see ", style: {} },
            { text: "docs", style: { link: "https://x.test" } },
            { text: " now", style: {} }
        ]);
    });

    it("merging and state", () => {
        assert.deepEqual(parseAnsiStyles("\x1b[31mone \x1b[31mtwo"), [{ text: "one two", style: { fg: b(1) } }]);
        assert.deepEqual(parseAnsiStyles("b", { fg: b(1) } as any), [{ text: "b", style: { fg: b(1) } }]);
        const p = createAnsiStyleParser();
        p.push("\x1b[31ma");
        assert.deepEqual(p.push("b"), [{ text: "b", style: { fg: b(1) } }]);
    });

    it("helpers", () => {
        assert.deepEqual(ansi256ToRgb(208), { r: 255, g: 135, b: 0 });
        assert.deepEqual(ansi256ToRgb(244), { r: 128, g: 128, b: 128 });
        assert.equal(ansiColorToCss({ type: "rgb", r: 1, g: 2, b: 3 }), "rgb(1, 2, 3)");
        assert.equal(getSgrName(1), "bold");
        assert.equal(getSgrName(31), "fgRed");
        assert.equal(getSgrName(999), undefined);
    });

    it("ansiToHtml", () => {
        assert.equal(ansiToHtml("\x1b[1;31m<a>\x1b[0m"), "<span class=\"ansi-bold ansi-fg-1\">&lt;a&gt;</span>");
        assert.equal(ansiToHtml("\x1b]8;;https://x.test\x07d\x1b]8;;\x07"), "<a href=\"https://x.test\" rel=\"noopener noreferrer\">d</a>");
    });
});
