const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');
const { constants } = require('buffer');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var fname = req.body.firstName;
    var lname = req.body.lastName;
    var email = req.body.email;
    //console.log(fname, lname, email);
    // res.write("data recieve");
    // res.send();

    var data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: fname,
            LNAME: lname
          }
        }
      ]
    };
    const jsonData = JSON.stringify(data);
    var url = "https://us2.api.mailchimp.com/3.0/lists/c546a1ccda";
    var option = {
      method: "POST",
      auth: "Saburi8888:902c33d6a2865a66a6bcb6f738cd044a-us2"
    };
   const request = https.request(url,option,function(response){
       if(response.statusCode === 200){
           res.sendFile(__dirname + "/success.html");
        }else{
            
            res.sendFile(__dirname + "/failure.html");
       }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});

// api key
// 902c33d6a2865a66a6bcb6f738cd044a-us2


// id
// c546a1ccda