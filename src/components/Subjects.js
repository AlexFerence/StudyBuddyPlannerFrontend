import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import url from '../environment/url'


const SubjectsPage = (props) => {

    const [classes, setClasses] = useState([])

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
                console.log(res.data)
                classes = res.data

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


            </div>
            <div className="display">
            Please select a class
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