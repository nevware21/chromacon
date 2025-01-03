/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2024 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

const enum BaseColors {
    Black = 0,
    Red = 1,
    Green = 2,
    Yellow = 3,
    Blue = 4,
    Magenta = 5,
    Cyan = 6,
    White = 7
}

export const enum CSIColors {
    Reset = 0,              // Reset / Normal all attributes off


    // Attributes
    Bold = 1,               // As with the faint attribute the color change is a PC (SCP / CGA) invention. It is widely supported, but the intensity of the color is not. It is best used with the primary font.
    Faint = 2,              // May be implemented as a light font weight in some cases
    Italic = 3,             // Not widely supported. Sometimes treated as inverse.
    Underline = 4,          // Single Underline
    Blink = 5,              // Slow Blink less than 150 per minute
    RapidBlink = 6,         // MS-Dos Ansi.sys 150+ per minute, Not widely supported
    Reverse = 7,            // Swap foreground and background colors (not widely supported)
    Conceal = 8,            // Not widely supported
    Strikethrough = 9,      // Strikethrough or crossed-out

    // Fonts
    PrimaryFont = 10,
    AltFont1 = 11,
    AltFont2 = 12,
    AltFont3 = 13,
    AltFont4 = 14,
    AltFont5 = 15,
    AltFont6 = 16,
    AltFont7 = 17,
    AltFont8 = 18,
    AltFont9 = 19,
    Fraktur = 20,           // Rarely supported


    DoubleUnderline = 21,   // Double Underline (ECMA-48), but instead disables bold intensity on several terminals (including linux kernals console before 4.1.7)
    NormalIntensity = 22,   // Neither bold nor faint; color changes where intensity is implemented as such
    NotItalic = 23,         // Not italic, not Fraktur
    NotUnderline = 24,      // Not singly or doubly underlined
    NotBlink = 25,          // Steady (not blinking)
    ProportionalSpacing = 26,   // Select Proportional Spacing (not known to be used on terminals)
    NotReverse = 27,        // Disable reverse video
    NotConceal = 28,        // Reveal (conceal off)
    NotStrikethrough = 29,  // Disable strikethrough / crossed-out

    // Foreground Colors
    FgBlack = 30 + BaseColors.Black,
    FgRed = 30 + BaseColors.Red,
    FgGreen = 30 + BaseColors.Green,
    FgYellow = 30 + BaseColors.Yellow,
    FgBlue = 30 + BaseColors.Blue,
    FgMagenta = 30 + BaseColors.Magenta,
    FgCyan = 30 + BaseColors.Cyan,
    FgWhite = 30 + BaseColors.White,

    FgRgb = 38,             // 8/24-bit color mode foreground
    FgDefault = 39,         // Default text color (implementation defined)
    
    FgGray = 90 + BaseColors.Black,
    FgBrightRed = 90 + BaseColors.Red,
    FgBrightGreen = 90 + BaseColors.Green,
    FgBrightYellow = 90 + BaseColors.Yellow,
    FgBrightBlue = 90 + BaseColors.Blue,
    FgBrightMagenta = 90 + BaseColors.Magenta,
    FgBrightCyan = 90 + BaseColors.Cyan,
    FgBrightWhite = 90 + BaseColors.White,
    
    // Background Colors
    BgBlack = 40 + BaseColors.Black,
    BgRed = 40 + BaseColors.Red,
    BgGreen = 40 + BaseColors.Green,
    BgYellow = 40 + BaseColors.Yellow,
    BgBlue = 40 + BaseColors.Blue,
    BgMagenta = 40 + BaseColors.Magenta,
    BgCyan = 40 + BaseColors.Cyan,
    BgWhite = 40 + BaseColors.White,

    BgRgb = 48,            // 8/24-bit color mode background
    BgDefault = 49,        // Default background color  (implementation specific)
    
    BgGray = 100 + BaseColors.Black,
    BgBrightRed = 100 + BaseColors.Red,
    BgBrightGreen = 100 + BaseColors.Green,
    BgBrightYellow = 100 + BaseColors.Yellow,
    BgBrightBlue = 100 + BaseColors.Blue,
    BgBrightMagenta = 100 + BaseColors.Magenta,
    BgBrightCyan = 100 + BaseColors.Cyan,
    BgBrightWhite = 100 + BaseColors.White,

    DisableProportionalSpacing = 50,    // Not supported by most terminals
    Framed = 51,                        // Implemented as "emoji variation selector" in mintty
    Encircled = 52,                     // Implemented as "emoji variation selector" in mintty
    Overlined = 53,                     // Not supported in terminal.app
    NotFramed = 54,
    NotOverlined = 55,
    
    UlColor = 58,                       // Not standardized
    UlDefaultColor = 59,                // Not standardized

    Superscript = 73,                   // Only supported in mintty
    Subscript = 74,                     // Only supported in mintty
    NotSuperSubScript = 75,             // Only supported in mintty
}

