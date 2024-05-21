import { useContext, useEffect, useRef, useState } from 'react';
import loginImg from '../../../assets/others/authentication1.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const {login} = useContext(AuthContext);
    const [allowLogin,setAllowLogin] = useState(true);
    const captchaRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])
    const handleLogin=(e)=>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
        login(email,password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Log in succesfull",
                showConfirmButton: false,
                timer: 1500
              });
            navigate(from,{replace:true})
        })
        .catch(err=>console.log(err))
    }
    const handleCaptcha =()=>{
        if(validateCaptcha(captchaRef.current.value)==true){
            setAllowLogin(false);
        }else{
            setAllowLogin(true);
        }
    }
    
    return (
        <>
        <Helmet>
            <title>
                Hungry Bees || Login
            </title>
        </Helmet>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center w-1/2 lg:text-left mr-6">
                    <img src={loginImg} alt="" />
                </div>
                <div className="card shrink-0 w-1/2 shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                    <h1 className="text-5xl text-center font-bold">Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" name='email' required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" name='password' required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                            <LoadCanvasTemplate />
                            </label>
                            <input type="text" onBlur={handleCaptcha} ref={captchaRef} placeholder="your captcha" className="input input-bordered" name='captcha' required />
                        </div>
                        <div className="form-control mt-6">
                            <button disabled={allowLogin} className='btn btn-primary'>Login</button>
                        </div>
                        <div className="form-control mt-6">
                            <p>New to website?<Link className='underline text-blue-500' to='/register'>Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
        
    );
};

export default Login;