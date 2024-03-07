import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import ProductCard from '../../Components/Product/ProductCard'
import { productUrl } from '../../Api/endpoint'
import Loader from '../../Components/Loader/Loader'
import axios from 'axios'

function Detail() {
  const {productId}=useParams();
const [product, setProducts] = useState({})
const [isLoading,setisLoading]=useState(false)

useEffect(() => {
  setisLoading(true);
  axios
    .get(`${productUrl}/products/${productId}`)
    .then((res) => {
      setProducts(res.data);
      setisLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setisLoading(false);
    });
}, [productId]);


  return (
    <Layout>
      {
       isLoading ?(<Loader/>):( 
        <div>
          <ProductCard product={product} flex={true} renderDesc={true} renderAdd={true}/>
      </div>)
      }
  
    </Layout>
  )
    
}

export default Detail
