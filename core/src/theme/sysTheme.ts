/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { arrForEach, arrIndexOf, fnBind, isNullOrUndefined, objDefine, safe } from "@nevware21/ts-utils";
import { _ISystemTheme } from "../interfaces/_ISystemTheme";
import { ColorLevel } from "../enums/ColorLevel";
import { _resetRuntime } from "../utils/runtime";
import { ITheme } from "../interfaces/ITheme";
import { IColorDef } from "../interfaces/IColorDef";
import { IThemeFormatter } from "../interfaces/IThemeFormatter";
import { _detectColorSupport } from "../utils/_detect";
import { _setToString } from "../internal/setToString";
import { _IListener } from "../interfaces/_IListener";

function _isColorLevelValid(level?: ColorLevel | null): boolean {
    return !isNullOrUndefined(level) && level >= ColorLevel.None && level <= ColorLevel.Rgb;
}

function _returnEmptyString(): string {
    return "";
}

function _nullFormatter(colorLevel: ColorLevel, color: IColorDef, reset: IColorDef): IThemeFormatter {
    return _setToString({
        format: (value: string) => value
    }, {
        v: _returnEmptyString,
        e: false,
        w: false
    });
}

function _createListener(listeners: _IListener[], cb: (theme: _ISystemTheme) => void): _IListener {
    let listener: _IListener = {
        ntfy: cb,
        rm: () => {
            let index = arrIndexOf(listeners, listener);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    };

    listeners.push(listener);
    
    return listener;
}

function _notifyListeners(listeners: _IListener[], theme: _ISystemTheme) {
    arrForEach(listeners, (listener) => {
        safe(listener.ntfy, [theme]);
    });
}

/**
 * @internal
 * Create a usable {@link _ISystemTheme} from the supplied {@link ITheme}
 * @param themeDef - The theme definition to use
 * @returns A new {@link _ISystemTheme} instance which is using the provided theme
 */
export function _createSysTheme(themeDef?: ITheme): _ISystemTheme {
    let detector: (() => ColorLevel) | null;
    let theTheme: _ISystemTheme;
    let listeners: _IListener[] = [];
    let maxLevel: ColorLevel | null = null;
    let level: ColorLevel | null = null;
    
    function _setDetector(detectFn?: () => ColorLevel) {
        detector = detectFn || null;
    }

    function _detectColorLevel(): ColorLevel {
        let theLevel: ColorLevel | null = null;

        // Auto-detect the color level
        _resetRuntime();
        if (detector) {
            // Use the supplied detector
            let result = safe(detector);
            theLevel = result.e ? null : result.v;
        }

        if (!_isColorLevelValid(theLevel)) {
            // Use the default detection function
            theLevel = _detectColorSupport();
        }

        return _isColorLevelValid(theLevel) ? theLevel : ColorLevel.None;
    }

    function _getLevel(): ColorLevel {
        if (level === ColorLevel.AutoDetect || isNullOrUndefined(level)) {
            // Re-evaluate the color level
            level = _detectColorLevel();
            _notifyListeners(listeners, theTheme);
        }

        return level;
    }

    function _setLevel(value: ColorLevel | null) {
        let newLevel: ColorLevel;

        if (value !== ColorLevel.AutoDetect && !isNullOrUndefined(value) && (value >= ColorLevel.None && value <= ColorLevel.Rgb)) {
            // Use the supplied color level
            newLevel = value;
        } else {
            // Reset to detection mode
            newLevel = _detectColorLevel();
        }

        // Enforce the maximum level if one is set
        if (_isColorLevelValid(maxLevel) && newLevel > (maxLevel as ColorLevel)) {
            newLevel = maxLevel as ColorLevel;
        }

        if (newLevel !== level) {
            level = newLevel;
            _notifyListeners(listeners, theTheme);
        }
    }

    theTheme = {
        colorLvl: ColorLevel.AutoDetect,
        formatter: _nullFormatter,
        detector: _setDetector,
        listen: (cb: (theme: _ISystemTheme) => void): _IListener => {
            return _createListener(listeners, cb);
        }
    };

    objDefine(theTheme, "colorLvl", {
        g: _getLevel,
        s: _setLevel
    });

    if (themeDef) {
        _setDetector(themeDef.detector);
        if (themeDef.getFormatter) {
            theTheme.formatter = fnBind(themeDef.getFormatter, themeDef);
        }

        if (!isNullOrUndefined(themeDef.colorLevel)) {
            maxLevel = themeDef.colorLevel;
            if (_isColorLevelValid(maxLevel)) {
                level = maxLevel;
            }
        }

        // Clean up the theme reference so that it can be garbage collected
        // when no longer used (not-withstanding that it's bound to the formatter)
        themeDef = null;
    }

    return theTheme;
}
