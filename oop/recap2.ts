type Food = {
  name: string;
  country: string;
};

type Food0 = Food & {
  love: number;
};

const curry: Food0 = {
  name: "curry",
  country: "India",
  love: 777,
};

interface Foodie {
  name: string;
  country: string;
}

interface Foodie0 extends Foodie {
  love: number;
}

const sushi: Foodie0 = {
  name: "sushi",
  country: "Japan",
  love: 3333,
};

type TypeTest = {
  test: string;
};
interface InterTest {
  test: string;
}

class Tester implements InterTest {
  constructor(
    //
    public test: "OK"
  ) {}
}
