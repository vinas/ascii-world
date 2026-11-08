// Module instances (created in start-app.js)
let dom,
    collision,
    timeUtils,
    sounds,
    physics,
    levelMap,
    charman,
    projectiles,
    enemies,
    effects,
    screens,
    input,
    events,
    setup,
    game,
    level,
    dialogs;

// DOM elements
let charDiv,
    charmanImg,
    bkgLayer;

// Game state
let gameOn = true,
    commands = {},
    actions = {},
    currMap = 0,
    mapIndexArray = [],
    mapArr = [],
    levelTriggers = [],
    floorIndex = 0,
    leftPos = 0,
    topPos,
    time = 0,
    timer = 0,
    gameTime = 0;

const BASICMOVRATE = .6,
    CHARBASEFLOOR = 52,
    FLOORS = [66, 60, 54],
    SINGLEBLOCK = 6.25,
    DOUBLEBLOCK = SINGLEBLOCK * 2,
    JUMPVARRATE = .7,
    FLOORHORTOLERANCE = 5,
    FLOORVERTTOLERANCE = 14,
    JUMPHIGH = 21,
    UFOSHOTWIDTH = 2,
    UFOSHOTHEIGHT = 1,
    CHARSHOTWIDTH = 1.5,
    CHARSHOTHEIGHT = 1;

// Keyboard keys (KeyboardEvent.key)
const KEY_LEFT = 'ArrowLeft',
    KEY_RIGHT = 'ArrowRight',
    KEY_ATTACK = ' ',
    KEY_JUMP = 'Control';
