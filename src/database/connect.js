const { MongoClient } = require("mongodb");
require("dotenv").config();

let database;

const connectDB = async () => {
try {
const client = await MongoClient.connect(
process.env.MONGODB_URI
);

```
database = client.db(process.env.DB_NAME);

console.log("MongoDB Connected");
return database;
```

} catch (error) {
console.error("MongoDB Connection Error:", error);
process.exit(1);
}
};

const getDB = () => {
if (!database) {
throw new Error(
"Database not initialized. Call connectDB first."
);
}

return database;
};

module.exports = {
connectDB,
getDB,
};
