// Chapter 9. 타입 제한자
// top 타입
// any 다시 보기
let anyValue: any;
anyValue = "Lucille Ball"; // Ok
anyValue = 123; // Ok

console.log(anyValue); // Ok

function greetComedian(name: any) {
  // 타입 오류 없음
  console.log(`Announcing ${name.toUppercase()}`);
}

greetComedian({ name: "Bea Arthur" });
// Runtime error: name.toUpperCase is not a function

// unknown

// Function greetComedian(name: unknown){
//     console.log(`Announcing ${name.toUppercase()}`); // Error
// }

function greetComedianSafety(name: unknown) {
  if (typeof name === "string") {
    console.log(`Announcing ${name.toUpperCase()}!`); // Ok
  } else {
    console.log(`Well, I'm off.`);
  }
}

greetComedianSafety("Betty White"); // Logs: 4
greetComedianSafety({}); // 로그 없음

// 타입 서술어
function isNumberOrString(value: unknown) {
  return ["number", "string"].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
  if (isNumberOrString(value)) {
    value: toString();
  } else {
    console.log(`Value does not exist:`, value);
  }
}

// 타입 서술어
// function typePredicate(input: WideType): input is NarrowType;

function isNumberOrString0(value: unknown): value is number | string {
  return ["number", "string"].includes(typeof value);
}

function logValueIfExists0(value: number | string | null | undefined) {
  if (isNumberOrString0(value)) {
    // value: number | string의 타입
    value.toString(); //Ok
  } else {
    // value: null | undefined의 타입
    console.log("value does not exist:", value);
  }
}

interface Comedian {
  funny: boolean;
}

interface StandupComedian extends Comedian {
  routine: string;
}

function isStandupComedian(value: Comedian): value is StandupComedian {
  return "routine" in value;
}

function workWithComedian(value: Comedian) {
  if (isStandupComedian(value)) {
    // value: StandupComedian의 타입
    console.log(value.routine); // Ok
  }

  // value: Comedian의 타입
  //   console.log(value.routine); // Error
}

function isLongString(input: string | undefined): input is string {
  return !!(input && input.length >= 7);
}

function workWithText(text: string | undefined) {
  if (isLongString(text)) {
    // text: string의 타입
    console.log("Long text:", text.length);
  } else {
    // text: undefined의 타입
    // console.log("Short text:", text?.length); // Error
  }
}

// 타입 연산자
interface Ratings {
  audience: number;
  critic: number;
}

function getRating(ratings: Ratings, key: string) {
  //   return ratings[key]; // Error
}

const ratings: Ratings = { audience: 66, critic: 84 };

getRating(ratings, "audience"); // Ok
getRating(ratings, "not valid"); // 허용되지만 사용하면 안됨.

function getRating0(ratings: Ratings, key: "audience" | "critic"): number {
  return ratings[key]; // Ok
}

const ratings0: Ratings = { audience: 66, critic: 84 };

getRating0(ratings, "audience"); // Ok
// getRating0(ratings, "not valid"); // Error

function getCountKeyof(ratings: Ratings, key: keyof Ratings): number {
  return ratings[key]; // Ok
}

const ratings1: Ratings = { audience: 66, critic: 89 };

getCountKeyof(ratings1, "audience"); // Ok
// getCountKeyof(ratings1, "not valid"); // Error

const original = {
  medium: "movie",
  title: "Mean Girls",
};

let adaptation: typeof original;

if (Math.random() > 0.5) {
  adaptation = { ...original, medium: "play" }; // Ok
} else {
  //   adaptation = { ...original, medium: 2 }; // Error
}

const ratings2 = {
  imdb: 8.4,
  metacritic: 82,
};

function logRating(key: keyof typeof ratings2) {
  console.log(ratings2[key]);
}

logRating("imdb"); // Ok
// logRating("invaild"); // Error

// 타입 어서션
const rawData = `["nami","nam"]`;

// 타입: any
JSON.parse(rawData);
// 타입: string[]
JSON.parse(rawData) as string[];
// 타입: [string, string]
JSON.parse(rawData) as [string, string];
// 타입: ["nami", "nam"]
JSON.parse(rawData) as ["nami", "nam"];

// 포착된 오류 타입 어서션
try {
  // 오류를 발생시키는 코드
} catch (error) {
  console.warn("Oh no!", (error as Error).message);
}

try {
  // 오류를 발생시키는 코드
} catch (error) {
  console.warn("Oh no", error instanceof Error ? error.message : error);
}

// 타입 유추: Date | undefined
let maybeDate = Math.random() > 0.5 ? undefined : new Date();

// 타입이 Date라고 간주됨
maybeDate as Date;

// 타입이 Date라고 간주됨
maybeDate!;

const seasonCounts = new Map([
  ["I Love Lucy", 6],
  ["The Golden Girls", 7],
]);

// 타입: string | undefined
const maybeValue = seasonCounts.get("I Love Lucy");

// console.log(maybeValue.toUpperCase()); // Error

// 타입: string
const knownValue = seasonCounts.get("The Golden Girls")!.toString();

console.log(knownValue.toUpperCase());

const seasonCounts0 = new Map([
  ["I Love Lucy", 6],
  ["The Golden Girls", 7],
]);

// 타입: string
const knownValue0 = seasonCounts0.get("I Love Lucy")!.toString;
// console.log(knownValue0.toUpperCase()); // Error

interface Entertainer {
  acts: string[];
  name: string;
}

// const declared: Entertainer = {
//   name: "Moms Mabley",
// };

const asserted = {
  name: "Moms Mabley",
} as Entertainer; // 허용되지만 런타임 시 오류 발생

// 다음 구문은 런타임 시 다음 오류로 인해 정상적으로 작동되지 않음
// console.log(declared.acts.join(", "));
console.log(asserted.acts.join(", "));

// 어서션 할당 가능성
// let myValue = "Stella" as number; // Error

// const 어서션
// 타입: (number | string)[]
[0, ""];

// 타입: readonly [0, '']
[0, ""] as const;

// 리터럴에서 원시 타입으로
// 타입: () => string
const getName = () => "Maria Bamford";

// 타입: () => "Maria Bamford"
const getNameConst = () => "Maria Bamford" as const;

interface Joke {
  quote: string;
  style: "story" | "one-liner";
}

function tellJoke(joke: Joke) {
  if (joke.style === "one-liner") {
    console.log(joke.quote);
  } else {
    console.log(joke.quote.split("\n"));
  }
}

// 타입 : { quote: string; style: "one-liner"}
const narrowJoke = {
  quote: "If you stay alive for no other reason do it for spite.",
  style: "one-liner" as const,
};

tellJoke(narrowJoke); // Ok

// 타입: { quote: string; style: string }
const wideObject = {
  quote: "Time files when you are anxious!",
  style: "one-liner",
};

// tellJoke(wideObject);// Error

// 읽기 전용 객체
function describePreference(preference: "maybe" | "no" | "yes") {
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
} as const;

describePreference(preferenceReadonly.movie); // Ok

// preferenceReadonly.movie = "no"; // Error
