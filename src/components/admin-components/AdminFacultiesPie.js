import React from 'react'
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react'

const isPremium = true

const SubjPieBreakdown = ({ faculties }) => {

    const formattedPieData = faculties.map((faculty) => {
        return ({
            label: faculty.label,
            value: faculty.numStudents
        })
    })
    return (
        <ReactEcharts
            option={{
                title: {
                    text: "Breakdown of Users by Faculty",
                    x: 'center',
                    top: 20,
                    textStyle: {
                        fontFamily: 'Helvetica',
                        fontWeight: 100
                    }
                },
                tooltip: {
                    formatter: function (params) {
                        //console.log(params)
                        let rez = '<span>' + params.data.label + ': ' + params.value + '</span>';
                        //console.log(params); //quite useful for debug
                        return rez;
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '60%'],
                        selectedMode: 'single',
                        data: formattedPieData,
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
        faculties: state.faculties
    }
}


export default connect(mapStateToProps)(SubjPieBreakdown)