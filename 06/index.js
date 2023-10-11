"use strict";
// Chapter 6. 배열
const warriors0 = ["Artemisia", "Bousdica"];
// Ok: "Zenobia"의 타입은 string
warriors0.push("Zenobia");
// warriors0.push(true);
// 배열 타입
let arrayOfNumbers;
arrayOfNumbers = [4, 6, 15, 61, 64, 77];
// 배열과 함수 타입
// 타입은 string 배열을 반환하는 함수
let createStrings;
// 타입은 각각의 string을 반환하는 함수 배열
let stringCreators;
// 유니언 타입 배열
// 타입은 string 또는 number의 배열
let stringOrArrayOfNumbers;
// 타입은 각각 number 또는 string인 요소의 배열
let arrayOfStringOrNumbers;
// 타입: (string | undefined)[]
const namesMaybe = ["Aqualtune", "Blenda", undefined];
// any 배열의 진화
// 타입 : any[]
let values = [];
// 타입 : string[]
values.push("");
// 타입 : (number | string)[]
values[0] = 0;
// 다차원 배열
let arrayOfArraysOfNumbers;
arrayOfArraysOfNumbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];
// 배열 멤버
const defenders = ["Clarenxa", "Dina"];
// 타입: string
const defender = defenders[0];
const soldiersOrDates = ["Deborah Sampson", new Date(1999, 9, 9)];
// 타입: string | Date
const soldierOrDate = soldiersOrDates[0];
// 불안정한 멤버
function withElements(elements) {
    console.log(elements[9000].length);
}
withElements([`It's`, `over`]);
// 스프레드와 나머지 매개변수
// 스프레드
// 타입: string[]
const soldiers = ["군인1", "군인2", "군인3"];
// 타입: number[]
const soldierAges = [25, 56, 23];
// 타입: (string | number)[]
const conjoined = [...soldiers, ...soldierAges];
// 나머지 매개변수 스프레드
function logWarriors(greeting, ...names) {
    for (const name of names) {
        console.log(`${greeting}, ${name}!`);
    }
}
const warriors = ["Cathay Williams", "Lozen", "Nzinga"];
logWarriors("Hello", ...warriors);
const birthYears = [1844, 1840, 1583];
// logWarriors("Born in", ...birthYears);
// 튜플
let yearAndWarrior;
yearAndWarrior = [530, "Tom"]; // Ok
// yearAndWarrior = [false, "Tom"];
// yearAndWarrior = [530];
// year 타입: number
// warrior 타입: string
let [year, warrior] = Math.random() > 0.5 //
    ? [340, "Archidamia"]
    : [1929, "Rani of Jhnasi"];
// 튜풀 할당 가능성
// 타입: (boolean | number)[]
const pairLoose = [false, 123];
// const pairTupleLoose: [boolean, number] = pairLoose;
const tupleThree = [false, 1583, "Nzinga"];
const tupleTwoExact = [tupleThree[0], tupleThree[1]];
// const tupleTwoExtra: [boolean, number] = tupleThree;
// 나머지 매개변수로서의 튜플
function logPair(name, value) {
    console.log(`${name} has ${value}`);
}
const pairArray = ["Amage", 1];
// logPair(...pairArray);
const pairTupleIncorrect = [1, "Amage"];
// logPair(...pairTupleIncorrect);
const pairTupleCorrect = ["Amage", 1];
logPair(...pairTupleCorrect);
function logTrio(name, value) {
    console.log(`${name} has ${value[0]} ${value[1]}`);
}
const trios = [
    ["A", [1, true]],
    ["B", [2, false]],
    ["C", [3, true]],
];
trios.forEach((trio) => logTrio(...trio)); // Ok
// trios.forEach(logTrio);
// 튜플 추론
// 반환 타입: (string | number)[]
function firstCharAndSize(input) {
    return [input[0], input.length];
}
// firstChar 타입: string | number
// size 타입: string | number
const [firstChar0, size0] = firstCharAndSize("Cudit");
// 명시적 튜플 타입
// 반환 타입: [string, number]
function firstCharAndSizeExplicit(input) {
    return [input[0], input.length];
}
//firstChar 타입: string
// size 타입: number
const [firstChar1, size1] = firstCharAndSizeExplicit("Cathay Williams");
// const 어서션
// 타입: (string | number)[]
const unionArray = [1134, "Me"];
// 타입: readonly [11, "Tom"]
const readonlyTuple = [11, "Tom"];
const pairMutable = [33, "Tim"];
pairMutable[0] = 122; // Ok
// const pairAlsoMutable: [number, string] = [33, "Tim"] as const;
const pairConst = [1, "Bany"];
// pairConst[0] = 2;
// 반환 타입: readonly [string, number]
function firstCharAndSizeAsConst(input) {
    return [input[0], input.length];
}
// firstChar 타입: string
// size 타입: number
const [firstChar, size] = firstCharAndSizeAsConst("Ching Shi");
