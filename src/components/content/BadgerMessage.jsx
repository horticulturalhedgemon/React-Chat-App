import React from "react"
import { Button, Card } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);
    //background color from https://www.pluralsight.com/guides/how-to-add-a-custom-bsstyle-property-to-a-button-with-react
    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        
        {props.poster === sessionStorage.getItem('username') ? <Button style={{background:'red'}} onClick={() => props.deletePost(props.id)}>Delete Post</Button> : ''}
    </Card>
}

export default BadgerMessage;