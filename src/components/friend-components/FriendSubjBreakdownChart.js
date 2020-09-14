import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { connect } from 'react-redux'

const FriendSubjBreakdownChart = ({
    selectedFriendSubjectsBreakdown,
    selectedFriendSubjectsBreakdownColors
}) => {
    return (
        <div>
            {
                selectedFriendSubjectsBreakdown.length > 0 &&
                <ReactEcharts style={{ height: '150px' }}
                    option={{
                        grid: {
                            height: 100,
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{b}: {d}%',
                            confine: true
                        },
                        height: 150,
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
                                height: 150,
                                type: 'pie',
                                radius: '65%',
                                center: ['50%', '50%'],
                                selectedMode: 'single',
                                data: selectedFriendSubjectsBreakdown,
                                color: selectedFriendSubjectsBreakdownColors,

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
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedFriendSubjectsBreakdown: state.friends.selectedFriendSubjectsBreakdown,
        selectedFriendSubjectsBreakdownColors: state.friends.selectedFriendSubjectsBreakdownColors,

    }
}


export default connect(mapStateToProps)(FriendSubjBreakdownChart)