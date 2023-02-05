import { Collection } from "./collection";
import { Collector } from "./collector";
import { Disk } from "./disk";

export interface SearchResult {
    collections: Collection[],
    collectors: Collector[],
    disks: Disk[]
}