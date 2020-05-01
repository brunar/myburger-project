import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/* This exact becames a props inside NavigationItem Component */}
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {/* shortcut active does means active={true} but for bolean */}
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;