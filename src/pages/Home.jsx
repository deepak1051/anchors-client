import { useState } from 'react'

import { useNavigate } from 'react-router-dom'


const Home = () => {
  const [link, setLink] = useState('')
  const navigate = useNavigate()
  return (
    <div className='p-4 text-center mx-auto flex flex-col gap-10 mt-6 max-w-xl'>

      <h1 className="text-4xl font-bold">
        Discover your earning potential
      </h1>

      <h2 className='text-2xl font-semibold'>
        Turn your Youtube expertise into a lucrative income
        through resource sharing
      </h2>
      <div className='flex gap-4'>
        <input className='border-2 rounded-full p-2 w-full border-slate-400 text-black outline-0 font-medium text-lg' value={link} onChange={e => setLink(e.target.value)} />
        <button onClick={() => navigate(`/${link}`)} className='border bg-red-500 border-red-600 px-6 rounded'>Search</button>
      </div>

    </div>
  )
}

export default Home

