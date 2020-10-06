import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Modal from 'react-modal'
import modalStyles from '../../shared/ModalStyles'
import modalStylesCompressed from '../../shared/ModalStylesCompressed'
import { connect } from 'react-redux'
import EditSemesterModalContent from '../Modals/EditSemesterModalContent'

const EditSemesterButton = ({ width, sem }) => {

    const [editSemesterModal, setEditSemesterModal] = useState(false)

    const closeEditSemesterModal = () => setEditSemesterModal(false)
    const openEditSemesterModal = () => setEditSemesterModal(true)

    useEffect(() => {
        Modal.setAppElement('body')
    }, [])

    const handleEditSemester = (e) => {
        e.stopPropagation()
        openEditSemesterModal()
    }

    const renderEditTooltip = (props, display) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                Edit Semester
            </Tooltip>
        );
    }

    return (
        <React.Fragment>
            <Modal
                isOpen={editSemesterModal}
                onRequestClose={closeEditSemesterModal}
                style={width > 999 ? modalStyles : modalStylesCompressed}
                contentLabel="Add User Modal"
            >
                <EditSemesterModalContent sem={sem} closeModal={closeEditSemesterModal} />
            </Modal>
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
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        width: state.width
    }
}

export default connect(mapStateToProps)(EditSemesterButton)