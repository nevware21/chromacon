/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

export const enum CsiOffsets {
    None = 0,
    Fg = 30,
    Bg = 40,
    BrightDelta = 60
    // FgBright = 90,
    // BgBright = 100
}

export const enum CsiBaseColors {
    Black = 0,
    Red = 1,
    Green = 2,
    Yellow = 3,
    Blue = 4,
    Magenta = 5,
    Cyan = 6,
    White = 7,

    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    Grey = CsiOffsets.BrightDelta + CsiBaseColors.Black,

    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    Gray = CsiOffsets.BrightDelta + CsiBaseColors.Black,

    BrightRed = CsiOffsets.BrightDelta + CsiBaseColors.Red,
    BrightGreen = CsiOffsets.BrightDelta + CsiBaseColors.Green,
    BrightYellow = CsiOffsets.BrightDelta + CsiBaseColors.Yellow,
    BrightBlue = CsiOffsets.BrightDelta + CsiBaseColors.Blue,
    BrightMagenta = CsiOffsets.BrightDelta + CsiBaseColors.Magenta,
    BrightCyan = CsiOffsets.BrightDelta + CsiBaseColors.Cyan,
    BrightWhite = CsiOffsets.BrightDelta + CsiBaseColors.White
}

export const enum Csi256BaseColors {
    Black = 0,
    Red = 1,
    Green = 2,
    Yellow = 3,
    Blue = 4,
    Magenta = 5,
    Cyan = 6,
    White = 7,

    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    Grey = 8,

    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    Gray = 8,

    BrightRed = 9,
    BrightGreen = 10,
    BrightYellow = 11,
    BrightBlue = 12,
    BrightMagenta = 13,
    BrightCyan = 14,
    BrightWhite = 15
}

export const enum CSIColors {
    Reset = 0,              // Reset / Normal all attributes off

    // Attributes
    Bold = 1,               // As with the dim attribute the color change is a PC (SCP / CGA) invention. It is widely supported, but the intensity of the color is not. It is best used with the primary font.
    Dim = 2,                // May be implemented as a light font weight in some cases
    Italic = 3,             // Not widely supported. Sometimes treated as inverse.
    Underline = 4,          // Single Underline
    Blink = 5,              // Slow Blink less than 150 per minute
    RapidBlink = 6,         // MS-Dos Ansi.sys 150+ per minute, Not widely supported
    Inverse = 7,            // Swap foreground and background colors (not widely supported)
    Hidden = 8,             // Hidden (Concealed) Not widely supported
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
    NormalIntensity = 22,   // Neither bold not dim; color changes where intensity is implemented as such
    NotItalic = 23,         // Not italic, not Fraktur
    NotUnderline = 24,      // Not singly or doubly underlined
    NotBlink = 25,          // Steady (not blinking)
    ProportionalSpacing = 26,   // Select Proportional Spacing (not known to be used on terminals)
    NotInverse = 27,        // Disable inverse (reverse) video
    NotHidden = 28,         // Reveal (hidden / conceal off)
    NotStrikethrough = 29,  // Disable strikethrough / crossed-out

    // Foreground Colors
    FgBlack = CsiOffsets.Fg + CsiBaseColors.Black,
    FgRed = CsiOffsets.Fg + CsiBaseColors.Red,
    FgGreen = CsiOffsets.Fg + CsiBaseColors.Green,
    FgYellow = CsiOffsets.Fg + CsiBaseColors.Yellow,
    FgBlue = CsiOffsets.Fg + CsiBaseColors.Blue,
    FgMagenta = CsiOffsets.Fg + CsiBaseColors.Magenta,
    FgCyan = CsiOffsets.Fg + CsiBaseColors.Cyan,
    FgWhite = CsiOffsets.Fg + CsiBaseColors.White,

    SetFgColor = 38,        // 8 or 24-bit color mode foreground
    FgDefault = 39,         // Default text color (implementation defined)
    
    FgGray = CsiOffsets.Fg + CsiBaseColors.Gray,
    FgGrey = CsiOffsets.Fg + CsiBaseColors.Gray,
    FgBrightRed = CsiOffsets.Fg + CsiBaseColors.BrightRed,
    FgBrightGreen = CsiOffsets.Fg + CsiBaseColors.BrightGreen,
    FgBrightYellow = CsiOffsets.Fg + CsiBaseColors.BrightYellow,
    FgBrightBlue = CsiOffsets.Fg + CsiBaseColors.BrightBlue,
    FgBrightMagenta = CsiOffsets.Fg + CsiBaseColors.BrightMagenta,
    FgBrightCyan = CsiOffsets.Fg + CsiBaseColors.BrightCyan,
    FgBrightWhite = CsiOffsets.Fg + CsiBaseColors.BrightWhite,
    
    // Background Colors
    BgBlack = CsiOffsets.Bg + CsiBaseColors.Black,
    BgRed = CsiOffsets.Bg + CsiBaseColors.Red,
    BgGreen = CsiOffsets.Bg + CsiBaseColors.Green,
    BgYellow = CsiOffsets.Bg + CsiBaseColors.Yellow,
    BgBlue = CsiOffsets.Bg + CsiBaseColors.Blue,
    BgMagenta = CsiOffsets.Bg + CsiBaseColors.Magenta,
    BgCyan = CsiOffsets.Bg + CsiBaseColors.Cyan,
    BgWhite = CsiOffsets.Bg + CsiBaseColors.White,

    SetBgColor = 48,       // 8/24-bit color mode background
    BgDefault = 49,        // Default background color  (implementation specific)
    
    BgGray = CsiOffsets.Bg + CsiBaseColors.Gray,
    BgGrey = CsiOffsets.Bg + CsiBaseColors.Gray,
    BgBrightRed = CsiOffsets.Bg + CsiBaseColors.BrightRed,
    BgBrightGreen = CsiOffsets.Bg + CsiBaseColors.BrightGreen,
    BgBrightYellow = CsiOffsets.Bg + CsiBaseColors.BrightYellow,
    BgBrightBlue = CsiOffsets.Bg + CsiBaseColors.BrightBlue,
    BgBrightMagenta = CsiOffsets.Bg + CsiBaseColors.BrightMagenta,
    BgBrightCyan = CsiOffsets.Bg + CsiBaseColors.BrightCyan,
    BgBrightWhite = CsiOffsets.Bg + CsiBaseColors.BrightWhite,

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

