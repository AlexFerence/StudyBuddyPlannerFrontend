import React from 'react'
import { connect } from 'react-redux'

const TaskList = ({ tasks, subjects, setOpenModal}) => {

    const getClassName = (subjectId) => {
        const subj = subjects.find((subject) => subject.id === subjectId)
        if (subj) {
            return(subj.name + " " + subj.classCode)
        }
        else {
            return("no class found")
        }
    }

    return (
        <div className="task-list">
            <div className="classHeader">
                    <div className="left">
                        <div className="title">Tasks</div>
                    </div>
                    <div className="right">
                        <button onClick={setOpenModal}>+ Add Task</button>
                    </div>
                </div>
            {
                tasks.map((t) => {
                    return (
                        <div className="task-button" key={t.id}>
                            <div className="top-bar">
                                <div className="subjTitle">{t.description}</div>
                                <div className="due">Jan 2</div>
                            </div>
                            <div className="bottom-bar">
                                <div className="subjDesc">{getClassName(t.subjectId)}</div>
                                <div className="due">10%</div>
                            </div>
                        </div>
                    )

                })

            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        subjects: state.subjects
    }
}

export default connect(mapStateToProps)(TaskList)