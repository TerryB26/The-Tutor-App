import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from 'sweetalert2';
import axios from 'axios';

const provinces = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape'
];

const roles = ['Student', 'Tutor'];

const Register = () => {
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    address: {
      streetName: '',
      city: '',
      state: ''
    },
    role: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    address: Yup.object({
      streetName: Yup.string().required('Street name is required'),
      city: Yup.string().required('City/Town is required'),
      state: Yup.string().required('State or Province is required')
    }),
    role: Yup.string().required('Role is required')
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('/api/Auth/User/Register', values);
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
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <Box display="flex" justifyContent="center">
        <Box width="50%">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors, touched, setFieldValue }) => (
              <Form>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    helperText={<ErrorMessage name="name" />}
                    error={touched.name && Boolean(errors.name)}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    fullWidth
                    id="surname"
                    name="surname"
                    label="Surname"
                    variant="outlined"
                    helperText={<ErrorMessage name="surname" />}
                    error={touched.surname && Boolean(errors.surname)}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    helperText={<ErrorMessage name="email" />}
                    error={touched.email && Boolean(errors.email)}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    fullWidth
                    id="streetName"
                    name="address.streetName"
                    label="Street Name"
                    variant="outlined"
                    helperText={<ErrorMessage name="address.streetName" />}
                    error={touched.address?.streetName && Boolean(errors.address?.streetName)}
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    fullWidth
                    id="city"
                    name="address.city"
                    label="City/Town"
                    variant="outlined"
                    helperText={<ErrorMessage name="address.city" />}
                    error={touched.address?.city && Boolean(errors.address?.city)}
                  />
                </Box>
                <Box mb={2}>
                  <Autocomplete
                    options={provinces}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => setFieldValue('address.state', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State or Province"
                        variant="outlined"
                        helperText={<ErrorMessage name="address.state" />}
                        error={touched.address?.state && Boolean(errors.address?.state)}
                      />
                    )}
                  />
                </Box>
                <Box mb={2}>
                  <Autocomplete
                    options={roles}
                    getOptionLabel={(option) => option}
                    onChange={(event, value) => setFieldValue('role', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Role (Student or Tutor)"
                        variant="outlined"
                        helperText={<ErrorMessage name="role" />}
                        error={touched.role && Boolean(errors.role)}
                      />
                    )}
                  />
                </Box>
                <Box display="flex" justifyContent="center">
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                  >
                    Register
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </div>
  );
};

export default Register;