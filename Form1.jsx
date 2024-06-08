import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import './Form.css'

const Form1 = () => {
    const [Data, setData] = useState({})
    const [AllData, setAllData] = useState([])
    const [getData, setgetData] = useState([])
    const [Error, setError] = useState({})
useEffect(()=>{
let data = JSON.parse(localStorage.getItem('data'))|| []
setgetData(data)
},[AllData])
const EmailValidation =   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/  
const PassValidation =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const clickHandle=(e)=>{
        e.preventDefault()
   if (verify()) {
    let localData = [...getData]
    localData = getData.concat(Data)
    setAllData(localData)
    localStorage.setItem('data',JSON.stringify(localData))
    setData({Fullname:'',Mobile:'',Email:'', Password:'',Cpassword:''})
   }
    }
    const ChangeHandle=(e)=>{
        setData({...Data,[e.target.name]:e.target.value})
    }
    const deleteHandle=(e,i)=>{
      getData.splice(i,1)
      setAllData(getData)
      localStorage.setItem('data',JSON.stringify(getData))
    }
    const verify=()=>{
      let localError = {};
      let valid = true;
     
      if (!Data.Fullname) {
        localError.Fullname = "Name is required";
        valid = false;
    } else if (Data.Fullname.length < 3) {
        localError.Fullname = "Name is too short";
        valid = false;
    }

    if (!Data.Mobile) {
        localError.Mobile = "Mobile is required";
        valid = false;
    } else if (Data.Mobile.length !== 10) {
        localError.Mobile = "Enter a valid 10-digit mobile number";
        valid = false;
    }

    if (!Data.Email) {
        localError.Email = "Email is required";
        valid = false;
    } else if (!EmailValidation.test(Data.Email)) {
        localError.Email = "Enter a valid email";
        valid = false;
    }

    if (!Data.Password) {
        localError.Password = "Password is required";
        valid = false;
    } else if (!PassValidation.test(Data.Password)) {
        localError.Password = "Enter a strong password ";
        valid = false;
    }

    if (Data.Password !== Data.Cpassword) {
        localError.Cpassword = "Passwords do not match";
        valid = false;
    }if (!Data.Cpassword) {
      localError.Cpassword = "Confirm Password is required"
      valid = false;
    }
      setError(localError)
      return valid
    }
  return (
    <main> 
    <div className="container">
      <div className="row">
        <div className="col ">
          <div className=" offset-md-3 col-md-6">
    <form className=' mt-3 bg-secondary border border-warning border-2 px-5 py-3'>
  <div class="mb-3">
    <label for="exampleInputName1" class="form-label text-light">FullName</label>
    <input type="text" class="form-control required" id="exampleInputName1" onChange={ChangeHandle}  name='Fullname' value={Data.Fullname}  />
     <p className='text-warning '>{Error.Fullname}</p>
  </div>
  <div class="mb-3">
    <label for="exampleInputMobile1" class="form-label text-light">Mobile Number</label>
    <input type="number" class="form-control" id="exampleInputMobile1" name='Mobile' onChange={ChangeHandle} value={Data.Mobile} />
     <p className='text-warning'>{Error.Mobile}</p>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label text-light">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='Email' onChange={ChangeHandle} value={Data.Email}required/>
     <p className='text-warning'>{Error.Email}</p>

  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label text-light">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" onChange={ChangeHandle} name='Password' value={Data.Password}required/>
     <p className='text-warning'>{Error.Password}</p>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label text-light">Confirm Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" onChange={ChangeHandle} name='Cpassword' value={Data.Cpassword}/>
     <p className='text-warning'>{Error.Cpassword}</p>
  </div>
  <center><button type="submit" class="btn btn-primary w-50  form-control px-5" onClick={clickHandle}>Submit</button></center>
</form>
</div>
</div>
      </div>
    </div>
   <div className='container'>
    <h1 className='text-center  my-2 ' ><u>Your Saved Information</u></h1>
    </div>
   <div className='container table '>
    <div className="row">
      <div className="col">
        <div className="col-lg-10 offset-lg-1">
   <table class="table table-dark text-center  border border-warning border-3">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">FullName</th>
      <th scope="col">Mobile Number</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Confirm Password</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  {
  getData.map((e,i)=>{
    return(

  <tbody>
    <tr>
      <td >{i+1}</td>
      <td >{e.Fullname}</td>
      <td>{e.Mobile}</td>
      <td  >{e.Email}</td>
      <td  >{e.Password}</td>
      <td  >{e.Cpassword}</td>
   <td>  <button className=' border-0 fs-5 rounded-2 bg-danger' onClick={()=>{deleteHandle(e,i)}}><RiDeleteBin6Line /> </button></td>
    </tr>
   
  </tbody>
    )
  })
  }
</table>
</div>
</div>
    </div>
   </div>
   </main>

  )
}

export default Form1