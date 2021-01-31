import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from 'context/authContext';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useMutation } from 'react-query';
import { vote } from 'api';

interface IProps {
  postId: number;
  votes: number;
}

export const Vote: React.FC<IProps> = ({ postId, votes }) => {
  const router = useRouter();
  const { authenticated, user } = useContext(AuthContext);
  const { mutate } = useMutation(vote);

  const handleVote = async (value: 1 | -1) => {
    if (!authenticated || !user) return router.push('/login');
    return await mutate({ value, postId, username: user.username });
  };

  return (
    <Flex direction='column' justifyContent='center' alignItems='center' mr={8}>
      <IconButton
        colorScheme='green'
        aria-label='up vote post'
        icon={<ChevronUpIcon />}
        onClick={async () => await handleVote(1)}
      />
      <Text mt={2} mb={2}>
        {votes}
      </Text>
      <IconButton
        colorScheme='red'
        aria-label='down vote post'
        icon={<ChevronDownIcon />}
        onClick={async () => await handleVote(-1)}
      />
    </Flex>
  );
};
