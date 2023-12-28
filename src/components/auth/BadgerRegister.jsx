import React from 'react';
import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import {useState, useEffect} from "react";

export default function BadgerRegister() {

    // TODO Create the register component.
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [cPassword,setCPassword] = useState('')
    const register = () => {
        if (username === '' || password === '') {
            alert("You must provide both a username and password!")
        }
        else if (password !== cPassword) {
            alert("Passwords do not match!")
        }
        else {
            fetch(`https://cs571.org/api/f23/hw6/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username : username,
                    password: password
                })
            })
            .then(res => {
                console.log(res.status)
                console.log(res)
                //if conflict, send alert (409)
                if (res.status === 409) {
                    alert('That username has already been taken!')
                }
                else if (res.status == 200) {
                    alert('Your registration was successful!')
                }
            })
            
        }
    }
    return <>
        <h1>Register</h1>
        <Form>
            <Form.Label htmlFor="Username">Username</Form.Label>
            <Form.Control id="Username" value = {username} onChange = {e => setUsername(e.target.value)}/>
            <Form.Label htmlFor="Password">Password</Form.Label>
            <Form.Control id="Password" value = {password} onChange = {e => setPassword(e.target.value)}/>
            <Form.Label htmlFor="cPassword">Confirm Password</Form.Label>
            <Form.Control id="cPassword" value = {cPassword} onChange = {e => setCPassword(e.target.value)}/>
        </Form>
        <Button onClick={register}>Register</Button>
    </>
}
