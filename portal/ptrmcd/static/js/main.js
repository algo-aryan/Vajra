$(document).ready(function(){
	$('.tcg-elevator').tcgElevator();
	$('.elevator').tcgElevator({
		toggleSelector: '.panel-heading',
		contentSelector: '.panel-body',
		speed: 500,
		openingSpeed: 500,
		closingSpeed: 1000,
		openClass: 'open',
		openingClass: 'opening',
		closingClass: 'closing'
	});
	var closed = true;
	$('.toggle-all').click(function(e){
		var functionToCall = closed ? 'open' : 'close';
		closed = !closed;
		$('.tcg-elevator').tcgElevator(functionToCall);
	})
})



function createSmallAlert(msg)
{
	bootbox.alert({
	    message: msg,
	    size: 'small'
	});
}

function createAlert(msg)
{
	bootbox.alert({
	    message: msg,
	    size: 'large'
	});
}

function createMediumAlert(msg)
{
	bootbox.alert({
	    message: msg,
	    size: 'medium'
	});
}

function createLargeAlert(msg)
{
	bootbox.alert({
	    message: msg.replace(/\n/g, '<br/>'),
	    size: 'large'
	});
}

$("#dobODIDatePicker").click(function(){
	  alert("The paragraph was clicked.");
	});

/*$(function() {
	$("#dob1DatePicker").datepicker({
		todayBtn : "linked",
		language : "it",
		autoclose : true,
		todayHighlight : true,
		format : 'dd/mm/yyyy',
		endDate : new Date()
	})
});*/

// Function to display a confirmation dialog using Bootbox
function confirmFox(message, callback, event) {
    event.preventDefault(); // Prevent form submission here
    
    // Validate required fields before showing the confirmation dialog
    var isValid = true;
    var firstInvalidField = null;  // This will store the first invalid field
    
    $("#ePassBookForm [required]").each(function() {
        if ($(this).val() === "") {
            isValid = false;
            $(this).addClass("is-invalid");  // Optionally add a class to highlight the empty field
            if (!firstInvalidField) {
                firstInvalidField = $(this);  // Store the first invalid field
            }
        } else {
            $(this).removeClass("is-invalid");  // Remove the highlight if the field is filled
        }
    });
	var receiptIndex = $("#receiptSectionContainer .receipt-section").length;  // Assuming you are validating the first index (0) in the form
	
    var invalidAmount = false;
	for (var index = 0; index < receiptIndex; index++) {
		
		var isMultiYearReceipt = $("input[name='ePassBookReceiptDatas[" + index + "].isForMultipleYear']:checked").val();
		
		if(isMultiYearReceipt == 'true')
		{
		    checkSumOfAmount(index);
			if ($("#amount_" + index).hasClass("is-invalid")) {
				if (!firstInvalidField) {
	                firstInvalidField = $(this);  // Store the first invalid field
	            }
	            invalidAmount = true;  // Mark as invalid if the sum is incorrect
	            break; // Exit the loop if any receipt section is invalid
	        }
		}
	}


    // If any required field is empty, show an alert, focus on the first invalid field, and stop the confirmation dialog
    if (!isValid) {
        createSmallAlert("Please fill in all required fields.");
        firstInvalidField.focus();  // Focus on the first invalid field
        return; // Stop the process if validation fails
    }
    // If any required field is empty, show an alert, focus on the first invalid field, and stop the confirmation dialog
    if (invalidAmount) {
        createSmallAlert("Invalid Amount");
        firstInvalidField.focus();  // Focus on the first invalid field
        return; // Stop the process if validation fails
    }

    // Show the confirmation dialog if all fields are valid
    bootbox.confirm({
        message: message,
        size: 'small',
        callback: function(result) {
            callback(result, event); // Pass the result (true or false) back to the callback
        }
    });
}

// Define the callback function
function conFirm(result) {
    if (result) {
        // Proceed with form submission or other actions if OK is clicked
        $("#ePassBookForm").submit();
    } else {
        // Handle the case if Cancel is clicked
     //   console.log("User canceled the action.");
    }
}

function checkSumOfAmount(index) {

	let totRow = $("#totRow_" + index).val();
	let grandTotal = 0;
	var totalSum = $("#amount_"+index).val();
	var firstInvalidAmountField = null;
    let amountField = $("#amount_"+index);

	for (let i = 0; i < totRow; i++) {
	    let amount = $("input[name='ePassBookReceiptDatas[" + index + "].multipleYearDetail[" + i + "].amount']").val();

	    if (amount !== 'undefined' && !isNaN(parseFloat(amount))) {
	        grandTotal += parseFloat(amount);
	    }
	}

	if (!isNaN(grandTotal) && grandTotal != totalSum) {
		firstInvalidAmountField = amountField;
		if (firstInvalidAmountField) {
            firstInvalidAmountField.focus();  // Focus on the first invalid amount field
        }
		$("#amount_" + index).addClass("is-invalid");
	} else {
		$("#amount_" + index).removeClass("is-invalid");
	}

}


function createSmallAlertCustom(msg, type = "warning") {
    // type can be: success, danger, warning, info, primary

    let icons = {
        success: "✅",
        danger: "❌",
        warning: "⚠️",
        info: "ℹ️",
        primary: "🔔"
    };

    let titleColors = {
        success: "text-success",
        danger: "text-danger",
        warning: "text-warning",
        info: "text-info",
        primary: "text-primary"
    };

    let icon = icons[type] || "⚠️";
    let titleColor = titleColors[type] || "text-warning";

    bootbox.alert({
        message: `
            <div class="text-center p-2">
                <h5 class="${titleColor} mb-2"></h5>
                <p class="mb-0">${msg}</p>
            </div>
        `,
        size: 'small',
        centerVertical: true,
        callback: function () {
            console.log("Alert closed");
        }
    });
}


