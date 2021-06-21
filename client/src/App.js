import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios'
function App() {
  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieReviewList, setMovieReviewList] = useState([])

  useEffect(()=>{ // USE EFFECT = quand la page charge, on charge le get de l'api, on obtien tout les champs de la bdd et on met le tableau de tout les films dans movieReviewList via setMovieReviewList
    axios.get('http://localhost:3001/api/get').then((response) =>{
      setMovieReviewList(response.data)
    })
  }, [])


  const submitReview = () =>{
    axios.post('http://localhost:3001/api/insert',{
      movieName: movieName, 
      movieReview: review
    }).then(()=>{
      alert("Successful insert")
    })
  }
  return (
    <div className="App">
      <h1> CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name :</label>
        <input type="text" name="movieName" onChange={(e)=>{
          setMovieName(e.target.value)
        }}/>
        <label>Review :</label>
        <input type="text" name="review" onChange={(e)=>{
          setReview(e.target.value)
        }}/>
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val)=>{
          return <h1>Movie name : {val.movieName} | Movie Review : {val.movieReview}</h1>

        })}
      </div>
    </div>
  );
}

export default App;
