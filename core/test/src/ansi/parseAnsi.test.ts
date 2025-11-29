/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { parseAnsi } from "../../../src/ansi/stripAnsi";

describe("parseAnsi", () => {
    it("should return an empty array for a string without ANSI codes", () => {
        const result = parseAnsi("Hello Darkness, my old friend.");
        assert.isArray(result);
        assert.equal(result.length, 1);
        assert.equal(result[0], "Hello Darkness, my old friend.");
    });

    it("should return an array of ANSI codes for a string with ANSI codes", () => {
        const result = parseAnsi("\x1b[31mHello\x1b[0m");
        assert.isArray(result);
        assert.equal(result.length, 3);
        assert.equal(result[0], "\x1b[31m");
        assert.equal(result[1], "Hello");
        assert.equal(result[2], "\x1b[0m");
    });

    it("should return an empty array for an empty string", () => {
        const result = parseAnsi("");
        assert.isArray(result);
        assert.equal(result.length, 0);
    });

    it("should return an empty array for a null value", () => {
        const result = parseAnsi(null as any);
        assert.isArray(result);
        assert.equal(result.length, 0);
    });

    it("should return an empty array for an undefined value", () => {
        const result = parseAnsi(undefined as any);
        assert.isArray(result);
        assert.equal(result.length, 0);
    });

    it("should return an array of multiple ANSI codes in a string", () => {
        const result = parseAnsi("\x1b[31mHello\x1b[0m \x1b[32mDarkness\x1b[0m");
        assert.isArray(result);
        assert.equal(result.length, 7);
        assert.equal(result[0], "\x1b[31m");
        assert.equal(result[1], "Hello");
        assert.equal(result[2], "\x1b[0m");
        assert.equal(result[3], " ");
        assert.equal(result[4], "\x1b[32m");
        assert.equal(result[5], "Darkness");
        assert.equal(result[6], "\x1b[0m");
    });

    it("should return an array of ANSI codes for a string with ANSI codes and text", () => {
        const result = parseAnsi("Hello \x1b[31mDarkness\x1b[0m");
        assert.isArray(result);
        assert.equal(result.length, 4);
        assert.equal(result[0], "Hello ");
        assert.equal(result[1], "\x1b[31m");
        assert.equal(result[2], "Darkness");
        assert.equal(result[3], "\x1b[0m");
    });
});
