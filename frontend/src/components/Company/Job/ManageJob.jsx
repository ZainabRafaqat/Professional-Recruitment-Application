import React, { useState, useEffect } from 'react';
import { renderMatches, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MultiSelect from "./multiselect";
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';

import { Grow } from '@mui/material';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function ManageJob(props) {
    const loc = useLocation();
    const id = localStorage.getItem("userId")
    const [title, settitle] = React.useState("");
    const [desc, setdesc] = React.useState("");
    const [hours, sethours] = React.useState("");
    const [salary, setsalary] = React.useState("");
    const [salarytype, setsalarytype] = React.useState("Per Year");
    const [currency, setcurrency] = React.useState("Rs/-");
    const [jobtype, setjobtype] = React.useState("Full-Time");
    const [isEdit, setIsEdit] = React.useState(false);
    const navigate = useNavigate();

    const [jobTests, setJobTests] = useState([]);
    const [test, set_test] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleClose = () => {
        setOpen(false);
    };
    const handleErrorClose = () => {
        setOpenError(false);
    };

    const getSelectValue = (selectedValue) => {
        set_test(selectedValue)
    }
    let getTestbyJob = async (id) => {
        let res = await axios.get("http://127.0.0.1:8000/getTestbyJob/" + id);
        setJobTests(res.data);
    };
    useEffect(() => {
        if (loc.state) {

            setIsEdit(true)
            getTestbyJob(loc.state.id)

            if (loc.state.title) {
                settitle(loc.state.title)
            }
            if (loc.state.description) {
                setdesc(loc.state.description)
            }
            if (loc.state.working_hours) {
                sethours(loc.state.working_hours)
            }
            if (loc.state.salary) {
                setsalary(loc.state.salary)
            }
            if (loc.state.salarytype) {
                setsalarytype(loc.state.salarytype)
            }
            if (loc.state.currency) {
                setcurrency(loc.state.currency)
            }
            if (loc.state.jobtype) {
                setjobtype(loc.state.jobtype)
            }

        }

    }, []);

    const sendData = event => {
        let isForm = document.getElementById("job-form").checkValidity();
        if (!isForm) {
            document.getElementById("job-form").reportValidity();
        }
        else {
            event.preventDefault();
            const body = {
                title: title,
                desc: desc,
                hours: hours,
                salary: salary,
                salarytype: salarytype,
                currency: currency,
                jobtype: jobtype,
                test: test,
                company: id
            };
            if (isEdit) {
                body['id'] = loc.state.id
                console.log(body)
                axios.put('http://127.0.0.1:8000/editJobs/', body)
                    .then(() => {
                        setOpen(true)
                        setMessage("Job updated successfully")
                    })
                    .catch(() => {
                        setOpenError(true)
                        setErrorMessage("Server Error")
                    });
            }
            else
                axios.post('http://127.0.0.1:8000/saveJob/', body)
                    .then(() => {
                        setOpen(true)
                        setMessage("Job created successfully")
                        resetField()
                    })
                    .catch(() => {
                        setOpenError(true)
                        setErrorMessage("Server Error")
                    });
        }
    }
    function resetField() {
        settitle("")
        setdesc("")
        sethours("")
        setsalary("")
        setsalarytype("Per Year")
        setcurrency("Rs/-")
        setjobtype("Full-Time")
        setJobTests([])
    }
    return (

        <div className="auth-inner">

            <form id="job-form" onSubmit={sendData}>
                <h3>Create Job</h3>

                <div className="form-group">
                    <label>Job Title</label>
                    <input
                        required
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        className="form-control"
                        placeholder="Enter title"
                        onChange={(event) => {
                            settitle(event.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Working Hours per Week</label>
                    <input
                        required
                        id="hours"
                        name="hours"
                        type="number"
                        min="0"
                        value={hours}
                        className="form-control"
                        placeholder="Enter Working Hours"
                        onChange={(event) => {
                            sethours(event.target.value);
                        }}
                    />
                </div>

                <div className="form-group">
                    <label>Salary</label>
                    <input
                        required
                        id="salary"
                        name="salary"
                        type="number"
                        min="0"
                        value={salary}
                        className="form-control"
                        placeholder="Enter Salary"
                        onChange={(event) => {
                            setsalary(event.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Type of Payable Salary</label>
                    <select
                        required
                        id="salarytype"
                        name="salarytype"
                        value={salarytype}
                        className="form-select"
                        placeholder="Enter Salary"
                        onChange={(event) => {
                            setsalarytype(event.target.value);
                        }}
                    >
                        <option>Per Year</option>
                        <option>Per Month</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Currency</label>
                    <select
                        required
                        id="currency"
                        name="currency"
                        value={currency}
                        className="form-select"
                        placeholder="Enter Salary"
                        onChange={(event) => {
                            setcurrency(event.target.value);
                        }}
                    >
                        <option>Rs/-</option>
                        <option>$</option>
                        <option>€</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Job Type</label>
                    <select
                        required
                        id="jobtype"
                        name="jobtype"
                        value={jobtype}
                        className="form-select"
                        placeholder="Job Type"
                        onChange={(event) => {
                            setjobtype(event.target.value);
                        }}
                    >
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>Internship</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <br />
                    <textarea
                        id="desc"
                        name="desc"
                        className="form-control"
                        placeholder="Description"
                        value={desc}
                        onChange={(event) => {
                            setdesc(event.target.value);
                        }}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Add Tests</label>
                    <br />
                    <MultiSelect className="form-control" required jobTests={jobTests}
                        onSend={getSelectValue}
                    />

                </div>

                <br />
                <br />
                <div className="row justify-content-end">
                    <button
                        type="submit"
                        className="btn col-3 m-2"
                    >
                        {!isEdit?"Create Job":"Update Job "}
                    </button>
                    <button
                        type="button "
                        className="btn col-3 m-2"
                        onClick={()=>navigate("/joblist")}
                    >Cancel
                    </button></div>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Snackbar
                        open={open}
                        autoHideDuration={4000}
                        onClose={handleClose}
                        TransitionComponent={Grow}

                        key={'jobposttransition'}
                    >
                        <Alert severity="success">
                            {message}
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={openError}
                        autoHideDuration={4000}
                        onClose={handleErrorClose}
                        TransitionComponent={Grow}

                        key={'jobposttransition'}
                    >
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </Stack>

            </form>
        </div>
    );
}

