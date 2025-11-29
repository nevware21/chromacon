/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */


/**
 * C0 Control Codes: 0x00—0x1F (C0 Control Codes)
 */
export const enum eC0ControlCode {
    NUL = 0x00, // Null
    SOH = 0x01, // Start of Heading
    STX = 0x02, // Start of Text
    ETX = 0x03, // End of Text
    EOT = 0x04, // End of Transmission
    ENQ = 0x05, // Enquiry
    ACK = 0x06, // Acknowledge
    BEL = 0x07, // Bell
    BS = 0x08, // Backspace
    HT = 0x09, // Horizontal Tab
    LF = 0x0A, // Line Feed
    VT = 0x0B, // Vertical Tab
    FF = 0x0C, // Form Feed
    CR = 0x0D, // Carriage Return
    SO = 0x0E, // Shift Out
    SI = 0x0F, // Shift In
    DLE = 0x10, // Data Link Escape
    DC1 = 0x11, // Device Control 1 (XON)
    DC2 = 0x12, // Device Control 2
    DC3 = 0x13, // Device Control 3 (XOFF)
    DC4 = 0x14, // Device Control 4
    NAK = 0x15, // Negative Acknowledge
    SYN = 0x16, // Synchronous Idle
    ETB = 0x17, // End of Transmission Block
    CAN = 0x18, // Cancel
    EM = 0x19, // End of Medium
    SUB = 0x1A, // Substitute
    ESC = 0x1B, // Escape
    FS = 0x1C, // File Separator
    GS = 0x1D, // Group Separator
    RS = 0x1E, // Record Separator
    US = 0x1F, // Unit Separator
}

/**
 * Type definition for C0 Control Codes: 0x00—0x1F (C0 Control Codes)
 */
export type C0ControlCode = number | eC0ControlCode;

/**
 * Fe Sequence: ESC 0x80—0x9F  (@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_) (C1 Control Codes)
 * If the ESC is followed by a byte in the range 0x40 to 0x5F, the escape sequence is of type Fe. Its interpretation
 * is delegated to the applicable C1 control code standard. Accordingly, all escape sequences corresponding to C1
 * control codes from ANSI X3.64 / ECMA-48 follow this format.
 *
 * The standard says that, in 8-bit environments, the control functions corresponding to type Fe escape sequences
 * (those from the set of C1 control codes) can be represented as single bytes in the 0x80–0x9F range. This is
 * possible in character encodings conforming to the provisions for an 8-bit code made in ISO 2022, such as the
 * ISO 8859 series. However, in character encodings used on modern devices such as UTF-8 or CP-1252, those codes
 * are often used for other purposes, so only the 2-byte sequence is typically used. In the case of UTF-8,
 * representing a C1 control code via the C1 Controls and Latin-1 Supplement block results in a different two-byte
 * code (e.g. 0xC2,0x8E for U+008E), but no space is saved this way.
 *
 * | Char | Code | Name   | Description                              | Terminator | Notes
 * |------|------|--------|------------------------------------------|------------|-------------------------------------------------------------
 * | @    | 0x80 | PAD    | Padding Character                        | No         | Reserved for padding, for example, on a synchronous transmission medium.
 * | A    | 0x81 | HOP    | High Octet Preset                        | No         | Reserved for the use of the higher layers. It must not be used for the definition of new control functions.
 * | B    | 0x82 | BPH    | Break Permitted Here                     | No         | Soft-hyphen. Indicates a position at which a line break may occur.
 * | C    | 0x83 | NBH    | No Break Here                            | No         | Following character that is not to be broken
 * | D    | 0x84 | IND    | Index                                    | No         | Moves the active position one line down, without changing the column.
 * | E    | 0x85 | NEL    | Next Line                                | No         | Moves the active position to the first character of the next line. (CR+LF)
 * | F    | 0x86 | SSA    | Start of Selected Area                   | No         | Starts the definition of a character selection area. (XTERM moves the cursor to the lower-left corner of the screen.)
 * | G    | 0x87 | ESA    | End of Selected Area                     | No         | Ends the definition of a character selection area.
 * | H    | 0x88 | HTS    | Horizontal Tabulation Set                | No         | Sets a tab stop at the active position.
 * | I    | 0x89 | HTJ    | Horizontal Tabulation with Justification | No         | Right-justify the text against the next tab stop.
 * | J    | 0x8A | VTS    | Vertical Tabulation Set                  | No         | Sets a vertical tab stop at the active position.
 * | K    | 0x8B | PLD    | Partial Line Down                        | No         | Subscript (decreases font size) PLD text PLU
 * | L    | 0x8C | PLU    | Partial Line Up                          | No         | Superscript (increases font size) PLU text PLD
 * | M    | 0x8D | RI     | Reverse Line Feed                        | No         | Moves the active position one line up, without changing the column.
 * | N    | 0x8E | SS2    | Single Shift Two                         | Character  | Next character is from G2 character set as GL. ( 0x20–0x7F (7-bit) or 0xA0–0xFF (8-bit) )
 * | O    | 0x8F | SS3    | Single Shift Three                       | Character  | Next character is from G3 character set as GL. ( 0x20–0x7F (7-bit) or 0xA0–0xFF (8-bit) )
 * | P    | 0x90 | DCS    | Device Control String                    | ST (0x9c)  | Introduces a device control string, terminated by ST (ESC \ | 0x9c).
 * | Q    | 0x91 | PU1    | Private Use One                          | No         | Reserved for the use of a single control function.
 * | R    | 0x92 | PU2    | Private Use Two                          | No         | Reserved for the use of a single control function.
 * | S    | 0x93 | STS    | Set Transmit State                       | No         | Transmits the communication line status.
 * | T    | 0x94 | CCH    | Cancel Character                         | No         | Descructive backspace, to elmiminate the previous character and remove ambiguity meaning of BS.
 * | U    | 0x95 | MW     | Message Waiting                          | No         | Reserved for indicating a message waiting.
 * | V    | 0x96 | SPA    | Start of Protected Area                  | No         | Starts the protected area.
 * | W    | 0x97 | EPA    | End of Protected Area                    | No         | Ends the protected area.
 * | X    | 0x98 | SOS    | Start of String                          | ST (0x9c)  | Introduces a control string, terminated by ST (ESC \ | 0x9c).
 * | Y    | 0x99 | SGCI   | Single Graphic Character Introducer      | No         | Introduces a single graphic character from the G1 set.
 * | Z    | 0x9A | SCI    | Single Character Introducer              | No         | Introduces a single character from the G0 set.
 * | [    | 0x9B | CSI    | Control Sequence Introducer              | 0x40–0x7E  | Introduce control sequences that take parameters.
 * | \    | 0x9C | ST     | String Terminator                        | No         | Terminates a control string initiated by DCS, SOS, OSC, PM or APC.
 * | ]    | 0x9D | OSC    | Operating System Command                 | ST (0x9c)  | Introduces an operating system command, terminated by ST (ESC \ | 0x9c).
 * | ^    | 0x9E | PM     | Privacy Message                          | ST (0x9c)  | Introduces a privacy message, terminated by ST (ESC \ | 0x9c).
 * | _    | 0x9F | APC    | Application Program Command              | ST (0x9c)  | Introduces an application program command, terminated by ST (ESC \ | 0x9c).
 */
export const enum eFeCode {
    PAD = 0x80, // Padding Character    @
    HOP = 0x81,
    BPH = 0x82,
    NBH = 0x83,
    IND = 0x84,
    NEL = 0x85,
    SSA = 0x86,
    ESA = 0x87,
    HTS = 0x88,
    HTJ = 0x89,
    VTS = 0x8A,
    PLD = 0x8B,
    PLU = 0x8C,
    RI = 0x8D,
    SS2 = 0x8E,
    SS3 = 0x8F,
    DCS = 0x90,
    PU1 = 0x91,
    PU2 = 0x92,
    STS = 0x93,
    CCH = 0x94,
    MW = 0x95,
    SPA = 0x96,
    EPA = 0x97,
    SOS = 0x98,
    SGCI = 0x99,
    SCI = 0x9A,
    CSI = 0x9B,
    ST = 0x9C,
    OSC = 0x9D,
    PM = 0x9E,
    APC = 0x9F
}

/**
 * Type definition for Fe Sequence: ESC 0x80—0x9F  (@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_) (C1 Control Codes)
 */
export type FeCode = number | eFeCode;


/**
 * Control Sequence Introducer (CSI) sequences are used to control display functions on text terminals and terminal emulators.
 *
 * Introduces a control sequence that takes parameters and are terminated by a byte in the range 0x40 to 0x7E.
 *
 * | Char | Code | Name   | Description                              | Notes
 * |------|------|--------|------------------------------------------|-------------------------------------------------------------------------
 * | @    | 0x40 | ICH    | Insert Character                         | Inserts one or more space (SP) characters starting at the cursor position.
 * | A    | 0x41 | CUU    | Cursor Up                                | Moves the cursor up by a specified number of lines without changing columns.
 * | B    | 0x42 | CUD    | Cursor Down                              | Moves the cursor down by a specified number of lines without changing columns.
 * | C    | 0x43 | CUF    | Cursor Forward                           | Moves the cursor right by a specified number of columns without changing lines.
 * | D    | 0x44 | CUB    | Cursor Backward                          | Moves the cursor left by a specified number of columns without changing lines.
 * | E    | 0x45 | CNL    | Cursor Next Line                         | Moves the cursor to the first column of the next line by a specified number of lines.
 * | F    | 0x46 | CPL    | Cursor Preceding Line                    | Moves the cursor to the first column of the preceding line by a specified number of lines.
 * | G    | 0x47 | CHA    | Cursor Character Absolute                | Moves the cursor to the specified column of the current line.
 * | H    | 0x48 | CUP    | Cursor Position                          | Moves the cursor to the specified row and column.
 * | I    | 0x49 | CHT    | Cursor Forward Tabulation                | Moves the cursor to the next tab stop.
 * | J    | 0x4A | ED     | Erase in Display                         | Clears part of the screen.
 * | K    | 0x4B | EL     | Erase in Line                            | Clears part of the line.
 * | L    | 0x4C | IL     | Insert Line                              | Inserts one or more blank lines at the cursor position.
 * | M    | 0x4D | DL     | Delete Line                              | Deletes one or more lines at the cursor position.
 * | N    | 0x4E | EF     | Erase in Field                           | Clears part of the line.
 * | O    | 0x4F | EA     | Erase in Area                            | Clears part of the screen.
 * | P    | 0x50 | DCH    | Delete Character                         | Deletes one or more characters at the cursor position.
 * | Q    | 0x51 | SSE    | Selective Erase in Display               | Clears part of the screen.
 * | R    | 0x52 | CPR    | Cursor Position Report                   | Reports the cursor position to the application as (row, column).
 * | S    | 0x53 | SU     | Scroll Up                                | Scrolls the screen up by a specified number of lines.
 * | T    | 0x54 | SD     | Scroll Down                              | Scrolls the screen down by a specified number of lines.
 * | U    | 0x55 | NP     | Next Page                                | Scrolls the screen down by a full page.
 * | V    | 0x56 | PP     | Preceding Page                           | Scrolls the screen up by a full page.
 * | W    | 0x57 | CTC    | Cursor Tabulation Control                | Controls the cursor tabulation.
 * | X    | 0x58 | ECH    | Erase Character                          | Clears one or more characters from the cursor position.
 * | Y    | 0x59 | CVT    | Cursor Line Tabulation                   | Moves the cursor to the specified line.
 * | Z    | 0x5A | CBT    | Cursor Backward Tabulation               | Moves the cursor to the previous tab stop.
 * | [    | 0x5B | SRS    | Start Reversed String                    | Starts the reversed string.
 * | \    | 0x5C | PTX    | Parallel Texts                           | Starts the parallel texts.
 * | ]    | 0x5D | SDS    | Start Directed String                    | Starts the directed string.
 * | ^    | 0x5E | SIMD   | Select Implicit Movement Direction       | Selects the implicit movement direction.
 * | _    | 0x5F | GSM    | Graphic Size Modification                | Modifies the size of the graphic.
 * | `    | 0x60 | HPA    | Character Position Absolute              | Moves the cursor to the specified column of the current line.
 * | a    | 0x61 | HPR    | Character Position Relative              | Moves the cursor to the right by a specified number of columns.
 * | b    | 0x62 | REP    | Repeat Character                         | Repeats the preceding graphic character the specified number of times.
 * | c    | 0x63 | DA     | Device Attributes                        | Reports the terminal type to the host.
 * | d    | 0x64 | VPA    | Line Position Absolute                   | Moves the cursor to the specified row.
 * | e    | 0x65 | VPR    | Line Position Relative                   | Moves the cursor down by a specified number of lines.
 * | f    | 0x66 | HVP    | Character and Line Position              | Moves the cursor to the specified row and column.
 * | g    | 0x67 | TBC    | Tabulation Clear                         | Clears a tab stop at the cursor position.
 * | h    | 0x68 | SM     | Set Mode                                 | Sets a mode.
 * | i    | 0x69 | MC     | Media Copy                               | Copies the current screen to the printer.
 * | j    | 0x6A | HPB    | Character Position Backward              | Moves the cursor to the left by a specified number of columns.
 * | k    | 0x6B | VPB    | Line Position Backward                   | Moves the cursor up by a specified number of lines.
 * | l    | 0x6C | RM     | Reset Mode                               | Resets a mode.
 * | m    | 0x6D | SGR    | Select Graphic Rendition                 | Sets the graphic rendition mode.
 * | n    | 0x6E | DSR    | Device Status Report                     | Reports the device status to the host.
 * | o    | 0x6F | DAQ    | Define Area Qualification                | Defines the qualification of the area.
 * | p    | 0x70 | DECSC  | Save Cursor                              | Saves the cursor position.
 * | q    | 0x71 | DECRC  | Restore Cursor                           | Restores the cursor position.
 * | r    | 0x72 | DECFRA | Fill Rectangular Area                    | Fills a rectangular area with a graphic character.
 * | s    | 0x73 | DECST  | Save Cursor and State                    | Saves the cursor position and the graphic rendition mode.
 * | t    | 0x74 | DECSL  | Set Lines                                | Sets the number of lines on the screen.
 * | u    | 0x75 | DECRL  | Restore Cursor and State                 | Restores the cursor position and the graphic rendition mode.
 * | v    | 0x76 | DECSA  | Select Area                              | Selects an area.
 * | w    | 0x77 | DECSRA | Select Rectangular Area                  | Selects a rectangular area.
 * | x    | 0x78 | DECST8 | Set Tab at Every 8 Characters            | Sets a tab stop at every eighth column.
 * | y    | 0x79 | DECSTR | Soft Terminal Reset                      | Resets the terminal to its default settings.
 * | z    | 0x7A | DCS    | Device Control String                    | Introduces a device control string.
 * | {    | 0x7B | CSI    | Control Sequence Introducer              | Introduces control sequences that take parameters.
 * | |    | 0x7C | ST     | String Terminator                        | Terminates a control string initiated by DCS.
 * | }    | 0x7D | OSC    | Operating System Command                 | Introduces an operating system command.
 * | ~    | 0x7E | PM     | Privacy Message                          | Introduces a privacy message.
 *
 */
export const eCsiCode = {
    ICH: 0x40, // Insert Character
    CUU: 0x41, // Cursor Up
    CUD: 0x42, // Cursor Down
    CUF: 0x43, // Cursor Forward
    CUB: 0x44, // Cursor Backward
    CNL: 0x45, // Cursor Next Line
    CPL: 0x46, // Cursor Preceding Line
    CHA: 0x47, // Cursor Character Absolute
    CUP: 0x48, // Cursor Position
    CHT: 0x49, // Cursor Forward Tabulation
    ED: 0x4A, // Erase in Display
    EL: 0x4B, // Erase in Line
    IL: 0x4C, // Insert Line
    DL: 0x4D, // Delete Line
    EF: 0x4E, // Erase in Field
    EA: 0x4F, // Erase in Area
    DCH: 0x50, // Delete Character
    SSE: 0x51, // Selective Erase in Display
    CPR: 0x52, // Cursor Position Report
    SU: 0x53, // Scroll Up
    SD: 0x54, // Scroll Down
    NP: 0x55, // Next Page
    PP: 0x56, // Preceding Page
    CTC: 0x57, // Cursor Tabulation Control
    ECH: 0x58, // Erase Character
    CVT: 0x59, // Cursor Line Tabulation
    CBT: 0x5A, // Cursor Backward Tabulation
    SRS: 0x5B, // Start Reversed String
    PTX: 0x5C, // Parallel Texts
    SDS: 0x5D, // Start Directed String
    SIMD: 0x5E, // Select Implicit Movement Direction
    GSM: 0x5F, // Graphic Size Modification
    HPA: 0x60, // Character Position Absolute
    HPR: 0x61, // Character Position Relative
    REP: 0x62, // Repeat Character
    DA: 0x63, // Device Attributes
    VPA: 0x64, // Line Position Absolute
    VPR: 0x65, // Line Position Relative
    HVP: 0x66, // Character and Line Position
    TBC: 0x67, // Tabulation Clear
    SM: 0x68, // Set Mode
    MC: 0x69, // Media Copy
    HPB: 0x6A, // Character Position Backward
    VPB: 0x6B, // Line Position Backward
    RM: 0x6C, // Reset Mode
    SGR: 0x6D, // Select Graphic Rendition
    DSR: 0x6E, // Device Status Report
    DAQ: 0x6F, // Define Area Qualification
    DECSC: 0x70, // Save Cursor
    DECRC: 0x71, // Restore Cursor
    DECFRA: 0x72, // Fill Rectangular Area
    DECST: 0x73, // Save Cursor and State
    DECSL: 0x74, // Set Lines
    DECRL: 0x75, // Restore Cursor and State
    DECSA: 0x76, // Select Area
    DECSRA: 0x77, // Select Rectangular Area
    DECST8: 0x78, // Set Tab at Every 8 Characters
    DECSTR: 0x79, // Soft Terminal Reset
    
    DCS: 0x7A, // Device Control String
    CSI: 0x7B, // Control Sequence Introducer
    ST: 0x7C, // String Terminator
    OSC: 0x7D, // Operating System Command
    PM: 0x7E // Privacy Message
};