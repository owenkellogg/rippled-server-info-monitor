import StatsD from 'node-statsd'
import StatsdSupervisor from './lib/statsd_supervisor'
import _ from 'underscore'

const STATSD_HOST = process.env.STATSD_HOST || 'graphite.rippletest.net'
const STATSD_PORT = process.env.STATSD_PORT || 8125

let peers = require('./peers.json').peers

let statsd = new StatsD({
  host: STATSD_HOST,
  port: STATSD_PORT
})

peers = _.union(peers['r.ripple.com'], peers['sydney'], peers['client_handlers'])

let supervisor = new StatsdSupervisor(statsd, peers)

supervisor.start()

