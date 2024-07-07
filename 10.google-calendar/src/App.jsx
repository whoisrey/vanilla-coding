import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Calendar from "./components/Calendar/Calendar";

import EventForm from "../src/components/Event/EventForm";
import EventDetails from "../src/components/Event/EventDetails"

function App() {
  return (
    <main className="bg-black text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/events/new" element={<EventForm />} />
        <Route path="/events/:event_id" element={<EventDetails />} />
      </Routes>
    </main>
  );
}

export default App;
