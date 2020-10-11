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

    const minsToHours = (m) => {
        const hours = Math.floor(m / 60)
        const mins = Math.floor(m % 60)
        if (hours >= 1) {
            return (hours + 'hrs., ' + mins + 'min.')
        }
        else {
            return (mins + 'min.')
        }
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
                    <th>Logged Mins</th>

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
                                <td>{user.hasSubjects === 'Yes'
                                    ? <IoMdCheckmark style={{ color: '#4ADA33' }} />
                                    : <IoMdClose style={{ color: 'red' }} />}
                                </td>
                                <td>{user.hasTasks === 'Yes'
                                    ? <IoMdCheckmark style={{ color: '#4ADA33' }} />
                                    : <IoMdClose style={{ color: 'red' }} />}
                                </td>
                                <td>{user.hasTime === 'Yes'
                                    ? <IoMdCheckmark style={{ color: '#4ADA33' }} />
                                    : <IoMdClose style={{ color: 'red' }} />}
                                </td>
                                <td>{user.hasFriends === 'Yes'
                                    ? <IoMdCheckmark style={{ color: '#4ADA33' }} />
                                    : <IoMdClose style={{ color: 'red' }} />}
                                </td>
                                <td style={{ minWidth: '120px' }}>{minsToHours(user.totalLoggedMinutes)}</td>
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