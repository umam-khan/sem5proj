import React, { useState } from "react";
import axios from "axios";

function VirusTotalUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [analysisLink, setAnalysisLink] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    const apiKey =
      "e536bd3a33bfed7318472055dba9a2fb56c1ddda3708f0ad2d3140c00157618f";

    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("https://www.virustotal.com/api/v3/files", formData, {
        headers: {
          "x-apikey": apiKey,
        },
      })
      .then((response) => {
        const analysisLink = response.data.data.links.self;
        console.log("Upload done:", analysisLink);
        setAnalysisLink(analysisLink);
        setError(null);
      })
      .catch((error) => {
        console.error("Upload error:", error);
        setError("An error occurred while uploading and scanning the file.");
      });
  };

  const fetchAnalysisResult = async () => {
    if (!analysisLink) {
      setError("Upload a file to our server first to get analysis");
      return;
    }

    const apiKey =
      "e536bd3a33bfed7318472055dba9a2fb56c1ddda3708f0ad2d3140c00157618f";

    try {
      while (true) {
        const response = await axios.get(analysisLink, {
          headers: {
            "x-apikey": apiKey,
          },
        });

        console.log("Analysis status:", response.data.data.attributes.status);

        const status = response.data.data.attributes.status;

        if (status === "completed") {
          setResult(response.data);
          setError(null);
          break; // Exit the loop when status is completed
        } else if (status === "queued") {
          await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 5 seconds before checking again
        } else {
          console.error("Unexpected status:", status);
          setError("Unexpected status: " + status);
          break; // Exit the loop if the status is unexpected
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">
        UnHackMe's Signature + Source Code AV Detection
      </h2>
      <p className="mt-5">
        Upload your File for Scanning. It Might take a few minutes after you
        upload to get it analyzed
      </p>
      <input className="mt-5" type="file" onChange={handleFileSelect} />
      <button
        className="bg-black text-white p-2 mt-5 rounded-lg mr-8"
        onClick={handleSubmit}
      >
        Upload & Scan
      </button>
      <button
        className="bg-black text-white p-2 mt-5 rounded-lg"
        onClick={fetchAnalysisResult}
      >
        Fetch Analysis Result
      </button>
      {error && <div className="text-red-500 mt-5">{error}</div>}
      <div className="mt-5 bg-gray-200 p-5 rounded-sm">
        <h1 className="text-center font-bold text-2xl">Analysis Report</h1>
        {result && (
          <div>
            <h3>Scan Result:</h3>
            <pre>
              {JSON.stringify(result.data.attributes.results.Bkav.category, null, 2)}
            </pre>
          </div>
        )}

        {/* {result && (
          <div>
            <h1>
              {result.data.results &&
                result.data.results["Bkav"] && (
                  <div>
                    <h1>{result.data.results["Bkav"].category}</h1>
                  </div>
                )}
            </h1>
          </div>
        )} */}
      </div>
      {/* {result && (
        <div>
          <h3>Scan Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}

export default VirusTotalUploader;

// import React, { useState } from 'react';
// import axios from 'axios';

// function VirusTotalUploader() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [analysisLink, setAnalysisLink] = useState(null);
//   const [completed,setCompleted] = useState(true);

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleSubmit = () => {
//     const apiKey = 'e536bd3a33bfed7318472055dba9a2fb56c1ddda3708f0ad2d3140c00157618f';

//     if (!selectedFile) {
//       setError('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     axios
//       .post('https://www.virustotal.com/api/v3/files', formData, {
//         headers: {
//           'x-apikey': apiKey,
//         },
//       })
//       .then((response) => {
//         const analysisLink = response.data.data.links.self;
//         console.log("upload done")
//         setAnalysisLink(analysisLink);
//         setError(null);
//         setResult(null);
//       })
//       .catch((error) => {
//         console.log(error)
//         setError('An error occurred while uploading and scanning the file.');
//         setAnalysisLink(null);
//         setResult(null);
//       });
//   };

//   const fetchAnalysisResult = () => {
//     if(result){
//       if(result.data.attributes.status!='completed'){
//         setCompleted(false);
//       } else{setCompleted(true)}
//     }
//     if (!analysisLink) {
//       setError('Upload a File to our server First to get analysis');
//       return;
//     }

//     const apiKey = 'e536bd3a33bfed7318472055dba9a2fb56c1ddda3708f0ad2d3140c00157618f';

//     axios
//       .get(analysisLink, {
//         headers: {
//           'x-apikey': apiKey,
//         },
//       })
//       .then((response) => {
//         setResult(response.data);
//         console.log(response.data)
//         setError(null);
//       })
//       .catch((error) => {
//         setError(error);
//       });
//   };

//   return (
//     <div>

//       <h2 className='text-2xl font-bold'>UnHackMe's Signature + Source Code AV Detection</h2>
//       <p className='mt-5'>Upload your File for Scanning. It Might take few minutes after you upload to get it analyzed</p>
//       <input className='mt-5' type="file" onChange={handleFileSelect} />
//       <button className='bg-black text-white p-2 mt-5 rounded-lg mr-8' onClick={handleSubmit}>Upload & Scan</button>
//       <button className='bg-black text-white p-2 mt-5 rounded-lg' onClick={fetchAnalysisResult}>Fetch Analysis Result</button>
//       {error && <div className="text-red-500 mt-5">{error}</div>}
//       <div className='mt-5 bg-gray-200 p-5 rounded-sm'>
//         <h1 className='text-center font-bold text-2xl'>Analysis Report</h1>
//         {/* {completed && <div>
//           <h1>Your File is still being processed by servers. Please wait</h1>
//         </div>} */}
//         {result && (
//           <div>
//             <h1>{result && result.data && result.data.results && result.data.results["Bkav"] (
//               <div>
//                 <h1>{result.data.results["Bkav"].category}</h1>
//               </div>
//             )}</h1>
//           </div>
//         )}
//       </div>
//       {result && (
//         <div>
//           <h3>Scan Result:</h3>
//           <pre>{JSON.stringify(result, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default VirusTotalUploader;
