import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    return (
        <div className={classes.SideDrawer}>
            {/* height here is a props, coming from syle-inline logo component */}
            <Logo height="11%" />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;