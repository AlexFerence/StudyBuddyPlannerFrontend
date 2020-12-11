import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp, FaEdit } from 'react-icons/fa'
import { connect } from 'react-redux'
//import SubjectButton from './SubjectButton'
import { AnimatedList } from 'react-animated-list';
import AddSemesterButton from './AddSemesterButton'
import EditSemesterButton from './EditSemesterButton'
import SubjectTile from './SubjectTile'

const SemesterDropdown = ({ sem, subjects, dispatch, handleSelectedSubject, handleOpenAddModal }) => {
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
                style={{ backgroundColor: '#f9f9f9' }}
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
            >
                <div className="sem-dropdown__title" >
                    <div onClick={() => handleDropdownClick()}> {sem.title}</div>
                    {showEdit &&
                        <React.Fragment>
                            <EditSemesterButton sem={sem} />
                            {false && <AddSemesterButton />}
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
        subjects: state.subjects
    }
}

export default connect(mapStateToProps)(SemesterDropdown)