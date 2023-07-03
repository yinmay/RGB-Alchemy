import React from 'react'
import { useDrag } from 'react-dnd'

import { IItem } from './AlchemyPanel'

interface IProps {
  step: IItem[] | []
  handleClick: (item: IItem, type: 'cell' | 'header') => void
  item: IItem
  lineInddx: number
  itemIndex: number
}

const DragCell: React.FC<IProps> = ({
  step,
  handleClick,
  item,
  lineInddx,
  itemIndex,
}) => {
  const type = `${lineInddx}${itemIndex}`
  const [, drag] = useDrag(
    () => ({
      type: 'cell',
      item,
      // collect: (monitor) => ({
      //   opacity: monitor.isDragging() ? 0.4 : 1,
      // }),
    }),
    [item, type]
  )
  return (
    <button
      data-testid="box"
      ref={drag}
      key={`${lineInddx}${itemIndex}`}
      disabled={step.length < 3 ? true : false}
      className="item"
      onClick={() => handleClick(item, 'cell')} //cell
      style={{
        cursor: 'move',
        background: `rgb(${item?.color?.join(',')})`,
      }}
    >{`${item.x}/${item.y}`}</button>
  )
}

export default DragCell
