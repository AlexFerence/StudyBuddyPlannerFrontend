import React from 'react'

const SubjectButton = ({ item }) => {
    return (
        <div className="subjectButton">
            <div className="subjTitle">{item.name} {item.classCode}</div>
            <div className="subjDesc">{item.description}</div>
        </div>
    )
}

export default SubjectButton