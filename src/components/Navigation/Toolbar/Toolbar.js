import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>

        <DrawerToggle clicked={props.drawerToggleClicked} />

        {/* 1st Way - height here is a props, coming from syle-inline logo component
            <Logo height="80%" />
        */}
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticatedPr={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;