import React, { useEffect } from 'react'
import SubjectDisplayChart from './SubjectDisplayChart'
import { connect } from 'react-redux'
import SubjectDisplayHeader from './SubjectDisplayHeader'
import { FaCreditCard, FaTag } from 'react-icons/fa'
import { IoMdSchool } from 'react-icons/io'
import { Row, Col } from 'react-bootstrap'

const SubjectDisplayMain = ({ currentSubject, setDisplayMode, charts, turnOnEditing }) => {
    return (
        <div className="innerDisplay">
            <SubjectDisplayHeader setDisplayMode={setDisplayMode} turnOnEditing={turnOnEditing} />
            <div className="mainSection">
                <Row>
                    <Col md={6}>
                        <div className="tidbits">
                            <FaTag />
                            <span className="subjects__sub-text">{currentSubject.description}</span> <br />
                        </div>
                        <div className="tidbits">
                            <FaCreditCard />
                            <span className="subjects__sub-text"> {currentSubject.credits}</span> <span style={{ marginLeft: '4px' }} className="subjects__sub-text">Credits</span>
                        </div>
                        <div className="tidbits">
                            <IoMdSchool />
                            <span className="subjects__sub-text">{currentSubject.professor}</span> <br />
                        </div>
                    </Col>
                    <Col md={6}>
                        {charts.breakdownChart.length === 0 ?
                            <div className="noData">
                                <div>
                                    No Data
                                <div className="subNoData">Finish tasks to view task breakdown</div>
                                </div>
                            </div> :
                            <SubjectDisplayChart />
                        }
                    </Col>
                </Row>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        charts: state.charts,
        currentSubject: state.currentSubject
    }
}

export default connect(mapStateToProps)(SubjectDisplayMain)