import { getApp } from "./app.js";

const PORT = 3000;
const app = getApp();

app.listen(PORT, (err) => {
  err
    ? console.error("[app.listen] Port failed", err.message)
    : console.log(`listening port ${PORT}`);
});
