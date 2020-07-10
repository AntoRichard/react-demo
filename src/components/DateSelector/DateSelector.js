import React from 'react'
import moment from 'moment'
import { DatePicker } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import './DateSelector.css'


export const DateSelector = (props) => {

  const {
    startDate,
    endDate,
    currentDate,
    allDayData,
    switchDate
  } = props
  const dateFormat = 'YYYY/MM/DD'
  const oneDay = 1000 * 3600 * 24

  const jumpDay = (forward = true) => {
    var myDate = new Date(currentDate).valueOf();
    if (forward && moment(myDate).isBefore(moment((new Date(allDayData[allDayData.length - 1][0]).getTime()-oneDay)))) {
      myDate = new Date(myDate + oneDay);
      switchDate(myDate)
    }
    else if (!forward && moment(myDate).isAfter(moment(allDayData[0][0]))) {
      myDate = new Date(myDate - oneDay);
      switchDate(myDate)
    }

  }

  return (
    <div className="dateselector-component">
      <ArrowLeftOutlined className="arrow-dateselector" onClick={() => jumpDay(false)} />
      <DatePicker
        onChange={switchDate}
        value={moment(currentDate, dateFormat)}
        disabledDate={d => !d || d.isAfter(moment(endDate)) || d.isBefore(moment(startDate))}
        format={dateFormat}
      />
      <ArrowRightOutlined className="arrow-dateselector" onClick={() => jumpDay(true)} />
    </div>
  )
}
