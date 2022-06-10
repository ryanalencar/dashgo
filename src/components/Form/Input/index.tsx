import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, ReactElement } from "react";
import { FieldError } from "react-hook-form";

export interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  icon?: ReactElement;
  onClick?: any;
  ariaLabel?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, icon, error, onClick, ariaLabel = "", ...rest }: InputProps,
  ref
) => {
  return (
    <>
      {icon ? (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <InputGroup size="lg">
            <ChakraInput
              name={name}
              id={name}
              focusBorderColor={!!error ? "red.500" : "pink.500"}
              bgColor="gray.900"
              variant="filled"
              _hover={{ bg: "gray.900" }}
              ref={ref}
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
          {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
        </FormControl>
      ) : (
        <FormControl isInvalid={!!error}>
          {!!label && <FormLabel htmlFor="email">{label}</FormLabel>}
          <ChakraInput
            name={name}
            id={name}
            focusBorderColor={!!error ? "red.500" : "pink.500"}
            bgColor="gray.900"
            variant="filled"
            _hover={{ bg: "gray.900" }}
            size="lg"
            ref={ref}
            {...rest}
          />
          {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
        </FormControl>
      )}
    </>
  );
};

export const Input = forwardRef(InputBase);
