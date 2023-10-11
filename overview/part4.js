"use strict";
const superPrint = (a) => a[0];
const v = superPrint([1, 2, 3, 4]);
const g = superPrint([true, true, false]);
const l = superPrint(["a", "b", "c"]);
const t = superPrint(["a", "b", "c", false, 1]);
function superPrint0(a) {
    return a[0];
}
const v0 = superPrint0([false, true]);
const g0 = superPrint0([66, 77, 5]);
