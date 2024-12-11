import { KillPlayer, KillPlayerType } from "../types";
declare const killData: readonly [{
    readonly id: "thirst";
    readonly name: "Thirst";
    readonly type: KillPlayerType.Natural;
}, {
    readonly id: "hunger";
    readonly name: "Hunger";
    readonly type: KillPlayerType.Natural;
}, {
    readonly id: "cold";
    readonly name: "Cold";
    readonly type: KillPlayerType.Natural;
}, {
    readonly id: "bleeding";
    readonly name: "Bleeding";
    readonly type: KillPlayerType.Natural;
}, {
    readonly id: "fall";
    readonly name: "Fall";
    readonly type: KillPlayerType.Natural;
}, {
    readonly id: "drowned";
    readonly name: "Drowned";
    readonly type: KillPlayerType.Natural;
}, {
    readonly id: "radiation";
    readonly name: "Radiation";
    readonly type: KillPlayerType.Natural;
}, {
    readonly id: "pee pee 9000";
    readonly name: "Pee Pee 9000";
    readonly type: KillPlayerType.Natural;
}, {
    readonly id: "bear";
    readonly name: "Bear";
    readonly type: KillPlayerType.Npc;
}, {
    readonly id: "boar";
    readonly name: "Boar";
    readonly type: KillPlayerType.Npc;
}, {
    readonly id: "wolf";
    readonly name: "Wolf";
    readonly type: KillPlayerType.Npc;
}, {
    readonly id: "patrolhelicopter";
    readonly name: "Patrol Helicopter";
    readonly type: KillPlayerType.Npc;
}, {
    readonly id: "bradleyapc";
    readonly name: "Bradley APC";
    readonly type: KillPlayerType.Npc;
}, {
    readonly id: "guntrap.deployed";
    readonly name: "Shotgun Trap";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "autoturret_deployed";
    readonly name: "Auto Turret";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "flameturret.deployed";
    readonly name: "Flame Turret";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "teslacoil.deployed";
    readonly name: "Tesla Coil";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "campfire";
    readonly name: "Campfire";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "barricade.wood";
    readonly name: "Wooden Barricade";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "barricade.metal";
    readonly name: "Metal Barricade";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "barricade.woodwire";
    readonly name: "Wooden Barricade";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "spikes.floor";
    readonly name: "Floor Spikes";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "wall.external.high.stone";
    readonly name: "High External Stone Wall";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "wall.external.high";
    readonly name: "High External Wooden Wall";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "gates.external.high.wood";
    readonly name: "High External Wooden Gate";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "gates.external.high.stone";
    readonly name: "High External Stone Gate";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "sentry.bandit.static";
    readonly name: "Bandit Sentry";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "sentry.scientist.static";
    readonly name: "Scientist Sentry";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "landmine";
    readonly name: "Landmine";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "rocket_crane_lift_trigger";
    readonly name: "Crane Lift";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "cactus";
    readonly name: "Cactus";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "rowboat";
    readonly name: "Rowboat";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "fireball";
    readonly name: "Fireball";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "oilfireballsmall";
    readonly name: "Small Oil Fire";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "napalm";
    readonly name: "Napalm";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "cargoshipdynamic1";
    readonly name: "Cargo Ship";
    readonly type: KillPlayerType.Entity;
}, {
    readonly id: "beartrap";
    readonly name: "Bear Trap";
    readonly type: KillPlayerType.Entity;
}];
export type killData = (typeof killData)[number] | {
    id: number;
    name: "Scientist";
    type: KillPlayerType.Npc;
} | {
    id: string;
    name: string;
    type: KillPlayerType.Player;
};
export default class Helper {
    static getKillInformation(ign: string | undefined): KillPlayer;
    static areIdsUnique(): boolean;
}
export {};
