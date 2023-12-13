import { Link } from "react-router-dom"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import validator from 'validator'
import axios from 'axios'
import Model from "./Model";
import tick from '../assets/tick.svg'


const Header = () => {
  const [showModel, setShowModel] = useState(false);
  const [isSent, setIsSent] = useState(false)
  const [loading, setIsLoading] = useState(false)

  const [name, setName] = useState('');
  const [number, setNumber] = useState('')

  const onSubmitForm = async (e) => {
    e.preventDefault()
    console.log('first')

    if (name.trim().length === 0) {
      toast.error('Please provide a name')
      return
    }

    if (!validator.isMobilePhone(number)) {
      toast('Enter a valid 10 digits contact number')
      return
    }

    try {
      setIsLoading(true)
      await axios.post('/api/sendMail', { name, number })
      setIsSent(true)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }


  }
  const navigate = useNavigate()

  const handleClick = () => {
    setShowModel(true);
  };
  const onClose = () => {
    setShowModel(false);
  };
  const model = (
    <Model
      onClose={onClose}

    >
      {isSent ? <div className="flex flex-col justify-center items-center gap-2">
        <img src={tick} alt="" />
        <h2 className="font-semibold text-2xl">Request a call back</h2>
        <p>Our Team will call you shortly in 12-24 hrs</p>
        <p>Can’t you wait for call?</p>
        <button onClick={() => {
          setIsSent(false)
          onClose()
          navigate('/')
        }} className="bg-red-500 py-2 px-4 rounded-full">Check another video</button>
      </div> : <form className="flex   text-center justify-center">
        <div className="max-w-2xl flex flex-col gap-2">
          <h4 className="p-2 font-semibold text-lg">Request a call back</h4>
          <input className="p-2 rounded w-full text-black" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
          <input type='tel' placeholder="Mobile Number" className="p-2 rounded w-full text-black" onChange={e => setNumber(e.target.value)} value={number} />
          <button onClick={onSubmitForm} className="border p-2 bg-slate-300 text-black rounded-full font-bold" disabled={loading}>{loading ? "Requesting..." : "Request a call back"}</button>
        </div>
      </form>}



    </Model>
  );

  return (
    <div className='container mx-auto px-10 py-4 flex justify-between'>
      <Link to="/" className="text-4xl">Anchors</Link>
      <div><button onClick={handleClick} className="border rounded-full px-4 py-2">Request a call back</button></div>
      {showModel && model}
    </div>
  )
}

export default Header


