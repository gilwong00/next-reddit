import { useField } from 'formik';
import { Input, FormErrorMessage, FormControl } from '@chakra-ui/react';

interface IProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

export const InputField: React.FC<IProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl mb={5}>
      <Input {...field} {...props} />
      {meta.touched && meta.error && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </FormControl>
  );
};
