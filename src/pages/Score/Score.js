import React, { useEffect, useState } from "react";

const Score = () => {
  const [barInfo, setBarInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/barinfo")
      .then(res => res.json())
      .then(data => setBarInfo(data));
  }, []);

  if (!barInfo) return <div></div>;

  return (
    <div
      style={{
        height: "80px",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Blue Score */}
      <div style={{ flex: "0 0 110px", textAlign: "center", color: "#00CFFF", fontWeight: "bold", fontSize: 48 }}>
        {barInfo.blueTeamScore}
      </div>
      {/* Blue Initials & Name */}
      <div style={{ flex: "0 0 380px", textAlign: "center" }}>
        <div style={{ color: "#fff", fontWeight: "bold", fontSize: 40, lineHeight: "1", marginTop: 30 }}>
          {barInfo.blueTeamInitials}
        </div>
        <div style={{ color: "#bdeaff", fontSize: 16, marginTop: 20}}>
          {barInfo.blueTeamName}
        </div>
      </div>
      
      {/* Match & Game Info */}
      <div style={{ flex: "0 0 230px", textAlign: "center" }}>
        <div style={{ color: "#1a237e", fontWeight: "bold", fontSize: 25, }}>
            {barInfo.phaseRound}
        </div>
        <div style={{ color: "#1a237e", fontWeight: "bold", fontSize: 16, }}>
            {barInfo.phaseGame}
        </div>
      </div>
      {/* Red Initials & Name */}
      <div style={{ flex: "0 0 380px", textAlign: "center" }}>
        <div style={{ color: "#fff", fontWeight: "bold", fontSize: 40, lineHeight: "1", marginTop: 30 }}>
          {barInfo.redTeamInitials}
        </div>
        <div style={{ color: "#ffd6e0", fontSize: 16, marginTop: 20 }}>
          {barInfo.redTeamName}
        </div>
      </div>
      {/* Red Score */}
      <div style={{ flex: "0 0 110px", textAlign: "center", color: "#FF3366", fontWeight: "bold", fontSize: 48 }}>
        {barInfo.redTeamScore}
      </div>
    </div>
  );
};

export default Score;