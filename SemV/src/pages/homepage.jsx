import React from "react";

function HomePage() {
  return (
    <div>
      <div style={container}>
        <div style={leftSide}>
          <img
            src="https://img.freepik.com/free-vector/cloud-computing-security-abstract-concept-illustration_335657-2105.jpg?w=740&t=st=1698245575~exp=1698246175~hmac=73b016d3ca819c4cc006782d3ce873ad9eb9c26c4b001781614d7a3cf3c76597 "
            alt="Homepage Image"
            style={imgstyle}
          />
        </div>

        <div style={rightSide}>
          <h1 style={bigText}>Enhance Your Digital Security</h1>
          <p style={smallText}>
            Safeguard your digital life with our suite of security features.
            From our robust Malware Scanner to a convenient Password Manager and
            a reliable Password Generator, we've got you covered in the digital
            realm
          </p>
        </div>
      </div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

const leftSide = {
  flex: 1,
  textAlign: "center",
};

const imgstyle = {
  width: "500px",
  height: "500px",
};

const rightSide = {
  flex: 1,
  textAlign: "center",
};

const bigText = {
  fontSize: "40px",
  fontWeight: "bold",
  color: "purple",
};

const smallText = {
  fontSize: "18px",
};

export default HomePage;
