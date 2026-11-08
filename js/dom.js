// Generic DOM helpers. All positions/sizes are percentages of the game area.
export function el(id) {
    return document.getElementById(id);
}

// Shows an element (fully opaque) at the given position
export function at(element, left, top) {
    if (!element) return;
    element.style.opacity = 1;
    if (typeof left === 'number') element.style.left = `${left}%`;
    if (typeof top === 'number') element.style.top = `${top}%`;
    element.style.display = 'block';
}

export function hide(elementOrId) {
    const element = (typeof elementOrId === 'string') ? el(elementOrId) : elementOrId;
    element.style.display = 'none';
}

export function moveVertically(element, top) {
    if (element && typeof top === 'number') element.style.top = `${top}%`;
}

export function setSize(element, width, height) {
    element.style.width = `${width}%`;
    element.style.height = `${height}%`;
}

export function setClassProp(className, prop, value) {
    for (const element of document.getElementsByClassName(className)) {
        element.style[prop] = value;
    }
}

// 1 = facing right (original), -1 = mirrored
export function mirror(element, scale) {
    element.style.transform = `scaleX(${scale})`;
}

export function fade(element, callback) {
    const opacity = parseFloat(element.style.opacity) - .02;
    if (opacity >= 0) {
        element.style.opacity = opacity;
        setTimeout(() => fade(element, callback), 20);
        return;
    }
    if (callback) callback(element);
}

export function unfade(element, callback) {
    const opacity = parseFloat(element.style.opacity) + .02;
    if (opacity < 1) {
        element.style.opacity = opacity;
        setTimeout(() => unfade(element, callback), 20);
        return;
    }
    if (callback) callback(element);
}
