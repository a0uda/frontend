import React from 'react'
import Pagination from "react-bootstrap/Pagination";


const Paginationn = ({ Arr, pageSize , setActivePage , activePage }) => {
  const handleOnClick = (i) => {
    if (i == 0) {
      if (activePage > 1) {
        setActivePage(activePage - 1);
      }
    } else if (i == numOfPages + 1) {
      if (activePage < numOfPages) {
        setActivePage(activePage + 1);
      }
    } else {
      setActivePage(i);
    }
    console.log(activePage);
  };
  console.log(Arr)
  const numOfPages = Math.ceil(Arr.length / pageSize);
  let items = [];
  items.push(
    <Pagination.Prev
      onClick={() => {
        handleOnClick(0);
      }}
    />
  );
  for (let i = 1; i <= numOfPages; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={activePage == i}
        onClick={() => {
          handleOnClick(i);
        }}
      >
        {i}
      </Pagination.Item>
    );
  }
  items.push(
    <Pagination.Next
      onClick={() => {
        handleOnClick(numOfPages + 1);
      }}
    />
  );

  return (
    <Pagination>
      {items}

    </Pagination>
  )
}

export default Paginationn