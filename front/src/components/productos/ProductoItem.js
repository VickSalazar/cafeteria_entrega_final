import React from 'react';

import '../../styles/components/pages/ProductosPage.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';

const ProductoItem = (props) => {
  const { p_id, p_titulo, p_precio, p_imagen, p_texto_ribbon, p_clase_ribbon } = props;

  return (
    <Col key={p_id} className='col-lg-3 mb-3 d-flex align-items-stretch'  >
      <Card className="card card-body d-flex flex-column box" >

        {(p_clase_ribbon !== undefined && p_clase_ribbon !== null) && <div className={p_clase_ribbon}><span>{p_texto_ribbon}</span></div>}

        <Card.Img className="card_img mx-auto" variant="top" src={p_imagen}  />
        <Card.Body>
          <Card.Subtitle className="card_subtitle text-center" >{p_titulo}</Card.Subtitle>
        </Card.Body>
        <Card.Footer className="card-footer-mio text-center" >
          <small className="precio">{p_precio} $</small>
        </Card.Footer>
      </Card>
    </Col>
  );

}

export default ProductoItem;