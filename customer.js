document.getElementById('customer-form').onsubmit = function(event) {
    event.preventDefault(); 

    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    
    // Get the selected value of the diet radio buttons
    var dietInputs = document.getElementsByName('diet');
    var diet;
    for (var i = 0; i < dietInputs.length; i++) {
        if (dietInputs[i].checked) {
            diet = dietInputs[i].value;
            break;
        }
    }

    var name = nameInput.value;
    var email = emailInput.value;

    if (name.trim() === '' && email.trim() === '') {
        alert('Please fill out both name and email fields.');
        return;
    }

    if (name.trim() === '') {
        alert('Please enter your name.');
        return;
    }

    if (email.trim() === '') {
        alert('Please enter your email.');
        return;
    }

    var preferences = {
        name: name,
        email: email,
        diet: diet
    };

    localStorage.setItem('dietPreference', preferences.diet);

    console.log('Customer preferences saved:', preferences);
    alert('Saved!'); 
};

function openNav() {
    document.getElementById("side-menu").style.width = "250px";
}

function closeNav() {
    document.getElementById("side-menu").style.width = "0";
}
