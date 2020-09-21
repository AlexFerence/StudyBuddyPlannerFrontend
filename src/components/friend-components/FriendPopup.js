import React, { useEffect } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux'
import { closeFriendModal } from '../../actions/friendActions'
import { IoMdClose } from 'react-icons/io'
import FriendModalSubjectListItem from './FriendModalSubjectListItem'
import FriendModalFriendListItem from './FriendModalFriendListItem'
import FriendSubjBreakdownChart from './FriendSubjBreakdownChart'
import { removeFriend } from '../../thunks/friendThunk'
import Spinner from '../shared/Spinner'


const FriendPopup = ({ dispatch, isOpen, selectedFriend, selectedFriendFriends,
    selectedFriendSubjects, spinning }) => {


    const handleRemoveFriend = async () => {
        dispatch(removeFriend())
    }

    const closeModal = () => {
        dispatch(closeFriendModal())
    }

    var idCount = 0;

    return (
        <div style={{ zIndex: 500 }}>
            <div className="friend-modal">
                <div className="friend-modal__header">
                    <div>{selectedFriend.firstName + ' ' + selectedFriend.lastName}</div>
                    <button className="icon" onClick={closeModal}><IoMdClose /></button>
                </div>
                <div className="friend-modal__body">
                    <div className="friend-modal__body__col__freinds">

                        <div className="friend-modal__body__col__list-title">Classes</div>
                        {
                            spinning ? <Spinner /> :
                                selectedFriendSubjects.length > 0 &&
                                selectedFriendSubjects.map((subject) => {
                                    idCount = idCount + 1
                                    return <FriendModalSubjectListItem key={idCount} subject={subject} />
                                })
                        }
                        {
                            spinning ? <div /> : <FriendSubjBreakdownChart />
                        }
                        {true && <button className="friend-modal__body__col__remove-friend" onClick={handleRemoveFriend}>Unfriend</button>}
                    </div>
                    <div className="friend-modal__body__col">
                        <div className="friend-modal__body__col__list-title">Friends</div>
                        <div className="friend-modal__body__col__list">
                            {
                                spinning ? <Spinner /> :
                                    selectedFriendFriends.length > 0 &&
                                    selectedFriendFriends.map((friend) => {
                                        idCount = idCount + 1
                                        return <FriendModalFriendListItem key={idCount} friend={friend} />
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.friends.friendModalOpen,
        selectedFriend: state.friends.selectedFriend,
        selectedFriendFriends: state.friends.selectedFriendFriends,
        selectedFriendSubjects: state.friends.selectedFriendSubjects,
        spinning: state.friends.friendPopupIsLoading
    }
}

export default connect(mapStateToProps)(FriendPopup)