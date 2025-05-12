import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
export default function TestCaseTable(props) {

  const dispatch = useDispatch();
  const testCase = useSelector((state) => state.testCase);
  
  const columns = [
    {
      name: "input",
      selector: (row) => row.input,
      width: "30%",
      headerStyle: () => {
        return { textAlign: "center" };
      },
    },
    {
      name: "output",
      selector: (row) => row.output,
      width: "30%",
      headerStyle: () => {
        return { textAlign: "center" };
      },
    },
    {
      name: "Hidden from User",
      selector: (row) => row.hidden.toString(),
    },
    
    {
      name: "Delete",
      cell: (row) => (
        <button
        className="button"
          onClick={(e) => {
            e.preventDefault()
            props.onDelete(row)
          }}
        >
          Delete
        </button>
      ),
    },
  ];
  return (

    <div>
    
      <DataTable
        title="TestCases"
        columns={columns}
        data={props.data}
        fixedHeader
        pagination
        responsive
     
      />
    </div>
  );
}
