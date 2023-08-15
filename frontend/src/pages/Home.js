import React, {useEffect, useState} from 'react';
import {IonContent} from '@ionic/react';
import mainFrontPic from '../theme/images/hero-bg.jpg';
import aboutImg from '../theme/images/about-img.png';
import {Link, useParams} from 'react-router-dom';
import PaymentPopupComponent from "../components/PaymentPopupComponent";
const Home = () => {

    const [productsData,setProductsData] = useState([]);
    const [selectedProductId,setSelectedProductId] = useState(null);
    const [selectedProductData,setSelectedProductData] = useState(null);
    const [emailAddress,setEmailAddress] = useState('');
    const [subscriptionType,setSubscriptionType] = useState('monthly');
    const [payStep,setPayStep] = useState(1);
    const {id,email,subscription} = useParams();

    useEffect( ()=>{
        async function insertBuyProductAndSendEmail() {
            if (id && email && subscription) {
                let formData = {id, email, subscription, endpoint: 'success_buy'};
                try {
                    await fetch('https://api.dxofficialtrading.com', {
                        method: 'POST',
                        body: formData,
                    });
                    document.getElementById('open_success_product_buy_popup').click();
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
        }
        insertBuyProductAndSendEmail();
    },[id,email,subscription])


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

    const validate = ()=>{
        if(!emailAddress?.trim()?.length){
            return false;
        }else if(!subscriptionType?.trim()?.length){
            return false;
        }
        return true;
    }

    const validateAndGoPayStep=()=>{
        if(validate()){
            setPayStep(2);
        }
    }

    const openPaymentPopup=(product)=>{
        setSelectedProductData(product);
        setSelectedProductId(product?.id);
        setEmailAddress('');
        setSubscriptionType('monthly');
        setPayStep(1);
    }

    const downloadFileByName = (fileName)=>{
        let url = `https://api.dxofficialtrading.com?file_name=${fileName}`;
        window.open(url,'_blank');
    }

    const renderOptionsByType=(product)=>{

        let returnHtml = [];
        if(Number(product?.show_free_button)){
            returnHtml.push(<a
                data-target={"#free_product_modal"}
                data-toggle="modal"
            ><i className={"fa fa-info"}/></a>);
        }

        if(Number(product?.show_paid_button)){
            returnHtml.push(<a
                data-target={"#buy_product_modal"}
                data-toggle="modal"
                onClick={()=>openPaymentPopup(product)}
            ><i className={"fa fa-cart-plus"}/></a>);
        }

        if(Number(product?.show_download_button)){
            returnHtml.push(<a onClick={()=>downloadFileByName(product?.file_name)}><i className={"fa fa-download"}/> </a>);
        }

        return returnHtml;
    }


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
                                  <span className={"yellow"}>DX</span> OFFICIAL
                                  <span className={"sub"}>TRADING</span>
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
                                                    WE ARE OFFERING A FREE POWERFULL SOFTWARE FOR BINARY , FOREX, STOCKES MARKET
                                                </h1>
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
                                                    WE ARE OFFERING FREE SURESHOTS SIGNALS FOR BINARY AND FOREX
                                                </h1>
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
                                                    WE ARE OFFERING FREE 100% WORKING BUGS , STRATEGY FOR MAJOR BINARY BROKERS
                                                </h1>
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
                                                    WE ARE OFFERING FREE WORTHFUL INDICATORS AT FREE OF COST
                                                </h1>
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
                                <li data-target="#customCarousel1" data-slide-to="3"></li>
                                <li data-target="#customCarousel1" data-slide-to="4"></li>
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
                                                    {(product?.other_link) ?
                                                        <>
                                                            &nbsp;
                                                            <a target={"_blank"} rel="noreferrer" href={product?.other_link}>
                                                                <i className="fa fa-telegram" aria-hidden="true"></i>
                                                            </a>
                                                        </>:''
                                                    }
                                                </h5>
                                                <p>
                                                    {product?.description}
                                                </p>
                                                <div className="options">
                                                    {renderOptionsByType(product)}
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
                                    Elevate Your Binary Trading Success with DX Official {"Trading's"} Expert 5-Minute Signals,
                                    In the fast-paced world of binary options trading, staying ahead of the curve is essential for maximizing your profits. Introducing DX Official Trading – your ultimate partner in making binary trading not just profitable, but remarkably successful. With our cutting-edge approach and finely tuned strategies, we provide meticulously crafted signals tailored to the 5-minute timeframe, enabling you to seize quick opportunities and capitalize on market fluctuations like never before.s
                                    DX Official Trading is more than just a signal provider; we are your partners in achieving binary trading success. With our 5-minute signals, precision strategies, and dedicated team, {"you'll"} be equipped to navigate the dynamic world of binary options trading and extract profit from even the smallest market movements. Elevate your trading journey with DX Official Trading – where every minute counts and every trade matters.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="client_section layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center psudo_white_primary mb_45">
                        <h2>
                            Signals
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-lg-6">
                            <div className="item">
                                <div className="box">
                                    <div className="detail-box">
                                        <h3><u>Free signals for all binary brokers.</u></h3>
                                        <p>
                                            Hello everyone! we are offering 95% sure-shot signals for free. these signals work with major brokers like quotex, binomo, pocket option, olymp trade, and iq option. we provide signals ranging from 1 min to 5 min for binary trading. there are some pictures available, and you can join directly through the provided link.
                                            &nbsp;<a target={"_blank"} rel="noreferrer"  href={"https://t.me/Dx_Official_Free_Signals"}>https://t.me/Dx_Official_Free_Signals</a>  join and start your profitable journey.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-6">
                        <div className="item">
                            <div className="box">
                                <div className="detail-box">
                                    <h3><u>Mega Dx 4.2.2</u></h3>
                                    <p>
                                        Hello everyone! We are offering the ultimate authorized signal system for both binary and forex platforms. Our system boasts a remarkable 101% non-repaint feature, ensuring that the arrows you receive will never disappear or be repainted. It fully supports auto trading and is compatible with all OTC platforms.
                                        Contact us through our Telegram channel: &nbsp;<a target={"_blank"} rel="noreferrer"  href={"https://t.me/DX_Official_Trading"}>https://t.me/DX_Official_Trading</a> to learn more and start your journey towards trading success.
                                    </p>
                                </div>
                            </div>
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
                                          124B ,Kirtinagar Delhi
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
                                          dxofficialtrading2023@gmail.com
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
                                    WE ARE OFFERING A FREE POWERFULL SOFTWARE FOR BINARY , FOREX, STOCKES MARKET
                                </p>
                                <div className="footer_social">
                                    <a target={"_blank"} rel="noreferrer" href="https://instagram.com/dx_official_trading?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D">
                                        <i className="fa fa-instagram" aria-hidden="true"></i>
                                    </a>
                                    <a target={"_blank"} rel="noreferrer" href="https://www.youtube.com/@dx-officialtrading9079">
                                        <i className="fa fa-youtube" aria-hidden="true"></i>
                                    </a>
                                    <a target={"_blank"} rel="noreferrer" href="https://t.me/DX_Official_Trading">
                                        <i className="fa fa-telegram" aria-hidden="true"></i>
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
            {/*///////////// BUY PRODUCT MODAL ///////////////////*/}
            <div className="modal fade" id="buy_product_modal" tabIndex="-1" aria-hidden="true">
                <div style={{display:'block'}} className="modal-backdrop fade show"></div>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Pay online</h5>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close">
                                <i className={"fa fa-times"}/>
                            </button>
                        </div>
                        <div className="modal-body">
                            <section className="book_section">
                                <div className="container">
                                    {(payStep === 2) ?
                                        <div className="form_container">
                                           <PaymentPopupComponent id={selectedProductId} email={emailAddress} subscription={subscriptionType}/>
                                        </div>
                                        :
                                        <div className="form_container">
                                            <div className={"col-12"}>
                                                <label>Email Address</label>
                                                <input type="email"
                                                       className="form-control"
                                                       placeholder={"Enter email"}
                                                       value={emailAddress}
                                                       onChange={(e)=>setEmailAddress(e.target.value)}
                                                />
                                            </div>
                                            <div className={"col-12"}>
                                                <label>Select subscription</label>
                                                <select value={subscriptionType} className="form-control" onClick={(e)=>setSubscriptionType(e.target.value)}>
                                                    <option value={'monthly'} selected={true}>Monthly ${selectedProductData?.month_price}</option>
                                                    <option value={"yearly"}>Yearly ${selectedProductData?.year_price}</option>
                                                    <option value={"lifetime"}>Lifetime ${selectedProductData?.price}</option>
                                                </select>
                                            </div>
                                            <div className={"col-12"}>
                                              <button style={{width:"100%"}} className={"btn btn-outline-primary"} disabled={!validate()} onClick={()=>validateAndGoPayStep()}>Proceed</button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            {/*///////////// BUY PRODUCT MODAL ///////////////////*/}

            {/*///////////// FREE PRODUCT MODAL ///////////////////*/}
            <div className="modal fade" id="free_product_modal" tabIndex="-1" aria-hidden="true">
                <div style={{display:'block'}} className="modal-backdrop fade show"></div>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Follow Instructions</h5>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close">
                                <i className={"fa fa-times"}/>
                            </button>
                        </div>
                        <div className="modal-body">
                            <section className="book_section">
                                <div className="container">
                                    <div className="form_container">
                                       <p>
                                           Registered with any of these links
                                           &nbsp;
                                           <a target={"_blank"} rel="noreferrer" href="https://po7.cash/?utm_source=affiliate&a=ZRKhAIWkNjHrVB&ac=dx-official&code=50START">
                                               For Pocket option users
                                           </a>,
                                           &nbsp;
                                           <a target={"_blank"} rel="noreferrer" href="https://broker-qx.pro/sign-up/?lid=324767">
                                               For Quotex users
                                           </a>
                                           &nbsp;
                                           and send me your Trader id
                                           to my telegram id&nbsp;
                                           <a target={"_blank"} rel="noreferrer" href="https://t.me/DX_Official_Trading">
                                               DX Official Trading
                                           </a>
                                       </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            {/*///////////// FREE PRODUCT MODAL ///////////////////*/}
        </IonContent>
    );
};

export default Home;