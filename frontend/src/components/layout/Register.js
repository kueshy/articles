import React, { useEffect, useState } from 'react'

const Register = ({history}) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password_hash, setPassword_hash] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(()=>{
        
    },[])

    const handleSubmit = () => {
        if (password_hash !== confirmPassword){
            return alert('Password do not match')
        }else{
            fetch('/register',{
                'method':'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({username,email,password_hash})
            },[])
            .then(resp=>resp.json())

            history.push('/')
            // .then(res=>console.log(username,email,password_hash))
        }
        
    }

    console.log(username,email,password_hash)

  return (
    <div style={{backgroundColor:'#212121', marginTop:'10px', padding: '10px 30px', borderRadius:'10px'}} className='container col-md-5'>
      <h1 style={{textAlign: 'center'}}>Sign Up</h1>
      <form action='POST' onSubmit={handleSubmit}>
            <div>
                <label className='form-label'>Full Name</label>
                <input className='form-control' name='username' value={username} onChange={(e)=>setUsername(e.target.value)} type='text' placeholder='e.g.John Doe'/>
            </div>
            <div className='mt-3'>
                <label className='form-label'>Email Address</label>
                <input className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} type='text' placeholder='e.g.johndoe@gmail.com'/>
            </div>

            <div className='mt-3'>
                <label className='form-label'>Password</label>
                <input className='form-control' value={password_hash} onChange={(e)=>setPassword_hash(e.target.value)} type='password' placeholder='************'/>
            </div> 
            <div className='mt-3'>
                <label className='form-label'>Confirm Password</label>
                <input className='form-control' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type='password' placeholder='************'/>
            </div> 

            <div className='mt-4'>
                <button className='form-control btn btn-primary mb-2'>Sign up</button>
            </div>
            <p style={{textAlign:'end', marginTop:'3px'}}>Already have an account? <a style={{textDecoration: 'none'}} href='/register'>Sign in</a></p>
      </form>
    </div>
  )
}

export default Register
