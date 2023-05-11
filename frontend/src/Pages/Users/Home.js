import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Footer/Footer";
import Cards from "../../Components/Cards/Cards";

import { useDispatch, useSelector } from "react-redux";
import { sList } from "../../actions/adminActions";
import { Container, Grid } from "@mui/material";

function Home() {
  const serviceList = useSelector((state) => state.servicesList);
  const { services } = serviceList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sList());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Banner />
      <div className="text-center">
        <h1 className=" mt-10 font-extrabold text-2xl">Popular projects</h1>
      </div>

      {/* <div
        id="Main-Services"
        className="justify-center mb-5 gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  lg:max-w-7xl mx-auto"
      >
        {services.slice(0, 8).map((service) => (
          <Cards
            ServiceName={service.serviceName}
            image={service.image}
            id={service._id}
          />
        ))}
      </div> */}

      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          {services.slice(0, 8).map((service) => (
            <Grid item xs={12} sm={8} md={4} lg={3} key={service._id}>
              <Cards
                ServiceName={service.serviceName}
                image={service.image}
                id={service._id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <div className="mx-auto flex flex-col sm:flex-row items-center mt-10 px-3">
        <div className="w-full sm:w-1/2">
          <section className="relative bg-[url(https://images.unsplash.com/photo-1569496736555-47c448d556f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80)] bg-cover bg-center bg-no-repeat">
            <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
              <div className="max-w-xl text-center sm:text-left">
                <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed text-white font-extrabold">
                  When life gets busy, you don’t have to tackle it alone. Get
                  time back for what you love without breaking the bank.
                  <br />
                  <br /> Choose your Tasker by reviews, skills, and price <br />
                  Schedule when it works for you — as early as today
                  <br /> Chat, pay, tip, and review all through one platform
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="max-w-xl text-center sm:text-right w-full sm:w-1/2">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-lime-700">
            Everyday life made easier
          </h1>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
