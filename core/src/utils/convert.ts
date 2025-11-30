// /*
//  * @nevware21/chromacon
//  * https://github.com/nevware21/chromacon
//  *
//  * Copyright (c) 2025 NevWare21 Solutions LLC
//  * Licensed under the MIT license.
//  */

// import { isArray, isNumber, mathFloor, mathMax, mathRound } from "@nevware21/ts-utils";
// import { ColorLevel } from "../enums/ColorLevel";
// import { Csi256BaseColors, CsiBaseColors, CSIColors, CsiOffsets } from "../enums/CsiColors";
// import { IColorDef } from "../interfaces/IColorDef";

// function _ansi256ToBase(code: number): CsiBaseColors {
//     if (code <= Csi256BaseColors.White) {
//         return code;
//     } else if (code <= Csi256BaseColors.BrightWhite) {
//         return (code - 8) + CsiOffsets.BrightDelta;
//     }

//     let red: number;
//     let green: number;
//     let blue: number;

//     if (code >= 232) {
//         // 6x6x6 color cube
//         code -= 232;
//         red = ((code * 10) + 8) / 255;
//         green = red;
//         blue = red;
//     } else {
//         code -= 16;
//         let rem = code % 36;
//         red = mathFloor(code / 36) / 5;
//         green = mathFloor(rem / 6) / 5;
//         blue = (rem % 6) / 5;
//     }

//     let value = mathMax(red, green, blue) * 2;
//     if (value === 0) {
//         return CsiBaseColors.Black;
//     }

//     let result = ((mathRound(blue) << 2) | (mathRound(green) << 1) | mathRound(red));

//     return value === 2 ? result + CsiOffsets.BrightDelta : result;
// }

// function _rgbToAnsi256(red: number, grn: number, blue: number): number {
//     if (red === grn && grn === blue) {
//         if (red < 8) {
//             return 16;
//         }

//         if (red > 248) {
//             return 231;
//         }

//         return mathRound(((red - 8) / 247) * 24) + 232;
//     }

//     return 16 + (36 * mathRound(red / 256 * 6)) + (6 * mathRound(grn / 256 * 6)) + mathRound(blue / 256 * 6);
// }


// export function convertColorDef(color: IColorDef, level: ColorLevel): IColorDef {
//     let style = color.s;

//     if (level > ColorLevel.None) {
//         if (style === CSIColors.SetFgColor || style === CSIColors.SetBgColor || style === CSIColors.UlColor) {
//             // We have a forground, background or underline color
        
//             if (isArray(color)) {
//                 if (level <= ColorLevel.Rgb) {
//                     // The ColorDef is an RGB color
//                     if (level <= ColorLevel.Ansi256) {
//                         let newColor = _rgbToAnsi256(color[0], color[1], color[2]);
//                         if (level <= ColorLevel.Basic) {
//                             newColor = _ansi256ToBase(newColor);
//                         }

//                         color = {
//                             c: newColor,
//                             s: style
//                         }
//                     }
//                 }
//             } else if (isNumber(color)) {
//                 // Do we need to convert the color to a base color
//                 if (level >= ColorLevel.Ansi256) {
//                     // The ColorDef is a style code
//                     if (style === CSIColors.UlColor) {
//                         // Underline color not supported
//                         style = CSIColors.UlDefaultColor
//                     }
//                 } else if (level < ColorLevel.Ansi256) {
//                     let newColor = _ansi256ToBase(color);
//                     color = {
//                         c: newColor,
//                         s: style
//                     }
//                 }
//             }
//         }
//     }

//     return color
// }
