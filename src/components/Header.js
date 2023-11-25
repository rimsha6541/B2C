import React from "react";
import { Link, NavLink } from "react-router-dom";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUser, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../UserContext"; // Import UserContext

const Header = (props) => {
  const { user, cartCount } = useUserContext(); // Access user and cartCount from UserContext

  return (
    <>
      <header className="header-top-strip py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              
            </div>
            {props.logged_in ? (
              <div className="text-end user-greeting">
  <FontAwesomeIcon icon={faUserCircle} className="icon2" />
  {user && user.username ? (
    <span className="greeting-text">
      Hello, <span className="username">{user.username}</span>
    </span>
  ) : (
    <span>Loading</span>
  )}
</div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
          <div className="col-2">
  <h1 className="d-flex align-items-center">
  <Link to="/" className="logo-link">
  <img
    src="/images/home/icon.png"
    alt="icon"
    className="logo-icon"
  />
  <span className="logo-text">EasyBay</span>
</Link>
  </h1>
</div>
            <div className="col-5"></div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                {/* <div>
                  <Link to="/compare-product" className="d-flex align-items-center gap-10 text-white">
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare 
                    </p>
                  </Link>
                </div> */}

           

                
                <Link to="/wishlist" className="d-flex align-items-center gap-10 text-white">
    <img src={wishlist} alt="wishlist" style={{ width: '40px' }} />
    <p className="mb-0" style={{fontSize:'20px', fontFamily:'roboto'}}>Favourite <br /> Wishlist</p>
  </Link>
                
                {props.logged_in ? (
                  <div className="dropdown">
  <button
    className="btn btn-secondary bg-transparent border-0 text-white"
    id="dropdownMenuButton1"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '22px',
      fontFamily: 'roboto',
    }}
  >
    <FontAwesomeIcon icon={faUserCheck} className="icon" />
    My Account
  </button>

  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li>
      <Link className="dropdown-item" to="OrderHistoryPage">
        Order History
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="ViewProfile">
        View Profile
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="EditProfile">
        Edit Profile
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="login">
        Log out
      </Link>
    </li>
  </ul>
</div>

                ) : (
                  <div>
                    <Link to="/login" className="d-flex align-items-center gap-10 text-white">
                      <FontAwesomeIcon icon={faUser} className="icon" />
                      <p className="mb-0">Log in</p>
                    </Link>
                  </div>
                )}
                <div>
                  <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{cartCount}</span>
                    </div>
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>
        
      </header>

      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown" style={{ fontSize: "6px" }}>
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">Shop Categories</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li>
                        <NavLink className="dropdown-item text-white" to="/ourstore/Laptops">
                          Laptop
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item text-white" to="/ourstore/Phones">
                          Mobile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item text-white" to="/ourstore/AC">
                          AC
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item text-white" to="/ourstore/LCD">
                          LCD
                        </NavLink>
                      </li>
                    </ul>
                  </div>

                  
                </div>
                <div className="menu-links" style={{ fontSize: "6px" }}>
                  <div className="d-flex align-items-center gap-15" style={{ fontSize: "6px" }}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/ourstore">Our Store</NavLink>
                    <NavLink to="/contact">Contact Us</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
