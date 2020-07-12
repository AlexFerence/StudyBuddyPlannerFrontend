import React, {useEffect} from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight           : '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#ffffff',
        margin: 'none',
        padding: 'none'
    }
};

const TaskModal = (props) => {

    useEffect(() => {
        Modal.setAppElement('body');
    }, [])
    
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Example Modal">
            Hello

        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        token: state.profile.token,
        id: state.profile.id,
        subjects: state.subjects
    }
}

export default connect(mapStateToProps)(TaskModal)