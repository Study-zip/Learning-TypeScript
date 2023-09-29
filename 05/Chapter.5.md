# Chapter 5. 함수

### 함수 매개변수

함수 매개변수와 반환 타입에서 동일한 작업을 수행하는 방법, 이 방법이 유용한 이유?

```tsx
function sing(song) {
  console.log(`Singing: ${song}!`);
}
```

song 매개변수를 제공하기 위해 의도한 값의 타입은 무엇일까요? string일까요? 재정의된 toString() 메서드가 있는 객체일까요? **명시적 타입 정보**가 선언되지 않으면 절대 타입을 알 수 없다.

타입스크립트는 이를 any타입으로 간주하며 매개변수의 타입은 무엇이든 될 수 있다.

타입스크립트는 타입 오류로 오류를 계속 알리지만, 이미 시작된 JS 코드는 계속 실행된다. 타입 선언이 누락된 코드 스니펫은 여전히 변환된다. 추후에 any타입 매개변수의 오류를 설정하는 방법을 살펴보겠다.

**필수 매개변수**

타입스크립트는 함수에 선언된 모든 매개변수가 필수라고 가정한다. 잘못된 수의 인수로 호출되면 타입 오류의 형태로 이의를 제기한다.

```tsx
function singTwo(first: string, second: string) {
  console.log(`${first} / ${second}`);
}

singTwo("Ball and Chain"); // 오류 - 인수 1개
singTwo("I will survive", "Higher Love"); // Ok
singTwo("Go Your Own Way", "The Chain", "Don't lookup"); // 오류 - 인수 3개
```

함수에 **필수 매개변수 required parameter**를 제공하도록 강제하면 예상되는 모든 인숫값을 함수 내에 존재하도록 만들어 타입 안정성을 강화하는 데 도움이 된다.

✔️ 매개변수는 인수로 받을 것으로 예상되는 함수의 선언을 나타낸다.
first, second - 매개변수, “The Chain” - 인수

**선택적 매개변수**

자바스크립트에서 함수 매개변수가 제공되지 않으면 함수 내부의 인숫값은 undefined로 기본값이 설정된다.

타입스크립트에서는 선택적 객체 타입 속성과 유사하게 타입 애너테이션의 `:` 앞에 `?` 를 추가해 매개변수가 선택적이라고 표시한다.

함수 호출에 **선택적 매개변수 optional parameter**를 제공할 필요는 없다. 선택적 매개변수엔 항상 `| undefined` 가 유니언 타입으로 추가되어있다.

```tsx
function announceSong(song: string, singer?: string) {
  console.log(`Song: ${song}`);

  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}

announceSong("위로"); // Ok
announceSong("위로", undefined); // Ok
announceSong("위로", "권진아"); // Ok
```

선택적 매개변수는 항상 암묵적으로 undefined가 될 수 있다. singer는 `string | undefined` 타입으로 시작한 후 if 문에 따라 string 타입으로 좁혀진다.

선택적 매개변수는 `| undefined`를 포함하는 유니언 타입 매개변수와 다르다. ?으로 표시된 선택적 매개변수가 아닌 매개변수는 값이 명시적으로 undefined일지라도 항상 제공되어야 함.

```tsx
function announceSongBy(song: string, singer: string | undefined) {
  console.log(`Song: ${song}`);

  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}

announceSongBy("마음이 그래"); // 오류 = undefined라도 있어야함.
announceSongBy("마음이 그래", undefined);
announceSongBy("마음이 그래", "권진아 & 개코");
```

함수에서 사용되는 모든 선택적 매개변수는 마지막 매개변수여야 한다. 필수 매개변수 전에 선택적 매개변수를 위치시키면 다음과 같이 구문 오류가 뜬다.

```tsx
function announceSong1(singer?: string, song: string) {...} // 오류 - 필수 매개변수 전에 선택적 매개변수가 와서
```

### 기본 매개변수

매개변수에 기본값이 있고 타입 애너테이션이 없는 경우 해당 기본값을 기반으로 매개변수 타입을 유추한다.

```tsx
function rateSong(song: string, rating = 0) {
  console.log(`${song} gets ${rating}/5 stars!`);
}

rateSong("Photograph");
rateSong("Set fire to the rain", 5);
rateSong("Set fire to the rain", undefined);

rateSong("At Last!", "100"); // 오류
```

rateSong 함수에서 rating은 number 타입으로 유추되지만 함수를 호출하는 코드에서는 선택적 `number | undefined`가 된다.

**나머지 매개변수**

`…` 스프레드 연산자는 함수 선언의 마지막 매개변수에 위치하고 해당 매개변수에서 시작해 함수에 전달된 **나머지 rest** 인수가 모두 단일 배열에 저장되어야 함을 나타낸다.

**나머지 매개변수 rest parameter**의 타입을 일반 매개변수와 유사하게 선언할 수 있다.단 인수 배열을 나타내기 위해 끝에 **[] 구문**이 추가된다는 점만 다르다.

```tsx
function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song}, by ${singer}`);
  }
}

singAllTheSongs("잔나비"); // Ok
singAllTheSongs("잔나비", "주저하는 연인들을 위해"); // Ok
singAllTheSongs("잔나비", "주저하는 연인들을 위해", "초록을 거머쥔 우리는"); // Ok

singAllTheSongs("잔나비", 2000); // 오류 - string만 가능
```

singAllTheSongs는 songs 나머지 매개변수에 대해 0개 이상의 string 타입 인수를 사용할 수 있다.

### 반환 타입

타입스크립트는 **지각적perceptive**이다. 함수가 반환할 수 있는 가능한 모든 값을 이해하면 함수가 반환하는 타입을 알 수 있다.

```tsx
// 타입 : (songs: string[]) => number
function singSongs(songs: string[]) {
  for (const song of songs) {
    console.log(`${song}`);
  }
  return songs.length;
}
```

함수에 다른 값을 가진 여러 개의 반환문을 포함하고 있다면, 타입스크립트는 반환 타입 return type을 가능한 모든 반환 타입의 조합으로 유추한다.

```tsx
// 타입: (songs: string[], index: number) => string | undefined
function getSongAt(songs: string[], index: number) {
  return index < songs.length //
    ? songs[index]
    : undefined;
}
```

**명시적 반환 타입**

변수와 마찬가지로 타입 애너테이션을 사용해 함수의 반환 타입을 명시적으로 선언하지 않는 것이 좋다. 하지만 유용할 때가 있다.

- 가능한 반환값이 많은 함수가 항상 동일한 타입의 값을 반환하도록 강제한다
- 타입스크립트는 재귀 함수의 반환 타입을 통해 타입을 유추하는 것을 거부한다
- 수백 개 이상의 타입스크립트 파일이 있는 매우 큰 프로젝트에서 타입스크립트 타입 검사 속도를 높일 수 있다.

함수 선언 반환 타입 애너테이션은 매개변수 목록이 끝나는 `)` 다음에 배치된다. 함수 선언의 경우엔 `{` 앞에 배치된다.

```tsx
function singSongRecursive(songs: string[], count = 0): number {
  return songs.length ? singSongRecursive(songs.slice(1), count + 1) : count;
}

const singSongRecursive1 = (songs: string[], count = 0): number =>
  songs.length ? singSongRecursive1(songs.slice(1), count + 1) : count;
```

화살표 함수의 경우 ⇒ 앞에 배치된다.

함수의 반환문이 함수의 반환 타입으로 할당할 수 없는 값을 반환하면 할당 가능성 오류를 표시한다.

```tsx
function getSongRecordingDate(song: string): Date | undefined {
  switch (song) {
    case "strange fruit":
      return new Date("April 20, 1939"); // Ok

    case "Greensleeves":
      return "unknown"; // 오류 - 할당 가능성 오류

    default:
      return undefined; // Ok
  }
}
```

### 함수 타입

자바스크립트에선 함수를 값으로 전달할 수 있다. 즉, 함수를 가지기 위한 매개변수 또는 변수의 타입을 선언하는 방법이 필요하다.

**함수 타입function type**구문은 화살표 함수와 유사하지만 함수 본문 대신 타입이 있다.

```tsx
let nothingInGivesString: () => string;
```

⇒ nothingInGivesString 변수 타입은 매개변수가 없고 string 타입을 반환하는 함수

```tsx
let inputAndOutput: (songs: string[], count?: number) => number;
```

⇒ inputAndOutput 변수 타입은 string[] 매개변수와 count 선택적 매개변수 및 number값을 반환하는 함수임을 설명한다.

함수 타입은 콜백 매개변수(함수로 호출되는 매개변수)를 설명하는 데 자주 사용된다.

```tsx
const songs = ["Juice", "Shake It Off", "What's Up"];

function runOnSongs(getSongAt: (index: number) => string) {
  for (let i = 0; i < songs.length; i += 1) {
    console.log(getSongAt(i));
  }
}
function getSongAt(index: number) {
  return `${songs[index]}`;
}
runOnSongs(getSongAt); // Ok

function logSong(song: string) {
  return `${song}`;
}

runOnSongs(logSong); // 오류 = 매개변수로 string을 사용하므로
```

getSongAt을 전달하면 해당 타입과 일치하지만, logSong은 매개변수로 number 대신 string을 사용하므로 반환값을 가져오는 데 실패한다.

runOnSongs(logSong)에 대한 오류 메시지는 할당 가능성 오류의 예로 몇 가지 상세한 단계까지 제공한다. 두 함수를 서로 할당할 수 없다는 오류를 출력할 때 타입스크립트는 일반적으로 3가지의 상세 단계를 제공한다.

1. 첫 번째 들여쓰기 단계는 두 함수 타입을 출력한다.
2. 다음 들여쓰기 단계는 **일치하지 않는 부분을 지정**한다.
3. 마지막 들여쓰기 단계는 일치하지 않는 부분에 대한 정확한 **할당 가능성 오류를 출력**한다.

![스크린샷 2023-09-29 23.03.51.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8819e9d8-5908-4a5f-ab34-e991e8862934/d7f21c80-306d-4032-bb17-7df9c553b7a6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-09-29_23.03.51.png)

**함수 타입 괄호**

함수 타입은 다른 타입이 사용되는 모든 곳에 배치할 수 있다. 유니언 타입도 포함.

유니언 타입의 애너테이션에서 함수 반환 위치를 나타내거나 유니언 타입을 감싸는 부분을 표시할 때 괄호를 사용한다.

```tsx
// 타입은 string | undefined 유니언을 반환하는 함수
let returnStringOrUndefined: () => string | undefined;
// 타입은 undefined나 string을 반환하는 함수
let maybeReturnString: (() => string) | undefined;
```

**매개변수 타입 추론**

매개변수로 사용되는 **인라인 함수 inline function**를 포함하여 작성한 모든 함수에 대해 매개변수를 선언해야 한다면 번거롭다. 하지만 타입스크립트는 선언된 타입의 위치에 제공된 함수의 매개변수 타입을 유추할 수 있다!

```tsx
let singer: (song: string) => string;

singer = function (song) {
  // song: string의 타입
  return `Singing: ${song.toUpperCase()}!`; // Ok
};
```

singer 변수는 string 타입의 매개변수를 갖는 함수, 나중에 singer가 할당되는 함수의 song 매개변수는 string으로 예측된다.

함수를 매개변수로 갖는 함수에 인수로 전달된 함수는 해당 매개변수 타입도 잘 유추할 수 있다.

```tsx
const songs = ["Call Me", "jolene", "The Chain"];

// song: string
// index: number
songs.forEach((song, index) => {
  console.log(`${song} is at index ${index}`);
});
```

**함수 타입 별칭**

함수 타입에서도 타입 별칭을 사용할 수 있다.

```tsx
type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;

stringToNumber = (input) => input.length; // Ok

stringToNumber = (input) => input.toUpperCase(); // 오류 - string형식 X
```

StringToNumber 타입은 string을 받고 number 타입을 반환하는 함수의 별칭을 지정한다. 별칭은 이후 변수 타입을 설명하는 데 사용.

함수 매개변수도 함수 타입을 참조하는 별칭을 입력할 수 있다.

```tsx
type NumberToString = (input: number) => string;

function useNumberToString(numberToString: NumberToString) {
  console.log(`The string is: ${numberToString(1234)}`);
}

useNumberToString((input) => `${input}! Hooray!`); // Ok
useNumberToString((input) => input * 2); // 오류
```

useNumberToString 함수는 함수 타입 별칭인 NumberToString의 단일 매개변수를 갖는다.

타입 별칭은 특히 함수타입에 유용하다. 타입 별칭을 이용하면 반복적으로 작성하는 매개변수와 반환타입을 갖는 코드 공간을 많이 절약할 수 있다.

### 그 외 반환 타입

**void 반환 타입**

일부 함수는 어떤 값도 반환하지 않는다.

예를 들면 return 문이 없는 함수, 혹은 값을 반환하지 않는 return문을 가진 함수일 경우. 타입스크립트는 void 키워드를 사용해 반환값이 없는 함수의 반환 타입을 확인할 수 있다.

반환타입이 void인 함수는 값을 반환하지 않을 수 있다.

```tsx
function logSong(song: string | undefined): void {
  if (!song) {
    return; // Ok
  }

  console.log(`${song}`);

  return true; // 오류
}
```

다음 logSong 함수는 void 를 반환하도록 선언되었으므로 값 반환을 허용하지 않는다.

함수 타입을 선언할 때 void를 사용하면 함수에서 **반환되는 모든 값은 무시**된다.

```tsx
let songLogger: (song: string) => void;
songLogger = (song) => {
  console.log(`${songs}`);
};

songLogger("나의 모양"); // Ok
```

songLogger 변수는 song: string을 받고 값을 반환하지 않는 함수다.

자바스크립트 함수는 실젯값이 반환되지 않으면 기본으로 모두 undefined를 반환한다. 하지만 void는 undefined와 동일하지 않다. void는 함수의 반환 타입이 무시된다는 것을 의미하고 undefined는 반환되는 리터럴 값이다. undefined를 포함하는 대신 void 타입의 값을 할당하려고 하면 타입 오류가 발생함.

```tsx
function returnVoid() {
  return;
}

let lazyValue: string | undefined;

lazyValue = returnVoid(); // 오류
```

undefined와 void를 구분해서 사용하면 좋다! 특히 void를 반환하도록 선언된 타입 위치에 전달된 함수가 반환된 모든 값을 무시하도록 설정할 때 유용하다.

```tsx
const records: string[] = [];

function saveRecords(newRecords: string[]) {
  newRecords.forEach((record) => records.push(record));
}

saveRecords(["21", "Come On Over", "The BodyGuard"]);
```

`forEach` 메서드는 `void`를 반환하는 콜백을 받는다. `forEach`에 제공되는 함수는 원하는 모든 값을 반환할 수 있다. 다음 `saveRecords` 함수의 `records.push(record)`는 `number`(배열의 `.push()`에서 반환된 값)를 반환하지만, 여전히 `newRecords.forEach`에 전달된 화살표 함수에 대한 반환값이 허용된다.

void 타입은 함수의 반환값이 **자체적으로 반환될 수 있는 값도 아니고**, **사용하기 위한 것도 아니라는 표시**임을 기억하자!

**never 반환 타입**

일부 함수는 값을 반환하지 않을 뿐만 아니라 반환할 생각도 전혀 없다. never 반환 함수는 의도적으로 항상 오류를 발생시키거나 무한 루프를 실행하는 함수이다.

함수가 절대 반환하지 않도록 의도하려면 명시적 `: never` 타입 애너테이션을 추가해 해당 함수를 호출한 후 모든 **코드가 실행되지 않음**을 나타낸다.

```tsx
function fail(message: string): never {
  throw new Error(`Invariant failure: ${message}`);
}
function workWithUnsafeParam(param: unknown) {
  if (typeof param !== "string") {
    fail(`param should be a string, not ${typeof param}`);
  }

  // 여기에서 param의 타입은 string으로 알려진다.
  param.toUpperCase(); // Ok
}
```

fail 함수는 오류만 발생시키므로 param의 타입을 string으로 좁혀서 타입스크립트의 **제어 흐름 분석 control flow analysis** 을 도와준다

⚠️ never는 void와 다르다. void는 아무것도 반환하지 않는 함수를 위한 것이고, never는 절대 반환하지 않는 함수를 위한 것이다.

### 함수 오버로드

일부 자바스크립트 함수는 선택적 매개변수와 나머지 매개변수만으로 표현할 수 없는 매우 다른 매개변수들로 호출될 수 있다.

- **오버로드 시그니처 overload signature**

하나의 최종 **구현 시그니처 implementation signature**와 그 함수의 본문 앞에 서로 다른 버전의 함수 이름, 매개변수, 반환 타입을 여러 번 선언한다.

오버로드된 함수 호출에 대해 구문 오류를 생성할지 여부를 결정할 때 타입스크립트는 함수의 오버로드 시그니처만 확인한다. 구현 시그니처는 함수의 내부 로직에서만 사용됨.

```tsx
function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(monthOrTimestamp: number, day?: number, year?: number) {
  return day === undefined || year === undefined //
    ? new Date(monthOrTimestamp)
    : new Date(year, monthOrTimestamp, day);
}

createDate(325252525); // Ok
createDate(7, 23, 1953); // Ok

createDate(4, 1); // 오류
```

createDate 함수는 1개의 timestamp 매개변수 또는 3개의 매개변수(month, date, year)를 사용해 호출한다. 허용된 수의 인수를 사용해 호출할 수 있지만 2개의 인수를 사용하면 오버로드 시그니처가 없어서 타입오류가 발생함.

⇒ 타입스크립트를 컴파일해 js로 출력하면 다른 타입 시스템 구문처럼 오버로드 시그니처도 지워진다.

⚠️ 함수 오버로드는 복잡하고 설명하기 어려운 함수 타입에 사용하는 최후의 수단. 가능하면 사용하지 않는 것이 좋음.

**호출 시그니처 호환성**

구현 시그니처는 모든 오버로드 시그니처와 호환되어야 한다.

```
function format(data: string): string; // Ok
function format(data: string, needle: string, haystack: string): string; // Ok

function format(getData: () => string): string; // 오류

function format(data: string, needle?: string, haystack?: string) {
  return needle && haystack ? data.replace(needle, haystack) : data;
}
```

format 함수의 구현 시그니처는 첫 번째 매개변수를 string으로 선언한다. 처음 두 개의 오버로드 시그니처는 string 타입과 호환되지만 세 번째 오버로드 시그니처의 ()⇒string 타입과는 호환되지 않음
