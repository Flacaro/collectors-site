import { Disk } from "./disk";

export interface Track {
    id: number;
    title: string;
    band: string;
    album: string;
    artist: string;
    compositor: string;
    time: number
}
