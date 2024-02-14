import React from 'react'

export default function ExchangeRate(props) {
    const { exchangeRate } = props
    return (
        <>
            {exchangeRate && <div>exchange rate is: {exchangeRate}</div>}
        </>
    )
}
