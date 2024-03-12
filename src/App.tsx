import React, { useEffect, useState } from "react";

// import { AppRoot, Group, Header, Panel, PanelHeader, SimpleCell, View } from "@vkontakte/vkui";
import { Container } from "./components/Container";
import { GroupsList } from "./components/GroupsList";

import { GetGroupsResponse, Group } from "./types/types";
import { data } from "./api/groups";

import styles from "./styles/app.module.scss";

export const App = () => {
  const [groups, setGroups] = useState<Group[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchGroups = (): Promise<GetGroupsResponse> => {
    // fetch("/api/groups.json")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error("Error loading JSON file", error));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // const generatedNumber = Math.random();
        const generatedNumber = 0.7;
        console.log(generatedNumber);

        if (generatedNumber >= 0 && generatedNumber < 0.3) {
          reject(new Error("Ошибка"));
        } else if (generatedNumber > 0.3 && generatedNumber < 0.5) {
          resolve({ result: 0 });
        } else {
          resolve({ result: 1, data });
        }
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGroups();
        console.log(response);
        setGroups(response.data);
      } catch (error) {
        setIsError(true);
        console.error(`Ошибка запроса: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h1 className={styles.title}>Список групп</h1>
      {!!isLoading ? "loading" : !!isError ? "error" : <GroupsList data={groups} />}
    </Container>
  );
};
