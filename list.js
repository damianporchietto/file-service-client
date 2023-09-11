const axios = require('axios')
const config = require('./config.json')

const main = async () => {
  const listUrl = `${config.api.basepath}${config.api.paths.list}`
  
  try {
    const res = await axios({
      method: 'GET',
      url: listUrl,
      data: {
        credentials: config.credentials
      }
    })

    return {
      status: 'ok',
      list: res.data
    }
  } catch(err) {
    return err.response.data
  }
  
}

main().then(console.log).catch(console.error)