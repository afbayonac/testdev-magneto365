const https = require('https')

function fetch (url) {
  return new Promise((resolve, reject) => {
    function callback (resp) {
      if (resp.statusCode < 200 || resp.statusCode >= 300) {
        return reject(new Error('statusCode=' + resp.statusCode))
      }

      const data = []
      resp.on('data', (chunk) => {
        console.log('data')
        data.push(chunk)
      })

      resp.on('end', () => {
        console.log('data')
        console.log(data)
        try {
          resolve(JSON.parse(Buffer.concat(data).toString()))
        } catch (e) {
          reject(e)
        }
      })
    }

    https
      .get(url, callback)
      .on('error', (err) => reject(err))
  })
}

module.exports = fetch
