import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email.length === 0) return alert('Email is Required');
        if(password.length === 0) return alert('Password is Required');
        try {
            const res = await axios.post('https://testapptestxyz.herokuapp.com/api/user/login',{email, password});
            localStorage.setItem("id",res.data._id);
            console.log(res.data);
            navigate('/car')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className='d-flex align-items-center justify-content-center mt-5'>
            <form onSubmit={handleSubmit}>
                <h2 className='mt-5'>Sign In</h2>
            <div className="mb-3 mt-4">
                <label for="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" 
                id="exampleFormControlInput1"
                onChange={e=>setEmail(e.target.value)}
                placeholder="name@example.com" />
            </div>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Password</label>
                <input type="password" className="form-control" 
                onChange={e=>setPassword(e.target.value)} 
                id="exampleFormControlInput2" placeholder="password" />
            </div>
            <button className="btn btn-primary">Sign In</button>
            </form>
        </div>
    )
}

export default Login