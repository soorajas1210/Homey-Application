import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { locationList, sList } from '../../actions/adminActions'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import ApplyVerify from '../../Components/ServiceProvider/Verification/ApplyVerify'
import image from '../assets/tasker.png'
// import toast, { Toaster } from "react-hot-toast";
import Alert from "@material-ui/lab/alert";
import { afterProviderRegSuccess } from '../../Redux/Service-Providers/providerRegistrationSlice'

function BecomeaServicer() {

  const [details, setDetails] = useState(false)
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const servicesList = useSelector((state) => state.servicesList);
  const { services } = servicesList;


  const providerRegistration = useSelector((state) => state.providerRegistration);
  const { error, smessage } = providerRegistration;

  useEffect(() => {
    dispatch(locationList());
  }, [dispatch]);

  const loc = useSelector((state) => state.locationsList);
  const { locations } = loc;


  console.log(error)


  const [workLocation, setWorkLocation] = useState("")
  const [serviceCategory, setServiceCategory] = useState("")

  const becomeProvider = () => {


    if (userInfo) {
      setDetails(true)
    } else {
      navigate("/signin")
    }
  }

  useEffect(() => {
    dispatch(sList())
  }, [dispatch])


  useEffect(() => {
    if (smessage) {
      setDetails(false)
      setTimeout(() => {
        dispatch(afterProviderRegSuccess())
      }, 3000)
    }
  }, [dispatch, smessage])


  return (
    <div>
      <Navbar />

      {!details ? (
      <div className='lg:flex px-10  '>
        <div className='w-2/3 p-10 md:hiden sm:hidden   '>
          <img className='ml-20 ' src={image} alt='' style={{ height: "80%" }} />
        </div>

        <div className='lg:w-1/3 mt-10 md:w-full md:justify-center' >

          <h1 className='font-bold space-x-3 text-4xl '>Earn money your way </h1>

          <p className='mt-5 w-2/3 text-gray-600 text-lg'> See how much you can make
            tasking on Homey
          </p>
          <form className='w-full bg-transparent ' onSubmit={becomeProvider} >
            <div className='text-2xl space-x-3 mt-6 font-bold'>
              <h1>Select your area</h1>

              <select id="countries" value={workLocation}
                onChange={(e) => setWorkLocation(e.target.value)} class="bg-gray-50 border cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 mt-4 p-5 ">
                <option selected className='text-gray-500'>Select...</option>
                {locations.map((place) => <option key={place._id} value={place.location}>{place.location}</option>)}


              </select>


              <h1 className='mt-5'>Choose a category</h1>
              <select id="countries" value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)} class="bg-gray-50 border cursor-pointer  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 mt-4 p-5 ">
                <option selected className='text-gray-500'>Select...</option>
                {services.map((services, index) => <option key={index} value={services.serviceName}> {services.serviceName} </option>)}

              </select>
              <button type='submit' class="bg-green-800 hover:bg-green-900 text-white font-semibold py-1 px-4 mt-6 w-4/6 border border-green-700 rounded">
                Get started
              </button>
              <h1 className='mt-3 text-base text-slate-700 mb-10 '> Already have an account?  <Link to='/signin'><span className=' text-green-800'> Sign in  </span> </Link></h1>
              {smessage && <Alert variant="filled" severity="success">{smessage}</Alert>}
            </div>
          </form>
        </div>
      </div>
      
      ) : (

        <ApplyVerify serviceCategory={serviceCategory} workLocation={workLocation} />
      )}

      <Footer />
    </div>
  )
}

export default BecomeaServicer
