import express from "express";

const app = express();

app.use(express.static('public'));
app.use('/images', express.static('images'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
