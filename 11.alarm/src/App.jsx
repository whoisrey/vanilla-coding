import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header"
import Clock from "./components/Clock/Clock";
import AlarmNotice from "./components/Notice/AlarmNotice";
import AlarmSettings from "./components/Settings/AlarmSettings";

import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Clock />}>
          <Route path="alarm" element={<AlarmNotice />} />
          <Route path="settings" element={<AlarmSettings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
