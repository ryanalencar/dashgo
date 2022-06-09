import { ElementType } from "react";
import { Icon, Link, LinkProps, Text } from "@chakra-ui/react";
import ActiveLink from "../common/ActiveLink";

interface INavItemProps extends LinkProps {
  icon: ElementType;
  text: string;
  href: string;
}

export default function NavItem({ icon, text, href, ...rest }: INavItemProps) {
  return (
    <ActiveLink href={href} passHref>
      <Link
        display="flex"
        style={{ alignContent: "center" }}
        textDecoration="pink"
        {...rest}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium" textTransform="capitalize">
          {text}
        </Text>
      </Link>
    </ActiveLink>
  );
}
