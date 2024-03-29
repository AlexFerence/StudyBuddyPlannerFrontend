import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp, FaEdit } from 'react-icons/fa'
import { connect } from 'react-redux'
//import SubjectButton from './SubjectButton'
import { AnimatedList } from 'react-animated-list';
import AddSemesterButton from './AddSemesterButton'
import EditSemesterButton from './EditSemesterButton'
import SubjectTile from './SubjectTile'
import moment from 'moment'

const SemesterDropdown = ({ semesters, sem, subjects, dispatch, handleSelectedSubject, handleOpenAddModal }) => {

    const findActiveSemester = () => {
        const currentDay = moment()
        const activeSemester = semesters.find((semester) => {
            const isAfterStartDate = currentDay.isAfter(semester.startDate)
            const isBeforeEndDate = currentDay.isBefore(semester.endDate)
            return isAfterStartDate && isBeforeEndDate
        })
        if (activeSemester) {
            return activeSemester
        }
        if (semesters[0]) {
            return semesters[0]
        }
    }

    const activeSemester = findActiveSemester()

    const [showSubjects, setShowSubjects] = useState(sem.id === activeSemester.id)
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
                style={{ backgroundColor: '#f9f9f9' }}
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
            >
                <div className="sem-dropdown__title" >
                    <div onClick={() => handleDropdownClick()}>{sem.title}</div>
                    {showEdit &&
                        <React.Fragment>
                            <EditSemesterButton sem={sem} />
                            {true && <AddSemesterButton />}
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
                <div className="listClasses">
                    {
                        subjects.length > 0 ?
                            <div>
                                {subjects.map((item, index) => {
                                    if (item.semesterId === sem.id)
                                        return (
                                            <div onClick={() => handleSelectedSubject(item.id)} key={index}>
                                                <SubjectTile subject={item} />
                                            </div>
                                        )
                                })}
                            </div>
                            :
                            <div
                                className='addButtonContainer'
                            >
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={handleOpenAddModal} className='no-outline' id='bigAddButton'>
                                        + Add Subject
                                    </button>
                                </div>
                            </div>
                    }
                </div>
            }
        </React.Fragment>

    )
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects,
        semesters: state.profile.semesters
    }
}

export default connect(mapStateToProps)(SemesterDropdown)