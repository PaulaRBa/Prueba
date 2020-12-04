
import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { keyBy } from 'lodash';

function AddPost() {

    const [post, setPost] = useState({
        title: "",
        categoryId: "",
        eventDate: "",
        eventName: "",
        //postPicture:'',
        content: "",
        //userAlias: '', YA ESTOY REGISTRADO, así que lo cojo del usuario
    });

    const [errors, setErrors] = useState({});

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8090/categories/list")
            .then((response) => response.json())
            .then((categories) => {
                setCategories(categories);
            });
    }, []);

    //Función que coloca los nuevos elementos en el state de Post
    const onChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let response = await fetch("http://localhost:8090/posts", {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                "Content-type": "application/json",
            },
        });
        let data = await response.json();
        if (response.ok) {
            console.log(data);
        } else {
            let newErrors = keyBy(data, (error) => error.field);
            console.log(newErrors);
            setErrors(newErrors);
        }
    };

    return (
        <Form id="addPostForm" onSubmit={onSubmit}>
            <br /><h1>AÑADIENDO NUEVO POST</h1>
            <br /><h2>Este apartado solo pueden verlo los Usuarios Administradores</h2>
            <br />
            <Form.Row>
                <Form.Group as={Col} md="8">
                    <Form.Label> Título: </Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Título del nuevo Post"
                        value={post.title}
                        onChange={onChange}
                        isInvalid={errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title?.defaultMessage}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="categorySelect">
                    <Form.Label> Categoría: </Form.Label>
                    <Form.Control
                        as="select"
                        name="categoryId"
                        onChange={onChange}
                        isInvalid={errors.categoryId}
                    >
                        <option value="" >Selecciona una categoría </option>
                        {categories.map((category, i) => (
                            <option key={i} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.categoryId?.defaultMessage}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="8">
                    <Form.Label> Evento: </Form.Label>
                    <Form.Control
                        type="text"
                        name="eventName"
                        placeholder="Evento al que se refiere"
                        value={post.eventName}
                        onChange={onChange}
                        isInvalid={errors.eventName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.eventName?.defaultMessage}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label> Fecha del Evento: </Form.Label>
                    <Form.Control
                        type="date"
                        name="eventDate"
                        value={post.eventDate}
                        onChange={onChange}
                        isInvalid={errors.eventDate}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.eventDate?.defaultMessage}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                {/* <Form.Group as={Col} md="2">
            <Form.Label> Imagen: </Form.Label>
            <Form.Control
              type="image"
              name="postPicture"
              value={postPicture}
              onChange={onChange}
            />
          </Form.Group> */}
                <Form.Group as={Col} md="10">
                    <Form.Label> Contenido: </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="10"
                        name="content"
                        placeholder="Escribe tu nuevo Post..."
                        value={post.content}
                        onChange={onChange}
                        isInvalid={errors.content}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.content?.defaultMessage}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Button type="submit" variant="success">GUARDAR POST</Button><br /><br />
        </Form>
    );
}

export default AddPost;
