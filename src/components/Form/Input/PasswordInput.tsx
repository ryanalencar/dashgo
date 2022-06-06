import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Input, InputProps } from ".";

type PasswordInputProps = InputProps & ChakraInputProps;

export default function PasswordInput({ label, name }: PasswordInputProps) {
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
    />
  );
}
