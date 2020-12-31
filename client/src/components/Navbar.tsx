import NextLink from 'next/link';
import { Flex, Heading, Link } from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Flex zIndex={1} position='sticky' top={0} bg='purple.600' p={4} w='100%'>
      <Flex align='center' justify='space-between'>
        <NextLink href='/'>
          <Heading>Next Reddit</Heading>
        </NextLink>
      </Flex>
      <Flex ml='auto' align='center' justify='flex-end'>
        <NextLink href='/login'>
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>Register</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
