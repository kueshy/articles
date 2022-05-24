import React from 'react'
import APIService from './APIService'

const ArticlesList = ({articles, articleEdit, articleDelete}) => {

    const editArticle = (article) => {
        articleEdit(article)
    }

    const deleteArticle =(article) => {
      APIService.DeleteArticle(article.id)
      .then(()=>articleDelete(article))
    }

  return (
    <div>
      {articles && articles.map(article=>{
        return (
          <div className='card' style={{marginBottom:'10px', background:'#212121', padding:'10px', color:'white'}} key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
            <p>{article.date}</p>

            <div className='row'>
                <div className='col-sm-1' style={{marginRight:'20px'}}>
                    <button className='btn btn-primary'
                    onClick={()=>editArticle(article)}>Update</button>
                </div>
                <div className='col' style={{marginLeft: '0px'}}>
                    <button className='btn btn-danger'
                    onClick={()=>deleteArticle(article)}>Delete</button>
                </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ArticlesList
