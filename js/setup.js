function Setup() {
    this.loadLevelMap = loadLevelMap;
    this.resetGame = resetGame;
    this.hideHidables = hideHidables;
    this.enableKeyboard = enableKeyboard;
    this.enableTouchControls = enableTouchControls;
    this.bindScreenButtons = bindScreenButtons;
    this.preventDblClick = preventDblClick;
    this.setClassProp = setClassProp;
    this.loadContent = loadContent;
    this.prepareSoundsForMobile = prepareSoundsForMobile;

    return this;

    function prepareSoundsForMobile() {
        const sounds = [
            musicTheme,
            charJumpSound,
            ufoLaserSound,
            charArrowSound,
            pigJumpSound,
            explosionSound,
            gameOverTheme,
            nextLevelTheme
        ];

        // Mobile browsers only allow audio started from a user gesture, so
        // play/pause every sound once (muted) while handling the start tap.
        sounds.forEach(sound => {
            sound.volume = 0;
            sound.play().catch(() => {});
            sound.pause();
            sound.currentTime = 0;
        });

        sounds.forEach(sound => { sound.volume = 1; });
        musicTheme.volume = .7;
    }

    function loadContent() {
        preloadImages([
            'img/charman/charman-01.png',
            'img/charman/charman-bow.gif',
            'img/charman/charman-jump.gif',
            'img/charman/charman-run.gif',
            'img/charman/charman-swim.gif',
            'img/interactions/explosion01.gif'
        ]);
        setSounds();
    }

    function preventDblClick() {
        document.ondblclick = e => e.preventDefault();
    }

    function enableKeyboard() {
        const pressActions = {
                [KEY_RIGHT]: events.tapMoveRight,
                [KEY_LEFT]: events.tapMoveLeft,
                [KEY_ATTACK]: events.tapAttack,
                [KEY_JUMP]: events.tapJump
            },
            releaseButtons = {
                [KEY_RIGHT]: 'btnRight',
                [KEY_LEFT]: 'btnLeft',
                [KEY_ATTACK]: 'btnAttack',
                [KEY_JUMP]: 'btnJump'
            },
            pressedKeys = {};

        document.addEventListener('keydown', e => {
            pressedKeys[e.key] = true;
            if (pressActions[e.key]) pressActions[e.key]();
        });

        document.addEventListener('keyup', e => {
            pressedKeys[e.key] = false;
            setTimeout(() => {
                // The key may have been pressed again during the delay
                if (pressedKeys[e.key]) return;
                if (releaseButtons[e.key]) events.tapStop(releaseButtons[e.key]);
            }, 50);
        });
    }

    function enableTouchControls() {
        const buttons = {
            btnAttack: events.tapAttack,
            btnJump: events.tapJump,
            btnLeft: events.tapMoveLeft,
            btnRight: events.tapMoveRight
        };

        Object.entries(buttons).forEach(([id, onPress]) => {
            const btn = document.getElementById(id);
            btn.addEventListener('touchstart', () => onPress());
            btn.addEventListener('touchend', () => events.tapStop(id));
        });
    }

    function bindScreenButtons() {
        document.getElementById('startGame').addEventListener('click', () => game.init());
        document.getElementById('gameOver').addEventListener('click', () => events.reset());
        document.getElementById('levelScore').addEventListener('click', () => game.nextLevel());
    }

    function resetGame() {
        gameOverTheme.pause();
        nextLevelTheme.pause();
        musicTheme.currentTime = 0;
        musicTheme.play();
        hideHidables();
        resetGameVariables();
        cancelAllActions();
        cancelAllCommands();
        resetCharman();
        level.loadLevelTriggers();
        loadLevelMap();
        loadEnemyList();
    }

    function resetGameVariables() {
        topPos = CHARBASEFLOOR;
        leftPos = 0;
        currMap = 0;
        gameTime = 0;
        timer = 0;
        time = Date.now();
    }

    function cancelAllCommands() {
        commands.right = false;
        commands.left = false;
        commands.fire = false;
        commands.jump = false;
    }

    function cancelAllActions() {
        actions.canMove = true;
        actions.canJump = true;
        actions.canFire = true;
        actions.jumping = false;
        actions.firing = false;
        actions.swimming = false;
        actions.falling = false;
        actions.cancelShot = false;
        actions.shooting = false;
        actions.lastDirection = 'right';
        actions.abduction = false;
    }

    function resetCharman() {
        charDiv.style.opacity = 1;
        charDiv.style.top = `${topPos}%`;
        charDiv.style.left = `${leftPos}%`;
        charDiv.style.display = 'block';
    }

    function loadEnemyList() {
        enemies = ['ufo', 'pig', 'alien', 'bigBoss'].map(id => document.getElementById(id));
    }

    function loadLevelMap() {
        const maps = level.loadMapArr();
        let floorPos = 0;

        document.getElementById('stage').innerHTML = `${currMap + 1} / ${maps.length}`;
        document.getElementById('level').innerHTML = level.current;

        mapIndexArray = [];
        mapArr = maps[currMap];

        display.setBackgroundImg();
        display.clearBackground();

        mapArr.forEach(([image, width, floor]) => {
            const classes = image.includes('fragile') ? `floor fragile ${width}` : `floor ${width}`;
            bkgLayer.innerHTML += `<img class="${classes}" style="left: ${floorPos}%; top: ${FLOORS[floor]}%" src="img/map/floor/${image}" />`;
            floorPos += (width === 'single') ? SINGLEBLOCK : DOUBLEBLOCK;
            mapIndexArray.push(floorPos);
        });
    }

    function hideHidables() {
        setClassProp('hidable', 'display', 'none');
    }

    function setClassProp(className, prop, value) {
        for (const el of document.getElementsByClassName(className)) {
            el.style[prop] = value;
        }
    }

    function preloadImages(images) {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    function setSounds() {
        musicTheme = new Audio('audio/alien-cat.mp3');
        nextLevelTheme = new Audio('audio/level-end-autumn-leaves.mp3');
        charJumpSound = new Audio('audio/jump.mp3');
        ufoLaserSound = new Audio('audio/tir.mp3');
        charArrowSound = new Audio('audio/sling-shot.mp3');
        pigJumpSound = new Audio('audio/jumppp22.ogg.mp3');
        explosionSound = new Audio('audio/8bit_bomb_explosion.wav.mp3');
        gameOverTheme = new Audio('audio/star-floor.mp3');
        musicTheme.loop = true;
        nextLevelTheme.loop = true;
        gameOverTheme.loop = true;
    }

}
