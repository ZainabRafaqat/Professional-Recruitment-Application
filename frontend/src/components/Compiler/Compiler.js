import React, { Component } from "react";

import "./Compiler.css";
export default class Compiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ``,
      output: ``,
      language_id: localStorage.getItem('language_Id') || 2,
      user_input: ``,
    };
    this.defaultInput();
  }

  async componentDidMount() {
    await this.defaultInput(this.state.language_id)
    this.props.language_id(this.state.language_id)
    this.props.input(this.state.input)
    this.props.stdin(this.state.user_input)
  }
  defaultInput = async (e) => {
    let parameters = "";
    console.log(this.props.parameters)
    for (let s = 0; s < this.props.parameters; s++) {
      if (s > 0)
        parameters = parameters + ","
      if (e != 71)
        parameters = parameters + "int "
      parameters = parameters + 'x' + s.toString()
    }

    if (e == 54) {

      this.setState({ input: `#include <iostream>\nusing namespace std;\nvoid func(` +  parameters  + `)\n{\n}` })
    }
    else if (e == 50) {
      this.setState({ input: `#include <stdio.h>\n\nvoid func(` +  parameters  + `)\n{\n}` })
    }
    else if (e == 62) {
      this.setState({ input: `class Test {\n\tpublic static void func(` +  parameters  + `)\n\t{\n\t\t\n\t}\n}` })
    }
    else if (e == 71) {
      this.setState({ input: `def func(` +  parameters  + `):\n\t` })

    }
  }
  input = (event) => {

    event.preventDefault();

    this.setState({ input: event.target.value });
    localStorage.setItem('input', event.target.value)
    this.props.input(document.getElementById("source").value)

  };
  userInput = (event) => {
    event.preventDefault();
    this.setState({ user_input: event.target.value });
    this.props.stdin(document.getElementById("input").value)
  };
  language = (event) => {
    event.preventDefault();

    this.setState({ language_id: event.target.value });
    localStorage.setItem('language_Id', event.target.value)
    this.defaultInput(event.target.value)
    this.props.language_id(document.getElementById("tags").value)
  };


  submit = async (e) => {
    e.preventDefault();

    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Creating Submission ...\n";
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key": "a87fd29425msh85e83115e23814cp15ed67jsn19a19d8095de", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: this.state.input,
          stdin: this.state.user_input,
          language_id: this.state.language_id,
        }),
      }
    );
    outputText.innerHTML += "Submission Created ...\n";
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
      outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": "a87fd29425msh85e83115e23814cp15ed67jsn19a19d8095de", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
          },
        });

        jsonGetSolution = await getSolution.json();
      }
    }
    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);

      outputText.innerHTML = "";

      // this.props.Output({
      //   source_code: this.state.input,
      //   stdin: this.state.user_input,
      //   language_id: this.state.language_id,
      // });
      outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);

      outputText.innerHTML = "";

      outputText.innerHTML += `\n Error :${error}`;
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);

      outputText.innerHTML = "";

      outputText.innerHTML += `\n Error :${compilation_error}`;
    }
  };
  render() {

    return (
      <>
        <div className="row container-fluid">

          <div className="col-12 ml-4">
            <div className="alert alert-warning" role="alert">
              <b>
                Follow the following instructions else your result will be marked zero.</b>
              <p>
                <br></br>
                Only write code within the function.
              </p>
              <p>
                No Code outside the function is allowed. Only libraries are allowed to call outside the function
              </p>
              <p>
                Remove the extra code that you wrote outside the function (except library) to check output, else you will be graded zero
              </p>
            </div>
          </div>
          <div className="col-12 ml-4">
            <button
              type="submit"
              className="btn btn-danger ml-2 mr-2 "
              onClick={
                this.submit
              }
            >
              <i className="fas fa-cog fa-fw"></i> Run
            </button>

            <label htmlFor="tags" className="m-3">
              <b className="heading">Choose Language here:</b>
            </label>
            <select
              value={this.state.language_id}
              onChange={this.language}
              id="tags"
              className="form-control form-inline m-2 language"
            >
              <option value="54">C++</option>
              <option value="50">C</option>
              <option value="62">Java</option>
              <option value="71">Python</option>
            </select>
          </div>
          <div className="col-6 ml-4 ">

            <label htmlFor="solution ">
              <span className="badge badge-info heading mt-2 ">
                <i className="fas fa-code fa-fw fa-lg"></i> Code Here
              </span>
            </label>
            <textarea
              required
              name="solution"
              id="source"
              onChange={this.input}
              className=" source"
              value={this.state.input}
            ></textarea>


          </div>
          <div className="col-6">
            {/* <div className="row">

              <span className="badge badge-primary heading ">
                <i className="fas fa-user fa-fw fa-md"></i> User Input
              </span>
              <br />
              <textarea id="input" onChange={this.userInput}></textarea>

            </div> */}
            <div className="row mt-2 ml-5">
              <span className="badge badge-info heading">
                <i className="fas fa-exclamation fa-fw fa-md"></i> Output
              </span>
              <textarea id="output" readOnly></textarea>
            </div>
          </div>
        </div>


      </>
    );
  }
}
