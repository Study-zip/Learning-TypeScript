# Chapter 6. 배열

타입스크립트는 초기 배열에 어떤 데이터 타입이 있는지 기억하고, 배열이 해당 데이터 타입에서만 작동하도록 제한한다. 이렇게 배열의 데이터 타입을 하나로 유지시킨다.

```tsx
const warriors = ["Artemisia", "Bousdica"];

// Ok: "Zenobia"의 타입은 string
warriors.push("Zenobia");

warriors.push(true); // 오류
```

타입스크립트가 초기 배열에 담긴 요소를 통해 배열의 타입을 유추하는 방법은 변수의 초깃값에서 변수 타입을 유추하는 방법과 유사하다. 타입스크립트는 값이 할당되는 방식에서 코드의 의도된 타입을 이해하려고 시도한다.

### 6.1 배열 타입

다른 변수 선언과 마찬가지로 배열을 저장하기 위한 변수는 초깃값이 필요하지 않다. 변수는 `undefined`로 시작해서 나중에 배열 값을 받을 수 있다.

타입스크립트는 변수에 타입 애너테이션을 제공해 배열이 포함해야하는 값의 타입을 알려주려 한다.

배열에 대한 타입 애너테이션은 배열의 요소 타입 다음에 `[]` 가 와야 한다.

```tsx
let arrayOfNumbers: number[];
arrayOfNumbers = [4, 6, 15, 61, 64, 77];
```

배열 타입은 `Array<number>` 같은 구문으로도 작성할 수 있지만 개발자 대부분은 더 간단한 `number[]`를 선호한다.

**배열과 함수 타입**

배열 타입은 함수 타입에 무엇이 있는지를 구별하는 괄호가 필요한 구문 컨테이너의 예이다.

괄호는 애너테이션의 어느 부분이 함수 반환 부분이고 어느 부분이 배열 타입 묶음인지를 나타내기 위해 사용한다.

```tsx
// 타입은 string 배열을 반환하는 함수
let createStrings: () => string[];
// 타입은 각각의 string을 반환하는 함수 배열
let stringCreators: (() => string)[];
```

**유니언 타입 배열**

배열의 각 요소가 여러 선택 타입 중 하나일 수 있음을 나타내려면 유니언 타입을 사용한다.

유니언 타입으로 배열 타입을 사용할 때 애너테이션의 어느 부분이 배열의 콘텐츠이고 어느 부분이 유니언 타입 묶음인지를 나타내기 위해 괄호를 사용해야 할 수도 있다. 유니언 타입 배열에서 괄호 사용은 매우 중요하다.

```tsx
// 타입은 string 또는 number의 배열
let stringOrArrayOfNumbers: string | number[];
// 타입은 각각 number 또는 string인 요소의 배열
let arrayOfStringOrNumbers: (string | number)[];
```

타입스크립트는 배열의 선언에서 두 가지 이상의 요소 타입이 포함되는 경우 유니언 타입 배열임을 알게 된다. 즉 배열의 요소 타입은 배열에 담긴 요소에 대한 모든 가능한 타입의 집합이다.

```tsx
// 타입: (string | undefined)[]
const namesMaybe = ["Aqualtune", "Blenda", undefined];
```

**any 배열의 진화**

초기에 빈 배열로 설정된 변수에서 타입 애너테이션을 포함하지 않으면 타입스크립트는 배열을 any[]로 취급하고 모든 콘텐츠를 받을 수 있다. 타입 애너테이션이 없는 빈 배열은 잠재적으로 잘못된 값 추가를 허용해 타입 검사기를 무력화하기 때문이다.

```tsx
// 타입 : any[]
let values = [];
// 타입 : string[]
values.push("");
// 타입 : (number | string)[]
values[0] = 0;
```

변수와 마찬가지로 배열이 any타입이 되도록 허용하거나 일반적으로 any타입을 사용하도록 허용하면 타입스크립트의 타입 검사 목적을 부분적으로 무효화한다.

타입스크립트는 값의 타입을 알 때 가장 잘 작동한다.

**다차원 배열**

2차원 배열 또는 배열의 배열은 두 개의 `[]`(대괄호)를 갖는다.

```tsx
let arrayOfArraysOfNumbers: number[][];

arrayOfArraysOfNumbers = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
```

3차원 배열 또는 배열의 배열의 배열에는 세 개의 `[]` 가 있고 4차원 배열에는 네 개의 `[]` 가 있다. 그럼 6차원 배열이나 그 이상의 배열에는 몇 개의 `[]` 가 필요한지 예측할 수 있다.

이러한 다차원 배열 타입은 배열 타입에 새로운 개념을 도입한 게 아니다. 즉, 2차원 배열은 원래의 타입을 가지며 끝에 `[]` 가 있고, 그 뒤에 `[]` 를 추가한다고 생각하면 쉽다.

_`number_[][] = (number[])[]`

### 배열 멤버

타입스크립트는 배열의 멤버를 찾아서 해당 배열의 타입 요소를 되돌려주는 전형적인 인덱스 기반 접근 방식을 이해하는 언어이다.

```tsx
const defenders = ["Clarenxa", "Dina"];
// 타입: string
const defender = defenders[0];
```

유니언 타입으로 된 배열의 멤버는 그 자체로 동일한 유니언 타입이다.

```tsx
const soldiersOrDates = ["Deborah Sampson", new Date(1999, 9, 9)];
// 타입: string | Date
const soldierOrDate = soldiersOrDates[0];
```

**주의 사항 : 불안정한 멤버**

타입스크립트 타입 시스템은 기술적으로 불안정하다고 알려져 있다. 특히 배열은 타입 시스템에서 불안정한 소스이다. 기본적으로 타입스크립트는 모든 배열의 멤버에 대한 접근이 해당 배열의 멤버를 반환한다고 가정하지만, 자바스크립트에서조차도 배열의 길이보다 큰 인덱스로 배열 요소에 접근하면 `undefined`를 제공한다.

```tsx
function withElements(elements: string[]) {
  console.log(elements[9000].length); // 타입 오류 없음
}
withElements([`It's`, `over`]);
```

타입스크립트는 검색된 배열의 멤버가 존재하는지 의도적으로 확인하지 않는다. `elements[9000]` 는 undefined가 아니라 string타입으로 간주된다.

`noUncheckedIndexedAccess`라는 플래그가 있지만 매우 엄격해서 프로젝트에 잘 사용하지 않음.

### 스프레드와 나머지 매개변수

`…` 연산자를 사용하는 나머지 매개변수와 배열 스트레드 spread는 자바스크립트에서 배열과 상호작용하는 핵심방법이다.

**스프레드**

`…` 스프레드 연산자를 사용해 배열을 결합한다. 타입스크립트는 입력된 배열 중 하나의 값이 결과 배열에 포함될 것임을 이해한다.

만약 입력된 배열이 동일한 타입이라면 출력 배열도 동일한 타입이다. 서로 다른 타입의 두 배열을 함께 스프레드해 새 배열을 생성하면 새 배열은 두 개의 원래 타입 중 어느 하나의 요소인 유니언 타입 배열로 이해된다.

```tsx
// 타입: string[]
const soldiers = ["군인1", "군인2", "군인3"];
// 타입: number[]
const soldierAges = [25, 56, 23];
// 타입: (string | number)[]
const conjoined = [...soldiers, ...soldierAges];
```

`(string | number)[]` 타입으로 유추한다.

**나머지 매개변수 스프레드**

타입스크립트는 나머지 매개변수로 배열을 스프레드하는 자바스크립트 실행을 인식하고 이에 대해 타입 검사를 수행한다. 나머지 매개변수를 위한 인수로 사용되는 배열은 나머지 매개변수와 동일한 배열 타입을 가져야 한다.

```tsx
function logWarriors(greeting: string, ...names: string[]) {
  for (const name of names) {
    console.log(`${greeting}, ${name}!`);
  }
}
const warriors = ["Cathay Williams", "Lozen", "Nzinga"];

logWarriors("Hello", ...warriors);

const birthYears = [1844, 1840, 1583];

logWarriors("Born in", ...birthYears); // 오류
```

string[]타입 배열을 스프레드하는 것은 허용되지만 number[]는 허용되지 않는다.

### 튜플

튜플 배열은 각 인덱스에 알려진 **특정 타입**을 가지며 배열의 모든 가능한 멤버를 갖는 유니언 타입보다 **더 구체적**이다.

튜플 타입을 선언하는 구문은 배열 리터럴처럼 보이지만 요소의 값 대신 타입을 적는다.

```tsx
let yearAndWarrior: [number, string];
yearAndWarrior = [530, "Tom"]; // Ok
yearAndWarrior = [false, "Tom"]; // 오류
yearAndWarrior = [530]; // 오류
```

```tsx
// year 타입: number
// warrior 타입: string
let [year, warrior] =
  Math.random() > 0.5 //
    ? [340, "Archidamia"]
    : [1929, "Rani of Jhnasi"];
```

타입스크립트에서는 위 코드에서 year는 항상 number이고 warrior는 항상 string임을 인식한다.

**튜플 할당 가능성**

타입스크립트에서 튜플 타입은 **가변 길이 variable length**의 배열 타입보다 더 구체적으로 처리된다.

즉, 가변 길이의 배열 타입은 튜플 타입에 할당할 수 없다!

```tsx
// 타입: (boolean | number)[]
const pairLoose = [false, 123];
const pairTupleLoose: [boolean, number] = pairLoose;
```

`pairLoose가 [boolean, number]` 자체로 선언된 경우` pairTupleLoose`에 대한 값 할당이 허용되었을 것이다.

```tsx
const tupleThree: [boolean, number, string] = [false, 1583, "Nzinga"];
const tupleTwoExact: [boolean, number] = [tupleThree[0], tupleThree[1]];
const tupleTwoExtra: [boolean, number] = tupleThree; // 오류
```

`TwoExtra`는 정확히 두 개의 멤버를 가져야 하므로 `tupleThree`가 올바른 멤버로 시작하더라도 세 번째는 할당할 수 없다.

**나머지 매개변수로서의 튜플**

`…` 나머지 매개변수로 전달된 튜플에 정확한 타입 검사를 제공할 수 있다.

```tsx
function logPair(name: string, value: number) {
  console.log(`${name} has ${value}`);
}
const pairArray = ["Amage", 1];
logPair(...pairArray);

const pairTupleIncorrect: [number, string] = [1, "Amage"];
logPair(...pairTupleIncorrect);

const pairTupleCorrect: [string, number] = ["Amage", 1];
logPair(...pairTupleCorrect);
```

`logPair` 함수의 매개변수는 `string`과 `number`로 입력된다. `(string | number)[]` 타입의 값을 인수로 전달하려 하면 둘 다 동일한 타입이거나 타입의 잘못된 순서로 인해 내용이 일치하지 않을 가능성이 있어 타입의 안전을 보장할 수 없다. 하지만 `[string, number]` 튜플임을 안다면 값이 일치한다.

```tsx
function logTrio(name: string, value: [number, boolean]) {
  console.log(`${name} has ${value[0]} ${value[1]}`);
}
const trios: [string, [number, boolean]][] = [
  ["A", [1, true]],
  ["B", [2, false]],
  ["C", [3, true]],
];

trios.forEach((trio) => logTrio(...trio)); // Ok
trios.forEach(logTrio); // 오류
```

나머지 매개변수 튜플을 사용하고 싶다면 여러 번 함수를 호출하는 인수 목록을 배열에 저장하여 함께 사용할 수 있음. 다만 전체를 전달하려고 시도할 경우 할당할 수 없음. forEach로 각각 넣어줘야함.

**튜플 추론**

타입스크립트는 생성된 배열을 튜플이 아닌 **가변 길이의 배열**로 취급한다. 배열이 변수의 초깃값 또는 함수에 대한 반환값으로 사용되는 경우, 유연한 크기의 배열로 가정한다.

```tsx
// 반환 타입: (string | number)[]
function firstCharAndSize(input: string) {
  return [input[0], input.length];
}

// firstChar 타입: string | number
// size 타입: string | number
const [firstChar, size] = firstCharAndSize("Cudit");
```

firstCharAndSize 함수는 [string, number]가 아닌 (string | number)[]를 반환한다.

구체적인 튜플이어야 함을 나타내는 법 2가지

- **명시적 튜플 타입** 사용하기
- **const 어서션 assertion** 사용하기

**명시적 튜플 타입**

튜플 타입도 타입 애너테이션에 사용할 수 있다.

함수가 튜플 타입을 반환한다고 선언되고, 배열 리터럴을 반환한다면 해당 배열 리터럴은 일반적인 가변 길이의 배열 대신 튜플로 간주된다.

```tsx
// 명시적 튜플 타입
// 반환 타입: [string, number]
function firstCharAndSizeExplicit(input: string): [string, number] {
  return [input[0], input.length];
}
//firstChar 타입: string
// size 타입: number
const [firstChar, size] = firstCharAndSizeExplicit("Cathay Williams");
```

명백하게 명시하기

**const 어서션**

코드 변경에 따라 작성 및 수정이 필요한 구문을 추가해야되는 건 고통스럽다. 대안으로 값 뒤에 넣을 수 있는 const 어서션인 `as const` 연산자를 제공한다. const 어서션은 타입을 유추할 때 **읽기 전용read-only**이 가능한 값 형식을 사용하도록 지시한다.

```tsx
// 타입: (string | number)[]
const unionArray = [1134, "Me"];
// 타입: readonly [11, "Tom"]
const readonlyTuple = [11, "Tom"] as const;
```

배열이 튜플로 처리되어야 함을 나타낸다.

const 어서션은 유연한 크기의 배열을 고정된 크기의 튜플로 전환하는 것을 넘어서, 해당 튜플이 읽기 전용이고 값 수정이 예상되는 곳에서 사용할 수 없음을 나타낸다.

```tsx
const pairMutable: [number, string] = [33, "Tim"];
pairMutable[0] = 122; // Ok

const pairAlsoMutable: [number, string] = [33, "Tim"] as const; // 오류

const pairConst = [1, "Bany"] as const;
pairConst[0] = 2; // 오류
```

Mutable은 전형적인 명시적 튜플로 수정될 수 있다. 하지만 as const의 경우 값이 변경될 AlsoMutable에 할당할 수 없게 하고 상수 pairConst의 멤버는 수정을 허용하지 않는다.

```tsx
// 반환 타입: readonly [string, number]
function firstCharAndSizeAsConst(input: string) {
  return [input[0], input.length] as const;
}

// firstChar 타입: string
// size 타입: number
const [firstChar, size] = firstCharAndSizeAsConst("Ching Shi");
```

읽기 전용 [string, number]를 반환하지만 이를 사용하는 코드는 해당 튜플에서만 값을 찾는 것에 관심을 둔다.
