import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API } from '../../../commom/const.api';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
const Orders = () => {
  
  const [order, setOrder] = useState([])
  const [user, setUser] = useState([])
  const [idOrder, setIdOrder] = useState('')
  const [modelOrder, setModelOrder] = useState(false)
  const [itemDetails, setItemDetails] = useState([])
  const [token, setToken] = useState('');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setToken(token);
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${API}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setOrder(res.data.data)
        // console.log(res.data.data[0].user);
      } catch {
        // console.log("err");
      }
    }
    fetchOrder()
  }, [])
  const handleShowOrder = async (id) => {
    setIdOrder(id);
    setModelOrder(true)

    try {
      const res = await axios.get(`${API}/orders`, config)
      // console.log(res.data.data[id-1].itemDetails);
      setUser(res.data.data[id - 1].user)
      setItemDetails(res.data.data[id - 1].itemDetails)
    } catch {
      console.log("loi");
    }
  }
  console.log(itemDetails);

  return (
    <div>
      <h1 className='font-bold text-2xl'>Order</h1>
      <div>
        <table className="table-auto h-auto w-auto ml-10 mt-10">
          <thead>
            <tr>
              <th className="bg-blue-300 border  px-4 py-2">Id</th>
              <th className="bg-blue-300 border  px-4 py-2">Address</th>
              <th className="bg-blue-300 border  px-4 py-2">Deliver Date</th>
              <th className="bg-blue-300 border  px-4 py-2">Deliver Mehthod</th>
              <th className="bg-blue-300 border  px-4 py-2">Delivery Status</th>
              <th className="bg-blue-300 border  px-4 py-2">Custormer</th>
              <th className="bg-blue-300 border  px-4 py-2">PaymentMethod</th>
              <th className="bg-blue-300 border  px-4 py-2">OrderedDate</th>
              <th className="bg-blue-300 border  px-4 py-2">Action</th>

            </tr>
          </thead>
          <tbody>
            {
              order.map((item, index) => (
                <tr key={index} className='hover:bg-blue-200 hover:scale-[1.01] transition'>
                  <td className="border px-4 py-2 ">{item.id} </td>
                  <td className="border px-4 py-2 ">{item.address} </td>
                  <td className="border px-4 py-2 "> {new Date(item.deliveredDate).toLocaleString()}</td>
                  <td className="border px-4 py-2 "> {item.deliveryMethod} </td>
                  <td className="border px-4 py-2 "> {item.deliveryStatus} </td>
                  <td className="border px-4 py-2 "> {item.fullName} </td>
                  <td className="border px-4 py-2 "> {item.paymentMethod} </td>
                  <td className="border px-4 py-2 "> {new Date(item.orderedDate).toLocaleString()} </td>
                  <td className="border text-left px-4 py-2 flex justify-center">
                    <div className='mx-3 cursor-pointer'
                      onClick={() => handleShowOrder(item.id)}
                    >
                      <VisibilityIcon className='hover:text-white'></VisibilityIcon></div>
                    {/* <div className='mx-3 cursor-pointer'><DeleteIcon className='hover:text-white'  ></DeleteIcon></div> */}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        modelOrder && user && (
            <div className="modal fixed z-10 inset-0 overflow-y-auto ">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
              <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                <div className="modal-header flex justify-between items-center pb-3">
                  <p className="font-bold text-2xl">Order Detail</p>
                  <button className="text-black close-modal" onClick={() => setModelOrder(false)}>
                    <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                  </button>
                </div>

                <div className="modal-body">
                  <table class="min-w-full">
                    <thead>
                      <tr>
                        <th class="py-2 px-4 bg-gray-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Full Name</th>
                        <th class="py-2 px-4 bg-gray-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Email</th>
                        <th class="py-2 px-4 bg-gray-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Address</th>
                        <th class="py-2 px-4 bg-gray-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Gender</th>
                        <th class="py-2 px-4 bg-gray-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Birthday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="py-2 px-4 border-b border-gray-300">{user.fullName}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{user.email}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{user.address}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{user.gender}</td>
                        <td class="py-2 px-4 border-b border-gray-300">{user.birthday}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <table class="min-w-full">
                    <thead>
                      <tr>
                      <th class="py-2 px-4 bg-gray-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Images</th>
                        <th class="py-2 px-4 bg-gray-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Name</th>
                        <th class="py-2 px-4 bg-gray-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Branch</th>
                        <th class="py-2 px-4 bg-gray-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Price</th>
                        <th class="py-2 px-4 bg-gray-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Amount</th>
                        <th class="py-2 px-4 bg-gray-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                        itemDetails && itemDetails.map((item,index) => (
                          <tr>
                            <td class="py-2 px-4 border-b border-gray-300">
                              <img className='w-[40px] h-[40px]' src={item.product.images[0]} alt="" />
                            </td>
                            <td class="py-2 px-4 border-b border-gray-300">{item.product.name}</td>
                            <td class="py-2 px-4 border-b border-gray-300">{item.product.brand}</td>
                            <td class="py-2 px-4 border-b border-gray-300">{item.product.price}$ </td>
                            <td class="py-2 px-4 border-b border-gray-300">{item.amount}</td>
                            <td class="py-2 px-4 border-b border-gray-300">{(item.product.price * item.amount).toFixed(2)}$ </td>
                          </tr>
                          ))
                        }
                    </tbody>
                  </table>
                </div>

                <div className="modal-footer flex justify-end pt-2">
                  <button className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Submit</button>
                  <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setModelOrder(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          )
      }
    </div>
  )
}

export default Orders