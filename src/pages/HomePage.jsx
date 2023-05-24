import React, { useEffect } from 'react'
import Banner from '../components/banner/Banner'
import BannerSale from '../components/banner/BannerSale'
import Offer from '../components/offer/Offer'
import Slider from "react-slick";
import Heading from "../components/heading/Heading";
import { fetcher } from "../apiConfig";
import useSWR from "swr";
import Countdown from '../components/countdown/Countdown';
import Card from '../components/card/Card';
import { API } from '../commom/const.api';
const HomePage = () => {
    useEffect(() => {
        document.title = "Shop";
    }, []);
    //https://dummyjson.com/products
    //http://103.90.227.133:8082/api/v1/products
    // const { data } = useSWR("https://dummyjson.com/products", fetcher);
    const { data } = useSWR(`${API}/products`, fetcher);
    if (!data) return;

    const products = data.data.productOutputs;
    console.log(data.data);
    const settings = {
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 568,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="overflow-hidden">
            <Banner></Banner>
            <BannerSale></BannerSale>
            <div className="bg-[#f4f4f4] w-full py-14 mb-14">
                <h3 className="font-semibold lg:text-[45px] sm:text-[40px] text-[35px] mb-10 text-center">
                    What we <span className="text-error">offer</span>
                </h3>
                <Offer></Offer>
            </div>
            <div className="container mx-auto px-5">
                <div className="relative sm:mb-10 mb-[80px]">
                    <Heading>Cửa hàng sản phẩm</Heading>
                    <Slider {...settings} className="slider-product-home">
                        {products.length &&
                            products
                                .slice(0, 20)
                                .map((item) => <Card key={item.id} item={item}></Card>)}
                    </Slider>
                </div>
            </div>
            <Countdown></Countdown>
            <div className="container w-full px-5 py-[50px] md:py-[100px] grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-y-[80px]">
                <div className="relative flex justify-center gap-x-5">
                    <div className="flex flex-col gap-y-5 translate-y-5">
                        <div className="w-[160px] h-[160px] rounded-xl p-5 bg-white bg-opacity-20 card-intro">
                            <img src="/ss1.png" alt="" className="w-full h-full" />
                        </div>
                        <div className="w-[160px] h-[160px] rounded-xl p-5 bg-white bg-opacity-20 card-intro">
                            <img src="/ss2.png" alt="" className="w-full h-full" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div className="w-[160px] h-[160px] rounded-xl p-5 bg-white bg-opacity-20 card-intro">
                            <img src="/ss3.png" alt="" className="w-full h-full" />
                        </div>
                        <div className="w-[160px] h-[160px] rounded-xl p-5 bg-white bg-opacity-20 card-intro">
                            <img src="/ss4.png" alt="" className="w-full h-full" />
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold lg:text-[35px] md:text-[30px] text-[30px] mb-10 max-md:text-center">
                        Tính năng sản phẩm
                    </h3>
                    <div className="max-md:w-[95%] mx-auto flex flex-col gap-y-8">
                        <div className="flex gap-x-5 items-center">
                            <img src="/ranking.png" alt="" className="w-[40px] h-[40px]" />
                            <div className="flex flex-col gap-y-2">
                                <h4 className="font-semibold">Chất lượng tốt nhất</h4>
                                <p className="text-sm lg:w-[70%] w-full">
                                Là những dòng thiết bị phổ biến có mặt trên toàn cầu với chất lượng đã được kiểm chứng qua thời gian và quá trình phát triển.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-5 items-center">
                            <img src="/clock.png" alt="" className="w-[40px] h-[40px]" />
                            <div className="flex flex-col gap-y-2">
                                <h4 className="font-semibold">Bền bỉ chất lượng</h4>
                                <p className="text-sm lg:w-[70%] w-full">
                                Với chất lượng tuyệt hảo, sản phẩm là thiết bị bền bỉ với thời gian, bắt kịp xu hướng của thời đại.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-5 items-center">
                            <img src="/money.png" alt="" className="w-[40px] h-[40px]" />
                            <div className="flex flex-col gap-y-2">
                                <h4 className="font-semibold">Giá cả tốt nhất</h4>
                                <p className="text-sm lg:w-[70%] w-full">
                                    Với giá cả phù hợp, khác hàng có thể dễ dàng chọn lựa các sản phẩm mà bản thân thấy ưng ý là yêu tích
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage