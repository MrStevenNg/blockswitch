import {
    RESET_GAME,
    ADD_TO_PATTERN_ARRAY,
    ADD_TO_INPUT_PATTERN_ARRAY,
    INCREMENT_INPUT_COUNTER,
    CLEAR_INPUT_PATTERN_ARRAY,
    CLEAR_PATTERNS,
    SET_DISPLAY_PATTERN_ACTIVE,
    SET_PATTERN_DIRECTION,
    SET_USER_INPUT_ACTIVE
} from "./types";

// RESET_GAME ////
export const resetGame = () => {
    // console.log(`RESET_GAME action called!`);
    return {
        type: RESET_GAME
    };
};

// CLEAR_PATTERNS ////
export const clearPatterns = () => {
    // console.log(`CLEAR_PATTERNS action called!`);
    return {
        type: CLEAR_PATTERNS
    };
};

// ADD_TO_FORWARD_PATTERN_ARRAY ////
export const addToPatternArray = value => {
    // console.log(`ADD_TO_PATTERN_ARRAY action called! (${value})`);
    return {
        type: ADD_TO_PATTERN_ARRAY,
        payload: value
    };
};

// ADD_TO_INPUT_PATTERN_ARRAY ////
export const addToInputPatternArray = value => {
    // console.log(`ADD_TO_INPUT_PATTERN_ARRAY action called!`);
    return {
        type: ADD_TO_INPUT_PATTERN_ARRAY,
        payload: value
    };
};

// INCREMENT_INPUT_COUNTER ////
export const incrementInputCounter = () => {
    // console.log(`INCREMENT_INPUT_COUNTER action called!`);
    return {
        type: INCREMENT_INPUT_COUNTER
    };
};

// CLEAR_INPUT_PATTERN_ARRAY ////
export const clearInputPatternArray = () => {
    // console.log(`CLEAR_INPUT_PATTERN_ARRAY action called!`);
    return {
        type: CLEAR_INPUT_PATTERN_ARRAY
    };
};

// SET_DISPLAY_PATTERN ////
export const setDisplayPatternActive = bool => {
    // console.log(`SET_DISPLAY_PATTERN_ACTIVE action called! (${bool})`);
    return {
        type: SET_DISPLAY_PATTERN_ACTIVE,
        payload: bool
    };
};

// SET_PATTERN_DIRECTION ////
export const setPatternDirection = bool => {
    // console.log(`SET_PATTERN_DIRECTION action called! (${bool})`);
    return {
        type: SET_PATTERN_DIRECTION,
        payload: bool
    };
};

// SET_USER_INPUT_ACTIVE ////
export const setUserInputActive = bool => {
    // console.log(`SET_USER_INPUT_ACTIVE action called! (${bool})`);
    return {
        type: SET_USER_INPUT_ACTIVE,
        payload: bool
    };
};
