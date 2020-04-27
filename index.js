const express = require('express'); //Import express
const joi = require('joi'); //Import joi
const app = express(); //Create express application on the app variable
app.use(express.json()); //use the json file
app.use(express.urlencoded({extended:true}));

// app.get()
// app.post()
// app.put()
// app.delete()


// Give data to the server
var customers = [
    { id : 1, name : 'customer 1'},
    { id : 2, name : 'customer 2'},
    { id : 3, name : 'customer 3'},
    { id : 4, name : 'customer 4'},
    { id : 5, name : 'customer 5'}
];

// Read request handlers
// Display the message when the URL is '/'
app.get('/', function(req, res){
    res.send('Welcome to REST-API');
});
// Display the list of Customers when URL consists of api customers
app.get('/api/customers', function(req, res){
    res.send(customers);
});
// Display the specific Customers when you mention the id:
app.get('/api/customers/:id', function(req, res){
    const customer = customers.find((c => c.id === parseInt(req.params.id)));
    // If there is no valid customer id then show the error msg 
    if(!customer) res.status(404).send('The customer with the given id was not found');
    res.send(customer);
});


// Create Request Handlers
// Create New Customer Information
app.post('/api/customers/:id', function(req, res){
    const id  = parseInt(req.body.id);
    const name = req.body.name;
    const customer = {'id':id,'name':name};
    customers.push(customer);
    res.send("Added");
});


// Update Request Handlers
// Update Exixting Customer Information
app.put('/api/customers/:id', function(req, res){
    //Look up the customer
    //if not exist, return 404-Not found
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if(!customer) return res.status(404).send('The customer with the given id was not found');

    //update customer
    //return the updated customer to the client
    customer.name = req.body.name;
    res.send(customer);
});


// Delete Request Handlers
// Delete Exixting Customer Information
app.delete('/api/customers/:id', function(req, res){
    //look up the customer
    //if not exist, return 404
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('The customer with the given id was not found');

    // Delete
    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    
    res.send(customer);
});

//PORT Environment variable
app.listen(8080, function(req, res){
    console.log('Listening on port : 8080');
});