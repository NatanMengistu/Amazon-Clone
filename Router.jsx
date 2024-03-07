import React from 'react'
import { Route,BrowserRouter as Router,Routes } from 'react-router-dom'
import Landing from './src/Pages/Landing/Landing'
import Auth from './src/Pages/Auth/Auth'
import Payment from './src/Pages/Payment/Payment'
import Orders from './src/Pages/Orders/Orders'
import Cart from './src/Pages/Cart/Cart'
import Results from './src/Pages/Results/Results'
import Detail from './src/Pages/ProductDetail/Detail'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './src/Components/ProtectedRoute/ProtectedRoute'
const stripePromise = loadStripe('pk_test_51Ohy8xGyTJ3v8FtPhoxxBw0dw0gwKeh69JUqwLHBOyxycJ6dtN9grbpWGNsggh5bcBUAknqi1upRJXkhIoympoye00fFm34t3V');


function Routing() {
  return (
   <Router>
    <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/payment' element={
          <ProtectedRoute msg={'You must login to pay'} redirect={"/payment"}>
             <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        
          </ProtectedRoute>
         
        } />
        <Route path='/order' element={
           <ProtectedRoute msg={'You must login access your orders'} redirect={"/order"}>
           <Orders />
        </ProtectedRoute>
        
        } />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/products/:productId' element={<Detail/>} />
        <Route path='/category/:categoryName' element={<Results/>} />
    </Routes>

   </Router>
  )
}

export default Routing
