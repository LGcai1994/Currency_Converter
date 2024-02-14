import React from 'react'

export default function Warning(props) {
    const { warning } = props

    return (
        <>
            {warning &&
                <div className='warning'>
                    Warning: Same Currency
                </div>}
        </>
    )
}
