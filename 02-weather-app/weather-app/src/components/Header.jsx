import { useRef, useState, useEffect } from "react";

export default function Header({ search }) {
  const [city, setCity] = useState("");
  const pastCity = useRef("");

  //Recover input focus
  const inputRef = useRef(null);

  function handleForm(e) {
    e.preventDefault();

    if (pastCity.current.trim() == city.trim()) return;

    search(city);
    pastCity.current = city;
  }

  function handleInput(e) {
    setCity(e.target.value);
  }

  //Recover focus
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="header">
      <form onSubmit={handleForm}>
        <input
          type="text"
          ref={inputRef}
          placeholder="City Name"
          onChange={handleInput}
        />
        <button className="editLocation" onClick={handleForm}>
          Search
        </button>
      </form>
    </div>
  );
}
