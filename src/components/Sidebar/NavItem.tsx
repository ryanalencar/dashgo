import { Icon, Link, LinkProps, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import NextLink from "next/link";
import { Url } from "url";

interface INavItemProps extends LinkProps {
  icon: IconType;
  text: string;
  href: string;
}

export default function NavItem({ icon, text, href, ...rest }: INavItemProps) {
  return (
    <NextLink href={href} passHref>
      <Link display="flex" style={{ alignContent: "center" }} {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium" textTransform="capitalize">
          {text}
        </Text>
      </Link>
    </NextLink>
  );
}
