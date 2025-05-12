import JobCard from "./JobCard";
import JobCardEmployer from "./JobCardEmployer";
let usertype = localStorage.getItem("isUser");
console.log(usertype)
function JobCards(props) {
  let jobs = [];
  for (let i = 0; i < props.data.length; i++) {
    if(usertype ==='Candidate'|| usertype ===''|| usertype===undefined){
      jobs.push(<JobCard id={i} key={i} data={props.data[i]}/>);

    }
    else if(usertype ==='Company Executive'){
      jobs.push(<JobCardEmployer id={i} key={i} data={props.data[i]}/>);

    }
   
  }
  return jobs;
}
export default JobCards;
