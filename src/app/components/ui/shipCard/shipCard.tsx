import React from 'react'
import { IShip } from '../../../interfaces/interfaces'
import './shipCard.scss'

export default function ShipCard({
  title,
  icons,
  description,
  type,
  nation,
  level
}: IShip) {

  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <h3
          className='card-title d-flex justify-content-center'
          style={{ color: `${nation.color}` }}
        >
          {title}, {type.title}, {nation.title}, {level} lvl
        </h3>
        <img src={nation.icons.small} alt='...' />
        <img src={type.icons.default} alt='...' />
        <img src={icons.large} className='card-img-top' alt='...' />
        <p className='card-text'>{description}</p>
      </div>
    </div>
  )
}
