
"use client"; // Add this at the very top of the file

import { useState } from 'react';
import { Container, Row, Col,Button ,Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../features/auth/authSlice';
import { RootState, AppDispatch } from '../store';

export default function SignUp() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState({ username: '', email: '', password: '' });
  const Email = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i); 
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  console.log("auth" , auth)

 
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({...error, [e.target.name]: ''})
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(isValid()){
      // console.log("fomr" , form)
      // const res = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(form),
      // });
      // const data = await res.json();
      dispatch(signupUser(form));
    }
  };

  const emailValidation = (email: string) => {
    return Email.test(email);  // Use 'emailRegex' to test the passed 'email'
  };



  const isValid = () =>{
    let isValid =  true ;
    const errors = error
    const check = ['undefined' , null , 'null' ,  [] , '' , undefined]
    if(check.includes(form.username)){
      isValid = false
      errors.username = 'Username is required'
    }
    if(check.includes(form.password)){
      isValid = false
      errors.password = 'password is required'
    }
    if(form.password && form.password.length < 6) {
      isValid = false
      errors.password = 'password must have 6 characters'
    }
    if(check.includes(form.email)){
       isValid = false
      errors.email = 'email is required'
    }
    if(!emailValidation(form.email)){
      errors.email = 'email is not valid'
      isValid = false

    }

    console.log("errors" , errors)

    if (!isValid) {
      setError({ ...error, ...errors });
    }
    return isValid;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col>
          <h3 style={{textAlign:'center'}}> Please Sign Up </h3>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <Col> 
              <Form.Group className='form-group col-sm-12'>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name = 'username'  value={form.username} onChange= {handleInput} />
                {error.username && <span className="error error-massege text-danger">{error.username}</span>}
              </Form.Group>
            </Col>
            <Col> 
              <Form.Group className='form-group col-sm-12'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name = 'email'  value={form.email} onChange= {handleInput} />
                {error.email && <span className="error error-massege text-danger">{error.email}</span>}
              </Form.Group>
            </Col>
            <Col> 
              <Form.Group className='form-group col-sm-12'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name = 'password'  value={form.password} onChange= {handleInput} />
                {error.password && <span className="error error-massege text-danger">{error.password}</span>}
              </Form.Group>
            </Col>
            <Col className="mt-3"> 
              <Button type='submit'> Submit </Button>
            </Col>
          </Form>
        </Col>
      </Row>  
    </Container>
  );
}

