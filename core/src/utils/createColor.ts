/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { ChromaColor } from "../interfaces/types";
import { DEFAULT_RESET, EMPTY_STRING } from "./consts";
import { IColorDef } from "../interfaces/IColorDef";
import { IThemeFormatter } from "../interfaces/IThemeFormatter";
import { _activeTheme } from "../theme/_activeTheme";
import { ColorLevel } from "../enums/ColorLevel";
import { _setToString } from "../internal/setToString";
import { _ISystemTheme } from "../interfaces/_ISystemTheme";

function _getFormatter(theme: _ISystemTheme, color: IColorDef, reset: IColorDef): IThemeFormatter {
    return theme.formatter(theme.colorLvl, color, reset);
}

/**
 * Creates a CSI color code
 * @param color The color to create
 * @param reset The color to reset to
 * @returns The CSI color code
 */
/*#__NO_SIDE_EFFECTS__*/
export function _createCsiColor(color: IColorDef, reset: IColorDef = DEFAULT_RESET): ChromaColor {
    let themeFormatter: IThemeFormatter | null = null;
    
    let _initFormatter = () => {
        themeFormatter = _getFormatter(_activeTheme.v, color, reset);
        // Add listener to reset the cached formatter if the theme changes
        _activeTheme.v.listen((sysTheme) => {
            themeFormatter = _getFormatter(sysTheme, color, reset);
        });
    };

    function format(value: string): string {
        let result = value;
        let currentTheme = _activeTheme.v;
        let colorLevel = currentTheme.colorLvl;
        if (colorLevel !== ColorLevel.None) {
            if (!themeFormatter) {
                _initFormatter();
            }

            result = themeFormatter ? themeFormatter.format(value) : result;
        }

        return result;
    }

    function _toString(): string {
        let result: string = EMPTY_STRING;
        let currentTheme = _activeTheme.v;
        let colorLevel = currentTheme.colorLvl;
        if (colorLevel !== ColorLevel.None) {
            if (!themeFormatter) {
                _initFormatter();
            }
            
            result = themeFormatter ? themeFormatter.toString() : EMPTY_STRING;
        }

        return result;
    }

    _setToString(format, {
        v: _toString,
        e: false,
        w: false
    });

    return format as ChromaColor;
}