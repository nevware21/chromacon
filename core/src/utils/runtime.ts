/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { getInst, ICachedValue, safe, strLower, strStartsWith, strSubstring, strTrim } from "@nevware21/ts-utils";
import { ColorLevel } from "../enums/ColorLevel";
import { _debugLog } from "./debug";
import { _lazyGetValue } from "../internal/lazyGetValue";

interface IRuntimeProc {
    env?: NodeJS.ProcessEnv;
    stdout?: NodeJS.WriteStream;

    // NodeJS specific
    argv?: string[];
    platform?: string;

    // Deno specific
    args?: string[];
    build?: { os: string };
    osRelease?(): string;           // Also reused for mock testing
}

export let runtimeProc:ICachedValue<IRuntimeProc> = (/*#__PURE__*/_lazyGetValue(getRuntimeProc, {} as IRuntimeProc));
export let runtimeArgs:ICachedValue<string[]> = (/*#__PURE__*/_lazyGetValue(getRuntimeArgv, []));

function getRuntimeProc(): IRuntimeProc {
    return getInst<IRuntimeProc>("Deno") as IRuntimeProc || process as IRuntimeProc;
}

function getRuntimeArgv(): string[] {
    return runtimeProc.v.argv || runtimeProc.v.args || [];
}

/**
 * Manually set the color detector function to use for detecting the color level.
 * If the function is not provided, the default automatic detection will be used.
 * @param detectFn - The function to use for detecting the color level
 */
export function _resetRuntime(): void {
    runtimeProc = _lazyGetValue(getRuntimeProc, {} as IRuntimeProc);
    runtimeArgs = _lazyGetValue(getRuntimeArgv, []);
}

export function getNodeOsVer(): string | undefined {
    let result:string | undefined;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let os = require("os");
    if (os && os.release) {
        result = os.release() || "";
    }

    return result;
}

/*#__NO_SIDE_EFFECTS__*/
export function getWindowsOsVer(): string | undefined {
    let result:string | undefined;
    let r = runtimeProc.v;
    _debugLog("getWindowsOsVer: " + r.platform);

    safe(() => {
        if (r.platform === "win32" || r.build && r.build.os === "windows") {
            result = r.osRelease ? r.osRelease() : getNodeOsVer();
        }
    });

    return result;
}

/*#__NO_SIDE_EFFECTS__*/
function parseLevel(value: string, defValue: ColorLevel | undefined): ColorLevel | undefined {
    let result:ColorLevel | undefined = defValue;

    if (value) {
        value = strLower(strTrim(value));
        if (value === "false" || value === "never" || value === "none") {
            result = ColorLevel.None;
        } else if (value === "true" || value === "basic" || value === "ansi" || value === "ansi16" || value === "always") {
            result = ColorLevel.Basic;
        } else if (value === "16m" || value === "truecolor" || value === "full") {
            result = ColorLevel.Rgb;
        } else if (value === "8bit" || value === "ansi256") {
            result = ColorLevel.Ansi256;
        } else if (value && /^\d+$/.test(value)) {
            // Parsed as a number
            let num = value ? parseInt(value, 10) : ColorLevel.Basic;
            result = ColorLevel.Basic;
            if (num === ColorLevel.Rgb || num === ColorLevel.Ansi256 || num === ColorLevel.Basic || num === ColorLevel.None) {
                result = num;
            } else if (num > 256) {
                result = ColorLevel.Rgb;
            } else if (num > 16) {
                result = ColorLevel.Ansi256;
            }
        }
    }

    return result;
}

/*#__NO_SIDE_EFFECTS__*/
export function parseArgFlag(flag: string, defValue: ColorLevel): ColorLevel | undefined {
    let result:ColorLevel | undefined;
    
    for (let lp = 0; lp < runtimeArgs.v.length; lp++) {
        let arg = runtimeArgs.v[lp];
        if (arg) {
            if (arg === "--") {
                break;
            }

            if (arg === "--" + flag) {
                result = defValue;
                break;
            } else if (strStartsWith(arg, "--" + flag + "=")) {
                result = parseLevel(strSubstring(arg, flag.length + 3), ColorLevel.Basic);
                break;
            }
        }
    }

    return result;
}

/*#__NO_SIDE_EFFECTS__*/
export function parseEnvFlag(flag: string, defValue: ColorLevel | undefined): ColorLevel | undefined {
    let result:ColorLevel | undefined;
    let r = runtimeProc.v;
    let env = r.env || {} as NodeJS.ProcessEnv;
    if (flag in env) {
        result = parseLevel(env[flag], defValue);
    }

    return result;
}

