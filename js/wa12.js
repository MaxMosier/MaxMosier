let jsonString = `{
    "companyName": "Tech Stars",
    "website": "www.techstars.site",
    "employees": [
        {
            "firstName": "Sam",
            "department": "Tech",
            "designation": "Manager",
            "salary": 40000,
            "raiseElligible": true
        },
        {
            "firstName": "Mary",
            "department": "Finance",
            "designation": "Trainee",
            "salary": 18500,
            "raiseElligible": true
        },
        {
            "firstName": "Bill",
            "department": "HR",
            "designation": "Executive",
            "salary": 21200,
            "raiseElligible": false
        }
    ]
}`;

console.log("The original JSON string was: ");
console.log(jsonString);

console.log("The current state of the object is as follows");
let companyObject = JSON.parse(jsonString);
console.log(companyObject);

console.log("Now adding the following employee:");
let newEmployee = {
    "firstName" : "Anna",
    "department" : "Tech",
    "designation" : "Executive",
    "salary" : 21200,
    "raiseElligible" : false
};
console.log(newEmployee);