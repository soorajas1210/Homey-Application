import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { Container } from "@mui/system";
import List from "../../Components/ServiceList/List";
import serviceBanner from "../../Components/ServiceList/serviceBanner.jpg";

function ServicesList() {
  return (
    <div>
      <Navbar />
      {/* <div style={myStyle}>
        Your to-do list is on us.
      </div> */}
      <div
        className="bg-cover w-full"
        style={{
          backgroundImage: `url(${serviceBanner})`,
          height: "26.2rem",
        }}
      ></div>

      <Container
        style={{ display: "grid", gridTemplateColumns: "1fr1fr1fr1fr" }}
        className="mt-8 "
      >
        <h1 className=" font-bold text-2xl text-center">
          Hire a Trusted Service Provider{" "}
        </h1>
        <List />
      </Container>

      <Footer />
    </div>
  );
}

export default ServicesList;
