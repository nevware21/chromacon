/*
 * ts-async
 * https://github.com/nevware21/ts-async
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                "Gruntfile.js",
                "<%= nodeunit.tests %>"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ["tmp"]
        },

        // Unit tests.
        nodeunit: {
            tests: ["test/*_test.js"]
        },
        ts: {
            options: {
                debug: true,
                logOutput: true
            },
            "chromacon": {
                // Default ES5
                tsconfig: [
                    {
                        name: "./core/tsconfig.json",
                        tsconfig: {
                            compilerOptions: {
                                target: "es5",
                                declaration: true,
                                declarationDir: "./build/types",
                                removeComments: false,
                                outDir: "./build/es5"
                            }
                        },
                        outDir: "./core/build/es5/mod"
                    },
                    {
                        name: "./core/tsconfig.json",
                        tsconfig: {
                            compilerOptions: {
                                target: "es6",
                                outDir: "./build/es6"
                            }
                        },
                        outDir: "./core/build/es6/mod"
                    }
                ]
            },
            "chromacon-test": {
                tsconfig: "./core/test/tsconfig.test.json",
                outDir: "./core/test-esm"
            }
        },
        "lint": {
            options: {
                format: "codeframe",
                suppressWarnings: false
            },
            "chromacon": {
                tsconfig: "./core/tsconfig.json",
                ignoreFailures: true
            },
            "chromacon-test": {
                tsconfig: "./core/test/tsconfig.test.json",
                ignoreFailures: true
            },
            "chromacon-fix": {
                options: {
                    tsconfig: "./core/tsconfig.json",
                    fix: true
                }
            },
            "chromacon-test-fix": {
                options: {
                    tsconfig: "./core/test/tsconfig.test.json",
                    fix: true
                }
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadNpmTasks("@nevware21/grunt-ts-plugin");
    grunt.loadNpmTasks("@nevware21/grunt-eslint-ts");

    grunt.registerTask("rollupuglify", ["ts:rollupuglify" ]);
    grunt.registerTask("chromacon", [ "lint:chromacon-fix", "lint:chromacon-test-fix", "ts:chromacon", "ts:chromacon-test" ]);
    grunt.registerTask("chromacon-test", [ "lint:chromacon-test-fix", "ts:chromacon-test" ]);
    grunt.registerTask("chromacon-lint", [ "lint:chromacon-fix", "lint:chromacon-test-fix" ]);
    grunt.registerTask("dolint", [ "lint:chromacon", "lint:chromacon-test" ]);
    grunt.registerTask("lint-fix", [ "lint:chromacon-fix", "lint:chromacon-test-fix" ]);
    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    // grunt.registerTask('chromacon_test', ['clean', 'chromacon']);

    // By default, lint and run all tests.
    grunt.registerTask("default", ["jshint" ]);
};
