function Level() {

    return {
        current: 2,
        bkgdImage1: 'bkg-ufo01.png',
        bkgdImage2: 'bkg-ufo02.png',
        loadMapArr,
        loadLevelTriggers
    };

    function loadMapArr() {
        return [
            // #1
            [
                ['floor_fragile.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
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
            ],
            // #4
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #5
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['water-01.gif', 'double', 0, 'liquid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #6
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
            // #7
            [
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor02.png', 'single', 0, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['plataform02.png', 'single', 2, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid']
            ],
            // #8
            [
                ['floor02.png', 'single', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor_fragile01.png', 'single', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor_fragile01.png', 'single', 0, 'solid'],
                ['hole01.png', 'double', 0, 'hole'],
                ['hole01.png', 'double', 0, 'hole'],
                ['floor02.png', 'single', 0, 'solid']

            ],
            // #9
            [
                ['floor_fragile.png', 'double', 0, 'solid'],
                ['floor_fragile.png', 'double', 0, 'solid'],
                ['floor_fragile01.png', 'single', 0, 'solid'],
                ['floor02.png', 'single', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor01.png', 'double', 0, 'solid'],
                ['floor02.png', 'single', 0, 'solid'],
                ['floor_fragile01.png', 'single', 0, 'solid'],
                ['floor_fragile.png', 'double', 0, 'solid'],
                ['floor_fragile.png', 'double', 0, 'solid']
            ],
            // #10
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
            // #11
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

    function loadLevelTriggers() {
        levelTriggers = [
            // #1
            {
                37: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        effects.turnFragilesToHoles
                    ],
                    params: [
                        {
                            floorIndexes: [0]
                        }
                    ]
                },
                45: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.alienIn
                    ],
                    params: [
                        {
                            left: 37,
                            top: 51,
                            callback: enemies.alienOutRight
                        }
                    ]
                }
            },
            // #2
            {
                6: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.alienAttack01
                    ],
                    params: [
                        {
                            left: 70,
                            top: 51,
                            callback: enemies.alienOutRight
                        }
                    ]
                },
                70: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.alienIn
                    ],
                    params: [
                        {
                            left: 80,
                            top: 51,
                            callback: enemies.alienOutRight
                        }
                    ]
                }
            },
            // #3
            {
                6: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.alienIn
                    ],
                    params: [
                        {
                            left: 70,
                            top: 51,
                            callback: enemies.alienOutRight
                        }
                    ]
                },
                50: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.alienIn
                    ],
                    params: [
                        {
                            left: 50,
                            top: 51,
                            right: true,
                            callback: enemies.alienOutRight
                        }
                    ]
                }
            },
            // #4
            {
                65: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.alienIn
                    ],
                    params: [
                        {
                            left: 80,
                            top: 51,
                            callback: enemies.alienOutRight
                        }
                    ]
                }
            },
            // #5
            {
                20: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.alienIn
                    ],
                    params: [
                        {
                            left: 88,
                            top: 51,
                            callback: enemies.alienOutRight
                        }
                    ]
                },
                45: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.alienAttack01
                    ],
                    params: [
                        {
                            left: 88,
                            top: 51,
                            callback: enemies.alienOutRight
                        }
                    ]
                }
            },
            // #6
            {
                25: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.alienIn
                    ],
                    params: [
                        {
                            left: 50,
                            top: 51,
                            right: true,
                            callback: enemies.alienOutRight
                        }
                    ]
                }
            },
            //# 7 
            {
                20: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.alienIn
                    ],
                    params: [
                        {
                            left: 27,
                            top: 51,
                            right: true,
                            callback: enemies.alienOutLeft
                        }
                    ]
                },
                67: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.alienAttack01
                    ],
                    params: [
                        {
                            left: 85,
                            top: 51,
                            callback: enemies.alienOutRight
                        }
                    ]
                }
            },
            // #8
            {
                35: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        effects.turnFragilesToHoles
                    ],
                    params: [
                        {
                            floorIndexes: [3, 6]
                        }
                    ]
                }
            },
            // #9
            {
                5: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        effects.turnFragilesToHoles
                    ],
                    params: [
                        {
                            floorIndexes: [0, 1, 2, 7, 8, 9]
                        }
                    ]
                },
                10: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.bigBossIn
                    ],
                    params: [
                        {
                            left: 78,
                            top: 12,
                            callback: () => setTimeout(enemies.bigBossOut, 600)
                        }
                    ]
                },
                55: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.bigBossRoutine
                    ],
                    params: [
                        {
                            callback: effects.unHole,
                            args: [0, 1, 2, 7, 8, 9]
                        }
                    ]
                }
            },
            // #10
            {
                2: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        enemies.standingPig
                    ],
                    params: [
                        {
                            left: 75,
                            top: 56,
                            callback: dialogs.pigMeeting
                        }
                    ]
                },
                50: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        dialogs.pigEscape
                    ],
                    params: []
                }
            },
            // #11
            {
                2: {
                    onlyOnce: true,
                    triggered: false,
                    actions: [
                        game.passedNextLevel
                    ],
                    params: []
                }
            }
        ];
    }
}
