var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CurriedCallback_callback;
// chapter 10 제네릭
function identity0(input) {
    return input;
}
identity0("abc");
identity0(123);
identity0({ quote: "I think your self emerges more clearly over time." });
let value = identity0(42); // value: any 타입
// 제네릭 함수
function identity(input) {
    return input;
}
const numeric = identity("me"); // 타입: "me"
const stringy = identity(123); // 타입: 123
const identity1 = (input) => input;
identity1(123); // 타입: 123
// 명시적 제네릭 호출 타입
function logWrapper(callback) {
    return (input) => {
        console.log("Input:", input);
        callback(input);
    };
}
// 타입: (input: string) => void
logWrapper((input) => {
    console.log(input.length);
});
// 타입: (input: unknown) => void
logWrapper((input) => {
    //   console.log(input.length);
});
// 타입: (input: string) => void
logWrapper((input) => {
    console.log(input.length);
});
// logWrapper<string>((input: boolean) => {}); // Error
logWrapper((input) => {
    /*... */
});
// 다중 함수 타입 매개변수
function makeTuple(first, second) {
    return [first, second];
}
let tuple = makeTuple(true, "abc"); // value: readonly [boolean, string] 타입
function makePair(key, value) {
    return { key, value };
}
// Ok: 타입 인수가 둘 다 제공되지 않음
makePair("abc", 123); // 타입: { key: string; value: number}
// Ok: 두 개의 타입 인수가 제공됨
makePair("abc", 123); // 타입: { key: string; value: number }
makePair("abc", 123); // 타입: { key: "abc"; value: 123 }
// makePair<string>("abc", 123); // Error
function makePair0(key, value) {
    return { key, value };
}
// Ok: 타입 인수가 둘 다 제공되지 않음
makePair0("abc", 123); // 타입: { key: string; value: number }
// Ok: 두 개의 타입 인수가 제공됨
makePair0("abc", 123); // 타입: { key: string; value: number }
makePair0("abc", 123); // 타입: { key: "abc"; value: 123 }
let stringBox = {
    inside: "abc",
};
let numberBox = {
    inside: 123,
};
function getLast(node) {
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
// let missingGeneric: CrateLike = {
//   inside: "??",
// };
// 제네릭 클래스
class Secret {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    getValue(key) {
        return this.key === key ? this.value : undefined;
    }
}
const storage = new Secret(12343, "luggage"); // 타입: Secret<number, string>
storage.getValue(1987); // 타입: string | undefined
// 명시적 제네릭 클래스 타입
class CurriedCallback {
    constructor(callback) {
        _CurriedCallback_callback.set(this, void 0);
        __classPrivateFieldSet(this, _CurriedCallback_callback, (input) => {
            console.log("Input", input);
            callback(input);
        }, "f");
    }
    call(input) {
        __classPrivateFieldGet(this, _CurriedCallback_callback, "f").call(this, input);
    }
}
_CurriedCallback_callback = new WeakMap();
// 타입: CurriedCallback<string>
new CurriedCallback((input) => {
    console.log(input.length);
});
// 타입: CurriedCallback<unknown>
// new CurriedCallback((input) => {
//   console.log(input.length); // Error
// });
// 타입: CurriedCallback<string>
new CurriedCallback((input) => {
    console.log(input.length);
});
// new CurriedCallback<string>((input: boolean) => {}); // Error
// 제네릭 클래스 확장
class Quote {
    constructor(lines) {
        this.lines = lines;
    }
}
class SpokenQuote extends Quote {
    speak() {
        console.log(this.lines.join("\n"));
    }
}
new Quote("The only real failure is  the failure to try.").lines; // 타입: string
new Quote([4, 8, 15, 16, 23, 42]).lines; // 타입: number[]
new SpokenQuote(["Greed is so destructive", "It destroys everything"]).lines; // 타입: string[]
// new SpokenQuote([4, 8, 15, 16, 23, 42]); // Error
class AttributedQuote extends Quote {
    constructor(value, speaker) {
        super(value);
        this.speaker = speaker;
    }
}
// 타입: AttributedQuote<string>
// (Quotes<string> 확장하기)
new AttributedQuote("The road to success is always under construction.", "Lily Tomlin");
class MoviePart {
    constructor(role, speaking) {
        this.role = role;
        this.speaking = speaking;
    }
}
const part = new MoviePart("Miranda Priestly", true);
part.role; // 타입: string
// class IncorrectExtension implements ActingCredit<string> {
//   role: boolean;
// }
class CreatePairFactory {
    constructor(key) {
        this.key = key;
    }
    createPair(value) {
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
class BothLogger {
    instanceLog(value) {
        console.log(value);
        return value;
    }
    static staticLog(value) {
        // let fromInstance: OnInstance;
        console.log(value);
        return value;
    }
}
const logger = new BothLogger();
logger.instanceLog([1, 2, 3]); // 타입: number[]
// 유추된 OnStatic 타입 인수: boolean[]
BothLogger.staticLog([false, true]);
// 유추된 OnStatic 타입 인수: string
BothLogger.staticLog("You can't change the music of your soul");
