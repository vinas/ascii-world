// Visual effects and map changes triggered during play
function Effects() {

    const boom = dom.el('boom'),
        boomImg = dom.el('boomImg');

    init();

    return {
        explosion,
        turnFragilesToHoles,
        unHole
    };

    function init() {
        dom.setSize(boom, 10, 20);
    }

    function explosion(left, top) {
        boom.style.left = `${left}%`;
        boom.style.top = `${top - 8}%`;
        boom.style.display = 'block';
        boomImg.setAttribute('src', 'img/interactions/explosion01.gif');
        sounds.play('explosion');
        setTimeout(() => {
            boomImg.setAttribute('src', '');
            dom.hide(boom);
        }, 300);
    }

    // Level trigger action: fragile floor sections crumble into holes
    function turnFragilesToHoles(params) {
        dom.setClassProp('fragile', 'opacity', 1);
        for (const el of document.getElementsByClassName('fragile')) {
            dom.fade(el, setAsHole);
        }

        function setAsHole() {
            params.floorIndexes.forEach(idx => { mapArr[idx][3] = 'hole'; });
        }
    }

    // Restores crumbled fragile floor sections as solid floor
    function unHole(indexes) {
        dom.setClassProp('fragile', 'opacity', 0);
        for (const el of document.getElementsByClassName('fragile')) {
            const solidImg = el.classList.contains('single') ? 'floor02.png' : 'floor01.png';
            el.setAttribute('src', `img/map/floor/${solidImg}`);
            dom.unfade(el, setAsSolid);
        }

        function setAsSolid() {
            indexes.forEach(idx => { mapArr[idx][3] = 'solid'; });
        }
    }

}
