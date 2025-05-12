import axios from "axios";
import React, { useEffect } from "react";
import JobCards from "./JobCards";
import SearchHeader from "./searchHeader";

function AppliedJobs(props) {

    const id = localStorage.getItem("userId")
    const [job, setJob] = React.useState([])
    let getData = async () => {
        let res = await axios.get("http://127.0.0.1:8000/getAppliedJobs/"+id);
        let data = await res.data;
        setJob(<JobCards data={data} />);
    };

    useEffect(() => {
        getData();
    }, []);

    return (

        <div >
            {job}
        </div>

    )
}

export default AppliedJobs;