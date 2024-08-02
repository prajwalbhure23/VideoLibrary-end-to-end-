import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";

export function DeleteVideo()
{
    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Comments:'', Category_Id:0}]);
    
    let navigate = useNavigate();
    
    let params = useParams();

    useEffect(()=>{
        axios.get(`hhttps://videolibrary-end-to-end-1.onrender.com/video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    },[]);

    function handleDeleteClick(){
        axios.delete(`https://videolibrary-end-to-end-1.onrender.com/${params.id}`);
        alert('Video Deleted');
        navigate('/admindashboard');
    }

     return(
        <div className="d-flex justify-content-center align-items-center" style={{height: '90vh'}}>
            <div>
                <h3>Delete Video</h3>
                    <h3>{videos[0].Title}</h3>
                    <iframe src={videos[0].Url} width="400" height="300"></iframe>
                <div className="mt-3">
                    <button onClick={handleDeleteClick} className="btn btn-danger me-2">Delete</button>
                    <Link to="/admindashboard" className="btn btn-warning">Cancel</Link>
                </div>
            </div>
        </div>
     )
}
