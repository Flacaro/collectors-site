import { Collector } from "./collector";
import { Disk } from "./disk";

export interface Collection {
    id: number;
    name: string;
    visible: boolean;
    type: string;
    collector: Collector;
    disks: Disk[];
}
