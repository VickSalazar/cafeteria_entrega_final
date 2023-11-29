import '../styles/components/pages/NosotrosPage.css';
import React from 'react';

const NosotrosPage = (props) => {
    return (
        <main className="holder">
            <div>
                <h2>Conocenos!</h2>
                <p>Te Contamos un poco de todo lo que Surch tiene para vos.</p>
            </div>
            <div className="columnas_nosotros">
                <div className="columna_nosotros">
                    <img src="/images/nosotros/baristas.jpg" alt="Baristas" />
                    <h3>Baristas</h3>
                    <p>Te orientamos a elegir tu café según diferentes métodos de preparado. </p>
                </div>
                <div className="columna_nosotros">
                    <img src="/images/nosotros/cafe_latte.jpg" alt="latte" />
                    <h3>Local</h3>
                    <p>Contamos con mesas adentro y en la vereda para disfrutar donde quieras.</p>
                </div>
                <div className="columna_nosotros">
                    <img src="/images/nosotros/cafe_para_llevar_0.jpg" alt="café para llevar" />
                    <h3>Para Llevar</h3>
                    <p>Llevate tu café para disfrutar de camino. Tenés un 10% de descuento si traes tu vaso. </p>
                </div>
                <div className="columna_nosotros">
                    <img src="/images/nosotros/pasteleria_vegan_1.jpg" alt="pastelería de masa madre con opciones vegana" />
                    <h3>Vegan</h3>
                    <p>Tenemos pastelería de masa madre con varias opciones veganas. </p>
                </div>
                <div className="columna_nosotros">
                    <img src="/images/nosotros/pet_friendly.jpg" alt="pet friendly" />
                    <h3>Pet Friendly</h3>
                    <p>Mascotas felices y con buenos modales son bienvenidas.</p>
                </div>
                <div className="columna_nosotros">
                    <img src="/images/nosotros/home_barista_5.jpg" alt="cuartos de café" />
                    <h3>Home Barista</h3>
                    <p>Llevate a casa nuestros cuartos de café en grano o molidos en el momento. </p>
                </div>
                <div className="columna_nosotros">
                    <img src="/images/nosotros/tostadores.jpg" alt="tostadores de café" />
                    <h3>Tostamos</h3>
                    <p>Elegimos los mejores granos de café de especialidad para tostar y ofrecerte. </p>
                </div>
            </div>
        </main>
    );
}

export default NosotrosPage;