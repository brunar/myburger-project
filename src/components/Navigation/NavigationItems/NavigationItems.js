import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>

        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        {/* shortcut active does means active={true} but for bolean */}
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;