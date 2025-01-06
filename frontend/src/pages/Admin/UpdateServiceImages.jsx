import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import { useSelector } from "react-redux";
import { Alert, CircularProgress, Dialog, Snackbar } from "@mui/material";
import { useState } from "react";
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export default function UpdateServiceImages() {
  const services = useSelector((store) => store.allServices);

  const allServices = services.allServices.flat();
  const [addNewServiceImageFrom, setAddNewServiceImageForm] = useState({
    image: null,
    title: "",
    size: "",
    category: "",
    isOpen: false,
  });
  const openAddNewServiceImageDialog = () => {
    setAddNewServiceImageForm((prev) => ({ ...prev, isOpen: true }));
  };
  const closeAddNewServiceImageDialog = () => {
    setAddNewServiceImageForm((prev) => ({ ...prev, isOpen: false }));
  };
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const openSnackbar = (message, severity) => {
    setSnackbarState({ open: true, severity, message });
  };
  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };
  const  [isSubmitting,setIsSubmitting] =useState(false)
  const handleNewServiceImageSubmit =async (event)=>{
    event.preventDefault()
    try {
      setIsSubmitting(true)
      const {image,title,size,category} = addNewServiceImageFrom
      const newServiceImageFormData = new FormData()
      newServiceImageFormData.append('file',image)
      newServiceImageFormData.append('title',title)
      if(size) newServiceImageFormData.append("size",size)
      
     const response = await axios.post(`${BACKEND_URL}/services/categories/${category}`,newServiceImageFormData)
     openSnackbar(response.data.message,'success')

    } catch (error) {
      console.log(error)
    }finally{
      setIsSubmitting(false)
    }
  }
const [data,setData] = useState([])
console.log(data)
const loadData = async (event)=>{
  event.preventDefault()
  const category = event.target[0].value
  console.log(category)
  try {
    const response = await axios.get(`${BACKEND_URL}/services/categories/${category}`)
    setData(response.data.data.images)
  } catch (error) {
    console.log(error)
  }
}
  return (
    <main className="p-8">

      <section>
        <div className=" w-fit m-auto flex gap-2 items-center text-4xl font-medium  mb-5">
          <p className="px-2">Add/Edit Service Images</p>
          <AddToDriveIcon />
        </div>
        <div className="m-auto w-fit">
          <button onClick={openAddNewServiceImageDialog} className=" bg-secondary text-white text-lg rounded-lg p-2">Add New Service Image </button>
        </div>
        <Dialog
          open={addNewServiceImageFrom.isOpen}
          onClose={closeAddNewServiceImageDialog}
        >
          <form
             onSubmit={handleNewServiceImageSubmit}
            className="w-fit m-auto grid gap-4 p-5"
          >
            <div>
              <select
                  value={addNewServiceImageFrom.category}
                  onChange={(e) => setAddNewServiceImageForm(prev=>({...prev,category:e.target.value}))}
                className="border w-full  min-w-[200px]  p-2 bg-primary text-white rounded-xl  text-center"
                required
                disabled={services.isLoading} 
              >
                {(services.isLoading ? Array.from({ length: 1 }) : allServices).map(
                  (item, index) => (
                    <option
                      value={
                        item
                          ? item.service.toLowerCase().split(" ").join("-")
                          : ""
                      }
                      key={index}
                    >
                      {item ? item.service : "Loading..."}
                    </option>
                  )
                )}
              </select>
            </div>
            <input
              className="w-fit rounded-xl"
              type="file"
              accept=".jpg, .jpeg, .png, .jfif, .avif, .webp"
              required
              onChange={(e)=>setAddNewServiceImageForm(prev=>({...prev,image:e.target.files[0]}))}
            />
            <input required type="text" placeholder="Enter Title" value={addNewServiceImageFrom.title} onChange={(e)=>setAddNewServiceImageForm(prev=>({...prev,title:e.target.value}))}/>
            <input type="text" placeholder="Enter Size" value={addNewServiceImageFrom.size} onChange={(e)=>setAddNewServiceImageForm(prev=>({...prev,size:e.target.value}))}/>
            <button
              type="submit"
              className="bg-secondary text-white py-2 px-4 rounded-xl text-lg font-medium disabled:opacity-60 disabled:cursor-progress"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress color="white" /> : `Upload Image`}
            </button>
          </form>
        </Dialog>
      </section>


      <section className="mt-10">
        <form onSubmit={loadData} className="flex gap-2 w-fit m-auto">
              <select
                  // value={addNewServiceImageFrom.category}
                  // onChange={(e) => setAddNewServiceImageForm(prev=>({...prev,category:e.target.value}))}
                className="border w-full  min-w-[200px]  p-2 bg-primary text-white rounded-xl  text-center"
                required
                disabled={services.isLoading} 
              >
                {(services.isLoading ? Array.from({ length: 1 }) : allServices).map(
                  (item, index) => (
                    <option
                      value={
                        item
                          ? item.service.toLowerCase().split(" ").join("-")
                          : ""
                      }
                      key={index}
                    >
                      {item ? item.service : "Loading..."}
                    </option>
                  )
                )}
              </select>
              <button type="submit" className="text-nowrap bg-secondary text-white rounded-lg text-lg p-2">Load Images</button>
        </form>
        <div className=" mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data[0] && data.map((item,index)=>(
                  <div key={index} className="border shadow-2xl ">
                    <img src={item.image} alt={item.title} className="h-3/4 w-full object-cover object-center"/>
                    <div className="p-2 flex flex-col justify-between">
                    <p>{item.title}</p>
                    {item.size && <p>{item.size}</p>}
                    <div className="flex justify-center gap-5">
                      <button className="w-2/4 text-white bg-secondary py-2 rounded-lg text-lg">Edit</button>
                      <button className="w-2/4 text-white bg-primary py-2 rounded-lg text-lg">Delete</button>
                    </div>
                    </div>
                  </div>
                ))}
        </div>
      </section>

      <Snackbar
              open={snackbarState.open}
              autoHideDuration={4000}
              onClose={closeSnackbar}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={closeSnackbar}
                severity={snackbarState.severity}
                sx={{ width: "100%" }}
              >
                {snackbarState.message}
              </Alert>
            </Snackbar>
    </main>
  );
}
