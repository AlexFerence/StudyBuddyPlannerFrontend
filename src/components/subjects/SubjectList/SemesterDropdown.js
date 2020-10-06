import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp, FaEdit } from 'react-icons/fa'
import { connect } from 'react-redux'
import SubjectButton from './SubjectButton'


import AddSemesterButton from './AddSemesterButton'
import EditSemesterButton from './EditSemesterButton'

const SemesterDropdown = ({ sem, subjects, dispatch, handleSelectedSubject }) => {
    const [showSubjects, setShowSubjects] = useState(true)
    const [showEdit, setShowEdit] = useState(false)

    const handleMouseEnter = () => {
        setShowEdit(true)
    }
    const handleMouseLeave = () => {
        setShowEdit(false)
    }

    const handleDropdownClick = () => {
        setShowSubjects(!showSubjects)
    }

    return (
        <React.Fragment>
            <div className="sem-dropdown"
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
            >
                <div className="sem-dropdown__title" >
                    <div onClick={() => handleDropdownClick()}> {sem.title}</div>
                    {showEdit &&
                        <React.Fragment>
                            <EditSemesterButton sem={sem} />
                            <AddSemesterButton />
                        </React.Fragment>
                    }
                </div>
                <div
                    className="sem-dropdown__angle"
                    onClick={() => handleDropdownClick()}>
                    {showSubjects ? <FaAngleDown /> : <FaAngleUp />}
                </div>
            </div>
            {
                showSubjects &&
                <div className="listClasses">{subjects.map((item) => {
                    if (item.semesterId === sem.id)
                        return (
                            <div onClick={() => handleSelectedSubject(item.id)} key={item.id}>
                                <SubjectButton item={item} />
                            </div>
                        )
                })}
                </div>

            }

        </React.Fragment>

    )
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects
    }
}

export default connect(mapStateToProps)(SemesterDropdown)