import React from 'react'
import { API } from '../../../commom/const.api'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify'
const Customers = () => {
  const [customer, setCustomer] = useState([])
  const [token, setToken] = useState('');
  const [idUser, setIdUser] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setToken(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchCustomer() {
      const res = await axios.get(`${API}/users`, config)
      setCustomer(res.data.data)
    }
    fetchCustomer()
  }, [])
  const handleEditUser = (id) => {
    setIdUser(id)
    setShowModal(true)
  }
  const [values, setValues] = useState({
    fullName: "",
    birthday: "",
    phone: "",
    address: "",
    gender: ""
  })
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  const handleUpdateUser = async () => {

    try {
      const response = await axios.patch(`${API}/users/`, {
        id: idUser,
        fullName: values.fullName,
        birthday: values.birthday,
        phone: values.phone,
        address: values.address,
        gender: values.gender
      }, config
      )
      toast.success('Update your infomation done')
    } catch (error) {

      toast.error('Fail')
    }
  }
  const handleDelete = (id) =>{
    setIdUser(id)
    setShowModalDelete(true)
  }
  const handleDeleteUser  = async () =>{
    try{
      const res = axios.delete(`${API}/users/${idUser}`, config)
      toast.success('Done')
    }catch{
      toast.error('Fail')
    }
  } 
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 mt-5">Customers</h1>
      <table className="table-auto h-auto w-auto ml-10">
        <thead>
          <tr>
            <th className="bg-blue-300 border  px-4 py-2">Id</th>
            <th className="bg-blue-300 border  px-4 py-2">Name</th>
            <th className="bg-blue-300 border  px-4 py-2">Email</th>
            <th className="bg-blue-300 border  px-4 py-2">Phone</th>
            <th className="bg-blue-300 border  px-4 py-2">Birthday</th>
            <th className="bg-blue-300 border  px-4 py-2">Gender</th>
            <th className="bg-blue-300 border  px-4 py-2">Action</th>
            <th className="bg-blue-300 border  px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {
            customer.map((item, index) => (
              <tr key={index} className='hover:bg-blue-200 hover:scale-[1.01] transition'>

                <td className="border px-4 py-2 ">{item.id} </td>
                <td className="border text-left  px-4 py-2">{item.fullName}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{`${item.phone}` ? `${item.phone}` : "Update later"}</td>
                <td className="border px-4 py-2">{`${item.birthday}` ? `${item.birthday}` : "Update later"}</td>
                <td className="border px-4 py-2">{`${item.gender}` ? `${item.gender}` : "Update later"}</td>
                <td className="border px-4 py-2">{`${item.address}` ? `${item.address}` : "Update later"}</td>
                <td className="border text-left px-4 py-2 flex justify-center">
                  <div className='mx-3 cursor-pointer'
                    onClick={() => handleEditUser(item.id)}
                  >
                    <ModeEditIcon className='hover:text-white'></ModeEditIcon></div>
                  <div className='mx-3 cursor-pointer'><DeleteIcon className='hover:text-white' onClick={()=>handleDelete(item.id)} ></DeleteIcon></div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {showModal && (
        <div className="modal fixed z-10 inset-0 overflow-y-auto ">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
              <div className="modal-header flex justify-between items-center pb-3">
                <p className="font-bold text-2xl">Thay đổi thông tin cá nhân</p>
                <button className="text-black close-modal" onClick={() => setShowModal(false)}>
                  <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                </button>
              </div>

              <div className="modal-body">

                {/* <h2 className="text-2xl font-bold mb-4 ">Change User Info</h2> */}
                <div className="mb-4">
                  <label className="text-left block text-gray-700 font-bold mb-2">
                    Full mame:
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    onChange={handleInput}
                    className="border border-gray-400 p-2 w-full rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className=" text-left block text-gray-700 font-bold mb-2">
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name='phone'
                    onChange={handleInput}
                    className="border border-gray-400 p-2 w-full rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className=" text-left block text-gray-700 font-bold mb-2">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name='address'
                    onChange={handleInput}
                    className="border border-gray-400 p-2 w-full rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <label className=" text-left block text-gray-700 font-bold mb-2">
                    BirthDay:
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    name='birthday'
                    onChange={handleInput}
                    className="border border-gray-400 p-2 w-full rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className=" text-left block text-gray-700 font-bold mb-2">
                    Gender:
                  </label>
                  <input
                    type="text"
                    id="gender"
                    name='gender'
                    onChange={handleInput}
                    className="border border-gray-400 p-2 w-full rounded-md"
                  />
                </div>
              </div>

              <div className="modal-footer flex justify-end pt-2">
                <button onClick={handleUpdateUser} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Lưu</button>
                <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowModal(false)}>Hủy bỏ</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {
        showModalDelete && (
          <div className="modal fixed z-10 inset-0 overflow-y-auto ">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
              <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                <div className="modal-header flex justify-between items-center pb-3">
                  <p className="font-bold text-2xl">Delete user</p>
                  <button className="text-black close-modal" onClick={() => setShowModalDelete(false)}>
                    <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                  </button>
                </div>

                <div className="modal-body">

                  <h2 className="text-xl mb-4 "> Are you sure</h2>

                </div>

                <div className="modal-footer flex justify-end pt-2">
                  <button onClick={handleDeleteUser} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Submit</button>
                  <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowModalDelete(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>

  )
}

export default Customers