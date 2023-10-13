let valueLater;
// OK
valueLater = {
    born: 1935,
    name: "sara",
};
// OK
const okay = {
    pages: 900,
};
const missing = {
    pages: 330,
};
function read(page) {
    // Ok: text 속성을 수정하지 않고 읽는 것
    console.log(page.text);
    //   page.text += "!"; // Error
}
const pageIsh = {
    text: "Hello, world!",
};
// Ok: pageIsh는 Page 객체가 아니라 text가 있는, 유추된 객체 타입이다.
pageIsh.text += "!";
// Ok: pageIsh의 더 구체적인 버전인 Page를 읽는다.
read(pageIsh);
const hasBoth0 = {
    property: () => "",
    method() {
        return "";
    },
};
hasBoth0.property(); // Ok
hasBoth0.method(); // Ok
// 타입 : (input: string) => number
const typedFunctionAlias = (input) => input.length; // Ok
// 타입 : (input: string) => number
const typedCallSignature = (input) => input.length; // Ok
let hasCallCount;
function keepsTrackOfCalls() {
    keepsTrackOfCalls.count += 1;
    console.log(`I've been called ${keepsTrackOfCalls.count} times!`);
}
keepsTrackOfCalls.count = 0;
hasCallCount = keepsTrackOfCalls; // Ok
function doesNotHaveCount() {
    console.log("No idea!");
}
const counts = {};
counts.apple = 0; // Ok
counts.banana = 1; // Ok
const publishDates = {
    Frankenstein: new Date("1 January 1919"),
};
publishDates.Frankenstein; // 타입 : Date
console.log(publishDates.Frankenstein.toString()); // Ok
publishDates.Beloved; //  타입은 Date이지만 런타임 값은 undefined
console.log(publishDates.Beloved.toString());
// Ok
const novels = {
    Outlander: 1991,
    Orronoko: 1666,
};
const CorrectPreface = {
    preface: 0,
    night: 1,
    shopping: 5,
};
// Ok
const mixesNumbersAndStrings = {
    0: "",
    key1: "",
    key2: undefined,
};
let myNovel;
//Ok
myNovel = {
    author: {
        name: "Jane Austen",
    },
    setting: {
        place: "England",
        year: 1812,
    },
};
// Ok
let myNovella = {
    pages: 195,
    title: "Ethan Frome",
};
function useGivesBoth(instance) {
    instance.giveEither(); // 타입: number | string
    instance.giveNumber(); // 타입: number
    instance.giveString(); // 타입: string
}
