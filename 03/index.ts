// Chapter 3. 유니언과 리터럴

let mathematician =
  Math.random() > 0.5
    ? undefined //
    : "Nami";

let thinker: string | null = null;

if ((Math.random() > 0, 5)) {
  thinker = "Nami";
}

let physicist =
  Math.random() > 0.5 //
    ? "marie curie"
    : 84;

physicist.toString();
// physicist.toUpperCase();
// physicist.toFixed();

let admiral: number | string;
admiral = "nami";
admiral.toUpperCase();

// admiral.toFixed();

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
// scientist.toUpperCase();

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

const nami = "Nami"; // "Nami"
let philosopher = "Nami"; // string

let lifespan: number | "ongoing" | "uncertain";

lifespan = 89;
lifespan = "ongoing";
// lifespan = true;

let specificallyAda: "Ada";
specificallyAda = "Ada";
// specificallyAda = "Byron";

let someString = "";
// specificallyAda = someString;

someString = ":)";

let nameMaybe =
  Math.random() > 0.5 //
    ? "Tony Hoare"
    : undefined;

// nameMaybe.toLowerCase();

let geneticist =
  Math.random() > 0.5 //
    ? "Barbara"
    : undefined;

if (geneticist) {
  geneticist.toUpperCase();
}

geneticist && geneticist.toUpperCase();
geneticist?.toUpperCase();

let biologist = Math.random() > 0.5 && "Rachel";

if (biologist) {
  biologist;
} else {
  biologist;
}

let people: string;
// people?.length; // undefined라 오류

people = "Mark";
people.length; // OK

let people1: string | undefined;
people?.length; // OK

people = "Mark";
people.length; // OK

type RawData = Boolean | Number | string | null | undefined;
let rawDataFirst: RawData;
let rawDataSecond: RawData;
let rawDataThird: RawData;

type Sometype = string | undefined;

// console.log(SomeType);

type Id = Number | String;

// IdMaybe 타입은 다음과 같음 : number | string | undefined | null
type IdMaybe = Id | undefined | null;
