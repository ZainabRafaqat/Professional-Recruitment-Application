import axios from "axios";
import React, { useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
function ResultDialogue(props) {

    const id = localStorage.getItem("userId")
    const [open, setOpen] = React.useState(false);
    const [data1, setData1] = React.useState([]);

    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(false);
    };
    const updateOpen = (val) => {
        setOpen(val);
    }

    let getData = async () => {
        let body = {
            id: id,
            Job: props.job.id,
            Test: props.test.id
        }
        let res = await axios.post("http://127.0.0.1:8000/getTestResult/", body);
        setData1(res.data)
        setOpen(false)

    }
    useEffect(() => {
        getData()

    }, []);
    return (

        <>
            <button className="button"
                onClick={handleClickToOpen}>
                See Results
            </button>
           <Dialog className="container-fluid " open={open} onClose={handleToClose}>
                <DialogTitle className="row p-3"> Your Test Result is {data1[0]?data1[0].result:0} </DialogTitle>
                    <center>
                        <button  type="button" className="btn btn-warning m-3" autoFocus onClick={handleToClose}>Close</button>
                    </center>
            </Dialog>
            
        </>
    );

}

export default ResultDialogue;