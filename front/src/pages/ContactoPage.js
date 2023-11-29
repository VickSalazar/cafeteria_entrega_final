import '../styles/components/pages/ContactoPage.css';
import React, { useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from "@fortawesome/free-brands-svg-icons";


import Image from 'react-bootstrap/Image';

const ContactoPage = (props) => {

    // Formulario Contacto
    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    }

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value // forma dinámica
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true);
        const response = await
            axios.post('http://localhost:3000/api/contacto', formData);
        setSending(false);
        setMsg(response.data.mensaje);
        if (response.data.error === false) {
            setFormData(initialForm)
        }
    }



    return (
        <main className="holder contacto" >

            <div>
                <h2>Contacto Rápido</h2>
                <form action="/contacto" method="post" onSubmit={handleSubmit} className="formulario">
                    <p>
                        <label for="nombre">Nombre</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </p>
                    <p>
                        <label for="email">Email</label>
                        <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    </p>
                    <p>
                        <label for="telefono">Teléfono</label>
                        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                    </p>
                    <p className="p_multilinea">
                        <label for="mensaje">Mensaje</label>
                        <textarea name="mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
                    </p>
                    <p>
                        <input type="submit" value="Enviar" />
                    </p>
                    {sending ? <p>Enviando...</p> : null}
                    {msg ? <p>{msg}</p> : null}
                </form>
            </div>

            <div className="datos">
                <h2>Otras vías de Contacto</h2>
                <p>Contactanos por acá también</p>
                <ul>
                    <li>
                        <a href="mailto:surch.vilo@hotmail.com" className="contacto_a">
                            <FontAwesomeIcon icon={faEnvelope} className="contacto_icono" size="xl" />
                            Email: surch.vilo@hotmail.com
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/surch.vilo" className="instagram social contacto_a ">
                            <FontAwesomeIcon icon={faInstagram} className="contacto_icono fab fa-2x fa-instagram" size="xl" />
                            Instagram: @surch.vilo
                        </a>
                    </li>
                </ul>
                <div>
                    <Image src="/images/contacto/rama_de_cafe_img_chica_apaisada_1.jpg" className="contacto_imagen" />                    
                </div>
            </div>
        </main>
    );
}

export default ContactoPage;