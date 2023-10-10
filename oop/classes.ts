abstract class User {
  constructor(
    //
    private firstName: string,
    protected lastName: string,
    public nickname: string
  ) {}
  abstract getNickname(): void; // 추상 메소드
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Member0 extends User {
  getNickname(): void {
    console.log(this.lastName);
  }
}

const me = new Member0("Heejung", "Nam", "NAMI");

// me.lastName;
me.nickname;
me.getFullName();
