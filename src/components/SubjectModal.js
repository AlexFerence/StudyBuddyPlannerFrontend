import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import axios from 'axios';
import url from '../environment/url'
import { Row, Col } from 'react-bootstrap'
import { addSubject } from '../actions/subjectActions'
import { connect } from 'react-redux'
import { BlockPicker, CirclePicker } from 'react-color'

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
        padding: 'none',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        minWidth: '500px'
    }
};

const SubjectModal = (props) => {
    const [subTitle, setSubTitle] = useState('')
    const [classCode, setClassCode] = useState('')
    const [professor, setProfessor] = useState('')
    const [credits, setCredits] = useState(3)
    const [description, setDescription] = useState('')

    const [color, setColor] = useState('#607d8b')

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(url + '/api/subjects/create',
                {
                    "Name": subTitle.toUpperCase().trim(),
                    "ClassCode": classCode,
                    "Description": description.trim(),
                    "Professor": professor.trim(),
                    "Credits": credits,
                    "UserId": props.id,
                    "color": color.hex
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

    useEffect(() => {
        console.log(color)
    }, [color])

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div>
                <div className="modal-header" style={{ backgroundColor: color.hex}}><h3>Add Subject</h3></div>
                <div className="modal-main">
                    <form onSubmit={onSubmit}>
                        <div>
                            <label className="inpLabel">Subject Title (eg. BIOL, MATH, PHYS)</label>
                            <input
                                className="inp"
                                required
                                type="text"
                                value={subTitle}
                                onChange={(e) => {
                                    if (e.target.value.length < 5) {
                                        setSubTitle(e.target.value)
                                    }
                                }}
                            ></input>
                        </div>
                        <Row>
                            <Col>
                            <label className="inpLabel">Class Code (ex: 202, 141)</label>
                            <input
                                className="inp"
                                required
                                type="text"
                                value={classCode}
                                onChange={(e) => {
                                    if (!isNaN(e.target.value) && e.target.value < 9999) {
                                        setClassCode(e.target.value)
                                    }
                                }}
                            ></input>
                            <label className="inpLabel">Credits</label>
                                <input
                                    required
                                    className="inp"
                                    type="text"
                                    value={credits}
                                    onChange={(e) => {
                                        if (!isNaN(e.target.value) && e.target.value < 10) {
                                            setCredits(e.target.value)
                                        }
                                    }
                                    }
                                ></input>
                                <label className="inpLabel">Professor</label>
                                <input
                                    className="inp"
                                    type="text"
                                    value={professor}
                                    onChange={(e) => setProfessor(e.target.value)}
                                ></input>
                            </Col>
                            <Col className="circle">
                            <CirclePicker
                            width="210px"
                            height="30px"
                            color={color}
                            onChangeComplete={(c) => setColor(c)}
                            circleSpacing={14}
                            />
                            </Col>
                        </Row>
                            
                        <div>
                            <label className="inpLabel">Description</label>
                            <textarea className="inpArea"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <button className="but">Submit</button>
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