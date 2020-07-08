import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'
import SubjectButton from './SubjectButton'

const list = ['button1', 'button2', 'button3']

const SubjectsPage = (props) => {

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

    return (
        <div className="subjects">
            <div className="scroller">
                <div className="classHeader">
                    <div className="left">
                        <div className="title">Subjects</div>
                    </div>
                    <div className="right">
                        <button>+ Add Subject</button>
                    </div>
                </div>
                <div className="listClasses">{classes.map((item) => {
                    return (<div onClick={() => setClassSelection(item)} key={item.id}>
                        <SubjectButton
                            className="button"
                            item={item}
                            setClassSelection={setClassSelection}
                        /> </div>
                    )
                })}</div>
               

            </div>
            <div className="display">
                {!classSelection.name && <p>Please select a class</p>}
                {classSelection.name && <h3>{classSelection.name} {classSelection.classCode}</h3>}
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