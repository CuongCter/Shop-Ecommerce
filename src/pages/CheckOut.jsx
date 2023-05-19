import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/input/Input";
import IconChevronLeft from "../icons/IconChevronLeft";
import IconDown from "../icons/IconDown";
import IconUp from "../icons/IconUp";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { cartActions } from "../store/slices/cartSlice";
import axios from "axios";
import { API } from "../commom/const.api";
const delivery = [
  {
    title: "SAME_DAY",
    icon: (
      <ion-icon
        name="rocket-outline"
        style={{ width: "20px", height: "20px" }}
      ></ion-icon>
    ),
  },
  {
    title: "EXPRESS",
    icon: (
      <ion-icon
        name="bicycle-outline"
        style={{ width: "20px", height: "20px" }}
      ></ion-icon>
    ),
  },
  {
    title: "NORMAL",
    icon: (
      <ion-icon
        name="walk-outline"
        style={{ width: "20px", height: "20px" }}
      ></ion-icon>
    ),
  },
];
const paymethod = [
  {
    title: "COD",

  },
  {
    title: "NCB",
  },

]
const schema = yup.object({
  name: yup.string().required("Please enter your name..."),
  phone: yup
    .string()
    .required("Please enter your phone number")
    .min(8, "Phone number must have more than 8 digits")
    .max(12, "Phone number must have less than 12 digits"),
  street: yup.string().required("Please enter your  address"),
});
const CheckOut = () => {
  const navigate = useNavigate();
  const [changeIcon1, setChangeIcon1] = useState(false);
  const [changeIcon2, setChangeIcon2] = useState(false);
  const [changeIcon3, setChangeIcon3] = useState(false);
  const [activeDelivery, setActiveDelivery] = useState("");
  const dispacth = useDispatch();
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm({
  //   resolver: yupResolver(schema),
  //   mode: "onChange",
  // });

  const handleCollapseContact = () => {
    const info = document.querySelector(".info");
    info.classList.toggle("active-arrcodion");
    setChangeIcon1(!changeIcon1);
  };
  const handleCollapseDelivery = () => {
    const delivery = document.querySelector(".delivery");
    delivery.classList.toggle("active-arrcodion");
    setChangeIcon2(!changeIcon2);
  };
  const handleCollapsePayment = () => {
    const payment = document.querySelector(".payment");
    payment.classList.toggle("active-arrcodion");
    setChangeIcon3(!changeIcon3);
  };
  const handleActiveDelivery = (e) => {
    const value = e.target.textContent;
    setActiveDelivery(value);
  };
 
  const token = localStorage.getItem('accessToken');
  const config = {
      headers: { Authorization: `Bearer ${token}`}
  };
  const idUser = localStorage.getItem("tumi_id")
  // const onSubmit  = (values) => {
  //   if (activeDelivery === "") {
  //     toast.error("Please choose a shipping method");
  //   } else {
  //     if (!isValid) return;
  //     dispacth(cartActions.deleteProductCheckout());
  //     toast.success("Order Successfully!!");
  //     navigate("/");
  //   }
  // };
  const priceShipping = () => {
    let price;
    if (totalAmount < 1000) {
      price = 0;
    } else if (totalAmount < 5000) {
      price = 100;
    } else {
      price = 200;
    }
    return price;
  };
  const priceDelivery = () => {
    let price;
    if (activeDelivery === "SAME_DAY") {
      price = 200;
    } else if (activeDelivery === "EXPRESS") {
      price = 100;
    } else if (activeDelivery === "NORMAL") {
      price = 50;
    } else {
      price = 0;
    }
    return price;
  };

  const [values, setValues] = useState({
    name: "",
    phone: "",
    address: ""
  })
  const handleInput = (e) => {
    e.preventDefault();
      setValues({
          ...values,
          [e.target.name]: e.target.value
      })
  }
   console.log(values);

  const id = localStorage.getItem("tumi_id")
  const cartID = localStorage.getItem("tumi_idCart")
  const [idItemDetails, setIdItemDetails] = useState([])
  useEffect(()  => {
    const fetchCart = async () =>{
      try{ 
        const res = await axios.get(`${API}/carts/${cartID}`,config)
        console.log(res.data.data.itemDetails.map(item => item.id));
        setIdItemDetails(res.data.data.itemDetails.map(item => item.id))
      }catch{
        console.log('err');
      }
    }
    fetchCart()
  },[])

  const handlePlace = async () =>{
    console.log(idItemDetails);
    if (activeDelivery === "") {
      toast.error("Please choose a shipping method")
    }else{
      // dispacth(cartActions.deleteProductCheckout());
      // toast.success("Order Successfully!!");
      // navigate("/");
      try{
        const res = await axios.post(`${API}/orders`,{
          idUser: id,
          fullName: values.name,
          address: values.address,
          phone: values.phone,
          orderedDate: new Date().toISOString(),
           deliveryMethod: activeDelivery,
          // deliveryMethod: "SAME_DAY",
          deliveredDate: new Date().toISOString(),
          paymentMethod: "COD",
          idItemDetails: 
            idItemDetails
          ,
          // idUserCoupon: ""
        },
        config)
        console.log(res);
        dispacth(cartActions.deleteProductCheckout());
        toast.success("Order Successfully!!");
        navigate("/");
      }catch{
        console.log("err");
      }
    }
    
  }

  const min = 1;
const max = 10;
const randomInRange = Math.floor(Math.random() * (max - min + 1) + min);

  const payNCB = async () => {
    try{
      const res = await axios.post(`${API}/payment/${randomInRange}/payment-order`,{
        amount: (totalAmount + priceDelivery() + priceShipping()) * 23000,
        orderInfo: "a",
        bankCode: 'NCB'

      })

      window.location.replace(res.data.data.data)
    }catch{
      console.log('err');
    }
  }
  return (
    <div className="my-[80px]">
      <div className="container p-5">
        <div className="mt-10 grid lg:grid-cols-[2fr,1fr] grid-cols-1 gap-10 items-center">
          <div>
            <div className="flex flex-col mb-10">
              <div
                className="mb-10 flex gap-x-2 items-center transition-all hover:text-primary cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <button className="p-2 rounded-md border ">
                  <IconChevronLeft className={"w-5 h-5"}></IconChevronLeft>
                </button>
                <span className="font-medium">Back to cart</span>
              </div>
              <h3 className="text-[40px] font-medium mb-3 max-sm:text-center">Checkout</h3>
              <p className="text-text3 max-sm:text-center">
                Checkout is a counter where you pay for things you are buying
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <div
                  className="w-full h-full border rounded-lg px-5 py-3 flex items-center justify-between cursor-pointer"
                  onClick={handleCollapseContact}
                >
                  <h3 className="text-lg font-medium">
                    1. Contact Information
                  </h3>
                  <span className="transition-all">
                    {changeIcon1 ? <IconDown></IconDown> : <IconUp></IconUp>}
                  </span>
                </div>
                <div className="info border max-h-[600px] overflow-hidden bg-white rounded-lg">
                  <div
                    className="grid sm:grid-cols-2 gap-5 text-sm p-5 items-start"
                    autoComplete="off"
                  >
                    <div className="flex flex-col gap-2 text-sm font-medium items-start">
                      <label htmlFor="name" className='font-bold '>Name*</label>
                      <input type="text"
                          name="name"
                          placeholder="Enter your name"
                          className={`w-full border rounded-md  text-sm px-5 py-2`}
                          onChange={handleInput}
                      />
                  </div>
                  <div className="flex flex-col gap-2 text-sm font-medium items-start">
                      <label htmlFor="phone" className='font-bold '>Phone Number*</label>
                      <input type="text"
                          name="phone"
                          placeholder="0123-456-789"
                          className={`w-full border rounded-md  text-sm px-5 py-2`}
                          onChange={handleInput}
                      />
                  </div>
                  <div className="flex flex-col gap-2 text-sm font-medium items-start">
                      <label htmlFor="address" className='font-bold '>Address*</label>
                      <input type="text"
                          name="address"
                          placeholder="Enter your address..."
                          className={`w-full border rounded-md  text-sm px-5 py-2`}
                          onChange={handleInput}
                      />
                  </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div
                  className="border rounded-lg px-5 py-3 flex items-center justify-between cursor-pointer"
                  onClick={handleCollapseDelivery}
                >
                  <h3 className="text-lg font-medium">2. Delivery Methob</h3>
                  <span className="transition-all">
                    {changeIcon2 ? <IconDown></IconDown> : <IconUp></IconUp>}
                  </span>
                </div>
                <div className="flex wrap sm:gap-5 gap-2 items-center max-h-0 overflow-hidden delivery opacity-0">
                  {delivery.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-center w-[160px] h-[50px] font-medium text-[15px] gap-x-1 border rounded-xl cursor-pointer delivery-item ${
                        activeDelivery === item.title
                          ? "bg-primary text-white"
                          : "bg-white text-text3"
                      }`}
                      onClick={handleActiveDelivery}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div
                  className="border rounded-lg px-5 py-3 flex items-center justify-between cursor-pointer"
                  onClick={handleCollapsePayment}
                >
                  <h3 className="text-lg font-medium">3. Payment Methob</h3>
                  <span className="transition-all">
                    {changeIcon3 ? <IconDown></IconDown> : <IconUp></IconUp>}
                  </span>
                </div>
                <p className="flex justify-around payment p-5 overflow-hidden max-h-0 opacity-0 border rounded-lg">
                
                 <div
                      className={` flex active items-center justify-center w-[160px] h-[50px] font-medium text-[15px] gap-x-1 border rounded-xl cursor-pointer delivery-item hover:bg-primary hover:text-white  `}
                    > COD</div>
                    <div onClick={payNCB}
                      className={`flex items-center justify-center w-[160px] h-[50px] font-medium text-[15px] gap-x-1 border rounded-xl cursor-pointer delivery-item  hover:bg-primary  hover:text-white`}
                    > NCB</div>
                </p>
                
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
          <div className="bg-primary bg-opacity-5 rounded-lg p-5 lg:w-full md:w-[60%] sm:w-[80%] w-full h-fit">
            <h3 className="text-[30px] mb-5 font-semibold text-center">
              Order Summary
            </h3>
            <div className="w-full h-[220px] rounded-lg flex items-center justify-center mb-5">
              <img
                src="https://taichinh.online/wp-content/uploads/2017/02/the-mastercard.png"
                alt=""
                className="w-[100%] sm:h-[90%] h-[85%] object-fill"
              />
            </div>
            <div className="flex flex-col gap-5 text-black rounded-lg sm:p-5">
              <p className="text-[40px] text-center mb-5">{totalQty} items</p>
              <div className="flex gap-x-2 justify-between">
                <p className="text-text3 font-medium">Subtotal: </p>
                <span className="text-dark font-semibold">${totalAmount}</span>
              </div>
              <div className="flex gap-x-2 justify-between">
                <p className="text-text3 font-medium">Shipping: </p>
                <span className="text-dark font-semibold">
                  ${priceShipping()}
                </span>
              </div>
              <div className="flex gap-x-2 justify-between">
                <p className="text-text3 font-medium">Delivery: </p>
                <span className="text-dark font-semibold">
                  ${priceDelivery()}
                </span>
              </div>
              <span className="w-full h-[1px] bg-[#eee]"></span>
              <div className="flex gap-x-2 justify-between text-lg">
                <p className="text-text3 font-medium">Total Cost: </p>
                <span className="text-dark font-semibold text-xl">
                  ${totalAmount + priceDelivery() + priceShipping()}
                </span>
              </div>
              <button onClick={handlePlace}  className="mt-5 w-full bg-primary text-white h-[45px] flex items-center justify-center font-medium rounded-lg">
                Place an order
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
