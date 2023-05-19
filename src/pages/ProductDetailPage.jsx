import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/slices/cartSlice";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import useSWR from "swr";
import { fetcher } from "../apiConfig";
import Heading from "../components/heading/Heading";
import SimilarProduct from "../components/product/SimilarProduct";
import IconCheck from "../icons/IconCheck";
import { toast } from "react-toastify";
import { API } from "../commom/const.api";
import axios from "axios";
import storageService from "../services/storage.service";
import { Rating } from "@mui/material";
const icons = ["/instagram.png", "/twitter.png", "/slack.png", "/meta.png"];

const ProductDetailPage = () => {
    const idUser = localStorage.getItem("tumi_id")
    const [idCart, setIdCart] = useState('')
    const token = localStorage.getItem('accessToken');
    const [showRating, setShowRating] = useState(false);
    const [rated, setRated] = useState(0);
    const [comment, setComment] = useState('')

    const handleRatingChange = (event, value) => {
        setRated(value);
    };
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${API}/carts/${idUser}/cart-user`, config)
                setIdCart(res.data.data.id)
                console.log(idCart);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData()
    }, [])
    storageService.set('idCart', idCart)
    const { slug } = useParams();
    const dispatch = useDispatch();
    // const { data } = useSWR(`https://dummyjson.com/products/${slug}`, fetcher);
    const { data } = useSWR(`${API}/products/${slug}`, fetcher);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data]);
    if (!data) return;
    const {
        id,
        name,
        description,
        price,
        rating,
        category,
        thumbnail,
        images,
        stock,
        brand,
    } = data.data;
    // console.log(data.data);
    // const categories = category.charAt(0).toUpperCase() + category.slice(1);
    const categories = category;
    const remainder = Math.round(5 % rating);
    const rate = Math.floor(rating);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    console.log(rated);
    console.log(comment);
    const addToCart = async () => {
        try {
            const res = await axios.post(`${API}/carts/${idUser}/${id}/add-cart-detail?amount=1`, config)
            console.log(res);
        } catch (err) {
            console.log(err);
        }
        dispatch(
            cartActions.addItem({
                id,
                productName: name,
                image: thumbnail,
                price,
            })
        );
        toast.success("Sản phẩm đã được thêm vào giỏ hàng");
    };


    const handelShowRating = () => {
        if (!token) {
            setShowRating(false)
            toast.warning('Bạn cần đăng nhập mới có thể đánh giá')
        }
        else {
            setShowRating(true)
        }

    }
    const handleRating = async () => {
        console.log(config);
        try {
            const res = await axios.post(`${API}/rates`, {
                idUser: idUser,
                idProduct: id,
                star: rated,
                review: comment,
            },config)
            toast.success('Đánh giá hoàn tất')

        } catch {
            console.log('err');
        }
    }
    return (
        <div className="mt-[80px]">
            <div className="container">
                <div className="bg-primary w-full p-10 text-center text-white">
                    <h3 className="text-[30px] font-medium">{categories}</h3>
                    <div className="flex gap-x-2 items-center justify-center mt-5">
                        <p>Home</p>
                        <span>/</span>
                        <p>{name}</p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 sm:gap-10 gap-[50px] justify-center w-full py-10 sm:px-[100px] px-5">
                    <div className="flex overflow-hidden items-center justify-center">
                        <Slider {...settings} className="slider-product-detail">
                            {images.length &&
                                images.map((item, index) => (
                                    <div key={index} className="w-full h-full">
                                        <img
                                            src={item}
                                            alt=""
                                            className="w-[100%] h-[410px] overflow-hidden object-contain"
                                        />
                                    </div>
                                ))}
                        </Slider>
                    </div>
                    <div className="flex-1 flex flex-col gap-y-5 items-start">
                        <h3 className="lg:text-[35px] md:text-[30px] sm:text-[28px] max-sm:text-[35px] font-semibold">
                            {name}
                        </h3>
                        <div className="flex gap-x-3 items-center">
                            <div className="flex gap-x-[2px]">
                                {Array(rate)
                                    .fill(0)
                                    .map((star, index) => (
                                        <span key={index} className="text-[#FFDE00]">
                                            <ion-icon name="star"></ion-icon>
                                        </span>
                                    ))}
                                {rate >= 4 && remainder <= 0 ? (
                                    <span className="text-[#FFDE00]">
                                        <ion-icon name="star-outline" clas></ion-icon>
                                    </span>
                                ) : (
                                    ""
                                )}
                                {Array(remainder)
                                    .fill(0)
                                    .map((star, index) => (
                                        <span key={index} className="text-[#FFDE00]">
                                            <ion-icon name="star-half-outline"></ion-icon>
                                        </span>
                                    ))}
                            </div>
                            <p onClick={handelShowRating} className=" text-dark text-base font-extrabold hover:text-blue-500 hover:cursor-pointer">(Đánh giá)</p>
                            {
                                showRating && (
                                    <div className="modal fixed z-20 inset-0 overflow-y-auto ">
                                        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                                        <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
                                            <div className='modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50'>
                                                <div className="modal-header flex justify-between items-center pb-3">
                                                    <p className="font-bold text-2xl">Đánh giá sản phẩm</p>
                                                    <button className="text-black close-modal" onClick={() => setShowRating(false)}>
                                                        <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                                                    </button>
                                                </div>
                                                <div>
                                                    <Rating
                                                        name="rating"
                                                        value={rated}
                                                        precision={1}
                                                        onChange={handleRatingChange}>

                                                    </Rating>
                                                    <div className="flex flex-col gap-2 text-sm font-medium items-start z-10">
                                                        <label htmlFor="Comment" className='font-bold '>Viết đánh giá</label>
                                                        <input type="text "
                                                            name="Comment"
                                                         
                                                            className={`w-full  border rounded-md px-6 py-6 text-sm `}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-footer flex justify-end pt-2">
                                                    <button onClick={handleRating} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Đánh giá</button>
                                                    <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowRating(false)}>Quay lại</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <p className="text-2xl font-medium text-error ">${price}</p>
                        <div className="flex flex-col gap-y-[2px] text-primary text-sm font-medium">
                            <p className="flex gap-x-1 items-center">
                                <IconCheck></IconCheck>
                                <span>Còn hàng</span>
                            </p>
                            <p className="flex gap-x-1 items-center">
                                <IconCheck></IconCheck>
                                <span>Miễn phí vận chuyển</span>
                            </p>
                        </div>
                        <p className="text-sm font-medium text-text1 text-start">{description}</p>
                        <div className="flex max-md:flex-col gap-4">
                            <button
                                className="min-w-[200px] w-[250px] rounded-md py-4 bg-primary text-white font-medium"
                                onClick={addToCart}
                            >
                                Thêm vào giỏ
                            </button>
                        </div>
                        <p className="text-sm flex gap-x-3 text-dark">
                            <span className="font-semibold">Số lượng trong kho :</span>
                            <span>{stock}</span>
                        </p>
                        <div className="flex gap-x-2 text-sm">
                            <span className="font-semibold">Dòng sản phẩm:</span>
                            <span>{categories}</span>
                        </div>
                        <div className="flex gap-x-2 text-sm">
                            <span className="font-semibold">Hãng:</span>
                            <span>{brand}</span>
                        </div>
                        <div className="text-sm font-semibold flex gap-x-5 items-center">
                            <span>Share:</span>
                            <div className="flex gap-x-2">
                                {icons.map((icon, index) => (
                                    <span
                                        className="w-8 h-8 rounded-full bg-dark flex items-center justify-center socials"
                                        key={index}
                                    >
                                        <img src={icon} alt="" className="w-[50%] h-[50%]" />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-10 px-5">
                    <Heading>Sản phẩm liên quan</Heading>
                    <SimilarProduct categories={category} id={id}></SimilarProduct>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
