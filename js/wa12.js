// STEP 1 : Make the JSON for the employees:
/* I wrote these as strings to start, since that was my understanding of what we were to do.
   Of course, I could have just removed the ` marks to make this directly declare an object. */
console.log("Creating JSON (strings) for the three initial employees:");

const samJSON = `{
    "firstName": "Sam",
    "department": "Tech",
    "designation": "Manager",
    "salary": 40000,
    "raiseEligible": true
}`;
console.log(samJSON);

const maryJSON = `{
    "firstName": "Mary",
    "department": "Finance",
    "designation": "Trainee",
    "salary": 18500,
    "raiseEligible": true
}`;
console.log(maryJSON);

const billJSON = `{
    "firstName": "Bill",
    "department": "HR",
    "designation": "Executive",
    "salary": 21200,
    "raiseEligible": false
}`;
console.log(billJSON);

// STEP 2 : Make the JSON for the company

console.log("Creating the JSON string for the company object:")

const jsonString = `{
    "companyName": "Tech Stars",
    "website": "www.techstars.site",
    "employees": [
    ]
}`;

console.log("Adding existing employees to the company's 'employees' array...")
// And add the employees to the company employee list:
const companyObject = JSON.parse(jsonString);
companyObject.employees.push(JSON.parse(samJSON));
companyObject.employees.push(JSON.parse(maryJSON));
companyObject.employees.push(JSON.parse(billJSON));

console.log("The current state of the company object is now as follows:");
console.log(companyObject);

// STEP 3 : Add Anna!

console.log("Now adding the following new employee:");
let newEmployee = {
    "firstName" : "Anna",
    "department" : "Tech",
    "designation" : "Executive",
    "salary" : 25600,
    "raiseEligible" : false
};
console.log(newEmployee);
companyObject.employees.push(newEmployee);

console.log("So the company employee list is now:");
console.log(companyObject.employees);

// Step 4 : Calculate sum of employee salaries:

console.log("Calculating sum of employee salaries...");

let salarySum = 0;

for(const individual of companyObject.employees){
    salarySum += individual.salary;
}

console.log("Sum of employee salaries is " + addCommas(salarySum));

// Step 5 : Raise time!

console.log("Giving all eligible employees raises...");

/* This could of course had been done in the previous loop for greater efficiency,
   but it made the steps more distinct to separate them. Would have used some incrementing
   variable to keep track of current position in array */
for(let n = 0; n < companyObject.employees.length; n++){
    if(companyObject.employees[n].raiseEligible){
        companyObject.employees[n].salary *= 1.1; // Add 10 percent of existing value
    }
}

console.log("The employees' salaries are now as follows:");
for(const individual of companyObject.employees){
    console.log('\t' + individual.firstName + " : " + individual.salary);
}

// Step 6 : Designate some workers as "from home"

console.log("Setting work from home status for all employees...");

let wfhEmployees = ["Anna", "Sam"];

for(let n = 0; n < companyObject.employees.length; n++){
    let isWFH = false;
    for(let s = 0; s < wfhEmployees.length; s++){
        if(companyObject.employees[n].firstName == wfhEmployees[s]){
            isWFH = true;
        }
    }
    //Will also add "false" to those not in the list.
    companyObject.employees[n].wfh = isWFH;
}

console.log("List of employees' WFH statuses:");
for(const individual of companyObject.employees){
    const statusString = (individual.wfh)?" works from home":" works in office";
    console.log('\t' + individual.firstName + statusString);
}

console.log("And that concludes this assignment!");
console.log("Final object below:");
console.log(companyObject);

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
