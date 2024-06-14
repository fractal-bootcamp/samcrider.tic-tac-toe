import config from "./utils/config";
import app from "./app";

app.listen(config.PORT, () => {
  console.log("listening on port: ", config.PORT);
});
