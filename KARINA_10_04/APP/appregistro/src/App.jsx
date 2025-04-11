import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Formulario } from './componentes/formulario'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Formulario/>
      </div>
    </>
  )
}

export default App
