/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

/**
 * An interface that defines a theme specific formatter, this is returned by {@link ITheme.getFormatter}
 * It provides a method to format a string with the appropriate CSI codes as well as a toString method
 * to get the raw CSI code.
 */
export interface IThemeFormatter {
    /**
     * Formats a string with the theme's CSI codes
     * @param string The string to be formatted with the theme's CSI codes
     * @returns The formatted string with the appropriate CSI codes applied
     */
    format: (string: string) => string;

    /**
     * Returns the raw CSI code as a string
     * @returns The raw CSI code
     */
    toString: () => string;
}