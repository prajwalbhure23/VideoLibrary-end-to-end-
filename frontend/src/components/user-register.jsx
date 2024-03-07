import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function UserRegister(){


    const [users, setUsers] = useState([{UserId:'', UserName:'', Password:'', Email:'', Mobile:''}]);
    const [userError, setUserError] = useState('');

    useEffect(()=>{
        axios.get('https://videolibrary-end-to-end.onrender.com/users')
        .then(response => {
            setUsers(response.data);
        })
     },[]);


    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password:'',
            Email: '',
            Mobile: ''
        },
        onSubmit: (user) => {
            axios.post('https://videolibrary-end-to-end.onrender.com/adduser', user);
            alert('Registered Successfully..');
            navigate('/userlogin');
        }
    })

    function VerifyUser(e){
       for(var user of users){
         if(user.UserId==e.target.value){
             setUserError("User Id Taken - Try Another");
             break;
         } else {
            setUserError("User Id Available");
         }
       }
    }

    return(
        <div className="d-flex justify-content-center align-items-center" style={{height: '90vh'}}>
            
            <form onSubmit={formik.handleSubmit}>
            <h4>Register User</h4>
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" onKeyUp={VerifyUser} onChange={formik.handleChange} name="UserId" /></dd>
                <dd>{userError}</dd>
                <dt>User Name</dt>
                <dd><input type="text" onChange={formik.handleChange} name="UserName" /></dd>
                <dt>Password</dt>
                <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                <dt>Email</dt>
                <dd><input type="email" onChange={formik.handleChange} name="Email" /></dd>
                <dt>Mobile</dt>
                <dd><input type="text" onChange={formik.handleChange} name="Mobile" /></dd>
            </dl>
             <button className="btn btn-primary">Register</button>
             <Link to="/" className="btn btn-light ms-2">Cancel</Link>
            </form>
        </div>
    )
}