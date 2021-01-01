import { useColorMode, Switch } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <>
      <SunIcon mr={5} h={8} />
      <Switch
        top='1rem'
        right='1rem'
        color='green'
        isChecked={isDark}
        onChange={toggleColorMode}
        zIndex={100}
      />
      <MoonIcon ml={5} h={8} />
    </>
  );
};
