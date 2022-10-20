const app = require('./index.js');
const port = 8000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})