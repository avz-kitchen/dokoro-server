const app = require("./app");

// ℹ️ Sets the apiUrl for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

const user = {
  name: "User1",
  password: "234Absd",
  email: "test@mail.com"
};

const plant = {
  "nutrient": "Fiber",
  "season": "fall",
  "sow": 1,
  "name": "Artichokes",
  "sciName": "Cynara cardunculus var. scolymus",
  "power": ["Prebiotic", "Prebiotic"],
  "benefit": "low FODMAP (l-F)",
  "part": "Root",
  "grow": "july",
  "gardenId": "6658971927e35448a8793a7b"
}

const fs = require("fs")
const saveData = (data, file) => {
  const finished = (err) => {
    if (err) {
      console.log(err)
      return
    }
  }

  const jsonData = JSON.stringify(data, null, 2)
  fs.writeFile(file, jsonData, finished)

}

