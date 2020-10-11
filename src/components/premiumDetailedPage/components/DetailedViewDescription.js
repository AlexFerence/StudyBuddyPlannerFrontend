import React from 'react'
import moment from 'moment'
import { IoMdTime } from 'react-icons/io'

const DetailedViewDescription = ({ selectedTask = { title: 'Select Completed Task Above', dueDate: '', description: '' } }) => {
    const minsToHours = (m) => {
        const hours = Math.floor(m / 60)
        const mins = Math.floor(m % 60)
        if (hours >= 1) {
            return (hours + 'hrs., ' + mins + 'min.')
        }
        else {
            return (mins + 'min.')
        }
    }

    return (
        <div className="detailed-view__description">
            <div className="detailed-view__description__title">{selectedTask.title}</div>
            <div className="detailed-view__description__tidbit">
                <span className="detailed-view__description__tidbit__label">Class:</span>
                {' ' + selectedTask.subject}
            </div>
            <div className="detailed-view__description__tidbit">
                <span className="detailed-view__description__tidbit__label">Type:</span>
                {' ' + selectedTask.taskType}
            </div>
            <div className="detailed-view__description__tidbit">
                <span className="detailed-view__description__tidbit__label">Due:</span>
                {' ' + moment(selectedTask.dueDate).format('MMM d, yyyy')}
            </div>
            <div className="detailed-view__description__tidbit">
                <span className="detailed-view__description__tidbit__label">Total:</span>
                {' ' + minsToHours(selectedTask.totalMinutes)}
            </div>
        </div>
    )
}

export default DetailedViewDescription