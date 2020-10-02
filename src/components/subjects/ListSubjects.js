import React from 'react'

const ListSubjects = () => {
    return (
        <div>

            <div className="classHeader">
                <div className="left">
                    <div className="title">Subjects</div>
                </div>
                <div className="right">
                    <button id="addButton" onClick={() => setOpenModal(true)}>+ Add Subject</button>
                </div>
            </div>
            <div className="listClasses">{subjects.map((item) => {
                return (<div
                    onClick={() => {
                        console.log(item.id)
                        setEditMode(false)
                        setClassSelection(item)
                        dispatch(loadSubjectBreakdown(item.id))
                    }} key={item.id}>
                    <SubjectButton
                        className="button"
                        item={item}
                        setClassSelection={setClassSelection}
                    /></div>
                )
            })}
            </div>
        </div>
    )
}

export default ListSubjects