import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);
  function getStudents() {
    axios.get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      });
  }
  useEffect(() => {
    getStudents();
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    const student = {
      name: name,
      course: course,
      age: Number(age)
    };
    if (editingId === null) {
      axios.post("http://localhost:5000/students", student)
        .then(() => {
          getStudents();
          clearForm();
        });
    } else {
      axios.put(
        "http://localhost:5000/students/" + editingId,
        student
      ).then(() => {
        getStudents();
        clearForm();
      });
    }
  }
  function editStudent(student) {
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
    setEditingId(student._id);
  }
  function deleteStudent(id) {
    axios.delete("http://localhost:5000/students/" + id)
      .then(() => {
        getStudents();
      });
  }
  function clearForm() {
    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
  }
  return (
    <div>
      <h1>Student Management System</h1>
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit}>
        <p>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </p>
        <p>
          Course:
          <input
            type="text"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            required
          />
        </p>
        <p>
          Age:
          <input
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            required
          />
        </p>
        <button type="submit">
          {editingId === null ? "Add Student" : "Update Student"}
        </button>
        {editingId !== null && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>
      <h2>Students</h2>
      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <button onClick={() => editStudent(student)}>
            Edit
          </button>
          <button onClick={() => deleteStudent(student._id)}>
            Delete
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}
export default App;