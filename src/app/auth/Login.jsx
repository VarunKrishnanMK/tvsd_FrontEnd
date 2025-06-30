import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { userContext } from '../../contexts/UserContext';
import { verifyLogin } from '../../apiService/ApiService';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setLoader } = useContext(userContext);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(userContext);
    const navigate = useNavigate();

    const submitLogin = (data) => {
        setLoader(true);
        verifyLogin(data)
            .then((response) => {
                if (response.data && response.data.token) {
                    login(response.data.user);
                    localStorage.setItem('token', response.data.token);
                    navigate('/dashboard');
                } else {
                    alert('Login failed. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    return (
        <div>
            <div className='col-md-4 offset-md-4 vh-100 d-flex flex-column justify-content-center align-items-center'>
                <div className='card border-0 shadow bg-light login-form-card'>
                    <div className='text-center mb-5'>
                        <img src="/images/tvs-digital-logo.svg" alt="Logo" className='w-50' />
                    </div>
                    <h4 className='text-center'>Login</h4>
                    <form onSubmit={handleSubmit(submitLogin)}>
                        <div className="mb-3">
                            <label className='form-label' htmlFor="email">Email</label>
                            <input className='form-control' type="email" id="email" name="email" {...register("email", { required: "This field is required" })} />
                            {errors.userName && <span className='text-danger'>{errors.userName.message}</span>}
                        </div>
                        <label className='form-label' htmlFor="password">Password</label>
                        <div className="input-group mb-3">
                            <input className='form-control border border-end-0' type={showPassword ? "text" : "password"} id="password" name="password" {...register("password", { required: "This field is required" })} />
                            <button className="btn bg-white border border-start-0" type="button" id="button-addon2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}</button>
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-primary fw-bold' type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
