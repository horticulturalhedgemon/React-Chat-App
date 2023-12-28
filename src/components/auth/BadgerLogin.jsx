import React from 'react';
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import {useRef, useContext} from "react";
import { useNavigate } from "react-router-dom";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogin() {

const username = useRef()
const password = useRef()
const gogo = useNavigate()
const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
const login = () => {
    if (username.current.value === '' || password.current.value === '') {
        alert("You must provide both a username and password!")
    }
    else {
        fetch(`https://cs571.org/api/f23/hw6/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username : username.current.value,
                password: password.current.value
            })
        })
        .then(res => {
            console.log(res.status)
            console.log(res)
            //if conflict, send alert (409)
            if (res.status === 401) {
                alert('Incorrect username or password!')
            }
            else if (res.status == 200) {
                alert('Login successful!')
                setLoginStatus(true)
                sessionStorage.setItem('loginStatus',true)
                sessionStorage.setItem('username',username.current.value)
                gogo('/')
            }
        })
        
    }
}
return <>
    <h1>Login</h1>
    <Form>
        <Form.Label htmlFor="Username">Username</Form.Label>
        <Form.Control id="Username" ref = {username}/>
        <Form.Label htmlFor="Password">Password</Form.Label>
        <Form.Control id="Password" ref = {password}/>
    </Form>
    <Button onClick={login}>Login</Button>
</>
}
