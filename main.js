/*
//optional parameter ?를 붙어주면 LastName 을 전달해도 되고 안해도됨, 전달안하면 undefined
function printName(firstName: string, lastName?: string) {
  console.log(firstName);
  console.log(lastName);
}
printName("peti");

//Default parameter - 인자에 아무것도 전달안했을떄 default 값을 보낸다
function printMessage(message: string = "Default message") {
  console.log(message);
}

printMessage();

//Rest parameter
function addNumber(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b);
}

console.log(addNumber(1, 3, 5, 3));

//union = OR
type Direction = "left" | "right" | "up" | "down";
function move(direction: Direction) {
  console.log(direction);
}
move("down");

//Discriminated Union
type SuccessState = {
  result: "success";
  response: {
    body: string;
  };
};

type FailState = {
  result: "fail";
  reason: string;
};

type LoginState = SuccessState | FailState;

function login(): LoginState {
  return {
    result: "success",
    response: {
      body: "Logged in",
    },
  };
}

function printLoginState(state: LoginState) {
  if (state.result === "success") {
    console.log(`${state.response.body}`);
  } else {
    console.log(`${state.reason}`);
  }
}

//intersection type = &
type Student = {
  name: string;
  score: number;
};

type Employee = {
  employeeId: number;
  work: () => void;
};

function internWork(person: Student & Employee) {
  console.log(person.name, person.employeeId, person.work());
}

internWork({
  name: "peti",
  score: 100,
  employeeId: 3242,
  work: () => {},
});

//enum
enum Days {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

console.log(Days.Monday);

//Type Assertions
//자바스크립트 function 이여서 타입을 몰라서 타입스크립트에선 any 인데 항상 string 을 리턴하는 함수가있다고 가정

function jsStringFunc(): any {
  return "hello";
}
const result = jsStringFunc();
//type 이 any여서 string.length를 못씀. 이럴경우 string 이라고 CASTING 해서 ( 내가맞다고 주장) 해서 사용가능
console.log((result as string).length);
*/
var BeansGram_PerShot = 7;
var coffeeBeans = 0;
// public <-기본값, private <-외부에서 볼수도 없고 접근불가, protected <- 외부에서 접근불가지만 이클래스를 상속한 자식은 접근가능
var CoffeeMaker = /** @class */ (function () {
    function CoffeeMaker(beans) {
        this.coffeeBeans = 0; // instance (object) level
        this.coffeeBeans = beans;
    }
    CoffeeMaker.makeMachine = function (coffeeBeans) {
        return new CoffeeMaker(coffeeBeans);
    };
    CoffeeMaker.prototype.fillCoffeeBeans = function (beans) {
        if (beans < 0) {
            throw new Error("Value for beans should be greater than 0");
        }
        this.coffeeBeans += beans;
    };
    CoffeeMaker.prototype.makeCoffee = function (shots) {
        if (this.coffeeBeans < shots * CoffeeMaker.BeansGram_PerShot) {
            throw new Error("Not enough coffee beans");
        }
        this.coffeeBeans -= shots * CoffeeMaker.BeansGram_PerShot;
        return {
            shots: shots,
            hasMilk: false
        };
    };
    CoffeeMaker.BeansGram_PerShot = 7; //class level
    return CoffeeMaker;
}());
var maker = CoffeeMaker.makeMachine(4);
maker.fillCoffeeBeans(33);
//getter and setter 멤버변수로 사용할수 있고 유용
/*
class User {
  firstName: string;
  lastName: string;
  fullName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
  }
}
const user = new User("Peter", "kin");
console.log(user.fullName); // peter kin
user.firstName = "cheyoon" //<==get set없인 이렇게 변경해도 바뀌지 않음
console.log(user.fullName); // peter kin

 */
var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.internalAge = 4;
    }
    Object.defineProperty(User.prototype, "fullName", {
        get: function () {
            return "".concat(this.firstName, " ").concat(this.lastName);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "age", {
        get: function () {
            return this.internalAge;
        },
        set: function (num) {
            if (num < 0) {
                throw new Error("age should be greater than 0");
            }
            this.internalAge = num;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
var user = new User("Peter", "kin");
console.log(user.fullName); // peter kin
user.firstName = "cheyoon";
console.log(user.fullName); //cheyoon kin
