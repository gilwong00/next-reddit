import { useState } from 'react';
// import { usePosts } from 'hooks/usePost';
import { useQuery } from 'react-query';
import { getPost } from 'api';
import { useToast } from 'hooks';
import { Spinner } from '@chakra-ui/react';

const PostList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { pushNotification } = useToast();
  const { data, status, error } = useQuery<any>(['posts', page], () =>
    getPost(page)
  );

  if (status === 'loading') return <Spinner size='xl' />;
  if (status === 'error') pushNotification('error', JSON.stringify(error));

  return (
    <div>
      {data?.posts.map((post: any) => {
        return <h1 key={post.id}>{post.title}</h1>;
      })}
    </div>
  );
};

export default PostList;
