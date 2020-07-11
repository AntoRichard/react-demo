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
  })
}
