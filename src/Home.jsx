import "./App.css";
import { Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import SideBar from "./Components/SideBar";

function Home() {
  const [showStudent, setShowStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getStudents() {
      let req = await fetch("http://localhost:9000/students");
      let res = await req.json();
      setShowStudent(res.students);
    }
    getStudents();
  }, []);
  // console.log({showStudent})

  function addNewStudent() {
    console.log("add new student");
  }
  return (
    <div>
      <SideBar />
      <Navbar />
      <h1>All Students</h1>
      <Link to="/new">
        <button onClick={addNewStudent}>Add New Student</button>
      </Link>
      <br />
      <br />
      <input
        className="student_search_bar"
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
      />{" "}
      <br /> <br />
      <input className="student_search_bar" type="text" placeholder="Search by tag" />
      <div className="student_table">
      {showStudent?.map((student) => {
        const fullName = `${student.first_name} ${student.last_name}`;
        if (
          searchQuery &&
          !fullName.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return null;
        }
        return (
          <Link className="student_table_row" key={student.id} to={`/students/${student.id}`}>
              <img
                className="student_profile_pic"
                src={student.pic}
                height={50}
                width={50}
                alt="{student.firstName} {student.lastName}"
              /> 
            <p className="student_info">{fullName}</p>
            <p className="student_payment">$1200</p>
            <p className="student_payment_status">status</p>
            <p className="student_table_row">12 Sep 2023</p>{" "} 
      
           </Link>
        );
      })}
      </div>    
    </div>
  );
}

export default Home;
