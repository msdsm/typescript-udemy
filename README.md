# typescript-udemy

## TypeScriptのデータ型
```ts
const name = "hello";
// name = "hello2"; // できない
let nameChange = "hello";
nameChange = "hello2";

let username : string = "hello";
let num : number = 2;
let flag : boolean = true;
let array1 : boolean[] = [true, false, true];
let array2 : (string | number)[] = [0, 1, "hello"]

// ?をつけるとrequiredではなくなる
interface NAME {
  first: string;
  last: string | null; // null許容
  middle?: string;
}

let nameObj: NAME = {first: "Yamada", last: "Taro"};
let nameObj2: NAME = {first: "a", last: null};

// 引数と返り値の型明示方法
const func1 = (x: number, y: number):number => {
  return x + y;
}
```

## Intersection Types
```ts
type PROFILE = {
  age: number;
  city: string;
};

type LOGIN = {
  username: string;
  password: string;
};

// 2つのtypeを結合させて新しいtypeを作成できる
type USER = PROFILE & LOGIN;
// 以下のように利用可能
const userA: USER = {
  age: 30,
  city: "Tokyo",
  username: "xxx",
  password: "yyy",
};
```

## UnionTypes
```ts
let value : boolean | number;
value = true;
value = 1;
// value = "abc" // error
// number型またはstring型をもつ配列
let arrayUni: (number | string)[];
arrayUni = [0, 1, 2, "hello"];
```


## Literal Types
```ts
let company: "Facebook" | "Google" | "Amazon"
company = "Amazon"
// company = "Apple"; // error
let memory: 256 | 512;
memory = 256;
// memory = 12; // error
```

## typeof
```ts
let msg: string = "Hi";
let msg2: typeof msg; // msg2の型をmsg1と同じ型にする
// msg2 = 1; // error
msg2 = "abc";

let animal = {cat: "small cat"};
let newAnimal: typeof animal = {cat: "big cat"};
```
- jsonなどで非常に便利

## keyof
```ts
type KEYS = {
  primary: string;
  secondary: string;
};
let key: keyof KEYS; // オブジェクトのキーを文字列のUnion Typeで取り出せる
key = "primary";
key = "secondary";
// key = "a"; // error

// typeof + keyof
const SPORTS = {
  soccer: "Soccer",
  baseball: "Baseball",
};

let keySports: keyof typeof SPORTS; // SPORTSのtypeofでオブジェクト型になって、それに対してkeyofを適用
keySports = "soccer";
// keySports = "b"; // error
```


## enum
```ts
enum OS {
  Windows,
  Mac,
  Linux,
}
interface PC {
  id: number;
  OSType: OS;
}
const PC1: PC = {
  id: 1,
  OSType: OS.Windows,
};
const PC2: PC = {
  id: 2,
  OSType: OS.Mac,
};
```


## 型の互換性
```ts
const comp1 = "test";
let comp2: string = comp1; // これはok

let comp3: string = "test";
// let comp4: "test" = comp3; // error(文字列リテラル型に対して変数の値を参照する式)

let funcComp1 = (x: number) => {};
let funcComp2 = (x: string) => {};

// funcComp1 = funcComp2 // 引数の型が違うためerror
```