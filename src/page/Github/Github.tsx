import { Input } from "antd";
import ComeBack from "component/comeback/ComeBack";
import "./Github.scss";
import { useGit } from "./hook/useGit";
import defaultAvatar from "assets/image/defaultavatar.png";

function Github() {
  const {
    userName,
    userData,
    repos,
    isShowForm,
    isFail,
    onSearchInfo,
    getInfo,
  } = useGit();

  return (
    <div className="git-page">
      <ComeBack />
      <div className="git-container">
        <Input
          value={userName}
          className="git-search"
          placeholder="Search a Github User"
          onChange={(e) => onSearchInfo(e)}
          onPressEnter={() => getInfo()}
        ></Input>
        {isShowForm ? (
          <div className="git-card">
            {!isFail ? (
              <div className="git-user">
                <img
                  src={userData.avatar_url || defaultAvatar}
                  alt=""
                  className="git-user__avatar"
                />
                <div className="git-user__info">
                  <span className="git-user__info-name">
                    {userData.name || "Null"}
                  </span>
                  <span className="git-user__info-bio">
                    {userData.bio || "Null"}
                  </span>
                  <div className="git-user__info-public">
                    <p className="git-user__info-follows">
                      {userData.followers || 0} followers
                    </p>
                    <p className="git-user__info-following">
                      {userData.following || 0} following
                    </p>
                    <p className="git-user__info-repos">
                      {userData.public_repos || 0} repos
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <h1 style={{ color: "#e5e5e5", textAlign: "center" }}>
                No profile with this username
              </h1>
            )}
            <ul className="git-repos__list">
              {repos
                .filter((item: any, index: number) => index < 6)
                .map((item: any, index: number) => (
                  <li key={index} className="git-repos__list-item">
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Github;
