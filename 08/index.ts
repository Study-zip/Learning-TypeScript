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

const instance0 = new WithPropertyParameters();

instance0.takesParameters(true); // Ok
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

// 타입으로서의 클래스
class SchoolBus {
  getAbilities() {
    return ["magic", "shapeshifting"];
  }
}

function withSchoolBus(bus: SchoolBus) {
  console.log(bus.getAbilities());
}

withSchoolBus(new SchoolBus()); // Ok

// Ok
withSchoolBus({
  getAbilities: () => ["transmogrification"],
});

// withSchoolBus({
//   getAbilities: () => 123, // Error
// });

// 클래스와 인터페이스
interface Learner {
  name: string;
  study(hours: number): void;
}

class Student implements Learner {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  study(hours: number) {
    for (let i = 0; i < hours; i += 1) {
      console.log("...studying...");
    }
  }
}

// class Slacker implements Learner {
//     // Error
// }

// class Student0 implements Learner {
//   name;
//     // Error
//   study(hours) {
//     // Error
//   }
// }

// 다중 인터페이스 구현

interface Graded {
  grades: number[];
}

interface Reporter {
  report: () => string;
}

class ReportCard implements Graded, Reporter {
  grades: number[];

  constructor(grades: number[]) {
    this.grades = grades;
  }

  report() {
    return this.grades.join(",");
  }
}

// class Empty implements Graded, Reporter {} // Error

interface AgeIsANumber {
  age: number;
}

interface AgeIsNotANumber {
  age: () => string;
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
  subject: string;

  constructor(subject: string) {
    this.subject = subject;
  }
}

class OnlineLesson extends Lesson {
  url: string;

  constructor(subject: string, url: string) {
    super(subject);
    this.url = url;
  }
}

let lesson: Lesson;
lesson = new Lesson("coding"); // Ok
lesson = new OnlineLesson("coding", "oreilly.com"); // Ok

let online: OnlineLesson;

online = new OnlineLesson("coding", "oreilly.com"); // Ok
// online = new Lesson("coding"); // Error

class PastGrades {
  grades: number[] = [];
}

class LabeledPastGrades extends PastGrades {
  label?: string;
}

let subClass: LabeledPastGrades;

subClass = new LabeledPastGrades();
subClass = new PastGrades();

// 재정의된 생성자
class GradeAnnouncer {
  message: string;

  constructor(grade: number) {
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
  grades: number[] = [];

  addGrades(...grades: number[]) {
    this.grades.push(...grades);
    return this.grades.length;
  }
}

class ContinuedGradesTally extends GradesTally {
  constructor(previousGrades: number[]) {
    // this.grades = [...previousGrades]; // Error

    super();

    console.log("Starting with length", this.grades.length); // Ok
  }
}

// 재정의된 메서드
class GradeCounter {
  countGrades(grades: string[], letter: string) {
    return grades.filter((grade) => grade === letter).length;
  }
}

class FailureCounter extends GradeCounter {
  countGrades(grades: string[]) {
    return super.countGrades(grades, "F");
  }
}

// class AnyFailureChecker extends GradeCounter {
//   countGrades(grades: string[]) {
//     return super.countGrades(grades, "F") !== 0; // Error
//   }
// }

const counter: GradeCounter = new FailureCounter();

// 예상한 타입: number
// 실제 타입: boolean
const count = counter.countGrades(["A", "C", "F"], "F");

// 재정의된 속성
class Assignment {
  grade?: number;
}

class GradeAssignment extends Assignment {
  grade: number;

  constructor(grade: number) {
    super();
    this.grade = grade;
  }
}

class NumericGrade {
  value = 0;
}

class VagueGrade extends NumericGrade {
  //   value = Math.random() > 0.5 ? 1 : "..."; // Error
}

const instance: NumericGrade = new VagueGrade();

// 예상한 타입: number
// 실제 타입: number | string
instance.value;

// 추상 클래스
abstract class School {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract getStudentTypes(): string[];
}

class PreSchool extends School {
  getStudentTypes() {
    return ["preschooler"];
  }
}

// class Absence extends School {}

let school: School;

school = new PreSchool("Sunnyside Daycare"); // Ok

// school = new School("somewhere else"); // Error

// 멤버 접근성

class Base {
  isPublicImplicit = 0;
  public isPublicExplicit = 1;
  protected isProtected = 2;
  private isPrivate = 3;
  #truePrivate = 4;
}

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
  private readonly name: string;

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
  protected static readonly answer: "bash";
  protected static readonly prompt = `What's an ogre's favorite programming language?`;

  guess(getAnswer: (prompt: string) => string) {
    const answer = getAnswer(Question.prompt);

    // Ok
    if (answer === Question.answer) {
      console.log("You got it");
    } else {
      console.log("Try again...");
    }
  }
}

// Question.answer;
