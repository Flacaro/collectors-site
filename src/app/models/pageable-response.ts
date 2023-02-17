export interface PageableResponse<T> {
  content: T[];
  pageable: {
    sort: {
      empty: true;
      sorted: false;
      unsorted: true;
    };
    offset: 0;
    pageNumber: 0;
    pageSize: 10;
    paged: true;
    unpaged: false;
  };
  totalPages: 1;
  totalElements: 2;
  last: true;
  size: 10;
  number: 0;
  sort: {
    empty: true;
    sorted: false;
    unsorted: true;
  };
  first: true;
  numberOfElements: 2;
  empty: false;
}
