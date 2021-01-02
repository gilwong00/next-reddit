import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { Button } from '@chakra-ui/react';
import { InputField } from 'components/InputField';
import { Card } from 'components/Card';
import { useMutation } from 'react-query';
import { useToast } from 'hooks';
import { register } from 'api';

const Register: React.FC = () => {
  const router = useRouter();
  const { pushNotification } = useToast();
  const { mutate } = useMutation(register, {
    onSuccess: (): void => {
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
          if (values.password === values.confirmPassword) {
            await mutate(values);
          } else {
            pushNotification('error', 'passwords do not match');
          }
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
