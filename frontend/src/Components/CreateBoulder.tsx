import { httpClient } from "@/Services/HttpClient.tsx";
import { useState } from "react";

export enum SubmissionStatus {
  NotSubmitted,
  SubmitFailed,
  SubmitSucceeded
}

export const CreateBoulder = () => {

  const [selectedFile, setSelectedFile] = useState();
  const [zone, setZone] = useState(0);
  const [color, setColor] = useState("Red");
  const [score, setScore] = useState(0);
  const [grade, setGrade] = useState(0);
  const [note, setNote] = useState("Boulder note");
  const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);

  const onFileChange = ev => {
    setSelectedFile(ev.target.files[0]);
  };

  const onUploadFile = (ev) => {
    const formData = new FormData();

    formData.append("zone", zone.toString());
    formData.append('color', color);
    formData.append("score", score.toString());
    formData.append("grade", grade.toString());
    formData.append("note", note);
    formData.append('file', selectedFile);

    // @ts-ignore
    formData.append("fileName", selectedFile.name);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      }
    };

    httpClient.post("/boulders", formData, config)
      .then( (response) => {
        console.log("Got response from uploading file", response.status);
        if (response.status === 200) {
          setSubmitted(SubmissionStatus.SubmitSucceeded);
        } else {
          setSubmitted(SubmissionStatus.SubmitFailed);
        }
      });
  };

  return (
    <div
      className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div
        className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1
          className="text-3xl font-semibold text-center text-purple-700">DaisyUI</h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Name</span>
            </label>
            <input type="text" placeholder="Name"
                   className="w-full input input-bordered input-primary" />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input type="text" placeholder="Email Address"
                   className="w-full input input-bordered input-primary" />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input type="password" placeholder="Enter Password"
                   className="w-full input input-bordered input-primary" />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input type="password" placeholder="Confirm Password"
                   className="w-full input input-bordered input-primary" />
          </div>
          <div>
            <button className="btn btn-block btn-primary">Sign Up</button>
          </div>
          <span>Already have an account ?
                    <a href="#"
                       className="text-blue-600 hover:text-blue-800 hover:underline">Login</a></span>
        </form>
      </div>
    </div>
  );

};
