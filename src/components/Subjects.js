import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import SubjectButton from './SubjectButton'
import Modal from 'react-modal';

import { FaTrash } from 'react-icons/fa'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const SubjectsPage = (props) => {
    var [openModal, setOpenModal] = useState(false)
    var [classes, setClasses] = useState([])
    var [classSelection, setClassSelection] = useState({})

    useEffect(() => {
        const getClasses = async () => {
            try {
                const res = await axios.post(url + '/api/subjects/list',
                    {
                        UserId: props.id
                    }, {
                    headers: {
                        'Authorization': 'bearer ' + props.token,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                const list = res.data
                console.log(list)
                setClasses(list)

                if (res.status === 401) {
                    console.log('didnt work')
                    props.history.push("/login")
                }
            }
            catch (e) {
                console.log(e)

            }

        }
        getClasses()
        console.log(props.id)

    }, [])

    const deleteSubject = async (id) => {
        try {
            const res = await axios.delete(url + '/api/subjects/' + id,
                {
                headers: {
                    'Authorization': 'bearer ' + props.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            if (res.data === true) {
                setClasses(classes.filter((c) => c.id !== id))
                setClassSelection({})
            }
            console.log(res)
            console.log(res.data)
        } catch (e) {

        }
    }

    function openModal() {
        setOpenModal(true);
      }
     
      function afterOpenModal() {
        // references are now sync'd and can be accessed.

      }
     
      function closeModal(){
        setOpenModal(false);
      }

    return (
        <div className="subjects">  
            <Modal
                isOpen={openModal}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >Hello</Modal>



            <div className="scroller">
                <div className="classHeader">
                    <div className="left">
                        <div className="title">Subjects</div>
                    </div>
                    <div className="right">
                        <button onClick={() => setOpenModal(true)}>+ Add Subject</button>
                    </div>
                </div>
                <div className="listClasses">{classes.map((item) => {
                    return (<div onClick={() => setClassSelection(item)} key={item.id}>
                        <SubjectButton
                            className="button"
                            item={item}
                            setClassSelection={setClassSelection}
                        /></div>
                    )
                })}</div>

            </div>
            <div className="display">
                {!classSelection.name && <p>Please select a class</p>}
                <div className="innerDisplay">
                    {classSelection.name && 
                        <div className="topBar">
                            <h4>{classSelection.name} {classSelection.classCode}</h4>
                            <button 
                            className="icon"
                            onClick={() => {
                                deleteSubject(classSelection.id)
                                //input function to delete the subject
                            }}
                            >Delete</button>
                        </div>
                    }
                    {classSelection.professor && 
                        <div className="mainSection">
                            Professor: <span>{classSelection.professor}</span> <br/>
                            Credits: <span>{classSelection.credits}</span> <br/>
                            TimeSlot: MWF 2:00 - 3:00<br/>
                            Average Mark: B+
                        </div>}
                </div>
            </div>
        </div>
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

export default connect(mapStateToProps)(SubjectsPage)