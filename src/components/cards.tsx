import React from "react";
import "./cards.css"

const Cards: React.FC = () => {
    return (
        <div className="cards">
            <article>
                <a href="#">
                    <div data-product-top title={'Apocalypse Hotel - Alquilar BD/DVD-Rip - E1 - Un verdadero hotel tiene una historia que contar'}>
                    {/* title: DATOS {DATA-MODEL - (DATO DENTRO DEL SPAN //COLOCAR A MANO) - TITLE } */}
                        <div data-product-badge="new"> {/* DETERMINA EL COLOR DEL TAG / SI NO EXISTE LO DEJA EN GRIS, HACER DINAMICO POR SI ESTA NULL EN DB Y ELIMINARLO */}
                            <div className="badge-container">
                                <span>Nuevo</span> {/* DETECTA SI TIENE TAG Y AGREGA EL VALOR QUE LO ACOMPAÑA (badge_value) */}
                            </div>
                        </div>
                        <div data-product-model>
                            <strong data-model="Apocalypse Hotel" aria-label="Apocalypse Hotel" /> {/* data-model: GENERA EL MODELO/DATA Y LO IMPRIME */}
                            <span>Alquilar BD/DVD-Rip</span>
                        </div>
                        <img src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,height=240/catalog/crunchyroll/95febed7aeeabe081e2123a777435cd3.jpg" alt="" />
                    </div>
                    <div data-product-info>
                        <h2 title="E1 - Un verdadero hotel tiene una historia que contar" className=":nll-clamp">E1 - Un verdadero hotel tiene una historia que contar</h2>
                        {/* title: AGREGA DINAMICAMENTE EL TITULO A MOSTRAR CUANDO SE HACE HOVER */}
                        <div data-product-details>
                            <div data-product-price>
                                <div className="product-og-price"><span>{'$'}NaneInf</span></div> {/* PRECIO ORIGINAL/DESCUENTO DEL PRODUCTO */}
                                <div className="product-old-price"><span>{'$'}NaneInf</span></div> {/* PRECIO ANTIGUO/SIN DESCUENTO DEL PRODUCTO | SI NO HAY ELIMINAR EL TAG */}
                            </div>
                            <button type="button" tabIndex={-1}>Agregar al carrito</button>
                        </div>
                    </div>
                </a>
            </article>
            <article> {/* ELIMINAR Y GENERAR SOLO UNO DINAMICO */}
                <a href="#">
                    <div data-product-top title={'My Dress-Up Darling - Alquilar BD/DVD-Rip - E13 - Wakana Gojo, 15 años, en plena pubertad'} aria-description={'My Dress-Up Darling - Alquilar BD/DVD-Rip - E13 - Wakana Gojo, 15 años, en plena pubertad'}>
                        <div data-product-badge="discount">
                            <div className="badge-container">
                                <span>-32%</span>
                            </div>
                        </div>
                        <div data-product-model>
                            <strong data-model="My Dress-Up Darling" aria-label="My Dress-Up Darling" />
                            <span>Alquilar BD/DVD-Rip</span>
                        </div>
                        <img src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,height=240/catalog/crunchyroll/70d636cfbf6d48de6267b52c5730bad1.jpg" alt="" />
                    </div>
                    <div data-product-info>
                        <h2 title={'E13 - Wakana Gojo, 15 años, en plena pubertad'} className=":nll-clamp">E13 - Wakana Gojo, 15 años, en plena pubertad</h2>
                        <div data-product-details>
                            <div data-product-price>
                                <div className="product-og-price"><span>{'$'}NaneInf</span></div>
                            </div>
                            <button type="button" tabIndex={-1}>Agregar al carrito</button>
                        </div>
                    </div>
                </a>
            </article>
        </div>
    );
};

export default Cards;