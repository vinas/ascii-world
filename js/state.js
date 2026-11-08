// Shared mutable game state. Modules import this one object and read/write
// its properties (imported bindings themselves are read-only).
export const state = {
    // The current level's module (js/levels/levelNN.js), set by start-app.js
    level: undefined,

    gameOn: true,
    commands: {},
    actions: {},

    // Current map and its floor sections
    currMap: 0,
    mapArr: [],
    mapIndexArray: [],
    levelTriggers: [],
    floorIndex: 0,

    // Player position
    leftPos: 0,
    topPos: undefined,

    // Timing: game start timestamp, seconds shown in the HUD, final duration
    time: 0,
    timer: 0,
    gameTime: 0
};
