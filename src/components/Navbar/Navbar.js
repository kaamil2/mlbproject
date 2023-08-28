import React, { Component } from 'react';
import { MenuItems } from './MenuItems';
import './Navbar.css';

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
// cannot have a absolute path here must be relative by adding the file to the public folder in src the below
// code will now work it wouldve worked fro you before but when using github you need be cognizent of the path and that
// it is relative to the public folder and not your local machines folder
    render() {
        return(
            <nav className='NavbarItems'>
                <div className='navbar-logo'>
                    <img style={{ width: 70, height: 70 }} src={require('./images/logo.jpg')} alt='logo'></img>
                </div>
                <text className='navbar-title'>Competing Risks of MLB Draft Data</text>
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu-active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={MenuItems.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navbar