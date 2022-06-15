import { ChangeEvent, useState } from "react";
import { getProjectData, getUserData } from "../services/githubApi";
interface IGit {
  getInfo: () => void;
  onSearchInfo: (e: ChangeEvent<HTMLInputElement>) => void;
  userName: string;
  userData: any;
  repos: any;
  isShowForm: boolean;
  isFail: boolean;
}

export const useGit = (): IGit => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState({});
  const [repos, setRepos] = useState([]);
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const [isFail, setIsFail] = useState<boolean>(false);

  const onSearchInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e?.target.value);
  };

  const getInfo = async () => {
    setIsShowForm(true);
    try {
      const userInfo = await getUserData(userName);
      setUserData(userInfo.data);
      const projectInfo = await getProjectData(userInfo.data.login);
      setRepos(projectInfo.data);
      setUserName("");
      setIsFail(false);
    } catch (error) {
      setIsFail(true);
      setRepos([]);
    }
  };
  return {
    userName,
    userData,
    repos,
    isShowForm,
    onSearchInfo,
    getInfo,
    isFail,
  };
};
