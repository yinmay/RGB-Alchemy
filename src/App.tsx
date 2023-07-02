import React, { useEffect, useState } from 'react'
import './App.css'
import request from './utils/request'
import UserDescriptions from './components/UserDescriptions'
import AlchemyPanel from './components/AlchemyPanel'

export interface IUser {
  userId: string
  width: number
  height: number
  maxMoves: number
  target: Number[]
  closest: Number[]
}

const initUser = {
  userId: '',
  width: 0,
  height: 0,
  maxMoves: 0,
  target: [0, 0, 0],
  closest: [0, 0, 0],
}

function App() {
  const [user, setUser] = useState<IUser>({
    ...initUser,
  })

  useEffect(() => {
    request({
      method: 'get',
    }).then((resp) => {
      setUser(resp)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <UserDescriptions user={user} />
        <AlchemyPanel />
      </header>
    </div>
  )
}

export default App
