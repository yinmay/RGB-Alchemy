import React, { useContext } from 'react'

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
  return (
    <div style={styles.userDescriptions}>
      <div style={styles.line}>User ID: {contextValue.user.userId}</div>
      <div style={styles.line}>Moves left: {maxMoves}</div>
      <div style={styles.line}>
        Target color:
        <div
          className="colorBox"
          style={{
            ...styles.colorBox,
            background: `rgb(${contextValue.user.target?.join(',')})`,
          }}
        ></div>
      </div>
      <div style={styles.line}>
        Closest color:
        <div
          style={{
            ...styles.colorBox,
            background: `rgb(${contextValue.closestCell?.color?.join(',')})`,
          }}
        ></div>
        <span>Δ = {gapPercentage}%</span>
      </div>
    </div>
  )
}

export default UserDescriptions

const styles = {
  userDescriptions: {
    width: '100%',
  },
  line: {
    margin: 10,
    display: 'flex',
    alignItems: 'center',
  },
  colorBox: {
    height: 20,
    width: 20,
    marginLeft: 10,
    marginRight: 10,
  },
}
