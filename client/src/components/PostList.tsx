import NextLink from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getPost } from 'api';
import { useToast } from 'hooks';
import { Spinner, Stack, Box, Heading, Text, Flex } from '@chakra-ui/react';
import { Card } from './Card';
import { Vote } from './Vote';

export interface IPost {
  id: number;
  body: string;
  title: string;
  username: string;
  created_at: string;
  votes: Array<any>;
  totalVotes: number;
}

const PostList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { pushNotification } = useToast();
  const { data, status, error, refetch } = useQuery<{ posts: Array<IPost> }>(
    'posts',
    () => getPost(page),
    {
      cacheTime: 50000,
      staleTime: 0
    }
  );

  if (status === 'loading') return <Spinner size='xl' />;
  if (status === 'error') pushNotification('error', JSON.stringify(error));

  return (
    <Stack spacing={8}>
      {data?.posts.map((post: IPost) => {
        return (
          <Card key={post.id}>
            <Flex direction='row'>
              <Vote
                postId={post.id}
                votes={post.votes}
                totalVotes={post.totalVotes}
                refetch={refetch}
              />
              <Box flex={1}>
                <NextLink href='/post/[id]' as={`/post/${post.id}`}>
                  <Heading
                    fontSize='xl'
                    style={{ textTransform: 'capitalize' }}
                  >
                    {post.title}
                  </Heading>
                </NextLink>

                <Text>posted by {post.username}</Text>
                <Flex align='center'>
                  <Text flex={1} mt={4}>
                    {post.body}
                  </Text>
                  <Box ml='auto'></Box>
                </Flex>
              </Box>
            </Flex>
          </Card>
        );
      })}
    </Stack>
  );
};

export default PostList;
