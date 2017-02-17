$(document).ready(function(){

    $('#submit-button').click(formSubmit);

});

function formSubmit(e) {
    var formData = getFormValues();

    console.log(formData);

    // Add better form validation later
    // also better alert box/modal
    var formOk = validateForm(formData);
    if (!formOk.status){
        alert(formOk.message);
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/api/buyerInfo",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            
            console.log(data);
            
        },
        error: function(err){
            console.log(err);
        }
    });

    
    return false;

}

function getFormValues() {
    
    // Required elements
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var email = $('#email-address').val();
    var phone = $('#phone-number').val();

    var usePhone = checkChecked('use-phone');
    var useText = checkChecked('use-text');
    var useEmail = checkChecked('use-email');
    var useOther = checkChecked('use-other');

    var contactTime = $('#contact-time').val();
    var spouseName = $('#spouse-name').val();

    var personality = $('input[name=personality]:checked').val();

    var mostImportant = $('#most-important').val();
    var needs = $('#needs').val();
    var wants = $('#wants').val();
    var hoods = $('#hoods').val();
    var parameters = $('#parameters').val();

    var howLongLooking = $('input[name=how-long-looking]:checked').val();
    var howLongLookingOther = $('#other-how-long-looking').val();

    var searchTechnique = $('input[name=search-techniques]:checked').val();
    var searchTechniqueOther = $('#other-search-techniques').val();

    var homeCount = $('input[name=home-count]:checked').val();

    var liveNow = $('#live-now').val();
    var rentOwn = $('input[name=rent-own]:checked').val();
    var residencePlan = $('input[name=residence-plan]:checked').val();

    var officeMeeting = $('#office-meeting').val();
    var propertyLooks = $('#property-looks').val();



    var formValues = {
        FirstName: firstName,
        LastName: lastName,
        Phone: phone,
        Email: email,
        UsePhone: usePhone,
        UseText: useText,
        UseEmail: useEmail,
        UseOther: useOther,
        ContactTime: contactTime,
        SpouseName: spouseName,
        Personality: personality,
        MostImportant: mostImportant,
        Needs: needs,
        Wants: wants,
        Neighborhoods: hoods,
        Parameters: parameters,
        HowLongLooking: howLongLooking,
        HowLongLookingOther: howLongLookingOther,
        SearchTechnique: searchTechnique,
        SearchTechniqueOther: searchTechniqueOther,
        HomeCount: homeCount,
        LiveNow: liveNow,
        RentOwn: rentOwn,
        ResidencePlan: residencePlan,
        OfficeMeeting: officeMeeting,
        PropertyLooks: propertyLooks
    }

    return formValues;
    
}

function validateForm(formData){
    fnOk = formData.FirstName.length > 0;
    lnOk = formData.LastName.length > 0;
    emailOk = formData.Email.length > 0;
    phoneOk = formData.Phone.length > 0;

    var retVal = {};
    var message = "Please provide your ";
    if(!fnOk){
        retVal = {
            status: false,
            message: message + "first name"
        }
        return retVal;
    }

    if(!lnOk){
        retVal = {
            status: false,
            message: message + "last name"
        }
        return retVal;
    }

    if(!emailOk){
        retVal = {
            status: false,
            message: message + "email address"
        }
        return retVal;
    }

    if(!phoneOk){
        retVal = {
            status: false,
            message: message + "phone number"
        }
        return retVal;
    }

    return {status: true};
}

function checkChecked(elem){
    return $('#' + elem).is(':checked');
}