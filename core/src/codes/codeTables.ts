/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2024 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { CodeTable, CodeTableDetail } from "../interfaces/types";

function codeDetails(abbr: string, name: string): CodeTableDetail {
    return { abbr, name };
}

/**
 * Lookup table for FE codes.
 */
const feCodeTable: CodeTable = {
    0x80: codeDetails("PAD", "Padding Character" ),
    0x81: codeDetails("HOP", "High Octet Preset" ),
    0x82: codeDetails("BPH", "Break Permitted Here" ),
    0x83: codeDetails("NBH", "No Break Here" ),
    0x84: codeDetails("IND", "Index" ),
    0x85: codeDetails("NEL", "Next Line" ),
    0x86: codeDetails("SSA", "Start of Selected Area" ),
    0x87: codeDetails("ESA", "End of Selected Area" ),
    0x88: codeDetails("HTS", "Horizontal Tabulation Set" ),
    0x89: codeDetails("HTJ", "Horizontal Tabulation with Justification" ),
    0x8A: codeDetails("VTS", "Vertical Tabulation Set" ),
    0x8B: codeDetails("PLD", "Partial Line Down" ),
    0x8C: codeDetails("PLU", "Partial Line Up" ),
    0x8D: codeDetails("RI", "Reverse Line Feed" ),
    0x8E: codeDetails("SS2", "Single Shift Two" ),
    0x8F: codeDetails("SS3", "Single Shift Three" ),
    0x90: codeDetails("DCS", "Device Control String" ),
    0x91: codeDetails("PU1", "Private Use One" ),
    0x92: codeDetails("PU2", "Private Use Two" ),
    0x93: codeDetails("STS", "Set Transmit State" ),
    0x94: codeDetails("CCH", "Cancel Character" ),
    0x95: codeDetails("MW", "Message Waiting" ),
    0x96: codeDetails("SPA", "Start of Protected Area" ),
    0x97: codeDetails("EPA", "End of Protected Area" ),
    0x98: codeDetails("SOS", "Start of String" ),
    0x99: codeDetails("SGCI", "Single Graphic Character Introducer" ),
    0x9A: codeDetails("SCI", "Single Character Introducer" ),
    0x9B: codeDetails("CSI", "Control Sequence Introducer" ),
    0x9C: codeDetails("ST", "String Terminator" ),
    0x9D: codeDetails("OSC", "Operating System Command" ),
    0x9E: codeDetails("PM", "Privacy Message" ),
    0x9F: codeDetails("APC", "Application Program Command" )
};
