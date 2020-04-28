const https = require('https')

function fetch (url) {
  return new Promise((resolve, reject) => {
    function callback (resp) {
      if (resp.statusCode < 200 || resp.statusCode >= 300) {
        return reject(new Error('statusCode=' + resp.statusCode))
      }

      const data = []
      resp.on('data', (chunk) => {
        data.push(chunk)
      })

      resp.on('end', () => {
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
