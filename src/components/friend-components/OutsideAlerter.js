import React, { useRef, useEffect } from "react";
import { connect } from 'react-redux'
import { closeFriendModal } from '../../actions/friendActions'

/**
 * Hook that alerts clicks outside of the passed ref
 */


/**
 * Component that alerts if you click outside of it
 */
const OutsideAlerter = ({ children, dispatch }) => {
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    //action when clicked outside
                    dispatch(closeFriendModal())
                    //alert("You clicked outside of me!");
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return <div ref={wrapperRef}>{children}</div>;
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.friends.friendModalOpen,
        selectedFriend: state.friends.selectedFriend,
        selectedFriendFriends: state.friends.selectedFriendFriends,
        selectedFriendSubjects: state.friends.selectedFriendSubjects
    }
}

export default connect(mapStateToProps)(OutsideAlerter)