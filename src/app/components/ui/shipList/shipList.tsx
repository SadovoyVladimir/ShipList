import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'
import { OperationVariables, QueryResult, useQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import { IShip } from '../../../interfaces/interfaces'
import { GET_SHIPS } from '../../../query/ships'
import SpinnerLoader from '../../common/SpinnerLoader'
import SelectField from '../../common/selectField'
import ShipCard from '../shipCard/shipCard'
import './shipList.scss'

export default function ShipList() {
  const {
    error,
    data
  }: QueryResult<{ vehicles: IShip[] }, OperationVariables> =
    useQuery(GET_SHIPS)

  const [filteredShips, setfilteredShips]: [
    IShip[] | undefined,
    Dispatch<SetStateAction<IShip[] | undefined>>
  ] = useState()
  const [filter, setFilter] = useState({
    level: 'all',
    nation: 'all',
    type: 'all'
  })

  useEffect(() => {
    setfilteredShips(data?.vehicles)
  }, [data])

  const filterShips = useCallback(() => {
    let filteredArray = data?.vehicles
    if (filter.level !== 'all') {
      filteredArray = filteredArray?.filter(s => s.level === +filter.level)
    }
    if (filter.nation !== 'all') {
      filteredArray = filteredArray?.filter(
        s => s.nation.title === filter.nation
      )
    }
    if (filter.type !== 'all') {
      filteredArray = filteredArray?.filter(s => s.type.title === filter.type)
    }
    setfilteredShips(filteredArray)
  }, [data?.vehicles, filter])

  useEffect(() => {
    filterShips()
  }, [filterShips])

  if (error) {
    toast.error('Something was wrong. Try it later')
    return (
      <p>
        Тут можно сделать переадресацию на другую страницу или что-то вывести
      </p>
    )
  }
  if (!filteredShips) return <SpinnerLoader />

  const levels = Array.from(
    new Set(data!.vehicles.map(s => s.level).sort((a, b) => a - b))
  )
  const nations = Array.from(new Set(data!.vehicles.map(s => s.nation.title)))
  const types = Array.from(new Set(data!.vehicles.map(s => s.type.title)))

  const handleFilter = ({ name, value }: { name: string; value: string }) => {
    setFilter(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <div className='cards-group'>
      <form action='' className='mb-4'>
        <SelectField
          label='Уровень'
          defaultOption={'Все'}
          options={levels}
          onChange={handleFilter}
          name='level'
        />
        <SelectField
          label='Нация'
          defaultOption={'Все'}
          options={nations}
          onChange={handleFilter}
          name='nation'
        />
        <SelectField
          label='Класс'
          defaultOption={'Все'}
          options={types}
          onChange={handleFilter}
          name='type'
        />
      </form>
      {filteredShips.length ? (
        filteredShips.map(s => <ShipCard key={s.title} {...s} />)
      ) : (
        <p>Кораблей с данным фильтром не существует</p>
      )}
    </div>
  )
}
