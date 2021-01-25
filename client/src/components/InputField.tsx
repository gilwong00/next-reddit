import { useField } from 'formik';
import {
  Input,
  FormErrorMessage,
  FormControl,
  Textarea
} from '@chakra-ui/react';

interface IProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  textarea?: boolean;
}

export const InputField: React.FC<IProps> = ({ textarea, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl mb={5}>
      {textarea ? (
        <Textarea {...field} {...props} />
      ) : (
        <Input {...field} {...props} />
      )}

      {meta.touched && meta.error && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </FormControl>
  );
};
