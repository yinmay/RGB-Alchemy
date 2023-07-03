import React from 'react'
import { useDrag } from 'react-dnd'

import { IItem } from './AlchemyPanel'

interface IProps {
  step: IItem[] | []
  handleClick: (item: IItem, type: 'cell' | 'header') => void
  item: IItem
  closestCell: IItem
  lineIndex: number
  itemIndex: number
}

const DragCell: React.FC<IProps> = ({
  step,
  handleClick,
  item,
  lineIndex,
  itemIndex,
  closestCell,
}) => {
  const type = `${lineIndex}${itemIndex}`
  const [, drag] = useDrag(
    () => ({
      type: 'cell',
      item,
    }),
    [item, type]
  )
  const { x, y } = closestCell
  return (
    <button
      data-testid="box"
      ref={drag}
      key={`${lineIndex}${itemIndex}`}
      disabled={step.length < 3 ? true : false}
      className="cell"
      onClick={() => handleClick(item, 'cell')}
      style={{
        cursor: 'move',
        background: `rgb(${item?.color?.join(',')})`,
        border: x === lineIndex && y === itemIndex ? '3px solid red' : 'none',
      }}
    ></button>
  )
}

export default DragCell
