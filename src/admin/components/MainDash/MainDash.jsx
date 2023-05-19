import React, { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import axios from "axios";
import { API } from "../../../commom/const.api";
const MainDash = () => {
  const [total, setTotal] = useState('')
  const [totalDate, setTotalDate] = useState('')
  const token = localStorage.getItem('accessToken');
  const [dateIn,setDateIn] = useState('')
  const [dateOut,setDateOut] = useState('')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const handleDateInChange = (e) =>{
    e.preventDefault()
    setDateIn(e.target.value)

  }

  const handleDateOutChange = (e) =>{
    e.preventDefault()
    setDateOut(e.target.value)

  }
  useEffect(() => {

    const fetchTotal = async () => {
      try {
        const res = await axios.post(`${API}/statistics/report-revenue`, {}, config)
        setTotal(res.data.data)
      } catch {
        console.log('err');
      }
    }
    fetchTotal()
  }, [])
  const fecthTotalDate = async () =>{
    try{
      const res = await axios.post(`${API}/statistics/report-revenue`, {
        timeStart: dateIn,
        timeEnd: dateOut
      }, config)
      setTotalDate(res.data.data)
    }
    catch{
      console.log('err');
    }
  }
  return (
    <div className="MainDash ">
      <h1 className='font-bold text-3xl'>Dashboard</h1>
      {/* <Cards /> */}
      <div className="flex">
        <div className="w-[300px] h-[160px] bg-red-200 rounded-xl hover:bg-blue-200 hover:tran  flex flex-col justify-center text-center mr-10">
          <div className=" mb-4 font-bold text-2xl">
            Tổng doanh thu
          </div>
          <div className="font-bold text-blue-600 text-2xl">
            {total} $
          </div>
        </div>
        <div className="w-[300px] h-[160px] bg-blue-200 rounded-xl hover:bg-red-200 hover:tran  flex flex-col justify-center text-center mr-6">
          <div className=" mb-4 font-bold text-2xl">
            Doanh thu theo ngày
          </div>
          <div>
            <div>
              <label className="font-bold text-right " htmlFor="in">Từ ngày</label>
              <input 
                onChange={handleDateInChange}
                
              className="ml-6 px-4 py-1 mb-2" type="date" name="in" />
            </div>
            <div>
              <label className="font-bold text-right" htmlFor="out">Đến ngày</label>
              <input 
                onChange={handleDateOutChange}
              className="ml-4 px-4 py-1" type="date" name="out" />
            </div>
          </div>
          <div >
            <button className="mt-2 bg-yellow-200 px-3 py-2 font-semibold rounded-xl hover:bg-blue-300" onClick={fecthTotalDate}>Tính</button> 
          </div>
          
        </div>
        <div className="w-[300px] h-[160px] bg-red-200 rounded-xl hover:bg-blue-200 hover:tran  flex flex-col justify-center text-center mr-10">
          <div className=" mb-4 font-bold text-2xl">
            Doanh thu theo ngày
          </div>
          <div className="font-bold text-blue-600 text-2xl">
            {totalDate} $
          </div>
        </div>
      </div>

      <Table />
    </div>
  );
};

export default MainDash;
