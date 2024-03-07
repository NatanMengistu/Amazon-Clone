import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect,useState } from 'react'
import Classes from './result.module.css'
import ProductCard from '../../Components/Product/ProductCard'
import { productUrl } from '../../Api/endpoint'
import Loader from '../../Components/Loader/Loader'


function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const {categoryName} = useParams()
  console.log(categoryName)

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, [categoryName]);
  return (
    <Layout>
     <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        
        {
        
  isLoading ? (<Loader/>):(
    <div className={Classes.products_container}>

  {
    results.map((product)=>{
      return <ProductCard product={product}/>
    })
  }
    </div>
      

  )
}
      
      </section>
    </Layout>
   
  )
}

export default Results
