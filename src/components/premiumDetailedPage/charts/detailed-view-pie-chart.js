import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react'

const selectedTaskDefaultState = { sessionItems: [] }

const SubjPieBreakdown = ({ selectedTask = selectedTaskDefaultState }) => {

    useEffect(() => {
        console.log(selectedTask.sessionItems?.map((session) => {
            return ({ name: session.dateDifference, value: session.minutePercentage })
        }))
    }, [])

    return (
        <ReactEcharts
            option={{
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} days to due date: {d}%'
                },
                series: [
                    {
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '45%'],
                        selectedMode: 'single',
                        data: selectedTask.sessionItems?.map((session) => {
                            return ({ name: session.dateDifference, value: session.minutePercentage })
                        }),
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }}
        />
    )
}

// const mapStateToProps = (state) => {
//     return {
//         selectedTask: state.premiumStats.selectedTask
//     }
// }


export default connect()(SubjPieBreakdown)