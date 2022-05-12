import "./App.css";
import React, { useState } from "react";
import Axios from "axios";
import $ from 'jquery';
import autocomplete from 'jquery-ui/ui/widgets/autocomplete';

const statesData = [
  { id: '30000', value: "Perak"},
  { id: '10000', value:"Pulau Pinang"}, 
  { id: '15000', value:"Kelantan"}, 
  { id: '05000', value:"Kedah"}, 
  { id: '40000', value:"Selangor"}, 
  { id: '79000', value:"Johor"}, 
  { id: '88000', value:"Sabah"}, 
  { id: '93000', value:"Sarawak"}, 
  { id: '25000', value:"Pahang"}, 
  { id: '20000', value:"Terengganu"}, 
  { id: '01000', value:"Perlis"}, 
  { id: '70000', value:"Negeri Sembilan"}, 
  { id: '50000', value:"Kuala Lumpur"}
];


function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [postcode, setPostcode] = useState(0);
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [state_id, setState_id] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3088/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      address: address,
      postcode: postcode,
      state_id: state_id,
      dob:dob,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          address: address,
          position: position,
          postcode: postcode,
          state_id: state_id,
          dob: dob,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3088/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3088/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  address: val.address,
                  postcode: val.postcode,
                  state_id: val.state_id,
                  dob: val.dob,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3088/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const hideEmployees = () => {
    setEmployeeList([]);
  }

  $("#lan").autocomplete({
    source: function(request,response){
      response($.map(statesData, function (item){
        return{
          id: item.id, value: item.value
        }
      }))
    },

    select: function(event,ui){
      $(this).val(ui.item.value)
      $('#lan_id').val(ui.item.id);
    },

    minLength: 0,
    autoFocus: true,
  })

  return (
    <div className="App">
      <div className="information">
      <strong>LEVEL 1 PROGRAMMING TEST : iMocha</strong>
      <strong>Name: Ahmad Zaki Aiman Bin Abdul Rashid</strong>
      <strong>Date: 9 May 2022</strong>
      <br></br>
        <label>Name:</label>
        <input type="text" onChange={(event) => {setName(event.target.value);}}/>
        <label>Age:</label>
        <input type="number" onChange={(event) => {setAge(event.target.value);}}/>
        <label>Country:</label>
        <input type="text" onChange={(event) => {setCountry(event.target.value);}}/>
        <label>Position:</label>
        <input type="text" onChange={(event) => {setPosition(event.target.value);}}/>
        <label>Wage (month):</label>
        <input type="number" onChange={(event) => {setWage(event.target.value);}}/>
        <label>Date of Birth (DOB):</label>
        <input type="date" onChange={(event) => {setDob(event.target.value);}}/>
        <label>Address:</label>
        <input type="text" onChange={(event) => {setAddress(event.target.value);}}/>
        <label>State ID:</label>
        <input id="lan" type="text" onChange={(event) => {setState_id(event.target.value);}}/>
        <label>Postcode:</label>
        <input id="lan_id" name="myCountry" onChange={(event) => {setPostcode(event.target.value);}}/>
        <button onClick={addEmployee}>Submit</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Data</button>
        <button onClick={hideEmployees}>Hide Data</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee" key={val.id}>
              <div>
                <a>Name: {val.name}</a>
                <br></br>
                <a>Age: {val.age}</a>
                <br></br>
                <a>Country: {val.country}</a>
                <br></br>
                <a>Position: {val.position}</a>
                <br></br>
                <a>Wage: {val.wage}</a>
                <br></br>
                <a>Address: {val.address}</a>
                <br></br>
                <a>Postcode: {val.postcode}</a>
                <br></br>
                <a>State: {val.state_id}</a>
                <br></br>
                <a>DOB: {val.dob}</a>
              </div>
              <div>
                <input type="text" placeholder="RM 2000.00" onChange={(event) => {setNewWage(event.target.value);}}/>
                <button onClick={() => {updateEmployeeWage(val.id);}}>{" "}Update</button>
                <button onClick={() => {deleteEmployee(val.id);}}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}




export default App;