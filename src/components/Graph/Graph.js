import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import moment from 'moment'
import './Graph.css'
import { DateSelector } from '../DateSelector/DateSelector'
import HttpClient from '../../service/HttpClient'

export const Graph = (props) => {

  const dateFormat = 'YYYY/MM/DD'
  const oneDay = 1000 * 3600 * 24
  const now = moment(new Date()).format(dateFormat)

  const [data, setData] = useState([{}])
  const [allDayData, setAllDayData] = useState([])
  const [orgName, setOrgName] = useState('')
  const [currentDate, setCurrentDate] = useState(now)
  const [startDate, setStartDate] = useState(now)
  const [endDate, setEndDate] = useState(now)

  useEffect(async () => {
    let orgName = props.data
    let data = await HttpClient(orgName)
    setOrgName(orgName)
    let date1 = new Date(data[0][0])
    let date0 = new Date(data[data.length - 1][0])
    setAllDayData(data)
    setCurrentDate(new Date(date1))
    setStartDate(new Date(data[0][0]))
    setEndDate(new Date(data[data.length - 1][0]))
    let filtered = data.filter(x => (new Date(x[0]).toLocaleDateString() == new Date(date1).toLocaleDateString()))
    setData([{
      name: orgName,
      data: filtered
    }])

  }, [])



  let options = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
    title: {
      text: `${orgName} Electricity Usage`,
      align: 'left'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [100]
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val / 100).toFixed(0)
        },
      },
      title: {
        text: 'Unit'
      },
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: "date"
      }
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (`${Math.round(val / 100)} units `)
        }
      }
    }
  }


  const switchDate = (e) => {
    setCurrentDate(e)
    let filtered = allDayData.filter(x => (new Date(x[0]).toLocaleDateString() == new Date(e).toLocaleDateString()))
    setData([{
      name: orgName,
      data: filtered
    }])
  }

  const jumpDay = (forward = true) => {
    var myDate = new Date(currentDate).valueOf();
    if (forward && moment(myDate).isBefore(moment(allDayData[allDayData.length - 1][0]))) {
      myDate = new Date(myDate + oneDay);
      setCurrentDate(myDate)
      switchDate(myDate)
    }
    else if (moment(myDate).isAfter(moment(allDayData[0][0]))) {
      myDate = new Date(myDate - oneDay);
      setCurrentDate(myDate)
      switchDate(myDate)
    }

  }




  return (
    <div>
      <DateSelector
        startDate={startDate}
        currentDate={currentDate}
        allDayData={allDayData}
        endDate={endDate}
        switchDate={switchDate}
      />
      <div className="graph-container">
        <Chart options={options} series={data} type="area" height={350} width={1000} />
      </div>
    </div>
  )
}
