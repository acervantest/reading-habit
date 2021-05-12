import React from 'react';

const Navbar = () => {
    return (
        <div style={navStyle}>
            <h2>
                <span style={iconStyle}>
                    <i className='far fa-bookmark'/>
                </span>
                Book Shelf
            </h2>
        </div> 
    )
}

const navStyle = {
    borderBottom: '#dee2e6 solid 0.4px',
    paddingBottom: '1rem',
    marginBottom: '1.5rem',
    display: 'flex'
}

const iconStyle = {
    marginRight:'18px'
}

export default Navbar;