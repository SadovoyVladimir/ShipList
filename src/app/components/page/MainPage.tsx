import React from 'react'
import ShipList from '../ui/shipList/shipList'
import './MainPage.scss'

export default function MainPage() {
  return (
    <div className='mt-4 mb-4'>
      <h1 className='main-title m-3'>Список всех кораблей</h1>
      <ShipList />
    </div>
  )
}
