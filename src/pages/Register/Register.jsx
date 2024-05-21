import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import img from '../../assets/others/authentication2.png'
import { useForm } from "react-hook-form";

const Register = () => {
    const {createUser,updateUserProfile} = useContext(AuthContext);
    const {register, handleSubmit,formState: { errors },} = useForm();
    const onSubmit = (data) => {
        createUser(data.email,data.password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name)
            .then(()=>{
                console.log("updated userName")
            })
        })
    };
    
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center w-1/2 lg:text-left mr-6">
                    <img src={img} alt="" />
                </div>
                <div className="card shrink-0 w-1/2 shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h1 className="text-5xl text-center font-bold">Sign Up</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name",{ required: true })} placeholder="name" className="input input-bordered"  />
                            {errors.name && <span>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email",{ required: true })} placeholder="email" className="input input-bordered"  />
                            {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password",{ required: true,minLength:6 })} placeholder="password" className="input input-bordered"  />
                            {errors.password && <span>This field is required</span>}
                            {errors.password?.type==="minLength" && <p className="text-red-600">Password must be 6 chartecters</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button className='btn btn-primary'>Login</button>
                        </div>
                        <div className="form-control mt-6">
                            <p>Already Have Account?<Link to='/login'>Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;