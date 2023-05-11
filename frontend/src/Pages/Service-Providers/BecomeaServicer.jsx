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
import { Button, Grid, MenuItem, Select, Typography } from '@mui/material'

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
          <div className='w-2/3 p-10'>
            <img className='ml-20' src={image} alt='' style={{ maxWidth: '100%', height: 'auto' }} />
          </div>          

          <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ p: 3 }}>
            <Grid item xs={12} md={8} lg={6}>
              <Typography variant='h4' component='h1' gutterBottom>
                Earn money your way
              </Typography>
              <Typography variant='body1' gutterBottom>
                See how much you can make tasking on Homey
              </Typography>
              <form onSubmit={becomeProvider}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h5'>
                      Select your area
                    </Typography>
                    <Select value={workLocation} onChange={(e) => setWorkLocation(e.target.value)} fullWidth>
                      <MenuItem value=''>Select...</MenuItem>
                      {locations.map((place) => <MenuItem key={place._id} value={place.location}>{place.location}</MenuItem>)}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h5'>
                      Choose a category
                    </Typography>
                    <Select value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} fullWidth>
                      <MenuItem value=''>Select...</MenuItem>
                      {services.map((service, index) => <MenuItem key={index} value={service.serviceName}>{service.serviceName}</MenuItem>)}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type='submit' variant='contained' color='primary' fullWidth sx={{
                      bgcolor: "#004C00",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#519451",
                      },
                    }} >
                      Get started
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body2' align='center'>
                      Already have an account? <Link to='/signin' color='primary'>Sign in</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
              {smessage && <Alert variant="filled" severity="success">{smessage}</Alert>}
            </Grid>
          </Grid>

        </div>

      ) : (

        <ApplyVerify serviceCategory={serviceCategory} workLocation={workLocation} />
      )}

      <Footer />
    </div>
  )
}

export default BecomeaServicer
