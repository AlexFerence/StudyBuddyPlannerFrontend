import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react'
import GraphCoverUp from '../shared/GraphCoverUp';
import Select from 'react-select';
import { loadPieChartWithId } from '../../thunks/chartThunk';
import moment from 'moment'

const isPremium = true

const semestersReduce = (list, semester) => {
    list.push({ value: semester.id, label: semester.title })
    return list
}

const SubjPieBreakdown = ({ dispatch, charts, subjects, semesters }) => {

    //const activeSemester = semesters.find((semester) => semester.active === 1)

    const findActiveSemester = () => {
        const currentDay = moment()
        const activeSemester = semesters.find((semester) => {
            const isAfterStartDate = currentDay.isAfter(semester.startDate)
            const isBeforeEndDate = currentDay.isBefore(semester.endDate)
            return isAfterStartDate && isBeforeEndDate
        })
        if (activeSemester) {
            return activeSemester
        }
        if (semesters[0]) {
            return semesters[0]
        }
    }

    const activeSemester = findActiveSemester()

    const [semester, setSemester] = useState({
        value: activeSemester.id,
        label: activeSemester.title
    })

    useEffect(() => {
        console.log(semester)
        dispatch(loadPieChartWithId(semester.value))
    }, [semester])

    if (subjects.length === 0) {
        return (
            <div className="noData">
                <div>
                    No Data
                  <div className="subNoData">Create subjects to view subject breakdown</div>
                </div>
            </div>
        )
    }
    else {
        return (
            <Fragment>
                {
                    (charts.pieChart && charts.pieChart.pieData && charts.pieChart.pieData.length > 0) ?
                        <ReactEcharts
                            option={{

                                title: {
                                    text: "Breakdown of Time by Subject",
                                    x: 'center',
                                    top: 20,
                                    textStyle: {
                                        fontFamily: 'Helvetica',
                                        fontWeight: 100

                                    }
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: '{b}: {d}%'
                                },
                                series: [
                                    {
                                        type: 'pie',
                                        radius: '65%',
                                        center: ['50%', '60%'],
                                        selectedMode: 'single',
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
                                        data:
                                            isPremium ?
                                                (charts.pieChart ? charts.pieChart.pieData : []) :
                                                [
                                                    { name: 'math', value: 2 },
                                                    { name: 'chem', value: 1 },
                                                    { name: 'hist', value: .5 },
                                                    { name: 'engl', value: 2 },
                                                ]
                                        ,
                                        color: isPremium ? charts.pieColors : null,
                                        emphasis: {
                                            itemStyle: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                                normal: {
                                                    label: {
                                                        show: false
                                                    },
                                                    labelLine: {
                                                        show: false
                                                    }
                                                }
                                            }
                                        }
                                    }
                                ]
                            }}
                        />
                        :
                        <GraphCoverUp />

                }

            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts,
        subjects: state.subjects,
        semesters: state.profile.semesters
    }
}


export default connect(mapStateToProps)(SubjPieBreakdown)