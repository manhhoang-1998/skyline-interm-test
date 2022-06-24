import { Spin } from "antd";
import "./LoadingScreen.scss";

function LoaddingScreen() {
  return (
    <div className="loading-screen">
      <Spin tip="Loading..." size="large"></Spin>
    </div>
  );
}

export default LoaddingScreen;
