var g = G$('john', 'doe');


// listen for the login button click using jQuery
$('#login').click(function () {

    // create a new 'Greetr' obj, could use a form or DB to get the name
    // but to demo the framework it will just hard code it
    var loginGrtr = G$('John', 'Doe');

    // hide the login on the screen to make things look nice
    $('#logindiv').hide();

    // run HTML greeting, passing the '#greeting' as the selector and the 
    // chosen language and log the welcome as well
    // also, notice the chaining of methods that enabled by returning 
    // 'this' in the methods
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});

