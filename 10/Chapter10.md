# Chapter 10. 제네릭

타입 시스템에서 선언된 변수는 완전히 새롭게 타입된 세계가 된다.

지금까지 배운 모든 구문은 해당 구문이 작성될 때 완전히 알려진 타입과 함께 사용해야 했다. 그러나 때로 코드에서 호출하는 방식에 따라 다양한 타입으로 작동하도록 의도할 수 있다.

```tsx
function identity(input: any) {
  return input;
}

identity("abc");
identity(123);
identity({ quote: "I think your self emerges more clearly over time." });

let value = identity(42); // value: any 타입
```

input이 모든 입력을 허용한다면, input 타입과 함수 반환 타입 간의 관계를 말할 수 있는 방법이 필요하다. 타입스크립트는 **제네릭 Generic**을 사용해 **타입 간의 관계**를 알아낸다.

타입스크립트에서 함수와 같은 구조체는 **제네릭 타입 매개변수**를 원하는 수만큼 선언할 수 있다. 제네릭 타입 매개변수는 제네릭 구조체의 각 사용법에 따라 타입이 결정된다. 이런 타입 매개변수는 구조체의 각 인스턴스에서 서로 다른 일부 타입을 나타내기 위해 구조체의 타입으로 사용된다. 타입 매개변수는 구조체의 각 인스턴스에 대해 **타입 인수**라고 하는 서로 다른 타입을 함께 제공할 수 있지만, 타입 인수가 제공된 인스턴스 내에서는 일관성을 유지한다.

타입 매개변수는 전형적으로 T나 U같은 단일 문자 이름 또는 Key와 Value같은 파스칼 케이스 이름을 갖는다. 이 장에서 다루는 모든 구조체에서는 <, >를 사용해 someFunction<T> 또는 SomeInterface<T>처럼 제네릭을 선언한다.

### 제네릭 함수

매개변수 괄호 바로 앞 홑화살괄호(<, >)로 묶인 타입 매개변수에 별칭을 배치해 함수를 제네릭으로 만든다. 그러면 해당 타입 매개변수를 함수의 본문 내부의 매개변수 타입 애너테이션, 반환 타입 애너테이션, 타입 애너테이션에서 사용할 수 있다.

```tsx
function identity<T>(input: T) {
  return input;
}

const numeric = identity("me"); // 타입: "me"
const stringy = identity(123); // 타입: 123

const identity = <T,>(input: T) => input;
identity(123); // 타입: 123
```

화살표 함수도 제네릭을 만들 수 있다. 화살표 함수의 제네릭 선언은 매개변수 목록 바로 전인 ( 앞에 위치한다.

화살표 함수는 앞서 선언했던 것과 기능적으로 동일한 함수 선언식이다. 제네릭 화살표 함수 구문은 .tsx 파일에서 JSX 구문과 충돌하므로 일부 제한이 있다. 이런 방식으로 함수에 타입 매개변수를 추가하면 타입 안정성을 유지하고 any 타입을 피하면서 다른 입력과 함께 재사용할 수 있다.

**명시적 제네릭 호출타입**

제네릭 함수를 호출할 때 대부분의 타입스크립트는 함수가 호출되는 방식에 따라 타입 인수를 유추한다.

클래스 멤버와 변수 타입과 마찬가지로 때로는 타입 인수를 해석하기 위해 타입스크립트에 알려줘야 하는 함수 호출 정보가 충분하지 않을 수도 있다. 이런 현상은 타입 인수를 알 수 없는 제네릭 구문이 다른 제네릭 구문에 제공된 경우 발생한다.

```tsx
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
  console.log(input.length);
});
```

기본값이 Unknown으로 설정되는 것을 피하기 위해 타입스크립트에 해당 타입 인수가 무엇인지 명시적으로 알려주는 **명시적 제네릭 타입 인수**를 사용해 함수를 호출할 수 있다. 타입스크립트는 매개변수가 타입 인수로 제공된 것과 일치하는지 확인하기 위해 제네릭 호출에서 타입 검사를 수행한다.

```tsx
// 타입: (input: string) => void
logWrapper<string>((input) => {
  console.log(input.length);
});

logWrapper<string>((input: boolean) => {}); // Error
```

필요시에만 명시적 타입 인수를 지정한다.

```tsx
logWrapper<string>((input: string) => {
  /*... */
});
```

타입 인수를 지정하기 위한 이름<Type> 구문은 이 장 전체에서 살펴볼 다른 제네릭 구조체에서도 동일하게 사용된다.

**다중 함수 타입 매개변수**

임의의 수의 타입 매개변수를 쉼표로 구분해 함수를 정의한다. 제네릭 함수의 각 호출은 각 타입 매개변수에 대한 자체 값 집합을 확인할 수 있다.

```tsx
function makeTuple<First, Second>(first: First, second: Second) {
  return [first, second] as const;
}

let tuple = makeTuple(true, "abc"); // value: readonly [boolean, string] 타입
```

함수가 여러 개의 타입 매개변수를 선언하면 해당 함수에 대한 호출은 명시적으로 제네릭 타입을 모두 선언하지 않거나 모두 선언해야 한다.

일부 타입만을 유추하지는 못함.

```tsx
function makePair<Key, Value>(key: Key, value: Value) {
  return { key, value };
}

// Ok: 타입 인수가 둘 다 제공되지 않음
makePair("abc", 123); // 타입: { key: string; value: number }

// Ok: 두 개의 타입 인수가 제공됨
makePair<string, number>("abc", 123); // 타입: { key: string; value: number }
makePair<"abc", 123>("abc", 123); // 타입: { key: "abc"; value: 123 }

makePair<string>("abc", 123); // Error
```

제네릭 구조체에서 두 개보다 많은 타입 매개변수를 사용하지 말자. 런타임 함수 매개변수처럼 많이 사용할수록 코드를 읽고 이해하는 것이 점점 어려워진다.

### 제네릭 인터페이스

인터페이스도 제네릭으로 선언할 수 있다. 인터페이스는 함수와 유사한 제네릭 규칙을 따르며 인터페이스 이름 뒤 <과 > 사이에 선언된 임의의 수의 타입 매개변수를 갖는다. 해당 제네릭 타입은 나중에 멤버 타입과 같이 선언의 다른 곳에서 사용할 수 있다.

```tsx
interface Box<T> {
  inside: T;
}

let stringBox: Box<string> = {
  inside: "abc",
};

let numberBox: Box<number> = {
  inside: 123,
};

let incorrectBox: Box<number> = {
  inside: false, // Error
};
```

타입스크립트에서 내장 Array 메서드는 제네릭 인터페이스로 정의된다는 점.
Array는 타입 매개변수 T를 사용해서 배열 안에 저장된 데이터의 타입을 나타낸다.

**유추된 제네릭 인터페이스 타입**

제네릭 함수와 마찬가지로 제네릭 인터페이스의 타입 인수는 사용법에서 유추할 수 있다. 타입스크립트는 제네릭 타입을 취하는 것으로 선언된 위치에 제공된 값의 타입에서 타입 인수를 유추한다.

```tsx
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
let lastMismatch = getLast({
  next: {
    value: 123,
  },
  value: false, // Error
});
```

인터페이스가 타입 매개변수를 선언하는 경우, 해당 인터페이스를 참조하는 모든 타입 애너테이션은 이에 상응하는 타입 인수를 제공해야 한다.

```tsx
interface CrateLike<T> {
  contents: T;
}

let missingGeneric: CrateLike = {
  inside: "??",
};
```

### 제네릭 클래스

인터페이스처럼 클래스도 나중에 멤버에서 사용할 임의의 수의 타입 매개변수를 선언할 수 있다. 클래스의 각 인스턴스는 타입 매개변수로 각자 다른 타입 인수 집합을 가진다.

```tsx
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
```

제네릭 인터페이스와 마찬가지로 클래스를 사용하는 타입 애너테이션은 해당 클래스의 제네릭 타입이 무엇인지를 타입스크립트에 나타내야 한다.

**명시적 제네릭 클래스 타입**

제네릭 클래스 인스턴스화는 제네릭 함수를 호출하는 것과 동일한 타입 인수 유추 규칙을 따른다. new Secret(12345, “luggage”)와 같이 함수 생성자에 전달된 매개변수의 타입으로부터 타입 인수를 유추할 수 있다면 타입스크립트는 유추된 타입을 사용한다. 하지만 생성자에 전달된 인수에서 클래스 타입 인수를 유추할 수 없는 경우엔 타입 인수의 기본값은 unknown이 된다.

```tsx
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
new CurriedCallback((input) => {
  console.log(input.length); // Error
});
```

클래스 인스턴스는 다른 제네릭 함수 호출과 동일한 방식으로 명시적 타입 인수를 제공해서 기본값 unknown이 되는 것을 피할 수 있다.

```tsx
new CurriedCallback<string>((input) => {
  console.log(input.length);
});

new CurriedCallback<string>((input: boolean) => {}); // Error
```

**제네릭 클래스 확장**

제네릭 클래스는 extends 키워드 다음에 오는 기본 클래스로 사용할 수 있다. 타입스크립트는 사용법에서 기본 클래스에 대한 타입 인수를 유추하지 않는다. 기본값이 없는 모든 타입 인수는 명시적 타입 애너테이션을 사용해 지정해야 한다.

```tsx
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

new SpokenQuote([4, 8, 15, 16, 23, 42]); // Error
```

제네릭 파생 클래스는 자체 타입 인수를 기본 클래스에 번갈아 전달할 수 있다. 타입 이름은 일치하지 않아도 된다.

```tsx
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
```

**제네릭 인터페이스 구현**

제네릭 클래스는 모든 필요한 매개변수를 제공함으로써 제네릭 인터페이스를 구현한다. 제네릭 인터페이스는 제네릭 기본 클래스를 확장하는 것과 유사하게 작동한다. 기본 인터페이스의 모든 타입 매개변수는 클래스에 선언되어야 한다.

```tsx
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

class IncorrectExtension implements ActingCredit<string> {
  role: boolean; // Error
}
```

**메서드 제네릭**

클래스 메서드는 클래스 인스턴스와 별개로 자체 제네릭 타입을 선언할 수 있다. 제네릭 클래스 메서드에 대한 각각의 호출은 각 타입 매개변수에 대해 다른 타입 인수를 갖는다.

```tsx
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
```

**정적 클래스 제네릭**

클래스의 정적 static 멤버는 인스턴스 멤버와 구별되고 클래스의 특정 인스턴스와 연결되어 있지 않는다. 클래스의 정적 멤버는 클래스 인스턴스에 접근할 수 없거나 타입 정보를 지정할 수 없다. 따라서 정적 클래스 메서드는 자체 타입 매개변수를 선언할 수 있지만 클래스에 선언된 어떤 타입 매개변수에도 접근할 수 없다.

```tsx
class BothLogger<OnInstance> {
  instanceLog(value: OnInstance) {
    console.log(value);
    return value;
  }
  static staticLog<OnStatic>(value: OnStatic) {
    let fromInstance: OnInstance; // Error

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
```

### 제네릭 타입 별칭

타입 인수를 사용해 제네릭을 만드는 타입스크립트의 마지막 구조체는 타입 별칭이다.

```tsx
type Nillish<T> = T | null | undefined;
```

제네릭 타입 별칭은 일반적으로 제네릭 함수의 타입을 설명하는 함수와 함께 사용된다.

```tsx
type CreatesValue<Input, Output> = (input: Input) => Output;

// 타입: (input: string) => number
let creator: CreatesValue<string, number>;

creator = (text) => text.length; // Ok

creator = (text) => text.toUpperCase; // Error
```

제네릭 판별된 유니언

판별된 유니언 사용법 중 데이터의 성공적인 결과 또는 오류로 인해 실패를 나타내는 제네릭 ‘결과’ 타입을 만들기 위해 타입 인수를 추가하는 용도가 있다.

```tsx
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

  result.data; // Error
}
```

제네릭 타입과 판별된 타입을 함께 사용하면 재사용 가능한 타입을 모델링하는 훌륭한 방법을 제공할 수 있다.

### 제네릭 제한자

타입스크립트는 제네릭 타입 매개변수의 동작을 수정하는 구문도 제공한다.

**제네릭 기본값**

제네릭 타입이 타입 애너테이션에 사용되거나 extends 또는 implements의 기본 클래스로 사용되는 경우 각 타입 매개변수에 대한 타입 인수를 제공해야 한다. 기본값은 타입 인수가 명시적으로 선언되지 않고 유추할 수 없는 모든 후속 타입에 사용된다.

```tsx
interface Quote0<T = string> {
  value: T;
}

let explict: Quote0<number> = { value: 123 };
let implicit: Quote0 = {
  value: "Be yourself. The world worships the original",
};
let mismatch: Quote0 = { value: 123 }; // Error
```

타입 매개변수는 동일한 선언 안의 앞선 타입 매개변수를 기본값으로 가질 수 있다. 각 타입 매개변수는 선언에 대한 새로운 타입을 도입하므로 해당 선언 이후의 타입 매개변수에 대한 기본값으로 이용할 수 있다.

```tsx
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

let firstMissing: KeyValuePair = {
  // Error
  key: "rating",
  value: 10,
};
```

```tsx
function inTheEnd<First, Second, Third = number, Fourth = string>() {} // Ok

function inTheMiddle<First, Second = boolean, Third = number, Fourth>() {} // Error
```

모든 기본 타입 매개변수는 기본 함수 매개변수처럼 선언 목록의 제일 마지막에 와야한다.

### 제한된 제네릭 타입

기본적으로 제네릭 타입에는 클래스, 인터페이스, 원싯값, 유니언, 별칭 등 모든 타입을 제공할 수 있다. 그러나 일부 함수는 제한된 타입에만 작동해야 한다.

타입스크립트는 타입 매개변수가 타입을 확장해야 한다고 선언할 수 있고 별칭 타입에만 허용되는 작업이다. 타입 매개변수를 제한하는 구문은 매개변수 이름 뒤에 extends 키워드를 배치하고 그 뒤에 이를 제한할 타입을 배치한다.

```tsx
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

logWithLength(new Date());
```

문자열, 배열, length: number를 가진 객체는 허용되지만 Date 같은 타입 형태는 숫자형 length 멤버가 없으므로 오류가 발생함.

**keyof와 제한된 타입 매개변수**

extends와 keyof를 함께 사용하면 타입 매개변수를 이전 타입 매개변수의 키로 제한할 수 있다. 제네릭 타입의 키를 지정하는 유일한 방법이기도 하다.

```tsx
function get<T, Key extends keyof T>(container: T, key: Key) {
  return container[key];
}

const roles = {
  favorite: "Fargo",
  others: ["Almost Famous", "Burn After Reading", "Nomadland"],
};

const favorite = get(roles, "favorite"); // 타입: string
const others = get(roles, "others"); // 타입: string[]

const missing = get(roles, "extras"); // Error
```

Key 타입 매개변수의 중요성에 주목해보자. 타입 매개변수로 T만 제공되고 key 매개변수가 모든 keyof T일 수 있는 경우라면 반환 타입은 Container에 있는 모든 속성값에 대한 유니언 타입이 된다. 이렇게 구체적이지 않은 함수 선언은 각 호출이 타입 인수를 통해 특정 key를 가질 수 있음을 타입스크립트에 나타낼 수 없다.

```tsx
function get0<T>(container: T, key: keyof T) {
  return container[key];
}

const roles0 = {
  favorite: "Fargo",
  others: ["Almost Famous", "Burn After Reading", "Nomadland"],
};

const found = get0(roles0, "favorite"); // 타입 string | string[
```

제네릭 함수를 작성할 때 매개변수의 타입이 이전 매개변수 타입에 따라 달라지는 경우를 알아야 한다. 올바른 타입을 위해 제한된 타입 매개변수를 자주 사용하게 된다.

### Promise

임의의 값 타입에 대해 유사한 작업을 나타내는 Promise의 기능은 타입스크립트의 제네릭과 자연스럽게 융합된다. Promise는 타입스크립트 타입 시스템에서 최종적으로 resolve된 값을 나타내는 단일 타입 매개변수를 가진 Promise 클래스로 표현된다.

**Promise 생성**

```tsx
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
```

Promise의 제네릭 .then 메서드는 반환되는 Promise의 resolve된 값을 나타내는 새로운 타입 매개변수를 받는다.

**async 함수**

JS에서 async 함수에 따라서 반환된 값이 Thenable(.then()메서드가 있는 객체, 실제로는 거의 항상 Promise)이 아닌 경우, Promise.resolve가 호출된 것 처럼 Promise로 래핑wrapping된다.

```tsx
// 타입: (text: string) => Promise<number>
async function lengthAfterSecond(text: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return text.length;
}

// 타입: (text: string) => Promise<number>
async function lengthImmediately(text: string) {
  return text.length;
}
```

Promise를 명시적으로 언급하지 않더라고 async 함수에서 수동으로 선언된 반환타입은 항상 Promise 타입이 된다.

```tsx
async function givesPromiseForString(): Promise<string> {
  return "Done!";
}

async function givesString(): string {
  return "done"; // Error
}
```

### 제네릭 올바르게 사용하기

Promise<Value> 구현처럼 제네릭은 코드에서 타입을 설명하는 데 많은 유연성을 제공할 수 있지만 코드가 빠르게 복잡해질 수 있다.

⚠️ 유틸리티 라이브러리에 대한 타입, 범용 모듈은 경우에 따라 제네릭을 많이 사용할 수도 있다. 제네릭을 이해하면 이런 유틸리티 타입을 효과적으로 사용할 수 있다.

**제네릭 황금률**

함수에 타입 매개변수가 필요한지 여부를 판단할 수 있는 간단하고 빠른 방법은 타입 매개변수가 최소 두 번 이상 사용되었는지 확인하는 것이다. 제네릭은 타입 간의 관계를 설명하므로 제네릭 타입 매개변수가 한 곳에만 나타나면 여러 타입 간의 관계를 정의할 수 없다. 따라서 각 함수 타입 매개변수는 매개변수에 사용되어야 하고 그다음 적어도 하나의 다른 매개변수 또는 함수의 반환 타입에서도 사용되어야 한다.

```tsx
function logInput<Input extends string>(input: Input) {
  console.log("hi!", input);
} // 1번 사용함 - 부적절

function logInput0(input: string) {
  console.log("Hi", input);
} // 제네릭 쓰지 않고 사용하기
```

**제네릭 명명 규칙**

타입 스크립트를 포함한 많은 언어가 지키는 타입 매개변수에 대한 표준 명명규칙 naming convention은 기본적으로 첫 번쨰 타입 인수로 T를 사용하고 후속 타입 매개변수가 존재하면, U, V 등을 사용한다.

타입 인수가 어떻게 사용되어야 하는지 맥락과 관련된 정보가 알려진 경우 명명 규칙은 경우에 따라 해당 용어의 첫 글자를 사용하는 것으로 확장된다. 상태 관리 라이브러리에서는 제네릭 상태를 S로, 데이터 구조의 키와 값은 K와 V로 나타내기도 한다.

제네릭의 의도가 단일 문자 T에서 명확하지 않은 경우엔 타입이 사용되는 용도를 가리키는 설명적인 제네릭 타입 이름을 사용하는 것이 좋다.
