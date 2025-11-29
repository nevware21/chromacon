/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { CSIColors } from "../enums/CsiColors";
import { CsiStyle } from "../interfaces/types";
import { _createStyle } from "../utils/createStyle";

/**
 * Reset / Normal color and style with all attributes off
 */
export const reset: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Reset }));

/**
 * Bold color or style
 */
export const bold: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Bold }, { s: CSIColors.NormalIntensity }));

/**
 * Dim color or style
 */
export const dim: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Dim },{ s: CSIColors.NormalIntensity }));

/**
 * Italic style
 */
export const italic: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Italic }, { s: CSIColors.NotItalic }));

/**
 * Underline style
 */
export const underline: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Underline }, { s: CSIColors.NotUnderline }));

/**
 * Blink style
 */
export const blink: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Blink }, { s: CSIColors.NotBlink }));

/**
 * Reverse or Inverse style. Swaps the foreground and background colors.
 */
export const inverse: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Inverse }, { s: CSIColors.NotInverse }));

/**
 * Hidden style
 */
export const hidden: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Hidden }, { s: CSIColors.NotHidden }));

/**
 * Crossed out / Strikethrough style
 */
export const strikethrough: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Strikethrough }, { s: CSIColors.NotStrikethrough }));

/**
 * Disable proportional spacing
 */
export const disableProportionalSpacing: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.DisableProportionalSpacing }));

/**
 * Framed style
 */
export const framed: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Framed }, { s: CSIColors.NotFramed }));

/**
 * Encircled style
 */
export const encircled: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Encircled }));

/**
 * Overlined style (Not supported in Terminal app)
 */
export const overlined: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.Overlined }, { s: CSIColors.NotOverlined }));

/**
 * Disable / Not framed style
 */
export const notFramed: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.NotFramed }));

/**
 * Disable / Not encircled style
 */
export const notOverlined: CsiStyle = (/*#__PURE__*/_createStyle({ s: CSIColors.NotOverlined }));
