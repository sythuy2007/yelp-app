require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require('morgan');
const app = express();
const os = require('os');

//middleware express.json 
//luu body vao req.body
//app.use(cors());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());



//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        //const results = await db.query("SELECT * FROM restaurants");

        const restaurantRatingData = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");
   
        res.status(200).json({
            status: "success",
            results: restaurantRatingData.rows,
            data: {
                restaurants: restaurantRatingData.rows,
            },
        });
    } catch (error) {
        console.log(error);
    }
});
//get a restautant
app.get("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const restaurant = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;", [req.params.id,]);
        //select * from restaurants where id = res.params.id

        const reviews = await db.query("select * from reviews where restaurant_id = $1", [req.params.id,]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows

            },
        });
    } catch (error) {
        console.log(error);
    }
});

//create a restaurants
app.post("/api/v1/restaurants", async (req, res) => {

    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }

});
//update restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id= $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        });
    } catch (error) {
        console.log(error);
    }

});
//delete restaurants
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE from restaurants where id = $1", [req.params.id]);

        res.status(204).json({
            status: "success",

        });
    } catch (error) {
        console.log(error);
    }
});
//add Review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4)returning *;", [req.params.id, req.body.name, req.body.review, req.body.rating]);
        console.log(newReview);
        res.status(201).json({
            status: "success",
            data:
            {
                review: newReview.rows[0]
            }
        });

    } catch (error) {
        console.log(error);

    }
});
//test
app.get("/api/v1", (req, res) => {
    
    res.send(`<h2> Hi there from ${os.hostname()} HAHAHA </h2>`);
   
});



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});

