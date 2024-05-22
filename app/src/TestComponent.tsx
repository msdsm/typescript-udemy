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
