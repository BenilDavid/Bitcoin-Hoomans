import React from 'react'
import './Header.scss';
import etherscansLogo from '../../../Assets/Images/etherscans-logo.png';
import openseasLogo from '../../../Assets/Images/opensea-logo.png';
import bitcoinLogo from '../../../Assets/Images/bitcoin-logo.png';
import twitterLogo from '../../../Assets/Images/twitter.png';
import discordLogo from '../../../Assets/Images/discord.png';

const Header = () => {
  return (
    <div className='header container d-flex justify-content-between align-items-center'>
        <div className='logo-container'>
            <img className='me-2' src={bitcoinLogo} alt="bitcoin Logo" />
            <div className='hoomans'>HOOMANS</div>
        </div>
        <div className='icon-links'>
            <a target='_blank' className='mx-1' href='https://discord.gg/huFqqH7UF9' rel="noreferrer">
            <img src={discordLogo} alt="discord logo" />
            </a>  
            <a target='_blank' className='mx-1' href='https://twitter.com/btchoomans' rel="noreferrer">
            <img src={twitterLogo} alt="twitter logo" />
            </a>
            <a target='_blank' className='mx-1' href='https://opensea.io/collection/bitcoinhoomansnft' rel="noreferrer">
                <img src={openseasLogo} alt="opensea logo" />
            </a>
            <a target='_blank' className='mx-1' href='https://etherscan.io/address/0xd2a2e0da2a63ee0069ff78c88dd5c8da97805d7b' rel="noreferrer">
                <img src={etherscansLogo} alt="etherscans logo" />
            </a>
        </div>
    </div>
  )
}

export default Header