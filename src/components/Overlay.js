import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openPayment } from '../actions/profileActions'

const Overlay = ({ special }) => {

    const dispatch = useDispatch()

    const openPremiumPayment = () => {
        console.log('hello')
        dispatch(openPayment())
    }

    return (
        <div className={special ? "overlay overlay-special" : "overlay"}
            style={{ zIndex: '0' }}
        >
            <div style={{ zIndex: '2' }}>
                <div style={{ zIndex: '2' }} className="overlay__main">Premium Feature</div>
                <span
                    onClick={openPremiumPayment}
                    style={{ cursor: 'pointer' }}
                    className="overlay__main__link overlay__sub">Unlock now</span>
            </div>
        </div>
    )
}

export default Overlay