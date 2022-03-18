(function(global, $, d3) {
    
    //  Returns new Global Object, with 'new' an object
    var Groot = function(firstName, lastName, premier, language) {
        return new Groot.init(firstName, lastName, premier, language);   
    }
    
    // hidden within the scope of the Groot Global Function appGroot.js IIFE and never directly accessible
    const supportedLangs = ['en', 'es', 'fr'];
const premierTiers = ['basic', 'member', 'bronze','silver','gold','platinum','premier'];
    
    // logged-in addressing
    const dashboard = {
        en: 'Hello',
        es: 'Hola',
        fr: 'Salut',
    };
    
    // at login addressing
    const greetLoginFormal = {
        en: 'Greetings',
        es: 'Saludos',
        fr: 'Bonjour'
    };
    
    // logger messages
    const logMessages = {
        en: 'Logged in',
        es: 'Inició sesión',
        fr: 'Connecté'

    };
     


    // prototype holds methods (to save memory space)
    Groot.prototype = {
        
        // 'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstName + ' ' + this.lastName;   
        },
        
        validate: function() {
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
             if (supportedLangs.indexOf(this.language)  === -1) {
                throw "Invalid language";   
             }
        },
        
        membership: function() {
            // check that if Premier Token Watch Subsription
            // references the externally inaccessible 'premier' within the closure
             if ((premierTiers.indexOf(this.premier)  === -1) || (this.premier ==='basic')) {
                premier:true
                throw "not a member";   
             }
        },

        // retrieve messages from object by referring to properties using [] syntax
        greetDashboard: function() {
            return dashboard[this.language] + ' ' + this.firstName + '!';
        },
        
        greetLogin: function() {
            return greetLoginFormal[this.language] + ', ' + this.fullName();  
        },
        
        // chainable methods return their own containing object
        greet: function(formal) {
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.greetLogin();  
            }
            else {
                msg = this.greetDashboard();  
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName()); 
            }
            
            // make chainable like D3
            return this;
        },
                            
        setLang: function(lang) { 
            // set the language
            this.language = lang; 

            // validate
            this.validate(); 

            // make chainable
            return this;
        },
        
        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';   
            }
             if (!d3) {
                throw 'd3 not loaded';   
            }
            if (!selector) {
                throw 'Missing jQuery selector';   
            }
            
            // determine the message
            let msg;
            if (formal) {
                msg = this.greetLogin();   
            }
            else {
                msg = this.greetDashboard();   
            }
            
            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            
            // make chainable
            return this;
        }
        
    };
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Groot.init = function(firstName, lastName, premier, language) {
        
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.premier = premier || 'basic';
        self.language = language || 'en';
        
        self.validate();
        
    }
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Groot.init.prototype = Groot.prototype;
    
    // attach GROOT APP to the global object, and provide a shorthand '$G3'  
    global.Groot = global.$G3 = Groot;
    
}(window, jQuery, d3));