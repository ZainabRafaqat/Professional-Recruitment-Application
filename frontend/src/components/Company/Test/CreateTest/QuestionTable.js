import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { testActions } from "../store";
import EditQuestion from "./EditDialog";
export default function QuestionTable(props) {

  const dispatch = useDispatch();
  const test = useSelector((state) => state.test);
 
  const columns = [
    {
      name: "Question",
      selector: (row) => row.statement,
      width: "60%",
      headerStyle: () => {
        return { textAlign: "center" };
      },
    },
    
    {
      name: "Edit",
      cell: (row) => (
        <EditQuestion data={row} />
      ),
      headerStyle: () => {
        return { textAlign: "center" };
      },
    },
    {
      name: "Delete",
      headerStyle: () => {
        return { textAlign: "center" };
      },
      cell: (row) => (
        <button
        className="button"
          onClick={(event) => {
            event.preventDefault();
            dispatch(
              testActions.delete({
                testQuestion: row,
              })
            );
          }}
        >
          Delete
        </button>
      ),
    }
  ];

  return (

    <div>
    
      <DataTable
        title="Questions"
        columns={columns}
        data={test}
        fixedHeader
        pagination
        responsive
     
      />
    </div>
  );
}
