function Dialogs() {

    const balloon = document.getElementById('dialogBalloon'),
        charDiv = document.getElementById('charman'),
        pig = document.getElementById('pig');

    const PIG_MEETING = [
            [pig, "Hey, wait a moment! DON'T SHOOT!"],
            [pig, 'I got abducted last level, man...'],
            [pig, 'Did you see it?'],
            [charDiv, '<br/>Yes...'],
            [pig, "Cool, wasn't it? =D"],
            [charDiv, '<br/>Yes...'],
            [pig, "Don't be shy. Come closer..."]
        ],
        PIG_ESCAPE = [
            [pig, 'How did you get here?'],
            [charDiv, 'I was also abducted.'],
            [pig, 'Cool!! =D'],
            [charDiv, "Wait, how come you're a talking pig??"],
            [pig, 'Microchips in my head, dude.'],
            [charDiv, '?? =O'],
            [pig, "The aliens implanted'em."],
            [pig, 'I guess they wanted to communicate,'],
            [pig, 'or something...'],
            [charDiv, '...cool... I guess! =S'],
            [pig, '...'],
            [charDiv, '...'],
            [pig, '...so, wanna get out of this shit?'],
            [charDiv, 'Well, sure!'],
            [pig, 'Follow me. I know the way...'],
            [pig, 'Just be careful not to touch me.'],
            [pig, 'They made me radioactive as well...']
        ];

    this.start = start;
    this.dialog021007 = dialog021007;

    return this;

    function start() {
        display.freezeChar();
        playDialog(PIG_MEETING, display.unfreezeChar);
    }

    function dialog021007() {
        display.freezeChar();
        playDialog(PIG_ESCAPE, endDialog);
    }

    // Shows each [speaker, text] line in turn; clicking the balloon advances
    function playDialog(lines, onEnd) {
        showLine(0);

        function showLine(idx) {
            const [speaker, text] = lines[idx],
                isLast = idx === lines.length - 1;
            dialogBalloon(speaker, text, isLast ? onEnd : () => showLine(idx + 1));
        }
    }

    function endDialog() {
        hideBalloon();
        display.unfreezeChar();
        setTimeout(() => {
            display.moveElmRight(pig, 100, BASICMOVRATE * .3, () => { pig.style.display = 'none'; });
        }, 500);
    }

    function dialogBalloon(el, txt, callback) {
        const elLeft = calc.getCoord(el.style.left);
        if (el.classList.contains('enemy')) {
            balloon.style.backgroundImage = "url('img/interactions/dialog-balloon-right.png')";
            balloon.style.left = `${elLeft - 27}%`;
        } else {
            balloon.style.backgroundImage = "url('img/interactions/dialog-balloon-left.png')";
            balloon.style.left = `${elLeft + FLOORHORTOLERANCE}%`;
        }
        balloon.style.top = `${calc.getCoord(el.style.top) - 45}%`;
        balloon.innerHTML = txt;
        balloon.onclick = callback || null;
        balloon.style.display = 'block';
    }

    function hideBalloon() {
        balloon.style.display = 'none';
    }

}
