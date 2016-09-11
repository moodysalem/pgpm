/**
 * The entry point for the application
 */
import "../css/style.css";
import ReactDOM from "react-dom";
import AppRouter from "./comps/Controller";

ReactDOM.render(<AppRouter />, document.getElementById('app'));