// Level 3. A level module exports:
//   current             the level number
//   bkgdImage1/2        backgrounds, alternating between maps
//   loadMapArr()        the maps; each is a list of floor sections
//                       [image, 'single'|'double', floor height index, 'solid'|'hole'|'liquid']
//   loadLevelTriggers() per map, { position: { onlyOnce, triggered, actions, params } },
//                       fired when the player walks right past that position

import { state } from '../state.js';

export const current = 3,
    bkgdImage1 = 'bkg-mointains01.png',
    bkgdImage2 = 'bkg-mointains02.png';

export function loadMapArr() {
    return [
        // #1
        [
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid']
        ],
        // #2
        [
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid']
        ],
        // #3
        [
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid'],
            ['floor01.png', 'double', 0, 'solid']
        ]
    ];
}

export function loadLevelTriggers() {
    state.levelTriggers = [
        // #1
        {},
        // #2
        {},
        // #3
        {}
    ];
}
