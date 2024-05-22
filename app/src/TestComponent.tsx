import React from 'react'

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
