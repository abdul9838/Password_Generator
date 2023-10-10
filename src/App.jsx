import { useState, useCallback, useEffect, useRef } from "react"

function App() {

  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)

  const inputRef = useRef(null);

  const passwordGeneraor = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    let num = "123456789"
    let char = "!@#$%&*"
    if (character) str += char
    if (number) str += num
    for (let index = 0; index < length; index++) {
      const gen = Math.floor(Math.random() * str.length) + 1
      pass += str[gen]
    }
    setPassword(pass)
  }, [length, number, character, setPassword])

  useEffect(() => {
    passwordGeneraor()
  }, [length, number, character])

  const copyToClipboard = () => {
    inputRef.current.select();
    navigator.clipboard.writeText(password)
  }
  return (

    <div className="w-full max-w-md shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-white">
      <h1 className='text-white text-center text-2xl my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3 text-black"
          value={password}
          ref={inputRef}
          placeholder="Password"
          readOnly
        />
        <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyToClipboard}
        >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={25}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className='cursor-pointer'
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="numberInput"
            value={number}
            onClick={() => setNumber(prev => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="characterInput"
            value={character}
            onClick={() => setCharacter(prev => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
      <button onClick={() => passwordGeneraor()} className="outline-none w-full bg-blue-700 mt-3 text-white px-3 py-1 flex items-center  justify-center gap-3"><img className="w-[30px]" src="/refresh.png" alt="" />New Password</button>
    </div>

  )
}

export default App
