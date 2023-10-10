let c: unknown;
if (typeof c === "number") {
  let d = c + 1;
}

if (typeof c === "string") {
  let d = c.toUpperCase();
}

function hello() {
  // void
  console.log("X");
}

function sayhi(): never {
  throw new Error("XXX");
}

function bye(name: string | number) {
  if (typeof name === "string") {
    name;
  } else if (typeof name === "number") {
    name;
  } else {
    name; // never
  }
}
