import { KillPlayer, KillPlayerType } from "../types";

const killData = [
  { id: "thirst", name: "Thirst", type: KillPlayerType.Natural },
  { id: "hunger", name: "Hunger", type: KillPlayerType.Natural },
  { id: "cold", name: "Cold", type: KillPlayerType.Natural },
  { id: "bleeding", name: "Bleeding", type: KillPlayerType.Natural },
  { id: "fall", name: "Fall", type: KillPlayerType.Natural },
  { id: "drowned", name: "Drowned", type: KillPlayerType.Natural },
  { id: "radiation", name: "Radiation", type: KillPlayerType.Natural },
  { id: "pee pee 9000", name: "Pee Pee 9000", type: KillPlayerType.Natural },

  { id: "bear", name: "Bear", type: KillPlayerType.Npc },
  { id: "boar", name: "Boar", type: KillPlayerType.Npc },
  { id: "wolf", name: "Wolf", type: KillPlayerType.Npc },
  { id: "patrolhelicopter", name: "Patrol Helicopter", type: KillPlayerType.Npc },
  { id: "bradleyapc", name: "Bradley APC", type: KillPlayerType.Npc },

  { id: "guntrap.deployed", name: "Shotgun Trap", type: KillPlayerType.Entity },
  { id: "autoturret_deployed", name: "Auto Turret", type: KillPlayerType.Entity },
  { id: "flameturret.deployed", name: "Flame Turret", type: KillPlayerType.Entity },
  { id: "teslacoil.deployed", name: "Tesla Coil", type: KillPlayerType.Entity },
  { id: "campfire", name: "Campfire", type: KillPlayerType.Entity },
  { id: "barricade.wood", name: "Wooden Barricade", type: KillPlayerType.Entity },
  { id: "barricade.metal", name: "Metal Barricade", type: KillPlayerType.Entity },
  { id: "barricade.woodwire", name: "Wooden Barricade", type: KillPlayerType.Entity },
  { id: "spikes.floor", name: "Floor Spikes", type: KillPlayerType.Entity },
  { id: "wall.external.high.stone", name: "High External Stone Wall", type: KillPlayerType.Entity },
  { id: "wall.external.high", name: "High External Wooden Wall", type: KillPlayerType.Entity },
  { id: "gates.external.high.wood", name: "High External Wooden Gate", type: KillPlayerType.Entity },
  { id: "gates.external.high.stone", name: "High External Stone Gate", type: KillPlayerType.Entity },
  { id: "sentry.bandit.static", name: "Bandit Sentry", type: KillPlayerType.Entity },
  { id: "sentry.scientist.static", name: "Scientist Sentry", type: KillPlayerType.Entity },
  { id: "landmine", name: "Landmine", type: KillPlayerType.Entity },
  { id: "rocket_crane_lift_trigger", name: "Crane Lift", type: KillPlayerType.Entity },
  { id: "cactus", name: "Cactus", type: KillPlayerType.Entity },
  { id: "rowboat", name: "Rowboat", type: KillPlayerType.Entity },
  { id: "fireball", name: "Fireball", type: KillPlayerType.Entity },
  { id: "oilfireballsmall", name: "Small Oil Fire", type: KillPlayerType.Entity },
  { id: "napalm", name: "Napalm", type: KillPlayerType.Entity },
  { id: "cargoshipdynamic1", name: "Cargo Ship", type: KillPlayerType.Entity },
  { id: "beartrap", name: "Bear Trap", type: KillPlayerType.Entity },
] as const;

export type killData =
  | (typeof killData)[number]
  | { id: number; name: "Scientist"; type: KillPlayerType.Npc }
  | { id: string; name: string; type: KillPlayerType.Player };

export default class Helper {
  public static getKillInformation(ign: string | undefined): KillPlayer {
    if (!ign || typeof ign !== "string") {
      return {
        id: "unknown",
        type: KillPlayerType.Player,
        name: "Unknown",
      };
    }

    const lowerCaseIgn = ign.toLowerCase();
    const data = killData.find((e) => e.id === lowerCaseIgn);

    if (data) {
      return {
        id: ign,
        type: data.type,
        name: data.name,
      };
    }

    if (!isNaN(Number(ign))) {
      return {
        id: ign,
        type: KillPlayerType.Npc,
        name: "Scientist",
      };
    }

    return {
      id: ign,
      type: KillPlayerType.Player,
      name: ign,
    };
  }

  public static areIdsUnique(): boolean {
    const ids = killData.map((entry) => entry.id);
    return new Set(ids).size === ids.length;
  }
}
