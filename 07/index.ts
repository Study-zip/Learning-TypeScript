// Chapter 7. interface
// 타입 별칭 vs interface
type LP = {
  born: number;
  name: string;
};

interface LP0 {
  born: number;
  name: string;
}

let valueLater: LP;

// OK
valueLater = {
  born: 1935,
  name: "sara",
};

// valueLater = 'Emily' // Error

// valueLater = {
//     born: true, // Error
//     name: "sara"
// }

// 속성타입
// 선택적 속성
interface Book1 {
  author?: string;
  pages: number;
}

// OK
const okay: Book1 = {
  pages: 900,
};

const missing: Book1 = {
  pages: 330,
};

// 읽기 전용 속성
interface Page {
  readonly text: string;
}

function read(page: Page) {
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

// 함수와 메서드
// 인터페이스 멤버 함수로 선언하기

interface HasBothFunctionTypes {
  property: () => string;
  method(): string;
}

const hasBoth0: HasBothFunctionTypes = {
  property: () => "",
  method() {
    return "";
  },
};

hasBoth0.property(); // Ok
hasBoth0.method(); // Ok

interface OptionalReadonlyFunctions {
  optionalProperty?: () => string;
  optionalMethod?(): string;
}

// 호출 시그니처
type FunctionAlias = (input: string) => number;

interface CallSignature {
  (input: string): number;
}

// 타입 : (input: string) => number
const typedFunctionAlias: FunctionAlias = (input) => input.length; // Ok

// 타입 : (input: string) => number
const typedCallSignature: CallSignature = (input) => input.length; // Ok

interface FunctionWithCount {
  count: number;
  (): void;
}

let hasCallCount: FunctionWithCount;

function keepsTrackOfCalls() {
  keepsTrackOfCalls.count += 1;
  console.log(`I've been called ${keepsTrackOfCalls.count} times!`);
}

keepsTrackOfCalls.count = 0;

hasCallCount = keepsTrackOfCalls; // Ok

function doesNotHaveCount() {
  console.log("No idea!");
}

// hasCallCount = doesNotHaveCount; // Error

// 인덱스 시그니처
interface WordCounts {
  [i: string]: number;
}

const counts: WordCounts = {};

counts.apple = 0; // Ok
counts.banana = 1; // Ok

// counts.cherry = false; // Error

interface DatesByName {
  [i: string]: Date;
}

const publishDates: DatesByName = {
  Frankenstein: new Date("1 January 1919"),
};

publishDates.Frankenstein; // 타입 : Date
console.log(publishDates.Frankenstein.toString()); // Ok

publishDates.Beloved; //  타입은 Date이지만 런타임 값은 undefined
console.log(publishDates.Beloved.toString());
// 타입시스템에서는 오류가 나지 않지만 실제 런타임에서는 오류가 발생함.

// 속성과 인덱스 시그니처 혼합
interface HistoricalNovels {
  Orronoko: number;
  [i: string]: number;
}

// Ok
const novels: HistoricalNovels = {
  Outlander: 1991,
  Orronoko: 1666,
};

// Error
// const missingOrronoko: HistoricalNovels = {
//   Outlander: 1991,
// };

interface ChapterStarts {
  preface: 0;
  [i: string]: number;
}

const CorrectPreface: ChapterStarts = {
  preface: 0,
  night: 1,
  shopping: 5,
};

// const wrongPreface: ChapterStarts = {
//   preface: 1, // Error
// };

// 숫자 인덱스 시그니처
// Ok
interface MoreNarrowNumbers {
  [i: number]: string;
  [i: string]: string | undefined;
}
// Ok
const mixesNumbersAndStrings: MoreNarrowNumbers = {
  0: "",
  key1: "",
  key2: undefined,
};

interface MoreNarrowStrings {
  // [i: number]: string | undefined; // Error
  [i: string]: string;
}

// 중첩 인터페이스
interface Novel {
  author: {
    name: string;
  };
  setting: Setting;
}

interface Setting {
  place: string;
  year: number;
}

let myNovel: Novel;

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

// myNovel = {
//   author: {
//     name: "Emily Bronte",
//   },
//   setting: {
//     place: "West Yorkshire" // Error
//   }
// };

interface Writing1 {
  title: string;
}

interface Novella extends Writing1 {
  pages: number;
}

// Ok
let myNovella: Novella = {
  pages: 195,
  title: "Ethan Frome",
};

// let missingPages: Novella = {
//   title: "The Awakening", // Error
// };

// let missingProperty: Novella = {
//   pages: 300,
//   strategy: "baseline", // Error
//   style: "Naturalism",
// };

// 재정의된 속성
interface WithNullableName {
  name: string | null;
}

interface WithNonNullableName extends WithNullableName {
  name: string;
}

// interface WithNumericName extends WithNullableName {
//   name: number | string; // Error
// }

// 다중 인터페이스 확장
interface GivesNumber {
  giveNumber(): number;
}
interface GivesString {
  giveString(): string;
}

interface GivesBothAndEither extends GivesNumber, GivesString {
  giveEither(): number | string;
}

function useGivesBoth(instance: GivesBothAndEither) {
  instance.giveEither(); // 타입: number | string
  instance.giveNumber(); // 타입: number
  instance.giveString(); // 타입: string
}

// 인터페이스 병합
interface Merged {
  fromFirst: string;
}
interface Merged {
  fromSecond: number;
}

// 다음과 같음
// interface Merged {
//   fromFirst: string;
//   fromSecond: number;
// }

// 이름이 충돌되는 멤버
interface MergedProperties {
  same: (input: boolean) => string;
  diffrent: (input: string) => string;
}

// interface MergedProperties {
//   same: (input: boolean) => string; // Ok
//   diffrent: (input: number) => string; // Error
// }

interface MergedMethods {
  diffrent(input: string): string;
}
interface MergedMethods {
  different(input: number): string; // Ok
}
