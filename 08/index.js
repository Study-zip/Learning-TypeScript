// Chapter 8. 클래스
// 8.1 클래스 메서드
var _a;
var _Base_truePrivate;
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
const instance0 = new WithPropertyParameters();
instance0.takesParameters(true); // Ok
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
// 타입으로서의 클래스
class SchoolBus {
    getAbilities() {
        return ["magic", "shapeshifting"];
    }
}
function withSchoolBus(bus) {
    console.log(bus.getAbilities());
}
withSchoolBus(new SchoolBus()); // Ok
// Ok
withSchoolBus({
    getAbilities: () => ["transmogrification"],
});
class Student {
    constructor(name) {
        this.name = name;
    }
    study(hours) {
        for (let i = 0; i < hours; i += 1) {
            console.log("...studying...");
        }
    }
}
class ReportCard {
    constructor(grades) {
        this.grades = grades;
    }
    report() {
        return this.grades.join(",");
    }
}
// class AsNumber implements AgeIsANumber, AgeIsNotANumber {
//   age = 0; // Error
// }
// class NotAsNumber implements AgeIsANumber, AgeIsNotANumber {
//   age() {
//     return ""; // Error
//   }
// }
// 클래스 확장
class Teacher0 {
    teach() {
        console.log("The surest test of discipline is its absence.");
    }
}
class StudentTeacher extends Teacher0 {
    learn() {
        console.log("I cannot afford the luxury of a closed mind.");
    }
}
const teacher0 = new StudentTeacher();
teacher0.teach(); // Ok (기본 클래스에 정의됨)
teacher0.learn(); // Ok (하위 클래스에 정의됨)
// teacher0.other(); // Error
// 할당 가능성 확장
class Lesson {
    constructor(subject) {
        this.subject = subject;
    }
}
class OnlineLesson extends Lesson {
    constructor(subject, url) {
        super(subject);
        this.url = url;
    }
}
let lesson;
lesson = new Lesson("coding"); // Ok
lesson = new OnlineLesson("coding", "oreilly.com"); // Ok
let online;
online = new OnlineLesson("coding", "oreilly.com"); // Ok
// online = new Lesson("coding"); // Error
class PastGrades {
    constructor() {
        this.grades = [];
    }
}
class LabeledPastGrades extends PastGrades {
}
let subClass;
subClass = new LabeledPastGrades();
subClass = new PastGrades();
// 재정의된 생성자
class GradeAnnouncer {
    constructor(grade) {
        this.message = grade >= 65 ? "Maybe next time..." : "You Pass!";
    }
}
class PassingAnnouncer extends GradeAnnouncer {
    constructor() {
        super(100);
    }
}
// class FailingAnnouncer extends GradeAnnouncer {
//   constructor() {
//   }  // Error
// }
class GradesTally {
    constructor() {
        this.grades = [];
    }
    addGrades(...grades) {
        this.grades.push(...grades);
        return this.grades.length;
    }
}
class ContinuedGradesTally extends GradesTally {
    constructor(previousGrades) {
        // this.grades = [...previousGrades]; // Error
        super();
        console.log("Starting with length", this.grades.length); // Ok
    }
}
// 재정의된 메서드
class GradeCounter {
    countGrades(grades, letter) {
        return grades.filter((grade) => grade === letter).length;
    }
}
class FailureCounter extends GradeCounter {
    countGrades(grades) {
        return super.countGrades(grades, "F");
    }
}
// class AnyFailureChecker extends GradeCounter {
//   countGrades(grades: string[]) {
//     return super.countGrades(grades, "F") !== 0; // Error
//   }
// }
const counter = new FailureCounter();
// 예상한 타입: number
// 실제 타입: boolean
const count = counter.countGrades(["A", "C", "F"], "F");
// 재정의된 속성
class Assignment {
}
class GradeAssignment extends Assignment {
    constructor(grade) {
        super();
        this.grade = grade;
    }
}
class NumericGrade {
    constructor() {
        this.value = 0;
    }
}
class VagueGrade extends NumericGrade {
}
const instance = new VagueGrade();
// 예상한 타입: number
// 실제 타입: number | string
instance.value;
// 추상 클래스
class School {
    constructor(name) {
        this.name = name;
    }
}
class PreSchool extends School {
    getStudentTypes() {
        return ["preschooler"];
    }
}
// class Absence extends School {}
let school;
school = new PreSchool("Sunnyside Daycare"); // Ok
// school = new School("somewhere else"); // Error
// 멤버 접근성
class Base {
    constructor() {
        this.isPublicImplicit = 0;
        this.isPublicExplicit = 1;
        this.isProtected = 2;
        this.isPrivate = 3;
        _Base_truePrivate.set(this, 4);
    }
}
_Base_truePrivate = new WeakMap();
class Subclass extends Base {
    examples() {
        this.isPublicImplicit; // Ok
        this.isPublicExplicit; // Ok
        this.isProtected; // Ok
        // this.isPrivate; // Error
        // this.#truePrivate; // Error
    }
}
new Subclass().isPublicImplicit; // Ok
new Subclass().isPublicExplicit; // Ok
// new Subclass().isProtected; // Error
// new Subclass().isPrivate; // Error
class TwoKeywords {
    constructor() {
        this.name = "Anne Sullivan"; // Ok
    }
    log() {
        console.log(this.name); // Ok
    }
}
const two = new TwoKeywords();
// two.name = "Savitribal phule"; // Error
// 정적 필드 제한자
class Question {
    guess(getAnswer) {
        const answer = getAnswer(Question.prompt);
        // Ok
        if (answer === Question.answer) {
            console.log("You got it");
        }
        else {
            console.log("Try again...");
        }
    }
}
Question.prompt = `What's an ogre's favorite programming language?`;
// Question.answer;
