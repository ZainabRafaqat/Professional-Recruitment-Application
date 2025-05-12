
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteTest from "./deleteTest";
import ResultDialogue from "../AttemptTest/ResultDialogue";
export default function TestTable(props) {
  const location = useLocation();
  const id = localStorage.getItem("userId")
  let state_;
  const [data, setData] = React.useState("");
  const [test, setTest] = useState(location?.state?.job?.tests);
  let getTests = async () => {
    let res = await axios.get("http://127.0.0.1:8000/getTestsbyCompany/" + id);
    setData(res.data);
  };
  let getTestbyJob = async () => {
    await axios.get("http://127.0.0.1:8000/getTestbyJob/" + location.state.job.id).then((response) => {
      response.data.map(async (obj, i) => {
        let body = {
          id: id,
          Job: location.state.job.id,
          test: obj.id
        };
        await axios.post("http://127.0.0.1:8000/testAttemptCheck/", body).then((res) => {
          if (res.data === "True") {
            obj["attempt"] = true
          }
          else {
            obj["attempt"] = false
          }
        }).catch(() => {
          obj["attempt"] = false
        });
      });

      setData(response.data)
    })

  };

  let hasData = () => {
    if (location.state == null)
      return false;
    else
      return true;
  }
  function sendData() {

    for (let i = 0; i < test.length; i++) {
      const body = {
        JobId: location.state.job.id,
        TestId: test[i],
        UserId: location.state.user,

      };
      // axios
      //   // .post('http://127.0.0.1:8000/saveJobApply/', body)
      //   .then(() => {
      //     // navigate(-1)
      //   })
      //   .catch((error) => {
      //     // setError(error);
      //   });
    }


  }
  useEffect(() => {
    if (location.state == null) {
      getTests();
    }
    else {
      getTestbyJob();
      sendData();
    }

  }, []);
  function onDeleteTest(id) {
    setData((current) =>
      current.filter((test) => test.id !== id)
    );
  }
  const navigate = useNavigate();
  const columns = [
    {
      name: "Test Name",
      selector: (row) => row.test_Name,
      width: "30em",
      headerStyle: () => {
        return { textAlign: "center" };
      },
    },
    {
      name: "Total Time",
      selector: (row) => row.total_Time_for_Test_in_Minutes,
    },
    {
      name: "Deadline",
      selector: (row) => row.deadline,
    },
    {
      name: "No. of Questions",
      selector: (row) => row.Questions.length,
    },
    {
      name: "Action",
      cell: (row) => (<>
        {row.attempt ?
          <ResultDialogue test={row} job={location.state.job}/> : <button className="button" disabled={row.attempt} onClick={() => {
            console.log("ihi")
            if (location.state) {
              navigate("/testAttempt", { state: { row: row, job: location.state.job, user: location.state.user } })
            }
          }}>
            Attempt
          </button>}

      </>

      ),
      omit: !(hasData())
    },
    {
      name: "Action",
      cell: (row) => (
        <button className="button" onClick={() => {
          navigate("/createtest", { state: row })

        }}>
          Update
        </button>
      ),
      omit: hasData()
    },
    {
      name: "Action",
      cell: (row) => (
        <DeleteTest data={row} ondeleteTest={onDeleteTest} />
      ),
      omit: hasData()
    },
  ];

  return (
    <div className="auth-inner2">
      {location.state == null ? <><button className="button" onClick={() => navigate("/createtest")}>
        Create Test
      </button></> : <br></br>}

      <DataTable
        title="Test List"
        columns={columns}
        data={data}
        fixedHeader
        pagination
        responsive
      />
    </div>
  );
}
