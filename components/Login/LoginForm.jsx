import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Swal from 'sweetalert2';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('/api/Auth/User/Login', values);
      let timerInterval;
      Swal.fire({
        title: 'Success',
        icon: 'success',
        html: 'Redirecting in <b></b> seconds.',
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then(() => {
        // Redirect or perform another action after the countdown
      });
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'An error occurred', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Sign In</h2>
      <Box display="flex" flexDirection="row">
        <Box flex={1} p={2}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form style={{ paddingTop: '150px' }}>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    variant="outlined"
                    helperText={<ErrorMessage name="username" />}
                    error={touched.username && Boolean(errors.username)}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    helperText={<ErrorMessage name="password" />}
                    error={touched.password && Boolean(errors.password)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box display="flex" >
                  <LoadingButton
                    variant="outlined"
                    color="primary"
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                  >
                    Sign In
                  </LoadingButton>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      router.push('/Register');
                    }}
                    style={{marginLeft: '10px'}}
                  >
                    Register
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
        <Box flex={1} p={2}>
          <img src="/Images/Authentication-rafiki.png" alt="Authentication" style={{ width: '100%' }} />
        </Box>
      </Box>
    </div>
  );
};

export default LoginForm;