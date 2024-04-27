import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const Mydata = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        message: ""
    });
    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
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

        if (!formData.firstname) {
            newErrors.firstname = "First name is required !!";
            isValid = false;
        } else {
            newErrors.firstname = "";
        }

        if (!formData.lastname) {
            newErrors.lastname = "Last name is required !!";
            isValid = false;
        } else {
            newErrors.lastname = "";
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
                            firstname: "",
                            lastname: "",
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
        <div className="min-vh-100 align-items-center justify-content-center flex-column d-flex bg-img gap-4">
            <h1 className=" h1-line">EMAIL JS</h1>
            <div className="d-flex flex-column formbox h-100 w-100">
                <form ref={form} className="d-flex flex-column gap-2 mx-auto" onSubmit={sendEmail}>
                    <div className="d-flex flex-column">
                        <input className="inpt" type="text" name="firstname" placeholder="First name" value={formData.firstname} onChange={handleInputChange} />
                        <div className="error text-danger">{errors.firstname}</div>
                    </div>
                    <div className="d-flex flex-column">
                        <input className="inpt" type="text" name="lastname" placeholder="Last name" value={formData.lastname} onChange={handleInputChange} />
                        <div className="error text-danger">{errors.lastname}</div>
                    </div>
                    <div className="d-flex flex-column ">
                        <input className="inpt" type="email" name="username" placeholder="Email" value={formData.username} onChange={handleInputChange} />
                        <div className="error  text-danger">{errors.username}</div>
                    </div>
                    <div className="d-flex flex-column">
                        <textarea name="message" className="textarea" placeholder="Message" value={formData.message} onChange={handleInputChange} />
                        <div className="error  text-danger">{errors.message}</div>
                    </div>
                    <input className="bttn" type="submit" value="Send" />
                </form>
            </div>
        </div>
    );
};

export default Mydata;
