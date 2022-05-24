import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [articles, setArticles] = useState([{}])

  useEffect(()=>{
    fetch(url)
    .then(res=>res.json())
    .then(resp=>setArticles(resp))
    .catch(error=>console.log(error))
  }, [url])

  return [articles, setArticles]

  // console.log(articles)
}

export default useFetch
