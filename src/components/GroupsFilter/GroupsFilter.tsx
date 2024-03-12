import React, { ChangeEvent, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Select } from "../Select";
import styles from "./groupsFilter.module.scss";

import { colorsOptions, friendsOptions, privacyOptions } from "../../constants/filterOptions";

interface Props {
  updateFilters: (data: any) => void;
}

export const GroupsFilter = ({ updateFilters }: Props) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      color: "all",
      privacy: "all",
      friends: "true",
    },
    mode: "onChange",
  });

  const [color, setColor] = useState("all");
  const [privacy, setPrivacy] = useState("all");
  const [friends, setFriends] = useState("");

  const onSubmit = (data) => {
    updateFilters(data);
  };

  const handleChangeColor = (e: ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value);
  };
  const handleChangePrivacy = (e: ChangeEvent<HTMLSelectElement>) => {
    setPrivacy(e.target.value);
  };
  const handleChangeFriends = (e: ChangeEvent<HTMLSelectElement>) => {
    setFriends(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Фильтрация</h2>
      <div className={styles.filtersBlock}>
        <div>
          <Controller
            name="color"
            control={control}
            render={({ field: { value, ...other } }) => (
              <Select value={value} label="Цвет" options={colorsOptions} onChange={handleChangeColor} {...other} />
            )}
          />
        </div>

        <div>
          <Controller
            name="privacy"
            control={control}
            render={({ field: { value, ...other } }) => (
              <Select
                value={value}
                label="Приватность"
                options={privacyOptions}
                onChange={handleChangePrivacy}
                {...other}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="friends"
            control={control}
            render={({ field: { value, ...other } }) => (
              <Select value={value} label="Друзья" options={friendsOptions} onChange={handleChangeFriends} {...other} />
            )}
          />
        </div>
      </div>

      <button className={styles.button} type="submit">
        Применить
      </button>
    </form>
  );
};
