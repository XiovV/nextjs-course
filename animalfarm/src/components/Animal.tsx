interface AnimalProps {
  type?: string;
  name?: string;
  age?: number;
}

function Animal({ type, name, age }: AnimalProps) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

export default Animal;
