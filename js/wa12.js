// Step 1: Make the JSON
// (I wrote it as a string to start, for the sake of practicing doing so)
const jsonString = `{
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
companyObject.employees.push(newEmployee);

console.log("So the company employee list is now:");
console.log(companyObject.employees);

console.log("Calculating sum of employee salaries...");

let salarySum = 0;

for(const individual of companyObject.employees){
    salarySum += individual.salary;
}

console.log("Sum of employee salaries is " + addCommas(salarySum));


function addCommas(num) {

    const str = num.toString();
    let output = "";
    let pos = 0; // (Out current position in the string)
    
    // Loop through the string representation of the integer from !!RIGHT TO LEFT!!
    for (let i = str.length - 1; i >= 0; i--) {
      pos++;
      // I'll continuously build to the new output
      output = str[i] + output;
      // Couldn't use += because I need to add to the left side
      // If we've seen three digits add a comma
      if (pos % 3 === 0 && i !== 0) //Unless we're at the leftmost digit, 
      {
        output = ',' + output;
      }
    }
    return output;
}
