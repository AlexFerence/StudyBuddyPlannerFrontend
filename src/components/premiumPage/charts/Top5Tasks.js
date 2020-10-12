import React from 'react'
import { connect } from 'react-redux';

const isPremium = true

const Top5TasksChart = ({ }) => {
    if (false) {
        return (
            <div className="noData">
                <div>
                    No Data
                  <div className="subNoData">Create </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{ padding: '10px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '5px' }}>Top 5 Tasks</h2>
                <ol>
                    <li style={{ marginBottom: '5px' }}>1. Chem 100 Final</li>
                    <li style={{ marginBottom: '5px' }}>2. Phys 101 Assignment</li>
                    <li style={{ marginBottom: '5px' }}>3. Comp 202 Assignment</li>
                    <li style={{ marginBottom: '5px' }}>4. Biol 100 Lab</li>
                    <li style={{ marginBottom: '5px' }}>5. Comp 202 Final</li>
                </ol>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts,
        subjects: state.subjects,
    }
}


export default connect(mapStateToProps)(Top5TasksChart)