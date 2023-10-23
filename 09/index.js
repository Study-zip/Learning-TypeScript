// Chapter 9. 타입 제한자
// top 타입
// any 다시 보기
let anyValue;
anyValue = "Lucille Ball"; // Ok
anyValue = 123; // Ok
console.log(anyValue); // Ok
function greetComedian(name) {
    // 타입 오류 없음
    console.log(`Announcing ${name.toUppercase()}`);
}
greetComedian({ name: "Bea Arthur" });
// Runtime error: name.toUpperCase is not a function
// unknown
// Function greetComedian(name: unknown){
//     console.log(`Announcing ${name.toUppercase()}`); // Error
// }
function greetComedianSafety(name) {
    if (typeof name === "string") {
        console.log(`Announcing ${name.toUpperCase()}!`); // Ok
    }
    else {
        console.log(`Well, I'm off.`);
    }
}
greetComedianSafety("Betty White"); // Logs: 4
greetComedianSafety({}); // 로그 없음
// 타입 서술어
function isNumberOrString(value) {
    return ["number", "string"].includes(typeof value);
}
function logValueIfExists(value) {
    if (isNumberOrString(value)) {
        value: toString();
    }
    else {
        console.log(`Value does not exist:`, value);
    }
}
// 타입 서술어
// function typePredicate(input: WideType): input is NarrowType;
function isNumberOrString0(value) {
    return ["number", "string"].includes(typeof value);
}
function logValueIfExists0(value) {
    if (isNumberOrString0(value)) {
        // value: number | string의 타입
        value.toString(); //Ok
    }
    else {
        // value: null | undefined의 타입
        console.log("value does not exist:", value);
    }
}
function isStandupComedian(value) {
    return "routine" in value;
}
function workWithComedian(value) {
    if (isStandupComedian(value)) {
        // value: StandupComedian의 타입
        console.log(value.routine); // Ok
    }
    // value: Comedian의 타입
    //   console.log(value.routine); // Error
}
function isLongString(input) {
    return !!(input && input.length >= 7);
}
function workWithText(text) {
    if (isLongString(text)) {
        // text: string의 타입
        console.log("Long text:", text.length);
    }
    else {
        // text: undefined의 타입
        // console.log("Short text:", text?.length); // Error
    }
}
function getRating(ratings, key) {
    //   return ratings[key]; // Error
}
const ratings = { audience: 66, critic: 84 };
getRating(ratings, "audience"); // Ok
getRating(ratings, "not valid"); // 허용되지만 사용하면 안됨.
function getRating0(ratings, key) {
    return ratings[key]; // Ok
}
const ratings0 = { audience: 66, critic: 84 };
getRating0(ratings, "audience"); // Ok
// getRating0(ratings, "not valid"); // Error
function getCountKeyof(ratings, key) {
    return ratings[key]; // Ok
}
const ratings1 = { audience: 66, critic: 89 };
getCountKeyof(ratings1, "audience"); // Ok
// getCountKeyof(ratings1, "not valid"); // Error
const original = {
    medium: "movie",
    title: "Mean Girls",
};
let adaptation;
if (Math.random() > 0.5) {
    adaptation = Object.assign(Object.assign({}, original), { medium: "play" }); // Ok
}
else {
    //   adaptation = { ...original, medium: 2 }; // Error
}
const ratings2 = {
    imdb: 8.4,
    metacritic: 82,
};
function logRating(key) {
    console.log(ratings2[key]);
}
logRating("imdb"); // Ok
// logRating("invaild"); // Error
// 타입 어서션
const rawData = `["nami","nam"]`;
// 타입: any
JSON.parse(rawData);
// 타입: string[]
JSON.parse(rawData);
// 타입: [string, string]
JSON.parse(rawData);
// 타입: ["nami", "nam"]
JSON.parse(rawData);
// 포착된 오류 타입 어서션
try {
    // 오류를 발생시키는 코드
}
catch (error) {
    console.warn("Oh no!", error.message);
}
try {
    // 오류를 발생시키는 코드
}
catch (error) {
    console.warn("Oh no", error instanceof Error ? error.message : error);
}
