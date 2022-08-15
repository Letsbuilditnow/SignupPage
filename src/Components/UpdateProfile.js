import React,{useRef,useState} from 'react'
import {Form,Button,Card,Alert} from 'react-bootstrap'
import {useAuth} from '../Context/AuthContext'
import {Link,useNavigate} from 'react-router-dom'

function UpdateProfile() {
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const { currentUser,updatePassword,updateEmail } =useAuth();
    const [error,setError]=useState();
    const [loading,setLoading]=useState(false); 
    const navigate=useNavigate()

 function handleSubmit(e){
        e.preventDefault()
        if(passwordRef.current.value !==passwordConfirmRef.current.value){
            return setError("Passwords Do Not Match")
        }
    setLoading(true)
    setError("")
        const promises=[]
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        } if(passwordRef.current.value ){
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(()=>{
navigate('/login')
        } ).catch(()=>{
          setError("Failed to update account")  
        }).finally(()=>{
            setLoading(false)
        })
        
    
    }
  return (
    <>
    <Card>
<Card.Body>
    <h2 className='text-center mb-4'>Update Profile</h2>
    {error && <Alert variant="danger">{error}</Alert>  }
    <Form onSubmit={handleSubmit}>
        <Form.Group id="email">
            <Form.Label>
                Email
            </Form.Label>
            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}>

            </Form.Control>

        </Form.Group>
        <Form.Group id="password">
            <Form.Label>
                Password
            </Form.Label>
            <Form.Control type="password" ref={passwordRef}  placeholder='Leave blank to keep the same'>

            </Form.Control>

        </Form.Group> <Form.Group id="password-confirm">
            <Form.Label>
                Password Confirmation
            </Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef}  placeholder="Leave blank to keep the same">

            </Form.Control>

        </Form.Group>
       
        <Button disabled={loading} className="w-100 mt-2" type='submit'>
           Update
        </Button>
    </Form>
    <div className='w-100 text-center mt-2 mb-2'><Link to='/forgot-password'>Forgot Password??</Link></div>
</Card.Body>
    <div className='w-100 text-center mt-2 mb-2'><Link to='/dashboard'>
     Cancel</Link></div>
    </Card>
    </>
  )
}

export default UpdateProfile