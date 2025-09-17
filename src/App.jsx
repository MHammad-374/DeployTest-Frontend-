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


  useEffect(() => {
    fetch("http://localhost:3000/api/users")
    .then((res)=>res.json())
    .then((data)=>{
     setUsers(data) 
    })
  }, [])
  

  const addUser = (newUser = { name: "default" }) => {
    let add = [...users, newUser];
    setUsers(add);
    setInpt("");
  }

  const delUser = (name = "jkl") => {
    let del = users.filter(user => user.name !== name)
    setUsers(del);
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
              <button onClick={() => delUser(user.name)}>Del</button>
            </div>
          </div>
        )
      })
    }
  </>
)
}

export default App
