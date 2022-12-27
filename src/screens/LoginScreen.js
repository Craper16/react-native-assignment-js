import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import {storage} from '../storage/storage';
import {Button, Text, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {useSignInUserMutation} from '../redux/api/authApi';
import {setUser} from '../redux/auth/authSlice';
import * as yup from 'yup';
import {Formik} from 'formik';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Username must not be empty'),
  password: yup.string().required('Password must not be empty.'),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [signInUser, {data, isLoading, error, isError, isSuccess}] =
    useSignInUserMutation();

  const LoginUser = async () => {
    await storage.set('accessToken', data?.accessToken);
    dispatch(setUser({accessToken: data?.accessToken}));
  };

  if (isSuccess) {
    LoginUser();
  }

  return (
    <Formik
      initialValues={{username: '', password: ''}}
      validateOnMount={true}
      onSubmit={values => signInUser({...values})}
      validationSchema={loginValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={50}
          style={styles.screen}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={styles.mainContainer}>
            <Text style={styles.title}>Login to view Articles!</Text>
            <View style={styles.inputContainer}>
              <ScrollView>
                <View style={styles.textInputContainer}>
                  <TextInput
                    autoCapitalize={false}
                    textColor="#8A2BE2"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    mode="outlined"
                    label="Username"
                    error={errors.username && touched.username}
                  />
                  {errors.username && touched.username && (
                    <Text style={styles.errors}>{errors.username}</Text>
                  )}
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    autoCapitalize={false}
                    textColor="#8A2BE2"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    mode="outlined"
                    secureTextEntry
                    label="Password"
                    error={errors.password && touched.password}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.actions}>
                  <Button
                    disabled={!isValid || isLoading}
                    onPress={handleSubmit}
                    mode="elevated"
                    loading={isLoading}>
                    Login
                  </Button>
                </View>
                {isError && (
                  <View style={styles.apiErrorsContainer}>
                    <Text style={styles.apiErrors}>
                      {error.data?.message || error.error}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#aab1eebb',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#8A2BE2',
  },
  inputContainer: {
    width: '80%',
    padding: 2,
    marginBottom: 9,
    marginVertical: 14,
  },
  textInputContainer: {
    margin: 5,
    padding: 4,
    justifyContent: 'center',
  },
  errors: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'red',
  },
  apiErrorsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  apiErrors: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 7,
    color: 'red',
  },
  actions: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
