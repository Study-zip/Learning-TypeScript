# Chapter 1.

바닐라 자바스크립트의 함정

1. **값 비싼 자유**
   충돌 가능성이 있어도 실행하는 동적 Dynamic 타입 언어
2. **부족한 문서**

- JSDoc 설명이 코드가 잘못된 걸 막을 수 없다.
- JSDoc 설명이 이전에는 정확했더라도 코드 리팩토링 중에 생긴 변경 사항과 관련된 현재 유효하지 않은 주석을 모두 찾기는 어렵다.
- 복잡한 객체를 설명할 때는 다루기 어렵고 장황해서 타입과 그 관계를 정의하려면 다수의 독립형 주석이 필요하다.
  ```jsx
  /**
   * Performs a painter painting a particular painting.
   *
   * @param {Painting} painter
   * @param {string} painting
   * @returns {boolean} Whether the painter painted the painting
   */
  function paintPainting(painter, painting) {
    return painter //
      .prepare() //
      .paint(painting, painter.ownMaterials) //
      .finish();
  }
  ```

3. **부족한 개발자 도구**
   타입을 식별하는 내장된 방법을 제공하지 않는다.

   코드가 JSDoc 주석에서 쉽게 분리된다.

   VS Code가 자동화된 리팩터링 툴을 제공하지만 그들도 타입스크립트 혹은 상응되는 다른 것을 사용한 경우가 많고, 자바스크립트 코드에서 잘 정의된 타입스크립트 코드만큼 안정적이거나 강력하지 않다.

### **타입스크립트는 무엇일까?** 자바스크립트의 상위 집합? 타입이 있는 자바스크립트?

- **프로그래밍 언어** : JS의 모든 구문과, 타입을 정의하고 사용하기 위한 새로운 타입스크립트 고유 구문이 포함된 언어
- **타입 검사기** : JS 및 타입스크립트로 작성된 일련의 파일에서 생성된 모든 구성 요소(변수, 함수 등을 이해하고, 잘못 구성된 부분을 알려주는 프로그램)
- **컴파일러** : 타입 검사기를 실행하고 문제를 보고한 후 이에 대응되는 자바스크립트 코드를 생성하는 프로그램
- **언어 서비스** : 타입 검사기를 사용해 VS Code와 같은 편집기에 개발자에게 유용한 유틸리티 제공법을 알려주는 프로그램

제한을 통한 자유

타입스크립트를 사용하면 매개변수와 변수에 제공되는 값의 타입을 지정할 수 있다. 코드를 지정한 방법으로만 사용하도록 제한한다면, 타입스크립트는 코드의 한 영역을 변경하더라도 이 코드를 사용하는 다른 코드 영역이 멈추지 않는다는 확신을 줄 수 있다.

```
function sayMyName(fullName){
    console.log(`you acting kind of shady, ain't callin' me ${fullName}`);
}

sayMyName('Beyonce', 'Knowles')
```

이 코드는 자바스크립트에서 오류 없이 실행되지만 결과가 예상하는 것과 다르다.

You acting kind of shady, ain’t callin me Beyonce

잘못된 수의 인수를 사용해서 함수를 호출하는 것은 타입스크립트가 제한하는 자바스크립트가 가진 일종의 근시안적인 자유이다.

```tsx
interface Painter {
  finish(): boolean;
  ownMaterials: Material[];
  paint(painting: string, materials: Material[]): boolean;
}

function paintPainting(painter: Painter, painting: string): boolean {
  /* ... */
}
```

이 코드를 처음 읽는 TS 개발자라면 Painter에 적어도 세 가지 속성이 있고, 그 중 두 가지는 메서드라는 것을 이해한다.

타입스크립트는 구문을 적용해 객체object의 형태 shape을 설명하고 우수하고 강력한 시스템을 이용해 객체가 어떻게 보이는지 설명한다.

✔️설치 방법

```bash
pnpm i -g typescript

tsc --version
Version 5.2.2
```

npm으로 되어있지만 나는 pnpm을 사용하기에 pnpm으로 설치했다.

—version으로 설치 확인

```bash
tsc --init
```

타입스크립트를 실행할 로컬 폴더를 설정한다. tsconfig.json 구성 파일이 생성된다.

```tsx
console.blub("Nothing is worth more than laughter.");
```

```bash
tsc index.ts
```

오류가 나지만 tsc가 index.js를 생성한다..!

코드에 타입 오류가 있지만 구문은 여전히 완벽하게 유효하다. 타입스크립트 컴파일러는 타입 오류와는 상관없이 입력 파일로부터 자바스크립트를 계속 생성한다.
