import { ACTIONS } from "../App";
import styles from '../style.module.css';

export default function OperationButton({dispatch, operation}){
    return <button onClick={()=> dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})} className={styles.mathSign}>{operation}</button>
}