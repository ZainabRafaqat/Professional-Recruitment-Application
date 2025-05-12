import React, { useEffect, useState } from "react";
import axios from "axios";

import CountdownTimer from "./Timer/Timer";
import LoadingSpinner from "./LoadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";
import Compiler from "../../Compiler/Compiler";
export default function TestQuestion() {

    const location = useLocation();
    const navigate = useNavigate();
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState("");
    const [result, setResult] = React.useState(0);
    const [isCompiler, setCompiler] = React.useState(false);

    const [input, setInput] = React.useState('');
    const [stdin, setStdin] = React.useState('');
    const [language, setLanguage] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [timer, setTime] = React.useState();
    const [Nexttimer, setNextTime] = React.useState();
    const [testCases, seTestCases] = React.useState([]);
    const [lengthTC, setlengthTC] = React.useState(1);
    const [TimeUp, setTimeUp] = React.useState(false);
    let setData = () => {
        setQuestion(location.state.test.Questions[location.state.QIndex]);

    };

    useEffect(() => {
        if (location.state.nextTime == null || location.state.nextTime == undefined) {
            const TIME_IN_MS = 1 * 1 * location.state.timeForTest * 60 * 1000;
            const NOW_IN_MS = new Date().getTime();

            const TimeForTest = NOW_IN_MS + TIME_IN_MS
            setTime(TimeForTest)

        }
        else {
            setTime(location.state.nextTime)
        }
        setData();
        if (question.testOption === false) {
            document.getElementById("options").style.display = "none";
            document.getElementById("compiler").style.display = "block";
            setCompiler(true);
        }
        else if (question.testOption === true) {
            document.getElementById("options").style.display = "block";
            document.getElementById("compiler").style.display = "none";
            setCompiler(false);
        }
        let arrayTC = location.state.test.Questions[location.state.QIndex].testcases

        if (arrayTC != null || arrayTC != undefined) {
            for (let i = 0; i < arrayTC.length; i++) {
                let temp = arrayTC[i].input.toString()
                arrayTC[i].input = temp.split(',');
            }
            setlengthTC(arrayTC[0].input.length)
        }
    }, [question, lengthTC]);
    const handleInput = async (val) => {
        setInput(val)
    }
    const handleTimeUp = async (val) => {
        setTimeUp(val)
    }
    const setCurrentTime = async (val) => {
        setNextTime(val)
    }
    const handleStdin = async (val) => {
        setStdin(val)
    }
    const handleLanguage = async (val) => {
        setLanguage(val)
    }
    function refreshPage() {
        window.location.reload();
    }


    return (
        <>
            {TimeUp? navigate("/result", { state: { result: result, test: location.state.test, job: location.state.job, user: location.state.user, time_started: location.state.time_started, } })
             : <div className="auth-inner2">
                {loading ? <center><LoadingSpinner /></center> : <>

                    <div className="row justify-content-center align-items-center">
                        <div className="col-12">
                            <CountdownTimer targetDate={timer} handleTimer={setCurrentTime} /></div>
                    </div>
                    <h3>{location.state.test.test_Name} Test</h3>
                    <hr></hr>

                    <p className="TLabel"> Question</p>
                    <div className="TParagraph"><p >{question.statement}</p> </div>
                    <form >
                        <div id="options">
                            <p className="TLabel">Select from the following</p>
                            <div className="TParagraph">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="option" id="option1" onClick={() => setAnswer(question.option1)} />
                                    <label className="form-check-label" htmlFor="option1">
                                        {question.option1}
                                    </label>
                                </div>

                                <div className="form-check" >
                                    <input className="form-check-input" type="radio" name="option" id="option2" onClick={() => setAnswer(question.option2)} />
                                    <label className="form-check-label" htmlFor="option2">
                                        {question.option2}
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="option" id="option3" onClick={() => setAnswer(question.option3)} />
                                    <label className="form-check-label" htmlFor="option3">
                                        {question.option3}
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="option" id="option4" onClick={() => setAnswer(question.option4)} />
                                    <label className="form-check-label" htmlFor="option4">
                                        {question.option4}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div id="compiler">


                            <div className="row container-fluid">
                                {TestCase()}
                            </div>
                            <Compiler parameters={lengthTC} input={handleInput} stdin={handleStdin} language_id={handleLanguage} />
                        </div>
                    </form>
                    <div className="testbtn">
                        <button type="button" className="button" onClick={() => Next()} disabled={loading}>
                            Next
                        </button>
                    </div></>
                }
            </div>
                }

        </>);
    async function Next() {
        let index = location.state.QIndex;
        let result = location.state.result;
        let Answers = location.state.answers

        let QAnswer = {
            Tid: location.state.test.id,
            Qid: location.state.test.Questions[index].id,
            answer: answer
        }
        Answers.push(QAnswer)
        if (question.testOption === true) {
            if (answer != null || answer != undefined) {
                if (question.correct_answer === answer.trim()) {
                    result = result + 1;
                }
            }
        }
        else {
            setLoading(true);
            let r = await checkTestCases();
            setLoading(false);
            result = result + r;
        }
        index = index + 1
        if (index < location.state.test.Questions.length) {
            console.log(result)
            navigate("/testquestion", { state: { answers: Answers, test: location.state.test, QIndex: index, result: result, job: location.state.job, user: location.state.user, time_started: location.state.time_started, nextTime: Nexttimer } })
            refreshPage()
        }
        else {
            // for (let i = 0; i < Answers.length; i++) {
            //     const body = {
            //         Tid: Answers[i].Tid,
            //         Qid: Answers[i].Qid,
            //         answer: Answers[i].answer,
            //     };
            // axios
            //     .post(`http://127.0.0.1:8000/saveTestAns/`, body)
            //     .then((response) => {
            //     })
            //     .catch((error) => {
            //         alert(error);
            //     });
            // }

            navigate("/result", { state: { result: result, test: location.state.test, job: location.state.job, user: location.state.user, time_started: location.state.time_started, } })
        }
    }
    function TestCase() {
        let index = location.state.QIndex;
        let testcases = location.state.test.Questions[index].testcases;

        let testcase = [];


        if (testcases) {
            for (let i = 0; i < testcases.length; i++) {
                let TCinput = ""
                for (let s = 0; s < testcases[i].input.length; s++) {
                    if (s > 0)
                        TCinput += ","
                    TCinput += testcases[i].input[s]
                }
                if (testcases[i].hidden !== true) {

                    testcase.push(<>
                        <div className="col-5">
                            <hr></hr>
                            <h5><b>Test Case {i + 1}</b></h5>

                            <p><b>Input</b> {TCinput}</p>
                            <p><b>Output</b> {testcases[i].output}</p>
                        </div></>
                    );
                }
            }
        }
        return testcase;
    }
    async function checkTestCases() {
        let index = location.state.QIndex;
        let testcases = location.state.test.Questions[index].testcases;
        let finalInput, output, result = 0;
        for (let i = 0; i < testcases.length; i++) {
            finalInput = callFunctioninInput(testcases[i].input);
            output = await callCompiler(finalInput)

            if (output !== null) {

                output = output.trim()
                if (output !== testcases[i].output) {
                    result = 0;
                    break;
                }
                else {

                    result = 1;
                }
            }
            else {
                result = 0;
                break;
            }


        }
        return result;
    }
    function callFunctioninInput(inp) {
        let parameters = ""
        for (let s = 0; s < inp.length; s++) {
            if (s > 0)
                parameters = parameters + ","

            parameters = parameters + inp[s]
        }
        if (language == 54) {
            return (input + `\nint main(){\n\tfunc(` + parameters + `);\n\treturn 0;\n}`);
        }
        else if (language == 50) {
            return (input + `\nint main(){\n\tfunc(` + parameters + `);\n\treturn 0;\n}`);
        }
        else if (language == 62) {
            let temp = input;
            temp = temp.trim()
            temp = temp.slice(0, -1)
            return (temp + `\n\tpublic static void main(String[] args) {\nfunc(` + parameters + `);\n\t}\n}`);
        }
        else if (language == 71) {
            return (input + `\nfunc(` + parameters + `)`);

        }
    }
    async function callCompiler(inp) {
        const response = await fetch(
            "https://judge0-ce.p.rapidapi.com/submissions",
            {
                method: "POST",
                headers: {
                    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                    "x-rapidapi-key": "a87fd29425msh85e83115e23814cp15ed67jsn19a19d8095de",
                    "content-type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify({
                    source_code: inp,
                    stdin: stdin,
                    language_id: language,
                }),
            }
        );
        const jsonResponse = await response.json();

        let jsonGetSolution = {
            status: { description: "Queue" },
            stderr: null,
            compile_output: null,
        };

        while (
            jsonGetSolution.status.description !== "Accepted" &&
            jsonGetSolution.stderr == null &&
            jsonGetSolution.compile_output == null
        ) {
            if (jsonResponse.token) {
                let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

                const getSolution = await fetch(url, {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                        "x-rapidapi-key": "a87fd29425msh85e83115e23814cp15ed67jsn19a19d8095de",
                        "content-type": "application/json",
                    },
                });

                jsonGetSolution = await getSolution.json();
            }
        }
        if (jsonGetSolution.stdout) {
            const output = atob(jsonGetSolution.stdout);
            return output;
        }
        else if (jsonGetSolution.stderr) {
            const error = atob(jsonGetSolution.stderr)
            console.log(`\n Error :${error}`);
            return null;
        } else {
            const compilation_error = atob(jsonGetSolution.compile_output);

            console.log(`\n Error :${compilation_error}`);
            return null;
        }
    }
}