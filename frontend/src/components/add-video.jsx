import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function AddVideo(){

    const [categories, setCategories] = useState([{Category_Id:0, CategoryName:''}]);
    
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            VideoId: 0,
            Title: '',
            Url: '',
            Likes: 0,
            Comments:'',
            Category_Id:0
        },
        onSubmit : (values)=>{
            axios.post('https://videolibrary-end-to-end.onrender.com/addvideo', values);
            alert('Video Added Successfully..');
            navigate('/admindashboard');
        }
    })

    function LoadCategories(){
        axios.get('https://videolibrary-end-to-end.onrender.com/categories')
        .then(response=>{
            response.data.unshift({Category_Id:-1, CategoryName:'Select Category'});
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
    },[]);


    return(
        <div className="d-flex justify-content-center align-items-center" style={{height: '90vh'}}>
            
            <form onSubmit={formik.handleSubmit}>
            <h4>New Video</h4>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" onChange={formik.handleChange} name="VideoId"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Title" /></dd>
                    <dt>Url</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Url" /></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" onChange={formik.handleChange}  name="Likes"/></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Comments"/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="Category_Id" onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option value={category.Category_Id} key={category.Category_Id}>
                                        {category.CategoryName.toUpperCase()}
                                    </option>
                                    )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}