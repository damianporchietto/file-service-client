const fs = require('fs')
const axios = require('axios')
const config = require('./config.json')

const main = async () => {

  const downloadUrl = `${config.api.basepath}${config.api.paths.download}`
  const metadataUrl = `${config.api.basepath}${config.api.paths.metadata}`
  

  try {

    const downloadRes = await axios({
      method: 'GET',
      url: downloadUrl,
      data: {
        key: '/key/to/save/file',
        credentials: config.credentials
      }
    })

    const metadataRes = await axios({
      method: 'GET',
      url: metadataUrl,
      data: {
        key: '/key/to/save/file',
        credentials: config.credentials
      }
    })

    fs.writeFileSync(`./${downloadRes.data.filename}`, Buffer.from(downloadRes.data.buffer.data))
    fs.writeFileSync(`./${metadataRes.data.originalFilename}.json`, JSON.stringify(metadataRes.data,null,2), 'utf-8')

    return {
      status: 'ok',
      filename: `./${downloadRes.data.filename || metadataRes.data.originalFilename}`
    
    }
  } catch(err) {
    return err.response.data
  }
  
}

main().then(console.log).catch(console.error)