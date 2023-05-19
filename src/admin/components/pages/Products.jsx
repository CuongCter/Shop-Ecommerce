import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { API } from '../../../commom/const.api';
import { useState } from 'react';
import IconArrowRight from '../../../icons/IconArrowRight';
import IconLeft from '../../../icons/IconArrowRight';
import IconRight from '../../../icons/IconRight';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { Api } from '@mui/icons-material';
const Products = () => {
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files);
  }

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get(`${API}/products?page=${skip}&size=9`)
      setProducts(res.data.data.productOutputs)
    }
    fetchProducts()
  }, [skip])
  const styleArrow = `flex gap-x-2 items-center justify-center font-semibold px-4 py-2 bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-all rounded-lg`;


  // const [editingProduct, setEditingProduct] = useState(null);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [idProduct, setIdProduct] = useState('')
  const handleEdit = (id) => {
    setIdProduct(id);
    setShowModalEdit(true);
  };

  const [values, setValues] = useState({
    id: "",
    name: "",
    stock: "",
    price: "",
    brand: "",
    category: "",
    file: selectedFile
  })
  const handleInput = (e) => {
    e.preventDefault()
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  const handleUpdateProduct = async () => {
    handleThumbail()
    try {
      const response = await axios.patch(`${API}/products`, {
        id: idProduct,
        name: values.name,
        stock: values.stock,
        price: values.price,
        brand: values.brand,
        category: values.category,
      }, config)
      toast.success('Update product done')
      setShowModalEdit(false)
      const res = await axios.get(`${API}/products?page=${skip}&size=9`)
      setProducts(res.data.data.productOutputs)
    } catch (error) {
      console.error(error);
      toast.error('Fail')
    }
  }

  const handleThumbail = async (event) => {
    try {
      const response = await axios.patch(`${API}/products`, {
        id: idProduct,
        images: selectedFile
      }, config)
      console.log(response);
    } catch (error) {
      toast.error('Fail')
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
  const [showDeleteProduct, setShowDeleteProduct] = useState(false)
  const handleDelete = (id) => {
    setIdProduct(id);
    setShowDeleteProduct(true)
  }

  const handleDeleteProduct = async () => {
    try {
      const data = axios.delete(`${API}/products/${idProduct}`, config)
      const res = await axios.get(`${API}/products?page=${skip}&size=9`)
      setProducts(res.data.data.productOutputs)
      setShowDeleteProduct(false)
      toast.success('Delete product done')
    }
    catch {
      toast.error('Fail')
    }
  }
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [selectedValue, setSelectedValue] = useState('1');
  const handleChangeCategory = (event) => {
    setSelectedValue(event.target.value);
  }

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(`${API}/products`, {
        idCategory: selectedValue,
        name: values.name,
        stock: values.stock,
        price: values.price,
        brand: values.brand,
        images: selectedFile
      }, config)
      toast.success('Add product done')
      setShowModalAdd(false)
      const res = await axios.get(`${API}/products?page=${skip}&size=9`)
      setProducts(res.data.data.productOutputs)
    } catch (error) {
      console.error(error);
      toast.error('Fail')
    }
  }
  const [category, setCategory] = useState([])
  useEffect(() => {
    const getCatagory = async () => {
      try {
        const res = await axios.get(`${API}/categories`)
        setCategory(res.data.data);
      }
      catch {
        console.log('Err');
      }
    }
    getCatagory()
  }, [])
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Product Table</h1>
      <button onClick={() => setShowModalAdd(true)} className=' float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'>Add product</button>
      {
        showModalAdd && (
          <div className="modal fixed z-10 inset-0 overflow-y-auto ">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
              <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                <div className="modal-header flex justify-between items-center pb-3">
                  <p className="font-bold text-2xl">Add product</p>
                  <button className="text-black close-modal" onClick={() => setShowModalAdd(false)}>
                    <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                  </button>
                </div>

                <div className="modal-body">

                  {/* <h2 className="text-2xl font-bold mb-4 ">Change User Info</h2> */}
                  <div className="mb-4">
                    <label className="text-left block text-gray-700 font-bold mb-2">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name='name'
                      onChange={handleInput}
                      className="border border-gray-400 p-2 w-full rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-left block text-gray-700 font-bold mb-2">
                      Stock:
                    </label>
                    <input
                      type="text"
                      id="stock"
                      name='stock'
                      onChange={handleInput}
                      className="border border-gray-400 p-2 w-full rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-left block text-gray-700 font-bold mb-2">
                      Price:
                    </label>
                    <input
                      type="text"
                      id="price"
                      name='price'
                      onChange={handleInput}
                      className="border border-gray-400 p-2 w-full rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className=" text-left block text-gray-700 font-bold mb-2">
                      Brand:
                    </label>
                    <input
                      type="text"
                      id="brand"
                      name='brand'
                      onChange={handleInput}
                      className="border border-gray-400 p-2 w-full rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className=" text-left block text-gray-700 font-bold mb-2">
                      Category:
                    </label>

                    <select className='bg-gray-100 text-gray-700 text-sm w-full p-1' value={selectedValue} onChange={handleChangeCategory} name="category" id="category">
                      {
                        category.map((item, index) => (
                          <option value={index + 1}>{item}</option>
                        ))
                      }

                    </select>
                  </div>
                  <div className="modal-body">
                    <div className="mb-4">
                      <label htmlFor="name" className="text-left block text-gray-700 font-bold mb-2">
                        Thumbnail	:
                      </label>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={handleFileChange}
                        className="border border-gray-400 p-2 w-full rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer flex justify-end pt-2">
                  <button onClick={handleAddProduct} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Submit</button>
                  <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowModalAdd(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
      <table className="table-auto h-auto w-full">
        <thead>
          <tr>
            <th className="bg-blue-300 border  px-4 py-2">Id</th>
            <th className="bg-blue-300 border  px-4 py-2">Name</th>
            <th className="bg-blue-300 border  px-4 py-2">Stock</th>
            <th className="bg-blue-300 border  px-4 py-2">Price</th>
            <th className="bg-blue-300 border  px-4 py-2">Brand</th>
            <th className="bg-blue-300 border  px-4 py-2">Category</th>
            <th className="bg-blue-300 border  ">Thumbnail</th>
            <th className="bg-blue-300 border  px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className='hover:bg-blue-200 hover:scale-[1.01] transition'>

              <td className="border  px-4 py-2">{product.id}</td>
              <td className="border text-left px-4 py-2">{product.name}</td>
              <td className="border text-left px-4 py-2">{product.stock}</td>
              <td className="border text-left px-4 py-2"><span>{product.price}$</span></td>
              <td className="border text-left px-4 py-2">{product.brand}</td>
              <td className="border text-left px-4 py-2">{product.category}</td>
              <td className="border text-left px-4 py-2">
                <img src={product.thumbnail} className='w-7 h-6' alt="" />
              </td>
              <td className="border text-left px-4 py-2 flex">
                <div className='mx-3 cursor-pointer '
                  // onClick={() => setShowModalEdit(true)}
                  onClick={() => handleEdit(product.id)}
                >
                  <ModeEditIcon className='hover:text-white'></ModeEditIcon></div>
                <div className='mx-3 cursor-pointer' onClick={() => handleDelete(product.id)}><DeleteIcon className='hover:text-white'></DeleteIcon></div>
              </td>
            </tr>
          ))}
          {
            showModalEdit && (
              <div className="modal fixed z-10 inset-0 overflow-y-auto ">
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
                  <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                    <div className="modal-header flex justify-between items-center pb-3">
                      <p className="font-bold text-2xl">Update product</p>
                      <button className="text-black close-modal" onClick={() => setShowModalEdit(false)}>
                        <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                      </button>
                    </div>

                    <div className="modal-body">

                      {/* <h2 className="text-2xl font-bold mb-4 ">Change User Info</h2> */}
                      <div className="mb-4">
                        <label className="text-left block text-gray-700 font-bold mb-2">
                          Name:
                        </label>
                        <input
                          type="text"
                          id="name"
                          name='name'
                          onChange={handleInput}
                          className="border border-gray-400 p-2 w-full rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-left block text-gray-700 font-bold mb-2">
                          Stock:
                        </label>
                        <input
                          type="text"
                          id="stock"
                          name='stock'
                          onChange={handleInput}
                          className="border border-gray-400 p-2 w-full rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-left block text-gray-700 font-bold mb-2">
                          Price:
                        </label>
                        <input
                          type="text"
                          id="price"
                          name='price'
                          onChange={handleInput}
                          className="border border-gray-400 p-2 w-full rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label className=" text-left block text-gray-700 font-bold mb-2">
                          Brand:
                        </label>
                        <input
                          type="text"
                          id="brand"
                          name='brand'
                          onChange={handleInput}
                          className="border border-gray-400 p-2 w-full rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label className=" text-left block text-gray-700 font-bold mb-2">
                          Category:
                        </label>
                        <input
                          type="text"
                          id="category"
                          name='category'
                          onChange={handleInput}
                          className="border border-gray-400 p-2 w-full rounded-md"
                        />
                      </div>
                      <div className="modal-body">
                        <div className="mb-4">
                          <label htmlFor="name" className="text-left block text-gray-700 font-bold mb-2">
                            Thumbnail	:
                          </label>
                          <input
                            type="file"
                            name="file"
                            id="file"
                            onChange={handleFileChange}
                            className="border border-gray-400 p-2 w-full rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer flex justify-end pt-2">
                      <button onClick={handleUpdateProduct} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Submit</button>
                      <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowModalEdit(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          {
            showDeleteProduct && (
              <div className="modal fixed z-10 inset-0 overflow-y-auto ">
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
                  <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                    <div className="modal-header flex justify-between items-center pb-3">
                      <p className="font-bold text-2xl">Delete product</p>
                      <button className="text-black close-modal" onClick={() => setShowDeleteProduct(false)}>
                        <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                      </button>
                    </div>

                    <div className="modal-body py-6">
                      Are you sure ?
                    </div>

                    <div className="modal-footer flex justify-end pt-2">
                      <button onClick={handleDeleteProduct} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Submit</button>
                      <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowDeleteProduct(false)}>Cancel </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </tbody>
      </table>

      <div className="flex gap-x-5 mt-5">
        {skip < 1 ? (
          <span
            aria-disabled
            className={`cursor-not-allowed opacity-50 ${styleArrow}`}
          >
            Previous
          </span>
        ) : (
          <span
            className={`cursor-pointer ${styleArrow}`}
            onClick={() => {
              setSkip(skip - 1);

              document.documentElement.scrollTop = 0;
            }}
          >
            Previous
          </span>
        )}

        {skip >= 3 ? (
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
  )
}

export default Products