import { useState } from "react";
import Animal from "./components/Animal";

interface Animal {
  id: number;
  type: string;
  name: string;
  age: number;
}

function App() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  const searchHandler = async (q: string) => {
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
    );

    const data: Animal[] = await response.json();
    setAnimals(data);
  };

  return (
    <main>
      <h1>Animal Farm</h1>

      <input
        type="text"
        placeholder="Search"
        onChange={(e) => searchHandler(e.target.value)}
      />

      <ul>
        {animals.map((animal) => (
          <Animal
            key={animal.id}
            type={animal.type}
            name={animal.name}
            age={animal.age}
          ></Animal>
        ))}

        {animals.length === 0 && "No animals found"}
      </ul>
    </main>
  );
}

export default App;
