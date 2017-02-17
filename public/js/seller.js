$(document).ready(function(){

    $('#submit-button').click(formSubmit);

});


function formSubmit(e){
    var formData = getFormValues();
    console.log(formData);
    
    var formOk = validateForm(formData);
    if(!formOk){
        alert('The form did not validate');
        return;
    }

    $.ajax({
        type: "POST",
        url: "/api/sellerInfo",
        data: JSON.stringify(formData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            
            console.log(data);

            $('#form-content').empty();
            $('#thanks').removeClass('hidden');
            
        },
        error: function(err){
            console.log(err);
        }
    });

    return false;
}



function getFormValues() {
    
    // Required elements
    var address = $('#address').val();
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var email = $('#email-address').val();
    var phone = $('#phone-number').val();

    var usePhone = checkChecked('use-phone');
    var useText = checkChecked('use-text');
    var useEmail = checkChecked('use-email');
    var useOther = checkChecked('use-other');

    var mostImportant = $('#most-important').val();
    var motivating = $('#motivating').val();
    var settled = $('input[name=settled]:checked').val();
    var personality = $('input[name=personality]:checked').val();

    var sellingFeatures = $('#selling-features').val();
    var haveAppraisal = $('input[name=have-appraisal]:checked').val();

    var priceRange = $('#price-range').val();
    var moreInfo = $('#more-info').val();


    var formValues = {
        Address: address,
        FirstName: firstName,
        LastName: lastName,
        Phone: phone,
        Email: email,
        UsePhone: usePhone,
        UseText: useText,
        UseEmail: useEmail,
        UseOther: useOther,
        MostImportant: mostImportant,
        Motivating: motivating,
        Settled: settled,
        Personality: personality,
        SellingFeatures: sellingFeatures,
        HaveAppraisal: haveAppraisal,
        PriceRange: priceRange,
        MoreInfo: moreInfo
    }

    return formValues;
    
}

function validateForm(formData){
    return true;
}


function checkChecked(elem){
    return $('#' + elem).is(':checked');
}
