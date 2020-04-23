import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        {/* height here is a props, coming from syle-inline logo component */}
        <Logo height="80%" />
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;