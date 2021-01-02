import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { Button, Link, Flex } from '@chakra-ui/react';
import { InputField } from '../components/InputField';
import { Card } from '../components/Card';
import { useMutation } from 'react-query';
import { authUser } from '../api';
import { AuthContext, Actions } from 'context/authContext';

const Login: React.FC = () => {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);
  const { mutate } = useMutation(authUser, {
    onSuccess: data => {
      dispatch({ type: Actions.LOGIN, payload: data });
      router.push('/');
    }
  });

  return (
    <Card>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async values => {
          await mutate(values);
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
            <InputField
              name='password'
              placeholder='Password'
              label='Password'
              type='password'
            />
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
