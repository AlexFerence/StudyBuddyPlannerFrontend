import React from 'react'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const FriendModal = () => {
    return (
        <Modal
            isOpen={true}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            { /* <button onClick={closeModal}>close</button> */}
            <div>
                <div>Selected Friend</div>
                <div>
                    <div>Classes</div>
                    <div>Friends</div>

                </div>
            </div>
        </Modal>
    )
}

export default FriendModal