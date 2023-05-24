import React, { useState } from 'react'
import Button from '../components/button/Button'
import axios from 'axios';
import { useEffect } from 'react';
import { API } from '../commom/const.api';
import { toast } from 'react-toastify';
import CreateIcon from '@mui/icons-material/Create';
import userService from '../services/user.service';
import { set } from 'react-hook-form';
const User = () => {
    const [showModal, setShowModal] = useState(false);
    const [showUpdateAvt, setShowUpdateAvt] = useState(false);
    const [showModalPass, setShowModalPass] = useState(false);
    const [user, setUser] = useState([])
    const [itemDetails, setItemDetails] = useState([])
    const [idOrder, setIdOrder] = useState('')
    const [indexOrder, setIndexOrder] = useState('')

    let id = localStorage.getItem('tumi_id')
    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(`${API}/users/${id}`);
            setUser(result.data.data);
            // console.log(result.data.data);
        }
        fetchData();
        
    }, []);
    const [selectedFile, setSelectedFile] = useState(null);
    const [values, setValues] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        fullName: "",
        birthday: "",
        phone: "",
        address: "",
        gender: ""
    })
    const handleInput = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdatePassword = async () => {
        console.log(id + values.oldPassword + values.newPassword);
        if (values.newPassword === values.confirmPassword) {
            try {
                const res = await axios.post(`${API}/auth/update-password`, {
                    id: id,
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword
                });
                toast.success('Update your password done')
            } catch (error) {
                console.error(error);
                toast.error('Fail')
            }
        }
        else {
            toast.error("Confirm fail !")
        }
    }

    const [token, setToken] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setToken(token);
    }, []);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': `multipart/form-data`
        },

    };
    const handleUpdateInfoUser = async () => {
        console.log(id + values.fullName + values.phone + values.gender + values.address + values.birthday);
        try {
            const response = await axios.patch(`${API}/users/`, {
                id: id,
                fullName: values.fullName,
                birthday: values.birthday,
                phone: values.phone,
                address: values.address,
                gender: values.gender
            },
                {
                    headers:
                        { Authorization: `Bearer ${token}` }
                }

            )
            toast.success('Update your infomation done')
            setShowModal(false)
        } catch (error) {

            toast.error('Fail')
        }
        // userService.changeUser(id, values.fullName, values.birthday, values.phone, values.address, values.gender)
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files);
    }
    const handleAvt = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch(`${API}/users/change-avatar`, {
                id: id,
                avatar: selectedFile
            }, config
            )
            toast.success('Update your avatar done')
        } catch (error) {
            console.error(error);
            toast.error('Fail')
        }
    }
    const [order, setOrder] = useState([])
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`${API}/orders/user/${id}`
                    , {
                        headers:
                            { Authorization: `Bearer ${accessToken}` }
                    })
                // console.log(res.data.data);
                setOrder(res.data.data)
            } catch {
                console.log('err');
            }
        }
        fetchOrder()
    }, [])

    const [modelOrder, setModelOrder] = useState(false)
    const handleSetIdOrder = (id,index) => {
        setIdOrder(id)
        setModelOrder(true)
        setIndexOrder(index)
        // console.log(dataOrder);
    }
console.log(indexOrder);
    const [modelDeleteOrder, setModelDeleteOrder] =useState(false)
    const handleDeleteOrder = async ( ) =>{
        setModelDeleteOrder(true)
    }
    const handleDelete = async () =>{
        try{
            const res = await axios.delete(`${API}/orders/${idOrder}`, config)
            toast.success('Hủy đơn thành công')
            setModelDeleteOrder(false);
            setModelOrder(false)
        }catch{
            console.log('err');
        }
    }

    return (
        <div className='flex flex-col items-center w-full'>
            <div className=" banner mt-[50px] ">
                <img src="/BannerUser.png" alt="" />
                <div className="user w-full h-[170px] relative flex">
                    <div className="user_img absolute top-[-35%] left-40 flex justify-between" >
                        <div className='flex w-[170px] h-[170px]'>
                            <img src={user.avatar ? user.avatar : `/AvtUser.png`} className='w-full h-full top-[50px] rounded-[50%] object-cover' alt="avatar" />
                            <button className='absolute cursor-pointer w-[45px] h-[45px] right-[0%] bottom-0 bg-sky-600 rounded-[50%]  hover:opacity-[0.5] text-white' onClick={() => { setShowUpdateAvt(true) }}>
                                <CreateIcon ></CreateIcon>
                            </button>

                            <h1 className='pt-[80px] font-bold text-3xl w-auto ml-3'>{user.fullName ? user.fullName : `UserName`}</h1>
                            {
                                showUpdateAvt && (
                                    <div className="modal fixed z-10 inset-0 overflow-y-auto ">
                                        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                                        <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
                                            <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                                                <div className="modal-header flex justify-between items-center pb-3">
                                                    <p className="font-bold text-2xl">Thay đổi avatar</p>
                                                    <button className="text-black close-modal" onClick={() => setShowUpdateAvt(false)}>
                                                        <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    {/* <h2 className="text-2xl font-bold mb-4 ">Change User Info</h2> */}
                                                    <div className="mb-4">
                                                        <label htmlFor="name" className="text-left block text-gray-700 font-bold mb-2">
                                                            Avatar:
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="file"
                                                            onChange={handleFileChange}
                                                            className="border border-gray-400 p-2 w-full rounded-md"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="modal-footer flex justify-end pt-2">
                                                    <button onClick={handleAvt} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Lưu</button>
                                                    <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowUpdateAvt(false)}>Hủy bỏ</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='lg:text-right md:text-right  w-full lg:mt-12 lg:mr-20 md:mt-1 sm:mt-28 mt-32' >
                        <button className={'p-2  shadow-lg shadow-indigo-800/50 py-4 text-white font-medium bg-primary transition-all rounded-md mr-5 '} onClick={() => setShowModal(true)}>Update Infomation</button>
                        <button className={'p-2  shadow-lg shadow-indigo-800/50 py-4 text-white font-medium bg-primary transition-all rounded-md'} onClick={() => setShowModalPass(true)}>Change Password</button>
                    </div>
                    {
                        showModalPass && (
                            <div className="modal fixed z-10 inset-0 overflow-y-auto ">
                                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                                <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
                                    <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                                        <div className="modal-header flex justify-between items-center pb-3">
                                            <p className="font-bold text-2xl">Thay đổi mật khẩu</p>
                                            <button className="text-black close-modal" onClick={() => setShowModalPass(false)}>
                                                <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                                            </button>
                                        </div>

                                        <div className="modal-body">

                                            {/* <h2 className="text-2xl font-bold mb-4 ">Change User Info</h2> */}
                                            <div className="mb-4">
                                                <label className="text-left block text-gray-700 font-bold mb-2">
                                                    Old password:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="oldPassword"
                                                    name='oldPassword'
                                                    onChange={handleInput}
                                                    className="border border-gray-400 p-2 w-full rounded-md"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="text-left block text-gray-700 font-bold mb-2">
                                                    New password:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="newPassword"
                                                    name='newPassword'
                                                    onChange={handleInput}
                                                    className="border border-gray-400 p-2 w-full rounded-md"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className=" text-left block text-gray-700 font-bold mb-2">
                                                    Confirm Password:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="confirmPassword"
                                                    name='confirmPassword'
                                                    onChange={handleInput}
                                                    className="border border-gray-400 p-2 w-full rounded-md"
                                                />
                                            </div>

                                        </div>

                                        <div className="modal-footer flex justify-end pt-2">
                                            <button onClick={handleUpdatePassword} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Lưu</button>
                                            <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowModalPass(false)}>Hủy bỏ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
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
                                        <button onClick={handleUpdateInfoUser} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Lưu</button>
                                        <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowModal(false)}>Hủy bỏ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='content lg:flex justify-evenly w-full  px-12'>
                <div className="info_user lg:w-[600px] md:w-full h-[450px] bg-blue-100 rounded-[40px] flex flex-col">
                    <h1 className='font-bold text-3xl w-auto ml-3 text-blue-600 mt-6'>Infomation</h1>
                    <div className='text-left ml-5 mt-5'>
                        <table>
                            <tbody>
                                <tr >
                                    <td className='p-5'>
                                        <h2 className='font-bold'>Full name</h2>
                                    </td>
                                    <td>
                                        <h2 className='font-semibold text-blue-800'>{user.fullName ? user.fullName : "Please update more"}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='p-5'>
                                        <h2 className='font-bold'>Email</h2>
                                    </td>
                                    <td>
                                        <h2 className='font-semibold text-blue-800  w-full'> <p className='break-words w-full'>{user.email ? user.email : "Please update more"}</p></h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='p-5'>
                                        <h2 className='font-bold'>Phone</h2>
                                    </td>
                                    <td>
                                        <h2 className='font-semibold text-blue-800 '>{user.phone ? user.phone : "Please update more"}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='p-5'>
                                        <h2 className='font-bold'>Address</h2>
                                    </td>
                                    <td>
                                        <h2 className='font-semibold text-blue-800'>{user.address ? user.address : "Please update more"}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='p-5'>
                                        <h2 className='font-bold'>Birthday</h2>
                                    </td>
                                    <td>
                                        <h2 className='font-semibold text-blue-800'>{user.birthday ? user.birthday : "Please update more"}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='p-5'>
                                        <h2 className='font-bold'>Gender</h2>
                                    </td>
                                    <td>
                                        <h2 className='font-semibold text-blue-800'>{user.gender ? user.gender : "Please update more"}</h2>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
                <div className="info_user lg:w-[500px] md:w-auto h-auto p-3 bg-blue-100 rounded-[40px] ">
                    <h1 className='font-bold text-3xl w-auto ml-3 text-blue-600 mt-6'>Order</h1>

                    {
                        !order ? (
                            <div>
                                NO ORDER
                            </div>
                        ) : (

                            order.map((item, index) => (
                                <div onClick={() => handleSetIdOrder(item.id, index)} key={index} className='bg-green-100 hover:bg-blue-400 hover: cursor-pointer my-1 flex justify-around  w-full h-[40px] items-center'>
                                    <h2 className='font-bold text-blue-800'>Order {index}</h2>
                                    <div className='font-semibold text-blue-800'>{new Date(item.createdDate).toLocaleString()}</div>
                                    <div className='font-semibold text-blue-800'>{item.paymentMethod}</div>
                                    <div className='font-semibold bg-green-500 p-1  ' >{item.deliveryStatus}</div>
                                    {/* <img src={item.itemDetails[index].product.images[index]} alt="" className='w-[50px] h-[50px]' />
                                    <h3>{item.itemDetails[index].product.name}</h3> */}
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
            {
                modelOrder && (
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
                                                <th class="py-2 px-4 bg-blue-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Image</th>
                                                <th className="py-2 px-4 bg-blue-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Name</th>
                                                <th className="py-2 px-4 bg-blue-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Branch</th>
                                                <th className="py-2 px-4 bg-blue-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Price</th>
                                                <th className="py-2 px-4 bg-blue-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Amount</th>
                                                <th className="py-2 px-4 bg-blue-200 font-semibold uppercase text-sm text-gray-600 border-b border-gray-300">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                // order.map((item,index)=>(
                                                    
                                                // ))
                                              
                                                order[indexOrder].itemDetails.map((item, index) => (
                                                    <tr key={index}>
                                                        <th class="py-2 px-4 border-b font-normal border-gray-300">
                                                            <img className='w-[40px] h-[40px]' src={item.product.images[0]} alt="" />
                                                        </th>
                                                        <th className="py-2 px-4 border-b font-normal border-gray-300">{item.product.name}</th>
                                                        <th className="py-2 px-4 border-b font-normal border-gray-300" >{item.product.brand}</th>
                                                        <td className="py-2 px-4 border-b border-gray-300">{item.product.price} $</td>
                                                        <td className="py-2 px-4 border-b border-gray-300">{item.amount}</td>
                                                        <td className="py-2 px-4 border-b border-gray-300">{(item.product.price * item.amount).toFixed(2)} $</td>

                                                    </tr>

                                                ))
                                                // console.log(order[0].itemDetails[0].product)
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="modal-footer flex justify-end pt-2">
                                    <button onClick={handleDeleteOrder} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Hủy đơn</button>
                                    <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setModelOrder(false)}>Quay lại</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                modelDeleteOrder && (
                    <div className="modal fixed z-20 inset-0 overflow-y-auto ">
                        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                        <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
                            <div className='modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50'>
                                <div className="modal-header flex justify-between items-center pb-3">
                                    <p className="font-bold text-2xl">Bạn chắc chắn xóa đơn hàng</p>
                                    <button className="text-black close-modal" onClick={() => setModelDeleteOrder(false)}>
                                        <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                                    </button>
                                </div>
                                <div className="modal-footer flex justify-end pt-2">
                                    <button onClick={handleDelete} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Yes</button>
                                    <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setModelDeleteOrder(false)}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>                            
                )
            }
        </div>
    )
}

export default User