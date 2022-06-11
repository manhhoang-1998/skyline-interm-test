import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./ComeBack.scss";

const ComeBack: FC = () => {
  const navigate = useNavigate();
  const onHandleClick = () => {
    navigate("/");
  };
  return (
    <button className="back-btn" onClick={onHandleClick}>
      {" "}
      Back
    </button>
  );
};

export default ComeBack;
