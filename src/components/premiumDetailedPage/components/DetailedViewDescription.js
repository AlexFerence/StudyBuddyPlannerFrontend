import React from 'react'
import moment from 'moment'


const DetailedViewDescription = ({ selectedTask = { title: 'Select Completed Task Above', dueDate: '', description: '' } }) => {
    return (
        <div className="detailed-view__description">
            <div className="detailed-view__description__title">{selectedTask.title}</div>
            <div className="detailed-view__description__tidbit">
                <span className="detailed-view__description__tidbit__label">Type:</span>
                {' ' + selectedTask.taskType}
            </div>
            <div className="detailed-view__description__tidbit">
                <span className="detailed-view__description__tidbit__label">Due:</span>
                {' ' + moment(selectedTask.dueDate).format('MMM d, yyyy')}</div>
            <div className="detailed-view__description__tidbit">
                <span className="detailed-view__description__tidbit__label">Notes:</span>
                {' ' + selectedTask.description}
            </div>
        </div>
    )
}

export default DetailedViewDescription