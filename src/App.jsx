import { useEffect, useState } from 'react'
import './App.css'
import Input from './components/Input'
function App() {
  const [users, setUsers] = useState([
    // {
    //   name: "jkl"
    // }
  ]);
  const [inpt, setInpt] = useState("")

  // const fetchData = () => {
  //   fetch(import.meta.env.VITE_API_URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data)
  //     })
  // }

  useEffect(() => {
    // fetchData();
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
  }, [])


  const addUser = async (newUser) => {
    // let add = [...users, newUser];
    // setUsers(add);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ ${data.message}`);
        setInpt("");
        // fetchData();
        fetch(import.meta.env.VITE_API_URL)
          .then((res) => res.json())
          .then((data) => {
            setUsers(data)
          })
      } else {
        alert(`❌ ${data.message || "Error creating user"}`);
      }

    } catch (error) {
      alert("⚠️ Server error: " + error.message);
    }

  }

  const delUser = async (id) => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/" + id, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {

        // Update UI after delete
        setUsers(users.filter((user) => user._id !== id));

        alert(data.message);
      } else {
        alert(data.message || "Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }

  }

  const editUser = (name) => {
    setInpt(name)
    delUser(name)
  }

  return (
    <>
      <Input addUser={addUser} inpt={inpt} setInpt={setInpt} />
      {/* <button onClick={() => delUser()}>ert</button> */}
      <h2>Users</h2>
      {
        users.map((user, index) => {
          return (
            <div key={index} className='flex'>
              <p>{user.name}</p>
              <div>
                <button onClick={() => editUser(user.name)}>Edit</button>
                <button onClick={() => delUser(user._id)}>Del</button>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default App
