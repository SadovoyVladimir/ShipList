import React from 'react'

interface ISelect {
  label: string
  defaultOption?: string
  options: string[] | number[]
  name: string
  value?: string
  onChange: Function
}

export default function SelectField({
  label,
  defaultOption,
  options,
  name,
  value,
  onChange
}: ISelect) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ name: target.name, value: target.value })
  }

  return (
    <div className='mb-2'>
      <label htmlFor={name} className='form-label mb-0'>
        {label}
      </label>
      <select
        className='form-select'
        id={name}
        name={name}
        onChange={handleChange}
        value={value}
      >
        {defaultOption && <option value='all'>{defaultOption}</option>}
        {options.length > 0 &&
          options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  )
}
