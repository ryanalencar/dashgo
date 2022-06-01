import {
  FormControl,
  FormLabel,
  IconButton,
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { ReactElement } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  icon?: ReactElement;
  onClick?: any;
  ariaLabel?: string;
}
export function Input({
  name,
  label,
  icon,
  onClick,
  ariaLabel = "",
  ...rest
}: InputProps) {
  return (
    <>
      {icon ? (
        <FormControl>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <InputGroup size="lg">
            <Input
              name={name}
              id={name}
              focusBorderColor="pink.500"
              bgColor="gray.900"
              variant="filled"
              _hover={{ bg: "gray.900" }}
              {...rest}
            />
            <InputRightElement>
              <IconButton
                onClick={onClick}
                variant="unstyled"
                aria-label={ariaLabel}
                icon={icon}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      ) : (
        <FormControl>
          {!!label && <FormLabel htmlFor="email">{label}</FormLabel>}
          <ChakraInput
            name={name}
            id={name}
            focusBorderColor="pink.500"
            bgColor="gray.900"
            variant="filled"
            _hover={{ bg: "gray.900" }}
            size="lg"
            {...rest}
          />
        </FormControl>
      )}
    </>
  );
}
