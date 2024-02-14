import { useState, useEffect, useRef } from 'react'
import './App.css'
import CurrencyRow from './CurrencyRow'
import axios from 'axios'
import Warning from './Warning'
import ExchangeRate from './ExchangeRate'
import CopyRight from './CopyRight'

function App() {
  const [currentyOptions, setCurrentyOptions] = useState([])
  const [warning, setWarning] = useState(false)
  const [exchangeInfo, setExchangeInfo] = useState({upperNumber:0, lowerNumber:0, upperCurrency:'CNY', lowerCurrency:'CHF'})
  const [exchangeRate, setExchangeRate] = useState(null)
  const [changeFromUpper, setChangeFromUpper] = useState()

  const APP_ID = 'ombkzkkbsfbnnlvh'
  const APPSECRET = '9ljMASUYLikDhx0OnohIw19P3jjfZIaK'

  const GET_CURRENCY_LIST_BASE = 'https://www.mxnzp.com/api/exchange_rate/configs?'
  const GET_CURRENCY_LIST_URL = GET_CURRENCY_LIST_BASE + 'app_id=' + APP_ID + '&app_secret=' + APPSECRET

  const QUERRY_BASE = 'https://www.mxnzp.com/api/exchange_rate/aim?'

  document.title = 'currency_converter'

  useEffect(() => {
    axios({
      method: 'GET',
      url: GET_CURRENCY_LIST_URL
    }).then(res => {
      setCurrentyOptions(res.data.data)
    })
  }, [])

  function upperNumberChange(e) {
    setExchangeInfo(prev => ({...prev, upperNumber:e.target.value}))
    setChangeFromUpper(true)
  }
  function upperCurrencyChange(e) {
    setExchangeInfo(prev => ({...prev, upperCurrency:e.target.value}))
    setChangeFromUpper(true)
  }
  function lowerNumberChange(e) {
    setExchangeInfo(prev => ({...prev, lowerNumber:e.target.value}))
    setChangeFromUpper(false)
  }
  function lowerCurrencyChange(e) {
    setExchangeInfo(prev => ({...prev, lowerCurrency:e.target.value}))
    setChangeFromUpper(false)
  }

  function convert(){
    if (exchangeInfo.upperCurrency === exchangeInfo.lowerCurrency) {
      setWarning(true)
      return
    } else {
      setWarning(false)
    }
    axios({
      method: 'GET',
      url: QUERRY_BASE + 'from=' + exchangeInfo.lowerCurrency + '&to=' + exchangeInfo.upperCurrency + '&app_id=' + APP_ID + '&app_secret=' + APPSECRET
    }).then(res => {
      setExchangeRate(res.data.data.price)
      if (changeFromUpper) {
        setExchangeInfo(prev => ({...prev, lowerNumber:exchangeInfo.upperNumber / res.data.data.price}))
      } else {
        setExchangeInfo(prev => ({...prev, upperNumber:exchangeInfo.lowerNumber * res.data.data.price}))
      }
    })
  }

  return (
    <>
      <h1>Currency Converter</h1>

      <CurrencyRow
        key='currencyRow1'
        currentyOptions={currentyOptions}
        currencyValue={exchangeInfo.upperNumber}
        currencyType={exchangeInfo.upperCurrency}
        numberOnChange={upperNumberChange}
        currencyOnChange={upperCurrencyChange}>
      </CurrencyRow>

      <div className='equal'>=</div>

      <CurrencyRow
        key='currencyRow2'
        currentyOptions={currentyOptions}
        currencyValue={exchangeInfo.lowerNumber}
        currencyType={exchangeInfo.lowerCurrency}
        numberOnChange={lowerNumberChange}
        currencyOnChange={lowerCurrencyChange}>
      </CurrencyRow>

      <ExchangeRate className='exchangeRate' exchangeRate={exchangeRate}></ExchangeRate>      

      <button onClick={convert}>Convert</button>

      <Warning warning={warning}></Warning>

      <CopyRight></CopyRight>
    </>
  )
}

export default App
