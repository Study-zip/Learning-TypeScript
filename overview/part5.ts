type Member<E> = {
  name: string;
  extraInfo: E;
};

type myExtra = {
  favFood: string;
};
type myInfo = Member<myExtra>;

const hee: myInfo = {
  name: "heejung",
  extraInfo: {
    favFood: "Fried chicken",
  },
};

const jung: Member<null> = {
  name: "jung nam",
  extraInfo: null,
};

type A = Array<number>;

let arr: A;

function printAllNumbers(arr: Array<number>) {
  return arr;
}
printAllNumbers([3, 33, 22, 44, 11]);
