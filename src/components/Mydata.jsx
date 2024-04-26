import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const Mydata = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        message: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        username: "",
        message: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const sendEmail = (e) => {
        e.preventDefault();

        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.name) {
            newErrors.name = "Name is required !!";
            isValid = false;
        } else {
            newErrors.name = "";
        }

        if (!formData.username) {
            newErrors.username = "Email is required !!";
            isValid = false;
        } else {
            newErrors.username = "";
        }

        if (!formData.message) {
            newErrors.message = "Message is required !!";
            isValid = false;
        } else {
            newErrors.message = "";
        }

        setErrors(newErrors);

        if (isValid) {
            emailjs
                .sendForm("service_k8l86ig", "template_7k57vgi", form.current, {
                    publicKey: "_TOKdjfGgbKO-yKBH",
                })
                .then(
                    () => {
                        console.log("SUCCESS!");
                        setFormData({
                            name: "",
                            username: "",
                            message: ""
                        })
                    },
                    (error) => {
                        console.log("FAILED...", error.text);
                    }
                );
        }
    };

    return (
        <div className="min-vh-100 align-items-center justify-content-center d-flex">
            <div className="d-flex flex-column formbox h-100 w-100">
                <form ref={form} className="d-flex flex-column gap-2 mx-auto" onSubmit={sendEmail}>
                    <div className="d-flex flex-column">
                        <label className="text">Name :</label>
                        <input className="inpt" type="text" name="name" value={formData.name} onChange={handleInputChange} />
                        <div className="error text-danger">{errors.name}</div>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="text">Email :</label>
                        <input className="inpt" type="email" name="username" value={formData.username} onChange={handleInputChange} />
                        <div className="error  text-danger">{errors.username}</div>
                    </div>
                    <div className="d-flex flex-column">
                        <label className="text">Message :</label>
                        <textarea name="message" className="textarea" value={formData.message} onChange={handleInputChange} />
                        <div className="error  text-danger">{errors.message}</div>
                    </div>
                    <input className="bttn" type="submit" value="Send" />
                </form>
            </div>
        </div>
    );
};

export default Mydata;
