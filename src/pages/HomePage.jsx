import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Product from '../components/Products';
import axios from 'axios';
import { productUrl } from '../baseUrl';
import { AppContext } from '../context/AppContextProvider';


const HomePage = () => {
  let tableHeadingData = ["name", 'price', 'quantity', 'category', 'action'];
  const { loading, setLoading, isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false)
  console.log(data)

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        let response = await axios.get(`${productUrl}/allproduct`,
          { withCredentials: true }
        );
        setData(response.data.data)
      } catch (error) {
        console.log(error.messaage)
        setLoading(false)
      }
    };
    fetchDataFromApi()
  }, [])


  return (
    <div>
      <Header />
      <div className='w-[80vw] flex flex-col justify-center m-auto'>
        <div className='flex items-center justify-between py-3'>
          <h1>All Products</h1>
          <button type='button' className=' bg-slate-800 text-white rounded-sm px-3'>Add Product</button>
        </div>
        <div>
          <table className='border-collapse border border-black-900 w-[80vw]'>
            <thead >
              <tr>
                {
                  tableHeadingData.map((items, index) => {
                    return <th className='border border-slate-600' key={index} > {items.toUpperCase()}</th>
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                data && data.map((item, id) => {
                  return <tr key={id} className='border items-center text-center'>
                    <td className='border border-slate-600 capitalize'>{item.name}</td>
                    <td className='border border-slate-600 capitalize'>{item.price}</td>
                    <td className='border border-slate-600'>{item.quantity}</td>
                    <td className='border border-slate-600 capitalize'>{item.category}</td>
                    <td className='border border-slate-600'>
                      <div className='flex items-center justify-around'>
                        <button className=' bg-slate-900 px-2 rounded-sm text-white'
                        >
                          Edit
                        </button>
                        <button className=' bg-slate-900 px-2 rounded-sm text-white'
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                })
              }

            </tbody>


          </table>

        </div>
      </div>
    </div>
  )
}

export default HomePage
