import { Text } from '@chakra-ui/react';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';
import PostList from '../components/PostList';

const Index = () => {
  return (
    <Container height='100vh'>
      <PostList />
      <Footer>
        <Text>Next ❤️ Chakra</Text>
      </Footer>
    </Container>
  );
};

export default Index;
