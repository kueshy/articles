import React, { useEffect, useState } from 'react'
import APIService from './APIService'

const Form = ({article, updatedData, articleInserted}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(()=>{
      setTitle(article.title)
      setBody(article.body)
    }, [article])

    const updateArticle = () => { 
      APIService.UpdateArticle(article.id, {title, body})
      .then(resp=>updatedData(resp))
      .catch(error=>console.log(error))
    }

    const insertArticle = () => {
      APIService.InsertArticle({title, body})
      .then(resp=>articleInserted(resp))
      .catch(error=>console.log(error))
    }
    
  return (
    <div>
      {/* {edittedArticle && edittedArticle.title} */}
      {article ? (
          <div className='mb-3'>
              <label className='form-label' htmlFor='title'>Title</label>
              <input className='form-control' placeholder='Title' required value={title} onChange={(e)=>setTitle(e.target.value)}/>

              <label className='form-label' htmlFor='body'>Description</label>
              <textarea className='form-control' required placeholder='Article description' value={body} onChange={(e)=>setBody(e.target.value)}/>
              {
                article.id ? <button onClick={updateArticle} className='btn btn-success mt-3'>Update</button> :
                <button onClick={insertArticle} className='btn btn-success mt-3'>Insert</button>
              }
              {/* <button onClick={updateArticle} className='btn btn-success mt-3'>Update</button> */}
          </div>
      ):null}
    </div>
  )
}

export default Form
