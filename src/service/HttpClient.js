import { config } from '../config'
export default function HttpClient(name) {

  return new Promise((resolve, reject) => {

    const URL = `${config.host}:${config.port}/mock/${name}`

    let dataSet = []
    fetch(URL).then(data => data.json()).then(data => {
      data.data.forEach(element => {
        dataSet.push([element.time, element.watt])
      });
      resolve(dataSet)
    })
    let temp = {}
    let dates = []
    for (let i = 1; i < 1000; i++) {
      var current = new Date()
      var date = new Date(current.getTime() + ((i + 1) * 1440000));
      dates.push([date, 100000 + (i * i * i)])
    }
    temp.data = dates
    temp.orgName = name


    return temp
  })

}
