import react from "react";
import classes from './Card.module.css';
const Card=(props)=> {
return(<div class={classes.card}>{props.children}</div>);
};

export default Card;