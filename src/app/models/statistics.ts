export namespace Statistics {

    export interface Statistics {
        diskStatistics: {
            totalDisks: number,
            diskCountByArtist: GroupByStatistic[],
            diskCountByGenre: GroupByStatistic[]
        };
        collectionStatistics: {
            totalCollections: number,
            collectionsByType: GroupByStatistic[]
        }
    }

    interface GroupByStatistic {
        field: string,
        count: number
    }
}