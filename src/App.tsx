import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Layout, Modal } from 'antd'

import './App.css'
import request from './utils/request'
import UserDescriptions from './components/UserDescriptions'
import AlchemyPanel from './components/AlchemyPanel'
import { IItem } from './components/AlchemyPanel'

const { Content } = Layout

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [step, setStep] = useState<IItem[] | []>([])
  const [closestCell, setClosestCell] = useState<IItem>({ ...initCell })
  useEffect(() => {
    request({
      method: 'get',
    }).then((resp) => {
      setUser(resp)
    })
  }, [])

  useEffect(() => {
    const isOpen =
      0 < closestCell.gap &&
      (closestCell.gap <= 0.1 || user.maxMoves - step.length <= 0)
    setIsModalOpen(isOpen)
  }, [closestCell.gap, user.maxMoves, step.length])

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOk = () => {
    request({
      method: 'get',
      url: `/user/${user.userId}`,
    }).then((resp) => {
      setUser(resp)
      //reset
      setClosestCell({ ...initCell })
      setStep([])
    })
    handleCancel()
  }

  return (
    <div className="App">
      <Layout>
        <Content style={contentStyle}>
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>
              You are
              {user.maxMoves - step.length > 0 ? ' successful' : ' failed'}, do
              you want to play again?
            </p>
          </Modal>
          <UserDescriptions
            user={user}
            closestCell={closestCell}
            maxMoves={user.maxMoves - step.length}
          />
          <DndProvider backend={HTML5Backend}>
            <AlchemyPanel
              setStep={setStep}
              user={user}
              step={step}
              setClosestCell={setClosestCell}
              closestCell={closestCell}
            />
          </DndProvider>
        </Content>
      </Layout>
    </div>
  )
}

export default App

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: 20,
  color: '#fff',
}
