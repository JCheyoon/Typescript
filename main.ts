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

//imperative and procedural programming 명령절차지향적
/*
type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
};
const BeansGram_PerShot = 7;

let coffeeBeans: number = 0;

function makeCoffee(shots: number): CoffeeCup {
  if (coffeeBeans < shots * BeansGram_PerShot) {
    throw new Error("Not enough coffee beans");
  }
  coffeeBeans -= shots * BeansGram_PerShot;
  return {
    shots: shots,
    hasMilk: false,
  };
}
coffeeBeans += 3 * BeansGram_PerShot;

const coffee = makeCoffee(2);
console.log(coffee);


//OOP
//class 안에있는 변수에 접근할때는 this 붙여야한다, Static으로 지정된 변수는 this대신에 class이름을 쓴다
class CoffeeMaker {
  static BeansGram_PerShot = 7; //class level
  coffeeBeans: number = 0; // instance (object) level

  constructor(beans: number) {
    this.coffeeBeans = beans;
  }
  static makeMachine(coffeeBeans: number): CoffeeMaker {
    return new CoffeeMaker(coffeeBeans);
  }

  makeCoffee(shots: number): CoffeeCup {
    if (this.coffeeBeans < shots * CoffeeMaker.BeansGram_PerShot) {
      throw new Error("Not enough coffee beans");
    }
    this.coffeeBeans -= shots * CoffeeMaker.BeansGram_PerShot;
    return {
      shots: shots,
      hasMilk: false,
    };
  }
}
//new -> class의 instance를 만든다
const maker = new CoffeeMaker(2);
console.log(maker);

CoffeeMaker.makeMachine(2);
*/

//Encapsulation

// type CoffeeCup = {
//   shots: number;
//   hasMilk: boolean;
// };
//
// interface CoffeeMaker {
//   makeCoffee(shots: number): CoffeeCup;
// }
//
// const BeansGram_PerShot = 7;
//
// let coffeeBeans: number = 0;
//
// // public <-기본값, private <-외부에서 볼수도 없고 접근불가, protected <- 외부에서 접근불가지만 이클래스를 상속한 자식은 접근가능
//
// class CoffeeMachine implements CoffeeMaker {
//   private static BeansGram_PerShot = 7; //class level
//   private coffeeBeans: number = 0; // instance (object) level
//
//   private constructor(beans: number) {
//     this.coffeeBeans = beans;
//   }
//
//   static makeMachine(coffeeBeans: number): CoffeeMachine {
//     return new CoffeeMachine(coffeeBeans);
//   }
//
//   fillCoffeeBeans(beans: number) {
//     if (beans < 0) {
//       throw new Error("Value for beans should be greater than 0");
//     }
//     this.coffeeBeans += beans;
//   }
//
//   private grindBeans(shots: number) {
//     console.log(`grinding beans for ${shots}`);
//     if (this.coffeeBeans < shots * CoffeeMachine.BeansGram_PerShot) {
//       throw new Error("Not enough coffee beans");
//     }
//     this.coffeeBeans -= shots * CoffeeMachine.BeansGram_PerShot;
//   }
//   private preheat(): void {
//     console.log("heating up");
//   }
//
//   private extract(shots: number): CoffeeCup {
//     console.log(`pulling ${shots} shots`);
//     return {
//       shots: shots,
//       hasMilk: false,
//     };
//   }
//
//   makeCoffee(shots: number): CoffeeCup {
//     this.grindBeans(shots);
//     this.preheat();
//     return this.extract(shots);
//   }
// }
//
// const maker = CoffeeMachine.makeMachine(3);
// maker.makeCoffee(23);

//inheritance
type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
  hasSugar: boolean;
};

interface CoffeeMaker {
  makeCoffee(shots: number): CoffeeCup;
}

class CoffeeMachine implements CoffeeMaker {
  private static BeansGram_PerShot = 7; //class level
  private coffeeBeans: number = 0; // instance (object) level

  constructor(beans: number) {
    this.coffeeBeans = beans;
  }

  static makeMachine(coffeeBeans: number): CoffeeMachine {
    return new CoffeeMachine(coffeeBeans);
  }

  fillCoffeeBeans(beans: number) {
    if (beans < 0) {
      throw new Error("Value for beans should be greater than 0");
    }
    this.coffeeBeans += beans;
  }

  private grindBeans(shots: number) {
    console.log(`grinding beans for ${shots}`);
    if (this.coffeeBeans < shots * CoffeeMachine.BeansGram_PerShot) {
      throw new Error("Not enough coffee beans");
    }
    this.coffeeBeans -= shots * CoffeeMachine.BeansGram_PerShot;
  }
  private preheat(): void {
    console.log("heating up");
  }

  private extract(shots: number): CoffeeCup {
    console.log(`pulling ${shots} shots`);
    return {
      shots: shots,
      hasMilk: false,
      hasSugar: false,
    };
  }

  makeCoffee(shots: number): CoffeeCup {
    this.grindBeans(shots);
    this.preheat();
    return this.extract(shots);
  }
}

interface MilkFrother {
  makeMilk(cup: CoffeeCup): CoffeeCup;
}
interface SugarProvider {
  addSugar(cup: CoffeeCup): CoffeeCup;
}
//STEAM MAKER
class MilkSteamer implements MilkFrother {
  private steamMilk(): void {
    console.log('"steaming milk...🥛"');
  }
  makeMilk(cup: CoffeeCup): CoffeeCup {
    this.steamMilk();
    return { ...cup, hasMilk: true };
  }
}
//SUGAR MAKER
class SugarMixer implements SugarProvider {
  private getSugar() {
    console.log("getting sugar...🍬");
    return true;
  }
  addSugar(cup: CoffeeCup): CoffeeCup {
    const sugar = this.getSugar();
    return { ...cup, hasSugar: true };
  }
}

class CaffeLatteMachine extends CoffeeMachine {
  constructor(beans: number, private milk: MilkFrother) {
    super(beans);
  }
  makeCoffee(shots: number): CoffeeCup {
    const coffee = super.makeCoffee(shots);
    return this.milk.makeMilk(coffee);
  }
}

class SweetCoffee extends CoffeeMachine {
  constructor(private beans: number, private sugar: SugarProvider) {
    super(beans);
  }
  makeCoffee(shots: number): CoffeeCup {
    const coffee = super.makeCoffee(shots);
    return this.sugar.addSugar(coffee);
  }
}
const milkMaker = new MilkSteamer();

//
const machine = new CoffeeMachine(23);
const latteMachine = new CaffeLatteMachine(12, milkMaker);
