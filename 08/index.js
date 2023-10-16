// Chapter 8. 클래스
// 8.1 클래스 메서드
var _a;
class Greeter {
    greet(name) {
        console.log(`${name}, do your stuff!`);
    }
}
new Greeter().greet("Miss frizzle"); // Ok
// new Greeter().greet();
class Greeted {
    constructor(message) {
        console.log("As I always say: ${message}!");
    }
}
new Greeted("take chances, make mistakes, get messy");
// new Greeted(); // Error
// 클래스 속성
class FieldTrip {
    constructor(destination) {
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
    myMethod() { }
}
new WithMethod().myMethod === new WithMethod().myMethod;
// class WithProperty {
//   myProperty: () => {};
// }
// new WithMethod().myProperty === new WithMethod().myProperty;
class WithPropertyParameters {
    constructor() {
        this.takesParameters = (input) => (input ? "Yes" : "No");
    }
}
const instance = new WithPropertyParameters();
instance.takesParameters(true); // Ok
// instance.takesParameters(123); // Error
// 초기화 검사
class WithValue {
    //   unused: number; // Error
    constructor() {
        this.immediate = 0; // Ok
        this.later = 1;
    }
}
class ActivitiesQueue {
    initialize(pending) {
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
}
(_a = new MissingInitializer().property) === null || _a === void 0 ? void 0 : _a.length; // Ok
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
    constructor() {
        this.explicit = "Home is the nicest word there is.";
        this.implicit = "Home is the nicest word there is.";
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
let teacher;
teacher = new Teacher();
// teacher = "Wahoo"; // Error
