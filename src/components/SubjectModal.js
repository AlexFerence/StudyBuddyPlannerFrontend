import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import axios from 'axios';
import url from '../environment/url'
import { addSubject } from '../actions/subjectActions'
import { connect } from 'react-redux'

const customStyles = {
    content: {
        top: '35%',
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

const SubjectModal = (props,) => {

    const [subTitle, setSubTitle] = useState('')
    const [classCode, setClassCode] = useState('')
    const [professor, setProfessor] = useState('')
    const [credits, setCredits] = useState(3)
    const [description, setDescription] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(url + '/api/subjects/create',
                {
                    "Name": subTitle.toUpperCase().trim(),
                    "ClassCode": classCode,
                    "Description": description.trim(),
                    "Professor": professor.trim(),
                    "Credits": 3,
                    "UserId": props.id
                },
                {
                    headers: {
                        'Authorization': 'bearer ' + props.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (res.status === 200) {
                props.dispatch(addSubject(res.data))
                props.closeModal()
                setSubTitle('')
                setClassCode('')
                setDescription('')
                setCredits(3)
            }

        } catch (e) {
            console.log(e)
        }
        // call api
        // update redux
        // close modal
    }

    useEffect(() => {
        Modal.setAppElement('body');
    }, [])

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div>
                <div className="modal-header"><h3>Add Subject</h3></div>
                <div className="modal-main">
                <form onSubmit={onSubmit}>
                <div className="inp">
                    <label>Subject Title (eg. BIOL, MATH, PHYS)</label>
                    <input
                        required
                        type="text"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                    ></input>
                </div>
                <div className="inp">
                    <label>Course Code (eg. 202, 141, 101)</label>
                    <input
                        required
                        type="text"
                        value={classCode}
                        onChange={(e) => {
                            if (!isNaN(e.target.value) && e.target.value < 999999) {
                                setClassCode(e.target.value)
                            }
                        }
                        }
                    ></input>
                </div>
                <div className="inp">
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>
                <div className="inp">
                    <label>Credits</label>
                    <input
                        type="text"
                        value={credits}
                        onChange={(e) => {
                            if (!isNaN(e.target.value) && e.target.value < 10) {
                                setCredits(e.target.value)
                            }
                        }
                        }
                    ></input>
                </div>
                <div className="inp">
                    <label>Professor</label>
                    <input
                        type="text"
                        value={professor}
                        onChange={(e) => setProfessor(e.target.value)}
                    ></input>
                </div>
                <button>Submit</button>
            </form>
                
                </div>
                
            </div>
        </Modal>

    )
}

const mapStateToProps = (state) => {
    return {
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        email: state.profile.email,
        password: state.profile.password,
        token: state.profile.token,
        id: state.profile.id,
    }
}

export default connect(mapStateToProps)(SubjectModal)