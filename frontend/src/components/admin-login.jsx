import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminLogin(){

    let navigate = useNavigate();
    const [users, setUsers] = useState([{UserId:'', Password:''}]);
    const [userError, setUserError] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies('adminName');

    const formik = useFormik({
        initialValues : {
            UserId: '',
            Password:''
        },
        onSubmit: (values)=>{
            var user = users.find(item=> item.UserId===values.UserId);
            if(user.Password===values.Password){
                setCookie("adminName", user.UserId);
                navigate("/admindashboard");
            } else {
                setUserError("Invalid Credentials");
            }
        }
    })

    useEffect(()=>{
        axios.get('https://videolibrary-end-to-end-1.onrender.com/admin')
        .then((response)=>{
            setUsers(response.data);
        })
    },[]);



    return(
        <div className="d-flex justify-content-center align-items-center" style={{height: '90vh'}}>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" /></dd>
                </dl>
                <button className="btn btn-primary">Login</button>
                <Link to="/aregister" className="btn btn-success ms-2">New User ? </Link>
                <p className="h3 text-danger">{userError}</p>
            </form>
        </div>
    )
}
