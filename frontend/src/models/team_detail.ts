import { Player } from "./player";
import { Team } from "./team";

export type TeamDetail = {
    team: Team,
    active_players: Player[],
    retire_players: Player[],
};