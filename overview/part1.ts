type Age = number;
type Name = string;

type Player = {
  readonly name: Name;
  age?: Age;
};

function playerMaker0(name: string): Player {
  return {
    name,
  };
}

const playerMaker = (name: string): Player => ({ name });
const nam = playerMaker("nami");
nam.age = 7;

const numbers: readonly number[] = [1, 2, 3, 4];
const names: readonly string[] = ["1", "2"];

const member: readonly [string, number, boolean] = ["nami", 28, true];
let a: undefined = undefined;
let b: null = null;
