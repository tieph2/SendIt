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

  const handleNumberInputChange = (e) => {
    // Remove any non-digit characters from the input value
    const sanitizedValue = e.target.value.replace(/\D/g, '');
    // Update the input value
    e.target.value = sanitizedValue;
  };

  return (
    <div className="createBoulderPage">
    <div className="max-w-md mx-auto mt-4 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Form Component</h2>
      <form>
        <div className="mb-6">
          <label htmlFor="option1" className="block font-medium mb-1">
            Zone
          </label>
          <select
            id="option1"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Which zone is the problem set in</option>
            <option value="option1">Zone 1</option>
            <option value="option2">Zone 2</option>
            <option value="option3">Zone 3</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="option2" className="block font-medium mb-1">
            Option 2
          </label>
          <select
            id="option2"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">What color is the problem</option>
            <option value="option1">Red</option>
            <option value="option2">Green</option>
            <option value="option3">Blue</option>
            <option value="option3">Yellow</option>
            <option value="option3">Black</option>
            <option value="option3">Pink</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="option3" className="block font-medium mb-1">
            What grade is the problem (V1-V7)
          </label>
          <select
            id="option3"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an option</option>
            <option value="option1">V1</option>
            <option value="option1">V2</option>
            <option value="option1">V3</option>
            <option value="option1">V4</option>
            <option value="option1">V5</option>
            <option value="option1">V6</option>
            <option value="option1">V7</option>
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
          />
        </div>

        <div className="mb-6">
          <label htmlFor="file" className="block font-medium mb-1">
            Upload an image of the boulder problem
          </label>
          <input type="file" id="file" className="w-full py-2" />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );

};




