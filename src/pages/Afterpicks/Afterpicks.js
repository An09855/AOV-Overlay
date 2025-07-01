import React, { useEffect, useState } from "react";

const getChampionImg = (name) =>
  require(`../../images/cache/11.21.1/champion/${name.replace(/[^A-Z0-9]/gi, "")}_square.png`).default;

const Afterpicks = ({ socket }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socket.emit("getAfterpicks");
    socket.on("afterpicksUpdated", (data) => setHistory(data));
    return () => socket.off("afterpicksUpdated");
  }, [socket]);

  return (
    <div>
      {history.map((item, idx) => (
        <div
          key={item.timestamp}
          style={{
            height: 50,
            weight: 100,
            display: "flex",
            justifyContent: "center",
            gap: 15,
          }}
        >
          <div style={{ width: "calc(50%)", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div
                style={{
                  background: "#000",
                  color: "#fff",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 24,
                  borderRadius: 8,
                }}
              >
                {`G${idx + 1}`}
              </div>
              {item.picks.blue.map(
                (p) =>
                  p.champion && (
                    <img
                      key={p.champion}
                      src={getChampionImg(p.champion)}
                      alt={p.champion}
                      width={40}
                      height={40}
                    />
                  )
              )}
            </div>
          </div>
          <div style={{ width: "calc(50%)", textAlign: "right" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                justifyContent: "flex-end",
              }}
            >
              {item.picks.red.map(
                (p) =>
                  p.champion && (
                    <img
                      key={p.champion}
                      src={getChampionImg(p.champion)}
                      alt={p.champion}
                      width={40}
                      height={40}
                    />
                  )
              )}
              <div
                style={{
                  background: "#000",
                  color: "#fff",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 24,
                  borderRadius: 8,
                }}
              >
                {`G${idx + 1}`}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Afterpicks;