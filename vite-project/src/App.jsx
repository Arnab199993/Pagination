import React, { useState } from 'react';
import './style.css';
import myData from './data.json';
export default function App() {
  const [state, setState] = useState(myData);
  const [page, setPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const sortAscending = (a, b) => {
    return -1;
  };

  const sortDescending = (a, b) => {
    return 1;
  };

  const getRecords = (page, TotalRecords, sortOrder) => {
    return myData.slice(
      (page - 1) * recordsPerPage,
      (page - 1) * recordsPerPage + recordsPerPage
    );
  };

  const [sortOrder, setSortOrder] = useState(true);

  const [records, setRecords] = useState(getRecords(page, recordsPerPage));

  const [pageArray, setPageArray] = useState(
    Array.from(Array(Math.floor(myData.length / recordsPerPage)).keys())
  );

  const changePage = (num) => {
    setPage(num);
    setRecords(getRecords(num, recordsPerPage));
  };

  const sortData = () => {
    let currentsortOrder = !sortOrder;

    if (currentsortOrder) {
      let re = getRecords(page, recordsPerPage).sort(sortAscending);
      setRecords(re);
    } else {
      let re = getRecords(page, recordsPerPage).sort(sortDescending);
      setRecords(re);
    }
    setSortOrder(!sortOrder);
  };

  return (
    <div>
      <button className="btn btn-success" onClick={sortData}>
        Sort
      </button>

      <br></br>
      <div style={{ marginTop: '40px' }}>
        {records?.map((ele) => (
          <li key={ele._id}>
            {ele._id} - {ele.name}
          </li>
        ))}

        <nav aria-label="Page navigation example" style={{ marginTop: '20px' }}>
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
    </div>
  );
}
