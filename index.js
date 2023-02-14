const express = require('express')
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const PORT = 8080;

let static_dir = path.join(__dirname, "static");

let app = express();
app.use(express.static(static_dir));
app.use(express.urlencoded({extended: false}))

let db;
(async () =>
{
    db = await open({
        filename: 'shopping.sqlite',
        driver: sqlite3.Database
    });
})();

app.get('/test', async (req, res) => {
    const result = await db.get("SELECT * FROM items WHERE id = 2");
    console.log(result);
    res.send("OK")
})

app.get('/time', (req, res) =>{
    res.send(`
    <html>
    <body>
        <h1>Time</h1>
        
        <p>${Date()}</p>
        </body>
        </html>`);
});

app.set('view engine', 'ejs');

app.get('/items', async (req, res) =>{
    const db1 = await db.all("SELECT * FROM items;");
    res.render('items', {list: db1});
});

app.get('/item_view/1', async (req, res) =>{
    let obj;
    const db1 = await db.all("SELECT * FROM items;");
    for (let i of db1){
        if (i.id == 1){
            obj = i.id;
            const db2 = await db.get("SELECT * FROM items WHERE id = ?;", [obj]);
            let rdb2 = await db.all("SELECT * FROM reviews WHERE itemId = ?;", [obj]);
            res.render('item_view', {list: db2, rlist: rdb2});
            app.post(`/item_view/post/1`, async (req, res) =>{
                if(obj == 1){
                    if(req.body.Username != '' && req.body.Reviews != ''){
                        rdb2 = await db.run("INSERT INTO reviews (name, review, itemId) VALUES (?, ?, ?);", 
                        [req.body.Username, req.body.Reviews, obj]);
                        //res.send("Submitted");
                        rdb2 = await db.all("SELECT * FROM reviews WHERE itemId = ?;", [obj]);
                        db2.alert = false;
                        res.render('item_view', {list: db2, rlist: rdb2});
                    }else{
                        db2.alert = true;
                        res.render(`item_view`, {list: db2, rlist: rdb2});
                    }
                }else{res.sendStatus(404);}
                
            });
        }
    }

});

app.get('/item_view/2', async (req, res) =>{
    let obj;
    const db1 = await db.all("SELECT * FROM items;");
    for (let i of db1){
        if (i.id == 2){
            obj = i.id;
            const db2 = await db.get("SELECT * FROM items WHERE id = ?;", [obj]);
            let rdb2 = await db.all("SELECT * FROM reviews WHERE itemId = ?;", [obj]);
            res.render('item_view', {list: db2, rlist: rdb2});
            app.post(`/item_view/post/2`, async (req, res) =>{
                if(obj == 2)
                {
                    if(req.body.Username != '' && req.body.Reviews != ''){
                        rdb2 = await db.run("INSERT INTO reviews (name, review, itemId) VALUES (?, ?, ?);", 
                        [req.body.Username, req.body.Reviews, obj]);
                        //res.send("Submitted");
                        rdb2 = await db.all("SELECT * FROM reviews WHERE itemId = ?;", [obj]);
                        db2.alert = false;
                        res.render('item_view', {list: db2, rlist: rdb2});
                    }else{
                        db2.alert = true;
                        res.render(`item_view`, {list: db2, rlist: rdb2});
                    }
                }else{res.sendStatus(404);}
                
            });
        }
    }

});

app.get('/item_view/3', async (req, res) =>{
    let obj;
    const db1 = await db.all("SELECT * FROM items;");
    for (let i of db1){
        if (i.id == 3){
            obj = i.id;
            const db2 = await db.get("SELECT * FROM items WHERE id = ?;", [obj]);
            let rdb2 = await db.all("SELECT * FROM reviews WHERE itemId = ?;", [obj]);
            res.render('item_view', {list: db2, rlist: rdb2});
            app.post(`/item_view/post/3`, async (req, res) =>{
                if(obj == 3)
                {
                    if(req.body.Username != '' && req.body.Reviews != '')
                    {
                        rdb2 = await db.run("INSERT INTO reviews (name, review, itemId) VALUES (?, ?, ?);", 
                        [req.body.Username, req.body.Reviews, obj]);
                        //res.send("Submitted");
                        rdb2 = await db.all("SELECT * FROM reviews WHERE itemId = ?;", [obj]);
                        db2.alert = false;
                        res.render('item_view', {list: db2, rlist: rdb2});
                    }else{
                        db2.alert = true;
                        res.render(`item_view`, {list: db2, rlist: rdb2});
                    }
                }else{res.sendStatus(404);}
                
            });
        }
    }

});

app.listen(PORT, () => console.log("Server listening"));