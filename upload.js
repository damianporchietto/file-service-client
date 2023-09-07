const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios')
const config = require('./config.json')

const main = async () => {

  const credentials = config.credentials

  // Metadata schema:
  // {
  //   "type": "object",
  //   "properties": {
  //     "key": { "type": "string" },
  //     "public": { "type": "boolean" }
  //   },
  //   "required": ["key", "public"],
  //   "additionalProperties": true
  // }

  const metadata = {
    key:'/key/to/save/file',
    public: false
  }

  // Abs o relative path to file
  const filepath = './upload.js'

  const form = new FormData()
  form.append('file', fs.createReadStream(filepath))
  form.append('credentials', JSON.stringify(credentials))
  form.append('metadata', JSON.stringify(metadata))

  const headers = {
      ...form.getHeaders(), // Include headers for multipart form data
  }

  const url = `${config.api.basepath}${config.api.paths.upload}`
  
  try {
    const res = await axios.post(url, form, {headers})
    return res.data
  } catch(err) {
    return err.response.data
  }
  
}

main().then(console.log).catch(console.error)