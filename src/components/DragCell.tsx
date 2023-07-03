import React, { useContext } from 'react'
import { useDrag } from 'react-dnd'

import { IItem } from './AlchemyPanel'
import { appContext } from '../App'
interface IProps {
  handleClick: (item: IItem, type: 'cell' | 'header') => void
  item: IItem
  lineIndex: number
  itemIndex: number
}

const DragCell: React.FC<IProps> = ({
  handleClick,
  item,
  lineIndex,
  itemIndex,
}) => {
  const contextValue = useContext(appContext)
  const type = `${lineIndex}${itemIndex}`
  const [, drag] = useDrag(
    () => ({
      type: 'cell',
      item,
    }),
    [item, type]
  )
  const { x, y } = contextValue.closestCell
  return (
    <button
      data-testid="box"
      ref={drag}
      key={`${lineIndex}${itemIndex}`}
      disabled={contextValue.step.length < 3 ? true : false}
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
