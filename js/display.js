function Display() {

    const ufo = document.getElementById('ufo'),
        alien = document.getElementById('alien'),
        pig = document.getElementById('pig'),
        bullet = document.getElementById('charShot'),
        ufoBullet = document.getElementById('ufoShot'),
        abductionRay = document.getElementById('abduction'),
        bigBoss = document.getElementById('bigBoss'),
        boom = document.getElementById('boom');

    this.jump = jump;
    this.mirrorObj = mirrorObj;
    this.shoot = shoot;
    this.setCharmanRight = setCharmanRight;
    this.setCharmanLeft = setCharmanLeft;
    this.clearBackground = clearBackground;
    this.fall = fall;
    this.setBackgroundImg = setBackgroundImg;
    this.handleCharmanImg = handleCharmanImg;
    this.showResetButton = showResetButton;
    this.ufoIn = ufoIn;
    this.ufoOut = ufoOut;
    this.ufoAttack01 = ufoAttack01;
    this.charShot = charShot;
    this.abduction = abduction;
    this.updateTime = updateTime;
    this.jumpingPig = jumpingPig;
    this.standingPig = standingPig;
    this.abductPig = abductPig;
    this.standingAlien = standingAlien;
    this.alienIn = alienIn;
    this.alienOutRight = alienOutRight;
    this.alienAttack01 = alienAttack01;
    this.alienOutLeft = alienOutLeft;
    this.bigBossIn = bigBossIn;
    this.bigBossOut = bigBossOut;
    this.bigBossRoutine = bigBossRoutine;
    this.charAt = charAt;
    this.turnFragilesToHoles = turnFragilesToHoles;
    this.unHole = unHole;
    this.dialogUfo = dialogUfo;
    this.showGame = showGame;
    this.addZero = addZero;
    this.freezeChar = freezeChar;
    this.unfreezeChar = unfreezeChar;
    this.moveElmRight = moveElmRight;
    this.levelScore = levelScore;
    this.imgColorOver = imgColorOver;
    this.imgColorOut = imgColorOut;

    init();

    return this;

    function init() {
        charDiv = document.getElementById('charman');
        charmanImg = document.getElementById('charmanImg');
        bkgLayer = document.getElementById('gameBrackground');

        setSize(charDiv, FLOORHORTOLERANCE, FLOORVERTTOLERANCE);
        setSize(bullet, CHARSHOTWIDTH, CHARSHOTHEIGHT);
        setSize(ufoBullet, UFOSHOTWIDTH, UFOSHOTHEIGHT);
        setSize(ufo, 20, 20);
        setSize(pig, 8, 10);
        setSize(alien, 4, 14);
        setSize(bigBoss, 20, 35);
        setSize(boom, 10, 20);
        bigBoss.health = 0;
    }

    function setSize(el, width, height) {
        el.style.width = `${width}%`;
        el.style.height = `${height}%`;
    }

    function imgColorOver(elmId) {
        document.getElementById(elmId).style.filter = 'invert(1)';
    }

    function imgColorOut(elmId) {
        document.getElementById(elmId).style.filter = 'invert(0)';
    }

    function freezeChar() {
        events.tapStop('btnRight');
        actions.canMove = false;
        actions.canJump = false;
        actions.canFire = false;
    }

    function unfreezeChar() {
        actions.canMove = true;
        actions.canJump = true;
        actions.canFire = true;
    }

    function showGame() {
        document.getElementById('gameElements').style.display = 'block';
        document.getElementById('startGame').style.display = 'none';
        setup.prepareSoundsForMobile();
    }

    function dialogUfo() {
        dialogs.start();
    }

    function unHole(indexes) {
        setup.setClassProp('fragile', 'opacity', 0);
        for (const el of document.getElementsByClassName('fragile')) {
            const solidImg = el.classList.contains('single') ? 'floor02.png' : 'floor01.png';
            el.setAttribute('src', `img/map/floor/${solidImg}`);
            unfade(el, setAsSolid);
        }

        function setAsSolid() {
            indexes.forEach(idx => { mapArr[idx][3] = 'solid'; });
        }
    }

    function turnFragilesToHoles(params) {
        setup.setClassProp('fragile', 'opacity', 1);
        for (const el of document.getElementsByClassName('fragile')) {
            fade(el, setAsHole);
        }

        function setAsHole() {
            params.floorIndexes.forEach(idx => { mapArr[idx][3] = 'hole'; });
        }
    }

    function charAt(params) {
        leftPos = params.left;
        topPos = params.top;
        at(charDiv, leftPos, topPos);
    }

    function bigBossRoutine(params) {
        let count = 0;
        bigBoss.health = 4;

        routine();

        function routine() {
            const tempLeft = Math.floor(Math.random() * 30),
                left = (count % 2 === 0) ? tempLeft : tempLeft + 50;

            bigBossIn({ left, top: 12, callback: () => setTimeout(stepDown, 100) });

            function stepDown() {
                if (!isAlive() || !gameOn) return finish();
                bigBossIn({ left, top: 31, startAt: 12, callback: () => setTimeout(attack, 130) });
            }

            function attack() {
                if (!isAlive() || !gameOn) return finish();
                bigBossShoot();
                bigBossOut(() => {
                    count++;
                    setTimeout(routine, 650);
                });
            }
        }

        function finish() {
            if (gameOn && params.callback) params.callback(params.args ? params.args : false);
        }

        function isAlive() {
            return calc.isVisible(bigBoss) && bigBoss.health > 0;
        }
    }

    function bigBossShoot(callback) {
        enemyFire(bigBoss, BASICMOVRATE, 23, callback);
    }

    function alienOutRight(callback) {
        moveElmRight(alien, 100, BASICMOVRATE * .6, callback);
    }

    function moveElmRight(el, target, moveRate, callback) {
        const top = calc.getCoord(el.style.top);
        let left = calc.getCoord(el.style.left);

        moveRight();

        function moveRight() {
            if (!calc.isVisible(el)) return;
            if (left <= target) {
                left += moveRate;
                at(el, left, top);
                setTimeout(moveRight, 5);
            } else {
                el.style.display = 'none';
                if (callback) callback();
            }
        }
    }

    function alienOutLeft(callback) {
        const top = calc.getCoord(alien.style.top);
        let left = calc.getCoord(alien.style.left);

        moveLeft();

        function moveLeft() {
            if (!calc.isVisible(alien)) return;
            if (left > -5) {
                left -= BASICMOVRATE * .6;
                at(alien, left, top);
                setTimeout(moveLeft, 5);
            } else {
                alien.style.display = 'none';
                if (callback) callback();
            }
        }
    }

    function alienIn(params) {
        let left = params.right ? -3 : 100;

        at(alien, left, params.top);

        moveAlien();

        function moveAlien() {
            if (!calc.isVisible(alien)) return;
            if (!params.right && left >= params.left) {
                left -= BASICMOVRATE * .6;
            } else if (params.right && left < params.left) {
                left += BASICMOVRATE * .6;
            } else {
                if (params.callback) params.callback();
                return;
            }
            at(alien, left, params.top);
            setTimeout(moveAlien, 5);
        }
    }

    function standingAlien(params) {
        at(alien, params.left, params.top);
        if (params.callback) params.callback();
    }

    function abductPig() {
        ufoIn({ left: centeredUfoLeft(calc.getCoord(pig.style.left)), top: 10 }, abduct, pig);
    }

    function abduction() {
        charmanImg.setAttribute('src', 'img/charman/charman-hands-up.png');
        ufoIn({ left: centeredUfoLeft(leftPos), top: 20 }, abduct, charDiv);
    }

    function centeredUfoLeft(targetLeft) {
        return targetLeft - (calc.getCoord(ufo.style.width) / 2) + (FLOORHORTOLERANCE / 2);
    }

    function abduct(abductee) {
        at(
            abductionRay,
            calc.getCoord(ufo.style.left) + 2.5,
            calc.getCoord(ufo.style.top) + calc.getCoord(ufo.style.height)
        );
        fade(abductee, abducted);
    }

    function fade(el, callback) {
        const opacity = parseFloat(el.style.opacity) - .02;
        if (opacity >= 0) {
            el.style.opacity = opacity;
            setTimeout(() => fade(el, callback), 20);
            return;
        }
        if (callback) callback(el);
    }

    function unfade(el, callback) {
        const opacity = parseFloat(el.style.opacity) + .02;
        if (opacity < 1) {
            el.style.opacity = opacity;
            setTimeout(() => unfade(el, callback), 20);
            return;
        }
        if (callback) callback(el);
    }

    function abducted(el) {
        abductionRay.style.display = 'none';
        setTimeout(() => {
            ufoOut();
            el.style.display = 'none';
            if (el.id === 'charman') setTimeout(levelScore, 1500);
        }, 100);
    }

    function standingPig(params) {
        at(pig, params.left, params.top);
        if (params.callback) params.callback();
    }

    function jumpingPig(jumpInfo) {
        const base = jumpInfo.top,
            jumpTop = Number.isInteger(jumpInfo.forceTop) ? jumpInfo.forceTop : base - 20;
        let top = base,
            dir = 'up';

        at(pig, jumpInfo.left, jumpInfo.top);
        jumping();

        function jumping() {
            if (top < jumpTop) {
                dir = 'down';
            } else if (top >= base) {
                pigJumpSound.play();
                dir = 'up';
            }
            top += (dir === 'up') ? -JUMPVARRATE : JUMPVARRATE;
            if (calc.isVisible(pig)) {
                moveVertically(pig, top);
                setTimeout(jumping, 10);
            }
        }
    }

    function jump() {
        const jumpTop = calc.jumpTop();
        let direction = 'up';

        handleJumpingImg();
        jumping();

        function jumping() {
            const base = calc.jumpFloorBase();
            if (topPos <= jumpTop) direction = 'down';
            topPos += (direction === 'up') ? -JUMPVARRATE : JUMPVARRATE;
            if (topPos >= base) {
                topPos = base;
                moveVertically(charDiv, topPos);
                actions.jumping = false;
                return;
            }
            moveVertically(charDiv, topPos);
            setTimeout(jumping, 10);
        }
    }

    function updateTime() {
        document.getElementById('time').innerHTML = `${timer} segs.`;
    }

    function charShot() {
        if (actions.shooting) return;

        const direction = actions.lastDirection,
            top = topPos + 6;
        let left = (direction === 'right') ? leftPos + FLOORHORTOLERANCE : leftPos - CHARSHOTWIDTH;

        at(bullet, left, top);
        actions.shooting = true;
        charArrowSound.play();

        moveBullet();

        function moveBullet() {
            if (actions.cancelShot) {
                cancelShooting();
                return;
            }
            const hit = calc.hitEnemy(bullet);
            if (hit) {
                explosion(left, top);
                if (hit.id !== 'bigBoss') {
                    hide(hit.id);
                } else {
                    bigBoss.health -= 1;
                    if (bigBoss.health <= 0) hide(hit.id);
                }
                cancelShooting();
                return;
            }
            if (direction === 'right' && left <= 100) {
                left += BASICMOVRATE * 2;
            } else if (direction === 'left' && left >= -2) {
                left -= BASICMOVRATE * 2;
            } else {
                cancelShooting();
                return;
            }
            bullet.style.left = `${left}%`;
            setTimeout(moveBullet, 5);
        }
    }

    function cancelShooting() {
        bullet.style.display = 'none';
        actions.shooting = false;
    }

    function alienAttack01(pos) {
        pos.callback = alienShot;
        alienIn(pos);
    }

    function ufoAttack01(pos) {
        ufoIn(pos, ufoShot);
    }

    function enemyFire(enemy, moveRate, relativeTop, callback) {
        if (!calc.isVisible(enemy)) return;

        const enemyLeft = calc.getCoord(enemy.style.left),
            isRight = leftPos > enemyLeft;
        let left = isRight ? enemyLeft + calc.getCoord(enemy.style.width) : enemyLeft;

        ufoLaserSound.play();
        at(ufoBullet, left, calc.getCoord(enemy.style.top) + relativeTop);
        if (callback) setTimeout(callback, 300);
        moveProjectile();

        function moveProjectile() {
            if (actions.cancelShot) {
                ufoBullet.style.display = 'none';
                return;
            }
            if (calc.areTouching(ufoBullet, charDiv) && !actions.swimming) {
                game.endGame('hit');
                return;
            }
            if (!isRight && left >= -2) {
                left -= moveRate;
            } else if (isRight && left < 100) {
                left += moveRate;
            } else {
                ufoBullet.style.display = 'none';
                if (callback) callback();
                return;
            }
            ufoBullet.style.left = `${left}%`;
            setTimeout(moveProjectile, 5);
        }
    }

    function alienShot() {
        enemyFire(alien, BASICMOVRATE, 9, alienOutRight);
    }

    function ufoShot() {
        enemyFire(ufo, BASICMOVRATE * .6, 10, ufoOut);
    }

    function bigBossIn(params) {
        elementVertIn(bigBoss, params.left, params.startAt || -20, params.top, params.callback, false);
    }

    function ufoIn(pos, callback, args) {
        if (ufo.style.display === 'none') {
            elementVertIn(ufo, pos.left, -20, pos.top, callback, args);
        }
    }

    function elementVertIn(el, left, top, target, callback, args) {
        at(el, left, top);
        goingDown();

        function goingDown() {
            if (top <= target) {
                top += BASICMOVRATE * 1.5;
                el.style.top = `${top}%`;
                setTimeout(goingDown, 5);
                return;
            }
            el.style.top = `${top}%`;
            if (callback) callback(args);
        }
    }

    function elementVertOut(el, moveRate, callback, args) {
        let top = calc.getCoord(el.style.top);
        goingUp();

        function goingUp() {
            if (top > -20) {
                top -= moveRate;
                el.style.top = `${top}%`;
                setTimeout(goingUp, 5);
            } else {
                hide(el.id);
                if (callback) callback(args);
            }
        }
    }

    function bigBossOut(callback) {
        elementVertOut(bigBoss, BASICMOVRATE * 2, callback, false);
    }

    function ufoOut() {
        if (ufo.style.display === 'block') {
            elementVertOut(ufo, BASICMOVRATE * 3, false, false);
        }
    }

    function showResetButton() {
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('gameTime').innerHTML = millisToMinutesAndSeconds(gameTime);
        document.getElementById('lastStage').innerHTML = currMap + 1;
        updateTime();
    }

    function handleCharmanImg() {
        if (actions.swimming) {
            handleSwimmingImg();
        } else if (!actions.falling && (commands.right || commands.left) && (actions.jumping || !actions.firing)) {
            handleRunningImg();
        } else if (!actions.jumping && !actions.firing && !actions.falling) {
            charmanIdle();
        }
    }

    function fall(callback) {
        if (actions.falling) return;

        actions.falling = true;
        const target = (mapArr[floorIndex][3] !== 'hole') ? FLOORS[mapArr[floorIndex][2]] - FLOORVERTTOLERANCE : 120;
        setTimeout(() => charmanImg.setAttribute('src', 'img/charman/charman-hands-up.png'), 20);
        falling();

        function falling() {
            if (topPos <= target) {
                topPos += JUMPVARRATE;
                moveVertically(charDiv, topPos);
                setTimeout(falling, 5);
            } else {
                moveVertically(charDiv, target);
                actions.falling = false;
                if (callback) callback();
            }
        }
    }

    function setBackgroundImg() {
        const image = (currMap % 2 === 0) ? level.bkgdImage1 : level.bkgdImage2;
        bkgLayer.style.backgroundImage = `url('img/map/${image}')`;
    }

    function clearBackground() {
        for (const el of [...document.getElementsByClassName('floor')]) el.remove();
    }

    function setCharmanLeft() {
        charDiv.style.left = '-3%';
        leftPos = -3;
        floorIndex = 0;
    }

    function setCharmanRight() {
        charDiv.style.left = '97%';
        leftPos = 95;
    }

    function charmanIdle() {
        charmanImg.setAttribute('src', 'img/charman/charman-01.png');
    }

    function shoot(callback) {
        charmanImg.setAttribute('src', 'img/charman/charman-bow.gif');
        if (callback) setTimeout(callback, 300);
    }

    function handleJumpingImg() {
        setCharmanSprite('img/charman/charman-jump.gif', '100%', '100%', '0%');
        setCharmanBackToIdle();
    }

    function mirrorObj(el, scale) {
        el.style.transform = `scaleX(${scale})`;
    }

    function setCharmanBackToIdle() {
        if (gameOn && !actions.jumping) {
            if (calc.isUserOnWater()) {
                handleSwimmingImg();
                return;
            }
            charmanIdle();
            setTimeout(setCharmanBackToIdle, 50);
        }
    }

    function handleRunningImg() {
        if (!actions.jumping && charmanImg.getAttribute('src') !== 'img/charman/charman-run.gif') {
            setCharmanSprite('img/charman/charman-run.gif', '100%', '100%', '0%');
        }
    }

    function handleSwimmingImg() {
        if (!actions.jumping && charmanImg.getAttribute('src') !== 'img/charman/charman-swim.gif') {
            setCharmanSprite('img/charman/charman-swim.gif', '160%', '60%', '85%');
        }
    }

    function setCharmanSprite(src, width, height, paddingTop) {
        charmanImg.setAttribute('src', src);
        charmanImg.style.width = width;
        charmanImg.style.height = height;
        charmanImg.style.paddingTop = paddingTop;
    }

    function hide(elemId) {
        document.getElementById(elemId).style.display = 'none';
    }

    function millisToMinutesAndSeconds(millis) {
        const date = new Date(millis);
        return `${date.getUTCMinutes()}:${addZero(date.getUTCSeconds())}:${date.getUTCMilliseconds()}`;
    }

    function addZero(i) {
        return (i < 10) ? `0${i}` : i;
    }

    function at(el, left, top) {
        if (!el) return;
        el.style.opacity = 1;
        if (typeof left === 'number') el.style.left = `${left}%`;
        if (typeof top === 'number') el.style.top = `${top}%`;
        el.style.display = 'block';
    }

    function moveVertically(el, top) {
        if (el && typeof top === 'number') el.style.top = `${top}%`;
    }

    function levelScore() {
        document.getElementById('levelScoreTime').innerHTML = millisToMinutesAndSeconds(gameTime);
        document.getElementById('levelScoreStage').innerHTML = currMap + 1;
        document.getElementById('gameElements').style.display = 'none';
        document.getElementById('levelScore').style.display = 'block';
    }

    function explosion(left, top) {
        const boomImg = document.getElementById('boomImg');
        boom.style.left = `${left}%`;
        boom.style.top = `${top - 8}%`;
        boom.style.display = 'block';
        boomImg.setAttribute('src', 'img/interactions/explosion01.gif');
        explosionSound.play();
        setTimeout(() => {
            boomImg.setAttribute('src', '');
            boom.style.display = 'none';
        }, 300);
    }

}
