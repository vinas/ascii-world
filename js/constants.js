// Values that never change at runtime. Positions and sizes are percentages
// of the game area.

export const BASICMOVRATE = .6,
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
export const KEY_LEFT = 'ArrowLeft',
    KEY_RIGHT = 'ArrowRight',
    KEY_ATTACK = ' ',
    KEY_JUMP = 'Control';
