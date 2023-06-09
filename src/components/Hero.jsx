import React from 'react'
import logo2 from '../assets/logo2.svg'
const Hero = () => {
  return (
   <header className='w-full flex justify-center items-center flex-col'>
    <nav className='flex justify-between items-center w-full mb-10 pt-3'>
      <img src = {logo2} alt = 'logo' className = 'p-6 w-23 object-contain pt-8' />
      <button type = "button" className='black_btn pt-8' onClick={() => window.open('https://github.com/anniedavid13/Summarizer-WebApp')} > Github  </button>
    </nav>
    <h1 className='head_text items-center'> 
    Summarize your text in a few clicks! <br />
    using <br />
    <span className='orange_gradient pt-4'>  OPEN AI GPT-4</span>
        </h1>
    <h2 className='desc'> Get the gist without the fuss! Our article summarizer web app saves you time and effort, so you can focus on what matters most.</h2>
   </header> 
  )
}

export default Hero