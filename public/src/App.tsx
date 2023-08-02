import { useState } from "react";
import list from "./assets/list.txt?raw";
import "./App.css";

interface Item {
  name: string;
  category: string;
  discount: string;
  discount2?: string;
}
const categoryList: string[] = [];
const itemList = () => {
  let itemList: string[] | Item[] = list.split("\n");
  let category: string;
  itemList = itemList.map((item: string) => {
    const newItem: string[] = item.split("- ");
    if (!newItem[1]) {
      category = newItem[0];
      if (category && categoryList.indexOf(category) === -1) {
        categoryList.push(category);
      }
    }
    return {
      name: newItem[0],
      discount: newItem[1],
      discount2: newItem[2],
      category,
    };
  });
  itemList = itemList.filter((item: Item) => {
    if (item.discount) return item;
  });
  return itemList;
};

function App() {
  const [filteredList, setFilteredList] = useState<
    { name: string; category?: string; discount?: string; discount2?: string }[]
  >(itemList());
  const [value, setValue] = useState<string>("");
  const [selected, setSelected] = useState<string>("");

  const getSelectedList = (value: string) => {
    setValue("");
    if (!value.length) return list;
    const updatedList: Item[] = itemList().filter((item: Item) => {
      if (!value.length || value === "All") return item;
      if (item.category.indexOf(value) !== -1) {
        return item;
      }
    });
    setSelected(value);
    setFilteredList(updatedList);
  };
  const filterBySearch = (e: React.FormEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    setValue(query);
    setSelected("");
    const updatedList: Item[] = itemList().filter((item: Item) => {
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        return item;
      }
    });
    setFilteredList(updatedList);
  };

  const table = (
    <ul>
      {filteredList.map((item) => {
        return (
          <li>
            {item.name} - {item.discount} {item.discount2 ? "-" : ""}{" "}
            {item.discount2}
          </li>
        );
      })}
    </ul>
  );
  return (
    <>
      <div className="container">
        <h1>Suwanee Area Moms Club Member Discount List</h1>
        <form>
          <p className="subheading">
            An easy way to find the discount you are looking for! Just search
            below!
          </p>
          <div className="search-text">Search Me!</div>
          <input
            id="search-box"
            type="search"
            onChange={filterBySearch}
            value={value}
          />
          <div className="search-text">
            Or select a category from the dropdown
          </div>
          <select
            value={selected}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              getSelectedList(e.target.value)
            }
          >
            <option selected={selected === ""} value="">
              Select Category
            </option>
            <option selected={selected === "All"}>All</option>
            {categoryList.map((category: string, index: number) => {
              return (
                <option key={index} selected={selected === category}>
                  {category}
                </option>
              );
            })}
          </select>
        </form>
        <div className="circle" id="circleID"></div>
        <div className="list">{table || "Loading..."}</div>
      </div>
    </>
  );
}

export default App;
