import React from 'react'
import { useState, useEffect} from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'
const Demo = () => {
  const [article, setArticle] = useState({
    url:'',
    summary: '',
  });

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [allArticles, setArticles] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const existingArticle = allArticles.find(
    //   (item) => item.url === article.url
    // );

    // if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and local storage
      setArticle(newArticle);
      setArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      
    }

  };
  return (
    
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center'
         onSubmit={handleSubmit}>
          <img src = {linkIcon} alt = "link-icon" className='absolute left-0 my-2 ml-3 w-5' />
          <input type='url' 
          className='url_input peer' 
          placeholder='Enter a URL' 
          value= {article.url}
          onChange={(e)=>{setArticle({...article, url:e.target.value})}} 
          required />
          <button type = "submit" 
          className='submit_btn 
          peer-focus: border-gray-700
          peer-focus:text-gray-700'>
          <p>↵</p>
          </button>
          
           </form>
           {/* Browse URL history */}
           <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
            {allArticles.map((item,index) => (
              <div key={`link-${index}`} 
              onClick ={() => setArticle(item)}
              className='link_card'
              >
                <img src={copy} alt='copy' className='w-[40] h-[40] object-contain' />
                <p className='flex-1 font-satoshi text-blue-700
                font-medium text-sm truncate'>
                  {item.url}
                  </p>
                </div>
            ))}
           </div>

      </div>

      {/* Display the summary */}
    </section>
  )
}

export default Demo