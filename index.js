import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  try {
    const cityName = req.body["city"];
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=6&appid=3099ac7887bd87a0a09d9d4f44762a54`
    );
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    res.render("index.ejs", {
      error: "Sorry City Not Found",
    });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
