
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Badge } from 'react-bootstrap';
import CommentCard from './CommentCard';
import AddComment from './AddComment';

function Post({ match, comment }) {

    const [post, setPost] = useState({
        title: "",
        categoryName: "",
        eventDate: "",
        eventName: "",
        punctuaction: "",
        content: "",
    });

    const [comments, setComments] = useState([]);

    const [credentials, setCredentials ] = useState({
        isLogged: true,
        role: "USER"
    })

    useEffect(() => {
        fetch(`http://localhost:8090/posts/${match.params.id}`)
            .then((response) => response.json())
            .then((post) => { 
                setPost(post);
                console.log(post);
             });
    }, [setPost, match]);

    useEffect(() => {
        fetch(`http://localhost:8090/posts/${match.params.id}/comments`)
            .then((response) => response.json())
            .then((comments) => {
                setComments(comments);
                console.log(comments);
            });
    }, [setComments, match]);

    return (
        <Jumbotron fluid>
            <Container id="postPage">
                <div className="row"><h2>{post.title}</h2></div><br />
                <div className="row"><Badge pill variant="success">{post.categoryName.toUpperCase()}</Badge></div><br />
                <div className="row">
                    <div className="col-md-9"><h6>Posted by: {post.userAlias} | {post.createDate}</h6></div>
                    <div className="col-md-3"><h6>PUNTUACIÓN {post.punctuaction}</h6>
                    
                    {credentials.isLogged
                    ? <Button>LIKE</Button>
                    : null
                    }
                    
                    </div>
                </div><br />
                {/* Para establecer contenido html directamente desde React usamos el atributo dangerouslySetInnerHTML
                (reemplaza el uso de innerHTML) se hace de este modo para evigtar así ataques XSS(cross-site scripting) */}
                <div className="row"><p dangerouslySetInnerHTML={{__html: post.content.replace('\n', '<br />')}}/></div>
            
            </Container><br /><br />
            <Container id="commentsPost">
            <div className="row"><h5>COMENTARIOS: </h5></div><br />
            {comments.map((comment, i) => (
                <CommentCard
                    key={`comment_${i}`}
                    comment={comment}
                />
            ))}
            </Container><br /><br />
            <Container id="addComments">
                <div className="row"><h5>Dejanos tu Comentario:</h5></div><br />
                <AddComment comment={comment} postId={post.id} addComment={(c) => setComments(comments.concat(c))}/>
            </Container>
        </Jumbotron>
    );
}

export default Post;
