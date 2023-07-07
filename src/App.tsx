import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Layout, Modal } from 'antd'

import './App.css'
import request from './fetchs/request'
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

interface IContext {
  user: IUser
  closestCell: IItem
  step: IItem[] | []
  setStep: React.Dispatch<React.SetStateAction<IItem[] | []>>
  setClosestCell: React.Dispatch<React.SetStateAction<IItem>>
}

const initContext = {
  user: initUser,
  closestCell: initCell,
  step: [],
  setStep: () => {},
  setClosestCell: () => {},
}

export const appContext = React.createContext<IContext>({ ...initContext })
function App() {
  const [user, setUser] = useState<IUser>({
    ...initUser,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState<IItem[] | []>([])
  const [closestCell, setClosestCell] = useState<IItem>({ ...initCell })

  const contextValue = {
    user,
    setUser,
    step,
    setStep,
    closestCell,
    setClosestCell,
  }

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
    <appContext.Provider value={contextValue}>
      <div className="App" style={{ minWidth: user.width * 50 }}>
        <Layout>
          <Content style={contentStyle}>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <p>
                You are
                {user.maxMoves - step.length > 0 ? ' successful' : ' failed'},
                do you want to play again?
              </p>
            </Modal>
            <UserDescriptions maxMoves={user.maxMoves - step.length} />
            <DndProvider backend={HTML5Backend}>
              <AlchemyPanel />
            </DndProvider>
          </Content>
        </Layout>
      </div>
    </appContext.Provider>
  )
}

export default App

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: 20,
  color: '#fff',
}
