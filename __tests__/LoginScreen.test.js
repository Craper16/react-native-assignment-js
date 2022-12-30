import React from 'react';
import renderer, {act} from 'react-test-renderer';
import LoginScreen from '../src/screens/LoginScreen';
import store from '../src/redux/store';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

// Testing login screen main functionalities:
// if login screen renders login form, handles API response on submit
// using mock requests
// and if button is disabled when inputs are empty

describe('LoginScreen', () => {
  test('Screen renders correctly', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <PaperProvider>
          <LoginScreen />
        </PaperProvider>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  test('Login screen should contain username and password input fields and login button', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <PaperProvider>
          <LoginScreen />
        </PaperProvider>
      </Provider>,
    );
    const username = getByTestId('username');
    const password = getByTestId('password');
    const loginButton = getByTestId('loginButton');

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  // EXECUTE LOGIN API FAIL AND SUCCESS

  test('API is called after pressing login button and it handles incorrect credentials', async () => {
    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <PaperProvider>
          <LoginScreen />
        </PaperProvider>
      </Provider>,
    );
    const username = getByTestId('username');
    const password = getByTestId('password');
    const loginButton = getByTestId('loginButton');

    await act(async () => {
      await fireEvent.changeText(username, 'wrongusername');
      await fireEvent.changeText(password, 'wrongpassword');
      await fireEvent.press(loginButton, {username, password});
    });

    // if you put correct credentials test will fail

    await waitFor(() => {
      expect(getByText('Please check your login credentials')).toBeTruthy();
      expect(store.getState().auth.accessToken).not.toBe('mocktoken');
    });
  });

  test('API is called after pressing login button and is successful', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <PaperProvider>
          <LoginScreen />
        </PaperProvider>
      </Provider>,
    );
    const username = getByTestId('username');
    const password = getByTestId('password');
    const loginButton = getByTestId('loginButton');

    await act(async () => {
      await fireEvent.changeText(username, 'candidate');
      await fireEvent.changeText(password, 'P@ssw0rd');
      await fireEvent.press(loginButton, {username, password});
    });

    // In my code accessToken is stored in redux and if it exists
    // and it's not undefined or null
    // It redirects/changes the react navigation stack to the articles/dashboard screen
    // So here im testing if the accessToken is the same as my msw response token
    // to test redirect
    // whys this comment too long

    await waitFor(() => {
      expect(store.getState().auth.accessToken).toBe('mocktoken');
    });
  });

  // EXECUTE LOGIN API FAIL AND SUCCESS ^

  test('Button is disabled when both input fields are empty', async () => {
    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <PaperProvider>
          <LoginScreen />
        </PaperProvider>
      </Provider>,
    );

    const username = getByTestId('username');
    const password = getByTestId('password');
    const loginButton = getByTestId('loginButton');

    await act(async () => {
      await fireEvent.changeText(username, 'test');
      await fireEvent.changeText(password, 'test');
    });

    expect(loginButton.props.accessibilityState).toStrictEqual({
      disabled: false,
    });

    await act(async () => {
      await fireEvent.changeText(username, '');
      await fireEvent.changeText(password, '');
    });

    expect(loginButton.props.accessibilityState).toStrictEqual({
      disabled: true,
    });
  });

//   test('Button is disabled when API is called', async () => {
//     const {getByTestId} = render(
//       <Provider store={store}>
//         <PaperProvider>
//           <LoginScreen />
//         </PaperProvider>
//       </Provider>,
//     );

//     const username = getByTestId('username');
//     const password = getByTestId('password');
//     const loginButton = getByTestId('loginButton');

//     await act(async () => {
//       await fireEvent.changeText(username, 'test');
//       await fireEvent.changeText(password, 'test');
//     });

//     console.log(loginButton.props);

//     expect(loginButton.props.accessibilityState).toStrictEqual({
//       disabled: false,
//     });

//     await act(async () => {
//       await fireEvent.press(loginButton);
//     });

//     await waitFor(() => {
//       console.log(loginButton.props.accessibilityState);
//       expect(loginButton.props.accessibilityState).toStrictEqual({
//         disabled: true,
//       });
//     });
//   });
});
