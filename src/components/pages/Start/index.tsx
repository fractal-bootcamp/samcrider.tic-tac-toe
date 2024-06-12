import Component from "./component";
import { useStartPageData } from "./data";

const Start = () => {
  const { mode, setMode } = useStartPageData();
  return <Component mode={mode} setMode={setMode} />;
};

export default Start;
