function onlyNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 32 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

function calculateAge(birthDateObj, format, delimiter, ageSetID){
	var today = new Date();
    var birthDate = stringToDate(birthDateObj.value, format, delimiter);
    //alert("today : "+today);
    //alert("birthDate : "+birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById(ageSetID).value = age;
}

function stringToDate(_date,_format,_delimiter){
	var formatLowerCase=_format.toLowerCase();
	var formatItems=formatLowerCase.split(_delimiter);
	var dateItems=_date.split(_delimiter);
	var monthIndex=formatItems.indexOf("mm");
	var dayIndex=formatItems.indexOf("dd");
	var yearIndex=formatItems.indexOf("yyyy");
	var month=parseInt(dateItems[monthIndex]);
	month-=1;
	var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
	return formatedDate;
}


function alphaWithNumeric(e) {

	var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k==32 || (k >46 && k < 58) );
	
}

function alpha(e) {
	/*var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k==46 || k==32);*/
	onlyABCD(e);
	}

function alphaWithPlusMinus(e) {
	var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k==46 || k==32 || k==241);
	}



function onlyNumbers(evt)
{
	
	 if(window.event){ // IE
		var charCode = event.keyCode;
	} else  { // Safari 4, Firefox 3.0.4
		var charCode = evt.which;
	}
	
    if (charCode > 31 && (charCode < 46 || charCode > 57 || charCode==47|| charCode==32 || charCode==46))
	return false;
	

	return true;
}

function onlyNumbersNoPeriod(evt)
{
	
	//var e = event || evt; // for trans-browser compatibility
	if(window.event){ // IE
		var charCode = event.keyCode;
	} else  { // Safari 4, Firefox 3.0.4
		var charCode = evt.which;
	}
	if (charCode > 31 && (charCode <= 46 || charCode > 57))
	return false;

	return true;
}

function alphaWithDot(e) {
	var charCode;
	document.all ? charCode = e.keyCode : charCode = e.which;	
	if(charCode==46)
		return true;
	if (charCode > 32 && (charCode < 65 || charCode > 90)&& (charCode < 97 || charCode > 122))
		return false;
	
	return true;
}


function onlyWords(evt) // with dot allowed
{ 
	//var e = event || evt; // for trans-browser compatibility
	if(window.event){ // IE
		var charCode = event.keyCode;
	} else  { // Safari 4, Firefox 3.0.4
		var charCode = evt.which;
	}
	
  if (charCode >32 && (charCode < 97 || charCode > 122) && charCode!=46)
   return false;
 
  if(charCode==32 || 46 ||(charCode > 64 && charCode < 91))
	return true;
 
 return true;
  
  }

function onlyCapAlphaWithNumbers(evt)
{
	
	 if(window.event){ // IE
		var charCode = event.keyCode;
	} else  { // Safari 4, Firefox 3.0.4
		var charCode = evt.which;
	}
	
    if ((charCode >= 65 &&  charCode <= 90) || (charCode >= 48  && charCode <= 57 )  ){
    	return true;
    }
	
	

	return false;
}


function onlyNumbersWithPeriod(evt)
{
	
	 if(window.event){ // IE
		var charCode = event.keyCode;
	} else  { // Safari 4, Firefox 3.0.4
		var charCode = evt.which;
	}
	
    if (charCode > 31 && (charCode < 46 || charCode > 57 || charCode==47|| charCode==32))
	return false;
	

	return true;
}


function onlyNumbersWithDash(evt)
{
	 if(window.event){ // IE
		var charCode = event.keyCode;
	} else  { // Safari 4, Firefox 3.0.4
		var charCode = evt.which;
	}
	console.log(charCode)
 if ((charCode >= 48 &&  charCode <= 57) || (charCode >= 96  && charCode <= 105 ) || (charCode==45)  ){
    	return true;
    }
	
	

	return false;
}


function alphaWithSpace(evt) // with Space allowed Only
{ 
	//var e = event || evt; // for trans-browser compatibility
	if(window.event){ // IE
		var charCode = event.keyCode;
	} else  { // Safari 4, Firefox 3.0.4
		var charCode = evt.which;
	}
	
	var startPos = evt.currentTarget.selectionStart;
	
  if ((charCode != 32 && charCode < 65) || ((charCode > 90 && charCode < 97) || charCode > 122))
   return false;
 
  if (charCode === 32 && startPos==0)
   return false;
  
  if (charCode==32 || (charCode > 64 && charCode < 91))
	return true;

	var inputValue = evt.currentTarget.value;
  	// Prevent consecutive spaces
	if (charCode === 32 && inputValue[startPos - 1] === ' ') {
	    return false;
	}
	
	// Check if the input already has multiple consecutive spaces (this happens after a key is pressed)
    var cleanedValue = inputValue.replace(/\s+/g, ' ');  // Replace multiple spaces with a single space
    
    // If the value has multiple spaces, don't allow the input to be updated
    if (cleanedValue !== inputValue) {
        evt.currentTarget.value = cleanedValue; // Remove excess spaces immediately
        return false;
    }
 
 return true;
  
  }

function alphaWithNumericAndHyphen(e) {
	var keyCode = e.which;
	var inputValue = e.target.value;
	
	if( (keyCode === 32 || keyCode==45 || keyCode==47 ) && e.target.selectionStart === 0 ){
        e.preventDefault();
    }

    // Check if the key pressed is a space, slash, or hyphen
    if ((keyCode === 32 || keyCode === 47 || keyCode === 45) && inputValue.length > 0) {
        var lastChar = inputValue.slice(-1);

        // Check if the last character is also a space, slash, or hyphen
        if (lastChar === ' ' || lastChar === '/' || lastChar === '-'|| lastChar === ',') {
            e.preventDefault();
            return false;
        }
    }
	
	var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k==32 || (k >46 && k < 58) || k==44 || k==45 || k==47);
	
}

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}



