import "./App.css";
import GoalList from "./components/GoalList";

function App() { 
  const data = [
    {
      id: 1,
      name: "h1",
      text: "hello1",
    },
    {
      id: 2,
      name: "h2",
      text: "hello2",
    },
    {
      id: 3,
      name: "h3",
      text: "hello3",
    },
  ];

  return (
    <div>
      <h1>Hello</h1>
      <GoalList data={data} />
    </div>
  );
}

export default App;
