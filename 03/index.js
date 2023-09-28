// Chapter 3. 유니언과 리터럴
let mathematician =
  Math.random() > 0.5
    ? undefined //
    : "Nami";
let thinker = null;
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
let admiral;
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
let lifespan;
lifespan = 89;
lifespan = "ongoing";
// lifespan = true;
let specificallyAda;
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
geneticist === null || geneticist === void 0
  ? void 0
  : geneticist.toUpperCase();
let biologist = Math.random() > 0.5 && "Rachel";
if (biologist) {
  biologist;
} else {
  biologist;
}
let people;
// people?.length; // undefined라 오류
people = "Mark";
people.length; // OK
let people1;
people === null || people === void 0 ? void 0 : people.length; // OK
people = "Mark";
people.length; // OK
let rawDataFirst;
let rawDataSecond;
let rawDataThird;
