import React from 'react';
import {render} from '@testing-library/react';
import App from "../app";
import {Provider} from "react-redux";
import {store} from "../Redux/Store/store";


test('renders learn react link', () => {
    render(<Provider store={store}>
        <App/>
    </Provider>);
});
