import { resolve } from "path";

// chapter 10 제네릭
function identity0(input: any) {
  return input;
}

identity0("abc");
identity0(123);
identity0({ quote: "I think your self emerges more clearly over time." });

let value = identity0(42); // value: any 타입

// 제네릭 함수
function identity<T>(input: T) {
  return input;
}

const numeric = identity("me"); // 타입: "me"
const stringy = identity(123); // 타입: 123

const identity1 = <T>(input: T) => input;
identity1(123); // 타입: 123

// 명시적 제네릭 호출 타입
function logWrapper<Input>(callback: (input: Input) => void) {
  return (input: Input) => {
    console.log("Input:", input);
    callback(input);
  };
}

// 타입: (input: string) => void
logWrapper((input: string) => {
  console.log(input.length);
});

// 타입: (input: unknown) => void
logWrapper((input) => {
  //   console.log(input.length);
});

// 타입: (input: string) => void
logWrapper<string>((input) => {
  console.log(input.length);
});

// logWrapper<string>((input: boolean) => {}); // Error
logWrapper<string>((input: string) => {
  /*... */
});

// 다중 함수 타입 매개변수
function makeTuple<First, Second>(first: First, second: Second) {
  return [first, second] as const;
}

let tuple = makeTuple(true, "abc"); // value: readonly [boolean, string] 타입

function makePair<Key, Value>(key: Key, value: Value) {
  return { key, value };
}

// Ok: 타입 인수가 둘 다 제공되지 않음
makePair("abc", 123); // 타입: { key: string; value: number}

// Ok: 두 개의 타입 인수가 제공됨
makePair<string, number>("abc", 123); // 타입: { key: string; value: number }
makePair<"abc", 123>("abc", 123); // 타입: { key: "abc"; value: 123 }

// makePair<string>("abc", 123); // Error

function makePair0<Key, Value>(key: Key, value: Value) {
  return { key, value };
}

// Ok: 타입 인수가 둘 다 제공되지 않음
makePair0("abc", 123); // 타입: { key: string; value: number }

// Ok: 두 개의 타입 인수가 제공됨
makePair0<string, number>("abc", 123); // 타입: { key: string; value: number }
makePair0<"abc", 123>("abc", 123); // 타입: { key: "abc"; value: 123 }

// makePair0<string>("abc", 123); // Error

// 제네릭 인터페이스
interface Box<T> {
  inside: T;
}

let stringBox: Box<string> = {
  inside: "abc",
};

let numberBox: Box<number> = {
  inside: 123,
};

// let incorrectBox: Box<number> = {
//   inside: false, // Error
// };

interface Array<T> {
  // ...
  /**
   * 배열에서 마지막 요소를 제거하고 그 요소를 반환
   * 배열이 비어 있는 경우 undefined를 반환하고 배열은 수정되지 않음.
   */
  pop(): T | undefined;

  /**
   * 배열의 끝에 새로운 요소를 추가하고 배열의 길이를 반환
   * @param items 배열에 추가된 새로운 요소
   */
  push(...items: T[]): number;

  // ...
}

// 유추된 제네릭 인터페이스 타입
interface LinkedNode<Value> {
  next?: LinkedNode<Value>;
  value: Value;
}

function getLast<Value>(node: LinkedNode<Value>): Value {
  return node.next ? getLast(node.next) : node.value;
}

// 유추된 Value 타입 인수: Date
let lastDate = getLast({
  value: new Date("09-13-1993"),
});

//  유추된 Value 타입 인수: string
let lastFruit = getLast({
  next: {
    value: "banana",
  },
  value: "apple",
});

// 유추된 Value 타입 인수: number
// let lastMismatch = getLast({
//   next: {
//     value: 123,
//   },
//   value: false, // Error
// });

interface CrateLike<T> {
  contents: T;
}

// let missingGeneric: CrateLike = {
//   inside: "??",
// };

// 제네릭 클래스
class Secret<Key, Value> {
  key: Key;
  value: Value;

  constructor(key: Key, value: Value) {
    this.key = key;
    this.value = value;
  }

  getValue(key: Key): Value | undefined {
    return this.key === key ? this.value : undefined;
  }
}

const storage = new Secret(12343, "luggage"); // 타입: Secret<number, string>

storage.getValue(1987); // 타입: string | undefined

// 명시적 제네릭 클래스 타입
class CurriedCallback<Input> {
  #callback: (input: Input) => void;

  constructor(callback: (input: Input) => void) {
    this.#callback = (input: Input) => {
      console.log("Input", input);
      callback(input);
    };
  }
  call(input: Input) {
    this.#callback(input);
  }
}

// 타입: CurriedCallback<string>
new CurriedCallback((input: string) => {
  console.log(input.length);
});

// 타입: CurriedCallback<unknown>
// new CurriedCallback((input) => {
//   console.log(input.length); // Error
// });

// 타입: CurriedCallback<string>
new CurriedCallback<string>((input) => {
  console.log(input.length);
});

// new CurriedCallback<string>((input: boolean) => {}); // Error

// 제네릭 클래스 확장
class Quote<T> {
  lines: T;

  constructor(lines: T) {
    this.lines = lines;
  }
}

class SpokenQuote extends Quote<string[]> {
  speak() {
    console.log(this.lines.join("\n"));
  }
}

new Quote("The only real failure is  the failure to try.").lines; // 타입: string
new Quote([4, 8, 15, 16, 23, 42]).lines; // 타입: number[]

new SpokenQuote(["Greed is so destructive", "It destroys everything"]).lines; // 타입: string[]

// new SpokenQuote([4, 8, 15, 16, 23, 42]); // Error

class AttributedQuote<Value> extends Quote<Value> {
  speaker: string;

  constructor(value: Value, speaker: string) {
    super(value);
    this.speaker = speaker;
  }
}

// 타입: AttributedQuote<string>
// (Quotes<string> 확장하기)
new AttributedQuote(
  "The road to success is always under construction.",
  "Lily Tomlin"
);

// 제네릭 인터페이스 구현
interface ActingCredit<Role> {
  role: Role;
}

class MoviePart implements ActingCredit<string> {
  role: string;
  speaking: boolean;

  constructor(role: string, speaking: boolean) {
    this.role = role;
    this.speaking = speaking;
  }
}

const part = new MoviePart("Miranda Priestly", true);

part.role; // 타입: string

// class IncorrectExtension implements ActingCredit<string> {
//   role: boolean;
// }

class CreatePairFactory<Key> {
  key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  createPair<Value>(value: Value) {
    return { key: this.key, value };
  }
}

// 타입: CreatePairFactory<string>
const factory = new CreatePairFactory("role");

// 타입: { key: string, value: number }
const numberPair = factory.createPair(10);

// 타입: { key: string, value: string }
const stringPair = factory.createPair("SoPhie");

// 정적 클래스 제네릭
class BothLogger<OnInstance> {
  instanceLog(value: OnInstance) {
    console.log(value);
    return value;
  }
  static staticLog<OnStatic>(value: OnStatic) {
    // let fromInstance: OnInstance;

    console.log(value);
    return value;
  }
}

const logger = new BothLogger<number[]>();
logger.instanceLog([1, 2, 3]); // 타입: number[]

// 유추된 OnStatic 타입 인수: boolean[]
BothLogger.staticLog([false, true]);

// 유추된 OnStatic 타입 인수: string
BothLogger.staticLog<string>("You can't change the music of your soul");

// 제네릭 타입 별칭
type Nillish<T> = T | null | undefined;

type CreatesValue<Input, Output> = (input: Input) => Output;

// 타입: (input: string) => number
let creator: CreatesValue<string, number>;

creator = (text) => text.length; // Ok

// creator = (text) => text.toUpperCase; // Error

// 제네릭 판별된 유니언
type Result<Data> = FailureResult | SuccessfulResult<Data>;

interface FailureResult {
  error: Error;
  succeeded: false;
}

interface SuccessfulResult<Data> {
  data: Data;
  succeeded: true;
}

function handleResult(result: Result<string>) {
  if (result.succeeded) {
    // result: SuccessfulResult<string>의 타입
    console.log(`We did it! ${result.data}`);
  } else {
    // result: FailureResult의 타입
    console.error(`Awww... ${result.error}`);
  }

  //   result.data;
}

// 제네릭 제한자
// 제네릭 기본값
interface Quote0<T = string> {
  value: T;
}

let explict: Quote0<number> = { value: 123 };
let implicit: Quote0 = {
  value: "Be yourself. The world worships the original",
};
// let mismatch: Quote0 = { value: 123 };

interface KeyValuePair<Key, Value = Key> {
  key: Key;
  value: Value;
}

// 타입: KeyValuePair<string, string>
let allExplicit: KeyValuePair<string, number> = {
  key: "rating",
  value: 10,
};

// 타입: KeyValuePair<string>
let oneDefaulting: KeyValuePair<string> = {
  key: "rating",
  value: "ten",
};

// let firstMissing: KeyValuePair = {
//   // Error
//   key: "rating",
//   value: 10,
// };

function inTheEnd<First, Second, Third = number, Fourth = string>() {} // Ok

// function inTheMiddle<First, Second = boolean, Third = number, Fourth>(){} // Error

// 제한된 제네릭 타입
interface WithLength {
  length: number;
}

function logWithLength<T extends WithLength>(input: T) {
  console.log(`Length: ${input.length}`);
  return input;
}

logWithLength("No one can figure out your worth but you"); // 타입: string
logWithLength([false, true]); // 타입: boolean[]
logWithLength({ length: 123 }); // 타입: { length: number }

// logWithLength(new Date());

// keyof와 제한된 타입 매개변수
function get<T, Key extends keyof T>(container: T, key: Key) {
  return container[key];
}

const roles = {
  favorite: "Fargo",
  others: ["Almost Famous", "Burn After Reading", "Nomadland"],
};

const favorite = get(roles, "favorite"); // 타입: string
const others = get(roles, "others"); // 타입: string[]

// const missing = get(roles, "extras"); // Error

function get0<T>(container: T, key: keyof T) {
  return container[key];
}

const roles0 = {
  favorite: "Fargo",
  others: ["Almost Famous", "Burn After Reading", "Nomadland"],
};

const found = get0(roles0, "favorite"); // 타입 string | string[]

// Promise
// Promise 생성
class PromiseLike<Value> {
  constructor(
    executor: (
      resolve: (value: Value) => void,
      reject: (reason: unknown) => void
    ) => void
  ) {
    /*...*/
  }
}
// 타입: Promise<unknown>
const resolvesUnknown = new Promise((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

// 타입: Promise<string>
const resolvesString = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

// 타입: Promise<string>
const textEventually = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

// 타입: Promise<number>
const lengthEventually = textEventually.then((text) => text.length);

// async 함수

// 타입: (text: string) => Promise<number>
async function lengthAfterSecond(text: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return text.length;
}

// 타입: (text: string) => Promise<number>
async function lengthImmediately(text: string) {
  return text.length;
}

// Ok
async function givesPromiseForString(): Promise<string> {
  return "Done!";
}

// async function givesString(): string {
//   return "done"; // Error
// }

// 제네릭 올바르게 사용하기

function logInput<Input extends string>(input: Input) {
  console.log("hi!", input);
} // 1번 사용함 - 부적절

function logInput0(input: string) {
  console.log("Hi", input);
} // 제네릭 쓰지 않고 사용하기

function labelBox<Label, Value>(label: Label, value: Value) {
  /*... */
}
