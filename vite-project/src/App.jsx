import React, { useState } from 'react';

import myData from './data.json';
export default function App() {
  const [state, setState] = useState(myData);
  const [page, setPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const getRecords = (page, TotalRecords) => {
    return myData.slice(
      (page - 1) * recordsPerPage,
      (page - 1) * recordsPerPage + recordsPerPage
    );
  };

  const [records, setRecords] = useState(getRecords(page, recordsPerPage));

  const [pageArray, setPageArray] = useState(
    Array.from(Array(Math.floor(myData.length / recordsPerPage)).keys())
  );

  const changePage = (num) => {
    setRecords(getRecords(num, recordsPerPage));
  };

  return (
    <div>
      {records?.map((ele) => (
        <li>{ele.name}</li>
      ))}

      <nav aria-label="Page navigation example">
        <ul class="pagination">
          {pageArray.map((ele, i) => (
            <li key={i} class="page-item" onClick={() => changePage(ele + 1)}>
              <a class="page-link" href="#">
                {ele + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
