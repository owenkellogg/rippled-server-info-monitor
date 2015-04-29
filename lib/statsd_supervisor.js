import ServerInfo from './server_info'
import StatsdMonitor from './statsd_monitor'

export default class StatsdSupervisor {
  constructor(statsd, peers) {
    this._monitors = []
    this._peers = peers
    this._statsd = statsd

    process.on('uncaughtException', (error) => {
      console.log('EXCEPTIONAL BEHAVIOR', error)
      
      this.restart()
    })
  }

  start() {
    this._peers.forEach(peer => {
      let serverInfo = new ServerInfo(peer, 443, false)
      this._monitors.push(new StatsdMonitor(serverInfo, 2000, this._statsd).start())
    })
  }

  restart() {
    for (var i=0; i<this._monitors.length; i++) {
      delete this._monitors[i]
    }
    this.start()
  }
}


