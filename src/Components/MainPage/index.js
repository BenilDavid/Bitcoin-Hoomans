import React, { useState, useEffect } from 'react'
import Header from '../common/Header'
import ScrollableTab from '../common/ScrollableTab';
// import Stepper from '../common/Stepper';
import './MainPage.scss';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import contractABI from '../../abi/contractABI.json';
import { toast } from 'react-toastify';
// import img1 from '../../Assets/Images/TweetImages/1.jpeg';
// import img2 from '../../Assets/Images/TweetImages/2.jpeg';
// import img3 from '../../Assets/Images/TweetImages/3.jpeg';
// import img4 from '../../Assets/Images/TweetImages/4.jpeg';
// import img5 from '../../Assets/Images/TweetImages/5.jpeg';
// import img6 from '../../Assets/Images/TweetImages/6.jpeg';
// import img7 from '../../Assets/Images/TweetImages/7.jpeg';
// import img8 from '../../Assets/Images/TweetImages/8.jpeg';
// import img9 from '../../Assets/Images/TweetImages/9.jpeg';
// import img10 from '../../Assets/Images/TweetImages/10.jpeg';

const contractAddress = "0xE36034fAE6E90518cc7382BB43b10E7d472b029c";

const MainPage = () => {
    const address = useAddress();

    const [tokenCount, setTokenCount] = useState(3);
    const [signer, setSigner] = useState(null);
    // const [progress, setProgress] = useState(0);
    const [contractDetails, setContractDetails] = useState({
        MAX_SUPPLY: "",
        publicPrice: "",
        PUBLIC_MINT_LIMIT: "",
        PUBLIC_MINT_LIMIT_TXN: "",
        totalMinted: "",
        freeMax: null,
    })

    useEffect(() => {

        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        const tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);
        // setProvider(tempProvider);
        getContractDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address])

    const getContractDetails = async () => {
        const nftContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );
        console.log(nftContract);

        try {
            if (window.ethereum) {
                let MAX_SUPPLY = await nftContract.MAX_SUPPLY();
                let tempPrice = await nftContract.publicPrice();
                let price = ethers.utils.formatEther(tempPrice);
                let PUBLIC_MINT_LIMIT = await nftContract.PUBLIC_MINT_LIMIT();
                let PUBLIC_MINT_LIMIT_TXN = await nftContract.PUBLIC_MINT_LIMIT_TXN();
                let totalMinted = await nftContract.totalSupply();

                // const progressValue = (totalMinted / MAX_SUPPLY) * 100;
                // setProgress(progressValue);

                setContractDetails((prev) => {
                    return { ...prev, "MAX_SUPPLY": MAX_SUPPLY.toString(), "publicPrice": price.toString(), "PUBLIC_MINT_LIMIT": PUBLIC_MINT_LIMIT.toString(), "totalMinted": totalMinted.toString(), "PUBLIC_MINT_LIMIT_TXN": PUBLIC_MINT_LIMIT_TXN.toString() }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    //public Mint
    const publicMinting = async () => {

        if (window.ethereum) {
            const nftContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try {

                await nftContract.publicMint(
                    ethers.BigNumber.from(tokenCount), {
                    value: ethers.utils.parseEther((contractDetails.publicPrice * tokenCount).toString()),
                });

            } catch (error) {
                toast.error("User rejected transaction", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: 'foo-bar',
                    theme: "dark"
                })
                console.log(error);
            }
        } else {
            toast.error("wallet not connected", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar',
                theme: "dark"
            })
        }
    };

    function handleTokenDecrease() {
        if (tokenCount > 1) {
            setTokenCount(tokenCount - 1);
        }
    }

    const handleTokenIncrease = () => {
        if (tokenCount < contractDetails.PUBLIC_MINT_LIMIT) {
            setTokenCount(tokenCount + 1);
        }
    }

    return (
        <div>
            <Header />

            <div className="container main-content">
                <div className="row align-items-center">
                    <div className="col-md-8 my-3">
                        <ScrollableTab />
                        {/* <Stepper /> */}
                    </div>
                    <div className="col-md-4 my-3">

                        <div className='minting-box'>
                            <ConnectWallet />
                            {address ?
                                <>
                                    <div className=''>
                                        <div className="d-flex justify-content-center my-3">
                                            {/* <div className="progress">
                                                <div className="progress-bar" role="progressbar" aria-label="Example with label" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                                            </div> */}
                                        </div>

                                        <div className='my-3'>Supply : <span className='orange-text'>{contractDetails.totalMinted ? contractDetails.totalMinted : "XXXX"} / {contractDetails.MAX_SUPPLY ? contractDetails.MAX_SUPPLY : "XXXX"}</span></div>
                                        <div className='my-3'>price : <span className='orange-text'>{contractDetails.publicPrice ? contractDetails.publicPrice : "XXXX"} ETH</span></div>
                                    </div>
                                    {contractDetails.totalMinted === contractDetails.MAX_SUPPLY ?
                                        <>
                                            <div>SOLD OUT</div>
                                            <p>Buy it in Secondary</p>
                                        </>
                                        :
                                        <>
                                        <div>
                                        <div className='my-2'>Token Count</div>
                                        <div className="token-input-container d-flex justify-content-center align-items-center">
                                            <button className="decrease-count dapp_btn" onClick={handleTokenDecrease}>-</button>
                                            <div className="token-value dapp_btn mx-2">{tokenCount}</div>
                                            <button className="increase-count dapp_btn" onClick={handleTokenIncrease}>+</button>
                                        </div>
                                        <div className='my-2 cursor-pointer' onClick={() => setTokenCount(contractDetails.PUBLIC_MINT_LIMIT)}>max : {contractDetails.PUBLIC_MINT_LIMIT ? contractDetails.PUBLIC_MINT_LIMIT : "XX"}
                                        </div>
                                        <div>
                                            {tokenCount} {'*'} {contractDetails.publicPrice} : {tokenCount * contractDetails.publicPrice} ETH
                                        </div>
                                    </div>
                                    <div className='text-center d-flex flex-column justify-content-center align-items-center'>

                                        {address && (
                                            <button className='ms-2 my-2 mint-btn' onClick={publicMinting}>Mint</button>
                                        )
                                        }
                                    </div>
                                    <div>
                                        MAX PER TXN : {contractDetails.PUBLIC_MINT_LIMIT_TXN}
                                    </div>
                                    <div>
                                        MAX PER WALLET : {contractDetails.PUBLIC_MINT_LIMIT}
                                    </div>
                                        </>}
                                   
                                </>
                                : ""}

                        </div>
                    </div>
                </div>
                {/* <div className="my-3">
                    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={img1} className="d-block w-100 carousel-tweet-image" alt="" />
                            </div>
                            <div className="carousel-item">
                                <img src={img2} className="d-block w-100 carousel-tweet-image" alt="" />
                            </div>
                            <div className="carousel-item">
                                <img src={img3} className="d-block w-100 carousel-tweet-image" alt="" />
                            </div>

                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div> */}


            </div>
            {/* <div className="my-3">
                <div class="news-ticker">
                    <ul>
                        <li>
                            <img src={img1} className="carousel-tweet-image" alt="" />
                        </li>
                        <li>
                            <img src={img2} className="carousel-tweet-image" alt="" />
                        </li>
                        <li>
                            <img src={img3} className="carousel-tweet-image" alt="" />
                        </li>
                        <li>
                            <img src={img4} className="carousel-tweet-image" alt="" />
                        </li>
                        <li>
                            <img src={img5} className="carousel-tweet-image" alt="" />
                        </li>
                        <li>
                            <img src={img6} className="carousel-tweet-image" alt="" />
                        </li>
                        <li>
                            <img src={img7} className="carousel-tweet-image" alt="" />
                        </li>
                        <li>
                            <img src={img8} className="carousel-tweet-image" alt="" />
                        </li>
                        <li>
                            <img src={img9} className="carousel-tweet-image" alt="" />
                        </li>
                        <li>
                            <img src={img10} className="carousel-tweet-image" alt="" />
                        </li>
                       
                    </ul>
                </div>
            </div> */}
        </div>
    )
}

export default MainPage