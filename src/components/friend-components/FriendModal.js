import React, { useEffect } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux'
import { closeFriendModal } from '../../actions/friendActions'
import { IoMdClose } from 'react-icons/io'
import FriendModalSubjectListItem from './FriendModalSubjectListItem'
import FriendModalFriendListItem from './FriendModalFriendListItem'

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

const FriendModal = ({ dispatch, isOpen, selectedFriend, selectedFriendFriends,
    selectedFriendSubjects }) => {

    const closeModal = () => {
        dispatch(closeFriendModal())
    }

    var idCount = 0;

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            contentLabel="Example Modal"
            onRequestClose={closeModal}
        >
            <div className="friend-modal">
                <div className="friend-modal__header">
                    <div>{selectedFriend.firstName} {selectedFriend.lastName}</div>
                    <button className="icon" onClick={closeModal}><IoMdClose /></button>
                </div>
                <div className="friend-modal__body">
                    <div className="friend-modal__body__col">
                        <div className="friend-modal__body__col__list-title">Classes</div>
                        {
                            selectedFriendSubjects.length > 0 &&
                            selectedFriendSubjects.map((subject) => {
                                idCount = idCount + 1
                                return <FriendModalSubjectListItem key={idCount} subject={subject} />

                            })
                        }

                    </div>
                    <div className="friend-modal__body__col">
                        <div className="friend-modal__body__col__list-title">Friends</div>
                        {selectedFriendFriends.length > 0 &&
                            selectedFriendFriends.map((friend) => {
                                idCount = idCount + 1
                                return <FriendModalFriendListItem key={idCount} friend={friend} />
                            })
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.friends.friendModalOpen,
        selectedFriend: state.friends.selectedFriend,
        selectedFriendFriends: state.friends.selectedFriendFriends,
        selectedFriendSubjects: state.friends.selectedFriendSubjects
    }
}

export default connect(mapStateToProps)(FriendModal)