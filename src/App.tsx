import React, { useEffect, useState } from "react";

import { Container } from "./components/Container";
import { GroupsList } from "./components/GroupsList";

import { GetGroupsResponse, Group } from "./types/types";
import { data } from "./api/groups";

import styles from "./styles/app.module.scss";
import { GroupsFilter } from "./components/GroupsFilter";
import { Spinner } from "./components/Spinner";

interface IFilterValues {
  color: string;
  privacy: string;
  friends: string;
}

export const App = () => {
  const [groups, setGroups] = useState<Group[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [filterValues, setFilterValues] = useState<IFilterValues>({
    color: "all",
    privacy: "all",
    friends: "true",
  });

  const fetchGroups = (): Promise<GetGroupsResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const generatedNumber = 0.7;

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

  const updateFilters = (data: IFilterValues) => setFilterValues(data);

  const fetchData = async () => {
    try {
      const response = await fetchGroups();
      setGroups(response.data);
    } catch (error) {
      setIsError(true);
      console.error(`Ошибка запроса: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filterGroups = (groups: Group[], filters: IFilterValues) => {
    const privacyValue = (filters) => {
      switch (filters.privacy) {
        case "opened":
          return false;
        case "closed":
          return true;
        default:
          return false;
      }
    };

    const filteredByColor = groups.filter((group) =>
      filters.color === "all" ? group : group.avatar_color === filters.color,
    );
    const filteredByPrivacy = groups.filter((group) => group.closed === privacyValue(filters));
    const filteredByFriends = groups.filter((group) => !!filters.friends === !!group.friends);

    setGroups(filteredByColor);
  };

  useEffect(() => {
    filterGroups(groups, filterValues);
  }, [filterValues]);

  return (
    <Container>
      <h1 className={styles.title}>Список групп</h1>
      <GroupsFilter updateFilters={updateFilters} />
      {!!isLoading ? <Spinner /> : !!isError ? "error" : <GroupsList data={groups} />}
    </Container>
  );
};
