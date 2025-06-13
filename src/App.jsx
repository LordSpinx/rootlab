import { useState } from 'react'
import './App.css'
import logo from './assets/rootlab_logo.svg'
import RootGame from './RootGame'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/*<h1>RootLab</h1>*/}
      <img src={logo} style={{filter: 'invert(1)'}}></img>
      <RootGame />
    </>
  )
}

export default App
