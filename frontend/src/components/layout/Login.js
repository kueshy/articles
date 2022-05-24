import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = ({history}) => {
    const [email, setEmail] = useState('')
    const [password_hash, setPassword_hash] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        // if(!email){
        //     return alert('User does not exist')
        // }
        // history.push('/')
    })

    const handleSubmit = () => {
        fetch('/login',{
            'method':'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email, password_hash})
        })
        .then(res=>res.json())
        navigate('/')
        
    }

  return (
    <div style={{backgroundColor:'#212121', marginTop:'10px', padding: '10px 30px', borderRadius:'10px'}} className='container col-md-5'>
      <h1 style={{textAlign: 'center'}}>Sign In</h1>
      <form action='POST' onSubmit={handleSubmit}>
            <div>
                <label className='form-label'>Email Address</label>
                <input className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} type='text' placeholder='e.g.johndoe@gmail.com'/>
            </div>

            <div className='mt-2'>
                <label className='form-label'>Password</label>
                <input className='form-control' value={password_hash} onChange={(e)=>setPassword_hash(e.target.value)} type='password' placeholder='***************'/>
            </div> 
            <p style={{textAlign:'end'}} className='mt-2'><a style={{textDecoration: 'none', color:'white'}} href='#'>Forgot Password?</a></p>
            <button className='form-control btn btn-primary mb-2'>Sign in</button>
            <p style={{textAlign:'end', marginTop:'4px'}}>Do not have an account? <a style={{textDecoration: 'none'}} href='/register'>Sign up here</a></p>
      </form>
    </div>
  )
}

export default Login
