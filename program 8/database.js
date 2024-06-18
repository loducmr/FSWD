const {MongoClient} =require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client= new MongoClient(url);
let collection;
//can also export like as follows
// module.exports={getData,insertData};

async function connectDB(dbname,table)
{
    let result=await client.connect();
    let db= result.db(dbname);
    collection = db.collection(table);
    console.log("DataBase Connected...");
    return collection;
}

exports.getData=async function (name,password)
{
   collection = await connectDB("cse","employee");
   let response = await collection.find({name:name,password:password}).toArray();
   console.log("From getData method: "+JSON.stringify(response)); 
   collection.close;
   return JSON.stringify(response);
}

exports.insertData=async function (emp)
{
    collection = await connectDB("cse","employee");
    let response=await collection.insertOne({name:emp.name,work:emp.work,password:emp.password})
	console.log("Record inserted Successfully");
    collection.close;
	return JSON.stringify(response); 
}