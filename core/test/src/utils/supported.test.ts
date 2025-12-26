/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { assert } from "@nevware21/tripwire";
import { getColorLevel, isColorSupported, isRgb256ColorSupported, isTrueColorSupported, setColorLevel } from "../../../src/utils/supported";
import { _detectColorSupport } from "../../../src/utils/_detect";
import { ColorLevel } from "../../../src/enums/ColorLevel";
import { getGlobal, isNode, objDefine, setBypassLazyCache } from "@nevware21/ts-utils";
import { _resetRuntime } from "../../../src/utils/runtime";

describe("isColorSupported", () => {
    beforeEach(() => {
        setBypassLazyCache(true);
        // Reset automatic detection
        setColorLevel();
        _resetRuntime();
    });

    afterEach(() => {
        setBypassLazyCache(false);
        _resetRuntime();
    });

    describe("setColorLevel: None", () => {
        beforeEach(() => {
            // Reset automatic detection
            setColorLevel(ColorLevel.None);
        });

        it("should return true when the environment supports true color", () => {
            assert.equals(getColorLevel(), ColorLevel.None);
            assert.isFalse(isColorSupported());
        });
    
        it("should return true when the environment supports 256 colors", () => {
            assert.equals(getColorLevel(), ColorLevel.None);
            assert.isFalse(isRgb256ColorSupported());
        });
    
        it("should return true when the environment supports true (16m) colors", () => {
            assert.equals(getColorLevel(), ColorLevel.None);
            assert.isFalse(isTrueColorSupported());
        });
    });

    describe("setColorLevel: Basic", () => {
        beforeEach(() => {
            // Reset automatic detection
            setColorLevel(ColorLevel.Basic);
        });

        it("should return true when the environment supports true color", () => {
            assert.equals(getColorLevel(), ColorLevel.Basic);
            assert.isTrue(isColorSupported());
        });
    
        it("should return true when the environment supports 256 colors", () => {
            assert.equals(getColorLevel(), ColorLevel.Basic);
            assert.isFalse(isRgb256ColorSupported());
        });
    
        it("should return true when the environment supports true (16m) colors", () => {
            assert.equals(getColorLevel(), ColorLevel.Basic);
            assert.isFalse(isTrueColorSupported());
        });
    });

    describe("setColorLevel: Rgb256", () => {
        beforeEach(() => {
            // Reset automatic detection
            setColorLevel(ColorLevel.Ansi256);
        });

        it("should return true when the environment supports true color", () => {
            assert.equals(getColorLevel(), ColorLevel.Ansi256);
            assert.isTrue(isColorSupported());
        });
    
        it("should return true when the environment supports 256 colors", () => {
            assert.equals(getColorLevel(), ColorLevel.Ansi256);
            assert.isTrue(isRgb256ColorSupported());
        });
    
        it("should return true when the environment supports true (16m) colors", () => {
            assert.equals(getColorLevel(), ColorLevel.Ansi256);
            assert.isFalse(isTrueColorSupported());
        });
    });

    describe("setColorLevel: TrueColor", () => {
        beforeEach(() => {
            // Reset automatic detection
            setColorLevel(ColorLevel.Rgb);
        });

        it("should return true when the environment supports true color", () => {
            assert.equals(getColorLevel(), ColorLevel.Rgb);
            assert.isTrue(isColorSupported());
        });
    
        it("should return true when the environment supports 256 colors", () => {
            assert.equals(getColorLevel(), ColorLevel.Rgb);
            assert.isTrue(isRgb256ColorSupported());
        });
    
        it("should return true when the environment supports true (16m) colors", () => {
            assert.equals(getColorLevel(), ColorLevel.Rgb);
            assert.isTrue(isTrueColorSupported());
        });
    });
});

describe("detectColorSupport", () => {
    beforeEach(() => {
        setBypassLazyCache(true);
        _resetRuntime();

        // Reset automatic detection
        setColorLevel();
    });

    afterEach(() => {
        setBypassLazyCache(false);
        _resetRuntime();
    });

    describe("navigator", () => {
        var global = getGlobal() as any;
        var orgProcess: any;
        var orgNavigator: any;
        var theNavigator: any = null;

        beforeEach(() => {
            orgNavigator = global.navigator;
            orgProcess = global.process;
            global.process = null;
            objDefine(global, "navigator", {
                g: () => theNavigator
            });
        });

        afterEach(() => {
            global.process = orgProcess;
            objDefine(global, "navigator", {
                v: orgNavigator
            });
        });

        it("should detect true color support in a Chromium-based browser", () => {
            const originalNavigator = global.navigator;
            theNavigator = {
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
                userAgentData: {
                    brands: [{ brand: "Chromium", version: "94" }]
                }
            } as any;

            assert.equals(_detectColorSupport(), ColorLevel.Rgb);

            theNavigator = originalNavigator;
        });

        it("should detect no color support in a non-Chromium browser", () => {
            const originalNavigator = global.navigator;
            try {
                theNavigator = {
                    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36"
                } as any;
                _resetRuntime();
        
                assert.equals(_detectColorSupport(), ColorLevel.None);
        
            } finally {
                theNavigator = originalNavigator;
            }
        });

        it("should detect basic color support in a Chromium 93 browser", () => {
            const originalNavigator = global.navigator;
            try {
                theNavigator = {
                    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4606.81 Safari/537.36"
                } as any;
        
                assert.equals(_detectColorSupport(), ColorLevel.Basic);
        
            } finally {
                theNavigator = originalNavigator;
            }
        });
    });

    if (isNode()) {
        describe("node native os", () => {

            // Check if CI environment is detected
            let env = process.env || {} as NodeJS.ProcessEnv;
            if ("TF_BUILD" in env && "AGENT_NAME" in env) {
                // DevOps environment
                assert.equals(_detectColorSupport(), ColorLevel.Basic);
            } else {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                let os = require("os");
                if (os && os.release && process.platform == "win32") {
                    let ver = (os.release() || "").split(".");
                    if (ver[0] >= 10 && ver[2] >= 14931) {
                        assert.equals(_detectColorSupport(), ColorLevel.Rgb);
                    } else if (ver[0] >= 10 && ver[2] >= 10586) {
                        assert.equals(_detectColorSupport(), ColorLevel.Ansi256);
                    } else {
                        assert.equals(_detectColorSupport(), ColorLevel.Basic);
                    }
                } else {
                    assert.equals(_detectColorSupport(), ColorLevel.Rgb);
                }
            }
        });
    }

    describe("node:win32", () => {
        var global = getGlobal() as any;
        var orgProcess: any;
        var orgNavigator: any;
        var theNavigator: any = null;
        var theProcess: any = {
            platform: "win32",
            env: {},
            argv: [],
            release: () => "10.0.14931"
        };

        beforeEach(() => {
            orgNavigator = global.navigator;
            orgProcess = global.process;
            objDefine(global, "navigator", {
                g: () => theNavigator
            });
            objDefine(global, "process", {
                g: () => theProcess
            });
            _resetRuntime();
        });

        afterEach(() => {
            objDefine(global, "navigator", {
                v: orgNavigator
            });
            objDefine(global, "process", {
                g: () => orgProcess
            });
            _resetRuntime();
        });

        it("should detect color support based on FORCE_COLOR environment variable", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, FORCE_COLOR: "true" };
                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "basic" };
                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "ansi" };
                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "ansi16" };
                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "always" };
                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "truecolor" };
                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "16m" };
                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "full" };
                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "256" };
                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "ansi256" };
                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "8bit" };
                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "15" };
                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "16" };
                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "17" };
                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "255" };
                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "256" };
                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "257" };
                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "65535" };
                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "0" };
                assert.equals(_detectColorSupport(), ColorLevel.None);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "1" };
                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "2" };
                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "3" };
                assert.equals(_detectColorSupport(), ColorLevel.Rgb);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect no color support when TERM is set to dumb", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TERM: "dumb" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.None);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect true color support on Windows 10 build 14931", () => {
            const originalPlatform = theProcess.platform;
            const originalRelease = theProcess.release;
            try {
                objDefine(theProcess, "platform", { v: "win32" });
                objDefine(theProcess, "osRelease", { v: () => "10.0.14931" });
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);
            } finally {
                objDefine(theProcess, "platform", { v: originalPlatform });
                objDefine(theProcess, "osRelease", { v: originalRelease });
            }
        });
    
        it("should detect 256 color support on Windows 10 build 10586", () => {
            const originalPlatform = theProcess.platform;
            const originalRelease = theProcess.release;
            try {
                objDefine(theProcess, "platform", { v: "win32" });
                objDefine(theProcess, "osRelease", { v: () => "10.0.10586" });
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);
            } finally {
                objDefine(theProcess, "platform", { v: originalPlatform });
                objDefine(theProcess, "osRelease", { v: originalRelease });
            }
        });

        it("should detect 256 color support on Windows 7 build 10586", () => {
            const originalPlatform = theProcess.platform;
            const originalRelease = theProcess.release;
            try {
                objDefine(theProcess, "platform", { v: "win32" });
                objDefine(theProcess, "osRelease", { v: () => "7.0.10586" });
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);
            } finally {
                objDefine(theProcess, "platform", { v: originalPlatform });
                objDefine(theProcess, "osRelease", { v: originalRelease });
            }
        });

        it("should detect basic color support in CI environment", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, CI: "true", TRAVIS: "true" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);
    
                theProcess.env = { ...originalEnv, CI: "true", GITHUB_ACTIONS: "true" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, CI: "true", UNKNOWN_HOST: "true" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.None);

                theProcess.env = { ...originalEnv, CI: "true", CI_NAME: "codeship" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);
            } finally {
                theProcess.env = originalEnv;
            }
        });

        it("should detect basic color for DevOps environment", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TF_BUILD: "true", AGENT_NAME: "AgentName" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect TeamCity color support", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TEAMCITY_VERSION: "2021.1.1" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);
            } finally {
                theProcess.env = originalEnv;
            }
        });

        it("should detect true color support when COLORTERM is set to truecolor", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, COLORTERM: "truecolor" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, COLORTERM: "24bit" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, COLORTERM: "basic" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect basic color support when TERM_PROGRAM is Apple_Terminal", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TERM_PROGRAM: "Apple_Terminal" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect true color support when TERM_PROGRAM is iTerm.app version 3 or higher", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TERM_PROGRAM: "iTerm.app", TERM_PROGRAM_VERSION: "3.3.0" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect 256 color support when TERM_PROGRAM is iTerm.app version less than 3", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TERM_PROGRAM: "iTerm.app", TERM_PROGRAM_VERSION: "2.9.0" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    });

    describe("node:linux", () => {
        var global = getGlobal() as any;
        var orgProcess: any;
        var orgNavigator: any;
        var theNavigator: any = null;
        var theProcess: any = {
            platform: "linux",
            env: {},
            argv: [],
            release: () => "11.0.19999"
        };

        beforeEach(() => {
            orgNavigator = global.navigator;
            orgProcess = global.process;
            objDefine(global, "navigator", {
                g: () => theNavigator
            });
            objDefine(global, "process", {
                g: () => theProcess
            });
            _resetRuntime();
        });

        afterEach(() => {
            objDefine(global, "navigator", {
                v: orgNavigator
            });
            objDefine(global, "process", {
                g: () => orgProcess
            });
            _resetRuntime();
        });

        it("should detect color support based on FORCE_COLOR environment variable", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, FORCE_COLOR: "true" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "basic" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "ansi" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "ansi16" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "always" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "truecolor" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "16m" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "full" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "256" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "ansi256" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "8bit" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "false" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.None);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "never" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.None);

                theProcess.env = { ...originalEnv, FORCE_COLOR: "none" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.None);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect no color support when TERM is set to dumb", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TERM: "dumb" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.None);
            } finally {
                theProcess.env = originalEnv;
            }
        });

        it("should detect xterm-256color support when TERM is set to xterm-256color", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TERM: "xterm-256color" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);
            } finally {
                theProcess.env = originalEnv;
            }
        });

        it("should detect xterm-kitty support when TERM is set to xterm-kitty", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TERM: "xterm-kitty" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect true color support on Windows 10 build 14931", () => {
            const originalPlatform = theProcess.platform;
            const originalRelease = theProcess.release;
            try {
                objDefine(theProcess, "platform", { v: "win32" });
                objDefine(theProcess, "osRelease", { v: () => "10.0.14931" });
                _resetRuntime();
        
                assert.equals(_detectColorSupport(), ColorLevel.Rgb);
            } finally {
                objDefine(theProcess, "platform", { v: originalPlatform });
                objDefine(theProcess, "osRelease", { v: originalRelease });
            }
    
        });
    
        it("should detect 256 color support on Windows 10 build 10586", () => {
            const originalPlatform = theProcess.platform;
            const originalRelease = theProcess.release;
            try {
                objDefine(theProcess, "platform", { v: "win32" });
                objDefine(theProcess, "osRelease", { v: () => "10.0.10586" });
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);
            } finally {
                objDefine(theProcess, "platform", { v: originalPlatform });
                objDefine(theProcess, "osRelease", { v: originalRelease });
            }
        });

        it("should detect 256 color support on Windows 7 build 10586", () => {
            const originalPlatform = theProcess.platform;
            const originalRelease = theProcess.release;
            try {
                objDefine(theProcess, "platform", { v: "win32" });
                objDefine(theProcess, "osRelease", { v: () => "7.0.10586" });
                _resetRuntime();
        
                assert.equals(_detectColorSupport(), ColorLevel.Basic);
            } finally {
                objDefine(theProcess, "platform", { v: originalPlatform });
                objDefine(theProcess, "osRelease", { v: originalRelease });
            }
        });

        it("should detect basic color support in CI environment", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, CI: "true", TRAVIS: "true" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);
    
                theProcess.env = { ...originalEnv, CI: "true", GITHUB_ACTIONS: "true" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, CI: "true", UNKNOWN_HOST: "true" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.None);

                theProcess.env = { ...originalEnv, CI: "true", CI_NAME: "codeship" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect true color support when COLORTERM is set to truecolor", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, COLORTERM: "truecolor" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, COLORTERM: "24bit" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);

                theProcess.env = { ...originalEnv, COLORTERM: "basic" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect basic color support when TERM_PROGRAM is Apple_Terminal", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TERM_PROGRAM: "Apple_Terminal" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Basic);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect true color support when TERM_PROGRAM is iTerm.app version 3 or higher", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TERM_PROGRAM: "iTerm.app", TERM_PROGRAM_VERSION: "3.3.0" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Rgb);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    
        it("should detect 256 color support when TERM_PROGRAM is iTerm.app version less than 3", () => {
            const originalEnv = theProcess.env;
            try {
                theProcess.env = { ...originalEnv, TERM_PROGRAM: "iTerm.app", TERM_PROGRAM_VERSION: "2.9.0" };
                _resetRuntime();

                assert.equals(_detectColorSupport(), ColorLevel.Ansi256);
            } finally {
                theProcess.env = originalEnv;
            }
        });
    });
});

