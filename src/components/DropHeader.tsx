import React from 'react'
import { useDrop } from 'react-dnd'

import { IItem } from './AlchemyPanel'

interface IProps {
  step: IItem[] | []
  handleClick: (item: IItem, type: 'cell' | 'header') => void
  item: IItem
  line: IItem[]
  lineInddx: number
  itemIndex: number
  length: number
  onDrop: (item: IItem) => void
}

const DropHeader: React.FC<IProps> = ({
  step,
  handleClick,
  item,
  lineInddx,
  itemIndex,
  length,
  line,
  onDrop,
  // accept,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'cell',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  return (
    <button
      ref={drop}
      data-testid="dustbin"
      className="itemGray" //header
      key={`${lineInddx}${itemIndex}`}
      disabled={step.length >= 3 ? true : false}
      onClick={() => handleClick(item, 'header')}
      style={{
        background: `rgb(${item?.color?.join(',')})`,
        visibility:
          (lineInddx === 0 &&
            (itemIndex === 0 || itemIndex === line.length - 1)) ||
          (lineInddx === length - 1 &&
            (itemIndex === 0 || itemIndex === line.length - 1))
            ? 'hidden'
            : 'inherit',
      }}
    >{`${item.x}/${item.y}`}</button>
  )
}

export default DropHeader
