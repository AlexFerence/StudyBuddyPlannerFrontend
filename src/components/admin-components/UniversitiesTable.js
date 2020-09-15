import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadSchools } from '../../thunks/schoolsThunk'

const UniversitiesTable = ({ schools = [], dispatch }) => {
    useEffect(() => {
        dispatch(loadSchools())
    }, [])

    var id = 0

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
                            id++
                            return (
                                <tr className="admin-uni-table__tr" key={id}>
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