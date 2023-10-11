"use strict";
class Dict {
    constructor() {
        this.words = {};
    }
    add(word) {
        if (this.words[word.term] === undefined) {
            this.words[word.term] = word.def;
        }
    }
    def(term) {
        return this.words[term];
    }
    del(term) {
        if (this.words[term] !== undefined) {
            delete this.words[term];
        }
    }
    edit(word) {
        if (this.words[word.term] === undefined) {
            return new Error("Word not found");
        }
        this.words[word.term] = word.def;
    }
    desc(term, desc) {
        if (this.words[term] !== undefined) {
            const originDef = this.words[term];
            this.words[term] = `${originDef}. ${desc}`;
            console.log(this.words[term]);
        }
        else {
            console.log("Word not found.");
        }
    }
}
class Word {
    constructor(
    //
    term, def, desc = "") {
        this.term = term;
        this.def = def;
        this.desc = desc;
    }
    get(dict) {
        const desc = dict.def(this.term);
        if (desc !== "") {
            console.log(`${this.term}: ${desc}`);
        }
        else {
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
