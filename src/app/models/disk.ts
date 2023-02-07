import { Collection } from "./collection";
import { Track } from "./track";

export interface Disk {
    id: number;
    title: string;
    artist: string;
    year: number;
    genre: string;
    author: string;
    label: string;
    band: string;
    state: string;
    duplicate: number;
    format: string;
    barcode: number;
    collectionId?: number;
}
