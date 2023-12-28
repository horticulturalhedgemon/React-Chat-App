import React, { useEffect, useState, useContext, useRef } from "react"
import BadgerMessage from "./BadgerMessage"
import { Button, Container, Row, Col, Pagination, Form } from "react-bootstrap";
/*
In `BadgerChatroom.jsx`, fetch the data for the first page of messages and display them as `BadgerMessage` components.

`BadgerMessage` takes four props: `title`, `poster`, `content`, and `created`. Don't forget to specify a unique `key`!
If there are no messages on this page, display text stating "There are no messages on  this page yet."
It is okay for this text to appear if you are still loading messages.

Be sure to use [react-bootstrap](https://www.npmjs.com/package/react-bootstrap) to make your design responsive!
There are no strict requirements for which breakpoints to use, but your design should display more columns on larger devices.
Try resizing your window to test this.
*/
export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page,setPage] = useState(1)
    const title = useRef()
    const content = useRef()
    const pageHtml = () => {
        let pageHtmlG = []
        //for length
        for (let i=1;i<=4;i++) {
            pageHtmlG.push(
                <Pagination.Item key = {'page' + i} active={page === i} onClick={() => {
                    setPage(i)
                    }
                }>{i}</Pagination.Item>
            )
        }
        return pageHtmlG
    }
    useEffect(() => {
        loadMessages()
        console.log('effects used')
    },[page])
    const loadMessages = () => {
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
            console.log(json.messages)
        })
        console.log("Messages loaded")
    };
    const createPost = () => {
        if (title.current.value === '' || content.current.value === '') {
            alert("You must provide both a username and password!")
        }
        else {
            fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title : title.current.value,
                    content: content.current.value
                })
            })
            .then(res => {
                console.log(res.status)
                console.log(res)
                //if conflict, send alert (409)
                if (res.status === 401) {
                    alert('You must be logged in to post!')
                }
                else if (res.status === 200) {
                    alert('Successfully posted!')
                    loadMessages()
                }
            })
            
        }
    }
    const deletePost = (id) => {
        fetch(`https://cs571.org/api/f23/hw6/messages?id=${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    "X-CS571-ID": CS571.getBadgerId()
                }
            })
            .then(res => {
                console.log(res.status)
                console.log(res)
                //if conflict, send alert (409)
                if (res.status === 200) {
                    alert('Successfully deleted the post!')
                    loadMessages()
                }
            })
    }

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
        }
        <hr/>
        <>
                
                <Container fluid>
                    <Row>
                    {
                        /* TODO: Complete displaying of messages. */
                        /*
                        `BadgerMessage` takes four props: `title`, `poster`, `content`, and `created`. Don't forget to specify a unique `key`!
                        If there are no messages on this page, display text stating "There are no messages on  this page yet."
                        It is okay for this text to appear if you are still loading messages.
                        */
                        
                        //below line shows the subarray of retHtml, which is the set of students, determined by the value of page
                        messages.length > 0 ?
                        messages.map(message => 
                            {return <Col xs={12} sm={6} md={4} lg={3} key = {`${message.id}`}><BadgerMessage id = {message.id} title={message.title} poster={message.poster} content={message.content} created={message.created} deletePost = {deletePost}></BadgerMessage></Col>
                        })
                        : <p>There are no messages on this page yet!</p>
                    }
                    <Pagination>
                    {pageHtml()}
                </Pagination>
                    </Row>
                <Form>
                        <Form.Label htmlFor="Title">Post Title</Form.Label>
                        <Form.Control id="Title" ref = {title}/>
                        <Form.Label htmlFor="Content">Post Content</Form.Label>
                        <Form.Control id="Content" ref = {content}/>
                    </Form>
                    <Button onClick={createPost}>Create Post</Button>
                </Container>
                </>
                
    </>
}
