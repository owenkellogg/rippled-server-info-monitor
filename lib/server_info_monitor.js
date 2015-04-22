import ServerInfo from './server_info'

export default class ServerInfoMonitor {
  constructor(serverInfo, timeout=5000) {
    this._serverInfo = serverInfo
    this._timeout = timeout
  }

  start() {
    this._interval = setInterval(() => {
      this._serverInfo.fetch()
        .then(data => {
          this.onData(data)
        })
        .catch(error => {
          this.onError(error)
        })
    }, this._timeout)
  }

  stop() {
    clearInterval(this._interval) 
  }

  onData(info) {
    console.log('DATA!', info)
  }

  onError(error) {
    console.log('ERROR!', error)
  }
}

