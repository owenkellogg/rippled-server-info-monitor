import ServerInfo from '../lib/server_info'
import Monitor from '../lib/server_info_monitor'
import StatsD from 'node-statsd'

let IP = process.argv[2]
let PORT = process.argv[3]
let SSL = process.argv[4] ? true : false

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

let serverInfo = new ServerInfo(IP, PORT, SSL)

new BasicMonitor(serverInfo, 1000).start()

