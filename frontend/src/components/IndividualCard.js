import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { baseURL } from '../utils/constants';
import axios from 'axios';

const IndividualCard = () => {
    
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        try {
            await axios.delete(`${baseURL}/delete/${id}`)
                .then(console.log("Deleted Successfully"))
            navigate('/')
        } catch (error) {
            console.error("Error deleting article", error);
        }
    }

    useEffect(() => {
        // Fetch the article data based on the id
        axios.get(`${baseURL}/${id}`).then((res) => {
            setArticle(res.data);
        });
    }, [id]);


   
// Format the createdAt date to a simplified date and time format
const formattedDate = new Date(article.createdAt).toLocaleDateString();
const formattedTime = new Date(article.createdAt).toLocaleTimeString();


    return (
        <div>

            <Link to='/' className='btn btn-primary m-4'>All Articles</Link>
            <div className="card mt-4">
                <div className="card-body">
                    <h4 className="card-title">{article.title}</h4>
                    <div className="card-subtitle text-muted mb-2">{formattedDate} {formattedTime}</div>
                    <div className="card-text mb-2">{article.description}</div>
                    <div className='d-flex'>
                        <Link to={`/new/${article._id}`} className="btn btn-info mr-4">Edit</Link>
                        <button onClick={handleSubmit} type="submit" className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualCard