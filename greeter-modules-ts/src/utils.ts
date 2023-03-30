let meaningOfLife:number = 42;
//meaningOfLife = "To live";

const colors:Array<string> = ["red","green","blue"];
//colors.push(10);

const defaultName:string = "Mr. X";

const doubleIt = (val:number) =>  val * 2;

const formatGreeting = (greeting:string, name:string, forcefully:boolean) => {
  const recipient:string  = name ? name : defaultName;
  const str:string = `${greeting} ${recipient}`;
  return forcefully ? `${str.toUpperCase()}!` : str;
};

export { doubleIt, formatGreeting };
