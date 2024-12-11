# frost-api-wrapper

> A library for developers to easily create their own integrations such as discord bots using GPORTAL's API & WebSocket!


## Installation

```bash
npm i LoganClinez/frost-api-wrapper
```

## Example Usage - TypeScript

```typescript
import { RCEManager, LogLevel, RCEEvent } from "frost-api-wrapper";

const rce = new RCEManager(
  {
    email: "", // Your GPORTAL email address
    password: "", // Your GPORTAL password
    servers: [
      {
        identifier: "server1", // A unique name for your server to be recognised by
        region: "US", // It's either EU or US
        serverId: 1487554, // You can find this in the URL on your server page
        refreshPlayers: 2, // This will fetch the playerlist every 2 minutes, good for displaying player count
      },
      {
        identifier: "server2",
        region: "EU",
        serverId: 1487367,
      }, // As we didn't specify a "refreshPlayers" value, the playerlist won't be fetched
    ], // An array of servers to listen to
  },
  {
    logLevel: LogLevel.Info, // Uses "Info" by default if left blank
  }
);

await rce.init(); // This attempts to login to GPORTAL - this is required for everything else to function

rce.on(RCEEvent.PlayerKill, (data) => {
  console.log(
    `[${data.server.identifier}] ${data.killer.name} killed ${data.victim.name}`
  );

  // Send an in-game command to the Rust server by the unique identifier (kill-feed!)
  await rce.sendCommand(
    data.server.identifier,
    `say <color=red>${data.killer.name}</color> killed <color=red>${data.victim.name}</color>`
  );
});
```

## Example Usage - JavaScript (ES5)

```javascript
const { RCEManager, LogLevel, RCEEvent } = require("frost-api-wrapper");

const rce = new RCEManager({
  email: "", // Your GPORTAL email address
  password: "", // Your GPORTAL password
  servers: [
    {
      identifier: "server1", // A unique name for your server to be recognised by
      region: "US", // It's either EU or US
      serverId: 1487554, // You can find this in the URL on your server page
      refreshPlayers: 2, // This will fetch the playerlist every 2 minutes, good for displaying player count
    },
    {
      identifier: "server2",
      region: "EU",
      serverId: 1487367,
    }, // As we didn't specify a "refreshPlayers" value, the playerlist won't be fetched
  ], // An array of servers to listen to
}, {
  logLevel: LogLevel.Info, // Uses "Info" by default if left blank
});

await rce.init(); // This attempts to login to GPORTAL - this is required for everything else to function

rce.on(RCEEvent.PlayerKill, (data) => {
  console.log(
    `[${data.server.identifier}] ${data.killer.name} killed ${data.victim.name}`
  );

  // Send an in-game command to the Rust server by the unique identifier (kill-feed!)
  await rce.sendCommand(
    data.server.identifier,
    `say <color=red>${data.killer.name}</color> killed <color=red>${data.victim.name}</color>`
  );
});
```
