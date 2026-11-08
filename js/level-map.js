// Renders the current map: background, floor tiles and HUD stage info.
// Each map section is [image, 'single'|'double' width, floor height index, 'solid'|'hole'|'liquid'].
function LevelMap() {

    init();

    return {
        load,
        hideHidables
    };

    function init() {
        bkgLayer = dom.el('gameBrackground');
    }

    function load() {
        const maps = level.loadMapArr();
        let floorPos = 0;

        dom.el('stage').innerHTML = `${currMap + 1} / ${maps.length}`;
        dom.el('level').innerHTML = level.current;

        mapIndexArray = [];
        mapArr = maps[currMap];

        setBackgroundImg();
        clearFloor();

        mapArr.forEach(([image, width, floor]) => {
            const classes = image.includes('fragile') ? `floor fragile ${width}` : `floor ${width}`;
            bkgLayer.innerHTML += `<img class="${classes}" style="left: ${floorPos}%; top: ${FLOORS[floor]}%" src="img/map/floor/${image}" />`;
            floorPos += (width === 'single') ? SINGLEBLOCK : DOUBLEBLOCK;
            mapIndexArray.push(floorPos);
        });
    }

    // Hides every enemy/projectile/effect element (on reset and map change)
    function hideHidables() {
        dom.setClassProp('hidable', 'display', 'none');
    }

    function setBackgroundImg() {
        const image = (currMap % 2 === 0) ? level.bkgdImage1 : level.bkgdImage2;
        bkgLayer.style.backgroundImage = `url('img/map/${image}')`;
    }

    function clearFloor() {
        for (const el of [...document.getElementsByClassName('floor')]) el.remove();
    }

}
