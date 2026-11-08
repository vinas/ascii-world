function Setup() {
    this.loadLevelMap = loadLevelMap;
    this.resetGame = resetGame;
    this.hideHidables = hideHidables;
    this.enableKeyboard = enableKeyboard;
    this.preventDblClick = preventDblClick;
    this.setClassProp = setClassProp;
    this.loadContent = loadContent;
    this.prepareSoundsForMobile = prepareSoundsForMobile;

    return this;

    function prepareSoundsForMobile() {
        var sounds = [
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
        sounds.forEach(function(sound) {
            sound.volume = 0;
            sound.play().catch(function() {});
            sound.pause();
            sound.currentTime = 0;
        });

        musicTheme.volume = .7;
        charJumpSound.volume = 1;
        ufoLaserSound.volume = 1;
        charArrowSound.volume = 1;
        pigJumpSound.volume = 1;
        explosionSound.volume = 1;
        gameOverTheme.volume = 1;
        nextLevelTheme.volume = 1;
    }

    function loadContent()
    {
     var ImgsToPreload = new Array(
            'img/charman/charman-01.png',
            'img/charman/charman-bow.gif',
            'img/charman/charman-jump.gif',
            'img/charman/charman-run.gif',
            'img/charman/charman-swim.gif',
            'img/interactions/explosion01.gif'
        );
        preloadImages(ImgsToPreload);
        setSounds();
    }

    function preventDblClick() {
        document.ondblclick = function(e) { e.preventDefault(); };
    }

    function enableKeyboard() {
        var pressedKeys = {};

        document.addEventListener('keydown', function(e) {
            pressedKeys[e.which] = true;
            switch (e.which) {
                case 39:
                    events.tapMoveRight();
                    break;
                case 37:
                    events.tapMoveLeft();
                    break;
                case 32:
                    events.tapAttack();
                    break;
                case 17:
                    events.tapJump();
            }
        });

        document.addEventListener('keyup', function(e) {
            pressedKeys[e.which] = false;
            setTimeout(function() {
                // The key may have been pressed again during the delay
                if (pressedKeys[e.which]) return;
                switch (e.which) {
                    case 39:
                        events.tapStop('btnRight');
                        break;
                    case 37:
                        events.tapStop('btnLeft');
                        break;
                    case 32:
                        events.tapStop('btnAttack');
                        break;
                    case 17:
                        events.tapStop('btnJump');
                }
            }, 50);
        });
    }

    function resetGame() {
        gameOverTheme.pause();
        nextLevelTheme.pause();
        musicTheme.currentTime = 0;
        musicTheme.play();
        hideHidables();
        resetGameVariables();
        cancelAllActions();
        cancelAllcommands();
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
        time = +new Date();
    }

    function cancelAllcommands() {
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
        charDiv.style.top = topPos+'%';
        charDiv.style.left = leftPos+'%';
        charDiv.style.display = 'block';
    }

    function loadEnemyList() {
        enemies = [
                document.getElementById('ufo'),
                document.getElementById('pig'),
                document.getElementById('alien'),
                document.getElementById('bigBoss')
            ];
    }

    function loadLevelMap() {
        var floorPos = 0,
            floorTopPos;

        document.getElementById('stage').innerHTML = (currMap + 1) + ' / ' + level.loadMapArr().length;
        document.getElementById('level').innerHTML = level.current;

        mapIndexArray = [];
        mapArr = level.loadMapArr()[currMap];

        display.setBackgroundImg();
        display.clearBackground();

        mapArr.forEach(buildMap);

        function buildMap(mapItem) {
            floorTopPos = FLOORS[mapItem[2]];
            if (mapItem[0].indexOf('fragile') == -1) {
                bkgLayer.innerHTML += '<img class="floor '+mapItem[1]+'" style="left: '+floorPos+'%; top: '+floorTopPos+'%" src="img/map/floor/'+mapItem[0]+'" />';
            } else {
                bkgLayer.innerHTML += '<img class="floor fragile '+mapItem[1]+'" style="left: '+floorPos+'%; top: '+floorTopPos+'%" src="img/map/floor/'+mapItem[0]+'" />';
            }
            switch (mapItem[1]) {
                case 'single':
                    floorPos += SINGLEBLOCK;
                    break;
                case 'double':
                    floorPos += DOUBLEBLOCK;
                    break;
            }
            mapIndexArray.push(floorPos);
        }
    }

    function hideHidables() {
        setClassProp('hidable', 'display', 'none');
    }

    function setClassProp(className, prop, value) {
        var els = document.getElementsByClassName(className),
            i;
        for (i = 0; i < els.length; i++) {
            els[i].style[prop] = value;
        }
    }

    function preloadImages(images) {
        var img, i;
        for (i = 0; i < images.length; i++) {
            img = new Image();
            img.src = images[i];
        }
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