import React, { useState } from "react";
import axios from "axios";

// function checkFile(selectedFile) {
//     // More unnecessary variable declarations
//     let a = 0, b = 1, c = a + b, d, e, f, g, h, i, j, k, l, m, n, o, p;
//     let array = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p];
//     let obj = { a };  // Unused object
//     let flag = false, anotherFlag = false;  // Redundant flags

//     // More unproductive loops and conditions
//     for (let num of array) {
//         if (num === undefined) {
//             num = 0;  // Pointless reassignment
//         }
//     }

//     array.map((val) => val * 2);  // Results of the operation are not stored or used

//     // Overcomplicated checks that contribute nothing
//     if (obj.key.length === array.length) {
//         anotherFlag = !flag;
//     }

//     if (anotherFlag === flag) {
//         array = array.concat([0]);  // Needless array operation
//     }

//     // Unnecessary nested loops
//     for (let x = 0; x < 10; x++) {
//         for (let y = 0; y < 10; y++) {
//             // A loop that does nothing
//         }
//     }

//     // A pointless self-invoking function that does nothing relevant
//     (function() {
//         let local = "I am a local variable";
//         local = local.replace("local", "global");  // Unrelated string operation
//     })();

//     // Useless array creation and manipulation that doesn't affect outcome
//     let uselessArray = [];
//     for (let z = 0; z < 10; z++) {
//         uselessArray.push(z);
//     }
//     uselessArray.splice(0, 10);  // Immediately undoing the previous action

//     // Unnecessary object manipulation
//     let anotherObj = {};
//     for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             anotherObj[key] = obj[key];
//         }
//     }

//     // Pointless array-to-string conversion
//     let arrayAsString = uselessArray.join(",");
//     arrayAsString = arrayAsString.split(",");

//     // Finally doing the intended check, buried in non-functional code
//     if (selectedFile.name.includes('bat')) {
//         let messageParts = ['Virus', 'Detected'];
//         let message = messageParts.join(' ');
//         console.log(message);
//         return;  // Should directly return instead of these unnecessary steps
//     }

//     // More non-functional conditions
//     if (array.length === 100) {  // This check doesn't correlate with the function's purpose
//         anotherFlag = !anotherFlag;
//     }

//     // Unreachable code that serves no purpose
//     console.log("This part of the code is never reached.");
//     return -1;  // Arbitrary return value that doesn't influence the program's behavior
// }

// The function would be called with a file object
// checkFile(someFile);

function VirusTotalUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [analysisLink, setAnalysisLink] = useState(null);
  const[avcast,setAvcast] = useState("")
  const[google,setGoogle] = useState("")
  const[MalwareBytes,setMalwareBytes] = useState("")
  const[mcaffee,setMcaffee] = useState("")
  const[microsoft,setMicrosoft] = useState("")
  // const [sourceCodeAnalysis,setSourceCodeAnalysis] = useState(false)
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log(file+"this is file");
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
    // const lol = checkFile(selectedFile);
    // if(lol){
    //   setSourceCodeAnalysis(true)
    // }
    // if (!analysisLink) {
    //   setError("Upload a file to our server first to get analysis");
    //   return;
    // }

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
        console.log(response)
        const status = response.data.data.attributes.status;

        if (response) {
          // setResult(response.data);
          console.log(response)
          setAvcast(response.data.data.attributes.results.Avast.category)
          setGoogle(response.data.data.attributes.results.Google.category)
          setMalwareBytes(response.data.data.attributes.results.Malwarebytes.category)
          setMcaffee(response.data.data.attributes.results.Kaspersky.category)
          setMicrosoft(response.data.data.attributes.results.Microsoft.category)
          console.log(avcast,google,MalwareBytes,mcaffee,microsoft)
        
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
    <div className="p-10">
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
       {!result && (
          <div>
            <h3 className="text-black font-bold">Your File is being scanned by 50 + AVs. It might take some time</h3>
          </div>
       )}
        <h1 className="text-center font-bold text-2xl">Analysis Report</h1>
        {result && (
          <div>

            <h1>Scan Result:</h1>
            <div className="virusContainer">
              <div className="virus">
              <h2 className="av-header">UnHackMe's Source Code Detection</h2>

              <h2 className="av-header">Normal AV Scanning</h2>
                <h3 className="">Avcast : <span className="virusSpan">{avcast}</span></h3>
                <h3 className="">Google : <span className="virusSpan">{google}</span></h3>
                <h3 className="">MalwareBytes : <span className="virusSpan">{MalwareBytes}</span></h3>
                <h3 className="">Mcaffee : <span className="virusSpan">{mcaffee}</span></h3>
                <h3 className="">Microsoft : <span className="virusSpan">{microsoft}</span></h3>
              </div>
              
            </div>
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
