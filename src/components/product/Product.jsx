import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../apiConfig";
import Card from "../card/Card";
import IconArrowRight from "../../icons/IconArrowRight";
import CategoryShop from "../Categories/CategoryShop";
import Sort from "../sort/Sort";
import IconSearch from "../../icons/IconSearch";
import useDebounce from "../../hooks/useDebounce";
import IconLeft from "../../icons/IconLeft";
import { API } from "../../commom/const.api";
import axios from "axios";
import { set } from "react-hook-form";
const itemsPerPage = 12;
const Product = () => {
  const [skip, setSkip] = useState(0);
  const [getCategories, setGetCategories] = useState("");
  const [categories, setCategories] = useState(getCategories);
  const [showCategotySelect, setShowCategorySelect] =
    useState("All Categories");
  const [sortDefault, setSortDefault] = useState(true);
  const [sortName, setSortName] = useState(false);
  const [sortNameReverse, setSortNameReverse] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);
  const [sortPriceReverse, setSortPriceReverse] = useState(false);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(12);
  const [post, setPost] = useState([]);

  const handleSearchProduct = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value);
  };

  const searchDebounce = useDebounce(search, 800);

  const [url, setUrl] = useState(
    // `https://dummyjson.com/products${categories}?limit=12&skip=${skip}`
    `${API}/products?page=${skip}&size=12`
  );
  // useEffect(()=>{
  //   setUrl(skip)
  // },[])
    useEffect(()=>{
      setUrl(`${API}/products?page=${skip}&size=12`)
    },)
  const { data } = useSWR(url, fetcher);
  useEffect(() => {
    if (searchDebounce) {
      try {
        async function fetchData() {
          const res = await axios.post(`${API}/products/search?name=${searchDebounce}`)
          setPost(res.data.data.productOutputs)
        }
        fetchData();
      }catch{
        console.log('err');
      }
    } 
    if(!searchDebounce) {
      try {
        async function fetchData() {
          const res = await axios.post(`${API}/products/search${categories ? `?category=${categories}` : "?"}&page=${skip}&size=12`)
          setPost(res.data.data.productOutputs)
          
        }
        fetchData();
      }
      catch {
        console.log('err');
      }
    }
    
  }, [categories, searchDebounce, skip]);

  if (!data) return;
  const product =  categories ? post : searchDebounce  ? post : data?.data.productOutputs;

  const pageCount = Math.ceil(data?.data.meta.total / itemsPerPage);

  const handleGetProductCategories = (e) => {
    setGetCategories(e.target.textContent);
    // console.log(e.target.textContent);
    setCategories(`${e.target.textContent}`);
    setShowCategorySelect(e.target.textContent);
    setSkip(0);

  };

  const handleResetSort = () => {
    setCategories("");
    setShowCategorySelect("All Categories");
  };

  const handleChangeSort = (e) => {
    const value = e.target.textContent;
    if (value === "Mặc định") {
      setSortName(false);
      setSortNameReverse(false);
      setSortPrice(false);
      setSortPriceReverse(false);
      setSortDefault(true);
    }
    if (value === "Name - A to Z") {
      setSortName(true);
      setSortNameReverse(false);
      setSortPrice(false);
      setSortPriceReverse(false);
      setSortDefault(false);
    }
    if (value === "Name - Z to A") {
      setSortNameReverse(true);
      setSortName(false);
      setSortPrice(false);
      setSortPriceReverse(false);
      setSortDefault(false);
    }
    if (value === "Price - Low to High") {
      setSortPrice(true);
      setSortName(false);
      setSortNameReverse(false);
      setSortPriceReverse(false);
      setSortDefault(false);
    }
    if (value === "Price - High to Low") {
      setSortPriceReverse(true);
      setSortName(false);
      setSortNameReverse(false);
      setSortPrice(false);
      setSortDefault(false);
    }
  };
  const styleArrow = `flex gap-x-2 items-center justify-center font-semibold px-4 py-2 bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-all rounded-lg`;

  return (
    <div className="mt-[60px]">
      <div className="container mx-auto py-10 px-5 relative">
        <div className="flex flex-col justify-center items-center gap-y-3 text-white w-full h-[160px] bg-primary bg-opacity-80 rounded-lg mb-10">
          <span>Home / Shop</span>
          <h3 className="sm:text-[50px] text-[35px] font-semibold">Shop</h3>
        </div>
        {/* display under the screen 768px */}
        <div className="md:hidden w-full">
          <div className="relative border rounded-md h-[38px] px-9 w-full flex items-center search-tablet mb-5">
            <IconSearch
              className={`absolute top-2/4 -translate-y-2/4 left-2 w-4 h-4`}
            ></IconSearch>
            <input
              type="text"
              value={search}
              placeholder="Enter your product..."
              className="w-full h-full text-sm text-text1 font-medium input-search"
              onChange={handleSearchProduct}
            />
          </div>
        </div>
        {/* --------------- */}

        <div className="flex max-sm:flex-col-reverse sm:justify-between justify-start sm:items-center items-start gap-y-5">
          <div className="flex gap-x-10 items-top">
            <CategoryShop onClick={handleGetProductCategories}></CategoryShop>
          </div>
          {/* display on the screen 768px */}
          <div className=" flex items-center gap-x-5">
            <div className="max-md:hidden relative border rounded-md h-[38px] px-9 w-[400px] flex items-center search">
              <IconSearch
                className={`absolute top-2/4 -translate-y-2/4 left-2 w-4 h-4`}
              ></IconSearch>
              <input
                type="text"
                value={search}
                placeholder="Enter your product..."
                className="w-full h-full text-sm text-text1 font-medium input-search"
                onChange={handleSearchProduct}
              />
            </div>
            <Sort onClick={handleChangeSort}></Sort>
          </div>
          {/* ------------------------ */}

        </div>
        <div className="flex justify-between sm:gap-x-10 gap-5 text-sm text-dark md:pl-2 items-center mt-5 flex-wrap">
          <div className="flex gap-x-5">
            <div className="flex gap-x-3 items-center">
              <h3 className="font-semibold">Dòng sản phẩm: </h3>
              <span className="font-medium text-[13px] rounded-3xl py-2 px-4 show-cate">
                {showCategotySelect}
              </span>
            </div>
            <button
              className="rounded-md py-2 px-4 font-medium shadow-md"
              onClick={handleResetSort}
            >
              Reset
            </button>
          </div>
          <div className="flex lg:gap-x-10 gap-x-5">
            <div className="font-semibold text-dark text-sm flex items-center gap-x-2 max-sm:hidden">
            </div>
            <div className="font-medium text-dark text-sm flex items-center">
              {search
                ? ""
                : `Showing ${data?.data.productOutputs.length === 0 ? "0" : (skip) * count} - ${(skip) * count + itemsPerPage >= data?.data.meta.total
                  ? data?.data.meta.total
                  : (skip) * count + itemsPerPage
                } of ${data?.data.meta.total} results`}
              {/* {console.log(data?.data.productOutputs.length)} */}
              {/* {console.log(data.data.meta.total)} */}
              {/* {console.log(skip)}
                {console.log(count * skip)} */}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-x-6 gap-x-4 gap-y-8 mt-10 list-product">
          {sortDefault &&
            product.map((item) => <Card key={item.id} item={item}></Card>)}
          {sortName &&
            product
              .sort((a, b) => {
                if (a.title > b.title) return 1;
                if (a.title < b.title) return -1;
                return 0;
              })
              .map((item) => <Card key={item.id} item={item}></Card>)}
          {sortNameReverse &&
            product
              .sort((a, b) => {
                if (a.title < b.title) return 1;
                if (a.title > b.title) return -1;
                return 0;
              })
              .map((item) => <Card key={item.id} item={item}></Card>)}
          {sortPrice &&
            product
              .sort((a, b) => {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
              })
              .map((item) => <Card key={item.id} item={item}></Card>)}
          {sortPriceReverse &&
            product
              .sort((a, b) => {
                if (a.price < b.price) return 1;
                if (a.price > b.price) return -1;
                return 0;
              })
              .map((item) => <Card key={item.id} item={item}></Card>)}
        </div>
        {data?.data.productOutputs.length === 0 && (
          <h3 className="text-center text-[30px] text-dark font-semibold">
            No Products Found
          </h3>
        )}
        {data?.data.meta.total < 12 || search ? (
          ""
        ) : (
          <div className="w-full rounded-[30px] mt-10 flex items-center justify-between gap-x-3 relative showPageCount">
            <div className="font-medium flex items-center justify-start gap-x-2 border rounded-lg px-4 py-3 bg-primary text-white">
              <p>Page :</p>
              <span>
                {skip} of {pageCount}
              </span>
            </div>
            <div className="flex gap-x-5">
              {skip < 1 ? (
                <span
                  aria-disabled
                  className={`cursor-not-allowed opacity-50 ${styleArrow}`}
                >
                  <IconLeft></IconLeft> Previous
                </span>
              ) : (
                <span
                  className={`cursor-pointer ${styleArrow}`}
                  onClick={() => {
                    setSkip(skip - 1);

                    document.documentElement.scrollTop = 0;
                  }}
                >
                  <IconLeft></IconLeft> Previous
                </span>
              )}

              {skip >= data?.data.meta.total - itemsPerPage ? (
                <span
                  aria-disabled
                  className={`cursor-not-allowed opacity-50 ${styleArrow}`}
                >
                  Next <IconArrowRight></IconArrowRight>
                </span>
              ) : (
                <span
                  className={`cursor-pointer ${styleArrow}`}
                  onClick={() => {
                    setSkip(skip + 1);
                    document.documentElement.scrollTop = 0;
                  }}
                >
                  Next <IconArrowRight></IconArrowRight>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
