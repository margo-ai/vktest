import React, { ReactNode } from "react";

import styles from "./container.module.scss";

interface Props {
  children: ReactNode;
}

export const Container = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};
