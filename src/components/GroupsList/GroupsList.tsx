import React, { ReactNode } from "react";

import styles from "./groupsList.module.scss";

import { Group } from "../../types/types";

import { GroupItem } from "../GroupItem";

interface Props {
  data: Group[];
}

export const GroupsList = ({ data }: Props) => {
  return <ul className={styles.list}>{data?.map((fields) => <GroupItem key={fields.id} fields={fields} />)}</ul>;
};
