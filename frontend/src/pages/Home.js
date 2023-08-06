import React, {useEffect, useState} from 'react';
import {IonContent} from '@ionic/react';
import mainFrontPic from '../theme/images/hero-bg.jpg';
import aboutImg from '../theme/images/about-img.png';
import { Link } from 'react-router-dom';
const Home = () => {

    const [productsData,setProductsData] = useState([]);

    useEffect(()=>{
        const getProducts = async () => {
            try {
                const response = await fetch('https://api.dxofficialtrading.com', {
                    method: 'GET',
                });
                const data = await response.json();
                setProductsData(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getProducts();
    },[])

    return (
        <IonContent>
            <div className="hero_area">
                <div className="bg-box">
                    <img src={mainFrontPic} alt={mainFrontPic}/>
                </div>
                <header className="header_section">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg custom_nav-container ">
                            <a className="navbar-brand">
                                <span>
                                  Dx official
                                </span>
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className=""> </span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav  mx-auto ">
                                    <li className="nav-item active">
                                        <a className="nav-link"><span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link"></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link"></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link"></a>
                                    </li>
                                </ul>
                                <div className="user_option">
                                    <Link to={"/dashboard"} className="order_online">
                                        Upload
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
                <section className="slider_section ">
                    <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container ">
                                    <div className="row">
                                        <div className="col-md-7 col-lg-6 ">
                                            <div className="detail-box">
                                                <h1>
                                                    Gann Scalping Trading Sistema
                                                </h1>
                                                <p>
                                                    Gann Scalping Trading Sistema Indicators used in Gann Scalping Trading Sistema. ###Gann_HiLo_Activator_v2### Gann Hi_Low gann_hilo_activator_arrow
                                                </p>
                                                <div className="btn-box">
                                                    <a href="" className="btn1">
                                                        Get Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item ">
                                <div className="container ">
                                    <div className="row">
                                        <div className="col-md-7 col-lg-6 ">
                                            <div className="detail-box">
                                                <h1>
                                                    Nitro Forex Signals
                                                </h1>
                                                <p>
                                                    Nitro Forex Signals Time frame – 5 Minutes and above. Currency Pairs – EURUSD, GBPUSD, AUDUSD, NZDUSD Indicators used in Nitro Forex Signals. 5NITRO ClearChart 2   Buy – When Clearchart is white and Alert
                                                </p>
                                                <div className="btn-box">
                                                    <a href="" className="btn1">
                                                        Get Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="container ">
                                    <div className="row">
                                        <div className="col-md-7 col-lg-6 ">
                                            <div className="detail-box">
                                                <h1>
                                                    Keltner Channel Pro System
                                                </h1>
                                                <p>
                                                    Keltner Channel Pro System Time Frame – 5 minutes and above.  Best 1 hour and above. Indicators used in Keltner Channel Pro System. Keltner Channel Pro   Buy – When Middle line of the channel
                                                </p>
                                                <div className="btn-box">
                                                    <a href="" className="btn1">
                                                        Get Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <ol className="carousel-indicators">
                                <li data-target="#customCarousel1" data-slide-to="0" className="active"></li>
                                <li data-target="#customCarousel1" data-slide-to="1"></li>
                                <li data-target="#customCarousel1" data-slide-to="2"></li>
                            </ol>
                        </div>
                    </div>
                </section>
            </div>
            <section className="food_section layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Our Products
                        </h2>
                    </div>

                    <div className="filters-content">
                        <div className="row grid">
                            {(productsData?.map((product)=>(
                                <div key={product?.id} className="col-sm-6 col-lg-4 all burger">
                                    <div className="box">
                                        <div>
                                            <div className="img-box">
                                                <iframe src={product?.url}/>
                                            </div>
                                            <div className="detail-box">
                                                <h5>
                                                    {product?.name}
                                                </h5>
                                                <p>
                                                    {product?.description}
                                                </p>
                                                <div className="options">
                                                    <h6>
                                                        ${product?.price}
                                                    </h6>
                                                    <a>Buy</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="about_section layout_padding">
                <div className="container  ">
                    <div className="row">
                        <div className="col-md-6 ">
                            <div className="img-box">
                                <img src={aboutImg} alt=""/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="detail-box">
                                <div className="heading_container">
                                    <h2>
                                        We Are Dx Official Trading
                                    </h2>
                                </div>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority
                                    have suffered alteration
                                    in some form, by injected humour, or randomised words which d look even slightly
                                    believable. If you
                                    are going to use a passage of Lorem Ipsum, you need to be sure there isn anything
                                    embarrassing hidden in
                                    the middle of text. All
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 footer-col">
                            <div className="footer_contact">
                                <h4>
                                    Contact Us
                                </h4>
                                <div className="contact_link_box">
                                    <a href="">
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                        <span>
                                          Location
                                        </span>
                                    </a>
                                    <a href="">
                                        <i className="fa fa-phone" aria-hidden="true"></i>
                                        <span>
                                          Call +01 1234567890
                                        </span>
                                    </a>
                                    <a href="">
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                        <span>
                                          demo@gmail.com
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 footer-col">
                            <div className="footer_detail">
                                <a href="" className="footer-logo">
                                    Dx Official
                                </a>
                                <p>
                                    Necessary, making this the first true generator on the Internet. It uses a
                                    dictionary of over 200 Latin words, combined with
                                </p>
                                <div className="footer_social">
                                    <a target={"_blank"} rel="noreferrer" href="https://www.instagram.com/dxofficial_ff">
                                        <i className="fa fa-instagram" aria-hidden="true"></i>
                                    </a>
                                    <a target={"_blank"} rel="noreferrer" href="https://www.youtube.com/@dx-officialtrading9079">
                                        <i className="fa fa-youtube" aria-hidden="true"></i>
                                    </a>
                                    <a href="">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </a>
                                    <a href="">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 footer-col">
                            <h4>
                                Available Hours
                            </h4>
                            <p>
                                Everyday
                            </p>
                            <p>
                                10.00 Am -10.00 Pm
                            </p>
                        </div>
                    </div>
                    <div className="footer-info">
                        <p>
                            &copy; <span id="displayYear"></span> All Rights Reserved By
                            <a> Dx official</a>
                        </p>
                    </div>
                </div>
            </footer>
        </IonContent>
    );
};

export default Home;