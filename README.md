# typescript-udemy
- 最速で学ぶTypeScript

<!-- vscode-markdown-toc -->
* 1. [ソース](#)
* 2. [TypeScriptのデータ型](#TypeScript)
* 3. [Intersection Types](#IntersectionTypes)
* 4. [UnionTypes](#UnionTypes)
* 5. [Literal Types](#LiteralTypes)
* 6. [typeof](#typeof)
* 7. [keyof](#keyof)
* 8. [enum](#enum)
* 9. [型の互換性](#-1)
* 10. [Generics](#Generics)
* 11. [JSON型推論](#JSON)
* 12. [React Hooks Props型](#ReactHooksProps)
* 13. [React Hooks useState](#ReactHooksuseState)
* 14. [Event handler:データ型](#Eventhandler)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name=''></a>ソース
- https://www.udemy.com/course/typescript-react-frontend/

##  2. <a name='TypeScript'></a>TypeScriptのデータ型
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

##  3. <a name='IntersectionTypes'></a>Intersection Types
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

##  4. <a name='UnionTypes'></a>UnionTypes
```ts
let value : boolean | number;
value = true;
value = 1;
// value = "abc" // error
// number型またはstring型をもつ配列
let arrayUni: (number | string)[];
arrayUni = [0, 1, 2, "hello"];
```


##  5. <a name='LiteralTypes'></a>Literal Types
```ts
let company: "Facebook" | "Google" | "Amazon"
company = "Amazon"
// company = "Apple"; // error
let memory: 256 | 512;
memory = 256;
// memory = 12; // error
```

##  6. <a name='typeof'></a>typeof
```ts
let msg: string = "Hi";
let msg2: typeof msg; // msg2の型をmsg1と同じ型にする
// msg2 = 1; // error
msg2 = "abc";

let animal = {cat: "small cat"};
let newAnimal: typeof animal = {cat: "big cat"};
```
- jsonなどで非常に便利

##  7. <a name='keyof'></a>keyof
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


##  8. <a name='enum'></a>enum
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


##  9. <a name='-1'></a>型の互換性
```ts
const comp1 = "test";
let comp2: string = comp1; // これはok

let comp3: string = "test";
// let comp4: "test" = comp3; // error(文字列リテラル型に対して変数の値を参照する式)

let funcComp1 = (x: number) => {};
let funcComp2 = (x: string) => {};

// funcComp1 = funcComp2 // 引数の型が違うためerror
```


##  10. <a name='Generics'></a>Generics
```ts
interface GEN<T> {
  item: T;
}
const gen0: GEN<string> = {item: "hello"};
// const gen1: GEN = {item: "hello"}; // error
// const gen2: GEN<number> = {item: 12}; // error

// デフォルトの型を設定
interface GEN<T = string> {
  item: T;
}
const gen3: GEN = {item: "hello"}; // デフォルト型を指定しているのでこれはerrorにならない

interface GEN2<T extends string | number> {
  item: T;
}
const gen4: GEN2<string> = {item: "hello"};
const gen5: GEN2<number> = {item: 1};
// const gen6: GEN2<boolean> = {item: true}; // error

function funcGen<T>(props: T) {
  return {item: props}
}
const gen6 = funcGen("test"); // 関数ジェネリクスの場合は引数に渡すと型を推論してくれるためfuncGen<string>と明示する必要ない
const gen7 = funcGen<string | null>(null);

function funcGen1<T extends string | null>(props: T) {
  return {value: props}
}
const gen8 = funcGen1("hello");
// const gen9 = funcGen1(1); // error
const gen10 = funcGen1(null);

interface Props {
  price: number;
}
function funcGen3<T extends Props>(props: T) {
  return {value: props.price}
}
const gen11 = funcGen3({price: 10});

// アロー関数で書く場合
const funcGen4 = <T extends Props>(props: T) => {
  return {value: props.price};
}
```

##  11. <a name='JSON'></a>JSON型推論
```ts
import Data from "./data.json" // jsonファイル読み込み
type USERS = typeof Data; // それをもとにtype作成
```

##  12. <a name='ReactHooksProps'></a>React Hooks Props型
- React.FCはReactのFunctional Component型のこと
- rafceでFunctional Componentのテンプレートをvscodeで使える
```ts
// propsの型明示
// TestComponent.tsx
interface Props {
    text: string
}

// genericsの利用によって引数の型を明示できる(React.FCがジェネリクスで宣言されている)
const TestComponent: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

export default TestComponent
```
```ts
// App.tsx
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TestComponent text="hello from app"/>
      </header>
    </div>
  );
}

export default App;
```

##  13. <a name='ReactHooksuseState'></a>React Hooks useState
```ts
// TestComponent.tsx
import React, { useState } from 'react'

interface Props {
    text: string
}

interface UserData {
    id: number;
    name: string;
}

// genericsの利用によって引数の型を明示できる(React.FCがジェネリクスで宣言されている)
const TestComponent: React.FC<Props> = (props) => {
  const [count, setCount] = useState(0);
  // const[count, setCount] = useState<number | null>(null); // genericsが使用できる

  // useStateでオブジェクトを使用する例
  const [user, setUser] = useState<UserData>({id:0, name:""});
  return (
    <div>
      <h1>{props.text}</h1>
      <h1>{count}</h1>
    </div>
  )
}

export default TestComponent
```
```ts
// App.tsx
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TestComponent text="hello from app"/>
      </header>
    </div>
  );
}

export default App;
```

##  14. <a name='Eventhandler'></a>Event handler:データ型
- Eventの型を明示するときは、vscodeの機能を使うと便利
- 今回の場合だと、handleInputChangeの引数の型を明示するときにonChangeにカーソルをあてて表示される型をコピペ
  - React.ChangeEvent<HTMLInputElement>
```tsx
// TestComponent.tsx
interface Props {
    text: string
}

interface UserData {
    id: number;
    name: string;
}

// genericsの利用によって引数の型を明示できる(React.FCがジェネリクスで宣言されている)
const TestComponent: React.FC<Props> = (props) => {
  const [count, setCount] = useState(0);
  // const[count, setCount] = useState<number | null>(null); // genericsが使用できる

  // useStateでオブジェクトを使用する例
  const [user, setUser] = useState<UserData>({id:0, name:""});

  const [inputData, setInputData] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  }

  return (
    <div>
      <h1>{props.text}</h1>
      <h1>{count}</h1>
      <input type="text" value={inputData} onChange={handleInputChange}/>
      <h1>{inputData}</h1>
    </div>
  )
}

export default TestComponent
```
```tsx
// App.tsx
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TestComponent text="hello from app"/>
      </header>
    </div>
  );
}

export default App;
```