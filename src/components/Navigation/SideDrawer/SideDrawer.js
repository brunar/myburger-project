import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            {/* shortcut show does means show={true} but for bolean */}
            <Backdrop show={props.open} clickedback={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                {/* 1st Way - height here is a props, coming from syle-inline logo component
                <Logo height="11%" />
            */}
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticatedPr={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;