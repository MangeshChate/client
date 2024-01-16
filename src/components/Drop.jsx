import React, { useState } from 'react';
import axios from "axios";
import { ethers } from 'ethers';
import { Delete, Remove } from "@mui/icons-material"

function Drop({ contract, account }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setFile(selectedFile);

    // Set the file name for display
    if (selectedFile) {
      setFileName(selectedFile.name);
    } else {
      setFileName('');
    }
  };

  const handleSuabmit = async (e) => {
    e.preventDefault();
    if (file) {

      try {

        const formData = new FormData();
        formData.append('file', file);

        const resFile = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,

          headers: {
            pinata_api_key: '9c7b88953bed4a983af8',
            pinata_secret_api_key: `53203490d2e84a0bdd80876d540cf493372e714d7ebdeccfc34d1692274c3ad3`,
            'Content-Type': 'multipart/form-data',
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        await contract.add(account, ImgHash);

        alert("Successfully Uploaded on a blockchain !");
        setFileName('');
        setFile(null);


      } catch (error) {
        alert("something went wrong !");
        console.log(error);
      }

    }

  }

  
  const handleRemove = () =>{
    setFile(null);
    setFileName('');
    
  }


  return (
    <div className='h-[50vh] '>
      <div className='mt-5 h-100 d-flex  justify-content-center flex-column align-items-center container white-glassmorphism gap-4'>
        <label
          htmlFor='drop'
          className='container  w-full h-1/2 lg:w-1/2 lg:h-3/4 border-3 d-flex justify-content-center align-items-center border-gray-500 border-dashed blue-glassmorphism d-flex flex-column hover:bg-transparent'
        >
          {file ? (
            <div >

              <span >

                <div className=' position-absolute top-4 right-3  w-[256px]'>
                  <Remove onClick={handleRemove} className='fw-bold cursor-pointer shadow-glow  text-light bg-danger p-1 rounded-full' />
                </div>

                <img
                  src={URL.createObjectURL(file)}
                  className='border-3 rounded-4   overflow-hidden object-cover'
                  style={{ width: '200px', height: "200px", marginBottom: '20px' }}
                  alt=''
                />
              </span>

              <span className='fw-bold text-light '>{fileName}</span>
            </div>
          ) : (
            <>
              <img
                src='https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-Transparent-File.png'
                
                alt=''
                className='w-[100px] lg:w-[200px]'
              />
              <span className='fw-bold text-light '>
                {fileName ? fileName : 'Drag & Drop Files Here'}
              </span>
            </>
          )}
          <input
            type='file'
            name=''
            className='d-none'
            id='drop'
            onChange={handleFileChange}
            disabled={!account}
          />
        </label>

        <div className='w-100 d-flex justify-content-center fw-bold'>
          <button
            className='btn text-light shadow fw-bold rounded-5 w-50 border-0'
            style={{ backgroundColor: '#2952e3' }}
            onClick={handleSuabmit}
            disabled={!file}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drop;
