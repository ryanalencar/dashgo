import moment from "moment";
import { useQuery } from "react-query";

import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get("/users");

  const users = data.users.map((user: User) => {
    return {
      ...user,
      createdAt: moment(user.createdAt).format("DD/MM/YYYY"),
    };
  });

  return users;
}

export function useUsers() {
  return useQuery("users", getUsers, { staleTime: 1000 * 5 });
}
