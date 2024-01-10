"use client";

import { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import WhatsAppButton from './components/whatsappButton'

// Allowed extensions for input file
const allowedExtensions = ["csv"];

export default function Dashboard() {
  // This state will store the parsed data
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  // This function will be called when

  const [order, setOrder] = useState(0);
  // the file input changes
  
  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };

  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return setError("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      const columns = Object.values(parsedData);
      console.log(parsedData);
      const newData = columns.map((item) => {
        return { ...item, Status: "init" };
      });

      console.log(newData);
      setData(newData);
    };
    reader.readAsText(file);
  };


  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="border-pink-600 border-2">
        <div className="flex flex-row m-2">
          <label
            htmlFor="csvInput"
            className="px-3 m-3"
            style={{ display: "block" }}
          >
            Enter CSV File
          </label>
          <input
            onChange={handleFileChange}
            className=" px-3 m-3"
            id="csvInput"
            name="file"
            type="File"
          />
          <div className="bg-yellow-300 px-3 m-3 ">
            <button onClick={handleParse}>Parse</button>
          </div>
        </div>
        <div className="w-full max-w-5xl justify-between font-mono text-2xl">
          <table className=" border border-slate-400 ml-36 ...">
            <thead>
              <tr>
                <th className="border border-violet-700 px-7 py-3 ...">Name</th>
                <th className="border border-violet-700 px-7 py-3 ...">
                  PhoneNumber
                </th>
                <th className="border border-violet-700 px-7 py-3 ...">Bank</th>
                <th className="border border-violet-700 px-7 py-3 ...">
                  Content
                </th>
                <th className="border border-violet-700 px-7 py-3 ...">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, key) => (
                <tr>
                  <td
                    className="border border-violet-700 text-center ..."
                    key={key}
                  >
                    {val.Name}
                  </td>
                  <td
                    className="border border-violet-700 text-center ..."
                    key={key}
                  >
                    {val.PhoneNumber}
                  </td>
                  <td
                    className="border border-violet-700 text-center ..."
                    key={key}
                  >
                    {val.Bank}
                  </td>
                  <td
                    className="border border-violet-700 text-center ..."
                    key={key}
                  >
                    {val.Information}
                  </td>
                  <td
                    className="border border-violet-700 text-center ..."
                    key={key}
                  >
                    {val.Status}
                  </td>
                </tr>
              ))}
              
            </tbody>
            
          </table>
          <WhatsAppButton />
        </div>
        
      </div>

</main>
  );
}
