import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { loadAllUsers } from '../../thunks/adminStatsThunk'

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
                </tr>
            </thead>
            <tbody>
                {users.length > 0 &&
                    users.map((user) => {
                        id++
                        return (
                            <tr className="admin-uni-table__tr" key={id}>
                                <td>{user.name1}</td>
                                <td>{user.name2}</td>
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