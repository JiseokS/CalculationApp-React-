import { ACTIONS } from "../App";
import styles from '../style.module.css';

export default function DigitButtonForTwo({dispatch, digit}){
    return <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT, payload: {digit}})} className={styles.twoBoxes}>0</button>
}