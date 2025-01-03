/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2024 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { CSIColors } from "../enums/CsiColors";

const CSI = "\x1b[";

/**
 * Creates a CSI color code
 * @param color The color to create
 * @param reset The color to reset to
 * @returns The CSI color code
 */
export function createCsiColor(color: CSIColors, reset: CSIColors = CSIColors.Reset): string {
    let enable = CSI + color + "m";
    let disable = CSI + reset + "m";
    return `\x1b[${color}m`;
}