import axios from "axios";
import React, { useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import LoadingSpinner from "../../Test/AttemptTest/LoadingSpinner";
function DeleteJob(props) {

    const [open, setOpen] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(false);
    };
    const updateOpen = (val) => {
        setOpen(val);
    }

    let deleteJob = async () => {
        setLoading(true)
        let res = await axios.delete("http://127.0.0.1:8000/deleteJob/"+props.data.id);
        props.ondeleteJob(props.data.id)
        setLoading(false)
        setOpen(false)

    }
    return (
        <>
            {loading ? <center><LoadingSpinner /></center> :
                <>
                    <button className="button"
                        onClick={handleClickToOpen}>
                        Delete
                    </button>
                    <Dialog open={open} onClose={handleToClose}>
                        <DialogTitle>{"Are you sure, you want to delete Job?"}</DialogTitle>
                        <DialogActions>
                            <button type="button" className="btn btn-danger" onClick={() => {
                                deleteJob()
                            }}
                            >Confirm</button>
                            <button type="button" className="btn btn-warning" autoFocus onClick={handleToClose}>Close</button>

                        </DialogActions>
                    </Dialog>
                </>
            }
        </>);

}

export default DeleteJob;