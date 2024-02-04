import React, { useState } from 'react'
// import { Form } from 'react-bootstrap'
// import { Button } from 'react-bootstrap'
// import { Row } from 'react-bootstrap'
// import { Col } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function CreateProduct() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();
    const [validationError, setValidationError] = useState({});

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
    }

    const createProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
        await axios.post(`http://localhost:8000/api/products`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate("/");
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors);
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }

    return (<>
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
        <div className="mockup-browser border border-base-300 p-4 m-6 bg-neutral">
            <div className="mockup-browser-toolbar">
                <div className="input border border-base-300">https://JameMyWebsite.com</div>
            </div>
            <div className="flex justify-center px-4 py-16 border-t border-base-300">
                <form onSubmit={createProduct}>
                    <input type="text" value={title} onChange={(event) => {
                        setTitle(event.target.value)
                    }} placeholder="title" className="input input-bordered input-accent w-full max-w-xs" /><br /><br />
                    <input type="text" value={description} onChange={(event) => {
                        setDescription(event.target.value)
                    }} placeholder="description" className="input input-bordered input-accent w-full max-w-xs" /><br /><br />
                    <input type="file" className="file-input file-input-bordered file-input-accent w-full max-w-xs" onChange={changeHandler} /><br /><br />

                    <button class="btn btn-active btn-accent" type="submit">Accent</button>
                </form>
            </div>
        </div>

    </>

    )
}

export default CreateProduct
