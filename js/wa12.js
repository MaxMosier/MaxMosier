let jsonText = {
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
};

let companyObject = JSON.parse(jsonText);

console.log(companyObject);