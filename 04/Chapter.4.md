# 04. 객체

타입스크립트는 복잡한 객체를 어떻게 설명할까?, 객체의 할당 가능성은 어떻게 확인할까?

### 객체 타입

{ … } 구문을 사용해서 객체 리터럴을 생성하면 타입 스크립트는 해당 속성을 기반으로 **새로운 객체 타입** 또는 **타입 형태**를 고려한다. 해당 객체 타입은 **객체의 값**과 **동일한 속성명**과 **원시 타입**을 갖는다.

값의 속성에 접근하려면 `value.멤버` 또는 `value['멤버']` 구문을 사용한다.

```tsx
const poet = {
  born: 1935,
  name: "Mary Oliver",
};

poet["born"]; // 타입 : number
poet.name; // 타입 : string

poet.end; // 오류
```

null 과 undefined를 제외한 모든 값은 그 값에 대한 실제 타입의 멤버 집합을 가지므로 타입스크립트는 모든 값의 타입을 확인하기 위해 객체 타입을 이해해야 한다.

**객체 타입 선언**

객체의 타입을 명시적으로 선언하기.

타입이 선언된 객체와는 별도로 객체의 형태를 설명하는 방법

객체 타입은 객체 리터럴과 유사하게 보이지만 **필드 값 대신 타입을 사용해 설명**한다. 타입스크립트가 타입 할당 가능성에 대한 오류 메시지에 표시하는 것과 동일한 구문이다.

```tsx
let poetLater: {
  born: number;
  name: string;
};

// Ok
poetLater = {
  born: 1935,
  name: "Mary Oliver",
};

poetLater = "Sappho"; // 오류
```

**별칭 객체 타입**

`{born: number, name: string}` 과 같은 객체 타입을 계속 작성하는 일은 매우 귀찮다.

각 객체 타입에 **타입 별칭**을 할당해 사용하는 방법이 더 일반적이다.

```tsx
type Poet = {
  born: number;
  name: string;
};

let poetLater1: Poet;

// Ok
poetLater1 = {
  born: 1940,
  name: "Sara Readfla",
};

poetLater = "Emily Dickinson"; // 오류
```

다음과 같이 Poet 타입으로 재작성할 수 있고 오류 메시지를 좀더 직접적으로 읽기 쉽게 만드는 추가 이점이 있다.

✔️ 대부분의 타입스크립트 프로젝트는 객체 타입을 설명할 때 interface인터페이스 키워드를 사용하는 것을 선호한다. 별칭 객체 타입과 인터페이스는 거의 동일.

**객체 타입을 살펴보는 이유?**

타입스크립트의 타입 시스템을 배울 때 타입스크립트가 **객체 리터럴을 해석하는 방법**을 이해하는 것이 매우 중요하기 때문.

### 구조적 타이핑

타입스크립트의 타입 시스템은 **구조적으로 타입화 Structurally typed** 되어 있다. 즉, 타입을 충족하는 모든 값을 해당 타입의 값으로 사용할 수 있다.

⇒ 매개변수나 변수가 특정 객체 타입으로 선언되면 타입스크립트에 어떤 객체를 사용하든 해당 속성이 있어야 한다고 말해야 함.

```tsx
type WithFirstName = {
  firstName: string;
};

type WithLastName = {
  lastName: string;
};

const hasBoth = {
  firstName: "Lucille",
  lastName: "Clifton",
};

// Ok: hasBoth는 string 타입의 firstName을 포함함
let withFirstName: WithFirstName = hasBoth;

// Ok: hasBoth는 string 타입의 lastName을 포함함
let withLastName: WithLastName = hasBoth;
```

다음 별칭 객체 타입인 `WithFirstName`과 `WithLastName`은 오직 `string` 타입의 단일 멤버만 선언한다.

`hasBoth` 변수는 명시적으로 선언되지 않았음에도 두 개의 별칭 객체 타입을 모두 가지므로 타입내에 선언된 변수를 모두 제공할 수 있다.

구조적 타이핑은 **덕 타이핑 Duck typing**과는 다르다.

⇒ **덕 파이핑?** 동적 타이핑의 한 종류로 **객체의 변수 및 메서드의 집합**이 **객체의 타입을 결정**하는 것.

- 타입스크립의 타입 검사기에서 구조적 타이핑은 정적 시스템이 검사하는 경우
- 덕 타이핑은 런타임에서 사용될 때까지 객체 타입을 검사하지 않는 것

JS는 덕타입 Duck type인 반명 TS는 구조적으로 타입화된다.

**사용 검사**

객체 타입으로 애너테이션된 위치에 값을 제공할 때 타입스크립트는 값을 해당 객체 타입에 할당할 수 있는지 확인한다.

할당하는 값에는 **객체 타입의 필수 속성**이 있어야 한다. 객체 타입에 필요한 멤버가 객체에 없다면 타입스크립트는 **타입 오류**를 발생시킨다.

```tsx
type FirstAndLastNames = {
  first: string;
  last: string;
};

// Ok
const hasBoth1: FirstAndLastNames = {
  first: "Sarojini",
  last: "Naidu",
};

const hasOnlyOne: FirstAndLastNames = {
  first: "Sappho", // 오류 : last속성이 없음.
};
```

두 가지 속성이 모두 없는 객체는 사용할 수 없다.

```tsx
type TImeRange = {
  start: Date;
};

const hasStartString: TImeRange = {
  start: "1879-02-13",
};
```

둘 사이에 일치하지 않는 타입도 허용되지 않는다. 객체 타입은 필수 속성 이름과 해당 속성이 예상되는 타입을 모두 지정한다. 객체의 속성이 일치하지 않으면 타입스크립트는 타입 오류를 발생시킴.

**초과 속성 검사**

변수가 객체 타입으로 선언되고, 초깃값에 객체 타입에서 정의된 것보다 많은 필드가 있다면 오류가 발생한다.

⇒ 변수를 객체 타입으로 선언하는 것은 타입 검사기가 해당 타입에 예상되는 필드만 있는지 확인하는 방법이기도 하다.

```tsx
type Poet1 = {
  born: number;
  name: string;
};

// Ok: Poet의 필드와 일치함
const poetMatch: Poet1 = {
  born: 1928,
  name: "Maya Angelou",
};

const extraProperty: Poet = {
  activity: "walking", // 초과 속성으로 오류
  born: 1935,
  name: "Mary Oliver",
};
```

초과 속성 검사는 객체 타입으로 선언된 위치에서 생성되는 **객체 리터럴**에 대해서만 일어난다. 기존 객체 리터럴을 제공하면 초과 속성 검사를 우회한다.

extraPropertyButOk 변수는 초깃값이 구조적으로 Poet과 일치하기 때문에 이전 예제의 Poet 타입처럼 타입 오류가 발생하지 않는다.

```tsx
const exsitingObject = {
  activity: "walking",
  born: 1934,
  name: "Mary Oliver",
};

const extraPropertyButOk: Poet1 = exsitingObject;
```

장에서 보게 될 배열 요소, 클래스 필드 및 함수 매개변수가 포함된 객체 타입과 일치할거라 예상되는 위치에서 생성되는, 새로운 객체가 있는 모든 곳에서 초과 속성 검사가 일어난다.

**중첩된 객체 타입**

JS 객체는 다른 객체의 멤버로 중첩될 수 있으므로 TS의 객체 타입도 타입 시스템에서 중첩된 객체 타입을 나타낼 수 있어야 한다. 이를 구현하는 구문은 기본 이름 대신 **{ … } 객체 타입을 사용**한다.

```tsx
type Poem2 = {
  author: {
    firstName: string;
    lastName: string;
  };
  name: string;
};

// Ok
const poemMatch: Poem2 = {
  author: {
    firstName: "Sylvia",
    lastName: "Plath",
  },
  name: "Lady Lazarus",
};

const poemMismatch: Poem2 = {
  author: {
    name: "Sylvia", // 오류 : 속성이 다름
  },
  name: "Tulips",
};
```

Poem타입을 작성할 때 author 속성의 형태를 자체 별칭 객체 타입으로 추출하는 방법도 있다. 중첩된 타입을 자체 타입 별칭으로 추출하면 타입스크립트의 타입 오류 메시지에 더 많은 정보를 담을 수 있다.
`{ firstName: string, lastName: string;}` 대신 `Author`를 사용할 수 있다.

```tsx
type Author = {
  firstName: string;
  lastName: string;
};

type Poem3 = {
  author: Author;
  name: string;
};

const poemMismatch: Poem3 = {
  author: {
    name: "Sylbia", // 오류
  },
  name: "Tulips",
};
```

이처럼 중첩된 객체 타입을 고유한 타입 이름으로 바꿔서 사용하면 코드와 오류메시지가 더 읽기 쉬워진다.

**선택적 속성**

모든 객체에 객체 타입 속성이 필요한 건 아니다. 타입의 속성 애너테이션에서 `:` 앞에 `?` 를 추가하면 선택적 속성임을 나타낼 수 있다.

```tsx
type Book = {
  author?: string;
  pages: number;
};

// Ok
const ok: Book = {
  author: "Rita Dove",
  pages: 80,
};

const missing: Book = {
  author: "Tonardo", // 오류 : pages 속성이 필수인데 빠짐
};
```

Book 타입은 pages 속성만 필요하고 author 속성은 선택적으로 허용한다. 객체가 pages 속성을 제공하기만 하면 author 속성은 제공하거나 생략할 수 있다.

🌟 선택적 속성과 `undefined`를 포함한 유니언 타입의 속성 사이에는 차이가 있음을 명심! `?` 를 사용해 선택적으로 선언된 속성은 존재하지 않아도 된다. 필수로 선언된 속성과 `| undefined`는 `undefined`일지라도 반드시 존재해야 함.

```tsx
type Writers = {
  author: string | undefined;
  editor?: string;
};

// Ok: author는 undefined으로 제공됨
const hasRequired: Writers = {
  author: undefined,
};

const missingRequired: Writers = {};
```

editor 속성을 ?를 사용하여 생략 가능. author 속성은 ?가 없으므로 undefined여도 반드시 존재해야 함.

### 객체 타입 유니언

타입 스크립트 코드에서는 속성이 조금 다른, 하나 이상의 서로 다른 객체 타입이 될 수 있는 타입을 설명할 수 있어야 한다. 속성값을 기반으로 해당 객체 타입 간의 타입을 좁혀야 할 수 있음.,

**유추된 객체 타입 유니언**

- 변수에 **여러 객체 타입 중 하나가 될 수 있는 초깃값**이 주어지면 타입스크립트는 해당 타입을 **객체 타입 유니언**으로 유추한다.
- 유니언 타입은 가능한 각 객체 타입을 구성하고 있는 요소를 모두 가질 수 있다.
- 객체 타입에 정의된 각각의 가능한 속성은 비록 초깃값이 없는 선택적 `?` 타입이지만 각 객체 타입의 구성 요소로 주어진다.

```tsx
const poem =
  Math.random() > 0.5 //
    ? { name: "The Double Image", pages: 8 }
    : { name: "Her Kind", rhymes: true };

// 타입 :
// {
//     name: string;
//     pages: number;
//     rhymes?: undefined;
// }
// |
// {
//     name: string;
//     pages?: undefined;
//     rhymes: boolean;
// }
poem.name; // string
poem.pages; // number | undefined
poem.rhymes; // booleans | undefined
```

poem 값은 항상 string 타입인 name 속성을 가지며 pages와 rhymes는 있을 수도 있고 없을 수도 있다.

**명시된 객체 타입 유니언**

**객체 타입의 조합을 명시**하면 객체 타입을 더 명확히 정의할 수 있다. 코드를 더 작성해야 하지만 객체 타입을 더 많이 제어할 수 있다는 이점. 특히 값의 타입이 **객체 타입으로 구성된 유니언**이라면 타입스크립트의 타입 시스템은 **모든 유니언 타입에 존재하는 속성에 대한 접근만 허용**된다.

```tsx
type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 46 }
    : { name: "Her kind", rhymes: true };

poem.name; // Ok

poem.pages;
poem.rhymes;
```

잠재적으로 존재하지 않는 객체의 멤버에 대한 접근을 제한하면 코드의 안전성이 증가. 값이 여러 타입 중 하나일 경우 모든 타입에 존재하지 않는 속성이 객체에 존재할거라 보장할 수 없다.

모든 타입에 **존재하지 않은 속성**에 접근하기 위해 **객체 타입 유니언**도 타입을 좁혀야 함.

**객체 타입 내로잉**

코드에서 **객체의 형태**를 확인하고 **타입 내로잉**이 객체에 적용된다.

```tsx
if ("pages" in poem) {
  poem.pages; // Ok : poem은 PoemWithPages로 좁혀짐
} else {
  poem.rhymes; // Ok : poem은 PoemWithRhymes로 좁혀짐
}
```

`if (poem.pages)` 와 같은 형식으로 참 여부를 확인하는 것을 허용하지 않음. 존재하지 않는 객체의 속성에 접근하려고 시도하면 타입 가드처럼 작동하는 방식으로 사용되더라도 **타입 오류**로 간주됨.

**판별된 유니언**

객체의 속성이 객체의 형태를 나타내도록 하는 형태 **판별된 유니언 discriminated union,** 객체의 타입을 가리키는 속성이 **판별값**이다. 타입스크립트는 코드에서 판별 속성을 사용해 **타입 내로잉**을 수행한다.

```tsx
type PoemWithPages1 = {
  name: string;
  pages: number;
  type: "pages";
};

type PoemWithRhymes1 = {
  name: string;
  rhymes: boolean;
  type: "rhymes";
};

type Poem4 = PoemWithPages1 | PoemWithRhymes1;

const poem2: Poem4 =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 46, type: "pages" }
    : { name: "Her kind", rhymes: true, type: "rhymes" };

if (poem2.type === "pages") {
  console.log(`It's got pages: ${poem2.pages}`); // Ok
} else {
  console.log(`It's got rhymes: ${poem2.rhymes}`);
}

poem2.type; // 타입 : 'pages' | 'rhymes'
poem2.pages; // 오류
```

### 교차 타입

타입스크립트 유니언 타입은 둘 이상의 다른 타입 중 하나의 타입이 될 수 있음을 나타냄.

JS의 런타임 | 연산자가 & 연산자에 대응하는 역할을 하는 것처럼, TS에서도 **& 교차타입 intersection type** 을 사용해 여러 타입을 동시에 나타낸다.

교차 타입은 일반적으로 여러 기존 객체 타입을 **별칭 객체 타입**으로 결합해서 **새로운 타입**을 생성함

```tsx
type Artwork = {
  genre: string;
  name: string;
};

type Writing = {
  pages: number;
  name: string;
};

type WrittenArt = Artwork & Writing;

// 다음과 같음 :
// {
//   genre: string;
//   name: string;
//   pages: number;
// }
```

교차 타입은 유니언 타입과 결합할 수 있고 하나의 타입으로 판별된 유니언 타입을 설명하는 데에 유용.

```tsx
type ShortPoem = { author: string } & ( //
  | { kigo: string; type: "haiku" }
  | { meter: number; type: "villanelle" }
);

// Ok
const morningGlory: ShortPoem = {
  author: "Fukuda Chiyo-ni",
  kigo: "Morning Glory",
  type: "haiku",
};

const oneArt: ShortPoem = {
  // 오류 : 형식이 맞지 않음
  author: "Elizabeth Bishop",
  kigo: "villanelle",
};
```

ShortPoem 타입은 항상 author 속성을 가지며 하나의 type 속성으로 판별된 유니언 타입이다.

**교차 타입의 위험성**

컴파일러를 혼동시키는 방식일 수 있다. 가능한 한 코드를 간결하게 유지 해야됨.

1. 긴 할당 가능성 오류

- 타입을 일련의 별칭으로 된 객체 타입으로 분할하면 읽기 쉬워짐.

```tsx
type ShortPoemBase = { author: string };
type Haiku = ShortPoemBase & { kigo: string; type: "haiku" };
type Villanelle = ShortPoemBase & { meter: number; type: "villanelle" };
type ShortPoem0 = Haiku | Villanelle;

const oneArt0: ShortPoem0 = {
  // 오류 : 형식이 안맞음
  author: "Elizabeth Bishop",
  kigo: "villanelle",
};
```

**never 타입**

교차 타입은 잘못 사용하기 쉽고 불가능한 타입을 생성한다. 원시 타입의 값은 동시에 여러 타입이 될 수 없기 때문에 교차 타입의 구성 요소로 함께 결합할 수 없다. 두 개의 원시 타입을 함께 시도하면 never 키워드로 표혀되는 never 타입이 된다.

```tsx
type NotPossible = number & string; // 타입 : never
```

never 키워드와 never 타입은 프로그래밍 언어에서 bottom 또는 empty 타입을 뜻한다. bottom 타입은 값을 가질 수 없고 참조할 수 없는 타입. ⇒ bottom타입에 어떠한 타입도 제공 불가능

```tsx
let notNumber: NotPossible = 0;
let notString: never = "";
```

대부분의 타입스크립트 프로젝트는 never 타입을 거의 사용하지 않지만 코드에서 불가능한 상태를 나타내기 위해 가끔 등장한다. (하지만 대부분 교차 타입 실수일 가능성이 높음)
