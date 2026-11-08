// Generic DOM helpers. All positions/sizes are percentages of the game area.
function Dom() {

    return {
        el,
        at,
        hide,
        moveVertically,
        setSize,
        setClassProp,
        mirror,
        fade,
        unfade
    };

    function el(id) {
        return document.getElementById(id);
    }

    // Shows an element (fully opaque) at the given position
    function at(element, left, top) {
        if (!element) return;
        element.style.opacity = 1;
        if (typeof left === 'number') element.style.left = `${left}%`;
        if (typeof top === 'number') element.style.top = `${top}%`;
        element.style.display = 'block';
    }

    function hide(elementOrId) {
        const element = (typeof elementOrId === 'string') ? el(elementOrId) : elementOrId;
        element.style.display = 'none';
    }

    function moveVertically(element, top) {
        if (element && typeof top === 'number') element.style.top = `${top}%`;
    }

    function setSize(element, width, height) {
        element.style.width = `${width}%`;
        element.style.height = `${height}%`;
    }

    function setClassProp(className, prop, value) {
        for (const element of document.getElementsByClassName(className)) {
            element.style[prop] = value;
        }
    }

    // 1 = facing right (original), -1 = mirrored
    function mirror(element, scale) {
        element.style.transform = `scaleX(${scale})`;
    }

    function fade(element, callback) {
        const opacity = parseFloat(element.style.opacity) - .02;
        if (opacity >= 0) {
            element.style.opacity = opacity;
            setTimeout(() => fade(element, callback), 20);
            return;
        }
        if (callback) callback(element);
    }

    function unfade(element, callback) {
        const opacity = parseFloat(element.style.opacity) + .02;
        if (opacity < 1) {
            element.style.opacity = opacity;
            setTimeout(() => unfade(element, callback), 20);
            return;
        }
        if (callback) callback(element);
    }

}
