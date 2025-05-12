import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function ShowMCQ(props) {

    const [question, setQuestion] = React.useState("");

    const [answer, setAnswer] = React.useState("");
    let setData = () => {
        setQuestion(props.data);
    };
    useEffect(() => {
        setData();

    }, [question]);
    console.log(props.data)
    return (
        <>
            {question != null || question != undefined ? <>
                <p className="TLabel">{question.statement}</p>


                <form >
                    <div id="options">

                        <div className="TParagraph">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="option" id="option1" onClick={() => setAnswer(question.option1)}
                                />
                                <label className="form-check-label" htmlFor="option1">
                                    {question.option1}
                                </label>
                            </div>

                            <div className="form-check" >
                                <input className="form-check-input" type="radio" name="option" id="option2" onClick={() => setAnswer(question.option1)} />
                                <label className="form-check-label" htmlFor="option2">
                                    {question.option2}
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="option" id="option3" onClick={() => setAnswer(question.option1)} />
                                <label className="form-check-label" htmlFor="option3">
                                    {question.option3}
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="option" id="option4" onClick={() => setAnswer(question.option1)} />
                                <label className="form-check-label" htmlFor="option4">
                                    {question.option4}
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </> : null}

        </>);
}