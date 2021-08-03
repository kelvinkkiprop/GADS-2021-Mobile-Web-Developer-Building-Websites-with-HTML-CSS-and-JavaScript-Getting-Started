'use strict';//Enforce clean JD
(function(){

    //Objects literals
    let person = {
        firstName: "Kelvin",
        lastName: "Kibiwott",
        age: 17,
        isAdult: function(){
            return this.age>=18;
        }, //Adding funtions to an object
        notAdult(){
            return this.age<=18;
        } //function shorthand, same as above but only works within objects
    };
    console.log(person.firstName);
    console.log(person.isAdult());
    console.log(person.notAdult());

    //Dynamic nature of JS
    person.age=26;
    console.log(person.age);

    //Adding funtions to an object
    person.isAdult = function(){
        return this.age>=18;
    }
    console.log(person.isAdult());


    //Object Literal Property Shorthand
    function registerUser(firstName, lastName){
        let person = {
            // firstName: fName,
            // lastName: lName,
            //Shorthand for above
            firstName,
            lastName,
        }
        console.log(person);
    }
    registerUser("Kelvin", "Kip");


    //Inbuild Javascript Object
    console.log(Object.keys(person));
    console.log(Object.values(person));

    for (let propertyName in person){ //With for loop
        console.log(propertyName);
    }

    //Object equality operators
    // 1. ==
    // Not safe, "42"==43, 0==false, null==undefined, ""==0, [1,2]=="1,2"
    //2. ===
    //Safe
    //3.Object.is();
    //Almost same as === but mostly used in objects
    let person1 = {
        firstName: "Joe",
        lastName: "Doe",
    }
    let person2 = {
        firstName: "Joe",
        lastName: "Doe",
    }
    console.log(Object.is(person1,person2));//False as it comapares the address and not real values


    //Object assign and immutability
    person2 = {};
    Object.assign(person2, person1);//1st param is the one being modified
    console.log(person2);//False as it comapares the address and not real values
    //Example2
    let healthStats = {
        height: 68,
        weight: 150,
    };
    Object.assign(person1, healthStats);
    console.log(person1);
    //Example3
    function mergedHealthStats(person, healthStats){
        // return Object.assign(person, healthStats);
        return Object.assign({}, person, healthStats);//Avoid mutation
    }
    let mergedPerson = mergedHealthStats(person1, healthStats);
    console.log(mergedPerson);
    //Mutated person1
    console.log(person1);


    //Constructror functions to create objects
    let kip = {
        firstName: "Kiprop",
        lastName: "K",
        age: 17,
        isAdult: function(){return this.age<18},
    };
    let kevo = {
        firstName: "Kevoh3",
        lastName: "K",
        age: 26,
        isAdult: function(){return this.age>18},
    };

    console.log(kip.isAdult());

    //Constructor function
    function Person(fName, lName, age) {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
    }

    let my_person = new Person("Kelvin", "Kiprop", 21)
    console.log(my_person.age);

    //Object.create() Method
    let personObject = {
        firstName: "Kevoh3",
        lastName: "KKK",
        age: 26,
    };
    let personObject1 = Object.create(
        Object.prototype,{
            firstName:{value:'Kelvin', enumerable:true, writable:true, configurable:true},
            lastName:{value:'Kelvin', enumerable:true, writable:true, configurable:true},
            age:{value:26, enumerable:true, writable:true, configurable:true}
        }
    )
    //Compare: same!!!
    console.log(personObject);
    console.log(personObject1);



    //USing Bracket noatatiions to access javascript properties
    console.log(person['firstName']);
    for(let propertyName in personObject){
        console.log(propertyName +':'+ person[propertyName]);
    }

    //Modifying values with properties discriptors
    console.log(Object.getOwnPropertyDescriptor(personObject, 'firstName'));
    //Writable attributes
    console.log(Object.defineProperty(personObject, 'firstName', {writable:false}));
    //Freezing- you can't change the values
    // console.log(Object.freeze(person));

    //Enumarable: means it is loopable
    Object.defineProperty(personObject, 'firstName', {enumerable:false})
    for(let propertyName in personObject){
        console.log(propertyName+' : '+personObject[propertyName]);
    }
    console.log(Object.keys(personObject));//Will not show first name key as its enumerable
    console.log(JSON.stringify(personObject));//Will not stringify

    //Configurable property: locks the property down i.e. cannot be chenged or deleted except writable
    Object.defineProperty(personObject, 'firstName', {configurable:false});
    // delete personObject.firstName;
    // console.log(personObject);
    // Object.defineProperty(personObject, 'firstName', {enumerable:true});
    console.log(Object.keys(personObject));

    //Propert getters and setters
    let object_person = {
        name: {
            first: 'Kelvin',
            last: 'Kiprop',
        }
    }
    Object.defineProperty(object_person, 'fullName', {
        //Getter
        get:function(){
            return this.name.first + ' '+this.name.last
        },
        //Setter
        set: function(value){
            var nameParts = value.split(' ');
            this.name.first = nameParts[0];
            this.name.last = nameParts[1];
        }
    });
    console.log(object_person.fullName);//Returns full name
    //set name
    object_person.fullName = 'Joe Doe';
    console.log(object_person.name.first);
    console.log(object_person.name.last);


    //Prototypes and interfaces
    function Person101(firstName, lastName){
        this.firstName = firstName,
        this.lastName = lastName
    }
    let jim = new Person101('Kelvin', 'Kiprop');
    jim.age = 18;
    // console.log(Person101.jim.__proto__.firstName);
    // console.log(Person101.jim.prototype.firstName);
    console.log(jim.hasOwnProperty('age'));

    //multipel levels of Inheritance
    function Person102(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        Object.defineProperty(this, 'fullName', {
            get:function() {
                return this.firstName+' '+this.lastName
            },
            enumerable: true
        });
    }

    function Student(firstName, lastName, age) {
        //Call
        Person102.call(this, firstName, lastName, age);
        this._enrolledCourses = [];
        this.enroll = function(courseId) {
            this._enrolledCourses.push(courseId);
        };
        this.getCourses = function(){
            return this.fullName+"'s enrolled course are: "+
            this._enrolledCourses.join(', ');
        };
    }
    //Create prototype inheritance chains
    Student.prototype = Object.create(Person102.prototype);
    Student.prototype.constructor = Student;

    //create a new student
    let jim_cooper = new Student('Jim', 'Cooper', 29);
    console.log(jim_cooper);
    console.log(jim_cooper.__proto__);
    // console.log(jim_cooper.__proto__proto__);

    //Enroll jim to courses
    jim_cooper.enroll('CS205');
    jim_cooper.enroll('MA101');
    jim_cooper.enroll('CS202');
    console.log(jim_cooper.getCourses());



    //Javascript classes
    class PersonClass{
        constructor(firstName, lastName, age){
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
        }        
        //Getters and setters with classes
        //Getter
        get fullName(){
            return this.firstName+' '+this.lastName;
        }
        //Setter
        set fullName(name){
            var nameParts = name.split(' ');
            this.firstName = nameParts[0];
            this.lastName = nameParts[1];
        }
        //Adding function to a class
        isAdult() {
            return this.age >= 18;
        }
    }
    //Call
    let kibii = new PersonClass ("Kelvin", "Kiprop", 26);
    console.log(kibii);
    console.log(kibii.fullName);//Getter value
    kibii.fullName = "Kelvin Kibiwott"; //Setter value
    console.log(kibii.fullName);//Getter value
    console.log(kibii.isAdult());//Function in a class

    //Modifying property descriptor on a class
    Object.defineProperty(PersonClass.prototype, 'fullName',{enumerable:true});
    console.log(kibii);

    //Using Inheritance with javascript  classes
    class StudentExtending extends PersonClass {//Inhereitance fro  PersonClass
        //Call
        constructor(firstName, lastName, age){
                super(firstName, lastName, age);//Used to call the constructor of the class we are extending
                this._enrolledCourses = [];
            }
            
            //Static class
            static fromPerson(person){
              return new StudentExtending(person.firstName, person.lastName, person.age);
            };

            enroll (courseId) {
                this._enrolledCourses.push(courseId);
            };
            getCourses (){
                return this.fullName+"'s enrolled course are: "+
                this._enrolledCourses.join(', ');
            };            
        
    }
    //Create student
    let kibi = new StudentExtending('Kelvin', 'Kiprop', 29);
    kibi.enroll('CS101');
    console.log(kibi.getCourses());

    //Using static properties and classes
    let kib = new PersonClass('Kib', 'Kip', 29);
    let kibis = StudentExtending.fromPerson(kib);
    console.log(kibis);

    //Build in JavaScript objects
    //1. Math
    console.log(Math.PI);
    console.log(Math.max(1, 14, 35));
    console.log(Math.round(56.35));
    //Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

    //2. date
    let date = new Date();
    console.log(date);
    console.log(Date(0).toString());

    // let date_format = new Date('2050-03-25T13:01:30Z');//Not Accurate
    let date_format = new Date(2050,3,25,13,1,30,50);//Accurate
    console.log(date_format);

    //Show
    console.log(date.getFullYear());
    console.log(date.getMonth());//Zero based
    console.log(date.getDate());
    console.log(date.getHours());
    console.log(date.getMinutes());
    console.log(date.getSeconds());
    console.log(date.getMilliseconds());
    //UTC
    console.log(date.getUTCFullYear());
    console.log(date.getUTCMonth());//Zero based
    console.log(date.getUTCDate());
    console.log(date.getUTCHours());
    console.log(date.getUTCMinutes());
    console.log(date.getUTCSeconds());
    console.log(date.getUTCMilliseconds());

    //Subtract dates
    let date1 = new Date(2050,3,25,13,1,30,50);
    let date2 = new Date(2050,3,25,13,1,30,55);
    console.log(date2-date1);//It give 5 miliseconds

    //2.Regex or Regular Expression string validation
    function checkPasswordComplexity(password){
        let regex = new RegExp("\\(INST1,\\[0,", 'gi');//gi means searcg globally and iqgnoare cases
        // let regex = new RegExp/"\\(INST1,\\[0,"/ //Better expression using regex shorthand i.e. //
        return regex.test(password);//returns true if the expresion is strong or matches the standrad else false
    }
    //call
    console.log(checkPasswordComplexity("Weak"));
    console.log(checkPasswordComplexity("Stronger@1234"));

    //Find alerts wit regex
    function findAlerts(logData){
        let regex = /ERROR/g; //Search
        return regex.exec(logData);

        // let result = regex.exec(logData);
        // while(result !== null){//Loop log data until it returns null
        //     console.log(result[1]);
        //     console.log(result[2]);
        //     console.log('------------------------');
        //     result = regex.exec(logData);
        // }

    }
    let logData = 'INFO:Ok;ERROR(HIGH):Something broke';
    let result = findAlerts(logData);
    console.log(result[0]);
    console.log(result.index);
    console.log(result.input);

})();//(); means sel-excluding fucntion and works behind the scene