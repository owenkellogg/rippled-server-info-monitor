import ServerInfo from '../lib/server_info'
import Monitor from '../lib/server_info_monitor'

class BasicMonitor extends Monitor {

  onData(data) {
    console.log('GOT THE SERVER INFO', data)    
  }
}

let serverInfo = new ServerInfo('52.64.87.184', 51233, false)

new BasicMonitor(serverInfo).start()

