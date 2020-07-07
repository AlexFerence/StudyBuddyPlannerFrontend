import React, { useEffect } from 'react'
import { connect } from 'react-redux'

const SubjectsPage = (props) => {
    return (
        <div className="subjects">
            <div className="scroller"></div>
            <div className="display"></div>
        </div>
    )
}


export default connect()(SubjectsPage)