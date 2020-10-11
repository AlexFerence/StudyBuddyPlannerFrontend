import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadAllUsers } from '../../thunks/adminStatsThunk'
import { IoMdCheckmark, IoMdClose } from 'react-icons/io'

const AdminUsersTable = ({ schools = [], dispatch }) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        setData()
    }, [])

    const setData = async () => {
        var data = await dispatch(loadAllUsers())
        console.log(data)
        setUsers(data)
    }

    var id = 100

    return (
        <table style={{ height: '600px' }} className="admin-uni-table">
            <thead>
                <tr className="uni-table">
                    <th>Name</th>
                    <th>School</th>
                    <th>Has Subjects</th>
                    <th>Has Tasks</th>
                    <th>Has Time</th>
                    <th>Has Friends</th>

                </tr>
            </thead>
            <tbody>
                {users.length > 0 &&
                    users.map((user) => {
                        id++
                        return (
                            <tr className="admin-uni-table__tr" key={id}>
                                <td>{user.name}</td>
                                <td>{user.school}</td>
                                <td>{user.hassubjects === 'yes'
                                    ? <IoMdCheckmark style={{ color: '#00ff00' }} />
                                    : <IoMdClose style={{ color: 'red' }} />
                                }</td>
                                <td>{user.hastasks === 'yes'
                                    ? <IoMdCheckmark style={{ color: '#00ff00' }} />
                                    : <IoMdClose style={{ color: 'red' }} />}</td>
                                <td>{user.hastime === 'yes'
                                    ? <IoMdCheckmark style={{ color: '#00ff00' }} />
                                    : <IoMdClose style={{ color: 'red' }} />}</td>
                                <td>{user.hasfriends === 'yes'
                                    ? <IoMdCheckmark style={{ color: '#00ff00' }} />
                                    : <IoMdClose style={{ color: 'red' }} />}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}


const mapStateToProps = (state) => {
    return {
        schools: state.schools,
    }
}



export default connect(mapStateToProps)(AdminUsersTable)