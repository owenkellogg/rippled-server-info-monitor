import ServerInfoMonitor from './server_info_monitor'

export default class StatsdMonitor extends ServerInfoMonitor {

  constructor(serverInfo, interval, statsd) {
    super(serverInfo, interval)
    this._statsd = statsd
  }

  onData(data) {
    super.onData(data)
    let directory = `server_info.${data.info.pubkey_node}`

    this._statsd.gauge(`${directory}.peers`, data.info.peers)
    this._statsd.gauge(`${directory}.age`, data.info.validated_ledger.age)
    this._statsd.gauge(`${directory}.sequence`, data.info.validated_ledger.sequence)
    this._statsd.gauge(`${directory}.converge_time`, data.info.last_close.converge_time_s)
    this._statsd.gauge(`${directory}.proposers`, data.info.last_close.proposers)
    this._statsd.gauge(`${directory}.load_factor`, data.info.load_factor)
  }
}

