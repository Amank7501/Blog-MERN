import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { baseURL } from '../utils/constants';
import axios from 'axios';


const Card = ({ article }) => {
  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.delete(`${baseURL}/delete/${article._id}`)
        .then(console.log("Deleted Successfully"))
      navigate('/')
    } catch (error) {
      console.error("Error deleting article", error);
    }
  }



// Format the createdAt date to a simplified date and time format
const formattedDate = new Date(article.createdAt).toLocaleDateString();
const formattedTime = new Date(article.createdAt).toLocaleTimeString();



  return (
    <li>
      <div className="card mt-4">
        <div className="card-body">
          <h4 className="card-title">{article.title}</h4>
          <div className="card-subtitle text-muted mb-2">{formattedDate} {formattedTime}
          </div>
          <div className="card-text mb-2">{article.description}</div>
          <Link to={`/${article._id}`} className="btn btn-primary mr-4">Read More</Link>
          <Link to={`new/${article._id}`} className="btn btn-info mr-4">Edit</Link>
          <form
            onSubmit={handleSubmit}
            className="d-inline"
          >
            <button type="submit" className="btn btn-danger">Delete</button>
          </form>
        </div>
      </div>
    </li>
  )
}

export default Card