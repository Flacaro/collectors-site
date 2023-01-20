import { Collection } from "./collection";
import { Disk } from "./disk";

export interface Collector {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    birthdate: Date;
    username: string;
    favouritesCollection: Collection[];
    favouritesDisk: Disk[];
}
