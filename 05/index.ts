function sing(song: string) {
  console.log(`Singing: ${song}!`);
}

function singTwo(first: string, second: string) {
  console.log(`${first} / ${second}`);
}

// singTwo("Ball and Chain");
singTwo("I will survive", "Higher Love");
// singTwo("Go Your Own Way", "The Chain", "Don't lookup");

function announceSong(song: string, singer?: string) {
  console.log(`Song: ${song}`);

  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}

announceSong("위로");
announceSong("위로", undefined);
announceSong("위로", "권진아");

function announceSongBy(song: string, singer: string | undefined) {
  console.log(`Song: ${song}`);

  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}

// announceSongBy("마음이 그래");
announceSongBy("마음이 그래", undefined);
announceSongBy("마음이 그래", "권진아 & 개코");

// function announceSong1(singer?: string, song: string) {...}

function rateSong(song: string, rating = 0) {
  console.log(`${song} gets ${rating}/5 stars!`);
}

rateSong("Photograph");
rateSong("Set fire to the rain", 5);
rateSong("Set fire to the rain", undefined);

// rateSong("At Last!", "100");

function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song}, by ${singer}`);
  }
}

singAllTheSongs("잔나비"); // Ok
singAllTheSongs("잔나비", "주저하는 연인들을 위해"); // Ok
singAllTheSongs("잔나비", "주저하는 연인들을 위해", "초록을 거머쥔 우리는"); // Ok

// singAllTheSongs("잔나비", 2000);

// 타입 : (songs: string[]) => number
function singSongs(songs: string[]) {
  for (const song of songs) {
    console.log(`${song}`);
  }
  return songs.length;
}

// 타입: (songs: string[], index: number) => string | undefined
function getSongAt0(songs: string[], index: number) {
  return index < songs.length //
    ? songs[index]
    : undefined;
}

// 명시적 반환 타입
function singSongRecursive(songs: string[], count = 0): number {
  return songs.length ? singSongRecursive(songs.slice(1), count + 1) : count;
}

const singSongRecursive1 = (songs: string[], count = 0): number =>
  songs.length ? singSongRecursive1(songs.slice(1), count + 1) : count;

function getSongRecordingDate(song: string): Date | undefined {
  switch (song) {
    case "strange fruit":
      return new Date("April 20, 1939"); // Ok

    // case "Greensleeves":
    //   return "unknown";

    default:
      return undefined;
  }
}

let nothingInGivesString: () => string;

let inputAndOutput: (songs: string[], count?: number) => number;

const songs0 = ["Juice", "Shake It Off", "What's Up"];

function runOnSongs(getSongAt: (index: number) => string) {
  for (let i = 0; i < songs.length; i += 1) {
    console.log(getSongAt(i));
  }
}
function getSongAt(index: number) {
  return `${songs[index]}`;
}
runOnSongs(getSongAt); // Ok

function logSong0(song: string) {
  return `${song}`;
}

// runOnSongs(logSong);

// 함수 타입 괄호

// 타입은 string | undefined 유니언을 반환하는 함수
let returnStringOrUndefined: () => string | undefined;
// 타입은 undefined나 string을 반환하는 함수
let maybeReturnString: (() => string) | undefined;

// 매개변수 타입 추론

let singer: (song: string) => string;

singer = function (song) {
  // song: string의 타입
  return `Singing: ${song.toUpperCase()}!`; // Ok
};

const songs = ["Call Me", "jolene", "The Chain"];

// song: string
// index: number
songs.forEach((song, index) => {
  console.log(`${song} is at index ${index}`);
});

// 함수 타입 별칭
type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;

stringToNumber = (input) => input.length; // Ok

// stringToNumber = (input) => input.toUpperCase();

type NumberToString = (input: number) => string;

function useNumberToString(numberToString: NumberToString) {
  console.log(`The string is: ${numberToString(1234)}`);
}

useNumberToString((input) => `${input}! Hooray!`);
// useNumberToString((input) => input * 2);

// 그 외 반환 타입
// void 반환 타입

function logSong(song: string | undefined): void {
  if (!song) {
    return; // Ok
  }

  console.log(`${song}`);

  //   return true;
}

let songLogger: (song: string) => void;
songLogger = (song) => {
  console.log(`${songs}`);
};

songLogger("나의 모양"); // Ok

function returnVoid() {
  return;
}

let lazyValue: string | undefined;

// lazyValue = returnVoid();

const records: string[] = [];

function saveRecords(newRecords: string[]) {
  newRecords.forEach((record) => records.push(record));
}

saveRecords(["21", "Come On Over", "The BodyGuard"]);

// never 반환 타입

function fail(message: string): never {
  throw new Error(`Invariant failure: ${message}`);
}
function workWithUnsafeParam(param: unknown) {
  if (typeof param !== "string") {
    fail(`param should be a string, not ${typeof param}`);
  }

  // 여기에서 param의 타입은 string으로 알려진다.
  param.toUpperCase(); // Ok
}

// 함수 오버로드

function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
// 1 ~ 2번째 줄 오버로드 시그니처
function createDate(monthOrTimestamp: number, day?: number, year?: number) {
  return day === undefined || year === undefined //
    ? new Date(monthOrTimestamp)
    : new Date(year, monthOrTimestamp, day);
}
// 3번째 줄부터 구현 시그니처

createDate(325252525); // Ok
createDate(7, 23, 1953); // Ok

// createDate(4, 1);

// 호출 시그니처 호환성

function format(data: string): string; // Ok
function format(data: string, needle: string, haystack: string): string; // Ok

// function format(getData: () => string): string;

function format(data: string, needle?: string, haystack?: string) {
  return needle && haystack ? data.replace(needle, haystack) : data;
}
