import { useEffect, useState } from 'react';
import '../../App.css';
// import ArticlesList from './components/ArticlesList';
// import Form from './components/Form';
import {Link} from 'react-router-dom'
import ArticlesList from '../ArticlesList';
import Form from '../Form';
// import useFetch from './components/useFetch';

function Home() {
  const [articles, setArticles] = useState([])
  const [edittedArticle, setEdittedArticle] = useState(null)

  useEffect(() => {
    fetch('/get')
      .then(res => res.json())
      .then(resp => setArticles(resp))
      .catch(error => console.log(error))

    // fetch('/')
  }, [])

  const articleEdit = (id) => {
    setEdittedArticle(id)
  }

  const updatedData = (article) => {
    const new_article = articles.map(my_article => {
      if (my_article.id === article.id) {
        return article
      } else {
        return my_article
      }
    })
    setArticles(new_article)
  }

  const openForm = () => {
    setEdittedArticle({ title: '', body: '' })
  }

  const articleInserted = (article) => {
    const new_article = [...articles, article]
    setArticles(new_article)
  }

  const articleDelete = (article) => {
    const new_articles = articles.filter(myarticle => {
      if (myarticle.id === article.id) {
        return false
      }
      return true
    })
    setArticles(new_articles)
  }

  return (
    <>
      
      

        <div className='row'>
          <div className='col'>
            <h1>Flask React App</h1>
          </div>
          <div className='col'>
            <button onClick={openForm} className='btn btn-success'>Insert Data</button>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8'>
            <ArticlesList articles={articles} articleEdit={articleEdit} articleDelete={articleDelete} />
          </div>
          <div className='col-md-4'>
            {edittedArticle ? <Form article={edittedArticle} updatedData={updatedData} articleInserted={articleInserted} /> : null}
          </div>
        </div>
    </>
  );
}

export default Home;
