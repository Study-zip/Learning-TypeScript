# Chapter 7. 인터페이스

인터페이스는 연관된 이름으로 객체 형태를 설명하는 또 다른 방법이다. 별칭으로된 객체 타입과 여러 면에서 유사하지만 일반적으로 더 읽기 쉬운 오류 메시지, 더 빠른 컴파일러 성능, 클래스와의 더 나은 상호 운용성을 위해 선호된다.

### 타입 별칭 vs. 인터페이스

```tsx
type LP = {
  born: number;
  name: string;
};

interface LP {
  born: number;
  name: string;
}
```

두 구문은 거의 같다.

<aside>
💡 세미콜론(;)을 선호하는 TS 개발자는 대부분 인터페이스 뒤가 아닌 타입 별칭 뒤에 세미콜론을 넣는다. 이 기본 설정은 **세미콜론을 사용해 변수를 선언하는 것**과 세미콜론 없이 **클래스 또는 함수를 선언하는 것의 차이**를 반영한다.

</aside>

```tsx
let valueLater: LP;

// OK
valueLater = {
  born: 1935,
  name: "sara",
};

valueLater = "Emily"; // Error

valueLater = {
  born: true, // Error
  name: "sara",
};
```

변수를 할당하는 것에 대한 할당 가능성 오류는 거의 동일하다.

그렇다면 타입별칭과 인터페이스의 **명확한 차이점?**

- 인터페이스는 속성 증가를 위해 병합merge할 수 있다.

이 기능은 내장된 전역 인터페이스 또는 npm 패키지와 같은 외부 코드를 사용할 때 특히 유용하다.

- 인터페이스는 클래스가 선언된 구조의 타입을 확인하는 데 사용할 수 있지만 타입 별칭은 사용할 수 없다.
- 인터페이스에서 타입검사기가 더 빨리 작동한다.

인터페이스는 타입 별칭이 하는 것처럼 새로운 객체 리터럴의 동적인 복사 붙여넣기 보다 내부적으로 더 쉽게 캐시할 수 있는 명명된 타입을 선언한다.

- 인터페이스는 이름 없는 객체 리터럴의 별칭이 아닌 명명된 객체로 간주되므로 어려운 특이 케이스에서 나타나는 오류 메시지를 좀 더 쉽게 읽을 수 있다.

이런 이유들과 일관성을 유지하기 위해 책의 나머지 부분과 관련된 프로젝트에서는 기본적으로 별칭 객체 형태에 대한 인터페이스를 사용한다. 가능하다면 인터페이스 사용을 추천한다.

### 속성 타입

속성타입은 별칭 객체 타입에도 사용할 수 있다.

**선택적 속성**

객체 타입과 마찬가지로 모든 객체가 필수적으로 인터페이스 속성을 가질 필욘 없다. 타입 애너테이션 : 앞에 ?를 사용해 인터페이스의 속성이 선택적 속성임을 나타낼 수 있다.

```tsx
// 속성타입
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
```

**읽기 전용 속성**

인터페이스에 정의된 객체의 속성을 재할당하지 못하도록 인터페이스 사용자를 차단하고 싶을 때 속성 이름 앞에 readonly 키워드를 추가해 다른 값으로 설정될 수 없음을 나타낸다. 읽을 순 있지만 새로운 값으로 재할당하지 못한다.

```tsx
// 읽기 전용 속성
interface Page {
  readonly text: string;
}

function read(page: Page) {
  // Ok: text 속성을 수정하지 않고 읽는 것
  console.log(page.text);

  page.text += "!"; // Error
}
```

readonly 제한자 modifier는 타입 시스템에만 존재하며 인터페이스에서만 사용할 수 있다. readonly 제한자는 객체의 인터페이스를 선언하는 위치에서만 사용되고 실제 객체에는 적용되지 않는다.

readonly 인터페이스 멤버는 코드 영역에서 객체를 의도치 않게 수정하는 것을 막는 편리한 방법이다. 하지만 타입 시스템 구성일 뿐 컴파일된 JS 출력 코드엔 존재하지 않는다. 개발 중 수정되지 못하도록 보호하는 역할이다.

**함수와 메서드**

타입스크립트에서 인터페이스 멤버를 함수 타입으로 선언할 수 있다.

- 메서드 구문 : 인터페이스 멤버를 member(): void와 같이 객체의 멤버로 호출되는 함수로 선언
- 속성 구문: 인터페이스 멤버를 memver: () ⇒ void와 같이 독립 함수와 동일하게 선언

```tsx
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
```

```tsx
interface OptionalReadonlyFunctions {
  optionalProperty?: () => string;
  optionalMethod?(): string;
}
```

두 가지 방법 모두 선택적 속성 키워드 ?로 나타낼 수 있다.

메서드와 속성 선언은 대부분 서로 교환하여 사용할 수 있는데 **주요 차이점**은 무엇일까?

- 메서드는 readonly로 선언할 수 없지만 속성은 가능하다.
- 인터페이스 병합은 메서드와 속성을 다르게 처리한다.
- 타입에서 수행되는 일부 작업은 메서드와 속성을 다르게 처리한다.
- 기본 함수가 this를 참조할 수 있다는 것을 알고 있다면 메서드 함수를 사용하자. 가장 일반적으로 클래스의 인스턴스에서 사용된다.
- 반대의 경우엔 속성 함수를 사용하라.

**호출 시그니처**

인터페이스와 객체 타입은 **호출 시그니처call signature**로 선언할 수 있다. 호출 시그니처는 값을 함수처럼 호출하는 방식에 대한 타입 시스템의 설명이다. 호출 시그니처가 선언한 방식으로 호출되는 값만 인터페이스에 할당할 수 있다.

즉, 할당 가능한 매개변수와 반환 타입을 가진 함수이다. 호출 시그니처는 함수 타입과 비슷하지만, 콜론(:)대신 화살표(⇒)로 표시한다.

```tsx
type FunctionAlias = (input: string) => number;

interface CallSignature {
  (input: string): number;
}

// 타입 : (input: string) => number
const typedFunctionAlias: FunctionAlias = (input) => input.length; // Ok

// 타입 : (input: string) => number
const typedCallSignature: CallSignature = (input) => input.length; // Ok
```

호출 시그니처는 사용자 정의 속성을 추가로 갖는 함수를 설명하는 데 사용할 수 있다. 타입스크립트는 함수 선언에 추가된 속성을 해당 함수 선언의 타입에 추가하는 것으로 인식한다.

```tsx
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

hasCallCount = doesNotHaveCount; // Error
```

**인덱스 시그니처**

타입스크립트는 인덱스 시그니처 index signature 구문을 제공해 인터페이스의 객체가 임의의 키를 받고, 해당 키 아래의 특정 타입을 반환할 수 있음을 나타낸다. JS 객체 속성 조회는 암묵적으로 키를 문자열로 변환하기 때문에 인터페이스의 객체는 문자열 키와 함께 가장 일반적으로 사용된다. 인덱스 시그니처는 일반 속성 정의와 유사하지만 키 다음에 타입이 있고 {[i: string]: …}과 같이 배열의 대괄호를 갖는다.

```tsx
interface WordCounts {
  [i: string]: number;
}

const counts: WordCounts = {};

counts.apple = 0; // Ok
counts.banana = 1; // Ok

counts.cherry = false; // Error
```

타입 안정성을 완벽하게 보장하지는 않는다. 객체가 어떤 속성에 접근하든 간에 값을 반환해야 함을 나타냄.

```tsx
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
```

키&값 쌍을 저장하려고 하는데 키를 미리 알 수 없다면 Map을 사용하는 편이 더 안전하다. .get메서드는 항상 키가 존재하지 않음을 나타내기 위해 | undefined 타입을 반환한다.

**속성과 인덱스 시그니처 혼합**

인터페이스는 명시적으로 명명된 속성과 포괄적인catchall 용도의 string 인덱스 시그니처를 한번에 포함할 수 있다. 각각의 명명된 속성의 타입은 포괄적인 용도의 인덱스 시그니처로 할당할 수 있어야 한다. 명명된 속성이 더 구체적인 타입을 제공하고, 다른 모든 속성은 인덱스 시그니처의 타입으로 대체하는 것으로 혼합해서 사용할 수 있다.

```tsx
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
const missingOrronoko: HistoricalNovels = {
  Outlander: 1991,
};
```

속성과 인덱스 시그니처를 혼합하는 일반적인 타입 시스템 기법 중 하나는 인덱스 시그니처의 원시 속성보다 명명된 속성에 대해 더 구체적이 속성 타입 리터럴을 사용하는 것이다.

명명된 속성의 타입이 인덱스 시그니처에 할당될 수 있는 경우(각각의 리터럴 및 원시 속성에 해당) 타입스크립트는 더 구체적인 속성 타입 리터럴을 사용하는 것을 허용한다.

```tsx
interface ChapterStarts {
  preface: 0;
  [i: string]: number;
}

const CorrectPreface: ChapterStarts = {
  preface: 0,
  night: 1,
  shopping: 5,
};

const wrongPreface: ChapterStarts = {
  preface: 1, // Error
};
```

**숫자 인덱스 시그니처**

타입스크립트 인덱스 시그니처는 키로 **string 대신 number 타입을 사용할 수 있지만,** 명명된 속성은 그 타입을 포괄적인 용도의 **string 인덱스 시그니처의 타입으로 할당할 수 있어야 한다.**

```tsx
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
  [i: number]: string | undefined; // Error
  [i: string]: string;
}
```

**중첩 인터페이스**

객체 타입이 다른 객체 타입의 속성으로 중첩될 수 있는 것처럼 인터페이스 타입도 자체 인터페이스 타입 혹은 객체 타입을 속성으로 가질 수 있다.

```tsx
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

myNovel = {
  author: {
    name: "Emily Bronte",
  },
  setting: {
    place: "West Yorkshire", // Error
  },
};
```

### 인터페이스 확장

타입스크립트는 인터페이스가 다른 인터페이스의 모든 멤버를 복사해서 선언할 수 있는 확장된extend 인터페이스를 허용한다. 확장할 인터페이스 이름 뒤에 extends 키워드를 추가해서 다른 인터페이스를 확장한 인터페이스라는 걸 표시한다.

이렇게 하면 파생 인터페시으 derived interface를 준수하는 모든 객체가 기본 인터페이스basic interface의 모든 멤버도 가져야 한다는 것을 타입스크립트에게 알려준다.

```tsx
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

let missingPages: Novella = {
  title: "The Awakening", // Error
};

let missingProperty: Novella = {
  pages: 300,
  strategy: "baseline", // Error
  style: "Naturalism",
};
```

인터페이스의 확장은 프로젝트의 한 엔티티 entity 타입이 다른 엔티티의 모든 멤버를 포함하는 상위 집합superset을 나타내는 실용적인 방법이다. 인터페이스 확장 덕분에 여러 인터페이스에 관계를 나타내기 위해 동일한 코드를 반복 입력하는 작업을 피할 수 있다.

**재정의된 속성**

파생 인터페이스는 다른 타입으로 속성을 다시 선언해 기본 인터페이스의 속성을 **재정의override**하거나 ㅠ할 수 있다. 타입스크립트의 타입 검사기는 재정의된 속성이 기본 속성에 할당되어 있도록 강요한다. 이렇게 하면 파생 인터페이스 타입의 인스턴스를 기본 인터페이스 타입에 할당할 수 있다.

속성을 재선언하는 대부분의 파생 인터페이스는 해당 속성은 유니언 타입의 더 구체적인 하위 집합으로 만들거나 속성을 기본 인터페이스의 타입에서 확장된 타입으로 만들기 위해 사용한다.

```tsx
interface WithNullableName {
  name: string | null;
}

interface WithNonNullableName extends WithNullableName {
  name: string;
}

interface WithNumericName extends WithNullableName {
  name: number | string; // Error
}
```

**다중 인터페이스 확장**

타입스크립트의 인터페이스는 여러 개의 다른 인터페이스를 확장해서 선언할 수 있다. 파생 인터페이스 이름에 있는 extends 키워드 뒤에 쉼표로 인터페이스 이름을 구분해 사용하면된다. 파생 인터페이스는 모든 기본 인터페이스의 모든 멤버를 받는다.

```tsx
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
```

여러 인터페이스를 확장하는 방식으로 인터페이스를 사용하면 코드 중복을 줄이고 다른 코드 영역에서 객체의 형태를 더 쉽게 재사용할 수 있다.

### 인터페이스 병합

두 개의 인터페이스가 동일한 이름으로 동일한 스코프에 선언된 경우, 선언된 모든 필드를 포함하는 더 큰 인터페이스가 코드에 추가된다.

```tsx
// 인터페이스 병합
interface Merged {
  fromFirst: string;
}
interface Merged {
  fromSecond: number;
}

// 다음과 같음
interface Merged {
  fromFirst: string;
  fromSecond: number;
}
```

인터페이스 병합은 외부 패키지 또는 Window 같은 내장된 전역 인터페이스를 보강하는 데 특히 유용하다.

**이름이 충돌되는 멤버**

병합된 인터페이스는 타입이 다른 동일한 이름의 속성을 여러 번 선언할 수 없다. 속성이 이미 인터페이스에 선언되어 있다면 나중에 병합된 인터페이스에서도 동일한 타입을 사용해야 한다.

```tsx
interface MergedProperties {
  same: (input: boolean) => string;
  diffrent: (input: string) => string;
}
interface MergedProperties {
  same: (input: boolean) => string; // Ok
  diffrent: (input: number) => string; // Error
}
```

병합된 인터페이스는 동일한 이름과 다른 시그니처를 가진 메서드는 정의할 수 있다. 이렇게 하면 메서드에 대한 함수 오버로드가 발생한다.
