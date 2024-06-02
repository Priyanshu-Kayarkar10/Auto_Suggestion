import Autocomplete from "./components/Autocomplete";

function App() {
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  };
  const staticData = [
    "apple",
    "banana",
    "berrl",
    "orange",
    "mango",
    "melon",
    "berry",
    "peach",
    "cherry",
    "plum",
  ];
  return (
    <div className="main">
      <h1>Autocomplete / TypeHead</h1>

      <Autocomplete
        placeholder={"Enter Recipe"}
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading Recipe..</>}
        onSelect={(res) => console.log(res)}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}
      />
    </div>
  );
}

export default App;
