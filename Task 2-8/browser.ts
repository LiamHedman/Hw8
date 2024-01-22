import {Stack, NonEmptyStack, empty, is_empty, 
        push, top, pop 
} from '/Users/Liam Hedman/OneDrive/Dokument/skola/PKD/Code/lib/stack';


/**
 * Stores the history of visited webpages in a browser for forwards and
 * backwards navigation.
 * TODO: fill in description
 */
export type BrowserHistory = {
    backHistory: Stack<string>;
    fowardHistory: Stack<string>;
    currentPage: string;
};

/**
 * Creates a fresh browser history.
 * @returns Creates an empty browser history.
 */
export function new_browser_history(): BrowserHistory {
    return {
        backHistory: empty(),
        fowardHistory:empty(),
        currentPage: ""
    };
}

/**
 * The currently open page in a browser history.
 * @param history A browser history
 * @returns The URL of the currently open website in history.
 */
export function current_page(history: BrowserHistory): string {
    return history.currentPage;
}


/**
 * Update a browser history when visiting the new page.
 * This clears the forward history of pages visited.
 * @precondition page is not empty
 * @param history browser history so far
 * @param page the URL of the next page to visit
 * @return An updated browser history with 'page' as the current page and
 *     no forward pages stored.
 */
export function visit_page(history: BrowserHistory, page: string): BrowserHistory {
    return history = {
        backHistory: push(history.currentPage, history.backHistory),
        fowardHistory: empty(),
        currentPage: page
    };
}

/**
 * Update a browser history when navigating one page back.
 * @param history browser history so far
 * @returns An updated browser history with the current page being the one
 *    visited immediately before the current page in 'history', or the input
 *    'history' unchanged if there is no page to go back to.
 */
export function go_back(history: BrowserHistory): BrowserHistory {
    if (!is_empty(history.backHistory)) {
        return history = {
            fowardHistory: push(history.currentPage, history.fowardHistory),
            currentPage: top(history.backHistory),
            backHistory: pop(history.backHistory)
        };
    }
    return history;
}

/**
 * Update a browser history when navigating one page forward.
 * @param history browser history so far
 * @return An updated browser history with the current page the one that was
 *     last navigated back from, or the input 'history' unchanged if there is no
 *     page to go forward to.
 */
export function go_forward(history: BrowserHistory): BrowserHistory {
    if (!is_empty(history.fowardHistory)) {
        return history = {
            backHistory: push(history.currentPage, history.backHistory),
            currentPage: top(history.fowardHistory),
            fowardHistory: pop(history.fowardHistory)
        };
    }
    return history;
}