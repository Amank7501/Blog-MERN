import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseURL } from '../utils/constants';
import { Link, useNavigate, useParams } from 'react-router-dom';

const New = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        // If an articleId is present, fetch and pre-fill the form
        if (id) {
          axios.get(`${baseURL}/${id}`)
            .then((res) => {
              setArticle(res.data);
            })
            .catch((error) => {
              console.error('Error fetching article:', error);
            });
        }
      }, [id]);

    const handleInputChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Editing an existing article
                await axios.put(`${baseURL}/update/${id}`, article);
              } else {
                // Creating a new article
                await axios.post(`${baseURL}/save`, article);
              }
            navigate('/')
        } catch (error) {
            console.error("Error submitting Article:", error);
        }
    }
    return (
        <div><div className="container mb-4">
            <h1 className="mb-4">New Article</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input required value={article.title} onChange={handleInputChange} type="text" name="title" id="title" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea value={article.description} onChange={handleInputChange} name="description" id="description" className="form-control">Description</textarea>
                </div>
                <Link to="/" className="btn btn-secondary mr-4">Cancel</Link>
                <button type="submit" className="btn btn-primary">Save</button>

            </form>
        </div></div>
    )
}

export default New