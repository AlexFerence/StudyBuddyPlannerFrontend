import React from 'react'
import { connect } from 'react-redux'

const ListReferredUsers = ({ referredUsers }) => {
    return (
        <div>
            {referredUsers.map((user) => (
                <div>
                    <div>
                        {user.firstName + '' + user.lastName}
                    </div>
                    <div>
                        {user.school}
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        referredUsers: state.settings.referredUsers
    }
}

export default connect(mapStateToProps)(ListReferredUsers)