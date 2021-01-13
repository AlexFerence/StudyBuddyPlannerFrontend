import React, { useState } from 'react'
//import SubjectDisplayChart from '../SubjectDisplay/SubjectDisplayChart'
import { connect } from 'react-redux'
import SubjectDisplayHeader from '../SubjectDisplay/SubjectDisplayHeader'
import { FaCreditCard, FaTag } from 'react-icons/fa'
import { IoMdSchool } from 'react-icons/io'
import { Row, Col } from 'react-bootstrap'
import ReactCardFlip from 'react-card-flip'
import EditSubjectTile from '../EditSubject/EditSubjectTile'
import SubjPieChart from './SubjPieChart'

const SubjectTile = ({ subject, setDisplayMode, charts, turnOnEditing }) => {

    const [flipped, setFlipped] = useState(true)

    const handleTurnOnEditing = () => {
        setFlipped(!flipped)
    }

    const handleTurnOffEditing = () => {
        //console.log('stopping editing now')
        setFlipped(!flipped)
    }

    return (

        <Col style={{ padding: '0px' }} xs={12} s={12} md={6} lg={6} className="display">
            <ReactCardFlip isFlipped={flipped}>
                <EditSubjectTile turnOffEditing={handleTurnOffEditing} subject={subject} />
                <div className="innerDisplay" style={{ height: '457px' }}>
                    <SubjectDisplayHeader subject={subject} setDisplayMode={setDisplayMode} turnOnEditing={handleTurnOnEditing} />
                    <div className="mainSection">
                        <Row>
                            <Col md={6}>
                                {subject.description &&
                                    <div className="tidbits">
                                        <FaTag />
                                        <span className="subjects__sub-text">{subject.description}</span> <br />
                                    </div>}
                                {subject.credits &&
                                    <div className="tidbits">
                                        <FaCreditCard />
                                        <span className="subjects__sub-text"> {subject.credits}</span> <span style={{ marginLeft: '4px' }} className="subjects__sub-text">Credits</span>
                                    </div>
                                }
                                {subject.professor &&
                                    <div className="tidbits">
                                        <IoMdSchool />
                                        <span className="subjects__sub-text">{subject.professor}</span> <br />
                                    </div>
                                }
                            </Col>
                            <Col md={6}>
                                {subject.subjectBreakdown?.responseItems?.length === 0 ?
                                    <div className="noData">
                                        <div>
                                            No Data
                                <div className="subNoData">Finish tasks to view task breakdown</div>
                                        </div>
                                    </div> :
                                    <SubjPieChart data={subject.subjectBreakdown?.responseItems} />
                                }
                            </Col>
                        </Row>
                    </div>
                </div>
            </ReactCardFlip>
        </Col>
    )
}
const mapStateToProps = (state) => {
    return {
        charts: state.charts,
    }
}

export default connect(mapStateToProps)(SubjectTile)