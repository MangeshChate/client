import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import { Remove, RemoveCircle, RemoveCircleOutline } from '@mui/icons-material';

function Modal({ contract, address, setModalOpen }) {

  const [shareAddress, setShareAddress] = useState(null);
  const [accessList, setAccessList] = useState([]);
  const sharing = async () => {
    await contract.allow(shareAddress);
    setModalOpen(false);
  }

  useEffect(() => {
    const access = async () => {
      const addressList = await contract.shareAccess();
      setAccessList(addressList)
      console.log(addressList)
    }
    contract && access();
  }, [contract])

  return (
    <div className='position-fixed  w-[90%] sm:w-[650px] h-[350px] sm:h-[auto] top-50 start-50 translate-middle rounded-5 blue-glassmorphism'>
      <div className=' pt-4 p-4'>
        <h1 className='fs-2 text-center fw-bold text-light mt-3'>Give Access To Your Friend</h1>
        <div action="" className='mt-3 p-3'>
          <input type="text" placeholder='Enter Address' className='custom-input rounded-5 w-full' onChange={(e) => setShareAddress(e.target.value)} />

          {/* Drop down  */}
          <div className="dropdown mt-3 ">
            <button
              className="btn white-glassmorphism  text-light rounded-4  dropdown-toggle w-100"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              People with Access
            </button>

            <div className="dropdown-menu blue-glassmorphism w-100 text-light fw-bold w-100 rounded-3 mt-3" aria-labelledby="dropdownMenuButton">
              {accessList.map((address) => (

                <a className="row d-flex justify-between mt-2 dropdown-item fw-bold font-monospace rounded-4 text-light hover:bg-gray-500" href="#">
                  <span className='col-10'>{address.user.length > 10 ? `${address.user.slice(0, 15)}...` : address.user}</span>

                  <span className='col-2'><Remove className='bg-danger rounded-5' /></span>
                </a>
              ))}


            </div>
          </div>


          <div className='d-flex gap-2'>
            <button className="btn bg-danger mt-3 text-light bg-opacity-50 rounded-5" onClick={() => setModalOpen(false)}>cancle</button>
            <button className='btn bg-primary mt-3 rounded-5 text-light bg-opacity-75' onClick={sharing}>Share</button>

          </div>
        </div>
      </div>
    </div>


  )
}

export default Modal
