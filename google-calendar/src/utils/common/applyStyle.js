export function applyInputStyle(name) {
  switch (name) {
    case "text":
      return "w-[17rem] bg-green-500 border-b-black border-b-solid border-b-[2px] border-r-black border-r-solid border-r-[1px] focus:outline-none";

    case "insert":
      return "w-[17rem] bg-green-500 border-b-black border-b-solid border-b-[2px] border-r-black border-r-solid border-r-[1px] focus:outline-none";

    case "time":
      return "bg-green-500 border-b-black border-b-solid border-b-[2px] border-r-black border-r-solid border-r-[1px] focus:outline-none w-[3rem]";

    case "date":
      return "w-[8rem] bg-green-500 border-b-black border-b-solid border-b-[2px] border-r-black border-r-solid border-r-[1px] focus:outline-none w-[3rem]";
  }
}

export function applyButtonStyle(name) {
  switch (name) {
    case "header":
      return "p-[10px] rounded-full bg-black border-gray-300 text-green-500 text-xl font-bold transition-all duration-1000 hover:bg-green-500 hover:text-black uppercase";

    case "edit":
      return "p-[10px] bg-black border-gray-300 text-green-500 text-sm font-bold transition-all duration-1000 hover:bg-green-500 hover:text-black uppercase";

    case "form":
      return "p-[10px] bg-black border-gray-300 text-green-500 text-sm font-bold transition-all duration-1000 hover:bg-green-500 hover:text-black";

    default:
      return "p-[10px] rounded-full bg-black border-gray-300 text-green-500 text-xl font-bold transition-all duration-1000 hover:bg-green-500 hover:text-black uppercase";
  }
}
