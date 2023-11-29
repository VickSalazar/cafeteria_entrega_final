import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductoItem from '../components/productos/ProductoItem';

import '../styles/components/pages/ProductosPage.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Row from 'react-bootstrap/Row';


const ProductosPage = (props) => {

    const [loading, setLoading] = useState(false);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const cargarProductos = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/productos');
            setProductos(response.data);
            setLoading(false);
        };

        cargarProductos();
    }, []);

    return (
        <section className="holder">
            <Row xs={1} md={4} className="g-4">
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    productos.map(item => <ProductoItem key={item.id}
                        p_id={item.id} p_titulo={item.titulo} p_precio={item.precio}
                        p_imagen={item.imagen} p_texto_ribbon={item.texto_ribbon}
                        p_clase_ribbon={item.clase_ribbon}
                    />)
                )}
            </Row>
        </section>
    );

}

export default ProductosPage;