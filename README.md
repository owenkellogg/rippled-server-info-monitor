# Server Info Monitor

Polls a rippled server for its `server_info` data.

Subclass to add extensible behavior. 

## Requirements

- babel-node for ES6 support

## Default Usage

By default the nodes in peers.json are loaded and their server_info
is logged to graphite.rippletest.net every two seconds

````
npm run start
````

## Example Custom Usage

````
import ServerInfo from '../lib/server_info'
import Monitor from '../lib/server_info_monitor'

class BasicMonitor extends Monitor {

  onData(data) {
    console.log('GOT THE SERVER INFO', data)
  }
}

let serverInfo = new ServerInfo('52.64.87.184', 51233, false)

new BasicMonitor(serverInfo).start()
````
