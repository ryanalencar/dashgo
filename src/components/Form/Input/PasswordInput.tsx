import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { Input, InputProps } from ".";

type PasswordInputProps = InputProps & ChakraInputProps;

const PasswordInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  PasswordInputProps
> = ({ label, name, ...rest }: PasswordInputProps, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((oldShowPassword) => !oldShowPassword);
  };

  return (
    <Input
      name={name}
      label={label ?? "Senha"}
      type={showPassword ? "text" : "password"}
      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
      ariaLabel={showPassword ? "Hide Password" : "Show Password"}
      onClick={handleShowPassword}
      ref={ref}
      {...rest}
    />
  );
};

export const PasswordInput = forwardRef(PasswordInputBase);
