// Chapter 8. 클래스
// 8.1 클래스 메서드

class Greeter {
  greet(name: string) {
    console.log(`${name}, do your stuff!`);
  }
}

new Greeter().greet("Miss frizzle"); // Ok

// new Greeter().greet();

class Greeted {
  constructor(message: string) {
    console.log("As I always say: ${message}!");
  }
}

new Greeted("take chances, make mistakes, get messy");

// new Greeted(); // Error

// 클래스 속성
class FieldTrip {
  destination: string;

  constructor(destination: string) {
    this.destination = destination;
    console.log(`We're going to ${this.destination}!`);

    // this.nonexistent = destination; // Error
  }
}

const trip = new FieldTrip("planetarium");

trip.destination; // Ok
// trip.nonexistent; // Error

// 함수 속성
class WithMethod {
  myMethod() {}
}

new WithMethod().myMethod === new WithMethod().myMethod;

// class WithProperty {
//   myProperty: () => {};
// }

// new WithMethod().myProperty === new WithMethod().myProperty;

class WithPropertyParameters {
  takesParameters = (input: boolean) => (input ? "Yes" : "No");
}

const instance = new WithPropertyParameters();

instance.takesParameters(true); // Ok
// instance.takesParameters(123); // Error

// 초기화 검사
class WithValue {
  immediate = 0; // Ok
  later: number; // Ok(constructor에서 할당)
  mayBeUndefined: number | undefined; // Ok(undefined가 되는 것이 허용됨)
  //   unused: number; // Error

  constructor() {
    this.later = 1;
  }
}

class ActivitiesQueue {
  pending!: string[]; // Ok

  initialize(pending: string[]) {
    this.pending = pending;
  }

  next() {
    return this.pending.pop();
  }
}

const activities = new ActivitiesQueue();

activities.initialize(["eat", "sleep", "learn"]);
activities.next();

// 선택적 속성

class MissingInitializer {
  property?: string;
}

new MissingInitializer().property?.length; // Ok

// new MissingInitializer().property.length; // Error

// 읽기 전용 속성
// class Quote {
//   readonly text: string;

//   constructor(text: string) {
//     // this.text = ;
//   }

//   emphasize() {
//     this.text += "!"; // Error
//   }
// }

// const quote = new Quote{
//     "There is a brilliant child locked inside every student."
// };

// Quote.text = "Ha"! // Error

class RandomQuote {
  readonly explicit: string = "Home is the nicest word there is.";
  readonly implicit = "Home is the nicest word there is.";

  constructor() {
    if (Math.random() > 0.5) {
      this.explicit = "We start learning the minute we're born."; // Ok

      // this.implicit = "We start learning the minute we're born." // Error
    }
  }
}
const quote = new RandomQuote();

quote.explicit; // 타입: string
quote.implicit; // 타입: "Home is the nicest word there is. "

class Teacher {
  sayHello() {
    console.log("Take chances, make mistakes, get messy!");
  }
}

let teacher: Teacher;
teacher = new Teacher();
// teacher = "Wahoo"; // Error
