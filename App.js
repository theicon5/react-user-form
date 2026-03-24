import React, { useState } from "react";
//create a obeject and a submit button it should be editable use post method
function App() {
  const [users, setUsers] = useState([
    { name: "Anmol", qualification: "btech", city: "UP" },
    { name: "Aryamaan", qualification: "btech", city: "UP" },
  ]);

  const [form, setForm] = useState({
    name: "",
    qualification: "",
    city: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  // Fake POST API
  const postUser = (newUser) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let updatedUsers = [...users];

        if (editIndex !== null) {
          updatedUsers[editIndex] = newUser;
        } else {
          updatedUsers.push(newUser);
        }

        resolve(updatedUsers);
      }, 500); // simulate network delay
    });
  };

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Edit
  const handleEdit = (index) => {
    setForm(users[index]);
    setEditIndex(index);
  };

  // Submit (POST call)
  const handleSubmit = async (e) => {
    e.preventDefault();
   // POST request 
    const updatedUsers = await postUser(form); 
    setUsers(updatedUsers);

    setForm({ name: "", qualification: "", city: "" });
    setEditIndex(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="qualification"
          placeholder="Qualification"
          value={form.qualification}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <button type="submit">
          {editIndex !== null ? "Update" : "Submit"}
        </button>
      </form>

      <h2>User List</h2>

      {users.map((user, index) => (
        <div key={index}>
          {user.name} | {user.qualification} | {user.city}
          <button onClick={() => handleEdit(index)}>Edit</button>
        </div>
      ))}
    </div>
  );
}

export default App;
