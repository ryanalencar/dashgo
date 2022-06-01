import { Icon, Link, LinkProps, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface INavItemProps extends LinkProps {
  icon: IconType;
  text: string;
}

export default function NavItem({ icon, text, ...rest }: INavItemProps) {
  return (
    <Link display="flex" style={{ alignContent: "center" }} {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {text}
      </Text>
    </Link>
  );
}
