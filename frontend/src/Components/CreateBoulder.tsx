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
          console.log("Submission failed");
        }
      });
  };

  const handleNumberInputChange = (e) => {
    // Remove any non-digit characters from the input value
    const sanitizedValue = e.target.value.replace(/\D/g, '');
    // Update the input value
    e.target.value = sanitizedValue;
    setScore(e.target.value);
  };

  return (
    <div className="createBoulderPage">
      <div className="max-w-md mx-auto mt-4 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Create a boulder problem</h2>
          <div className="mb-6">
            <label htmlFor="zone-selection" className="block font-medium mb-1">
              Zone
            </label>
            <select
              id="zone-selection"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setZone(parseInt(e.target.value))}

            >
              <option value="">Which zone is the problem set in</option>
              <option value="1">Zone 1</option>
              <option value="2">Zone 2</option>
              <option value="3">Zone 3</option>
              <option value="4">Zone 4</option>

            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="color-selection" className="block font-medium mb-1">
              Color
            </label>
            <select
              id="color-selection"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setColor(e.target.value)}
            >
              <option value="">What color is the problem</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
              <option value="black">Black</option>
              <option value="pink">Pink</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="grade-selection" className="block font-medium mb-1">
              What grade is the problem (V1-V7)
            </label>
            <select
              id="grade-selection"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setGrade(parseInt(e.target.value))}
            >
              <option value="">Select an option</option>
              <option value="1">V1</option>
              <option value="2">V2</option>
              <option value="3">V3</option>
              <option value="4">V4</option>
              <option value="5">V5</option>
              <option value="6">V6</option>
              <option value="7">V7</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="numberInput" className="block font-medium mb-1">
              Score
            </label>
            <input
              type="text"
              id="numberInput"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a number"
              onInput={handleNumberInputChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="textInput" className="block font-medium mb-1">
              Note
            </label>
            <input
              type="text"
              id="textInput"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sit start, bat-hang, etc..."
              onChange={e => setNote(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="boulderpic" className="block font-medium mb-1">
              Upload an image of the boulder problem
            </label>
            <input
              type="file"
              id="boulderpic"
              className="w-full py-2"
              name="boulderpic"
              accept={"image/png, image/jpeg"}
              onChange={onFileChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={onUploadFile}
          >
            Submit
          </button>
        {
          submitted === SubmissionStatus.SubmitFailed &&
          <h3 className="text-red-500 text-center">Error. Could not create boulder!</h3>
        }
        {
          submitted === SubmissionStatus.SubmitSucceeded &&
          <h3 className="text-green-500 text-center">Boulder created!</h3>
        }
      </div>
    </div>
  );

};




