import { ACTIONS } from "../App"
import styles from '../style.module.css';

export default function DigitButton({dispatch, digit}){
    return <button onClick={()=> dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}
    className={styles.number}>{digit}</button>
}