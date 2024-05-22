import React from 'react';
import logo from './logo.svg';
import './App.css';

/* TypeScriptのデータ型*/
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




/* Intersection Types */
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

/* Union Types */
let value : boolean | number;
value = true;
value = 1;
// value = "abc" // error
// number型またはstring型をもつ配列
let arrayUni: (number | string)[];
arrayUni = [0, 1, 2, "hello"];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
