import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'
import Tooltip from '@mui/material/Tooltip'

import { IItem } from './AlchemyPanel'
import { appContext } from '../App'

interface IProps {
  handleClick: (item: IItem, type: 'cell' | 'header') => void
  item: IItem
  line: IItem[]
  lineIndex: number
  itemIndex: number
  length: number
  onDrop: (item: IItem) => void
}

const Source: React.FC<IProps> = ({
  handleClick,
  item,
  lineIndex,
  itemIndex,
  length,
  line,
  onDrop,
}) => {
  const contextValue = useContext(appContext)

  const [, drop] = useDrop({
    accept: 'cell',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  return (
    <Tooltip title={`${item?.color?.join(',')}`}>
      <span>
        <button
          ref={drop}
          data-testid="dustbin"
          className="header" //header
          key={`${lineIndex}/${itemIndex}`}
          disabled={contextValue.step.length >= 3 ? true : false}
          onClick={() => handleClick(item, 'header')}
          style={{
            background: `rgb(${item?.color?.join(',')})`,
            visibility:
              (lineIndex === 0 &&
                (itemIndex === 0 || itemIndex === line.length - 1)) ||
              (lineIndex === length - 1 &&
                (itemIndex === 0 || itemIndex === line.length - 1))
                ? 'hidden'
                : 'inherit',
          }}
        ></button>
      </span>
    </Tooltip>
  )
}

export default Source
