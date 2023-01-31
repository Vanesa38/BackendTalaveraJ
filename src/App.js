import express from "express"

const App = express();
const port = 8080;

App.get ("/", (req, res) => {
    res.send("Hello World");
});

App.listen(port, () =>{
    console.log('Server running on port ${PORT} ')
}
    )