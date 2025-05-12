import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "@material-ui/core/Button";
import { testActions } from "../store";
import TestCaseTable from "./TestCaseTable";
const EditQuestion = (props) => {

  const [editQuestion, seteditQuestion] = React.useState({
    id_: props.data.id,
    Statement_: props.data.statement,
    testOption_: props.data.testOption,
    option1_: props.data.option1,
    option2_: props.data.option2,
    option3_: props.data.option3,
    option4_: props.data.option4,
    answer_: props.data.answer,
    testCases_: props.data.testCases,
  });
  const [open, setOpen] = React.useState(false);
  const [TestCases, setTestCases] = React.useState([]);
  const [testcase, setTestCase] = React.useState({
    id: 0,
    input: "",
    output: "",
    hidden: false,
  });
  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    seteditQuestion((prevState) => ({
      ...prevState,
      ["testOption_"]: props.data.testOption,
    }));
    setOpen(false);
  };
  const updateOpen = (val) => {
    setOpen(val);
  }
  const [row, setRow] = React.useState()
  const dispatch = useDispatch();
  useEffect(() => {
    setRow(props.data);
    setTestCases(props.data.testCases)
  }, []);

  function deleteTestCase(data) {
    setTestCases((current) =>
      current.filter((tc) => tc.input !== data.input && tc.output !== data.output)
    );
  }
  return (

    <div>
      <button variant="outlined" color="primary" className="button"
        onClick={(event) =>
          {
            event.preventDefault()
          handleClickToOpen()}
        }>
        Edit
      </button>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"Edit Question"}</DialogTitle>
        <DialogContent >

          <form>

            <h6 className="testLabel">Add Question</h6>
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="editQuestion" className="sr-only">
                  Question
                </label>
                <input
                  id="editQuestion"
                  className="form-control "
                  type="text"
                  name="editQuestion"
                  value={editQuestion["Statement_"]}
                  placeholder="Question"
                  onChange={(event) => {
                    seteditQuestion((prevState) => ({
                      ...prevState,
                      ["Statement_"]: event.target.value,
                    }));
                  }}
                />
              </div></div>

            <div className="form-group m-2">
              <div className="form-check  form-check-inline">
                <input className="form-check-input" type="radio" name="radioOptions" id="haveOptionsforEdit"
                  checked={editQuestion["testOption_"]}

                  onChange={(event) => {
                    if (event.target.checked === true) {
                      document.getElementById("editOption").style.display = "block";
                      document.getElementById("edittestcases").style.display = "none";
                    }
                    seteditQuestion((prevState) => ({
                      ...prevState,
                      ["testOption_"]: event.target.checked,
                    }));
                  }}

                />
                <label className="form-check-label" htmlFor="haveOptionsforEdit">
                  Show Options
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="radioOptions" id="haveTestCasesforEdit"
                  onChange={(event) => {
                    if (event.target.checked === true) {
                      document.getElementById("editOption").style.display = "none";
                      document.getElementById("edittestcases").style.display = "block";
                    }
                    seteditQuestion((prevState) => ({
                      ...prevState,
                      ["testOption_"]: !event.target.checked,
                    }));
                  }}
                  checked={!editQuestion["testOption_"]}
                />
                <label className="form-check-label" htmlFor="haveTestCasesforEdit">
                  Show Test Cases
                </label>
              </div>

            </div>
            <div id="editOption" hidden={!editQuestion['testOption_']}>
              <div className="row">
                <div className="form-group col-12">
                  <label htmlFor="option1" className="sr-only">
                    Option 1
                  </label>
                  <input
                    id="option1"
                    className="form-control"
                    type="text"
                    name="option1"
                    placeholder="Option 1"
                    value={editQuestion["option1_"]}
                    onChange={(event) => {
                      seteditQuestion((prevState) => ({
                        ...prevState,
                        ["option1_"]: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="option2" className="sr-only">
                    Option 2
                  </label>
                  <input
                    id="option2"
                    className="form-control"
                    type="text"
                    name="option2"
                    placeholder="Option 2"
                    value={editQuestion["option2_"]}

                    onChange={(event) => {
                      seteditQuestion((prevState) => ({
                        ...prevState,
                        ["option2_"]: event.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <label htmlFor="option3" className="sr-only">
                    Option 3
                  </label>
                  <input
                    id="option3"
                    className="form-control"
                    type="text"
                    value={editQuestion["option3_"]}
                    name="option3"
                    placeholder="Option 3"
                    onChange={(event) => {
                      seteditQuestion((prevState) => ({
                        ...prevState,
                        ["option3_"]: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="option4" className="sr-only">
                    Option 4
                  </label>
                  <input
                    id="option4"
                    className="form-control"
                    type="text"
                    name="option4"
                    placeholder="Option 4"
                    value={editQuestion["option4_"]}

                    onChange={(event) => {
                      seteditQuestion((prevState) => ({
                        ...prevState,
                        ["option4_"]: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="form-group col-12">
                  <label className="form__label">Select Correct Answer</label>
                  <select className="form-select"
                    value={editQuestion["answer_"]} id="salarytype" onChange={(event) => {
                      seteditQuestion((prevState) => ({
                        ...prevState,
                        ["answer_"]: event.target.value,
                      }));
                    }} >
                    {editQuestion["option1_"] != '' ? <option>{editQuestion["option1_"]}</option> : null}
                    {editQuestion["option2_"] != '' ? <option>{editQuestion["option2_"]}</option> : null}
                    {editQuestion["option3_"] != '' ? <option>{editQuestion["option3_"]}</option> : null}
                    {editQuestion["option4_"] != '' ? <option>{editQuestion["option4_"]}</option> : null}

                  </select>
                </div>
              </div>
            </div>
            <div id="edittestcases" className="row" hidden={editQuestion['testOption_']}>
              <div className="form-group col-12">
                <label htmlFor="inputTCE" className="sr-only">
                  Input
                </label>
                <input
                  id="inputTCE"
                  className="form-control"
                  type="text"
                  name="inputTCE"
                  placeholder="Input"
                  onChange={(event) => {
                    setTestCase((prevState) => ({
                      ...prevState,
                      ["input"]: event.target.value,
                    }));
                  }}
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="outputTCE" className="sr-only">
                  Output
                </label>
                <input
                  id="outputTCE"
                  className="form-control"
                  type="text"
                  name="outputTCE"
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
                    id="hiddenTCE"
                    onChange={(event) => {
                      setTestCase((prevState) => ({
                        ...prevState,
                        ["hidden"]: event.target.checked,
                      }));
                    }}
                  />
                  <label className="form-check-label" htmlFor="hiddenTCE">
                    Hidden From User
                  </label>

                </div>
                <div className="testbtn">
                  <button
                    type="button"
                    className="button"
                    onClick={(event) => {
                      document.getElementById("inputTCE").value = "";
                      document.getElementById("outputTCE").value = "";
                      document.getElementById("hiddenTCE").checked = false;
                      setTestCases((state) => [...state, testcase]);
                    }}
                    style={{ width: "12rem" }}
                  >
                    Add Test Case
                  </button>
                </div>

              </div>

              {TestCases?<TestCaseTable data={TestCases} onDelete={deleteTestCase}></TestCaseTable>:null}
            </div>


          </form>
        </DialogContent>
        <DialogActions>
          <div className="testbtn">
            <button type="submit" className="button" onClick={
              (event) => {
                event.preventDefault();
                if (editQuestion["testOption_"] == false) {
                  editQuestion["testCases_"] = TestCases
                }
                else {
                  if (editQuestion["answer_"] == "") {
                    if (editQuestion["option1_"] != "")
                      editQuestion["answer_"] = editQuestion["option1_"]
                    else if (editQuestion["option2_"] != "")
                      editQuestion["answer_"] = editQuestion["option2_"]
                    else if (editQuestion["option3_"] != "")
                      editQuestion["answer_"] = editQuestion["option3_"]
                    else if (editQuestion["option4_"] != "")
                      editQuestion["answer_"] = editQuestion["option4_"]
                  }
                }
                dispatch(testActions.edit({
                  row: row,
                  editTest: editQuestion,
                }));

                setOpen(false);

              }} >
              Submit
            </button>

          </div>
          <Button onClick={handleToClose}
            color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}

export default EditQuestion