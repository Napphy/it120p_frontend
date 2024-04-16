import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fallDown as Menu } from 'react-burger-menu'

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout');
      // Clear token and redirect to login page
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized error (401), redirect to login page
        navigate('/');
      } else {
        console.log(error);
      }
    }
  };

  const HomeHandler = () => {
    navigate('/homepage');
  }

  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      right: '36px',
      top: '15px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0)'
    }
  }
  

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://www.mapua.edu.ph/">
            <img
              className="max-h-[30px] md:max-h-[54px]"
              src="https://mapua.sgp1.cdn.digitaloceanspaces.com/cms_images/pu9BiF7q4UWPh3wYvzBmgiz3e8XAQgColck8E0I4.png"
              alt="logo"
            ></img>
          </a>
        </div>

        <div id="navbarBasic" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">Mapua Marketplace</div>
          </div>

          <div className="navbar-end">

            <div className="navbar-item">
            <Menu styles={ styles }>
                <a href = "/dashboard">Dashboard</a>
                <a onClick={Logout} className='button is-light>'>Logout</a>
              </Menu>
              <div className="buttons">
                <button onClick={HomeHandler} className="button is-light">
                    Home
                </button>
                <button onClick={Logout} className="button is-light">
                  Log Out
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
