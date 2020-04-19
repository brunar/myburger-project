import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <p className={classes.Label}>{props.label}</p>
        <button className={classes.Less}>LESS</button>
        <button className={classes.More} onClick={props.added}>MORE</button>
    </div>
);

export default buildControl;