import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadSchools } from '../../thunks/schoolsThunk'

const UniversitiesTable = ({ schools = [], dispatch }) => {
    useEffect(() => {
        dispatch(loadSchools())
    }, [])

    return (
        <table>
            <thead>
                <tr className="uni-table">
                    <th>Name</th>
                    <th>#</th>
                </tr>
            </thead>
            <tbody>
                {schools?.forEach((school) => {
                    if (school.numberOfStudents > 0) {
                        return (
                            <tr>
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