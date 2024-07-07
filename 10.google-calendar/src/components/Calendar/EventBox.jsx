import PropTypes from "prop-types";

function EventBox({ event = {} }) {
  return (
    <td className="flex flex-col justify-center gap-[0.5rem] w-[10rem] h-[10rem] border-b-solid border-b-2 border-slate-700 transition-all duration-1000 hover:shadow-lg hover:shadow-green-500">
      <p className="font-bold">{event.title}</p>
      <p className="">{event.date}</p>
      <p className="text-slate-400 font-light text-xs">{event.description}</p>
    </td>
  );
}

export default EventBox;

EventBox.propTypes = {
  event: PropTypes.object.isRequired,
};
