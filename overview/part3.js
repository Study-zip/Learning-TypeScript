"use strict";
const push = (config) => {
    if (typeof config === "string") {
        console.log(config);
    }
    else {
        console.log(config.path);
    }
};
const add = (a, b, c) => {
    if (c)
        return a + b + c;
    return a + b;
};
add(1, 2);
add(1, 2, 3);
