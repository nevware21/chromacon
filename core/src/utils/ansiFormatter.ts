/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { isArray, isNumber, strEndsWith, strIndexOf } from "@nevware21/ts-utils";
import { CSIColors } from "../enums/CsiColors";
import { CSI, EMPTY_STRING, PARSE_CSI_SGI_REGEXP } from "./consts";
import { IColorDef } from "../interfaces/IColorDef";
import { IThemeFormatter } from "../interfaces/IThemeFormatter";
import { ColorLevel } from "../enums/ColorLevel";
import { _isBaseColor } from "../internal/isColor";
import { _setToString } from "../internal/setToString";

function _getAnsiCsi(colorDef: IColorDef, level: ColorLevel): string {
    let color = colorDef.c;
    let colType: ColorLevel = ColorLevel.None;
    let strCol: string = EMPTY_STRING;
    let result: string = EMPTY_STRING;

    if (level) {
        if (_isBaseColor(color)) {
            // The ColorDef is a base color
            colType = ColorLevel.Basic;
            strCol = EMPTY_STRING + (color.b + color.o);
        } else if (isArray(color) && level === ColorLevel.Rgb) {
            // The ColorDef is an RGB color
            colType = ColorLevel.Rgb;
            strCol = "2";

            for (let lp = 0; lp < 3; lp++) {
                strCol += ";" + color[lp];
            }
        } else if (isNumber(color) && level >= ColorLevel.Ansi256) {
            // The ColorDef is a style code
            colType = ColorLevel.Ansi256;
            strCol = "5;" + color;
        }

        if (isNumber(colorDef.s)) {
            let style = colorDef.s;
            if (style === CSIColors.UlColor) {
                if (colType >= ColorLevel.Ansi256) {
                    // Underline color
                    result = "58;" + strCol;
                }
            } else if (style === CSIColors.SetFgColor) {
                // Set foreground color
                if (colType >= ColorLevel.Ansi256) {
                    result = "38;" + strCol;
                }
            } else if (style === CSIColors.SetBgColor) {
                // Set background color
                if (colType >= ColorLevel.Ansi256) {
                    result = "48;" + strCol;
                }
            } else {
                // Assume a style code
                result = EMPTY_STRING + style
            }
        } else {
            result = strCol;
        }
    }

    return result;
}


export function createAnsiFormatter(colorLevel: ColorLevel, enable: IColorDef, disable: IColorDef): IThemeFormatter {
    let strDisable: string = _getAnsiCsi(disable, colorLevel);

    let strEnable = _getAnsiCsi(enable, colorLevel);
    let ansiEnable = strEnable ? CSI + strEnable + "m" : EMPTY_STRING;
    let ansiDisable = strDisable ? CSI + strDisable + "m" : EMPTY_STRING;
    let isReset = disable.s === CSIColors.Reset;

    return _setToString({
        format: (value: string) => {
            let res = value;

            if (colorLevel && ansiEnable) {
                res =  _ansiFormatter(colorLevel, value, ansiEnable, ansiDisable, strDisable, isReset)
            }

            return res;
        }
    }, {
        v: () => {
            let result = EMPTY_STRING;

            if (colorLevel && ansiEnable) {
                result = ansiEnable;
            }

            return result;
        },
        e: false,
        w: false
    });
}

function _ansiFormatter(colorLevel: ColorLevel, value: string, ansiEnable: string, ansiDisable: string, disableArgs: string, isReset: boolean): string {
    let result = value;
    let match: RegExpExecArray | null;
    let lastIndex = 0;
    let csiCodes: string [] = [];

    if (colorLevel) {
        result = ansiEnable;
        let idx = strIndexOf(value, CSI);
        if (idx !== -1) {
            while ((match = PARSE_CSI_SGI_REGEXP.exec(value)) !== null) {
                if (lastIndex != match.index) {
                    if (csiCodes.length) {
                        result += csiCodes.join(EMPTY_STRING);
                        csiCodes = [];
                    }

                    // String before the match
                    result += value.substring(lastIndex, match.index);
                }

                if (!isReset && match[1] == disableArgs) {
                    // Reset color found, so re-enable the requested style
                    csiCodes.push(ansiEnable);
                } else {
                    csiCodes.push(match[0]);
                    if (match[1] == EMPTY_STRING || match[1] == "0") {
                        // Special case -- full reset found, so re-enable the requested style
                        csiCodes = [match[0], ansiEnable];
                    }
                }

                lastIndex = match.index + match[0].length;
            }
    
            if (lastIndex < value.length) {
                if (csiCodes.length) {
                    result += csiCodes.join(EMPTY_STRING);
                    csiCodes = [];
                }

                result += value.substring(lastIndex);
            } else if (csiCodes.length) {
                // Another special case - if the disable code is "reset" then we don't need to append any "restore" codes
                if (!isReset) {
                    // Remove any duplicate trailing enable (or disable) color codes
                    while (csiCodes.length > 0 && (csiCodes[csiCodes.length - 1] == ansiEnable/* || csiCodes[csiCodes.length - 1] == disable*/)) {
                        // We are about to "disable" the color so don't bother trying to re-enable it
                        csiCodes.pop();
                    }
                } else {
                    // Special case -- full reset detected, so remove all color codes
                    csiCodes = [];
                }

                if (csiCodes.length) {
                    result += csiCodes.join(EMPTY_STRING);
                    csiCodes = [];
                }
            }

            // Don't need to add the disable code if it's already there
            if (!strEndsWith(result, ansiDisable)) {
                result += ansiDisable;
            }
        } else {
            result = ansiEnable + value + ansiDisable;
        }
    }

    return result;
}