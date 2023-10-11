"use strict";
// 오브젝트 모양을 TS에게 설명해주기 위해서만 사용되는 키워드
const hj = {
    name: "nhj",
    nickname: "nami",
    score: 1,
    team: "green",
};
const who = {
    name: "no",
    nickname: "nonono",
    score: 999,
    team: "red",
};
const kjk = {
    heart: 60,
    eyes: 1.5,
    running: 3,
};
class Player1 {
    constructor(
    //
    firstName, lastName, health) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.health = health;
    }
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    sayHi(name) {
        return `Hello ${name}, My name is ${this.fullName}.`;
    }
}
