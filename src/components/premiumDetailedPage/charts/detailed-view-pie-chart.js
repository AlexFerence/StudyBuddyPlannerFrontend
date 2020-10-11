import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react'
import Color from 'color'
import colorString from 'color-string'

const selectedTaskDefaultState = { sessionItems: [] }

const SubjPieBreakdown = ({ selectedTask = selectedTaskDefaultState }) => {

    const minsToHours = (m) => {
        const hours = Math.floor(m / 60)
        const mins = Math.floor(m % 60)
        if (hours >= 1) {
            return (hours + 'hrs., ' + mins + 'min.')
        }
        else {
            return (mins + 'min.')
        }
    }

    useEffect(() => {
        console.log(selectedTask.sessionItems?.map((session) => {
            return ({ name: session.dateDifference, value: session.minutePercentage })
        }))
    }, [])

    const getColor = (color, dayDiff = 0) => {
        if (dayDiff > 0) {
            return ('#9c9c9c')
        }
        const colorModel = colorString.get(color)
        const dayDiffRatio = Math.abs(dayDiff) / 30
        var c = Color(colorModel.value).lighten(dayDiffRatio)
        return (c.hex())


    }

    return (
        <ReactEcharts
            style={{ height: '200px' }}
            option={{
                grid: {
                    bottom: 0
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        //console.log(params)
                        let rez = ''
                        if (params.data.name < 1) {
                            rez = '<span>' + Math.abs(params.data.name) + ' days untill due date: ' + minsToHours(params.data.value) + '</span>';
                            return rez;
                        }
                        else {
                            rez = '<span>' + params.data.name + ' days after due date: ' + minsToHours(params.data.value) + '</span>';
                            return rez;
                        }
                    }
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
                            return ({
                                name: session.dateDifference, value: session.minutePercentage,
                                itemStyle: {
                                    color: getColor(selectedTask.subjectColor, session.dateDifference)
                                }
                            })
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