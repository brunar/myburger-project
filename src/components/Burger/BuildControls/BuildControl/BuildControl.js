import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <p className={classes.Label}>{props.label}</p>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabledIt}>LESS</button>
        {/* Property disabled={props.disabledIt} here in button is a html native property */}
        <button className={classes.More} onClick={props.added}>MORE</button>
    </div>
);

export default buildControl;  