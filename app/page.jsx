"use client";
import { useState, useEffect } from "react";
import {
  getData,
  addTodo,
  toggleTodo,
  deleteTodo,
} from "@/actions/todoActions";
const page = () => {
  // function to get data from the database
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState();

  // init data fetching
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      getData().then((res) => {
        setData(res);
      });
      setId(Math.floor(Math.random() * 1000));
    }
    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  const updateData = () => {
    getData().then((res) => {
      setData(res);
    });
  };
  const addItem = () => {
    if (!name) return;
    addTodo(id, name).then(() => {
      updateData();
    });
    // clear the input
    setName("");
    setId(Math.floor(Math.random() * 1000));
  };

  const toggleItem = (id) => {
    toggleTodo(id).then(() => {
      updateData();
    });
  };

  const deleteItem = (id) => {
    deleteTodo(id).then(() => {
      updateData();
    });
  };

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      <div className="w-1/2 h-3/4 bg-white/10 px-6 py-8 rounded-md text-white flex flex-col gap-4">
        <h1 className="text-3xl text-white font-semibold">Todo List</h1>

        <ul className="w-full flex flex-col gap-2">
          {data.map((item) => {
            return (
              <li
                key={item.id}
                className="flex justify-between gap-2 items-center bg-white/5 px-2 py-2 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.done}
                    className="h-4 w-4 rounded-md border-white/50"
                    onChange={() => {
                      toggleItem(item.id);
                    }}
                  />
                  {item.text}
                </div>
                <button
                  className="bg-red-400/20 h-full text-sm rounded-md px-2 hover:bg-red-400/40 transition-all"
                  onClick={() => {
                    deleteItem(item.id);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter todo"
            className="w-full h-10 px-2 rounded-md text-white bg-white/10"
          />
          <button className="bg-blue-600 rounded-lg px-4" onClick={addItem}>
            Add
          </button>
        </div>
      </div>

      <span>{id}</span>
    </div>
  );
};

export default page;
