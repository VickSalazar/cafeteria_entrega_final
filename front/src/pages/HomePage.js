import '../styles/components/pages/HomePage.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

const HomePage = (props) => {

    return (
        <main className="holder">
            <div className="columnas_homepage">
                <div className="columna_homepage">

                    <Carousel fade>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-100 imagen_responsive"
                                src="/images/homepage/cafeteria.jpg"
                                alt="Nuestro Local"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-100 imagen_responsive"
                                src="/images/homepage/carousel_foto_2_cafe.jpg"
                                alt="Máquina Espresso Rocket y Café para Llevar"
                            />
                        </Carousel.Item>

                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-100 imagen_responsive"
                                src="/images/homepage/carousel_foto_5_frente_surch.jpg"
                                alt="Nuestra Veredita"
                            />
                        </Carousel.Item>

                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-100 imagen_responsive"
                                src="/images/homepage/carousel_foto_3_cafe_en_mesa.jpg"
                                alt="Mesa con latte, flat white y medialunas para 2"
                            />
                        </Carousel.Item>

                    </Carousel>
                </div>
                <div className="columna_homepage">
                    <div className="columna_homepage_fila">
                        <h2> Bienvenidos</h2>
                        <p>Te esperamos en nuestro espacio para compartir el mejor café y toda la buena onda de nuestros baristas!
                        </p>
                    </div>
                    <div className="columna_homepage_fila">
                        <h2> Café de Especialidad</h2>
                        <p>Es un término creado en los años 1970s por Erna Knutsen para definir lotes de cafés pequeños y excepcionales.
                            Luego adoptado por la Specialty Coffee Asociation (SCA) para definir una categoría de café de alta calidad, caracterizado por su excepcional sabor, aroma y perfil sensorial.
                            Se diferencia del café comercial por su cuidadosa selección de granos, prácticas sostenibles de cultivo, procesamiento meticuloso, tostado artesanal y preparación a cargo de baristas altamente calificados.
                        </p>
                    </div>
                    <div className="columna_homepage_fila_destacados">
                        <section className="seccion_destacados">
                            <h2>Dirección</h2>
                            <div className="div_destacado">
                                <span className="resaltado">Julio Argentino Roca 823</span>
                                <span className="resaltado">Vicente Lopez, Buenos Aires</span>
                                <span className="normal">Argentina</span>
                            </div>
                        </section>
                        <section className="seccion_destacados">
                            <h2>Horarios</h2>
                            <div className="div_destacado">
                                <span className="resaltado">Lunea a Sábado 9:00 a 19:00</span>
                                <span className="resaltado">Domingo 10:00 a 13:30</span>
                                <span className="normal">Te esperamos!</span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HomePage;