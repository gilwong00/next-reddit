import React from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { Box, Button, Link, Flex } from '@chakra-ui/react';
import { InputField } from '../components/InputField';
import { Card } from '../components/Card';
import { useMutation } from 'react-query';

const Login: React.FC = () => {
  const router = useRouter();
  // const mutation = useMutation()
  return (
    <Card>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async values => {
          console.log('values', values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='usernameOrEmail'
              placeholder='Username or Email'
              label='Username or Email'
              type='text'
            />
            <Box mt={4}>
              <InputField
                name='password'
                placeholder='Password'
                label='Password'
                type='password'
              />
            </Box>
            <Flex d='flex' justify='center' mt={5}>
              <Link href='/forgot-password' color='blue.500'>
                Forgot Password?
              </Link>
            </Flex>
            <Button mt={4} type='submit' isLoading={isSubmitting} isFullWidth>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Login;
