function sing(song) {
    console.log(`Singing: ${song}!`);
}
function singTwo(first, second) {
    console.log(`${first} / ${second}`);
}
// singTwo("Ball and Chain");
singTwo("I will survive", "Higher Love");
// singTwo("Go Your Own Way", "The Chain", "Don't lookup");
function announceSong(song, singer) {
    console.log(`Song: ${song}`);
    if (singer) {
        console.log(`Singer: ${singer}`);
    }
}
announceSong("위로");
announceSong("위로", undefined);
announceSong("위로", "권진아");
function announceSongBy(song, singer) {
    console.log(`Song: ${song}`);
    if (singer) {
        console.log(`Singer: ${singer}`);
    }
}
// announceSongBy("마음이 그래");
announceSongBy("마음이 그래", undefined);
announceSongBy("마음이 그래", "권진아 & 개코");
// function announceSong1(singer?: string, song: string) {...}
function rateSong(song, rating = 0) {
    console.log(`${song} gets ${rating}/5 stars!`);
}
rateSong("Photograph");
rateSong("Set fire to the rain", 5);
rateSong("Set fire to the rain", undefined);
// rateSong("At Last!", "100");
function singAllTheSongs(singer, ...songs) {
    for (const song of songs) {
        console.log(`${song}, by ${singer}`);
    }
}
singAllTheSongs("잔나비"); // Ok
singAllTheSongs("잔나비", "주저하는 연인들을 위해"); // Ok
singAllTheSongs("잔나비", "주저하는 연인들을 위해", "초록을 거머쥔 우리는"); // Ok
// singAllTheSongs("잔나비", 2000);
// 타입 : (songs: string[]) => number
function singSongs(songs) {
    for (const song of songs) {
        console.log(`${song}`);
    }
    return songs.length;
}
// 타입: (songs: string[], index: number) => string | undefined
function getSongAt0(songs, index) {
    return index < songs.length //
        ? songs[index]
        : undefined;
}
// 명시적 반환 타입
function singSongRecursive(songs, count = 0) {
    return songs.length ? singSongRecursive(songs.slice(1), count + 1) : count;
}
const singSongRecursive1 = (songs, count = 0) => songs.length ? singSongRecursive1(songs.slice(1), count + 1) : count;
function getSongRecordingDate(song) {
    switch (song) {
        case "strange fruit":
            return new Date("April 20, 1939"); // Ok
        // case "Greensleeves":
        //   return "unknown";
        default:
            return undefined;
    }
}
let nothingInGivesString;
let inputAndOutput;
const songs0 = ["Juice", "Shake It Off", "What's Up"];
function runOnSongs(getSongAt) {
    for (let i = 0; i < songs.length; i += 1) {
        console.log(getSongAt(i));
    }
}
function getSongAt(index) {
    return `${songs[index]}`;
}
runOnSongs(getSongAt); // Ok
function logSong0(song) {
    return `${song}`;
}
// runOnSongs(logSong);
// 함수 타입 괄호
// 타입은 string | undefined 유니언을 반환하는 함수
let returnStringOrUndefined;
// 타입은 undefined나 string을 반환하는 함수
let maybeReturnString;
// 매개변수 타입 추론
let singer;
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
let stringToNumber;
stringToNumber = (input) => input.length; // Ok
function useNumberToString(numberToString) {
    console.log(`The string is: ${numberToString(1234)}`);
}
useNumberToString((input) => `${input}! Hooray!`);
// useNumberToString((input) => input * 2);
// 그 외 반환 타입
// void 반환 타입
function logSong(song) {
    if (!song) {
        return; // Ok
    }
    console.log(`${song}`);
    //   return true;
}
let songLogger;
songLogger = (song) => {
    console.log(`${songs}`);
};
songLogger("나의 모양"); // Ok
function returnVoid() {
    return;
}
let lazyValue;
// lazyValue = returnVoid();
const records = [];
function saveRecords(newRecords) {
    newRecords.forEach((record) => records.push(record));
}
saveRecords(["21", "Come On Over", "The BodyGuard"]);
// never 반환 타입
function fail(message) {
    throw new Error(`Invariant failure: ${message}`);
}
function workWithUnsafeParam(param) {
    if (typeof param !== "string") {
        fail(`param should be a string, not ${typeof param}`);
    }
    // 여기에서 param의 타입은 string으로 알려진다.
    param.toUpperCase(); // Ok
}
// 1 ~ 2번째 줄 오버로드 시그니처
function createDate(monthOrTimestamp, day, year) {
    return day === undefined || year === undefined //
        ? new Date(monthOrTimestamp)
        : new Date(year, monthOrTimestamp, day);
}
// 3번째 줄부터 구현 시그니처
createDate(325252525); // Ok
createDate(7, 23, 1953); // Ok
// function format(getData: () => string): string;
function format(data, needle, haystack) {
    return needle && haystack ? data.replace(needle, haystack) : data;
}
