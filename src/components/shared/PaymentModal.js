import React from 'react'
import ModalContent from '../shared/ModalContent'
import { useDispatch } from 'react-redux'
import { closePayment } from '../../actions/profileActions'
import Payment from '../payment/PaymentModal'
import { IoMdClose } from 'react-icons/io'

const PaymentModal = () => {

    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(closePayment())
    }

    return (
        <div style={{ zIndex: '101' }}>
            <div
                style={{
                    display: 'flex', justifyContent: 'flex-end',
                    minWidth: '400px'
                }}
            >
                <IoMdClose onClick={closeModal}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            <Payment />
        </div>
    )
}

export default PaymentModal