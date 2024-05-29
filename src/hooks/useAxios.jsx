import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
  });
const useAxios = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  axiosInstance.interceptors.request.use(function (config){
    const token = localStorage.getItem('access-token');
    config.headers.authorization = `Bearer ${token}`
    return config
  },function(error){
    return Promise.reject(error);
  })

  axiosInstance.interceptors.response.use(response=>response,async error=>{
    const status = error.response.status;
    console.log('status error in the interceptor',status);
    if (status===401 || status===403) {
      await logout();
      navigate('/login');
    }
    return Promise.reject(error);
  })
    return axiosInstance;
};

export default useAxios;