type Words = {
  [key: string]: string;
};

class Dict {
  private words: Words;
  constructor() {
    this.words = {};
  }
  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = word.def;
    }
  }
  def(term: string) {
    return this.words[term];
  }
  del(term: string) {
    if (this.words[term] !== undefined) {
      delete this.words[term];
    }
  }
  edit(word: Word) {
    if (this.words[word.term] === undefined) {
      return new Error("Word not found");
    }
    this.words[word.term] = word.def;
  }
  desc(term: string, desc: string): void {
    if (this.words[term] !== undefined) {
      const originDef = this.words[term];
      this.words[term] = `${originDef}. ${desc}`;
      console.log(this.words[term]);
    } else {
      console.log("Word not found.");
    }
  }
}

class Word {
  constructor(
    //
    public readonly term: string,
    public readonly def: string,
    public readonly desc: string = ""
  ) {}
  get(dict: Dict): void {
    const desc = dict.def(this.term);

    if (desc !== "") {
      console.log(`${this.term}: ${desc}`);
    } else {
      console.log(`${this.term}: ${this.def}`);
    }
  }
}

const kimchi = new Word("kimchi", "김치");
const kimbab = new Word("kimbab", "김밥");
const samgeobsal = new Word("samgeobsal", "삼겹살", "쑥갓과 조합이 좋다");
const dict = new Dict();

dict.add(kimchi);
dict.add(kimbab);
dict.add(samgeobsal);
samgeobsal.get(dict);
kimbab.get(dict);
dict.desc("kimbab", "소풍갈 때 도시락으로 꼭 챙겨가는 음식이다");
kimbab.get(dict);
