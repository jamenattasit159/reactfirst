import React, { useEffect, useState } from 'react'
// import { Form } from 'react-bootstrap'
// import { Button } from 'react-bootstrap'
// import { Row } from 'react-bootstrap'
// import { Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


function EditProduct() {

    const navigate = useNavigate();
    
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [validationError, setValidationError] = useState({});

    useEffect(() => {
        fetchProduct();
    }, []);
    const fetchProduct = async () => {
        await axios.get(`http://localhost:8000/api/products/${id}`).then(({ data }) => {
            const { title, description } = data.product;
            setTitle(title);
            setDescription(description);
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }
    const changeHandler = (event) => {
        setImage(event.target.files[0]);
    }
    const updateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('title', title);
        formData.append('description', description);
        if (image !== null) {
            formData.append('image', image);
        }

        await axios.post(`http://localhost:8000/api/products/${id}`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate("/")
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.erros)
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }
    return (

        <>

            <div className="mockup-browser border border-base-300 p-4 m-6 bg-neutral">
                <div className="mockup-browser-toolbar">
                    <div className="input border border-base-300">https://JameMyWebsite.com</div>
                </div>
                <div className="flex justify-center px-4 py-16 border-t border-base-300">
                    {Object.keys(validationError).length > 0 && (
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-danger">
                                    <ul className="mb-0">
                                        {Object.entries(validationError).map(([key, value]) => (
                                            <li key={key}>{value}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    <form onSubmit={updateProduct}>
                        <input type="text" value={title} onChange={(event) => { setTitle(event.target.value) }} className="input input-bordered input-accent w-full max-w-xs" /><br /><br />
                        <input type="text" rows={3} value={description} onChange={(event) => { setDescription(event.target.value) }} className="input input-bordered input-accent w-full max-w-xs" /><br /><br />
                        <input type="file" className="file-input file-input-bordered file-input-accent w-full max-w-xs" onChange={changeHandler} /><br /><br />
                        <button className="btn btn-active btn-accent"  type="submit">Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditProduct
