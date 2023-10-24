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
// 타입 유추: Date | undefined
let maybeDate = Math.random() > 0.5 ? undefined : new Date();
// 타입이 Date라고 간주됨
maybeDate;
// 타입이 Date라고 간주됨
maybeDate;
const seasonCounts = new Map([
    ["I Love Lucy", 6],
    ["The Golden Girls", 7],
]);
// 타입: string | undefined
const maybeValue = seasonCounts.get("I Love Lucy");
// console.log(maybeValue.toUpperCase()); // Error
// 타입: string
const knownValue = seasonCounts.get("The Golden Girls").toString();
console.log(knownValue.toUpperCase());
const seasonCounts0 = new Map([
    ["I Love Lucy", 6],
    ["The Golden Girls", 7],
]);
// 타입: string
const knownValue0 = seasonCounts0.get("I Love Lucy").toString;
// const declared: Entertainer = {
//   name: "Moms Mabley",
// };
const asserted = {
    name: "Moms Mabley",
}; // 허용되지만 런타임 시 오류 발생
// 다음 구문은 런타임 시 다음 오류로 인해 정상적으로 작동되지 않음
// console.log(declared.acts.join(", "));
console.log(asserted.acts.join(", "));
// 어서션 할당 가능성
// let myValue = "Stella" as number; // Error
// const 어서션
// 타입: (number | string)[]
[0, ""];
// 타입: readonly [0, '']
[0, ""];
// 리터럴에서 원시 타입으로
// 타입: () => string
const getName = () => "Maria Bamford";
// 타입: () => "Maria Bamford"
const getNameConst = () => "Maria Bamford";
function tellJoke(joke) {
    if (joke.style === "one-liner") {
        console.log(joke.quote);
    }
    else {
        console.log(joke.quote.split("\n"));
    }
}
// 타입 : { quote: string; style: "one-liner"}
const narrowJoke = {
    quote: "If you stay alive for no other reason do it for spite.",
    style: "one-liner",
};
tellJoke(narrowJoke); // Ok
// 타입: { quote: string; style: string }
const wideObject = {
    quote: "Time files when you are anxious!",
    style: "one-liner",
};
// tellJoke(wideObject);// Error
// 읽기 전용 객체
function describePreference(preference) {
    switch (preference) {
        case "maybe":
            return "I suppose...";
        case "no":
            return "No thanks.";
        case "yes":
            return "Yes Please!";
    }
}
// 타입: { movie: string, standup: string }
const preferenceMutable = {
    movie: "maybe",
    standup: "yes",
};
// describePreference(preferenceMutable.movie); // Error
preferenceMutable.movie = "no"; // Ok
// 타입: readonly { readonly movie: "maybe", readonly standup: "yes" }
const preferenceReadonly = {
    movie: "maybe",
    standup: "yes",
};
describePreference(preferenceReadonly.movie); // Ok
// preferenceReadonly.movie = "no"; // Error
