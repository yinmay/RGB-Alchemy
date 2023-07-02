import React, { useState, useEffect } from 'react'
import { computeColor, generateTable } from '../utils/generatePanel'
import { IUser } from '../App'

interface IProps {
  user: IUser
  step: IItem[] | []
  setStep: React.Dispatch<React.SetStateAction<IItem[] | []>>
}

export interface IItem {
  find(arg0: (s: any) => boolean): unknown
  length: number
  x: number
  y: number
  color: number[]
  colorGroup: number[][]
  gap: number
}

const colorGroup = [
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
]

const AlchemyPanel: React.FC<IProps> = ({ user, step, setStep }) => {
  const { height: row, width: col, target } = user
  let panel = generateTable(row, col, target)
  const [colorPanel, setColorPanel] = useState([...panel])
  const [initColorGroup, setInitColorGroup] = useState([...colorGroup])
  useEffect(() => setColorPanel([...panel]), [user])
  const handleClick = (item: IItem) => {
    const hasClick = step.find((s) => s.x === item.x && s.y === item.y)
    if (hasClick) {
      return
    } else {
      setStep(() => [...step, item])
    }

    const initColor = initColorGroup[step.length]
    const newPanel = computeColor(item, colorPanel, initColor, target)
    setColorPanel([...newPanel])
  }
  console.log(colorPanel, 'colorPanel')
  return (
    <div>
      {colorPanel?.map((line: IItem[], i: number) => (
        <div className="line" key={i}>
          {line?.map((item: IItem, j: number) =>
            i === 0 || j === 0 || i === row + 2 - 1 || j === col + 2 - 1 ? (
              <button
                className="itemGray"
                key={`${i}${j}`}
                disabled={step.length >= 3 ? true : false}
                onClick={() => handleClick(item)}
                style={{
                  background: `rgb(${item?.color?.join(',')})`,
                  visibility:
                    (i === 0 && (j === 0 || j === line.length - 1)) ||
                    (i === colorPanel.length - 1 &&
                      (j === 0 || j === line.length - 1))
                      ? 'hidden'
                      : 'inherit',
                }}
              >{`${item.x}/${item.y}`}</button>
            ) : (
              <button
                key={`${i}${j}`}
                disabled={step.length < 3 ? true : false}
                className="item"
                onClick={() => handleClick(item)}
                style={{ background: `rgb(${item?.color?.join(',')})` }}
              >{`${item.x}/${item.y}`}</button>
            )
          )}
        </div>
      ))}
    </div>
  )
}

export default AlchemyPanel
