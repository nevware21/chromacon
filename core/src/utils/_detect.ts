/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { arrForEach, getInst, objForEachKey, strSplit } from "@nevware21/ts-utils";
import { ColorLevel } from "../enums/ColorLevel";
import { getWindowsOsVer, parseArgFlag, parseEnvFlag, runtimeProc } from "./runtime";
import { _debugLog } from "./debug";

const CI_COLORS = {
    [ColorLevel.Rgb]: [ "GITHUB_ACTIONS", "GITEA_ACTIONS"],
    [ColorLevel.Ansi256]: [ "TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE" ]
};

/**
 * @internal
 * @returns
 */
/*#__NO_SIDE_EFFECTS__*/
export function _detectColorSupport(): ColorLevel {
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
                                colorLevel = ColorLevel.Rgb;
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
            objForEachKey(CI_COLORS, (color, values) => {
                arrForEach(values, (value) => {
                    if (value in env) {
                        colorLevel = +color;
                        return -1;
                    }
                });
            });

            if (env.CI_NAME === "codeship") {
                colorLevel = ColorLevel.Basic;
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
                    colorLevel =  ColorLevel.Rgb;
                } else if (build >= 10586) {
                    colorLevel =  ColorLevel.Ansi256;
                }
            }
        }
    
        let teamCity = env.TEAMCITY_VERSION || "";
        if (teamCity) {
            return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(teamCity) ? ColorLevel.Basic : ColorLevel.None;
        }
    
        if (env.COLORTERM === "truecolor" || env.COLORTERM === "24bit") {
            return ColorLevel.Rgb;
        }
    
        if (term === "xterm-kitty") {
            return ColorLevel.Rgb;
        }
    
        let termProgram = env.TERM_PROGRAM || "";
        if (termProgram === "Apple_Terminal") {
            return ColorLevel.Basic;
        } else if (termProgram === "iTerm.app") {
            const termVer = parseInt(strSplit(env.TERM_PROGRAM_VERSION || "", ".")[0], 10);
            if (termVer >= 3) {
                return ColorLevel.Rgb;
            }
    
            return ColorLevel.Ansi256;
        }
    
        if (/-256(color)?$/i.test(term)) {
            return ColorLevel.Ansi256;
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
