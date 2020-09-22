import React from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const FriendModalFriendListItem = ({ subject }) => {



    return (
        <Tippy content={<div>{subject.description}</div>}
            placement="left"
            allowHTML={true}
            animateFill={false}

        >
            <div className="friend-modal-subject-list-item__class-name">
                <div style={{ backgroundColor: subject.color }} className="friend-modal-subject-list-item__circle"></div> {subject.name} {subject.classCode}
            </div>
        </Tippy>

    )
}

export default FriendModalFriendListItem