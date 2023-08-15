let mongoose = require('mongoose');
function connect() {
    const DB = mongoose.connect("paste in  connection url which you want")
      .then(() => {
        // tslint:disable-next-line: no-console
        console.log("Database Conneted!");
       // DB.collection("node project").insertOne({"name":"diya"});
      })
      .catch((err) => {
        // tslint:disable-next-line: no-console
        console.log("Error in Database connetion::", err);
      });
    return DB;
  }
  
 
  connect()
