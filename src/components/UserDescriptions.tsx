import React, { useContext } from 'react'
import { Descriptions } from 'antd'

import { appContext } from '../App'
interface IProps {
  maxMoves: number
}

const UserDescriptions: React.FC<IProps> = (props) => {
  const { maxMoves } = props
  const contextValue = useContext(appContext)
  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="User ID">
        {contextValue.user.userId}
      </Descriptions.Item>
      <Descriptions.Item label="Moves left">{maxMoves}</Descriptions.Item>
      <Descriptions.Item label="Target color">
        <div
          className="colorBox"
          style={{ background: `rgb(${contextValue.user.target?.join(',')})` }}
        ></div>
      </Descriptions.Item>
      <Descriptions.Item label="Closest color">
        <div
          className="colorBox"
          style={{
            background: `rgb(${contextValue.closestCell?.color?.join(',')})`,
          }}
        ></div>
      </Descriptions.Item>
    </Descriptions>
  )
}

export default UserDescriptions
