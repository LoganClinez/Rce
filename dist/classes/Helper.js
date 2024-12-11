"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const killData = [
    { id: "thirst", name: "Thirst", type: types_1.KillPlayerType.Natural },
    { id: "hunger", name: "Hunger", type: types_1.KillPlayerType.Natural },
    { id: "cold", name: "Cold", type: types_1.KillPlayerType.Natural },
    { id: "bleeding", name: "Bleeding", type: types_1.KillPlayerType.Natural },
    { id: "fall", name: "Fall", type: types_1.KillPlayerType.Natural },
    { id: "drowned", name: "Drowned", type: types_1.KillPlayerType.Natural },
    { id: "radiation", name: "Radiation", type: types_1.KillPlayerType.Natural },
    { id: "pee pee 9000", name: "Pee Pee 9000", type: types_1.KillPlayerType.Natural },
    { id: "bear", name: "Bear", type: types_1.KillPlayerType.Npc },
    { id: "boar", name: "Boar", type: types_1.KillPlayerType.Npc },
    { id: "wolf", name: "Wolf", type: types_1.KillPlayerType.Npc },
    { id: "patrolhelicopter", name: "Patrol Helicopter", type: types_1.KillPlayerType.Npc },
    { id: "bradleyapc", name: "Bradley APC", type: types_1.KillPlayerType.Npc },
    { id: "guntrap.deployed", name: "Shotgun Trap", type: types_1.KillPlayerType.Entity },
    { id: "autoturret_deployed", name: "Auto Turret", type: types_1.KillPlayerType.Entity },
    { id: "flameturret.deployed", name: "Flame Turret", type: types_1.KillPlayerType.Entity },
    { id: "teslacoil.deployed", name: "Tesla Coil", type: types_1.KillPlayerType.Entity },
    { id: "campfire", name: "Campfire", type: types_1.KillPlayerType.Entity },
    { id: "barricade.wood", name: "Wooden Barricade", type: types_1.KillPlayerType.Entity },
    { id: "barricade.metal", name: "Metal Barricade", type: types_1.KillPlayerType.Entity },
    { id: "barricade.woodwire", name: "Wooden Barricade", type: types_1.KillPlayerType.Entity },
    { id: "spikes.floor", name: "Floor Spikes", type: types_1.KillPlayerType.Entity },
    { id: "wall.external.high.stone", name: "High External Stone Wall", type: types_1.KillPlayerType.Entity },
    { id: "wall.external.high", name: "High External Wooden Wall", type: types_1.KillPlayerType.Entity },
    { id: "gates.external.high.wood", name: "High External Wooden Gate", type: types_1.KillPlayerType.Entity },
    { id: "gates.external.high.stone", name: "High External Stone Gate", type: types_1.KillPlayerType.Entity },
    { id: "sentry.bandit.static", name: "Bandit Sentry", type: types_1.KillPlayerType.Entity },
    { id: "sentry.scientist.static", name: "Scientist Sentry", type: types_1.KillPlayerType.Entity },
    { id: "landmine", name: "Landmine", type: types_1.KillPlayerType.Entity },
    { id: "rocket_crane_lift_trigger", name: "Crane Lift", type: types_1.KillPlayerType.Entity },
    { id: "cactus", name: "Cactus", type: types_1.KillPlayerType.Entity },
    { id: "rowboat", name: "Rowboat", type: types_1.KillPlayerType.Entity },
    { id: "fireball", name: "Fireball", type: types_1.KillPlayerType.Entity },
    { id: "oilfireballsmall", name: "Small Oil Fire", type: types_1.KillPlayerType.Entity },
    { id: "napalm", name: "Napalm", type: types_1.KillPlayerType.Entity },
    { id: "cargoshipdynamic1", name: "Cargo Ship", type: types_1.KillPlayerType.Entity },
    { id: "beartrap", name: "Bear Trap", type: types_1.KillPlayerType.Entity },
];
class Helper {
    static getKillInformation(ign) {
        if (!ign || typeof ign !== "string") {
            return {
                id: "unknown",
                type: types_1.KillPlayerType.Player,
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
                type: types_1.KillPlayerType.Npc,
                name: "Scientist",
            };
        }
        return {
            id: ign,
            type: types_1.KillPlayerType.Player,
            name: ign,
        };
    }
    static areIdsUnique() {
        const ids = killData.map((entry) => entry.id);
        return new Set(ids).size === ids.length;
    }
}
exports.default = Helper;
//# sourceMappingURL=Helper.js.map