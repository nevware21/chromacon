/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2024 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { arrForEach, createCachedValue, getInst, ILazyValue, mathMin, objKeys, safe, safeGetLazy, strLower, strSplit, strStartsWith, strSubstring, strTrim } from "@nevware21/ts-utils";
import { ColorLevel } from "../enums/ColorLevel";

function _debugLog(msg: string): void {
    //#if DEBUG
    console.log(msg);
    //#endif
}

interface RuntimeProc {
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

const CI_COLORS = {
    [ColorLevel.TrueColor]: [ "GITHUB_ACTIONS", "GITEA_ACTIONS"],
    [ColorLevel.Rgb256]: [ "TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE" ]
};

function getRuntimeProc(): RuntimeProc {
    return getInst<RuntimeProc>("Deno") as RuntimeProc || process as RuntimeProc;
}

function getRuntimeArgv(): string[] {
    return runtimeProc.v.argv || runtimeProc.v.args || [];
}

let runtimeProc:ILazyValue<RuntimeProc> = (/*#__PURE__*/safeGetLazy(getRuntimeProc, {} as RuntimeProc));
let runtimeArgs:ILazyValue<string[]> = (/*#__PURE__*/safeGetLazy(getRuntimeArgv, []));

function getNodeOsVer(): string | undefined {
    let result:string | undefined;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let os = require("os");
    if (os && os.release) {
        result = os.release() || "";
    }

    return result;
}

/*#__NO_SIDE_EFFECTS__*/
function getWindowsOsVer(): string | undefined {
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
            result = ColorLevel.TrueColor;
        } else if (value === "8bit" || value === "ansi256") {
            result = ColorLevel.Rgb256;
        } else if (value && /^\d+$/.test(value)) {
            // Parsed as a number
            let num = value ? parseInt(value, 10) : ColorLevel.Basic;
            result = ColorLevel.Basic;
            if (num === ColorLevel.TrueColor || num === ColorLevel.Rgb256 || num === ColorLevel.Basic || num === ColorLevel.None) {
                result = num;
            } else if (num > 256) {
                result = ColorLevel.TrueColor;
            } else if (num > 16) {
                result = ColorLevel.Rgb256;
            }
        }
    }

    return result;
}

/*#__NO_SIDE_EFFECTS__*/
function parseArgFlag(flag: string, defValue: ColorLevel): ColorLevel | undefined {
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
function parseEnvFlag(flag: string, defValue: ColorLevel | undefined): ColorLevel | undefined {
    let result:ColorLevel | undefined;
    let r = runtimeProc.v;
    let env = r.env || {} as NodeJS.ProcessEnv;
    if (flag in env) {
        result = parseLevel(env[flag], defValue);
    }

    return result;
}

/*#__NO_SIDE_EFFECTS__*/
export function detectColorSupport(): ColorLevel {
    _debugLog("detectColorSupport");
    let r = runtimeProc.v;
    let colorLevel: ColorLevel | undefined;

    try {
        let nav = getInst<any>("navigator");
        if (nav) {
            _debugLog("detectColorSupport: navigator");
            let ua = nav.userAgent || "";
            if (ua) {
                _debugLog(" -- ua:" + ua);
                if (/\b(Chrome|Chromium)\//.test(ua)) {
                    // Chrome browser
                    colorLevel = ColorLevel.Basic;
                }
    
                if (nav.userAgentData) {
                    let brands = nav.userAgentData.brands;
                    if (brands) {
                        arrForEach(brands, (brand: any) => {
                            if (brand.brand === "Chromium" && brand.version > 93) {
                                // Chromium based browser
                                colorLevel = ColorLevel.TrueColor;
                                return -1;
                            }
                        });
                    }
                }
    
                if (colorLevel) {
                    return colorLevel;
                }
            }
        }
    
        // Force Color overrides all other settings
        colorLevel = parseEnvFlag("FORCE_COLOR", ColorLevel.Basic);
    
        // Check if forced
        if (colorLevel !== undefined) {
            // Forced
            return colorLevel;
        }
    
        colorLevel = parseArgFlag("color", ColorLevel.Basic) || parseArgFlag("colors", ColorLevel.Basic);
        let isDisabled = colorLevel === ColorLevel.None || (parseArgFlag("no-color", ColorLevel.None) || parseArgFlag("no-colors", ColorLevel.None)) === ColorLevel.None;
        if (isDisabled) {
            // Explicitly Disabled
            return ColorLevel.None;
        }
    
        // No Arguments or Environment variables set the level
        let env = r.env || {} as NodeJS.ProcessEnv;
        if ("TF_BUILD" in env && "AGENT_NAME" in env) {
            // DevOps Environment
            return ColorLevel.Basic;
        }
    
        let term = env.TERM || "";
        if (term === "dumb") {
            // Dumb Terminal
            return colorLevel || ColorLevel.None;
        }
    
        if ("CI" in env) {
            // CI Environment
            let keys = objKeys(CI_COLORS);
            for (let lp = 0; lp < keys.length; lp++) {
                let color = keys[lp] as unknown as keyof typeof CI_COLORS;
                let values = CI_COLORS[color];
                for (let lp2 = 0; lp2 < values.length; lp2++) {
                    if (values[lp2] in env) {
                        return color;
                    }
                }
            }
    
            if (env.CI_NAME === "codeship") {
                return ColorLevel.Basic;
            }
    
            return colorLevel || ColorLevel.None;
        }

        let winOsVersion = getWindowsOsVer();
        if (winOsVersion) {
            colorLevel = ColorLevel.Basic;

            // Windows 10 build 10586 is the first Windows release that supports 256 colors.
            // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
            const osVer = strSplit(winOsVersion, ".");
            if (osVer.length >= 2 && parseInt(osVer[0], 10) >= 10) {
                let build = parseInt(osVer[2], 10);
                if (build >= 14931) {
                    colorLevel =  ColorLevel.TrueColor;
                } else if (build >= 10586) {
                    colorLevel =  ColorLevel.Rgb256;
                }
            }
        }
    
        let teamCity = env.TEAMCITY_VERSION || "";
        if (teamCity) {
            return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(teamCity) ? ColorLevel.Basic : ColorLevel.None;
        }
    
        if (env.COLORTERM === "truecolor" || env.COLORTERM === "24bit") {
            return ColorLevel.TrueColor;
        }
    
        if (term === "xterm-kitty") {
            return ColorLevel.TrueColor;
        }
    
        let termProgram = env.TERM_PROGRAM || "";
        if (termProgram === "Apple_Terminal") {
            return ColorLevel.Basic;
        } else if (termProgram === "iTerm.app") {
            const termVer = parseInt(strSplit(env.TERM_PROGRAM_VERSION || "", ".")[0], 10);
            if (termVer >= 3) {
                return ColorLevel.TrueColor;
            }
    
            return ColorLevel.Rgb256;
        }
    
        if (/-256(color)?$/i.test(term)) {
            return ColorLevel.Rgb256;
        }
    
        if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(term) || env.COLORTERM) {
            return ColorLevel.Basic;
        }
    } catch (e) {
        //#if DEBUG
        _debugLog("detectColorSupport failed: " + e);
        //#endif
    }
    
    return colorLevel || ColorLevel.None;
}

/**
 * Check if the terminal supports at least 16 colors.
 */
let colorLevel:ILazyValue<ColorLevel> = (/*#__PURE__*/safeGetLazy(detectColorSupport, ColorLevel.None));

/**
 * Manually set the color detector function to use for detecting the color level.
 * If the function is not provided, the default automatic detection will be used.
 * @param detectFn - The function to use for detecting the color level
 */
export function setColorDetector(detectFn: () => ColorLevel): void {
    runtimeProc = safeGetLazy(getRuntimeProc, {} as RuntimeProc);
    runtimeArgs = safeGetLazy(getRuntimeArgv, []);
    colorLevel = safeGetLazy(detectFn || detectColorSupport, ColorLevel.None);
}

/**
 * Manually set the current color level, overriding the automatic detection.
 * if the level is not provided, the automatic detection will be used, resetting any
 * manual or previously detected level.
 *
 * @param level The color level to set
 */
export function setColorLevel(level?: ColorLevel): void {
    if (level === undefined) {
        // reset to auto-detect
        runtimeProc = safeGetLazy(getRuntimeProc, {} as RuntimeProc);
        runtimeArgs = safeGetLazy(getRuntimeArgv, []);
        colorLevel = safeGetLazy(detectColorSupport, ColorLevel.None);
    } else {
        colorLevel = createCachedValue(level);
    }
}

/**
 * Returns the current maximum color level supported by the terminal.
 * @returns The current color level supported by the terminal
 */
/*#__NO_SIDE_EFFECTS__*/
export function getColorLevel(): ColorLevel {
    return colorLevel.v;
}

/**
 * Returns true if the terminal supports at least 16 colors, but may support more.
 * @returns True if the terminal supports at least 16 colors
 */
/*#__NO_SIDE_EFFECTS__*/
export function isColorSupported(): boolean {
    return colorLevel.v !== ColorLevel.None;
}

/**
 * Returns true if the terminal supports at least 256 colors, but may support more.
 * @returns True if the terminal supports 256 colors
 */
/*#__NO_SIDE_EFFECTS__*/
export function isRgb256ColorSupported(): boolean {
    return colorLevel.v === ColorLevel.Rgb256 || colorLevel.v === ColorLevel.TrueColor;
}

/**
 * Returns true if the terminal supports true color (24-bit).
 * @returns True if the terminal supports true color
 */
/*#__NO_SIDE_EFFECTS__*/
export function isTrueColorSupported(): boolean {
    return colorLevel.v === ColorLevel.TrueColor;
}
