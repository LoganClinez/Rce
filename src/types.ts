import { RCEEvent, QuickChat, LogLevel } from "./constants";
import { EventEmitter } from "events";

export interface LoggerOptions {
  logLevel?: number;
  logFile?: string;
}

export interface AuthOptions {
  servers?: ServerOptions[];
  email: string;
  password: string;
}

export interface Auth {
  access_token: string;
  refresh_token: string;
  token_type: "Bearer";
  expires_in: number;
}

export interface RustServer {
  identifier: string;
  serverId: number;
  trueServerId?: number;
  region: "US" | "ES";
  refreshPlayers?: number;
  refreshPlayersInterval?: NodeJS.Timeout;
  rfBroadcasting?: boolean;
  rfBroadcastingInterval?: NodeJS.Timeout;
  currentRfBroadcasts: number[];
  heliFeeds?: boolean;
  heliFeedsInterval?: NodeJS.Timeout;
  bradFeeds?: boolean;
  bradFeedsInterval?: NodeJS.Timeout;
  state?: string | string[];
  flags: string[];
  players: string[];
  added: boolean;
  ready: boolean;
  serviceState: string;
}

export interface ServerOptions {
  identifier: string;
  serverId: number;
  region: "US" | "EU";
  refreshPlayers?: number;
  rfBroadcasting?: boolean;
  heliFeeds?: boolean;
  bradFeeds?: boolean;
  state?: string | string[];
}

export interface WebsocketRequest {
  identifier: string;
  region: "US" | "EU";
  sid: number;
}

export interface WebsocketMessage {
  type: "connection_ack" | "data" | "error" | "ka";
  payload: any;
  id: string;
}

export enum KillPlayerType {
  Player = "player",
  Npc = "npc",
  Entity = "entity",
  Natural = "natural",
}

export interface KillPlayer {
  id: string;
  type: KillPlayerType;
  name: string;
}

export interface EventPayload {
  server: RustServer;
}

export interface MessageEventPayload extends EventPayload {
  message: string;
}

export interface PlayerListUpdateEventPayload extends EventPayload {
  players: string[];
  joined: string[];
  left: string[];
}

export interface QuickChatEventPayload extends EventPayload {
  type: "local" | "server" | "team";
  ign: string;
  message: QuickChat;
}

export interface PlayerJoinedEventPayload extends EventPayload {
  ign: string;
}

export interface PlayerLeftEventPayload extends EventPayload {
  ign: string;
}

export interface PlayerSuicideEventPayload extends EventPayload {
  ign: string;
}

export interface PlayerRespawnedEventPayload extends EventPayload {
  ign: string;
  platform: "XBL" | "PS";
}

export interface PlayerRoleAddEventPayload extends EventPayload {
  ign: string;
  role: string;
}

export interface NoteEditEventPayload extends EventPayload {
  ign: string;
  oldContent: string;
  newContent: string;
}

export interface EventStartEventPayload extends EventPayload {
  event:
    | "Airdrop"
    | "Cargo Ship"
    | "Chinook"
    | "Patrol Helicopter"
    | "Halloween"
    | "Christmas"
    | "Easter"
    | "Patrol Helicopter Debris"
    | "Bradley APC Debris"
    | "Oil Rig"
    | "Small Oil Rig";
  special: boolean;
}

export interface PlayerKillEventPayload extends EventPayload {
  victim: KillPlayer;
  killer: KillPlayer;
}

export interface ItemSpawnEventPayload extends EventPayload {
  ign: string;
  item: string;
  quantity: number;
}

export interface VendingMachineNameEventPayload extends EventPayload {
  ign: string;
  oldName: string;
  newName: string;
}

export interface TeamCreateEventPayload extends EventPayload {
  owner: string;
  id: number;
}

export interface TeamJoinEventPayload extends EventPayload {
  ign: string;
  owner: string;
  id: number;
}

export interface TeamLeaveEventPayload extends EventPayload {
  ign: string;
  owner: string;
  id: number;
}

export interface KitSpawnEventPayload extends EventPayload {
  ign: string;
  kit: string;
}

export interface KitGiveEventPayload extends EventPayload {
  admin: string;
  ign: string;
  kit: string;
}

export interface SpecialEventStartEventPayload extends EventPayload {
  event: "Easter" | "Halloween" | "Xmas" | "HalloweenPortal" | "XmasPortal";
}

export interface SpecialEventEndEventPayload extends EventPayload {}

export interface ExecutingCommandEventPayload extends EventPayload {
  command: string;
}

export interface RCEErrorPayload extends EventPayload {
  error: string;
}

export interface ServiceStateEventPayload extends EventPayload {
  state:
    | "STOPPING"
    | "MAINTENANCE"
    | "UPDATING"
    | "STOPPED"
    | "STARTING"
    | "RUNNING";
}

export interface RCELogPayload {
  level: LogLevel;
  content: string;
}

export interface CustomZoneAddedEventPayload extends EventPayload {
  name: string;
}

export interface CustomZoneRemovedEventPayload extends EventPayload {
  name: string;
}

export interface FrequencyReceivedEventPayload extends EventPayload {
  frequency: number;
  coordinates: number[];
  range: number;
}

export interface FrequencyLostEventPayload extends EventPayload {
  frequency: number;
}

export interface RCEEventTypes {
  [RCEEvent.Message]: MessageEventPayload;
  [RCEEvent.PlayerListUpdate]: PlayerListUpdateEventPayload;
  [RCEEvent.QuickChat]: QuickChatEventPayload;
  [RCEEvent.PlayerJoined]: PlayerJoinedEventPayload;
  [RCEEvent.PlayerLeft]: PlayerLeftEventPayload;
  [RCEEvent.PlayerSuicide]: PlayerSuicideEventPayload;
  [RCEEvent.PlayerRespawned]: PlayerRespawnedEventPayload;
  [RCEEvent.PlayerRoleAdd]: PlayerRoleAddEventPayload;
  [RCEEvent.NoteEdit]: NoteEditEventPayload;
  [RCEEvent.EventStart]: EventStartEventPayload;
  [RCEEvent.PlayerKill]: PlayerKillEventPayload;
  [RCEEvent.ItemSpawn]: ItemSpawnEventPayload;
  [RCEEvent.VendingMachineName]: VendingMachineNameEventPayload;
  [RCEEvent.KitSpawn]: KitSpawnEventPayload;
  [RCEEvent.KitGive]: KitGiveEventPayload;
  [RCEEvent.TeamCreate]: TeamCreateEventPayload;
  [RCEEvent.TeamJoin]: TeamJoinEventPayload;
  [RCEEvent.TeamLeave]: TeamLeaveEventPayload;
  [RCEEvent.SpecialEventStart]: SpecialEventStartEventPayload;
  [RCEEvent.SpecialEventEnd]: SpecialEventEndEventPayload;
  [RCEEvent.ExecutingCommand]: ExecutingCommandEventPayload;
  [RCEEvent.Error]: RCEErrorPayload;
  [RCEEvent.Log]: RCELogPayload;
  [RCEEvent.ServiceState]: ServiceStateEventPayload;
  [RCEEvent.CustomZoneAdded]: CustomZoneAddedEventPayload;
  [RCEEvent.CustomZoneRemoved]: CustomZoneRemovedEventPayload;
  [RCEEvent.FrequencyReceived]: FrequencyReceivedEventPayload;
  [RCEEvent.FrequencyLost]: FrequencyLostEventPayload;
}

export class RCEEvents extends EventEmitter {
  emit<K extends keyof RCEEventTypes>(
    event: K,
    ...args: RCEEventTypes[K] extends undefined ? [] : [RCEEventTypes[K]]
  ): boolean {
    return super.emit(event, ...args);
  }

  on<K extends keyof RCEEventTypes>(
    event: K,
    listener: (arg: RCEEventTypes[K]) => void
  ): this {
    return super.on(event, listener);
  }

  once<K extends keyof RCEEventTypes>(
    event: K,
    listener: (arg: RCEEventTypes[K]) => void
  ): this {
    return super.once(event, listener);
  }

  off<K extends keyof RCEEventTypes>(
    event: K,
    listener: (arg: RCEEventTypes[K]) => void
  ): this {
    return super.off(event, listener);
  }
}
