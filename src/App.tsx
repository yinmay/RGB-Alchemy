import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './App.css'
import request from './utils/request'
import UserDescriptions from './components/UserDescriptions'
import AlchemyPanel from './components/AlchemyPanel'
import { IItem } from './components/AlchemyPanel'
export interface IUser {
  userId: string
  width: number
  height: number
  maxMoves: number
  target: number[]
  closest: number[]
}

const initUser = {
  userId: '',
  width: 0,
  height: 0,
  maxMoves: 0,
  target: [0, 0, 0],
  closest: [0, 0, 0],
}

export const initCell = {
  x: 0,
  y: 0,
  color: [0, 0, 0],
  colorGroup: [],
  gap: 0,
}

function App() {
  const [user, setUser] = useState<IUser>({
    ...initUser,
  })
  const [step, setStep] = useState<IItem[] | []>([])
  const [closestCell, setClosestCell] = useState<IItem>({ ...initCell })
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
        <UserDescriptions user={user} closestCell={closestCell} />
        <DndProvider backend={HTML5Backend}>
          <AlchemyPanel
            setStep={setStep}
            user={user}
            step={step}
            setClosestCell={setClosestCell}
          />
        </DndProvider>
      </header>
    </div>
  )
}

export default App
