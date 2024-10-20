import apiService from ".";
import axios from "axios";


const apiService1 = axios.create({
    baseURL: 'http://localhost:8000', // Your backend URL
    // timeout: 5000, // Optional: timeout for requests
  });
export const postRegister = async (payload)=>{
   try{
    let response = await apiService1.post('/register',payload)
    return response
   }
   catch(err){
        return err
   }
}

export const postLogin = async (payload)=>{
   try{
    let response = await apiService1.post('/login',payload)
    return response
   }
   catch(err){
        return err
   }
}

export const postBidding = async (payload)=>{
   try{
    // let response = await axios.post('http://localhost:8000/register',payload)
    // let response = await apiService.post('/register',payload)   // working 
    let response = await apiService.post('/auction',payload)
    return response
   }
   catch(err){
        return err
   }
}

export const getBidding = async (payload)=>{
   try{
    let response = await apiService.get('/auctions')
    return response
   }
   catch(err){
        return err
   }
}