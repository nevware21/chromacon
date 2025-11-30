/*
 * @nevware21/chromacon
 * https://github.com/nevware21/chromacon
 *
 * Copyright (c) 2025 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

/**
 * @internal
 */
export interface _IListener {
    /**
     * Invoke the callback with the current theme
     */
    ntfy: (theme: any) => void;

    /**
     * Removes the listener
     */
    rm(): void;
}