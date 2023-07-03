import React, { useState, useEffect, useContext } from 'react'
import DragCell from './DragCell'
import DropHeader from './DropHeader'
import {
  calculateColorPanel,
  generateTable,
  findSmallestGapCell,
} from '../utils/generatePanel'
import { initCell, appContext } from '../App'

interface IProps {}

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

const AlchemyPanel: React.FC<IProps> = () => {
  const contextValue = useContext(appContext)

  const { height: row, width: col, target } = contextValue.user

  let panel = generateTable(row, col, target)
  const [colorPanel, setColorPanel] = useState([...panel])
  useEffect(() => setColorPanel([...panel]), [contextValue.user])
  const handleClick = (item: IItem) => {
    const hasClick = contextValue.step.find(
      (s) => s.x === item.x && s.y === item.y
    )
    if (hasClick) {
      return
    } else {
      contextValue.setStep(() => [...contextValue.step, item])
    }

    const initColor = initColorGroup[contextValue.step.length]
    const newPanel = calculateColorPanel(item, colorPanel, initColor, target)
    setColorPanel([...newPanel])
  }
  const handleDrop = (dragItem: IItem, item: IItem) => {
    const newPanel = calculateColorPanel(
      item,
      colorPanel,
      dragItem.color,
      target
    )
    setColorPanel([...newPanel])
    const cloestCell = findSmallestGapCell(colorPanel) ?? initCell
    contextValue.setClosestCell({ ...cloestCell })
    contextValue.setStep(() => [
      ...contextValue.step,
      { ...item, color: dragItem.color },
    ])
  }

  return (
    <div>
      {colorPanel?.map((line: IItem[], lineIndex: number) => (
        <div className="line" key={lineIndex}>
          {line?.map((item: IItem, itemIndex: number) => {
            const condition =
              lineIndex === 0 ||
              itemIndex === 0 ||
              lineIndex === row + 2 - 1 ||
              itemIndex === col + 2 - 1

            return condition ? (
              <DropHeader
                lineIndex={lineIndex}
                itemIndex={itemIndex}
                handleClick={handleClick}
                item={item}
                length={colorPanel.length}
                line={line}
                onDrop={(dragItem) => handleDrop(dragItem, item)}
              />
            ) : (
              <DragCell
                lineIndex={lineIndex}
                itemIndex={itemIndex}
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
