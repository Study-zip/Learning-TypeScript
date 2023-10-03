# 03. 유니언과 리터럴

타입스크립트가 타입을 이해한 값을 바탕으로 추론을 수행하는 두 가지 핵심 개념 **(코드 정보에 입각한 추론)**

- **유니언 Union**: 값에 허용된 타입을 두 개 이상의 가능한 타입으로 확장하는 것
- **내로잉 Narrowing**: 값에 허용된 타입이 하나 이상의 가능한 타입이 되지 않도록 좁히는 것

### 유니언 타입

```tsx
let mathematician = Math.random() > 0.5 ? undefined : "Nami";
```

mathematician은 undefined이거나 string일 수 있다.

(타입스크립트에서 let mathematician: string | undefined 로 표시해줌.)

유니언 타입은 값이 정확히 어떤 타입인지 모르지만 두 개 이상의 옵션 중 하나라는 것을 알고 있는 경우 코드를 처리하는 훌륭한 개념.

**유니언 타입 선언**

변수의 초깃값이 있더라도 변수에 대한 명시적 애너테이션을 제공하는 것이 유용할 때 **유니언 타입**을 사용
초깃값은 null이지만 잠재적으로 null 대신 string이 될 수 있음을 알려준다.

명시적으로 string | null 타입 애너테이션은 타입스크립트가 thinker의 값으로 string 타입의 값을 할당할 수 있음을 의미한다. (선언 순서는 중요하지 않음)

```tsx
let thinker: string | null = null;

if ((Math.random() > 0, 5)) {
  thinker = "Nami";
}
```

**유니언 속성**

값이 유니언 타입일 때 타입스크립트는 유니언으로 선언한 모든 가능한 타입에 존재하는 멤버 속성에만 접근할 수 있다.

```tsx
let physicist =
  Math.random() > 0.5 //
    ? "marie curie"
    : 84;

physicist.toString();
physicist.toUpperCase(); // 오류
physicist.toFixed(); // 오류
```

객체가 어떤 속성을 포함한 타입으로 확실하게 알려지지 않은 경우 접근을 제한한다.

유니언 타입으로 정의된 여러 타입 중 하나의 타입으로 된 값의 속성을 사용하려면 코드에서 값이 **구체적인 타입 specific type** 중 하나라는 것을 타입스크립트에 알려야 한다. ⇒ **내로잉**

### 내로잉

내로잉은 값이 정의, 선언 혹은 이전에 유추된 것보다 더 구체적인 타입임을 코드에서 유추하는 것.

타입스크립트가 값의 타입이 이전에 알려진 것보다 더 좁혀졌다는 것을 알게 되면 더 구체적인 타입으로 취급한다.

타입을 좁히는 데 사용할 수 있는 논리적 검사를 **타입 가드 type guard**라고 한다.

타입스크립트가 코드에서 타입을 좁히는 데 흔히 사용하는 타입 가드 두 가지

**값 할당을 통한 내로잉**

변수에 값을 직접 할당하면 타입스크립트는 변수의 타입을 할당된 값의 타입으로 좁힌다.

```tsx
let admiral: number | string;
admiral = "nami";
admiral.toUpperCase();

admiral.toFixed();
```

변수에 **유니언 타입 애너테이션**이 명시되고 **초깃값**이 주어질 때 **값 할당 내로잉**이 작동한다.

타입스크립트는 변수가 나중에 유니언 타입으로 선언된 타입 중 하나의 값을 받을 수 있지만, 처음엔 초기에 할당된 값의 타입으로 시작한다는 걸 이해한다.

**조건 검사를 통한 내로잉**

일반적으로 타입스크립트에서는 변수가 알려진 값과 같은지 확인하는 **if문**을 통해 변수의 값을 좁히는 방법을 사용한다. if문 내에서 **변수가 알려진 값과 동일한 타입인지 확인**한다.

```
// scientist: number | string의 타입
let scientist =
  Math.random() > 0.5 //
    ? "Rosalin"
    : 51;

if (scientist === "Rosalin") {
  // scientist: string의 타입
  scientist.toUpperCase(); // OK
}

// scientist: number | string의 타입
scientist.toUpperCase();
```

**typeof 검사를 통한 내로잉**

직접 값을 확인해 타입을 좁히기도 하지만 typeof 연산자를 사용할 수도 있다.

```tsx
let researcher =
  Math.random() > 0.5 //
    ? "Rocalind"
    : 51;

if (typeof researcher === "string") {
  researcher.toUpperCase();
}

if (!(typeof researcher === "string")) {
  researcher.toFixed();
} else {
  researcher.toUpperCase();
}

typeof researcher === "string"
  ? researcher.toUpperCase() //
  : researcher.toFixed();
```

!를 사용한 논리 부정과 else 문도 잘 작동하고 삼항 연산자를 이용해 다시 작성할 수도 있다.

### 리터럴 타입 literal type

원시 타입 값 중 어떤 것이 아닌 **특정 원싯값**으로 알려진 타입이 리터럴 타입.

원시 타입 string은 존재할 수 있는 모든 가능한 문자열의 집합을 나타내지만 리터럴 타입인 “Hypatia”는 **하나의 문자열**만 나타낸다.

const로 변수를 선언하고 직접 리터럴 값을 할당하면 타입스크립트는 해당 변수를 할당된 리터럴 값으로 유추한다.

```tsx
const nami = "Nami"; // "Nami"
let philosopher = "Nami"; // string
```

유니언 타입 애너테이션에서는 리터럴과 원시타입을 섞어서 사용할 수 있다.

```tsx
let lifespan: number | "ongoing" | "uncertain";

lifespan = 89;
lifespan = "ongoing";
lifespan = true; // 오류
```

**리터럴 할당 가능성**

0과 1처럼 동일한 원시 타입일지라도 서로 다른 리터럴 타입은 서로 할당할 수가 없다.

그러나 리터럴 타입은 그 값이 해당하는 원시타입에 할당할 수 있다.

```tsx
let specificallyAda: "Ada";
specificallyAda = "Ada";
specificallyAda = "Byron"; // 오류

let someString = "";
specificallyAda = someString; // 오류

someString = ":)";
```

**엄격한 null 검사 strict null checking**

리터럴로 좁혀진 유니언의 힘은 타입스크립트에서 엄격한 null 검사라 부르는 타입 시스템 영역인 **‘잠재적으로 정의되지 않은 undefined 값’** 으로 작업할 때 두드러진자.

**십억 달러의 실수**

다른 타입이 필요한 위치에서 null값을 사용하도록 허용하는 많은 타입시스템을 가리키는 업계 용어.

strictNullChecks는 엄격한 null 검사를 활성화할지 여부를 결정한다. 비활성화시 모든 타입에 | null | undefined를 추가한 것처럼 동작한다. 모든 변수가 null 또는 undefined를 할당할 수 있다.

```tsx
let nameMaybe =
  Math.random() > 0.5 //
    ? "Tony Hoare"
    : undefined;

nameMaybe.toLowerCase(); // 오류
```

엄격한 null 검사를 활성화해야만 코드가 null 또는 undefined 값으로 인한 오류로부터 안전한지 여부를 쉽게 파악할 수 있다.

**참 검사를 통한 내로잉**

**JS에서 참 또는 truthy**는 && 연산자 또는 if문처럼 bollean 문맥에서 true로 간주된다는 점을 떠올려보자.

자바스크립트에서 **false, 0, -0, 0n, “”, null, undefined, NaN**처럼 **falsy로 정의된 값을 제외한 모든 값**은 **모두 참**이다.

타입스크립트는 잠재적인 값 중 **truthy**로 확인된 **일부**에 한해서만 변수의 타입을 좁힐 수 있다.

&&과 ?는 참 여부를 검사하는 일도 잘 수행하지만 그 외 다른 기능은 제공하지 않는다.

string | undefined 값에 대해 falsy만 알고 있다면 그것이 빈 문자열인지 undefined인지 알 수 없다.

```tsx
let geneticist =
  Math.random() > 0.5 //
    ? "Barbara"
    : undefined;

if (geneticist) {
  geneticist.toUpperCase(); // 오류
}

geneticist && geneticist.toUpperCase(); // ok: string | undefined
geneticist?.toUpperCase(); // ok: string | undefined
```

false | string타입인 위 코드는 if문에선 string으로 좁힐 수 있지만 else 문에서 빈 문자열일 경우엔 여전히 string이 될 수 있음을 알 수 있다.

```tsx
let biologist = Math.random() > 0.5 && "Rachel";

if (biologist) {
  biologist; // 타입 : string
} else {
  biologist; // 타입 : false | string
}
```

**초깃값이 없는 변수**

자바스크립트에서 초깃값이 없는 변수는 기본적으로 undefined가 된다. 이는 타입 시스템에서 극단적인 경우를 나타낸다.

undefined를 포함하지 않는 타입으로 변수를 선언한 다음, **값을 할당하기 전에 사용**하려고 **시도**하면 어떻게 될까? 타입스크립트는 **값이 할당될 때까지 변수가 undefined임을 이해할 만큼 영리**하다.

```tsx
let people: string;
people?.length; // undefined라 오류

people = "Mark";
people.length; // OK
```

```tsx
let people1: string | undefined;
people?.length; // OK

people = "Mark";
people.length; // OK
```

변수 타입에 undefined가 포함되어 있는 경우 오류가 보고되지 않음.

**타입 별칭**

코드에서 볼 수 있는 유니언 타입 대부분은 두세 개의 구성요소만 갖는다. 그러나 반복해서 입력하기 불편한 긴 형태의 유니언 타입을 발견할 수 있다.

```tsx
let rawDataFirst: Boolean | Number | string | null | undefined;
let rawDataSecond: Boolean | Number | string | null | undefined;
let rawDataThird: Boolean | Number | string | null | undefined;
```

타입스크립트에는 재사용하는 타입에 더 쉬운 이름을 할당하는 **타입 별칭 type alias**이 있다.

**type 새로운 이름 = 타입** 형태를 갖는다. 편의상 타입 별칭은 **파스칼 케이스 PascalCase**로 이름을 지정한다.

타입 별칭은 타입 시스템의 복사 붙여넣기 처럼 작동한다. 타입스크립트가 타입 별칭을 발견하면 해당 별칭이 참조하는 실제 타입을 입력한 것처럼 작동한다.

```tsx
type RawData = Boolean | Number | string | null | undefined;
let rawDataFirst: RawData;
let rawDataSecond: RawData;
let rawDataThird: RawData;
```

**타입 별칭은 자바스크립트가 아니다.**

타입 별칭은 타입 애너테이션처럼 자바스크립트로 컴파일되지 않는다. 순전히 타입스크립트 타입 시스템에만 존재한다. 타입 별칭은 순전히 타입 시스템에만 존재하므로 런타임 코드에서는 참조할 수 없다.

```tsx
type Sometype = string | undefined;

console.log(SomeType); // 오류
```

타입 별칭은 순전히 **개발 시**에만 존재한다.

**타입 별칭 결합**

타입 별칭은 다른 타입 별칭을 참조할 수 있다.

유니언 타입인 타입 별칭 내에 또 다른 유니언 타입인 타입 별칭을 포함하고 있다면 다른 타입 별칭을 참조하는 게 유용하다.

```tsx
type Id = Number | String;

// IdMaybe 타입은 다음과 같음 : number | string | undefined | null
type IdMaybe = Id | undefined | null;
```

사용 순서대로 타입 별칭을 선언할 필요는 없다.

```
type IdMaybe = Id | undefined | null;
type Id = Number | String;
```
