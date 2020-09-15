import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadSchools, loadAdminStats } from '../../thunks/schoolsThunk'

const UniversitiesTable = ({ schools = [], dispatch }) => {
    useEffect(() => {
        dispatch(loadSchools())
        console.log('loading admin stats')
        dispatch(loadAdminStats())
    }, [])

    return (
        <table className="admin-uni-table">
            <thead>
                <tr className="uni-table">
                    <th>Name</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
                {schools &&
                    schools?.map((school) => {
                        if (school.numberOfStudents > 0) {

                            return (
                                <tr key={school.id}>
                                    <td>{school.label}</td>
                                    <td>{school.numberOfStudents}</td>
                                </tr>
                            )
                        }
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



export default connect(mapStateToProps)(UniversitiesTable)