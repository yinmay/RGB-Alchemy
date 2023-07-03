import React, { useState, useEffect } from 'react'
import DragCell from './DragCell'
import DropHeader from './DropHeader'
import {
  computeColor,
  generateTable,
  findSmallestGapCell,
} from '../utils/generatePanel'
import { IUser, initCell } from '../App'

interface IProps {
  user: IUser
  step: IItem[] | []
  setStep: React.Dispatch<React.SetStateAction<IItem[] | []>>
  setClosestCell: React.Dispatch<React.SetStateAction<IItem>>
}

export interface IItem {
  x: number
  y: number
  color: number[]
  colorGroup: number[][]
  gap: number
}

const initColorGroup = [
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
]

const AlchemyPanel: React.FC<IProps> = ({
  user,
  step,
  setStep,
  setClosestCell,
}) => {
  const { height: row, width: col, target } = user
  let panel = generateTable(row, col, target)
  const [colorPanel, setColorPanel] = useState([...panel])
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
  const handleDrop = (dragItem: IItem, item: IItem) => {
    const newPanel = computeColor(item, colorPanel, dragItem.color, target)
    setColorPanel([...newPanel])
    const cloestCell = findSmallestGapCell(colorPanel) ?? initCell
    setClosestCell({ ...cloestCell })
  }

  return (
    <div>
      {colorPanel?.map((line: IItem[], lineInddx: number) => (
        <div className="line" key={lineInddx}>
          {line?.map((item: IItem, itemIndex: number) => {
            const condition =
              lineInddx === 0 ||
              itemIndex === 0 ||
              lineInddx === row + 2 - 1 ||
              itemIndex === col + 2 - 1

            return condition ? (
              <DropHeader
                lineInddx={lineInddx}
                itemIndex={itemIndex}
                step={step}
                handleClick={handleClick}
                item={item}
                length={colorPanel.length}
                line={line}
                onDrop={(dragItem) => handleDrop(dragItem, item)}
              />
            ) : (
              <DragCell
                lineInddx={lineInddx}
                itemIndex={itemIndex}
                step={step}
                handleClick={handleClick}
                item={item}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default AlchemyPanel
