import {
  FormControl,
  FormLabel,
  IconButton,
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, ReactElement } from "react";

export interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  icon?: ReactElement;
  onClick?: any;
  ariaLabel?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, icon, onClick, ariaLabel = "", ...rest }: InputProps,
  ref
) => {
  return (
    <>
      {icon ? (
        <FormControl>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <InputGroup size="lg">
            <ChakraInput
              name={name}
              id={name}
              focusBorderColor="pink.500"
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
            ref={ref}
            {...rest}
          />
        </FormControl>
      )}
    </>
  );
};

export const Input = forwardRef(InputBase);
