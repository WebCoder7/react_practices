import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { ImTree } from "react-icons/im";
import Content from "./components/Content";

function App() {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {

    // const api_url = import.meta.env.VITE_BASE_URL;

    const api_url = "http://localhost:3000";
    async function fetchItems() {
      try {
        const response = await fetch(`${api_url}/items`);
        if (!response.ok) {
          const errorText = response.text()
          throw new Error(`Network error was not ok: ${errorText}`);
        }

        const newItems = await response.json();
        setItems(newItems)
      } catch (error) {
        console.error("Error fetching items", error);
        setFetchError(error.message)
      }
      finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  async function addItem() {
    const id = Date.now();

    const item = {
      id,
      item: newItem
      checked: false
    };

    try {
      const response = await fetch(`${api_url}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(item)
      })

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`)
      }

      const result = await response.json();
    } catch (error) {
      console.error("Error creating new item", error.message)
    }
  }


  function handleSubmit(e){
    e.preventDefault();
    addItem();
  }


  return (
    <div className='App'>
      <Header title='Grocery List' />
      <AddItem newItem={newItem} 
      setNewItem={setNewItem} 
      handleSubmit={handleSubmit} />
      <SearchItem search={search} onSearch={setSearch} />
      <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
        {!isLoading && !fetchError && <Content items={items.filter((item) => item.item.toLowerCase().includes(search.toLowerCase()))} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
