import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "test123";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ 
//1st thing to learn 
//important things to learn here if ur backend and frontend is different then 
// you need to set credential to be true, so that plz allow credential to be set from given
//  website origin here localhost:5173 or cookie to be set from this site
    credentials: true,
    origin: "http://localhost:5173"
}));

app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // do db validations, fetch id of user from db

    //2nd thing to learn,how to set cookie for a user
    const token = jwt.sign({
        id: 1
    }, JWT_SECRET);
    res.cookie("token", token); //thanks to cookie parser by which we will put the cookie in the set-cookie header
    res.send("Logged in!");
});

app.get("/user", (req, res) => {

    //3rd things to learn is how to get a cookie from a user 
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // Get email of the user from the database
    res.send({
        userId: decoded.id
    })
});


app.post("/logout", (req, res) => {
    res.clearCookie("token");
    //or we can res.cookie("token","");
    res.json({
        message: "Logged out!"
    })
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"))
})

app.listen(3000);