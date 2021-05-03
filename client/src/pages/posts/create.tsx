import { useContext } from 'react';
import { Card } from '../../components/Card';
import { Formik, Form, FormikProps } from 'formik';
import { InputField } from '../../components/InputField';
import { Button } from '@chakra-ui/react';
import { AuthContext } from 'context/authContext';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { createPost } from 'api';

const CreatePost = () => {
  const client: QueryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { mutate } = useMutation(createPost, {
    onSuccess: data => {
      // we can make this into a reusable hook
      client.setQueryData('posts', { id: data.id }, data);
    }
  });
  return (
    <Card>
      <Formik
        initialValues={{ title: '', body: '' }}
        onSubmit={async values => {
          if (user) await mutate({ ...values, username: user.username });
        }}
      >
        {({ isSubmitting }: FormikProps<any>) => (
          <Form>
            <InputField
              name='title'
              placeholder='Title'
              type='text'
              label='Title'
            />
            <InputField
              name='body'
              placeholder='Body'
              type='text'
              label='Body'
              textarea={true}
            />
            <Button mt={4} type='submit' isLoading={isSubmitting} isFullWidth>
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default CreatePost;
