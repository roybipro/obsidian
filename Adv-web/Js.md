%%%%- **Variables**
    
    <aside>  
    📌
    
    ## Variables
    
    <aside>  
    💡
    
    ## **Function Scope**
    
    Inside a function all variables declared with `var`, `let` or `const` have **Function Scope**:
    
    ```jsx
    function myfunction() {
      var x = 1;
      let y = 2;
      const z = 3;
    }
    //x can NOT be used here
    //y can NOT be used here
    //z can NOT be used here
    ```
    
    </aside>
    
    <aside>  
    💡
    
    ## const
    
    - Variables defined with `const` cannot be **Redeclared**
    - Variables defined with `const` cannot be **Reassigned**
    - Variables defined with `const` have **Block Scope**
    
    ```jsx
    const PI = 3.141592653589793;
    PI = 3.14;      // This will give an error
    PI = PI + 10;   // This will also give an error
    ```
    
    <aside>  
    📌
    
    **Always declare a variable with `const` when you know that the value should not be changed.**
    
    Use `const` when you declare:
    
    - A new Array
    - A new Object
    - A new Function
    - A new RegExp  
        </aside>
    
    </aside>
    
    <aside>  
    💡
    
    ## let
    
    - Variables declared with `let` have **Block Scope**
    - Variables declared with `let` must be **Declared before use**
    - Variables declared with `let` cannot be **Redeclared** in the same scope
    
    ```jsx
    {
      let x = 2;
    }
    // x can NOT be used here
    ```
    
    </aside>
    
    <aside>  
    ⚠️
    
    1. Always declare variables
        
    2. Always use `const` if the value should not be changed
        
    3. Always use `const` if the type should not be changed (Arrays and Objects)
        
    4. Only use `let` if you cannot use `const`
        
    5. Avoid using `var`.
        
    
    </aside>
    
    <aside>  
    ⚠️
    
    - A convention among professional programmers is to start a name with underscore for "private" variables.
    - Using the $ is not very common in JavaScript, but professional programmers often use it as an alias for the main function in JavaScript libraries.  
        </aside>
    
    Variables in JavaScript are declared using one of three keywords: [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), or [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var).
    
    </aside>
    
- **DataTypes**
    
    <aside>  
    💡
    
    A JavaScript variable can hold 8 types of data:
    
    - [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#number_type): used for all number values (integer and floating point) except for _very_ big integers.
    - [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#bigint_type): used for arbitrarily large integers.
    - [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#string_type): used to store text.
    - [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#boolean_type): `true` and `false` — usually used for conditional logic.
    - [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#symbol_type): used for creating unique identifiers that won't collide.
    - [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#undefined_type): indicating that a variable has not been assigned a value.
    - [Null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#null_type): indicating a deliberate non-value.
    
    Everything else is known as an [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures#objects). Common object types include:
    
    - [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    - [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
    - [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
    - [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
    - [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)  
        </aside>
- **Functions**
    
    <aside>  
    💡
    
    functions
    
    Functions can be used as variables, in all types of formulas, assignments, and calculations.
    
    ```jsx
    let x = toCelsius(77);
    let text = "The temperature is " + x + " Celsius";
    ```
    
    ### 📌 Parameters vs. Arguments
    
    - In JavaScript, function **parameters** and **arguments** are distinct concepts:
    - **Parameters** are the **names** listed in the **function definition**.
    - **Arguments** are the **real values** passed to, and **received by the function**.
    
    ### 📌 Parameter Rules
    
    - JavaScript function definitions **do not specify data types** for parameters.
    - JavaScript functions **do not perform type checking** on the arguments.
    - JavaScript functions **do not check the number** of arguments received.
    
    A function expression is a **function stored in a variable**.
    
    ### 📌**JavaScript Arrow Functions**
    
    An arrow function uses the **=>** symbol.
    
    An arrow function is always written as a function expression.
    
    ```jsx
    const add = (a, b) => {
      return a + b;
    };
    ```
    
    ⚠️ **Arrow Functions Return Value by Default**
    
    </aside>
    
- **Constructors**
    
    <aside>  
    💡
    
    In the world of JavaScript programming, constructors play a crucial role. They are special functions that are used to create and initialize objects.
    
    When an object is created using the **new** keyword, the constructor gets called, allowing you to set values for the object’s properties and perform any necessary initialization tasks.
    
    </aside>
    
- **Array**
    
    <aside>  
    💡
    
    An Array is an object type designed for storing data collections.
    
    ### **Arrays are Objects**
    
    - Arrays use **numbers** to access its "elements". In this example, `person[0]` returns John:
    - Objects use **names** to access its "members". In this example, `person.firstName` returns John:
    - In JavaScript, **arrays** use **numbered indexes**.
    - In JavaScript, **objects** use **named indexes**.
    
    📌**A mutating method** changes the original object in place, while a **non-mutating method** leaves the original object untouched and returns a new value or copy
    
    ![Screenshot 2026-10-04 at 8.32.57 AM.png](attachment:0f57e295-40c0-4b7b-b857-f3035fac603c:Screenshot_2026-10-04_at_8.32.57_AM.png)
    
    An easy way to change a mutating method into a non-mutating alternative is to use the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) or [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) to create a copy first:
    
    </aside>

    
- **Objects**
    
    <aside>  
    💡
    
    📌Objects are variables that can store both values and functions
    
    - **Values** are stored as **key:value** pairs called **properties**.
    - **Functions** are stored as **key:function()** pairs called **methods**.
    
    ```jsx
    // Create an Object
    const person = {
      firstName: "John",
      lastName: "Doe",
      age: 50,
      eyeColor: "blue"
    };
    ```
    
    You should declare objects with the const keyword.
    
    ```jsx
    // Create an Object
    const person = new Object({
      firstName: "John",
      lastName: "Doe",
      age: 50,
      eyeColor: "blue"
    });
    ```
    
    We can access object properties in two ways:
    
    - Dot notation. this use the most
    
    ```jsx
    objectName.propertyName
    ```
    
    - Bracket notation
    
    ```jsx
    objectName["propertyName"]
    ```
    
    ## 📌**JavaScript Object Methods**
    
    Object methods are **function definitions** stored as **property values**:
    
    ```jsx
    const person = {
      firstName: "John",
      lastName : "Doe",
      age      : 50,
      fullName : function() {
        return this.firstName + " " + this.lastName;
      }
    };
    ```
    
    In an object method, `this` refers to **the object**.
    
    In the example above, `this` refers to **the person object**.
    
    **In JavaScript, Objects are King**
    
    ### ⚠️ In JavaScript, almost "everything" is an object:
    
    - Objects are objects
    - Maths are objects
    - Dates are objects
    - Arrays are objects
    - Maps are objects
    - Sets are objects
    - RegExp are Objects
    - Errors are Objects
    
    All JavaScript values, except **primitives**, are objects.
    
    ### 📌 **Properties are key:value Pairs**
    
    Use the `in` operator to check if a property exists in an object:
    
    ### 📌 Ne**sted Objects**
    
    ```jsx
    myObj = {
      name:"John",
      age:30,
      myCars: {
        car1:"Ford",
        car2:"BMW",
        car3:"Fiat"
      }
    }
    myObj.myCars.car2;
    ```
    
    ## 📌 **Object Methods**
    
    **Methods** are **actions** that can be performed on objects.
    
    Methods are **functions** stored as **property values**.
    
    In an object method, `this` refers to the object.
    
    In JavaScript, `this` is used to access the object that is calling a method.
    
    The `this` keyword makes it possible to use the same method with different objects.
    
    ```jsx
    const person1 = {
      name: "John",
      hello: function() {
        return "Hello " + this.name;
      }
    };
    
    const person2 = {
      name: "Anna",
      hello: function() {
        return "Hello " + this.name;
      }
    };
    
    document.getElementById("demo").innerHTML = person1.hello();
    ```
    
    # **this** Alone
    
    When used alone, `this` refers to the global object.
    
    In a browser, the global object is the `window` object.
    
    ```jsx
    let x = this;document.getElementById("demo").innerHTML = x;
    ```
    
    # Summary
    
    - In an object method, `this` refers to the object
    - `this` lets methods access object properties
    - Used alone, `this` refers to the global object
    
    # Object Constructor Functions
    
    Sometimes we need to create many objects of the same **type**.
    
    To create an **object type** we use an **object constructor function**.
    
    It is considered good practice to name constructor functions with an upper-case first letter.
    
    ```jsx
    function Person(first, last, age, eye) {
      this.firstName = first;
      this.lastName = last;
      this.age = age;
      this.eyeColor = eye;
    }
    ```
    
    </aside>
    
- **map()**
    
    <aside>  
    💡
    
    A **JavaScript Map** is an object that can store collections of key-value pairs, similar to a **dictionary** in other programming languages.
    
    Maps differ from standard objects in that **keys can be of any data type**.
    
    ### Map Characteristics
    
    - **Key Types**
        
        Map keys can be any type (strings, numbers, objects, etc).
        
    - **Insertion Order**
        
        The Map remembers the original insertion order of the keys.
        
    - **Size**
        
        The number of items in a Map is easily retrieved using the size property.
        
    - **Performance**
        
        Maps are optimized for frequent additions and removals of key-value pairs.
        
    - **Iteration**
        
        Maps are iterable, allowing for direct use of for...of loops or methods like forEach().
        
    - **Iteration Order**
        
        The original order is preserved during iteration.
        
        - Create a new Map and add elements with `Map.set()`
        - Passing an existing Array to the `new Map()` constructor
        
        ```jsx
        // Create an empty Map
        const fruits = new Map();
        
        // Set Map Values
        fruits.set("apples", 500);
        fruits.set("bananas", 300);
        fruits.set("oranges", 200);
        ```
        
        The `set()` method can also be used to change existing Map values:
        
        The `get()` method gets the value of a key in a Map:
        
        ```jsx
        fruits.get("apples");    // Returns 500
        ```
        
        ### JavaScript Objects vs Maps
        
        |Object|Map|
        |---|---|
        |Not directly iterable|Directly iterable|
        |Do not have a size property|Have a size property|
        |Keys must be Strings (or Symbols)|Keys can be any datatype|
        |Keys are not well ordered|Keys are ordered by insertion|
        |Have default keys|Do not have default keys|
        
    
    </aside>
    
- **`filter()`**
    
    <aside>  
    💡
    
    The `filter()` method creates a new array filled with elements that pass a test provided by a function.
    
    The `filter()` method does not execute the function for empty elements.
    
    The `filter()` method does not change the original array.
    
    </aside>
    
- **`find()`**
    
    <aside>  
    💡
    
    The `find()` method returns the value of the first element that passes a test.
    
    The `find()` method executes a function for each array element.
    
    The `find()` method returns `undefined` if no elements are found.
    
    The `find()` method does not execute the function for empty elements.
    
    The `find()` method does not change the original array.
    
    </aside>
    
- **JS Asynchronous**
    
    - **Asynchronous Programming**
        
        <aside>  
        💡
        
        **JavaScript runs one task at a time**.
        
        While one task is running, no other JavaScript code can run. If a task takes a long time, the browser cannot respond to user actions until the task finishes.
        
        Asynchronous programming solves this problem by allowing long-running operations to complete in the background while JavaScript continues running other code.
        
        The word **async** means **not at the same time**.
        
        By default, JavaScript runs code **from top to bottom** and left to right.
        
        ### Common Asynchronous Operations
        
        |Operation|Example|
        |---|---|
        |Timer|`setTimeout()`|
        |Network request|`fetch()`|
        |User interaction|click events|
        |Animation|`requestAnimationFrame()`|
        |Web Workers|Background processing|
        
        JavaScript has several ways to handle asynchronous results.
        
        - **Callbacks**
        - **Promises**
        - **Async** functions and **await**
        
        </aside>
        
    - **Asynchronous Callbacks**
        
        <aside>  
        💡
        
        **A callback is a function passed as an argument to another function**.
        
        **A callback can be called immediately, later, once, or many times**.
        
        ```jsx
        // A Greet Function
        function greet(name, callback) {
          callback("Hello " + name);
        }
        
        // A Display Function
        function display(message) {
          document.getElementById("demo").innerHTML = message;
        }
        
        // Call greet() with a callback function (display)
        greet("John", display);
        ```
        
        ### Asynchronous Callbacks
        
        Callbacks are also commonly used with asynchronous APIs.
        
        In these cases, the callback runs after the asynchronous operation has completed.
        
        The callback is not what makes the operation asynchronous.
        
        The asynchronous API decides when to call the callback.
        
        </aside>
        
    - **Promise**
        
        <aside>  
        💡
        
        A Promise represents the future result of an asynchronous operation.
        
        It acts as a placeholder for a value that is not available yet.
        
        ### Why Promises?
        
        Callbacks work well for simple asynchronous operations.
        
        However, several dependent callbacks can become difficult to read.
        
        Promises provide a cleaner and more readable way to organize asynchronous code.
        
        ### Promise States
        
        Every Promise is always in one of three states.
        
        |State|Description|
        |---|---|
        |Pending|The operation has started but has not finished.|
        |Fulfilled|The operation completed successfully.|
        |Rejected|The operation failed.|
        
        # Promise Flow
        
        ```
        fetch()
        ⮯
        returns a Promise
        ⮯
        then() registers a callback
        ⮯
        JavaScript continues
        ⮯
        Promise becomes fulfilled
        ⮯
        callback runs
        ```
        
        ```jsx
        let promise = fetch("fetch.txt");
        
        promise.then(function(response) {
          return response.text();
        });
        
        myDisplayer("JavaScript continues...");
        ```
        
        Create a Promise with the `Promise()` constructor.
        
        ```jsx
        const promise = new Promise(function(resolve, reject) {
          // Asynchronous work
        
          if (success) {
            resolve(value);
          } else {
            reject(error);
          }
        });
        ```
        
        # JavaScript async and await
        
        # _"async and await make promises easier"_
        
        The **async** and **await** keywords make Promise-based code easier to read.
        
        They let asynchronous code look much like ordinary synchronous code.
        
        Behind the scenes, **async** and **await** still use **Promises**.
        
        # What Happens During await?
        
        The `await` keyword pauses only the current `async` function.
        
        It does not pause JavaScript.
        
        Other code, timers, events, and user interactions can continue while the Promise is pending.
        
        </aside>
        
- **Destructuring**
    
    <aside>  
    💡
    
    The destructuring assignment syntax can **unpack objects** into variables:
    
    ```jsx
    // Create an Object
    const person = {
      firstName: "John",
      lastName: "Doe",
      age: 50
    };
    
    // Destructuring
    let {firstName, lastName} = person;
    ```
    
    </aside>
    
- **Spread operator**
    
    <aside>  
    💡
    
    The JavaScript spread operator (`...`) copies all or part of an existing array or object into another array or object.
    
    The **spread (`...`)** syntax allows an iterable, such as an array or string, to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.
    
    ```jsx
    const numbers = [1, 2, 3, 4, 5, 6,7,8];
    
    const [one, two, ...rest] = numbers;
    
    document.write("<p>" + one + "</p>");
    document.write("<p>" + two + "</p>");
    document.write("<p>" + rest + "</p>");
    ```
    
    </aside>
    
    - Modules
- **Modules**
    
    <aside>  
    💡
    
    JavaScript modules allow you to break up your code into separate files.
    
    Modules use `export` and `import` to interchange functionalities between modules.
    
    ```jsx
    // Export an "add" function
    export function add(a, b) {
      return a + b;
    }
    // Import an "add" function
    import { add } from './math.js';
    let result = add(2, 3);
    ```
    
    ### Modules Can Export
    
    - Variables
    - Functions
    - Objects
    - Classes
    
    </aside>
    
- **JSON**
    
    <aside>  
    💡
    
    JSON is a **text format** for storing and exchanging data.
    
    JSON stands for **JavaScript Object Notation**.
    
    JSON syntax is similar to **JavaScript object syntax**.
    
    JSON is **language independent**.
    
    # What Is JSON Used For?
    
    JSON is used to **send**, **receive** and **store data**.
    
    JSON is **integrated into JavaScript** and many other programming languages.
    
    The **JSON.parse()** method converts JSON text into JavaScript values.
    
    The **JSON.stringify()** method converts a JavaScript value into JSON text.
    
    JSON syntax is based on JavaScript object syntax.
    
    # The JSON.parse() Method
    
    The **JSON.parse()** method converts JSON text into a JavaScript value.
    
    After parsing, the value can be used like any other JavaScript value.
    
    # The JSON.stringify() Method
    
    The **JSON.stringify()** method **converts** a JavaScript **value into JSON text**.
    
    JavaScript variables must be converted to plain text before they can be:
    
    - Sent to a server over HTTP
    - Transmitted between applications
    - Stored in a text file
    
    ---
    
    </aside>