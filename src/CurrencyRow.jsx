import React from 'react'

export default function CurrencyRow(props) {
  const {
    currentyOptions,
    currencyValue,
    currencyType,
    numberOnChange,
    currencyOnChange
  } = props

  return (
    <div>
      <input type='number' className='input' value={currencyValue} onChange={numberOnChange}></input>
      <select onChange={currencyOnChange} value={currencyType}>
        {currentyOptions.map((c, index) => ( 
          <option key={crypto.randomUUID()} value={c.name}>
            {index + 1}:   {c.name}{c.desc}
          </option>))}
      </select>
    </div>
  )
}
