import { HStack, IconButton } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export default function NotificationsNav() {
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <IconButton
        icon={<RiNotificationLine />}
        aria-label="Notifications"
        fontSize="20"
        variant="unstyled"
        _focus={{ boxShadow: "0", color: "pink.500" }}
        _hover={{ color: "gray.500" }}
      />
      <IconButton
        icon={<RiUserAddLine />}
        aria-label="Add User"
        fontSize="20"
        variant="unstyled"
        _focus={{ boxShadow: "0", color: "pink.500" }}
        _hover={{ color: "gray.500" }}
      />
    </HStack>
  );
}
