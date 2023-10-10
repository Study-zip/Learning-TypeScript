class User {
    constructor(
    //
    firstName, lastName, nickname) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
class Member0 extends User {
    getNickname() {
        console.log(this.lastName);
    }
}
const me = new Member0("Heejung", "Nam", "NAMI");
// me.lastName;
me.nickname;
me.getFullName();
