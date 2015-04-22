import ripple from 'ripple-lib'

export default class ServerInfo {
  constructor(ipAddress, port=443, secure=true) {
    let protocol = secure ? 'wss' : 'ws'
    console.log(`${protocol}://${ipAddress}:${port}`)
    this._remote = new ripple.Remote({
      servers: [`${protocol}://${ipAddress}:${port}`]
    })
  }

  fetch() {
    return new Promise((res, reject) => {
      this._remote.connect((error) => {
        if (error) { return reject(error) }
        this._remote.requestServerInfo((err, info) => {
          this._remote.disconnect()
          if (err) { return reject(err) }
          res(info)
        })
      })
    })
  }
}

