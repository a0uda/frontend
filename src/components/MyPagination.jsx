import React from 'react';
import { Pagination } from 'react-bootstrap';

function MyPagination({ total, current, onChangePage }) {
  let paginationItems = [];

  if (current > 1) {
    paginationItems.push(
      <Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />
    );
  }

  for (let page = 1; page <= total; page++)  
  {
    paginationItems.push(
      <Pagination.Item
        key={page}
        data-page={page}
        active={page === current}
        onClick={() => onChangePage(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (current < total) {
    paginationItems.push(
      <Pagination.Next key="next" onClick={() => onChangePage(current + 1)} />
    );
  }

  return <Pagination>{paginationItems}</Pagination>;
}

export default MyPagination;
