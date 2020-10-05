import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { IoMdAdd } from 'react-icons/io'
import Modal from 'react-modal'
import modalStyles from '../../shared/ModalStyles'
import modalStylesCompressed from '../../shared/ModalStylesCompressed'
import AddSemesterModalContent from '../Modals/AddSemesterModalContent'

const AddSemesterButton = ({ width }) => {

    const [addSemesterModal, setAddSemesterModal] = useState(false)

    const closeAddSemesterModal = () => setAddSemesterModal(false)
    const openAddSemesterModal = () => setAddSemesterModal(true)

    useEffect(() => {
        Modal.setAppElement('body')
    }, [])

    const handleAddSemester = (e) => {
        //e.stopPropagation()
        openAddSemesterModal()
        console.log('add semester')
    }

    const renderAddTooltip = (props, display) => {
        return (
            <Tooltip id="button-tooltip" {...props}>
                Add New Semester
            </Tooltip>
        );
    }
    return (
        <React.Fragment>
            <Modal
                isOpen={addSemesterModal}
                onRequestClose={closeAddSemesterModal}
                style={width > 999 ? modalStyles : modalStylesCompressed}
                contentLabel="Add User Modal"
            >
                <AddSemesterModalContent closeModal={closeAddSemesterModal} />
            </Modal>
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderAddTooltip}
            >
                <IoMdAdd
                    onClick={handleAddSemester}
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

export default connect(mapStateToProps)(AddSemesterButton)