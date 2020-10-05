import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { IoMdAdd, IoMdCreate } from 'react-icons/io'

const EditSemesterButton = () => {
    const handleEditSemester = (e) => {
        e.stopPropagation()
    }

    const renderEditTooltip = (props, display) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                Edit Semester
            </Tooltip>
        );
    }

    return (
        <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderEditTooltip}
        >
            <FaEdit
                onClick={handleEditSemester}
                className="sem-dropdown__title__icon"
            />
        </OverlayTrigger>
    )
}

export default EditSemesterButton