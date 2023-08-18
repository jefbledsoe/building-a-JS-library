// Library created following the "JavaScript: Understanding the Weird Parts" Udemy course

// IIFE FN to make it safe and non confrontational
// putting a semicolon in front of the IIFE is a safety net to prevent
// any preceeding code from running your code unintentionally or causing
// errors if the preceeding code is missing a semicolon
;(function (global, $) {
  var Greetr = function (firstName, lastName, language) {
    // return a function constructor so we dont have to continue to use the 'new'
    return new Greetr.init(firstName, lastName, language);
  };

  // due to closures the obj will still have access to this variable after its ran
  // the array isnt exposed to anyone b/c its not part of a method or property
  // so this is safe and hidden code because its lexical environment is the library obj
  var supportedLangs = ["en", "es"];

  // setting up greetings that are needed but imutable to other developers
  var greetings = {
    en: "Hello",
    es: "Hola",
  };

  var formalGreetings = {
    en: "Greetings",
    es: "Saludos",
  };

  var logMessages = {
    en: "Logged in",
    es: "Inicio sesion",
  };

  

  // creating the prototype obj ` ${} ${}`
  Greetr.prototype = {
    fullName: function () {
        // 'this' refers to the calling obj at execution time
      return ` ${this.firstName} ${this.lastName}`;
    },
    validate: function () {
      // indexof returns -1 if not found, if found a 0 or a 1
      if (supportedLangs.indexOf(this.language) === -1) {
        // error if its not a language we have set up yet
        throw "Invalid Language";
      }
    },
    greeting: function () {
      // returns an informal greeting by accessing the language property on this/the prototype
      // plus some string concatination
      return ` ${greetings[this.language]} ${this.firstName}!`; 
    },
    formalGreeting: function () {
        return ` ${formalGreetings[this.language]} ${this.fullName()}!`;
    },
    greet: function (formal) {
      // initializing message holder
      var msg;

      // if undefined or null it will be coerced to a false boolean
      // returns the appropriate greeting the FN if formal or not
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      // if the console exists/ is accessabel log the message
      if (console) {
        console.log(msg);
      }

      // 'this' will be the obj that calls the method at execution time
      // and is what makes the method chaninable, meaning you can call other methods on
      // directly after this in the lexical code Env and that new method will be
      // executed on the new/updated obj
      return this;
    },
    log: function () {
      if (console) {
        console.log(`${logMessages[this.language]} ${this.fullName()}`);
      }
      // 'this' will be the obj that calls the method at execution time
      // and is what makes the method chaninable, meaning you can call other methods on
      // directly after this in the lexical code Env and that new method will be
      // executed on the new/updated obj
      return this;
    },
    setLang: function (lang) {
      // updated the language of the the object
      this.language = lang;

      // make sure its a language that is availible, else throw error
      this.validate();

      // 'this' will be the obj that calls the method at execution time
      // and is what makes the method chaninable, meaning you can call other methods on
      // directly after this in the lexical code Env and that new method will be
      // executed on the new/updated obj
      return this;
    },
    HTMLGreeting: function (selector, formal) {
      // if jquery is not loaded throw an error
      if (!$) {
        throw "jQuery not loaded";
      }

      // if no selector is given throw an error
      if (!selector) {
        throw "Missing jQuery selector";
      }

      // determine the message
      var msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      // inject the message in the chosen place in the DOM
      $(selector).html(msg);

      // 'this' will be the obj that calls the method at execution time
      // and is what makes the method chaninable, meaning you can call other methods on
      // directly after this in the lexical code Env and that new method will be
      // executed on the new/updated obj
      return this;
    },
  };

  //obj declaration
  Greetr.init = function (firstName, lastName, language) {
    // so there is no confusion or conflicts of what is ref-ing what
    var self = this;

    // default values in case user leaves something out
    self.firstName = firstName || "";
    self.lastName = lastName || "";
    self.language = language || "en";

    // validate that the language is one we have set up
    self.validate();
  };

  // any obj created from Greetr.init FN constructor will point to Greetr.init.prototype
  // instead we want the new obj prototype to point at the Greetr.prototype over the
  // prototype of the anonymous FN that Greetr returns
  Greetr.init.prototype = Greetr.prototype;

  //now, expose the Greetr obj to the global env and give it an alias
  // use the = operator and its right to left associativity to assign Greetr obj ref to
  // also be pointed at global.G$, to be ref-ed as G$ to invoke it. Next also assign
  // that ref to the global.Greetr to be and invokable method.
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
