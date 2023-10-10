type Nickname = string;
type Score = number;
type Friends = Array<string>;
type Team = "red" | "blue" | "green";

interface Student {
  nickname: Nickname;
  score: Score;
  team: Team;
}
// 오브젝트 모양을 TS에게 설명해주기 위해서만 사용되는 키워드

const hj: Student = {
  name: "nhj",
  nickname: "nami",
  score: 1,
  team: "green",
};

interface Person {
  readonly name: string;
}

interface Student extends Person {
  name: string;
}

const who: Student = {
  name: "no",
  nickname: "nonono",
  score: 999,
  team: "red",
};

interface health {
  heart: number;
}
interface health {
  eyes: number;
}
interface health {
  running: number;
}

const kjk: health = {
  heart: 60,
  eyes: 1.5,
  running: 3,
};

// abstract class User1 {
//   constructor(
//     //
//     protected firstName: string,
//     protected lastName: string
//   ) {}
//   abstract sayHi(name: string): string;
//   abstract fullName(): string;
// }

// class Player1 extends User1 {
//   fullName() {
//     return `${this.firstName} ${this.lastName}`;
//   }
//   sayHi(name: string) {
//     return `Hello, ${name}. My name is ${this.fullName}`;
//   }
// }

interface User1 {
  firstName: string;
  lastName: string;
  sayHi(name: string): string;
  fullName(): string;
}
interface Human {
  health: number;
}
class Player1 implements User1, Human {
  constructor(
    //
    public firstName: string,
    public lastName: string,
    public health: number
  ) {}
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  sayHi(name: string) {
    return `Hello ${name}, My name is ${this.fullName}.`;
  }
}
