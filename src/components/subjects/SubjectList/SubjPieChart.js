import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ReactEcharts from 'echarts-for-react'

const SubjPieChart = ({ breakdownChart, dispatch, currentSubject, data = [] }) => {

    let pieData = []
    data.forEach((item) => {
        pieData.push({
            value: item.value1,
            name: item.name1,
        })
    })
    console.log('PIE DATA')
    console.log(data)
    console.log(pieData)

    return (
        <ReactEcharts
            option={{
                title: {
                    text: "Task Type Breakdown",
                    textStyle: {
                        fontSize: 15
                    },
                    x: 'center',
                    top: 20
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {d}%'
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
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: pieData,
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

const mapStateToProps = (state) => {
    return {
        breakdownChart: state.charts.breakdownChart,
        currentSubject: state.currentSubject
    }
}

export default connect(mapStateToProps)(SubjPieChart)