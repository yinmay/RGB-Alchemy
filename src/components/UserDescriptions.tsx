import React from 'react'
import { Descriptions } from 'antd'

import { IUser } from '../App'
import { IItem } from './AlchemyPanel'
interface IProps {
  user: IUser
  closestCell: IItem
  maxMoves: number
}

const UserDescriptions: React.FC<IProps> = (props) => {
  const {
    user: { userId, target },
    closestCell,
    maxMoves,
  } = props
  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="User ID">{userId}</Descriptions.Item>
      <Descriptions.Item label="Moves left">{maxMoves}</Descriptions.Item>
      <Descriptions.Item label="Target color">
        <div
          className="colorBox"
          style={{ background: `rgb(${target?.join(',')})` }}
        ></div>
      </Descriptions.Item>
      <Descriptions.Item label="Closest color">
        <div
          className="colorBox"
          style={{ background: `rgb(${closestCell.color?.join(',')})` }}
        ></div>
      </Descriptions.Item>
    </Descriptions>
  )
}

export default UserDescriptions
