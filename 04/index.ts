// 04. 객체
const poet = {
  born: 1935,
  name: "Mary Oliver",
};

poet["born"]; // 타입 : number
poet.name; // 타입 : string

// poet.end;

let poetLater: {
  born: number;
  name: string;
};

// Ok
poetLater = {
  born: 1935,
  name: "Mary Oliver",
};

// poetLater = "Sappho";

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

// poetLater = "Emily Dickinson";

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

type FirstAndLastNames = {
  first: string;
  last: string;
};

// Ok
const hasBoth1: FirstAndLastNames = {
  first: "Sarojini",
  last: "Naidu",
};

// const hasOnlyOne: FirstAndLastNames = {
//   first: "Sappho",
// };

type TImeRange = {
  start: Date;
};

// const hasStartString: TImeRange = {
//   start: "1879-02-13",
// };

type Poet1 = {
  born: number;
  name: string;
};

// Ok: Poet의 필드와 일치함
const poetMatch: Poet1 = {
  born: 1928,
  name: "Maya Angelou",
};

// const extraProperty: Poet = {
//   activity: "walking",
//   born: 1935,
//   name: "Mary Oliver",
// };

const exsitingObject = {
  activity: "walking",
  born: 1934,
  name: "Mary Oliver",
};

const extraPropertyButOk: Poet1 = exsitingObject;

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

// const poemMismatch: Poem2 = {
//   author: {
//     name: "Sylvia",
//   },
//   name: "Tulips",
// };

type Author = {
  firstName: string;
  lastName: string;
};

type Poem3 = {
  author: Author;
  name: string;
};

// const poemMismatch: Poem3 = {
//   author: {
//     name: "Sylbia",
//   },
//   name: "Tulips",
// };

type Book = {
  author?: string;
  pages: number;
};

// Ok
const ok: Book = {
  author: "Rita Dove",
  pages: 80,
};

// const missing: Book = {
//   author: "Tonardo",
// };

type Writers = {
  author: string | undefined;
  editor?: string;
};

// Ok: author는 undefined으로 제공됨
const hasRequired: Writers = {
  author: undefined,
};

// const missingRequired: Writers = {};

const poem1 =
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
poem1.name; // string
poem1.pages; // number | undefined
poem1.rhymes; // booleans | undefined

type PoemWithPages = {
  name: string;
  pages: number;
};

type PoemWithRhymes = {
  name: string;
  rhymes: boolean;
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 46 }
    : { name: "Her kind", rhymes: true };

poem.name; // Ok

// poem.pages;
// poem.rhymes;

if ("pages" in poem) {
  poem.pages; // Ok : poem은 PoemWithPages로 좁혀짐
} else {
  poem.rhymes; // Ok : poem은 PoemWithRhymes로 좁혀짐
}

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
// poem2.pages;

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

// const oneArt: ShortPoem = {
//   author: "Elizabeth Bishop",
//   kigo: "villanelle",
// };

type ShortPoemBase = { author: string };
type Haiku = ShortPoemBase & { kigo: string; type: "haiku" };
type Villanelle = ShortPoemBase & { meter: number; type: "villanelle" };
type ShortPoem0 = Haiku | Villanelle;

// const oneArt0: ShortPoem0 = {
//   author: "Elizabeth Bishop",
//   kigo: "villanelle",
// };

type NotPossible = number & string; // 타입 : never

// let notNumber: NotPossible = 0;
// let notString: never = "";
