import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toggleView } from "../../utils/slices/calendarSlice";

import { formatDate } from "../../utils/common/processDate";
import { updateNow, updatePrevDate, updateNextDate, updatePrevWeek, updateNextWeek } from "../../utils/common/processDate";

import Button from "../common/Button";

function Header() {
  const calendarViewMode = useSelector((state) => state.calendar.viewMode);
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formattedDate = formatDate(currentDate);

  const isWeekly = calendarViewMode === "weekly";

  function goToHome() {
    navigate(`/`);
  }

  function updateViewMode() {
    dispatch(toggleView());
  }

  return (
    <header className="sticky top-0 h-[6rem] px-[3rem] py-[1.5rem] bg-black">
      <nav className="flex items-center gap-[30rem]">
        <ul className="flex gap-[3rem]">
          <li>
            <Button text="Home" action={goToHome} />
          </li>
          <li>
            <Button text="Today" action={() => updateNow(dispatch)} />
          </li>
          <li>
            <Button text="<" action={isWeekly ? () => updatePrevWeek(dispatch, currentDate) : () => updatePrevDate(dispatch, currentDate)} />
          </li>
          <li>
            <Button text=">" action={isWeekly ? () => updateNextWeek(dispatch, currentDate) : () => updateNextDate(dispatch, currentDate)} />
          </li>
          <li>
            <Button text={calendarViewMode} action={updateViewMode} />
          </li>
        </ul>
        <p className="text-green-300 text-xl font-bold border-b-solid border-b-[4px] border-b-green-300">
          {formattedDate.newMonth}
        </p>
      </nav>
    </header>
  );
}

export default Header;