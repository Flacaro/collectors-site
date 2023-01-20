import { Disk } from "./disk";

export interface Track {
    id: number;
    title: string;
    time: number;
    band: string;
    album: string;
    artist: string;
    compositor: string;
    disk: Disk;
}
