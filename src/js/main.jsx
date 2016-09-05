/**
 * The entry point for the application
 */
import "../css/style.css";
import ReactDOM from "react-dom";
import AppRouter from "./comps/AppRouter";

ReactDOM.render(<AppRouter />, document.getElementById('app'));