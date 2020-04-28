const fetchSW = require('./index.js')

const test = async () => {
  const data = fetchSW()
  console.log(JSON.stringify(data, null, 2))
}

test()
