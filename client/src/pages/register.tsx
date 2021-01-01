import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { Button } from '@chakra-ui/react';
import { InputField } from '../components/InputField';
import { Card } from '../components/Card';
import { useMutation } from 'react-query';
import { register } from '../api';

const Register: React.FC = () => {
  const router = useRouter();
  const { mutate } = useMutation(register, {
    onSuccess: data => {
      console.log('data', data);
      router.push('/login');
    }
  });

  return (
    <Card>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={async values => {
          await mutate(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='Username'
              label='Username'
              type='text'
            />
            <InputField
              name='email'
              placeholder='Email'
              label='Email'
              type='text'
            />

            <InputField
              name='password'
              placeholder='Password'
              label='Password'
              type='password'
            />

            <InputField
              name='confirmPassword'
              placeholder='Confirm Password'
              label='Confirm Password'
              type='password'
            />

            <Button mt={2} type='submit' isLoading={isSubmitting} isFullWidth>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Register;
