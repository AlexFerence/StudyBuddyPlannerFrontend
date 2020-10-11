import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { setSelectedSubject, setSelectedTaskType } from '../../../actions/premiumStatsActions'
import { loadDetailedView } from '../../../thunks/premiumStatsThunk'

const DetailedViewSelectRow = ({ subjectSelect, taskTypeSelect, completedTasks, subjects, dispatch }) => {

    const ttOptions = [
        { value: '', label: 'All' },
        { value: 'Assignment', label: 'Assignment' },
        { value: 'Readings', label: 'Readings' },
        { value: 'Essay', label: 'Essay' },
        { value: 'Lab', label: 'Lab' },
        { value: 'General Studying', label: 'General Studying' },
        { value: 'Lecture', label: 'Lecture' },
        { value: 'Quiz/Midterm/Exam', label: 'Quiz/Midterm/Exam' }
    ]

    const subjReduce = (list, item) => {
        list.push({ value: item, label: item.name + " " + item.classCode })
        return list
    }

    const subjectSelected = async (val) => {
        await dispatch(setSelectedSubject(val))
        dispatch(loadDetailedView())
    }

    const taskTypeSelected = async (val) => {
        await dispatch(setSelectedTaskType(val))
        dispatch(loadDetailedView())
    }

    const subjectOptions = [{ value: '', label: 'All' }, ...subjects.reduce(subjReduce, [])]

    return (
        <div className="detailed-view__select-row">
            <div>Filter by:</div>
            <div className="detailed-view__select-row__select">
                <Select
                    value={subjectSelect}
                    onChange={val => subjectSelected(val)}
                    placeholder="Class..."
                    options={subjectOptions}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            text: 'black',
                            primary25: '#bcbcbc',
                            primary50: '#bcbcbc',
                            primary: '#bcbcbc',
                        },
                    })}
                />
            </div>
            <div className="detailed-view__select-row__select">
                <Select
                    value={taskTypeSelect}
                    onChange={val => taskTypeSelected(val)}
                    options={ttOptions}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            text: 'black',
                            primary25: '#bcbcbc',
                            primary50: '#bcbcbc',
                            primary: '#bcbcbc',
                        },
                    })}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        completedTasks: state.premiumStats.completedTasks,
        subjects: state.subjects,
        subjectSelect: state.premiumStats.subjectSelect,
        taskTypeSelect: state.premiumStats.taskTypeSelect
    }
}
export default connect(mapStateToProps)(DetailedViewSelectRow)