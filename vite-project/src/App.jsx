import React, { useState } from 'react';
import './style.css';
import myData from './data.json';
import _ from 'lodash';
export default function App() {
  const [state, setState] = useState(myData);
  const [page, setPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const sortObject = (a, b) => {
    return -1;
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
      let re = _.sortBy(records, [
        function (o) {
          return o.name;
        },
      ]);
      setRecords(re);
    } else {
      setRecords(getRecords(page, recordsPerPage));
    }

    setSortOrder(!sortOrder);
  };

  const handleChange = (event) => {
    let name = event.target.value;
    if (name.length > 0) {
      const regexp = new RegExp(name, 'i');
      let newItem = records.filter((x) => regexp.test(x.name));
      setRecords(newItem);
    } else {
      setRecords(getRecords(page, recordsPerPage));
    }
  };

  return (
    <div>
      <button className="btn btn-success" onClick={sortData}>
        Sort
      </button>
      <div className="col-6 offset-3">
        <input type="text" class="form-control" onChange={handleChange} />
      </div>

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
