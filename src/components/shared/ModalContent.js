import React from 'react'
import { IoMdClose } from 'react-icons/io'

const ModalContent = ({ title, closeModal, children }) => {
    return (
        <div>
            <div className="modal__header">
                <div>{title}</div>
                <button className="close-button" onClick={closeModal}><IoMdClose /></button>
            </div>
            {children}
        </div>
    )
}

export default ModalContent