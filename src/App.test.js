import React from "react";
import { render} from '@testing-library/react';
import App from "./App";
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom'
import { Provider } from "react-redux";
import store from "./store";

test('renders learn react link', () => {
  const history = createMemoryHistory()
  render(
    <div>
      <Provider store={store}>
        <Router history={history} >
          <App />
        </Router>
      </Provider>
    </div>
  );
  // expect(linkElement).toBeInTheDocument();
});

// test('rendering a component that uses useLocation'), () => {
//   const history = createMemoryHistory()
//   const route = '/some-route;'
//   history.push(route)
//   render(
//     <>
//     <Router history={history}>
//     <LocationDisplay/>
//     </Router>
//     </>
//   )
// }