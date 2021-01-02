import { useState } from 'react';
import { Spinner, Text } from '@chakra-ui/react';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import { useQuery } from 'react-query';
import { useToast } from 'hooks';
import { getPost } from 'api';

const Index = () => {
  const [page, setPage] = useState<number>(1);
  const { pushNotification } = useToast();
  // maybe move this to be fetched server side
  const { data, error, status } = useQuery(
    ['posts', page],
    () => getPost(page),
    { keepPreviousData: true, staleTime: 5000 }
  );

  if (status === 'loading') return <Spinner size='xl' />;
  if (status === 'error') pushNotification('error', JSON.stringify(error));
  console.log('data', data);
  return (
    <Container height='100vh'>
      {/* map data out */}
      {data.posts.map((post: any) => {
        return <h1 key={post.id}>{post.title}</h1>;
      })}
      <Footer>
        <Text>Next ❤️ Chakra</Text>
      </Footer>
    </Container>
  );
};

export default Index;
