import React, { useEffect } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux'
import { closeFriendModal } from '../../actions/friendActions'
import { getFriendsActiveFriends, getFriendSubjects } from '../../thunks/friendThunk'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 'none',
    },
    overlay: { zIndex: 1031 }
};

const FriendModal = ({ dispatch, isOpen, selectedFriend }) => {

    const closeModal = () => {
        dispatch(closeFriendModal())
    }

    useEffect(() => {
        dispatch(getFriendsActiveFriends())
        dispatch(getFriendSubjects())
    }, [])

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            contentLabel="Example Modal"
            onRequestClose={closeModal}
        >
            { /* <button onClick={closeModal}>close</button> */}
            <div className="friend-modal">
                <div>{selectedFriend.firstName} {selectedFriend.lastName}</div>
                <div >
                    <div>Classes</div>
                    <div>Friends</div>
                    <button onClick={closeModal}>close</button>
                </div>
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.friends.friendModalOpen,
        selectedFriend: state.friends.selectedFriend
    }
}

export default connect(mapStateToProps)(FriendModal)