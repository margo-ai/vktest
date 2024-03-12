import React from "react";

import { Group } from "../../types/types";

import styles from "./groupItem.module.scss";

interface Props {
  fields: Group;
}

export const GroupItem = ({ fields }: Props) => {
  const { name, closed, members_count, friends, avatar_color } = fields;
  return (
    <li className={styles.item}>
      {!!avatar_color ? (
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: avatar_color,
            borderRadius: "50%",
            border: "1px solid black",
          }}
        />
      ) : null}
      <div className={styles.info}>
        <h2>Название: {name}</h2>
        <div>{closed ? "Закрытая" : "Открытая"}</div>
        <div>Подписчиков: {members_count}</div>
        {!!friends ? <div>Друзей: {friends.length}</div> : null}
      </div>
    </li>
  );
};
