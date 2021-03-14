import React ,{useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import Axios from "axios";
import "./App.css";
export default function App() {
const[id,setId] =useState('');
const[firstName, setFirstName] =useState('');
const[lastName, setLastName] =useState('');
const[mobileNo, setMobileNo] =useState('');
const[phoneNo, setPhoneNo] =useState('');
const[address, setAddress] =useState('');
const[singleFile, setSingleFile] =useState('');
const[userlist, setUserList] =useState([]);
const[buttontxt, setButtonTxt]=useState('Save');
const SingleFileChange = (e) => {
       setSingleFile(e.target.files[0]);

   }
  const { register, handleSubmit } = useForm();

  const onSubmit=async ()=>
   {
     let Url="";
   if(buttontxt==="Save"){
      Url="http://localhost:4000/api/user";
       }
      else{
      Url="http://localhost:4000/api/user/Updatedata";
      }
          const formData = new FormData();
          formData.append('firstName',  firstName);
          formData.append('lastName',  lastName);
          formData.append('mobileNo', mobileNo);
          formData.append('phoneNo', phoneNo);
          formData.append('address', address);
          formData.append('file', singleFile);

 Axios.post(Url,formData).then(res=>{
     if(res.data){
       alert('Submit Successfully');
      }
      else{
        alert('Not submitted')
      }
    });
     };
     useEffect(() =>{
          Axios.get("http://localhost:4000/api/user").then((response)=>{
         setUserList(response.data);
          });
        },[]);

        const deleteUser =(id)=>{
  Axios.delete(`http://localhost:4000/api/user/${id}`).then((response)=>{

    alert(response.data);

  });

};

 const editData=(value)=>{

  setFirstName(value.firstName);
  setLastName(value.lastName);
  setMobileNo(value.mobileNo);
  setPhoneNo(value.phoneNo);
  setAddress(value.address);
    setButtonTxt('Update');

};

  return (<>
<div className="row">
<div className="col-lg-4">
     <form onSubmit={handleSubmit(onSubmit)} className="form">
<div className="form-group">
 <label>First Name:</label>
 <input type="text" className="form-control" placeholder="First name" name="firstName" value={firstName} ref={register({required: true, maxLength: 80})}
   onChange={(e)=>{setFirstName(e.target.value)}} />
   <input type="hidden" value={id}    name="id"  />
</div>
<div className="form-group">
 <label>Last Name:</label>
 <input type="text" className="form-control" placeholder="Last name" name="lastName" value={lastName} ref={register({required: true, maxLength: 100})}
    onChange={(e)=>{setLastName(e.target.value)}} />
</div>
<div className="form-group">
 <label>MobileNo:</label>
 <input type="tel" className="form-control" placeholder="Mobile number" name="mobileNo" value={mobileNo} ref={register({required: true, minLength: 10, maxLength: 12})}
 onChange={(e)=>{setMobileNo(e.target.value)}}/>
</div>
<div className="form-group">
 <label>PhoneNo</label>
 <input type="tel" className="form-control" placeholder="phone number" name="phoneNo" value={phoneNo} ref={register({required: true, minLength: 10, maxLength: 12})}
 onChange={(e)=>{setPhoneNo(e.target.value)}} />
</div>
<div className="form-group">
 <label>Address</label>
 <input type="text" className="form-control" placeholder="address" name="address" value={address} ref={register({required: true, maxLength: 100})}
onChange={(e)=>{setAddress(e.target.value)}}/>
</div>
    <div className="form-group">
                       <label>Select Image</label>
                       <input type="file" className="form-control" name="singleFile"   ref={register()} onChange={(e) => SingleFileChange(e)} />
                   </div>

      <button type="submit" value={buttontxt}>Submit</button>
     </form></div>
     <div className="col-lg-8">

    <div className="card">
              <div className="card-header">
                <h3 className="card-title">User Details</h3>
              </div>
              <div className="card-body">
                <table id="example1" className="table table-bordered table-striped">
                  <thead>
                  <tr>
                  <th>Image</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th> MobileNo</th>
                    <th>PhoneNo</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  {userlist.map((value, index) =>
 <tbody key={index}>
                  <tr>
                   <td>
<img src={`http://localhost:4000/${value.filePath}`} height="50" width="50" alt="img"/>
</td>
                    <td>{value.firstName}</td>
                    <td>{value.lastName}</td>
                    <td>{value.mobileNo}</td>
                    <td>{value.phoneNo}</td>
                    <td>{value.address}</td>
                    <td>
                   <button type="button" className="btn btn-success mr-2" onClick={(e) => {editData(value._id)}}>Edit</button>
                   <button className="btn btn-danger" onClick={(e) => { e.preventDefault(); deleteUser(value._id)}}>Delete</button>
                    </td>

                  </tr>
                 </tbody>

               )}

                  <tfoot>
                  </tfoot>
                </table>
              </div>
            </div>
</div>
     </div></>
  );
}
