import { useReducer } from 'react';
import styles from './style.module.css';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';
import DigitButtonForTwo from './components/DigitButtonForTwo';

export const ACTIONS={
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  EVALUATE: 'evaluate',
  DELETE: 'delete',
  PERCENT: 'percent',
}

//function reducer(state, action){}
function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite)
      {
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0")
      {
        return state;
      }
      //error fix - Cresh when pressing "." with no digit
      if(payload.digit === "." && state.currentOperand == null)
      {
        return state;
      }
      if(payload.digit === "." && state.currentOperand.includes("."))
      {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null)
      {
        return state;
      }
      if(state.previousOperand == null)
      {
        return{
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        } 
      }
      if(state.currentOperand == null)
      {
        return{
          ...state,
          operation: payload.operation,
        }
      }
      return{
        ...state,
        opertaion: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      }
    case ACTIONS.CLEAR:
    //return empty state
    return{
       // ...state,
       // currentOperand: 0,
       // previousOperand: null,
       // operation: null,
    }
    case ACTIONS.EVALUATE:
      if(state.operation == null || state.currentOperand == null || state.previousOperand ==null)
      {
        return state;
      }
      return{
        ...state,
         overwrite: true,
         previousOperand: null,
         operation: null,
         currentOperand: evaluate(state),
       }
     case ACTIONS.DELETE:
       if(state.overwrite)
       {
         return{
           ...state,
           overwrite: false,
           currentOperand: null,
         }
       }
       if(state.currentOperand == null) return {currentOperand: null};
       if(state.currentOperand.length === 1)
       {
          return{
           ...state,
           currentoperand: null,
         }
        }
       return{
          ...state,
          //Remove last digit from current operand
         currentOperand: state.currentOperand.slice(0, -1),
       } 
      case ACTIONS.PERCENT:
        if(state.currentOperand == null && state.currentOperand == null)
        {
          return state;
        } 
        return{
          ...state,
          previousOperand: null,
          operation: null,
          currentOperand: percent(state),
        }
  }
}
function percent({currentOperand}){
  const curr = parseFloat(currentOperand);

  if(isNaN(curr))
  {
    return "";
  }
  let percentt = "";
  percentt = curr / 100;

  return percentt.toString();
}

function evaluate({currentOperand, previousOperand, operation}){
  //Use parsefloat function
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if(isNaN(prev) || isNaN(curr))
  {
    return "";
  }
  let computation = "";
  switch(operation)
  {
    case "÷":
      computation = prev / curr;
      break;
    case "x":
      computation = prev * curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "+":
      computation = prev + curr;
      break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0,
})

function formatOperand(operand){
  if(operand == null) return;
  const [integer, decimal] = operand.split('.'); 
  if(decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  // cosnt[state, dispatch] = useReducer(reducer, initialState, init)
  const[{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});

  // dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit:1}});
  return (
      <div className={styles.frame}>
            <div className={styles.result}>
            <div className={styles.currentoperand}>{formatOperand(previousOperand)} {operation}</div>
            <div className={styles.currentoperand}>{formatOperand(currentOperand)}</div>
            </div>
            <button className={styles.function} onClick={()=>dispatch({type: ACTIONS.CLEAR })}>AC</button> 
            <button className={styles.function} onClick={()=>dispatch({type: ACTIONS.DELETE})}>DEL</button>
            <button className={styles.function} onClick={()=>dispatch({type: ACTIONS.PERCENT})}>%</button>
            <OperationButton operation="÷" dispatch={dispatch}/>
            <DigitButton digit="7" dispatch={dispatch}/>
            <DigitButton digit="8" dispatch={dispatch}/>
            <DigitButton digit="9" dispatch={dispatch}/>
            <OperationButton operation="x" dispatch={dispatch}/>
            <DigitButton digit="4" dispatch={dispatch}/> 
            <DigitButton digit="5" dispatch={dispatch}/>
            <DigitButton digit="6" dispatch={dispatch}/>
            <OperationButton operation="-" dispatch={dispatch}/>
            <DigitButton digit="1" dispatch={dispatch}/>
            <DigitButton digit="2" dispatch={dispatch}/>
            <DigitButton digit="3" dispatch={dispatch}/>
            <OperationButton operation="+" dispatch={dispatch}/>
            <DigitButtonForTwo digit="0" dispatch={dispatch}/>
            <DigitButton digit="." dispatch={dispatch}/>
            <button className={styles.mathSign} onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>
        </div>
  );
}

export default App;
