import React, { useContext } from 'react'
import { userContext } from '../contexts/UserContext';
import { Dropdown } from 'antd';
import { Link, useLocation } from 'react-router';

export default function Header() {
    const { userDetails, logout } = useContext(userContext);
    const path = useLocation();

    const items = [{
        key: '1',
        label: (<button className='btn dropdown-item' onClick={() => { logout() }}>Logout</button>),
    },]

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/dashboard"><img className='w-25' src='/images/tvs-digital-logo.svg' alt='Logo' /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
                    <ul className="navbar-nav">
                        <li className="nav-item me-5">
                            <Link className={path.pathname === "/dashboard" ? 'nav-link border-0 border-bottom border-dark' : 'nav-link'} to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className={path.pathname === "/account" ? 'nav-link border-0 border-bottom border-dark' : 'nav-link'} to="/account">Account</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className={path.pathname === "/payment" ? 'nav-link border-0 border-bottom border-dark' : 'nav-link'} to="/payment">Payment</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className={path.pathname === "/transaction" ? 'nav-link border-0 border-bottom border-dark' : 'nav-link'} to="/transaction">Transaction</Link>
                        </li>
                        <li className="nav-item">
                            <Dropdown menu={{ items }} placement="bottomRight">
                                <button className='btn fw-bold border-0 border-bottom border-dark'><i className="bi bi-person-circle me-3"></i>{userDetails.userName}</button>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
