import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { CirclePicker } from 'react-color'
import { addSubjectThunk } from '../../../thunks/subjectThunk'
import { IoMdClose } from 'react-icons/io'


const AddSubjectModalContent = ({ dispatch, closeAddModal }) => {
    const [subTitle, setSubTitle] = useState('')
    const [classCode, setClassCode] = useState('')
    const [professor, setProfessor] = useState('')
    const [credits, setCredits] = useState(3)
    const [description, setDescription] = useState('')
    const [color, setColor] = useState({ hex: '#bcbcbc' })

    const handleClose = () => {
        closeAddModal()
    }

    // const customStyles = {
    //     content: {
    //         top: '50%',
    //         left: '40%',
    //         right: 'auto',
    //         bottom: 'auto',
    //         transform: 'translate(-50%, -50%)',
    //         background: '#ffffff',
    //         padding: 'none',
    //         boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    //         minWidth: '500px'
    //     }
    // };

    const onSubmit = async (e) => {
        e.preventDefault()
        dispatch(addSubjectThunk({ subTitle, classCode, description, professor, credits, color }))
        closeAddModal()
        // clear all the input fields
        setProfessor('')
        setSubTitle('')
        setClassCode('')
        setDescription('')
        setCredits(3)
    }

    useEffect(() => {
        Modal.setAppElement('body');
    }, [])

    return (

        <div>
            <div className="modal-header" style={{
                backgroundColor: color.hex,
                cursor: 'pointer'
            }}><h3>Add Subject</h3>
                <IoMdClose onClick={handleClose} style={{ fontSize: '18px' }} />
            </div>
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
                                    if (e.target.value.length < 7) {
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
                            {false &&
                                <label className="inpLabel">Professor</label>
                            }

                            {false && <input
                                className="inp"
                                type="text"
                                value={professor}
                                onChange={(e) => setProfessor(e.target.value)}
                            ></input>}

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


    )
}

export default connect()(AddSubjectModalContent)