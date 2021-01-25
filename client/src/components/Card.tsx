import React from 'react';
import { Box } from '@chakra-ui/react';

interface IProps {
  children: React.ReactNode;
}

export const Card: React.FC<IProps> = ({ children }) => (
  <Box
    borderWidth='1px'
    borderRadius='sm'
    overflow='hidden'
    p={5}
    w={{ sm: 300, md: 600 }}
    ml='auto'
    mr='auto'
    mt={50}
    boxShadow='lg'
  >
    {children}
  </Box>
);
