import { useContext } from 'react';
import { AuthContext } from 'context/authContext';
import { Flex, Heading, Button, Text } from '@chakra-ui/react';
import { DarkModeSwitch } from './DarkModeSwitch';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

export const Navbar = () => {
  const { authenticated, user } = useContext(AuthContext);
  const router = useRouter();
  return (
    <Flex
      dir='row'
      zIndex={1}
      position='sticky'
      top={0}
      bg='purple.600'
      p={4}
      w='100%'
    >
      <Flex align='center' justify='space-between'>
        <NextLink href='/'>
          <Heading>Next Reddit</Heading>
        </NextLink>
      </Flex>
      <Flex flex={1} align='center' justify='center'>
        <DarkModeSwitch />
      </Flex>
      {authenticated ? (
        <Flex ml='auto' align='center' justify='flex-end'>
          <Text>{user?.username}</Text>
        </Flex>
      ) : (
        <Flex>
          <Button
            colorScheme='teal'
            size='sm'
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
          <Button
            colorScheme='teal'
            size='sm'
            onClick={() => router.push('/register')}
          >
            Register
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
