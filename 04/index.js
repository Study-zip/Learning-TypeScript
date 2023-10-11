"use strict";
// 04. 객체
const poet = {
    born: 1935,
    name: "Mary Oliver",
};
poet["born"]; // 타입 : number
poet.name; // 타입 : string
// poet.end;
let poetLater;
// Ok
poetLater = {
    born: 1935,
    name: "Mary Oliver",
};
let poetLater1;
// Ok
poetLater1 = {
    born: 1940,
    name: "Sara Readfla",
};
const hasBoth = {
    firstName: "Lucille",
    lastName: "Clifton",
};
// Ok: hasBoth는 string 타입의 firstName을 포함함
let withFirstName = hasBoth;
// Ok: hasBoth는 string 타입의 lastName을 포함함
let withLastName = hasBoth;
// Ok
const hasBoth1 = {
    first: "Sarojini",
    last: "Naidu",
};
// Ok: Poet의 필드와 일치함
const poetMatch = {
    born: 1928,
    name: "Maya Angelou",
};
// const extraProperty: Poet = {
//   activity: "walking",
//   born: 1935,
//   name: "Mary Oliver",
// };
const exsitingObject = {
    activity: "walking",
    born: 1934,
    name: "Mary Oliver",
};
const extraPropertyButOk = exsitingObject;
// Ok
const poemMatch = {
    author: {
        firstName: "Sylvia",
        lastName: "Plath",
    },
    name: "Lady Lazarus",
};
// Ok
const ok = {
    author: "Rita Dove",
    pages: 80,
};
// Ok: author는 undefined으로 제공됨
const hasRequired = {
    author: undefined,
};
// const missingRequired: Writers = {};
const poem1 = Math.random() > 0.5 //
    ? { name: "The Double Image", pages: 8 }
    : { name: "Her Kind", rhymes: true };
// 타입 :
// {
//     name: string;
//     pages: number;
//     rhymes?: undefined;
// }
// |
// {
//     name: string;
//     pages?: undefined;
//     rhymes: boolean;
// }
poem1.name; // string
poem1.pages; // number | undefined
poem1.rhymes; // booleans | undefined
const poem = Math.random() > 0.5
    ? { name: "The Double Image", pages: 46 }
    : { name: "Her kind", rhymes: true };
poem.name; // Ok
// poem.pages;
// poem.rhymes;
if ("pages" in poem) {
    poem.pages; // Ok : poem은 PoemWithPages로 좁혀짐
}
else {
    poem.rhymes; // Ok : poem은 PoemWithRhymes로 좁혀짐
}
const poem2 = Math.random() > 0.5
    ? { name: "The Double Image", pages: 46, type: "pages" }
    : { name: "Her kind", rhymes: true, type: "rhymes" };
if (poem2.type === "pages") {
    console.log(`It's got pages: ${poem2.pages}`); // Ok
}
else {
    console.log(`It's got rhymes: ${poem2.rhymes}`);
}
poem2.type; // 타입 : 'pages' | 'rhymes'
// Ok
const morningGlory = {
    author: "Fukuda Chiyo-ni",
    kigo: "Morning Glory",
    type: "haiku",
};
// let notNumber: NotPossible = 0;
// let notString: never = "";
