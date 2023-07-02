import React, { useEffect, useState } from 'react'
import './App.css'
import request from './utils/request'

interface IUser {
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
        <div>
          <div>User ID:{user.userId}</div>
          <div>Moves left:{user.maxMoves}</div>
          <div>
            Target color:
            <div
              className="colorBox"
              style={{ background: `rgb(${user.target?.join(',')})` }}
            ></div>
          </div>
          <div>
            Closest color:
            <div
              className="colorBox"
              style={{ background: `rgb(${user.closest?.join(',')})` }}
            ></div>
          </div>
        </div>
      </header>
    </div>
  )
}

const styles = {
  colorBox: {
    width: 20,
    height: 20,
  },
}

export default App
