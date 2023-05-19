import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../apiConfig";
import Card from "../card/Card";
import { API } from "../../commom/const.api";
import axios from "axios";

const SimilarProduct = ({ categories, id }) => {
    const [post,setPost] = useState([])
    const { data } = useSWR(
        `https://dummyjson.com/products/category/${categories}`
        // `${API}/products?page=0&size=4`
        ,
        fetcher
    );
    useEffect(()=>{
        async function fetchData(){
            try{
                const res = await axios.post(`${API}/products/search?category=${categories}&page=0&size=4`)
                console.log(res.data.data.productOutputs);
                setPost(res.data.data.productOutputs)
            }
            catch{
                console.log('err');
            }
        }
        fetchData()
    },[])
    if (!data) return;
    // const product = data.products;
    const product = post
    // const product = data.data.productOutputs;
    console.log(post);
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 py-5 mb-[50px] similar-product">
            {product.filter(product => {
                return product.id !== id;
            }).map((item, index) => (
                <Card item={item} key={index}></Card>
            ))}
        </div>
    );
};

export default SimilarProduct;
