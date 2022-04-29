import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./Redux/Store/store";
import App from "./app";
import {ThemeProvider} from "@material-ui/core";
import {createTheme} from "@mui/material";
import {HashRouter} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: '#730bc4',
        },
        secondary: {
            main: '#9daacc'
        },
    },
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    </ThemeProvider>,
    //</React.StrictMode>
    document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
