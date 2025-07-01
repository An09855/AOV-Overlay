const io = require("socket.io")();
const fs = require("fs");
const DATA_FILE = "data.json";
const HISTORY_FILE = "afterpicks.json";

// Hàm đọc dữ liệu từ file
function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return {};
  }
}

// Hàm ghi dữ liệu ra file
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function loadHistory() {
  try {
    return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf8"));
  } catch {
    return [];
  }
}
function saveHistory(data) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
}

let serverData = loadData();

io.on("connection", (socket) => {
  // Gửi dữ liệu đã lưu cho client mới
  socket.emit("serverData", serverData);

  socket.on("sendBarInfo", (barInfo) => {
    serverData.barInfo = barInfo;
    saveData(serverData);
    io.sockets.emit("receiveBarInfo", barInfo);
  });

  socket.on("sendCurrentSlot", (currentSlot) => {
    serverData.currentSlot = currentSlot;
    saveData(serverData);
    io.sockets.emit("receiveCurrentSlot", currentSlot);
  });

  socket.on("sendSelectedChampion", (selectedChampion, currentSlot) => {
    serverData.selectedChampion = selectedChampion;
    serverData.currentSlot = currentSlot;
    saveData(serverData);
    io.sockets.emit("receiveSelectedChampion", selectedChampion, currentSlot);
  });

  socket.on("sendPlayerIGNs", (playerIGNs) => {
    serverData.playerIGNs = playerIGNs;
    saveData(serverData);
    io.sockets.emit("receivePlayerIGNs", playerIGNs);
  });

  socket.on("sendStartTimer", () => {
    io.sockets.emit("receiveStartTimer");
  });

  socket.on("sendUpdatedPicks", (newPicks) => {
    serverData.picks = newPicks;
    saveData(serverData);
    io.sockets.emit("receiveUpdatedPicks", newPicks);
  });

  // Thêm sự kiện nhận và lưu bans
  socket.on("sendUpdatedBans", (newBans) => {
    serverData.bans = newBans;
    saveData(serverData);
    io.sockets.emit("receiveUpdatedBans", newBans);
  });

  socket.on("playLockInSound", () => {
    io.sockets.emit("playLockInSound");
  });

  socket.on("deleteAllData", () => {
    serverData.picks = {
      blue: [
        {id: 4, champion: ""},
        {id: 7, champion: ""},
        {id: 8, champion: ""},
        {id: 15, champion: ""},
        {id: 16, champion: ""},
      ],
      red: [
        {id: 5, champion: ""},
        {id: 6, champion: ""},
        {id: 9, champion: ""},
        {id: 14, champion: ""},
        {id: 17, champion: ""},
      ],
    };
    serverData.bans = {
      blue: [
        {id: 0, champion: ""},
        {id: 2, champion: ""},
        {id: 11, champion: ""},
        {id: 13, champion: ""},
      ],
      red: [
        {id: 1, champion: ""},
        {id: 3, champion: ""},
        {id: 10, champion: ""},
        {id: 12, champion: ""},
      ]
    };
    serverData.currentSlot = 0; // Đặt lại currentSlot về 0
    saveData(serverData);
    io.sockets.emit("serverData", serverData);
  });

  socket.on("saveAfterpicks", (picks) => {
    let history = loadHistory();
    history.push({
      timestamp: Date.now(),
      picks
    });
    saveHistory(history);
    io.sockets.emit("afterpicksUpdated", history);
  });

  socket.on("getAfterpicks", () => {
    socket.emit("afterpicksUpdated", loadHistory());
  });

  socket.on("deleteAfterpicks", () => {
    fs.writeFileSync("afterpicks.json", "[]");
    io.sockets.emit("afterpicksUpdated", []);
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
