import React from "react";

import { User } from "../../types/types";

import styles from "./friendsList.module.scss";

interface Props {
  friends: User[];
  isOpen?: boolean;
}

export const FriendsList = ({ friends }: Props) => {
  return (
    <div className={styles.section}>
      {friends?.map((user) => (
        <ul className={styles.list}>
          <li>{user.first_name}</li>
          <li>{user.last_name}</li>
        </ul>
      ))}
    </div>
  );
};
