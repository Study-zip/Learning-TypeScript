interface OStorage<T> {
  [key: string]: T;
}

class LocalStorage<T> {
  private storage: OStorage<T> = {};
  set(key: string, value: T) {
    this.storage[key] = value;
  }
  remove(key: string) {
    delete this.storage[key];
  }
  get(key: string): T {
    return this.storage[key];
  }
  clear() {
    this.storage = {};
  }
}

const stringsStorage = new LocalStorage<string>();

stringsStorage.get("Key");
stringsStorage.set("Hello", "Coool");

const booleanStorage = new LocalStorage<boolean>();

booleanStorage.get("boo");
booleanStorage.set("Hello", true);
