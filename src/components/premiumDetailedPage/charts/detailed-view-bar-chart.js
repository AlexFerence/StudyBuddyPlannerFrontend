import React from 'react'
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react'

const DetailedViewBarChart = ({ selectedTask }) => {

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

    var getBarData = () => {
        if (selectedTask.sessionItems.length >= 1) {
            console.log('MAKING ACC')
            var acc = []
            //console.log(selectedTask.sessionItems)
            const firstDay = selectedTask.sessionItems[0].dateDifference
            const lastDay = selectedTask.sessionItems[selectedTask.sessionItems.length - 1].dateDifference
            var index = firstDay
            console.log(firstDay + ' ' + lastDay)
            while (index <= lastDay) {
                const sessionItem = selectedTask
                    .sessionItems.find((session) => session.dateDifference === index)
                if (sessionItem && sessionItem.dateDifference) {
                    acc.push({
                        name: sessionItem.dateDifference,
                        value: sessionItem.sessionMinutes,
                        itemStyle: {
                            color: (sessionItem.dateDifference < 1 ? selectedTask.subjectColor : '#bcbcbc')
                        }
                    })
                }
                else {
                    acc.push({
                        name: index,
                        value: 0,
                    })
                }
                index++
            }
            console.log(selectedTask.sessionItems)
            console.log(acc)
            return acc
        }
        return []
    }

    var getBarDataXAxis = () => {
        if (selectedTask.sessionItems.length >= 1) {
            console.log('MAKING ACC')
            var acc = []
            //console.log(selectedTask.sessionItems)
            const firstDay = selectedTask.sessionItems[0].dateDifference
            const lastDay = selectedTask.sessionItems[selectedTask.sessionItems.length - 1].dateDifference
            var index = firstDay
            while (index <= lastDay) {
                if (index > 0) {
                    acc.push(-1 * index)
                }
                else {
                    acc.push(Math.abs(index))
                }
                index++
            }
            return acc
        }
        return []
    }

    return (
        <ReactEcharts
            style={{ height: '200px', padding: '10px' }}
            option={{
                grid: {
                    bottom: 20,
                    top: 8,
                    right: 0,
                    left: 45
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        let rez = ''
                        console.log(params)
                        if (params.name < 1) {
                            rez = '<span>' + Math.abs(params[0].name) + ' days untill due date: ' + minsToHours(params[0].value) + '</span>';
                            return rez;
                        }
                        else {
                            rez = '<span>' + params[0].name + ' days after due date: ' + minsToHours(params[0].value) + '</span>';
                            return rez;
                        }
                        return rez
                    }
                },
                xAxis: {
                    // name: 'Days Till Due',
                    // nameLocation: 'middle',
                    // nameGap: 20,
                    type: 'category',
                    boundaryGap: true,
                    data: getBarDataXAxis()
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    },
                    name: 'Minutes',
                    nameLocation: 'middle',
                    nameGap: 35
                },
                series: [{
                    data: getBarData()
                    // selectedTask.sessionItems?.map((session) => {
                    //     return (
                    //         {
                    //             name: session.dateDifference,
                    //             value: session.sessionMinutes,
                    //             itemStyle: {
                    //                 color: (session.dateDifference < 1 ? selectedTask.subjectColor : '#bcbcbc')
                    //             }
                    //         }
                    //     )
                    // })
                    ,
                    type: 'bar'
                }]
            }}
        />
    )

}

// const mapStateToProps = (state) => {
//     return {
//         selectedTask: state.premiumStats.selectedTask
//     }
// }

export default connect()(DetailedViewBarChart)

