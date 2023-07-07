import React, { useContext } from 'react'
import { Descriptions } from 'antd'

import { appContext } from '../App'
import { calculateColorGap } from '../utils/generatePanel'
interface IProps {
  maxMoves: number
}

const UserDescriptions: React.FC<IProps> = (props) => {
  const { maxMoves } = props
  const contextValue = useContext(appContext)
  const gap = calculateColorGap(
    contextValue?.user?.target,
    contextValue?.closestCell.color
  )
  const gapPercentage = (gap * 100).toFixed(2)
  console.log(gap, 23424)
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
        <span>Δ = {gapPercentage}%</span>
      </Descriptions.Item>
    </Descriptions>
  )
}

export default UserDescriptions
