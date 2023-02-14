const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

console.log("I live");

(async () =>
{
    const db = await open({
        filename: 'shopping.sqlite',
        driver: sqlite3.Database
    });

    // Execute four SQL queries
    // const id = 2;
    // const result = await db.all("SELECT * FROM items");
    // const result = await db.get("SELECT * FROM items WHERE id = ?", [id]);
    // const result = await db.run("DELETE FROM items WHERE id = ?", [id]);
    // const result = await db.run("INSERT INTO reviews (name, review, itemId) VALUES (?, ?, ?);", ["Bob", "Bad!", 3]);
    // const result = await db.run("UPDATE reviews SET name = ? WHERE id = ?;", ["NotJames", id]);

    // console.log(result);

})();

console.log("I die");