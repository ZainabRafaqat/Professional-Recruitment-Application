import React, { useEffect, useState } from "react";
import QuestionTable from "./QuestionTable";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { testActions } from "../store/index";
import { useLocation, useNavigate } from 'react-router-dom';
import TestCaseTable from "./TestCaseTable";

function CreateTest(props) {
  const id = localStorage.getItem("userId")
  const loc = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isUpdated, setisUpdated] = React.useState(true);
  const [isUpdateForm, setisUpdateForm] = React.useState(false);
  const [TestName, setTestName] = React.useState("");
  const [TotalTime, setTotalTime] = React.useState("");
  const [Deadline, setDeadlne] = React.useState("");
  const [TestDescription, setDescription] = React.useState("");
  const [Questions, setQuestions] = React.useState([]);
  const [question, setQuestion] = React.useState({
    id: 0,
    statement: "",
    testOption: false,
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    testCases: null,
  });
  const [TestCases, setTestCases] = React.useState([]);
  const [testcase, setTestCase] = React.useState({
    id: 0,
    input: "",
    output: "",
    hidden: false,
  });
  const test = useSelector((state) => state.test);
  useEffect(() => {
    dispatch(
      testActions.deleteall()
    );
    if (loc.state) {
      if (loc.state.test_Name) {
        setTestName(loc.state.test_Name)
      }
      if (loc.state.total_Time_for_Test_in_Minutes) {
        setTotalTime(loc.state.total_Time_for_Test_in_Minutes)
      }
      if (loc.state.deadline) {
        setDeadlne(loc.state.deadline)
      }
      if (loc.state.description) {
        setDescription(loc.state.description)
      }
      if (loc.state.Questions) {
        if (isUpdated) {
          let q = loc.state.Questions
          for (let i = 0; i < q.length; i++) {
            let ques = {};
            ques.id = q[i].id
            ques.statement = q[i].statement
            ques.testOption = q[i].testOption
            ques.option1 = q[i].option1
            ques.option2 = q[i].option2
            ques.option3 = q[i].option3
            ques.option4 = q[i].option4
            ques.answer = q[i].correct_answer
            ques.testCases = q[i].testcases ? q[i].testcases : null

            dispatch(testActions.add({
              Questions: ques,
            }))
            setQuestions((state) => [...state, ques])


          }
          setisUpdated(false)
        }
      }
      setisUpdateForm(true)
    }


    // }
  }, [dispatch]);


  function sendData(event) {
    event.preventDefault();

    const body = {
      TestName: TestName,
      TotalTime: TotalTime,
      Deadline: Deadline,
      TestDescription: TestDescription,
      Questions: test,
      company:id
    }

    if (!isUpdateForm) {
      axios
        .post(`http://127.0.0.1:8000/saveTest/`, body)
        .then((response) => {
          alert(response.data);
          setQuestions([])
          navigate("/tests")
        })
        .catch((error) => {
          alert(error);
        });
    }
    else {
      body['id'] = loc.state.id;
      axios
        .put(`http://127.0.0.1:8000/editTest/`, body)
        .then((response) => {
          alert(response.data);
          navigate("/tests")
        })
        .catch((error) => {
          event.preventDefault();
          alert(error);
        });
    }

  }
  function deleteTestCase(data) {

    setTestCases((current) =>
      current.filter((tc) => tc.input !== data.input && tc.output !== data.output)
    );
  }
  return (
    <div className="auth-inner2">
      <form id="form">
        <h3>New Test</h3>
        <hr></hr>
        <h6 className="testLabel">Test Details</h6>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="testname" className="sr-only">
              Test Name
            </label>
            <input
              id="testname"
              className="form-control "
              type="text"
              name="testname"
              value={TestName}
              placeholder="Test name"
              onChange={(event) => {
                setTestName(event.target.value);
              }}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="testdeadline" className="sr-only">
              Test Deadline
            </label>
            <input
              id="testdeadline"
              className="form-control col-md-6"
              type="date"
              name="testdeadline"
              placeholder="Test Deadline"

              value={Deadline}
              onChange={(event) => {
                setDeadlne(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="totaltime" className="sr-only">
              Total Time Allowed(in minutes)
            </label>
            <input
              id="totaltime"
              className="form-control "
              type="number"
              name="totaltime"

              value={TotalTime}
              placeholder="Total Time (in minutes)"
              onChange={(event) => {
                setTotalTime(event.target.value);
              }}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="description" className="sr-only"></label>
            <textarea
              id="description"
              className="form-control "
              type="text"
              name="description"

              value={TestDescription}
              placeholder="Description"
              rows="4"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>

        <hr></hr>
        <div >
          <h6 className="testLabel">Add Question</h6>
          <div className="row">
            <div className="form-group col-md-10">
              <label htmlFor="question" className="sr-only">
                Question
              </label>
              <input
                id="question"
                className="form-control "
                type="text"
                name="question"
                placeholder="Question"
                onChange={(event) => {
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["statement"]: event.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="form-group m-2">
            <div className="form-check  form-check-inline">
              <input className="form-check-input" type="radio" name="radioOptions" id="haveOptions"
                onChange={(event) => {
                  if (event.target.checked === true) {
                    document.getElementById("option").style.display = "block";
                    document.getElementById("testcases").style.display = "none";
                  }
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["testOption"]: event.target.checked,
                  }));
                }}
              />
              <label className="form-check-label" htmlFor="haveOptions">
                Show Options
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="radioOptions" id="haveTestCases"
                onChange={(event) => {
                  if (event.target.checked === true) {
                    document.getElementById("option").style.display = "none";
                    document.getElementById("testcases").style.display = "block";

                  }
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["testOption"]: !event.target.checked,
                  }));
                }}
              />
              <label className="form-check-label" htmlFor="haveTestCases">
                Show Test Cases
              </label>
            </div>

          </div>
        </div>
        <div id="option" style={{ display: "none" }}>
          <div className="row">
            <div className="form-group col-md-5">
              <label htmlFor="option1" className="sr-only">
                Option 1
              </label>
              <input
                id="option1"
                className="form-control"
                type="text"
                name="option1"
                placeholder="Option 1"

                onChange={(event) => {
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["option1"]: event.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="option2" className="sr-only">
                Option 2
              </label>
              <input
                id="option2"
                className="form-control"
                type="text"
                name="option2"
                placeholder="Option 2"
                onChange={(event) => {
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["option2"]: event.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-5">
              <label htmlFor="option3" className="sr-only">
                Option 3
              </label>
              <input
                id="option3"
                className="form-control"
                type="text"
                name="option3"
                placeholder="Option 3"
                onChange={(event) => {
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["option3"]: event.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="option4" className="sr-only">
                Option 4
              </label>
              <input
                id="option4"
                className="form-control"
                type="text"
                name="option4"
                placeholder="Option 4"
                onChange={(event) => {
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["option4"]: event.target.value,
                  }));
                }}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="form__label">Select Correct Answer</label>
              <select className="form-select" id="answer"
                onChange={(event) => {
                  setQuestion((prevState) => ({
                    ...prevState,
                    ["answer"]: event.target.value,
                  }));

                }}
              >
                {question.option1 != '' ? <option>{question.option1}</option> : null}
                {question.option2 != '' ? <option>{question.option2}</option> : null}
                {question.option3 != '' ? <option>{question.option3}</option> : null}
                {question.option4 != '' ? <option>{question.option4}</option> : null}
              </select>
            </div>
          </div>
        </div>
        <div id="testcases" className="row" style={{ display: "none" }}>
          <div className="form-group col-lg-7">
            <label htmlFor="inputTC" className="sr-only">
              Input
            </label>
            <input
              id="inputTC"
              className="form-control"
              type="text"
              name="inputTC"
              placeholder="Input"
              onChange={(event) => {
                setTestCase((prevState) => ({
                  ...prevState,
                  ["input"]: event.target.value,
                }));
              }}
            />
          </div>
          <div className="form-group col-lg-7">
            <label htmlFor="outputTC" className="sr-only">
              Output
            </label>
            <input
              id="outputTC"
              className="form-control"
              type="text"
              name="outputTC"
              placeholder="Output"
              onChange={(event) => {
                setTestCase((prevState) => ({
                  ...prevState,
                  ["output"]: event.target.value,
                }));
              }}
            />
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="hiddenTC"
                onChange={(event) => {
                  setTestCase((prevState) => ({
                    ...prevState,
                    ["hidden"]: event.target.checked,
                  }));
                }}
              />
              <label className="form-check-label" htmlFor="hiddenTC">
                Hidden From User
              </label>

            </div>
            <div className="testbtn">
              <button
                type="button"
                className="button"
                onClick={(event) => {
                  document.getElementById("inputTC").value = "";
                  document.getElementById("outputTC").value = "";
                  document.getElementById("hiddenTC").checked = false;
                  setTestCases((state) => [...state, testcase]);
                }}
                style={{ width: "12rem" }}
              >
                Add Test Case
              </button>
            </div>

          </div>

          {TestCases ? <TestCaseTable data={TestCases} onDelete={deleteTestCase}></TestCaseTable> : null}
        </div>
        <div className="testbtn">
          <button
            type="button"
            className="button"
            onClick={() => {
              if (question["testOption"] == false) {
                question["testCases"] = TestCases
              }
              else {
                if (question["answer"] == "") {
                  if (question["option1"] != "")
                    question["answer"] = question["option1"]
                  else if (question["option2"] != "")
                    question["answer"] = question["option2"]
                  else if (question["option3"] != "")
                    question["answer"] = question["option3"]
                  else if (question["option4"] != "")
                    question["answer"] = question["option4"]
                }
              }

              dispatch(
                testActions.add({
                  Questions: question,
                }))
              document.getElementById("question").value = "";
              document.getElementById("option1").value = "";
              document.getElementById("option2").value = "";
              document.getElementById("option3").value = "";
              document.getElementById("option4").value = "";
              document.getElementById("answer").value = "";
              document.getElementById("inputTC").value = "";
              document.getElementById("outputTC").value = "";
              document.getElementById("hiddenTC").checked = false;
              setQuestions((state) => [...state, question]);
              setQuestion((prv) => ({
                ...prv,
                id: 0,
                statement: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                answer: "",
                testCases: null
              }));
              setTestCases([])
            }}
            style={{ width: "12rem" }}
          >
            Add Question
          </button>
        </div>

        <hr></hr>
        {Questions ? <QuestionTable data={Questions} editedTest={props.edited} /> : null}
        <div className="testbtn">
          <button type="submit" id="button-submit-form" className="button" onClick={sendData}>
            Submit
          </button>
          <button type="submit" className="button" onClick={() => {
            navigate("/tests")
          }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default CreateTest;
