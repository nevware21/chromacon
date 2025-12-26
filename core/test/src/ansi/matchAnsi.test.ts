/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { matchAnsi } from "../../../src/ansi/matchAnsi";

describe("parseAnsi", () => {
    it("should return an empty array for a string without ANSI codes", () => {
        const result = matchAnsi("Hello, World!");
        assert.isArray(result);
        assert.equal(result.length, 0);
        assert.isEmpty(result);
    });

    it("should return an array of ANSI codes for a string with ANSI codes", () => {
        const result = matchAnsi("\x1b[31mHello\x1b[0m");
        assert.isArray(result);
        assert.equal(result.length, 2);
        assert.includes(result, "\x1b[31m");
        assert.includes(result, "\x1b[0m");
        assert.equal(result[0], "\x1b[31m");
        assert.equal(result[1], "\x1b[0m");
    });

    it("should return an empty array for an empty string", () => {
        const result = matchAnsi("");
        assert.isArray(result);
        assert.equal(result.length, 0);
        assert.isEmpty(result);
    });

    it("should return an empty array for a null value", () => {
        const result = matchAnsi(null as any);
        assert.isArray(result);
        assert.equal(result.length, 0);
        assert.isEmpty(result);
    });

    it("should return an empty array for an undefined value", () => {
        const result = matchAnsi(undefined as any);
        assert.isArray(result);
        assert.equal(result.length, 0);
        assert.isEmpty(result);
    });

    it("should return an array of multiple ANSI codes in a string", () => {
        const result = matchAnsi("\x1b[31mHello\x1b[0m \x1b[32mWorld\x1b[0m");
        assert.isArray(result);
        assert.equal(result.length, 4);
        assert.includes(result, "\x1b[31m");
        assert.includes(result, "\x1b[0m");
        assert.includes(result, "\x1b[32m");
        assert.includes(result, "\x1b[0m");
        assert.equal(result[0], "\x1b[31m");
        assert.equal(result[1], "\x1b[0m");
        assert.equal(result[2], "\x1b[32m");
        assert.equal(result[3], "\x1b[0m");
    });
});