import ServerInfo from '../lib/server_info'
import Monitor from '../lib/server_info_monitor'
import StatsD from 'node-statsd'
let peers = require('../peers.json').peers

let statsd = new StatsD({
  host: 'graphite.rippletest.net',
  port: 8125
})

class BasicMonitor extends Monitor {

  onData(data) {
    let directory = `server_info.${data.info.pubkey_node}`

    console.log(data)
    statsd.gauge(`${directory}.peers`, data.info.peers)
    statsd.gauge(`${directory}.age`, data.info.validated_ledger.age)
    statsd.gauge(`${directory}.sequence`, data.info.validated_ledger.sequence)
    statsd.gauge(`${directory}.converge_time`, data.info.last_close.converge_time_s)
    statsd.gauge(`${directory}.proposers`, data.info.last_close.proposers)
    statsd.gauge(`${directory}.load_factor`, data.info.load_factor)
  }
}

function start() {
  peers['r.ripple.com'].forEach(peer => {
    let serverInfo = new ServerInfo(peer, 443, false)
    new BasicMonitor(serverInfo, 2000).start()
  })

  let serverInfo = new ServerInfo('52.64.24.129', 51233, false)
  new BasicMonitor(serverInfo, 2000).start()
}

process.on('uncaughtException', (error) => {
  console.log('EXCEPTIONAL BEHAVIOR', error)
  start()
})

start()

