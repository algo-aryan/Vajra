var PROP_RESIDENTIAL_CATEGORY = $("#PROP_RESIDENTIAL_CATEGORY").val();
var PROP_VACANT_CATEGORY = $("#PROP_VACANT_CATEGORY").val();
var newActonType = $('#actionTypeID').val();
const propertyVacantMasterMap = new Map([
  ['MST_PROPERTY_VACANT_LAND_FLOOR', 'floorID'],
  ['MST_PROPERTY_VACANT_LAND_AGE_FACTOR', 'ageFactorID'],
  ['MST_PROPERTY_VACANT_LAND_STRUCTURE_FACTOR', 'structureFactorID'],
]);

const propertyVacantMasterMapForOthers = new Map([
  ['MST_PROPERTY_FLOOR', 'floorID'],
  ['MST_PROPERTY_AGE_FACTOR', 'ageFactorID'],
  ['MST_PROPERTY_STRUCTURE_FACTOR', 'structureFactorID'],
]);

const commercialPropertyCategoryCodes = [
   "50001"
];

$(document).ready(
		function() {
			
			var selVal = $('#stateIDSelect').find('option:selected').val();
			/*
			 * var ownerCategory = $("#ownerCategoryIDSelect").val(); var
			 * ownerType = $("#ownerTypeIDSelect").val(); var propertyCategory =
			 * $("#propertyCategoryIDSelect").val(); var propertyType =
			 * $("#propertyTypeIDSelect").val(); //alert(ownerCategory);
			 * if(ownerCategory!= '' && ownerCategory!= 'CHOOSE' &&
			 * ownerCategory != null) {
			 * //onChangeOwnershipCategory(ownerCategory, ownerType); }
			 */

			// alert($("#taxDetailsLengthID").val());
			previousCatgValue = $('#colonyCatgID').val();
			previousUavValue = $('#colonyUavId').val();

			if ($("#taxDetailsLengthID").val() != '-1') {
				$("#noOfFloors").val($("#taxDetailsLengthID").val());
			}

			onStateChangePopulateDistrictOptionByValue(selVal,
					'districtIDSelect');
			var actionType = $('#actionTypeID').val();
			if(actionType != null){
				checkPercentageOfCoveredArea();
			}
			// validateOwnerFormOnPageLoad();
			// elementHideAndShow(document.getElementById("propertyCategoryIDSelect"));
			var element = document.getElementById("propertyCategoryIDSelect");
			if (element != null && element.options[element.selectedIndex].text == 'VACANT LAND') {
				/*
				 * $("#noOfFloorDivID").hide();
				 * $('[id^="taxFactorselecterId"]').hide();
				 * $("#vacantCoverdAreaId").removeAttr("required");
				 */
				disableField('vacantCoverdAreaId');
				// $('#sectionDescID0').val('');
				$('#sectionDescID0').prop('readonly', 'readonly');
				// $('#coveredAreaID0').val('0.0');
				$('#coveredAreaID0').prop('readonly', 'readonly');
				$('#addSectionID0').prop('disabled', 'disabled');
				$('#down').prop('disabled', 'disabled');
			}
			if(actionType != null && actionType != 'update' && actionType != 'create' ){
				plotHouseFlatFarmSelection();
			}
			sectorPhaseSelection();
			laneStreetSelection();
			var element = $("#vacantLandExemptionIDSelect");
			if (element.val() == '') {
				dynamicSelectBasedOnText("vacantLandExemptionIDSelect",
						"NO EXEMPTION");
				select2Refresh();
			}

			var element = $("#exemptionID0Select");
			if (element.val() == '' || element.val() == '0') {
				dynamicSelectBasedOnText("exemptionID0Select", "NO EXEMPTION");
				dynamicSelectBasedOnText("vacantLandExemptionIDSelect",
						"NO EXEMPTION");
				select2Refresh();
			}

			/*
			 * var vacanLandId =
			 * document.getElementById("propertyTypeIDSelect"); if(vacanLandId !=
			 * null){ fetchCodeByGuid(vacanLandId); }
			 */

			

		});
$(document).ready(
		function() {
			updateHiddenInputValues();
			if (actionType == "update" || actionType == "create") {
				hideShowNextButton(true);
				$("input:radio[name=plotHouseFlatFarmRdoBtn]").attr("disabled",false);
				$("#colonyIDSelect").trigger("change");
			}
			if( actionType != null && actionType != "createupic"  ){
				disableVacantLandForFlats();
				if(parseInt($("#ownerListSizeId").val()) >0){
					hideOwnerDetail(true);
				}
				
			}
		if (actionType == "pay-tax") {
			console.log("pay-tax");
						if ($("#colonyOptionsUpdated").val() == 'YES') {
							$('#frmID input').attr('readonly', 'readonly');
							$('option:not(:selected)').attr('disabled', true);
							$(".showHideClass").hide();
							$("#colonyIDSelect option:not(:selected)").attr(
									'disabled', false);
							createSmallAlert("YOUR COLONY HAS BEEN DELIMITED,PLEASE SELECT BEFORE PAYMENT");
							showTab('0');
							$("#colonyIDSelect").focus();
						} else {
							
							calculateTaxNew();
							//geoTagging();
							
							
							
						}
						$("#colonyIDSelect").trigger("change");
//						$(window).on('pageshow', function(e) {
//						var usercharges_flag =$("#usercharge_ptr_flag").val();
//						if(usercharges_flag=="true"){
//							console.log("USER CHarge");
//					 		getUserChargePayment($("#upic").val(), $("#assissYear").val());
//						}});
				
			}else if(actionType == "pay-demand"){
				disableEditForCalcucation(true);
			}
			if( actionType == "createlegacy"){
				remapFactorOnForm();
			}
			if( actionType == "reviseLegacy"){
				remapFactorOnForm();
			}
			if( actionType == "demand_generate"){
				hideOwnerDetail(false);
				$("#colonyIDSelect").trigger("change");
				$("#submitID").show();
			}
			
			updateHiddenInputValues();
			
			if( actionType == "view"){
				disableAllInView();
			}
			if( actionType == "demand_generate" ){
				$(".oldPropertyDet").show();
				
				$("#frmID").attr("action","web/citizen/property/dnc/submit");
			}
			
			if( actionType == "pay-demand" ){
				showTab('2');
				$('#payTaxBtnId').prop('disabled', false);
			}
			
		var isAmnesty = $("#amnestyCode").val();
			if(isAmnesty != null){
				$("#submitID").text('SAVE AND CALCULATE');
				$("#newPayTaxBtnId").text('SAVE AND CONTINUE');
			}
			
			checkVacantLandDetails();
			checkManualCalculation();
//			editCalculateOwnerAge();
			
			// handleUserChargeAvailability();  try to implemet 
            // updateSections();
			
		});

function setDefaultValuesForFloors(counter) {
	console.log("COUNTER : " + counter);
	var element = $("#exemptionID" + counter + "Select");
	console.log("COUNTER : " + counter + ", ID :" + element.id);
	if (element.val() == '') {
		dynamicSelectBasedOnText("exemptionID" + counter + "Select",
				"NO EXEMPTION");
		select2Refresh();
	}

}

function checkDuplicatePAN(element) {
	var pan = element.value;
	if (pan != '') {

		console.log("Check Duplicate PAN");
		var tbl = document.getElementById('ownerTableGridID');
		var noOfRow = tbl.rows.length;
		console.log("No of rows : " + noOfRow);
		for (var count = 0; count < (noOfRow - 1); count++) {
			// console.log(document.getElementById('ownerTableGridID').rows[count].cells[8].innerHTML);
			var id = 'panNoTblId' + count;
			var pan_num = document.getElementById(id).value;

			// alert('pan_num'+pan_num);

			// console.log("ID : "+id);
			if (pan_num != '' || pan_num != "" || pan_num != null) {

				if (pan == pan_num) {
					createSmallAlert("PAN NUMBER ALREADY IN USE");
					element.value = "";
				}
				// console.log("PAN VALUE :
				// "+document.getElementById(id).value);
			}

		}

	}

}

var num;

function addFloor(obj) {
	num = obj.value;
	if (num != null && num != 0) {
		$.ajax({
			type : "GET",
			url : "web/citizen/property/doGetTaxPanel?fn="
					+ num
					+ "&pc="
					+ $("#propertyCategoryIDSelect").find('option:selected')
							.val(),
			cache : false,
			async : true,
			beforeSend : function() {
				$("#overlay").show();
			},
			success : function(data, status, xhr) {
				// createSmallAlert(data);
				// (data);
				$("#multipleFloorID").empty();
				$("#multipleFloorID").html(data);
				$("#overlay").hide();
			},
			error : function(e) {

			},
			complete : function() {
				$("#overlay").hide();
				select2Refresh();
			}
		});
	} else {

		if (num == 0 || num == '') {
			$('[id^="taxFactorselecterId"]').hide();
		}

		$("#noOfFloorID").val('');
		createSmallAlert("NOT VALID FLOOR NUMBER");

	}
}

function proprtyTypeOnChangeSectionCatg(e, index, value, setValue) {
	var sectionIndex="";
	var selectedValue="";
	var prop_type_residential = $("#PROP_TYPE_RESIDENTIAL").val();
	var checked = $("#flatOptionCheckBox").is(":checked");
	
	if(typeof index=="undefined"){
		sectionIndex = e.id.match(/\d+/)[0];
		selectedValue = e.value;
	}else{
		sectionIndex=index;
		selectedValue=value;
	}
	if (selectedValue != 0 && selectedValue != '') {
		$.getJSON("web/citizen/property/option?optionType=MST_PROPERTY_TYPE&filterValue="+ selectedValue,function(data, status) {
							$('#sectionpropertyTypeID' + sectionIndex+ 'Select').empty();
							$('#propertyType' + sectionIndex + 'IDSelect').append($("<option></option>").attr("value", "").text("CHOOSE"));
							// var propertyId = 'propertyTypeIDSelect';
							var propertyId = '';
							if ($('#noOfFloors').val() != -1) {
								propertyId = 'propertyTypeID' + sectionIndex+ 'Select';
							}
							console.log("data length : " + data.length);
							$('#' + propertyId).empty();
							$('#' + propertyId).append(
									$("<option></option>").attr({
										value : 0,
										selected : 'selected'
									}).text("Select Property Type"));
							for (var i = 0; i < data.length; i++) {
								
								
								if(data[i].optionCode == prop_type_residential && checked == true){  
								
							}else{															
									$('#' + propertyId).append(
											$("<option></option>").attr({
													value:data[i].optionGuid
													}).text(
													data[i].optionValue));
									if(data[i].optionGuid==setValue) $('#' + propertyId+' option[value="'+data[i].optionGuid+'"]').attr("selected", "selected");
							
							}
							}
							// if($('#noOfFloorID').length)
							// {
							/*
							 * for (j =$('#noOfFloors').val() ; j <=
							 * $('#noOfFloors').val(); j++) { //
							 * propertyTypeID0Select
							 * 
							 * $('#propertyTypeID' + j + 'Select').empty();
							 * $('#useFactorID' + j + 'Select').empty();
							 * $('#propertyTypeID' + j + 'Select').append( $("<option></option>").attr("value",
							 * "").text( "CHOOSE")); for (var i = 0; i <
							 * data.length; i++) { $('#propertyTypeID' + j +
							 * 'Select').append( $("<option></option>").attr("value",
							 * data[i].optionGuid).text( data[i].optionValue)); }
							 *  }
							 */

							// }
						});
	}
	
	if ($("#"+selectedValue).val()==$("#vacantLandWithSectionPropertyCode").val()) {
		for (let [key, value] of propertyVacantMasterMap) {
			showhideForVacantLandAddSection(key, value, sectionIndex,true);
		}
	}else{
		
		if($("#previousValueForChangeOption").val()==$("#vacantLandWithSectionPropertyCode").val()){
			for (let [key, value] of propertyVacantMasterMapForOthers) {
			showhideForVacantLandAddSection(key, value, sectionIndex,false);
			}
			
		}
		
		
		
	}
	
	
	
}

/*
 * function addSections(obj) { Console.log("Add Section Called."); num =
 * obj.value; if (num != null && num != 0) { $.ajax({ type : "GET", url :
 * "web/citizen/property/doGetTaxPanel?fn=" +
 * num+"&pc="+$("#propertyCategoryIDSelect").find('option:selected').val(),
 * cache : false, async : true, beforeSend : function() {
 *  }, success : function(data, status, xhr) {
 * 
 * $("#multipleFloorID").empty(); $("#multipleFloorID").html(data); }, error :
 * function(e) {
 *  }, complete : function() { select2Refresh(); } }); } else {
 * 
 * if(num == 0 || num == '') { $('[id^="taxFactorselecterId"]').hide(); }
 * 
 * $("#noOfFloorID").val(''); createSmallAlert("NOT VALID FLOOR NUMBER");
 *  } }
 */

function hideAddBtnOnPrevsPnl(curntFloorNo) {

	var preFloorNo = Number(curntFloorNo);
	console.log("In hideAddBtnOnPrevsPnl : " + preFloorNo);
	if (preFloorNo != 0) {
		preFloorNo = preFloorNo - 1;
		// $("#addSectionID"+preFloorNo).hide();
//		$("#noOfFloorDivID" + preFloorNo).hide();
		$("#addSectionID" + preFloorNo).hide();
		
	} else {

		 $("#addSectionID0").hide();
//		$("#noOfFloorDivID0").hide();
	}

}

function showAddBtnOnPrevsPnl(curntFloorNo) {

	var preFloorNo = Number(curntFloorNo);
	console.log("In showAddBtnOnPrevsPnl : " + preFloorNo);
	if (preFloorNo != 0) {
		// preFloorNo=preFloorNo;
		console
				.log("In IF of showAddBtnOnPrevsPnl noOfFloorDivID"
						+ preFloorNo);
		// $("#noOfFloorDivID"+preFloorNo).show();
		// document.getElementById("noOfFloorDivID"+preFloorNo).style.display =
		// "display";
		// document.getElementById("noOfFloorDivID"+preFloorNo).removeAttr('style');
		$("#noOfFloorDivID" + preFloorNo).removeAttr('style');
	} else {

		$("#noOfFloorDivID0").show();
		// document.getElementById("noOfFloorDivID0").style.display = "display";
	}

}

function validateFloorSection(num) {
	errorMsgFloorSection = "" ;
	blankfieldsFloorSection = 0;
	
	console.log("ELEMENT : " + element);

    var element = document.getElementById("floorID"+num+"Select");
	
	
	var paintNode = document.getElementById("select2-floorID" + num + "Select-container");
	if (element != null) {
		if (element.selectedIndex == 0 || element.value == 'CHOOSE' || element.value == 'Select Constructed Section/Floor') {
			blankfieldsFloorSection = 1;
			setErrorColor(paintNode.parentNode);
			errorMsgFloorSection = errorMsgFloorSection + "\n * Floor ";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
	}

	var element = document.getElementById("coveredAreaID"+num);
	console.log("ELEMENT : " + element);
	if (element != null && element.value == "") {

		blankfieldsFloorSection = 1;
		setErrorColor(element);
		errorMsgFloorSection = errorMsgFloorSection + "\n * Covered Area of floor/section";
		if (setFocus == 0) {
			setFocus = 1;
			element.focus();
		}

	} else {

		setSuccessColor(element);
	}
	
	var element = document.getElementById("useFactorID" + num + "Select");
	var paintNode = document.getElementById("select2-useFactorID" + num
			+ "Select-container");
	if (element != null) {
		if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
			blankfieldsFloorSection = 1;
			setErrorColor(paintNode.parentNode);
			errorMsgFloorSection = errorMsgFloorSection + "\n * Use Factor ";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
	}
	
	
	var element = document.getElementById("structureFactorID" + num
			+ "Select");
	var paintNode = document.getElementById("select2-structureFactorID"
			+ num + "Select-container");
	if (element != null) {
		if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
			blankfieldsFloorSection = 1;
			setErrorColor(paintNode.parentNode);
			errorMsgFloorSection = errorMsgFloorSection + "\n * Structure Factor ";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
	}
	var element = document.getElementById("occupancyFactorID" + num
			+ "Select");
	var paintNode = document.getElementById("select2-occupancyFactorID"
			+ num + "Select-container");
	if (element != null) {
		if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
			blankfieldsFloorSection = 1;
			setErrorColor(paintNode.parentNode);
			errorMsgFloorSection = errorMsgFloorSection + "\n * Occupancy Factor ";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
	}
	var element = document.getElementById("ageFactorID" + num + "Select");
	var paintNode = document.getElementById("select2-ageFactorID" + num
			+ "Select-container");
	if (element != null) {
		if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
			blankfieldsFloorSection = 1;
			setErrorColor(paintNode.parentNode);
			errorMsgFloorSection = errorMsgFloorSection + "\n * Age Factor ";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
	}

	var element = document.getElementById("sectionPropertyCategoryID" + num
			+ "Select");
	var paintNode = document
			.getElementById("select2-sectionPropertyCategoryID" + num
					+ "Select-container");

	if (element != null) {
		if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
			blankfieldsFloorSection = 1;
			setErrorColor(paintNode.parentNode);
			errorMsgFloorSection = errorMsgFloorSection + "\n * Floor/Section Property Category  ";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
	}

	 var element = document.getElementById("exemptionID" + num +"Select");
	 var paintNode = document.getElementById("select2-exemptionID" + num+ "Select-container");
	 if (element != null) {
	 /*if (element.selectedIndex == 0 || element.value == 'CHOOSE' || element.value == 'Select Exemption') {
		 blankfieldsFloorSection=1;
	 setErrorColor(paintNode.parentNode);
	 errorMsgFloorSection = errorMsgFloorSection + "\n * Exemption   ";
		if (setFocus == 0) {
			setFocus = 1;
			element.focus();
		}
	 } else {
	 setSuccessColor(paintNode.parentNode);
	 }*/
	 }

	var element = document
			.getElementById("propertyTypeID" + num + "Select");
	var paintNode = document.getElementById("select2-propertyTypeID" + num
			+ "Select-container");
	if (element != null) {
		if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
			blankfieldsFloorSection = 1;
			setErrorColor(paintNode.parentNode);
			errorMsgFloorSection = errorMsgFloorSection + "\n * Floor/Section Property Type   ";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
	}
	
/*	var element = document.getElementById("caNumberID"+num);
	console.log("ELEMENT : " + element);
	if (element != null && element.value == "") {

		blankfieldsFloorSection = 1;
		setErrorColor(element);
		errorMsgFloorSection = errorMsgFloorSection + "\n * CA Number";
		if (setFocus == 0) {
			setFocus = 1;
			element.focus();
		}

	} else {

		setSuccessColor(element);
	}
	*/
	/*var element = document
			.getElementById("discomID" + num + "Select");
	var paintNode = document.getElementById("select2-discomID" + num
			+ "Select-container");
	if (element != null) {
		if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
			blankfieldsFloorSection = 1;
			setErrorColor(paintNode.parentNode);
			errorMsgFloorSection = errorMsgFloorSection + "\n * Select Discom   ";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
	}*/
	
	/*var element = document.getElementById("ownerNameID"+num);
	console.log("ELEMENT : " + element);
	if (element != null && element.value == "") {

		blankfieldsFloorSection = 1;
		setErrorColor(element);
		errorMsgFloorSection = errorMsgFloorSection + "\n *Please verify CA Number";
		if (setFocus == 0) {
			setFocus = 1;
			element.focus();
		}

	} else {

		setSuccessColor(element);
	}*/

	
	if (blankfieldsFloorSection > 0) {
		if (errorMsgFloorSection != '') {

			var item = "Please fill the following detail :\n" + errorMsgFloorSection + "\n";
			alert(item);
			showTab('0');

		}

		return false;
	} else {
		return true;
	}
}


function addSection() {

	var num = Number($("#noOfFloors").val());
	var flagFloor = false;
	
	flagFloor =  validateFloorSection(num);
	
	console.log("Total No of floors : " + num);
	num = num + 1;
	
	if(flagFloor == true){
		
	
	if (num != null && num != 0 ) {

		$.ajax({
			type : "GET",
			url : "web/citizen/property/doGetTaxPanel?fn=" + num,
			cache : false,
			async : true,
			beforeSend : function() {
				$("#overlay").show();
			},
			success : function(data, status, xhr) {
				// createSmallAlert(data);
				// (data);
				// $("#multipleFloorID").empty();
				// $("#multipleFloorID").html(data);
				$("#multipleFloorID").append(data);

				$("#noOfFloors").val(num);
//				hideAddBtnOnPrevsPnl(num);
				setDefaultValuesForFloors(num);
				if($("#"+$("#propertyCategoryIDSelect").val()).val()== $("#vacantLandWithSectionPropertyCode").val()){
					for (let [key, value] of propertyVacantMasterMap) {
						showhideForVacantLandAddSection(key, value, num,true);
					}
				}
				console.log("Total Number Of Floors : "
						+ $("#noOfFloors").val());
				$("#overlay").hide();
			},
			error : function(e) {

			},
			complete : function() {
				$("#overlay").hide();
				select2Refresh();
			}
		});
	} else {
         
		if (num == 0 || num == '') {
			$('[id^="taxFactorselecterId"]').hide();
		}

		$("#noOfFloorID").val('');
		createSmallAlert("NOT VALID FLOOR NUMBER");

	}
	
	}
}

function removeSection(rowNum) {
	var lastFloorNo = Number($("#noOfFloors").val());
	console.log("lastFloorNo before remove: " + lastFloorNo);
	console.log("floorId: " + $("#floorID"+rowNum+"Select").val());
	
	if (lastFloorNo != 0) {
		// alert("Section Remove."+lastFloorNo);
		// console.log($("#floorNoId").val(lastFloorNo));
		let nextIndex=0;
		for(i=rowNum; i<lastFloorNo; i++){
			nextIndex=parseInt(i)+1;
			$("#floorID"+i+"Select").val($("#floorID"+nextIndex+"Select").val());
			$("#sectionDescID"+i).val($("#sectionDescID"+nextIndex).val());
			$("#coveredAreaID"+i).val($("#coveredAreaID"+nextIndex).val());
			$("#sectionPropertyCategoryID"+i+"Select").val($("#sectionPropertyCategoryID"+nextIndex+"Select").val());
			$("#propertyTypeID"+i+"Select").val($("#propertyTypeID"+nextIndex+"Select").val());
			$("#useFactorID"+i+"Select").val($("#useFactorID"+nextIndex+"Select").val());
			$("#structureFactorID"+i+"Select").val($("#structureFactorID"+nextIndex+"Select").val());
			$("#occupancyFactorID"+i+"Select").val($("#occupancyFactorID"+nextIndex+"Select").val());
			$("#ageFactorID"+i+"Select").val($("#ageFactorID"+nextIndex+"Select").val());
			$("#exemptionID"+i+"Select").val($("#exemptionID"+nextIndex+"Select").val());
			proprtyTypeOnChangeSectionCatg("",i, $("#sectionPropertyCategoryID"+nextIndex+"Select").val(),$("#propertyTypeID"+nextIndex+"Select").val());
			populateUseFactor($("#propertyTypeID"+nextIndex+"Select").val(), "useFactorID"+i+"Select",$("#useFactorID"+nextIndex+"Select").val());
			select2Refresh();
		}
		$('#taxFactorselecterId' + lastFloorNo).remove();
		lastFloorNo = parseInt(lastFloorNo) - 1;
		$("#noOfFloors").val(lastFloorNo);

//		showAddBtnOnPrevsPnl($("#noOfFloors").val());
		console.log("$(#noOfFloors).val() : " + $("#noOfFloors").val());
		console.log("lastFloorNo after remove: " + lastFloorNo);
		// lastFloorNo = lastFloorNo - 1;

	} else {
		createSmallAlert('This floor cannot be deleted.');
		// alert('This floor cannot be deleted.');

	}

}

function decimalNum(event) {

	key = event.keyCode;
	console.log("in decimalNum Key Code : " + key);
	if (key == 46 || key >= 48 && key <= 57)
		return true;
	else
		return false;
}

function num(event) {

	key = event.keyCode;
	console.log("Key Code : " + key);
	if (key >= 48 && key <= 57)
		return true;
	else
		return false;
}

function alphanum() {
	key = event.keyCode;

	if ((key === 45) || (key >= 46 && key <= 57) || (key >= 65 && key <= 90)
			|| (key >= 97 && key <= 122))
		return true;
	else
		return false;
}

function onChangeOwnershipCategory(selValue, destinationVal) {
	var selectedValue = selValue;
	$('#ownerTypeIDSelect').empty();
	$('#ownerTypeIDSelect').append(
			$("<option></option>").attr("value", "0").text(
					"Select Ownership Type"));
	$("#ownerDivID").empty();

	if (selectedValue != 0 && selectedValue != '' && this != null) {
		$.getJSON(
				"web/citizen/property/option?optionType=MST_PROPERTY_OWNER_TYPE&filterValue="
						+ selectedValue, function(data, status) {
					$("#ownerDivID").empty();

					for (var i = 0; i < data.length; i++) {

						if (destinationVal == data[i].optionGuid) {
							$('#ownerTypeIDSelect').append(

							$("<option></option>").attr({
								value : data[i].optionGuid,
								selected : 'selected'
							}).text(data[i].optionValue));
						}

						else {
							$('#ownerTypeIDSelect').append(
									$("<option></option>").attr("value",
											data[i].optionGuid).text(
											data[i].optionValue));
						}

					}
				});
	}
}

function populateUseFactor(propertyTypeGuid, stateID, stateValue) {

	var selectedValue = propertyTypeGuid;
	if (stateID == null || stateID == '') {
		createSmallAlert('STATE CONTROL IS NULL');
		return;
	}
	// //added for dda flat
	updateVacantLandPropertyTypFlats(propertyTypeGuid);
	if (selectedValue != 0 && selectedValue != '') {
		$
				.getJSON(
						"web/citizen/property/option?optionType=MST_PROPERTY_USE_FACTOR_NEW&filterValue="
								+ selectedValue,
						function(data, status) {
							$('#' + stateID).empty();
							$('#' + stateID).append(
									$("<option></option>").attr("value", "0")
											.text("Select Use Factor"));
							if(data.length ==1){
								$('#' + stateID).append(
										
										$("<option></option>").attr({
											value : data[0].optionGuid,
											selected : 'selected'
										}).text(data[0].optionValue));
							}else{
								for (var i = 0; i < data.length; i++) {
	
									if (stateValue == data[i].optionGuid) {
										$('#' + stateID).append(
	
										$("<option></option>").attr({
											value : data[i].optionGuid,
											selected : 'selected'
										}).text(data[i].optionValue));
									} else {
										$('#' + stateID).append(
												$("<option></option>")
														.attr("value",
																data[i].optionGuid)
														.text(data[i].optionValue));
									}
								}
							}
						});
	} else {
		$('#' + stateID).empty();
		$('#' + stateID).append(
				$("<option></option>").attr("value", "").text("CHOOSE"));
//		if (districtID != null && districtID != '') {
//			$('#' + districtID).empty();
//			$('#' + districtID).append(
//					$("<option></option>").attr("value", "").text("CHOOSE"));
//		}
	}

}

$('#ownerCategoryIDSelect').on("change", function(e) {
	onChangeOwnershipCategory(this.value, '');
});

$('#ownerTypeIDSelect').on(
		"change",
		function(e) {
			var selectedValue = this.value;
			if (selectedValue != 0 && selectedValue != '') {
				var ownerCategoryGuid = $('#ownerCategoryIDSelect').val();
				var actionType = $('#actionTypeID').val();
				$.ajax({
					type : "GET",
					url : "web/citizen/property/ownerUI/" + ownerCategoryGuid
							+ "/" + selectedValue + "/" + actionType,
					cache : false,
					async : true,
					beforeSend : function() {
						$("#overlay").show();
					},
					success : function(data, status, xhr) {
						$("#ownerDivID").empty();
						$("#ownerDivID").html(data);
						dynamicSelectBasedOnText("ownerRebateIDSelect",
								"NO REBATE");
						$("#overlay").hide();
					},
					error : function(e) {
						createSmallAlert('ERROR in OWNER UI..');
						$("#overlay").hide();
					},
					complete : function() {
						var selVal = $('#ownerStateIDSelect').find(
								'option:selected').val();
						onStateChangePopulateDistrictOptionByValue(selVal,
								'ownerDistrictIDSelect');
						select2Refresh();
						$("#overlay").hide();
					}
				});
			}
		});

var vacantLandGUID = '';
// propertyTypeID0Select
$('#propertyCategoryIDSelect')
		.on(
				"change",
				function(e) {
					var selectedValue = this.value;
					if (selectedValue != 0 && selectedValue != '') {
						$
								.getJSON(
										"web/citizen/property/option?optionType=MST_PROPERTY_TYPE&filterValue="
												+ selectedValue,
										function(data, status) {
											$('#propertyTypeIDSelect').empty();
											$('#propertyTypeIDSelect').append(
													$("<option></option>")
															.attr("value", "")
															.text("CHOOSE"));
											for (var i = 0; i < data.length; i++) {
												$('#propertyTypeIDSelect')
														.append(
																$(
																		"<option></option>")
																		.attr(
																				"value",
																				data[i].optionGuid)
																		.text(
																				data[i].optionValue));

												if (vacantLandGUID == '') {

													vacantLandCode = $(
															'#vacantCodeID')
															.val();
													console
															.log("VACANT CODE : "
																	+ vacantLandCode);
													if (vacantLandCode == data[i].optionCode) {
														vacantLandGUID = data[i].optionGuid;
														console
																.log("vacantLandGUID : "
																		+ vacantLandGUID);

													}
												}

											}

											// if($('#noOfFloorID').length)
											// {
											/*
											 * for(j = 0; j<=
											 * $('#noOfFloors').val(); j++) {
											 * //propertyTypeID0Select
											 * 
											 * $('#propertyTypeID'+j+'Select').empty();
											 * $('#useFactorID'+j+'Select').empty();
											 * $('#propertyTypeID'+j+'Select').append(
											 * $("<option></option>").attr("value",
											 * "") .text("CHOOSE")); for (var i =
											 * 0; i < data.length; i++) {
											 * $('#propertyTypeID'+j+'Select').append(
											 * $("<option></option>").attr("value",
											 * data[i].optionGuid).text(
											 * data[i].optionValue)); }
											 *  }
											 */

											// }
										});
					}

					var categoryCode = document.getElementById(selectedValue).value;
					if (categoryCode != PROP_VACANT_CATEGORY ){
						
						disableFloorEntry(false);
					} 
					
					if (categoryCode == PROP_VACANT_CATEGORY) {
						$("#vacantCoverdAreaId").val("0");
				$("#addFloorBlock").hide();
						
						document.getElementById("flatDivCheckBox").style.display = "none";
						$("#isVacantLandInUseCheckBox").hide();
				disableFloorEntry(true);
					}
					
					if (categoryCode == PROP_RESIDENTIAL_CATEGORY) {
						$("#addFloorBlock").show();
						document.getElementById("flatDivCheckBox").style.display = "block";
						$("#isVacantLandInUseCheckBox").hide();
					} else {
						document.getElementById("flatOptionCheckBox").checked = false;
						enableDisableVacantLand();
						document.getElementById("flatDivCheckBox").style.display = "none";
						
						if (categoryCode == PROP_VACANT_CATEGORY){
							$("#vacantCoverdAreaId").val("0");
					$("#addFloorBlock").hide();
							
							$("#isVacantLandInUseCheckBox").hide();
					disableFloorEntry(true);
						}else{
							$("#addFloorBlock").show();
						$("#isVacantLandInUseCheckBox").show();
						}
					}
				}

		);

/*
 * //Hide Floors and set values for default floor at VACANT LAND
 * $('#propertyTypeIDSelect').on( "change", function(e) { var selectedValue =
 * $('#propertyTypeIDSelect').find('option:selected').val(); // alert("Selected
 * Value Form Property Catg : "+selectedValue); if (selectedValue != '' &&
 * selectedValue == vacantLandGUID) { // createSmallAlert("On 'VACANT LAND'
 * floor will be removed."); // alert("On 'VACANT LAND' selection all floors
 * will be removed.");
 * 
 * $('#vacantCoverdAreaId').val('0.0').trigger('change');
 * $('#vacantCoverdAreaId').prop('disabled', 'disabled'); // alert("No of Floors :
 * "+Number($("#noOfFloors").val())); var floors =
 * Number($("#noOfFloors").val()); for(var index=0;index<floors;index++){
 * removeSection(''); } setValueForDefaultFloor(); // alert("Rest Floor :
 * "+Number($("#noOfFloors").val()));
 * 
 * }else{ $('#vacantCoverdAreaId').removeAttr('disabled');
 * 
 * removeValueForDefaultFloor();
 *  } });
 */

function setValueForDefaultFloor() {
	$('#sectionDescID0').val('');
	$('#sectionDescID0').prop('readonly', 'readonly');
	$('#coveredAreaID0').val('0.0');
	$('#coveredAreaID0').prop('readonly', 'readonly');

	var val = $('#sectionPropertyCategoryIDSelect').find('option:selected')
			.text();
	console.log("option : " + val);
	$('#sectionPropertyCategoryIDSelect').find("option:contains(" + val + ")")
			.attr("selected", true);
	// $('#sectionPropertyCategoryIDSelect').prop('disabled', 'disabled');
	$('#propertyTypeID0Select').find('option:contains("VACANT LAND")').attr(
			"selected", true);
	// $('#propertyTypeID0Select').prop('disabled', 'disabled');
	$('#exemptionID0Select').find('option:contains("NO EXEMPTION")').attr(
			"selected", true);
	$('#exemptionID0Select').prop('disabled', 'disabled');

	$('#addSectionID0').prop('disabled', 'disabled');
	$('#down').prop('disabled', 'disabled');

}

function removeValueForDefaultFloor() {
	$('#sectionDescID0').val('');
	$('#sectionDescID0').removeAttr('readonly');

	// $('#coveredAreaID0').val('0.0');
	$('#coveredAreaID0').removeAttr('readonly');

	$('#sectionPropertyCategoryIDSelect')
			.find('option:contains("VACANT LAND")').attr("selected", false);
	$('#sectionPropertyCategoryIDSelect').removeAttr('disabled')
	$('#propertyTypeID0Select').find('option:contains("VACANT LAND")').attr(
			"selected", false);
	$('#propertyTypeID0Select').removeAttr('disabled', 'disabled')
	$('#exemptionID0Select').find('option:contains("NO EXEMPTION")').attr(
			"selected", false);
	$('#exemptionID0Select').removeAttr('disabled', 'disabled')

	$('#addSectionID0').removeAttr('disabled');
	$('#down').removeAttr('disabled');

}

// propertyTypeID0Select
function loadPropertyType(e) {
	var selectedValue = e.value;
	if (selectedValue != 0 && selectedValue != '') {
		$.getJSON(
				"web/citizen/property/option?optionType=MST_PROPERTY_TYPE&filterValue="
						+ selectedValue, function(data, status) {
					// $('#propertyTypeIDSelect').empty();
					// $('#propertyTypeIDSelect').append(
					// $("<option></option>").attr("value", "").text(
					// "CHOOSE"));
					var propertyId = 'propertyTypeIDSelect';
					if ($('#noOfFloors').val() != -1) {
						propertyId = 'propertyTypeID' + $('#noOfFloors').val()
								+ 'Select';
					}
					for (var i = 0; i < data.length; i++) {
						$('#' + propertyId).empty();
						$('#' + propertyId).append(
								$("<option></option>").attr("value",
										data[i].optionGuid).text(
										data[i].optionValue));
					}

					// if($('#noOfFloorID').length)
					// {
					for (j = $('#noOfFloors').val(); j <= $('#noOfFloors')
							.val(); j++) { // propertyTypeID0Select

						$('#propertyTypeID' + j + 'Select').empty();
						$('#useFactorID' + j + 'Select').empty();
						$('#propertyTypeID' + j + 'Select').append(
								$("<option></option>").attr("value", "").text(
										"CHOOSE"));
						for (var i = 0; i < data.length; i++) {
							$('#propertyTypeID' + j + 'Select').append(
									$("<option></option>").attr("value",
											data[i].optionGuid).text(
											data[i].optionValue));
						}

					}

					// }
				});
	}
}
function onCountryChangePopulateStateOption(obj, stateID, districtID) {
	
	var selectedValue = obj.value;
	if (stateID == null || stateID == '') {
		createSmallAlert('STATE CONTROL IS NULL');
		return;
	}
	if (selectedValue != 0 && selectedValue != '') {
		var state = $('#stateIDSelect').find('option:selected').val();
		$.getJSON(
				"web/citizen/property/option?optionType=MST_STATE&filterValue="
						+ selectedValue, function(data, status) {
					$('#' + stateID).empty();
					$('#' + stateID).append(
							$("<option></option>").attr("value", "").text(
									"CHOOSE"));
					if (districtID != null && districtID != '') {
						$('#' + districtID).empty();
						$('#' + districtID).append(
								$("<option></option>").attr("value", "").text(
										"CHOOSE"));
					}
					for (var i = 0; i < data.length; i++) {

						if (state == data[i].optionGuid) {
							$('#' + stateID).append(
									$("<option></option>").attr("value",
											data[i].optionGuid).attr(
											"selected", "selected").text(
											data[i].optionValue));
							$('#ownerStateIDSelect').change();
						} else {
							$('#' + stateID).append(
									$("<option></option>").attr("value",
											data[i].optionGuid).text(
											data[i].optionValue));
						}
					}
				});
	} else {
		$('#' + stateID).empty();
		$('#' + stateID).append(
				$("<option></option>").attr("value", "").text("CHOOSE"));
		if (districtID != null && districtID != '') {
			$('#' + districtID).empty();
			$('#' + districtID).append(
					$("<option></option>").attr("value", "").text("CHOOSE"));
		}
	}
}
function onStateChangePopulateDistrictOption(obj, districtID) {
	var selectedValue = obj.value;
	if (districtID == null || districtID == '') {
		createSmallAlert('DISTRICT COMTROL IS NULL');
		return;
	}
	if (selectedValue != 0 && selectedValue != '') {
		var district = $('#districtIDSelect').find('option:selected').val();
		$.getJSON(
				"web/citizen/property/option?optionType=MST_DISTRICT&filterValue="
						+ selectedValue, function(data, status) {
					$('#' + districtID).empty();
					$('#' + districtID).append(
							$("<option></option>").attr("value", "").text(
									"Select District"));
					for (var i = 0; i < data.length; i++) {

						if (district == data[i].optionGuid) {
							$('#' + districtID).append(
									$("<option></option>").attr("value",
											data[i].optionGuid).attr(
											"selected", "selected").text(
											data[i].optionValue));

						} else {
							$('#' + districtID).append(
									$("<option></option>").attr("value",
											data[i].optionGuid).text(
											data[i].optionValue));
						}

						/*
						 * $('#' + districtID).append( $("<option></option>").attr("value",
						 * data[i].optionGuid).text( data[i].optionValue));
						 */
					}
				});
	} else {
		$('#' + districtID).empty();
		$('#' + districtID).append(
				$("<option></option>").attr("value", "").text("CHOOSE"));
	}
}

function onStateChangePopulateDistrictOptionByValue(value, districtID) {
	var selectedValue = value;
	if (districtID == null || districtID == '') {
		createSmallAlert('DISTRICT CONTROL IS NULL');
		return;
	}
	if (selectedValue != 0 && selectedValue != '') {
		var district = $('#districtIDSelect').find('option:selected').val();
		$
				.getJSON(
						"web/citizen/property/option?optionType=MST_DISTRICT&filterValue="
								+ selectedValue,
						function(data, status) {
							$('#' + districtID).empty();
							$('#' + districtID).append(
									$("<option></option>").attr("value", "")
											.text("Select District"));
							for (var i = 0; i < data.length; i++) {
								if (data[i].optionValue == 'NEW DELHI') {
									$('#' + districtID).append(

									$("<option></option>").attr({
										value : data[i].optionGuid,
										selected : 'selected'
									}).text(data[i].optionValue));
								} /*else if (district == data[i].optionGuid) {
									$('#' + districtID).append(
											$("<option></option>")
													.attr("value",
															data[i].optionGuid)
													.attr("selected",
															"selected")
													.text(data[i].optionValue));
								} else {
									$('#' + districtID).append(
											$("<option></option>")
													.attr("value",
															data[i].optionGuid)
													.text(data[i].optionValue));

								}*/

							}
						});
	} else {
		$('#' + districtID).empty();
		$('#' + districtID).append(
				$("<option></option>").attr("value", "").text("CHOOSE"));
	}
}

function onStateChangePopulateDistrictOptionByValue2(value, districtID,
		districtValue) {
	var selectedValue = value;
	if (districtID == null || districtID == '') {
		createSmallAlert('DISTRICT COMTROL IS NULL');
		return;
	}
	if (selectedValue != 0 && selectedValue != '') {
		$.getJSON(
				"web/citizen/property/option?optionType=MST_DISTRICT&filterValue="
						+ selectedValue, function(data, status) {
					$('#' + districtID).empty();
					$('#' + districtID).append(
							$("<option></option>").attr("value", "").text(
									"CHOOSE"));
					for (var i = 0; i < data.length; i++) {
						if (districtValue == data[i].optionGuid) {
							$('#' + districtID).append(

							$("<option></option>").attr({
								value : data[i].optionGuid,
								selected : 'selected'
							}).text(data[i].optionValue));
						} else {
							$('#' + districtID).append(
									$("<option></option>").attr("value",
											data[i].optionGuid).text(
											data[i].optionValue));
						}

					}
				});
	} else {
		$('#' + districtID).empty();
		$('#' + districtID).append(
				$("<option></option>").attr("value", "").text("CHOOSE"));
	}
}

function onCountryChangePopulateStateOptionByValue(countryVal, stateID,
		stateValue) {

	var selectedValue = countryVal;
	if (stateID == null || stateID == '') {
		createSmallAlert('STATE CONTROL IS NULL');
		return;
	}
	if (selectedValue != 0 && selectedValue != '') {

		$.getJSON(
				"web/citizen/property/option?optionType=MST_STATE&filterValue="
						+ selectedValue, function(data, status) {
					$('#' + stateID).empty();
					$('#' + stateID).append(
							$("<option></option>").attr("value", "").text(
									"CHOOSE"));
					/*
					 * if (districtID != null && districtID != '') { $('#' +
					 * districtID).empty(); $('#' + districtID).append( $("<option></option>").attr("value",
					 * "").text( "CHOOSE")); }
					 */
					for (var i = 0; i < data.length; i++) {
						if (stateValue == data[i].optionGuid) {
							$('#' + stateID).append(

							$("<option></option>").attr({
								value : data[i].optionGuid,
								selected : 'selected'
							}).text(data[i].optionValue));
						} else {
							$('#' + stateID).append(
									$("<option></option>").attr("value",
											data[i].optionGuid).text(
											data[i].optionValue));

						}
						/*
						 * $('#' + stateID).append( $("<option></option>").attr("value",
						 * data[i].optionGuid).text( data[i].optionValue));
						 */
					}
				});
	} else {
		$('#' + stateID).empty();
		$('#' + stateID).append(
				$("<option></option>").attr("value", "").text("CHOOSE"));
		if (districtID != null && districtID != '') {
			$('#' + districtID).empty();
			$('#' + districtID).append(
					$("<option></option>").attr("value", "").text("CHOOSE"));
		}
	}
}

function removeOwner() {
	var table = document.getElementById("ownerTableGridID");
	var tbody = table.tBodies[0];
	var rowCount = tbody.rows.length;

	if (rowCount == 1) {
		$("#EditRow").val('');
	}

	if (rowCount > 0) {
		tbody.deleteRow(-1);
	}

	if ($("#ownerTypeIDSelect option:selected").text() == 'SINGLE OWNER') {
		$("#addOwnerDetailIndividualBtnID").prop('disabled', false);
	}
	hideOwnerDetail(false);

}

function dynamicSelectBasedOnText(id, text) {
	
	$("#" + id + " option").each(function() {
		if ($(this).text().trim() == text.trim()) {
			$(this).attr('selected', 'selected');
		}
	});
}

function editOwnerRowGovt(rowNum) {
	copyOwnerForUpdateGovt(rowNum);
	hideOwnerDetail(false);
}
function editOwnerRow(rowNum) {
	copyOwnerForUpdate(rowNum);
	hideOwnerDetail(false);
}


function editOwnerRowOrganisation(rowNum) {
	copyOwnerForUpdateOrganistaion(rowNum);
	hideOwnerDetail(false);
}

function copyOwnerForUpdateGovt(rowNum) {
	
	dynamicallySelectBasedOnText('governmentTypeIdSelect', $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].governmentType') + "]").val());

	$("#departmentID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].department') + "]").val());
	$("#authorizedPersonNameID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].authorizedPersonName') + "]").val());
	$("#tanNumberID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].tanNumber') + "]").val());
	$("#authorizedPersonNameID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].authorizedPersonName') + "]").val());
	
	dynamicallySelectBasedOnValue('countryCodeID', $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].mobCntryCode') + "]").val());

	$("#mobileNumberID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].mobileNumber') + "]").val());
	$("#emailID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].emailID') + "]").val());
	var percentage = $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].ownershipPercentage') + "]").val();
	if (percentage == null || percentage == "") {
		percentage = 100;
	}
	$("#ownershipPercentageID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].ownershipPercentage') + "]").val());
	$("#ownerAddressLine1ID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].addressLine1') + "]").val());
	$("#ownerAddressLine2ID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].addressLine2') + "]").val());
	$("#ownerPincodeID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].pincode') + "]").val());
	dynamicallySelectBasedOnValue('ownerRebateIDSelect', $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].ownerRebateGuid') + "]").val());
	dynamicallySelectBasedOnValue('ownerCountryIDSelect', $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].countryGuid') + "]").val());
	onCountryChangePopulateStateOptionByValue($(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].countryGuid') + "]").val(),
			'ownerStateIDSelect', $(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].stateGuid') + "]").val());
	onStateChangePopulateDistrictOptionByValue2($(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].stateGuid') + "]").val(),
			'ownerDistrictIDSelect', $(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].districtGuid') + "]").val());

	// sanjay
	$("#EditRow").val(rowNum);

	$("#EditRowPercentage").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].ownershipPercentage') + "]").val());

	// removeSelectedOwner(rowNum);
}

function copyOwnerForUpdateOrganistaion(rowNum) {
	$("#organisationNameID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].organisationName') + "]").val());
	$("#authorizedPersonNameID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].authorizedPersonName') + "]").val());
	$("#panNumberID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].panNumber') + "]").val());
	
	dynamicallySelectBasedOnValue('countryCodeID', $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].mobCntryCode') + "]").val());

	$("#mobileNumberID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].mobileNumber') + "]").val());
	$("#emailID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].emailID') + "]").val());
	var percentage = $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].ownershipPercentage') + "]").val();
	if (percentage == null || percentage == "") {
		percentage = 100;
	}
	$("#ownershipPercentageID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].ownershipPercentage') + "]").val());
	$("#ownerAddressLine1ID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].addressLine1') + "]").val());
	$("#ownerAddressLine2ID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].addressLine2') + "]").val());
	$("#ownerPincodeID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].pincode') + "]").val());
	dynamicallySelectBasedOnValue('ownerRebateIDSelect', $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].ownerRebateGuid') + "]").val());
	dynamicallySelectBasedOnValue('ownerCountryIDSelect', $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].countryGuid') + "]").val());
	onCountryChangePopulateStateOptionByValue($(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].countryGuid') + "]").val(),
			'ownerStateIDSelect', $(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].stateGuid') + "]").val());
	onStateChangePopulateDistrictOptionByValue2($(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].stateGuid') + "]").val(),
			'ownerDistrictIDSelect', $(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].districtGuid') + "]").val());

	// sanjay
	$("#EditRow").val(rowNum);

	$("#EditRowPercentage").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].ownershipPercentage') + "]").val());

	// removeSelectedOwner(rowNum);
}

function copyOwnerForUpdate(rowNum) {

	// alert('copyOwnerForUpdate ');
	/*
	 * alert(document.getElementsByName("property.owners[0].firstName").value);
	 * alert(document.getElementsByName("property.owners["+rowNum+"].firstName").value);
	 */
	/* $("input[name=nameGoesHere]").val(); */
	$("#firstNameID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].firstName') + "]").val());
		$("#isOtpValidatedMobile").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].isOtpValidatedMobile') + "]").val());	
									
									
	$("#isOtpValidatedEmail").val(
			 $(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].isOtpValidatedEmail') + "]").val());
									
															
		
		if($("#isOtpValidatedMobile").val() == 'true')
		{
			
			$("#otpgendiv").css('display', 'none');
		}	

		if($("#isOtpValidatedEmail").val() == 'true')
		{
			
			$("#otpgenEmaildiv").css('display', 'none');
		}				
									
									
	$("#middleNameID").val(	
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].middleName') + "]").val());
	$("#lastNameID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].lastName') + "]").val());

	dynamicallySelectBasedOnText('genderIDSelect', $(
			"input[name="
					+ $
							.escapeSelector('property.owners[' + rowNum
									+ '].gender') + "]").val());

	// $("#genderIDSelect").val($("input[name="+
	// $.escapeSelector('property.owners['+rowNum+'].gender')+"]").val());
	$("#dobID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].dob') + "]").val());
	$("#ageID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].age') + "]").val());
	
	dynamicallySelectBasedOnValue('countryCodeID', $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].mobCntryCode') + "]").val());
	
	$("#mobileNumberID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].mobileNumber') + "]").val());
	$("#emailID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].emailID') + "]").val());
	$("#panNumberID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].panNumber') + "]").val());
	var percentage = $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].ownershipPercentage') + "]").val();
	if (percentage == null || percentage == "") {
		percentage = 100;
	}
	$("#ownershipPercentageID").val(percentage);
	$("#ownerAddressLine1ID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].addressLine1') + "]").val());
	$("#ownerAddressLine2ID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].addressLine2') + "]").val());
	$("#ownerPincodeID").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].pincode') + "]").val());
	dynamicallySelectBasedOnValue('ownerRebateIDSelect', $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].ownerRebateGuid') + "]").val());
	dynamicallySelectBasedOnValue('ownerCountryIDSelect', $(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].countryGuid') + "]").val());
	onCountryChangePopulateStateOptionByValue($(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].countryGuid') + "]").val(),
			'ownerStateIDSelect', $(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].stateGuid') + "]").val());
	onStateChangePopulateDistrictOptionByValue2($(
			"input[name="
					+ $.escapeSelector('property.owners[' + rowNum
							+ '].stateGuid') + "]").val(),
			'ownerDistrictIDSelect', $(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].districtGuid') + "]").val());
	// sanjay
	$("#EditRow").val(rowNum);

	$("#EditRowPercentage").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + rowNum
									+ '].ownershipPercentage') + "]").val());

$("#emailID").click();
	// removeSelectedOwner(rowNum);
}

function dynamicallySelectBasedOnText(elementID, value) {
	var el = document.getElementById(elementID);
	for (var i = 0; i < el.options.length; i++) {
		if (el.options[i].text == value) {
			el.selectedIndex = i;
			break;
		}
	}
	$('#' + elementID).trigger('change'); // For Select 2 DropDown
}

function dynamicallySelectBasedOnValue(elementID, value) {
	$("#" + elementID).val(value);
	$('#' + elementID).trigger('change'); // For Select 2 DropDown
}

function removeSelectedOwner(rowNum) {
	var table = document.getElementById("ownerTableGridID");
	var tbody = table.tBodies[0];
	tbody.deleteRow(rowNum);

	if ($("#ownerTypeIDSelect option:selected").text().trim() == 'SINGLE OWNER') {
		$("#addOwnerDetailIndividualBtnID").prop('disabled', false);
	}

}

function checkTanNo(element) {

	var panVal = element.value;
	var regpan = /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/;
	if (regpan.test(panVal)) {
		setSuccessColor(element);
	} else {
		setErrorColor(element);
		console.log("Id : " + element.id);
		element.value = "";
		element.placeholder = "e.g. 'ABCD12345F'";
	}
}

function checkPanNo(element) {

	var panVal = element.value;
	var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

	console.log("pan Val : " + panVal);
	if (panVal != '') {

		if (regpan.test(panVal)) {
			setSuccessColor(element);
		} else {
			// setErrorColor(element);
			console.log("Id : " + element.id);
			element.value = "";
			element.placeholder = "e.g. 'ABCDE1234F'";

			createSmallAlert('Invalid Pan');

			return false;
		}

	}

}

function addIndividualOwner() {
	
	var firstName = $('#firstNameID').val().trim();
	var middleName = $('#middleNameID').val().trim();
	var lastName = $('#lastNameID').val().trim();
	var gender = $('#genderIDSelect').val();
	var otpval = $('#isOtpValidatedMobile').val();
	var otpvalEmail = $('#isOtpValidatedEmail').val();

	if (gender == "" || gender == '' || gender == null) {
		createSmallAlert('Enter gender of Owner');
		$('#genderIDSelect').focus();
		return false;
	}

	var dob = $('#dobID').val();

	if (dob == "" || dob == '' || dob == null) {
		$('#dobID').focus();
		createSmallAlert('Enter Date of Birth of Owner.');
		return;
	}

	var actionType = $('#actionTypeID').val();

	var rebate = $('#ownerRebateIDSelect').val();

	if (rebate == "" || rebate == '' || rebate == null) {
		createSmallAlert("Please Select Owner Rebate  .");
		$('#ownerRebateIDSelect').focus();
		return;
	}

	var age = $('#ageID').val();
	console.log("------\nGender : " + gender + "\nDOB : " + dob + "\n Age : "
			+ age + "\n--------");

	var countryCode = $('#countryCodeID').find('option:selected').val();
	
	
	var mobileNumber = $('#mobileNumberID').val();
	var emailId = $('#emailID').val();
	var panNumber = $('#panNumberID').val();
	if(panNumber != null && panNumber !== ""){
		panNumber = EncryptP(panNumber,"aesalgoisbestbes", 128, 1000);
	}
	var ownershipPercentage = $('#ownershipPercentageID').val();
	var ownerRebate = $('#ownerRebateIDSelect').find('option:selected').val();
	var ownerRebateValue = $('#ownerRebateIDSelect').find('option:selected')
			.text();
	var ownerAddressLine1 = $('#ownerAddressLine1ID').val();
	var ownerAddressLine2 = $('#ownerAddressLine2ID').val();
	var ownerPincode = $('#ownerPincodeID').val();
	var ownerCountry = $('#ownerCountryIDSelect').find('option:selected').val();
	var ownerCountryValue = $('#ownerCountryIDSelect').find('option:selected')
			.text();
	var ownerState = $('#ownerStateIDSelect').find('option:selected').val();
	var ownerStateValue = $('#ownerStateIDSelect').find('option:selected')
			.text();
	var ownerDistrict = $('#ownerDistrictIDSelect').find('option:selected')
			.val();
	var ownerDistrictValue = $('#ownerDistrictIDSelect')
			.find('option:selected').text();

	var table = document.getElementById("ownerTableGridID");
	var tbody = table.tBodies[0];
	var rowCount = tbody.rows.length;

	
	//filter to check all zeros
	if ($('#mobileNumberID').filter(function() {
				
        return parseInt(this.value, 16) !== 0;
    }).length === 0) {
    
		createSmallAlert('Enter valid Mobile no ');
		return;
}
else {
    // At least one has a non-zero value
}
	
	
	if (countryCode == 91 && mobileNumber.length != 10) {
	createSmallAlert('Enter valid Indian mobile no of 10 digits');
	return;
	}
	var multiple = $('#multipleOwnerID').val();

	// sanjay
	var editrow = $("#EditRow").val();

	// alert('editrow'+editrow);

	var editrowno = Number(editrow);
	var editrowpercentage = Number(0);

	var ownSum = Number(0);

	if (multiple == 'false' && editrow.length == 0 && rowCount > 0) {
		createSmallAlert('Multiple Owner For The Property Is Not Allowed');
		return false;
	}

	// alert('rowCount'+rowCount);
	for (var i = 0; i < rowCount; i++) {

		ownSum = ownSum + Number($('#ownrPercntgTblId' + i).val());

	}

	if (editrow != null && editrow.length > 0) {
		ownSum = ownSum - Number($('#ownrPercntgTblId' + editrowno).val());
		rowCount = editrowno;

	}

	if (Math.round(Number(ownershipPercentage) <= 0)) {
		createSmallAlert('ownership percentage should be from 1 to 100 %');
		return false;
	}

	if (ownSum + Number(ownershipPercentage) > 100) {
		// createSmallAlert('Addition Not Allowed As Ownership Percentage Will
		// Be
		// Above Maximum By Adding');
		createSmallAlert('Addition of ownership percentage can not exceed 100%');
		return false;
	}
	if (ownSum + Number(ownershipPercentage) == 100) {
		hideOwnerDetail(true);
	}
	
	if (multiple == 'false' && (ownSum + Number(ownershipPercentage) != 100)) {
		createSmallAlert('Ownership percentage should be 100%');
		return false;
	}

	if (multiple == 'true' && (Number(ownershipPercentage) > 99.90)) {
		createSmallAlert('Maximum Individual Ownership Percentage permitted are 99.90 % for Joint Ownership Case .');
		hideOwnerDetail(false);
		return false ;
	}

	$("#EditRow").val('');
	if (editrow != null && editrow.length > 0) {
		removeSelectedOwner(editrow);

	}

	var addRow;
	if (editrow != null && editrow.length > 0) {
		addRow = tbody.insertRow(rowCount);
	} else {
		addRow = tbody.insertRow(-1);
	}

	var firstNameCell = addRow.insertCell(-1);
	var firstNameHidden = document.createElement("input");
	firstNameHidden.setAttribute("type", "hidden");
	firstNameHidden.setAttribute("id", "firstNmTblId" + rowCount);
	firstNameHidden.setAttribute("name", "property.owners[" + rowCount+ "].firstName");
	firstNameHidden.setAttribute("value", firstName);
	firstNameCell.appendChild(firstNameHidden);
	var firstNameTxt = document.createTextNode(firstName + " " + middleName
			+ " " + lastName);
	firstNameCell.appendChild(firstNameTxt);

	// var middleNameCell = addRow.insertCell(-1);
	var middleNameHidden = document.createElement("input");
	middleNameHidden.setAttribute("type", "hidden");
	middleNameHidden.setAttribute("id", "midNmTblId" + rowCount);
	middleNameHidden.setAttribute("name", "property.owners[" + rowCount+ "].middleName");
	middleNameHidden.setAttribute("value", middleName);
	firstNameCell.appendChild(middleNameHidden);
	// var middleNameTxt = document.createTextNode(middleName);
	// middleNameCell.appendChild(middleNameTxt);

	// var lastNameCell = addRow.insertCell(-1);
	var lastNameHidden = document.createElement("input");
	lastNameHidden.setAttribute("type", "hidden");
	lastNameHidden.setAttribute("id", "lastNmTblId" + rowCount);
	lastNameHidden.setAttribute("name", "property.owners[" + rowCount+ "].lastName");
	lastNameHidden.setAttribute("value", lastName);
	firstNameCell.appendChild(lastNameHidden);
	// var lastNameTxt = document.createTextNode(lastName);
	// lastNameCell.appendChild(lastNameTxt);

	var genderCell = addRow.insertCell(-1);
	var genderHidden = document.createElement("input");
	genderHidden.setAttribute("type", "hidden");
	genderHidden.setAttribute("id", "genderTblId" + rowCount);
	genderHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].gender");
	genderHidden.setAttribute("value", gender);
	genderCell.appendChild(genderHidden);
	var genderTxt = document.createTextNode(gender);
	genderCell.appendChild(genderTxt);

	var dobCell = addRow.insertCell(-1);
	var dobHidden = document.createElement("input");
	dobHidden.setAttribute("type", "hidden");
	dobHidden.setAttribute("id", "dobTblId" + rowCount);
	dobHidden.setAttribute("name", "property.owners[" + rowCount + "].dob");
	dobHidden.setAttribute("value", dob);
	dobCell.appendChild(dobHidden);
	var dobTxt = document.createTextNode(dob);
	dobCell.appendChild(dobTxt);

	// var ageCell = addRow.insertCell(-1);
	var ageHidden = document.createElement("input");
	ageHidden.setAttribute("type", "hidden");
	ageHidden.setAttribute("id", "ageTblId" + rowCount);
	ageHidden.setAttribute("name", "property.owners[" + rowCount + "].age");
	ageHidden.setAttribute("value", age);
	dobCell.appendChild(ageHidden);
	// var ageTxt = document.createTextNode(age);
	// ageCell.appendChild(ageTxt);

	//country code
	var countryCodeCell = addRow.insertCell(-1);
	var countryCodeHidden = document.createElement("input");
	countryCodeHidden.setAttribute("type", "hidden");
	countryCodeHidden.setAttribute("id", "countryCodeTblId" + rowCount);
	countryCodeHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].mobCntryCode");
	countryCodeHidden.setAttribute("value", countryCode);
	countryCodeCell.appendChild(countryCodeHidden);
	var countryCodeTxt = document.createTextNode(countryCode);
	countryCodeCell.appendChild(countryCodeTxt);
	
	var mobileNumberCell = addRow.insertCell(-1);
	
	
	var mobileNumberHidden = document.createElement("input");
	mobileNumberHidden.setAttribute("type", "hidden");
	mobileNumberHidden.setAttribute("id", "mobileNoTblId" + rowCount);
	mobileNumberHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].mobileNumber");
	mobileNumberHidden.setAttribute("value", mobileNumber);
	mobileNumberCell.appendChild(mobileNumberHidden);
	var mobileNumberTxt = document.createTextNode(mobileNumber);
	mobileNumberCell.appendChild(mobileNumberTxt);

	
	var emailIDHidden = document.createElement("input");
	emailIDHidden.setAttribute("type", "hidden");
	emailIDHidden.setAttribute("id", "emialtblId" + rowCount);
	emailIDHidden.setAttribute("name", "property.owners[" + rowCount
		+ "].emailID");
	emailIDHidden.setAttribute("value", emailId);
	mobileNumberCell.appendChild(emailIDHidden);
	
	if ($("#emailOtpGenPtrFlag").val() != null && $("#emailOtpGenPtrFlag").val() == 'true') {
		var emailIDCell = addRow.insertCell(-1);
		var emailIDTxt = document.createTextNode(emailId);
		emailIDCell.appendChild(emailIDTxt);
		var otpvalEmail = $('#isOtpValidatedEmail').val();
		var otpEmailValidateStatus = document.createElement("input");
		otpEmailValidateStatus.setAttribute("type", "hidden");
		otpEmailValidateStatus.setAttribute("id", "emailtblValidateId" + rowCount);
		otpEmailValidateStatus.setAttribute("name", "property.owners[" + rowCount
			+ "].isOtpValidatedEmail");
		otpEmailValidateStatus.setAttribute("value", otpvalEmail);
		emailIDCell.appendChild(otpEmailValidateStatus);
	}
	
	

	// var panNumberCell = addRow.insertCell(-1);
	var panNumberHidden = document.createElement("input");
	panNumberHidden.setAttribute("type", "hidden");
	panNumberHidden.setAttribute("id", "panNoTblId" + rowCount);
	panNumberHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].panNumber");
	panNumberHidden.setAttribute("value", panNumber);
	mobileNumberCell.appendChild(panNumberHidden);
	// var panNumberTxt = document.createTextNode(panNumber);
	// panNumberCell.appendChild(panNumberTxt);
	// if(ownershipPercentage != null){
	var ownershipPercentageCell = addRow.insertCell(-1);
	var ownershipPercentageHidden = document.createElement("input");
	// ownershipPercentageHidden.setAttribute("id", "addedOwnershipPercentageID"

	ownershipPercentageHidden.setAttribute("id", "ownrPercntgTblId" + rowCount);

	ownershipPercentageHidden.setAttribute("type", "hidden");
	ownershipPercentageHidden.setAttribute("name", "property.owners["
			+ rowCount + "].ownershipPercentage");
	ownershipPercentageHidden.setAttribute("value", ownershipPercentage);
	ownershipPercentageCell.appendChild(ownershipPercentageHidden);
	var ownershipPercentageTxt = document.createTextNode(ownershipPercentage);
	ownershipPercentageCell.appendChild(ownershipPercentageTxt);

	var ownerRebateCell = addRow.insertCell(-1);
	var ownershipRebateHidden = document.createElement("input");
	ownershipRebateHidden.setAttribute("id", "rebatGuidTblID" + rowCount);
	ownershipRebateHidden.setAttribute("type", "hidden");
	ownershipRebateHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].ownerRebateGuid");
	ownershipRebateHidden.setAttribute("value", ownerRebate);
	ownerRebateCell.appendChild(ownershipRebateHidden);

	var ownerRebate = document.createElement("input");
	ownerRebate.setAttribute("id", "rebatTblId" + rowCount);
	ownerRebate.setAttribute("type", "hidden");
	ownerRebate.setAttribute("name", "property.owners[" + rowCount
			+ "].ownerRebate");
	ownerRebate.setAttribute("value", ownerRebateValue);
	ownerRebateCell.appendChild(ownerRebate);
	var ownershipRebateTxt = document.createTextNode(ownerRebateValue);
	ownerRebateCell.appendChild(ownershipRebateTxt);

	var ownerAddressDetailCell = addRow.insertCell(-1);
	var ownerAddressLine1Hidden = document.createElement("input");
	ownerAddressLine1Hidden.setAttribute("type", "hidden");
	ownerAddressLine1Hidden.setAttribute("id", "adrs1TblId"+rowCount);
	ownerAddressLine1Hidden.setAttribute("name", "property.owners[" + rowCount
			+ "].addressLine1");
	ownerAddressLine1Hidden.setAttribute("value", ownerAddressLine1);
	ownerAddressDetailCell.appendChild(ownerAddressLine1Hidden);
	
	var ownerAddressLine1Txt = document.createTextNode(ownerAddressLine1+ " , ");
	ownerAddressDetailCell.appendChild(ownerAddressLine1Txt);

	var ownerAddressLine2Hidden = document.createElement("input");
	ownerAddressLine2Hidden.setAttribute("type", "hidden");
	ownerAddressLine2Hidden.setAttribute("id", "adrs2TblId"+rowCount);
	ownerAddressLine2Hidden.setAttribute("name", "property.owners[" + rowCount
			+ "].addressLine2");
	ownerAddressLine2Hidden.setAttribute("value", ownerAddressLine2);
	ownerAddressDetailCell.appendChild(ownerAddressLine2Hidden);

	var ownerAddressLine2Txt = document.createTextNode(ownerAddressLine2+ " , ");
	ownerAddressDetailCell.appendChild(ownerAddressLine2Txt);

	var ownerDistrictHidden = document.createElement("input");
	ownerDistrictHidden.setAttribute("type", "hidden");
	ownerDistrictHidden.setAttribute("id", "districtGuid"+rowCount);
	ownerDistrictHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].districtGuid");
	ownerDistrictHidden.setAttribute("value", ownerDistrict);
	ownerAddressDetailCell.appendChild(ownerDistrictHidden);
	var ownerDistrictTxt = document.createTextNode(ownerDistrictValue + " , ");

	var ownerStateHidden = document.createElement("input");
	ownerStateHidden.setAttribute("type", "hidden");
	ownerStateHidden.setAttribute("id", "stateGuid"+rowCount);
	ownerStateHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].stateGuid");
	ownerStateHidden.setAttribute("value", ownerState);

	var ownerStateTxt = document.createTextNode(ownerStateValue + " , ");
	ownerAddressDetailCell.appendChild(ownerStateTxt);

	var ownerCountryHidden = document.createElement("input");
	ownerCountryHidden.setAttribute("type", "hidden");
	ownerCountryHidden.setAttribute("id", "countryGuid"+rowCount);
	ownerCountryHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].countryGuid");
	ownerCountryHidden.setAttribute("value", ownerCountry);
	ownerAddressDetailCell.appendChild(ownerCountryHidden);
	var ownerCountryTxt = document.createTextNode(ownerCountryValue);

	var ownerPincodeHidden = document.createElement("input");
	ownerPincodeHidden.setAttribute("type", "hidden");
	ownerPincodeHidden.setAttribute("id", "pinTblId"+rowCount);
	ownerPincodeHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].pincode");
	ownerPincodeHidden.setAttribute("value", ownerPincode);
	ownerAddressDetailCell.appendChild(ownerPincodeHidden);
	var ownerPincodeTxt = document.createTextNode(ownerPincode);

	ownerAddressDetailCell.appendChild(ownerDistrictTxt);
	ownerAddressDetailCell.appendChild(ownerStateHidden);
	ownerAddressDetailCell.appendChild(ownerCountryTxt);
	ownerAddressDetailCell.appendChild(ownerPincodeTxt);

	/*
	 * var dobCell = addRow.insertCell(-1); var dobHidden =
	 * document.createElement("input"); dobHidden.setAttribute("type",
	 * "hidden"); dobHidden.setAttribute("name", "property.owners[" + rowCount +
	 * "].dob"); dobHidden.setAttribute("value", dob);
	 * dobCell.appendChild(dobHidden); var dobTxt =
	 * document.createTextNode(dob); dobCell.appendChild(dobTxt);
	 */

	var editHrefCell = addRow.insertCell(-1);
	var icon = document.createElement("I");
	icon.setAttribute("area-hidden", true);
	icon.setAttribute("class", 'fa fa-pencil-square-o');
	editHrefCell.appendChild(icon);

	var x = document.createElement("A");
	var t = document.createTextNode("EDIT");
	x.setAttribute("href", 'javascript:editOwnerRow(' + rowCount + ')');
	x.setAttribute("class", 'text-blue');
	x.appendChild(t);
	editHrefCell.appendChild(x);
	
	var delCell = addRow.insertCell(-1);
	var a = document.createElement("A");
	var r = document.createTextNode("REMOVE");
	a.setAttribute("href", 'javascript:removeOwnerRow(' + rowCount + ')');
	a.setAttribute("class", 'text-red');
	a.appendChild(r);
	delCell.appendChild(a);
	/*var optMobileValidateCell = addRow.insertCell(-1);*/
	var otpValidateStatus = document.createElement("input");
	otpValidateStatus.setAttribute("type", "hidden");
	otpValidateStatus.setAttribute("id", "isOtpValidatedMobile"+rowCount );
	otpValidateStatus.setAttribute("name", "property.owners[" + rowCount
			+ "].isOtpValidatedMobile");
	otpValidateStatus.setAttribute("value", otpval);
	mobileNumberCell.appendChild(otpValidateStatus);
	
	/*var otp = document.createTextNode(otpval);
	optValidateCell.appendChild(otp);*/
	
	/*var optEmailValidateCell = addRow.insertCell(-1);*/
	if ($("#emailOtpGenPtrFlag").val() != null && $("#emailOtpGenPtrFlag").val() == 'true') {
//		var otpvalEmail = $('#isOtpValidatedEmail').val();
//		var emailIDCell = addRow.insertCell(-1);
//		var otpEmailValidateStatus = document.createElement("input");
//		otpEmailValidateStatus.setAttribute("type", "hidden");
//		otpEmailValidateStatus.setAttribute("id", "isOtpValidatedEmail" + rowCount);
//		otpEmailValidateStatus.setAttribute("name", "property.owners[" + rowCount
//			+ "].isOtpValidatedEmail");
//		otpEmailValidateStatus.setAttribute("value", otpvalEmail);
//		emailIDCell.appendChild(otpEmailValidateStatus);
	}
	
	$('#firstNameID').val('');
	$('#middleNameID').val('');
	$('#lastNameID').val('');
	$('#genderIDSelect').val('');
	$('#genderIDSelect').select2().trigger('change');
	$('#dobID').val('');
	$('#ageID').val('');	
	$('#countryCodeID').select2().trigger('change');
	$('#mobileNumberID').val('');
	$('#emailID').val('');
	$('#panNumberID').val('');
	$('#emailID').val('');
	/*$('#otpValidateId').val('');*/
	if (multiple == 'false') {
		$('#ownershipPercentageID').val('100');
	} else {
		$('#ownershipPercentageID').val('100');
	}
	$('#ownerAddressLine1ID').val('');
	$('#ownerAddressLine2ID').val('');
	$('#ownerPincodeID').val('');
	// $('#ownerCountryIDSelect').val('');
	// $('#ownerCountryIDSelect').select2().trigger('change');
	$('#ownerStateIDSelect').val('');
	$('#ownerStateIDSelect').select2().trigger('change');
	$('#ownerDistrictIDSelect').val('');
	$('#ownerDistrictIDSelect').select2().trigger('change');
	$('#ownerRebateIDSelect').val('');
	$('#ownerRebateIDSelect').select2().trigger('change');
	setDefaultColorForFormInputs();

	addRow.setAttribute("class", "highlightRowGreen");
	addRow.setAttribute("id", "owner" + rowCount);
	$("#owner" + rowCount).removeClass("highlightRowGreen", 5000);
	$('#firstNameID').focus();

	if ($('#actionTypeID').val() != 'createupic') {
		window.scrollTo(0, 0);
	}
	
return true;
}

function removeOwnerRow(rowCnt){
	var cnt=0;
	let nextIndex=0;
	var totRow=$('tbody tr').length;
	if (totRow == 1) {
		$("#EditRow").val('');
	}
	
//	if(totRow>1){
	
	
	
	
	
		$('table tbody tr').each(function(){
//			alert($('tbody tr').length);
			if(cnt>=rowCnt && rowCnt<totRow-1){
				nextIndex=parseInt(rowCnt)+1;
				
				 
				 var firstNmTblId = $("#firstNmTblId"+rowCnt).val($("#firstNmTblId"+nextIndex).val());
				 var midNmTblId = $("#midNmTblId"+rowCnt).val($("#midNmTblId"+nextIndex).val());
				 var lastNmTblId =  $("#lastNmTblId"+rowCnt).val($("#lastNmTblId"+nextIndex).val());
				
				
				$(this).find('td:eq(0)').text($(this).next('tr').find('td:eq(0)').text());
				$(this).find('td:eq(0)').append(firstNmTblId);
				$(this).find('td:eq(0)').append(midNmTblId);
				$(this).find('td:eq(0)').append(lastNmTblId);
				
				
				
				var genderTblId = $("#genderTblId"+rowCnt).val($("#genderTblId"+nextIndex).val());
				 
				$(this).find('td:eq(1)').text($(this).next('tr').find('td:eq(1)').text());
				$(this).find('td:eq(1)').append(genderTblId);
				
				
				
				
				var dobTblId = $("#dobTblId"+rowCnt).val($("#dobTblId"+nextIndex).val());
				var ageTblId = $("#ageTblId"+rowCnt).val($("#ageTblId"+nextIndex).val())
				
				$(this).find('td:eq(2)').text($(this).next('tr').find('td:eq(2)').text());
				$(this).find('td:eq(2)').append(dobTblId);
				$(this).find('td:eq(2)').append(ageTblId);
				
				
				
				var countryCodeTblId =  $("#countryCodeTblId"+rowCnt).val($("#countryCodeTblId"+nextIndex).val())
				
				$(this).find('td:eq(3)')
				.text($(this).next('tr').find('td:eq(3)').text());
				$(this).find('td:eq(3)').append(countryCodeTblId);
				
				
				var mobileNoTblId = $("#mobileNoTblId"+rowCnt).val($("#mobileNoTblId"+nextIndex).val())
				var emialtblId = $("#emialtblId"+rowCnt).val($("#emialtblId"+nextIndex).val())
				var panNoTblId = $("#panNoTblId"+rowCnt).val($("#panNoTblId"+nextIndex).val())
				
				$(this).find('td:eq(4)').text($(this).next('tr').find('td:eq(4)').text());
				$(this).find('td:eq(4)').append(mobileNoTblId);
				$(this).find('td:eq(4)').append(emialtblId);
				$(this).find('td:eq(4)').append(panNoTblId);
				
				
				var mobileNoTblId = $("#ownrPercntgTblId"+rowCnt).val($("#ownrPercntgTblId"+nextIndex).val())
				$(this).find('td:eq(5)').text($(this).next('tr').find('td:eq(5)').text());
				$(this).find('td:eq(5)').append(mobileNoTblId);
				
				
				var rebatGuidTblID =$("#rebatGuidTblID"+rowCnt).val($("#rebatGuidTblID"+nextIndex).val())
				var rebatTblId =$("#rebatTblId"+rowCnt).val($("#rebatTblId"+nextIndex).val())
				var rebateCode =$("#rebateCode"+rowCnt).val($("#rebateCode"+nextIndex).val())
				
				$(this).find('td:eq(6)').text($(this).next('tr').find('td:eq(6)').text());
				$(this).find('td:eq(6)').append(rebatGuidTblID);
				$(this).find('td:eq(6)').append(rebatTblId);
				$(this).find('td:eq(6)').append(rebateCode);
				
				
				var adrs1TblId =$("#adrs1TblId"+rowCnt).val($("#adrs1TblId"+nextIndex).val());
				var adrs2TblId =$("#adrs2TblId"+rowCnt).val($("#adrs2TblId"+nextIndex).val());
				var pinTblId =$("#pinTblId"+rowCnt).val($("#pinTblId"+nextIndex).val());
				var countryGuid =$("#countryGuid"+rowCnt).val($("#countryGuid"+nextIndex).val());
				var stateGuid =$("#stateGuid"+rowCnt).val($("#stateGuid"+nextIndex).val());
				var districtGuid =$("#districtGuid"+rowCnt).val($("#districtGuid"+nextIndex).val());
				
				$(this).find('td:eq(7)').text($(this).next('tr').find('td:eq(7)').text());
				
				$(this).find('td:eq(7)').append(adrs1TblId)
				.append(adrs2TblId)
				.append(pinTblId)
				.append(countryGuid)
				.append(stateGuid)
				.append(districtGuid);
				rowCnt++;
			}
			cnt++;
			
		});
		
		$('table tr:last').remove();
//	}
	if ($("#ownerTypeIDSelect option:selected").text() == 'SINGLE OWNER') {
		$("#addOwnerDetailIndividualBtnID").prop('disabled', false);
	}
	hideOwnerDetail(false);
}

function addOrganisationOwner() {

	var rebate = $('#ownerRebateIDSelect').val();

	var actionType = $('#actionTypeID').val();

	if (rebate == "" || rebate == '' || rebate == null) {
		createSmallAlert("Please Select Owner Rebate  .");
		$('#ownerRebateIDSelect').focus();
		return;
	}
	var countryCode = $('#countryCodeID').find('option:selected').val();

	var organisationName = $('#organisationNameID').val();
	var authorizedPersonName = $('#authorizedPersonNameID').val();
	var panNumber = $('#panNumberID').val();
	var mobileNumber = $('#mobileNumberID').val();
	var emailId = $('#emailID').val();
	var ownershipPercentage = $('#ownershipPercentageID').val();
	var ownerRebate = $('#ownerRebateIDSelect').find('option:selected').val();
	var ownerRebateValue = $('#ownerRebateIDSelect').find('option:selected')
			.text();
	var ownerAddressLine1 = $('#ownerAddressLine1ID').val();
	var ownerAddressLine2 = $('#ownerAddressLine2ID').val();
	var ownerPincode = $('#ownerPincodeID').val();
	var ownerCountry = $('#ownerCountryIDSelect').find('option:selected').val();
	var ownerCountryValue = $('#ownerCountryIDSelect').find('option:selected')
			.text();
	var ownerState = $('#ownerStateIDSelect').find('option:selected').val();
	var ownerStateValue = $('#ownerStateIDSelect').find('option:selected')
			.text();
	var ownerDistrict = $('#ownerDistrictIDSelect').find('option:selected')
			.val();
	var ownerDistrictValue = $('#ownerDistrictIDSelect')
			.find('option:selected').text();

	var table = document.getElementById("ownerTableGridID");
	var tbody = table.tBodies[0];
	var rowCount = tbody.rows.length;

	//filter to check all zeros
	if ($('#mobileNumberID').filter(function() {
				
        return parseInt(this.value, 16) !== 0;
    }).length === 0) {
    
		createSmallAlert('Enter valid Mobile no ');
		return;
}
else {
    // At least one has a non-zero value
}
	
	if (countryCode == 91 && mobileNumber.length != 10) {
	createSmallAlert('Enter valid Indian mobile no of 10 digits');
	return;
	}
	var multiple = $('#multipleOwnerID').val();

	// sanjay
	var editrow = $("#EditRow").val();

	var editrowno = Number(editrow);
	var editrowpercentage = Number(0);

	var ownSum = Number(0);

	if (multiple == 'false' && editrow.length == 0 && rowCount > 0) {
		createSmallAlert('Multiple Owner For The Property Is Not Allowed');
		return;
	}

	for (var i = 0; i < rowCount; i++) {

		ownSum = ownSum + Number($('#ownrPercntgTblId' + i).val());

	}

	if (editrow != null && editrow.length > 0) {
		ownSum = ownSum - Number($('#ownrPercntgTblId' + editrowno).val());
		rowCount = editrowno;

	}

	if (Math.round(Number(ownershipPercentage) <= 0)) {
		createSmallAlert('ownership percentage should be from 1 to 100 %');
		return;
	}

	if (ownSum + Number(ownershipPercentage) > 100) {
		// createSmallAlert('Addition Not Allowed As Ownership Percentage Will
		// Be
		// Above Maximum By Adding');
		createSmallAlert('Addition of ownership percentage can not exceed 100%');
		return;
	}
	
	if (ownSum + Number(ownershipPercentage) == 100) {
		hideOwnerDetail(true);
	}

	if (multiple == 'false' && (ownSum + Number(ownershipPercentage) != 100)) {
		createSmallAlert('Ownership percentage should be 100%');
		return;
	}

	if (multiple == 'true' && (Number(ownershipPercentage) > 99.90)) {
		createSmallAlert('Maximum Individual Ownership Percentage permitted are 99.90 % for Joint Ownership Case .');
		hideOwnerDetail(false);
		return;
	}

	$("#EditRow").val('');

	if (editrow != null && editrow.length > 0) {
		removeSelectedOwner(editrow);

	}

	var addRow;
	if (editrow != null && editrow.length > 0) {
		addRow = tbody.insertRow(rowCount);
	} else {
		addRow = tbody.insertRow(-1);
	}

	/*
	 * var ownSum = Number(0); for (var i = 0; i < rowCount; i++) {
	 * 
	 * 
	 * ownSum = Number(ownSum) + Number($('#ownrPercntgTblId'+i).val()); } if
	 * ((Number(ownSum) + Number(ownershipPercentage)) > 100) {
	 * createSmallAlert('Addition of ownership percentage can not exceed 100%');
	 * return; }
	 * 
	 * var addRow = tbody.insertRow(-1);
	 */

	var organisationNameCell = addRow.insertCell(-1);
	var organisationNameHidden = document.createElement("input");
	organisationNameHidden.setAttribute("type", "hidden");
	organisationNameHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].organisationName");
	organisationNameHidden.setAttribute("id", "orgTblId" + rowCount);
	organisationNameHidden.setAttribute("value", organisationName);
	organisationNameCell.appendChild(organisationNameHidden);
	var organisationNameTxt = document.createTextNode(organisationName);
	organisationNameCell.appendChild(organisationNameTxt);

	var authorizedPersonNameCell = addRow.insertCell(-1);
	var authorizedPersonNameHidden = document.createElement("input");
	authorizedPersonNameHidden.setAttribute("type", "hidden");
	authorizedPersonNameHidden.setAttribute("name", "property.owners["
			+ rowCount + "].authorizedPersonName");
	authorizedPersonNameHidden.setAttribute("id", "authTblId" + rowCount);
	authorizedPersonNameHidden.setAttribute("value", authorizedPersonName);
	authorizedPersonNameCell.appendChild(authorizedPersonNameHidden);
	var authorizedPersonNameTxt = document.createTextNode(authorizedPersonName);
	authorizedPersonNameCell.appendChild(authorizedPersonNameTxt);

	var panNumberCell = addRow.insertCell(-1);
	var panNumberHidden = document.createElement("input");
	panNumberHidden.setAttribute("type", "hidden");
	panNumberHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].panNumber");
	panNumberHidden.setAttribute("id", "orgPanTblId" + rowCount);
	panNumberHidden.setAttribute("value", panNumber);
	panNumberCell.appendChild(panNumberHidden);
	var panNumberTxt = document.createTextNode(panNumber);
	panNumberCell.appendChild(panNumberTxt);
	
	//country code
	var countryCodeCell = addRow.insertCell(-1);
	var countryCodeHidden = document.createElement("input");
	countryCodeHidden.setAttribute("type", "hidden");
	countryCodeHidden.setAttribute("id", "countryCodeTblId" + rowCount);
	countryCodeHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].mobCntryCode");
	countryCodeHidden.setAttribute("value", countryCode);
	countryCodeCell.appendChild(countryCodeHidden);
	var countryCodeTxt = document.createTextNode(countryCode);
	countryCodeCell.appendChild(countryCodeTxt);

	
	var mobileNumberCell = addRow.insertCell(-1);
	var mobileNumberHidden = document.createElement("input");
	mobileNumberHidden.setAttribute("type", "hidden");
	mobileNumberHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].mobileNumber");
	mobileNumberHidden.setAttribute("id", "mobileNoTblId" + rowCount);
	mobileNumberHidden.setAttribute("value", mobileNumber);
	mobileNumberCell.appendChild(mobileNumberHidden);
	var mobileNumberTxt = document.createTextNode(mobileNumber);
	mobileNumberCell.appendChild(mobileNumberTxt);

	var emailIDCell = addRow.insertCell(-1);
	var emailIDHidden = document.createElement("input");
	emailIDHidden.setAttribute("type", "hidden");
	emailIDHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].emailID");
	emailIDHidden.setAttribute("id", "emialtblId" + rowCount);
	emailIDHidden.setAttribute("value", emailId);
	emailIDCell.appendChild(emailIDHidden);
	var emailIDTxt = document.createTextNode(emailId);
	emailIDCell.appendChild(emailIDTxt);

	if (ownershipPercentage != null) {
		var ownershipPercentageCell = addRow.insertCell(-1);
		var ownershipPercentageHidden = document.createElement("input");
		ownershipPercentageHidden.setAttribute("id", "ownrPercntgTblId"
				+ rowCount);
		ownershipPercentageHidden.setAttribute("type", "hidden");
		ownershipPercentageHidden.setAttribute("name", "property.owners["
				+ rowCount + "].ownershipPercentage");
		ownershipPercentageHidden.setAttribute("value", ownershipPercentage);
		ownershipPercentageCell.appendChild(ownershipPercentageHidden);
		var ownershipPercentageTxt = document
				.createTextNode(ownershipPercentage);
		ownershipPercentageCell.appendChild(ownershipPercentageTxt);
	}

	if (ownerRebate != null) {
		var ownerRebateCell = addRow.insertCell(-1);
		var ownershipRebateHidden = document.createElement("input");
		ownershipRebateHidden.setAttribute("id", "addedOwnerRebateID"
				+ rowCount);
		ownershipRebateHidden.setAttribute("type", "hidden");
		ownershipRebateHidden.setAttribute("name", "property.owners["
				+ rowCount + "].ownerRebateGuid");
		ownershipRebateHidden.setAttribute("value", ownerRebate);
		ownerRebateCell.appendChild(ownershipRebateHidden);

		var ownerRebate = document.createElement("input");
		ownerRebate.setAttribute("id", "addedOwnerID" + rowCount);
		ownerRebate.setAttribute("type", "hidden");
		ownerRebate.setAttribute("name", "property.owners[" + rowCount
				+ "].ownerRebate");
		ownerRebate.setAttribute("value", ownerRebateValue);
		ownerRebateCell.appendChild(ownerRebate);
		var ownershipRebateTxt = document.createTextNode(ownerRebateValue);
		ownerRebateCell.appendChild(ownershipRebateTxt);
	}

	var ownerAddressDetailCell = addRow.insertCell(-1);
	var ownerAddressLine1Hidden = document.createElement("input");
	ownerAddressLine1Hidden.setAttribute("type", "hidden");
	ownerAddressLine1Hidden.setAttribute("name", "property.owners[" + rowCount
			+ "].addressLine1");
	ownerAddressLine1Hidden.setAttribute("id", "adrs1TblId" + rowCount);
	ownerAddressLine1Hidden.setAttribute("value", ownerAddressLine1);
	ownerAddressDetailCell.appendChild(ownerAddressLine1Hidden);
	var ownerAddressLine1Txt = document.createTextNode(ownerAddressLine1);
	ownerAddressDetailCell.appendChild(ownerAddressLine1Txt);

	var ownerAddressLine2Hidden = document.createElement("input");
	ownerAddressLine2Hidden.setAttribute("type", "hidden");
	ownerAddressLine2Hidden.setAttribute("name", "property.owners[" + rowCount
			+ "].addressLine2");
	ownerAddressLine2Hidden.setAttribute("id", "adrs2TblId" + rowCount);
	ownerAddressLine2Hidden.setAttribute("value", ownerAddressLine2);
	ownerAddressDetailCell.appendChild(ownerAddressLine2Hidden);
	var ownerAddressLine2Txt = document.createTextNode(ownerAddressLine2);
	ownerAddressDetailCell.appendChild(ownerAddressLine2Txt);

	var ownerPincodeHidden = document.createElement("input");
	ownerPincodeHidden.setAttribute("type", "hidden");
	ownerPincodeHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].pincode");
	ownerPincodeHidden.setAttribute("id", "pinTblId" + rowCount);
	ownerPincodeHidden.setAttribute("value", ownerPincode);
	ownerAddressDetailCell.appendChild(ownerPincodeHidden);
	var ownerPincodeTxt = document.createTextNode(ownerPincode);

	var ownerCountryHidden = document.createElement("input");
	ownerCountryHidden.setAttribute("type", "hidden");
	ownerCountryHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].countryGuid");
	ownerCountryHidden.setAttribute("id", "cuntryTblId" + rowCount);
	ownerCountryHidden.setAttribute("value", ownerCountry);
	ownerAddressDetailCell.appendChild(ownerCountryHidden);
	var ownerCountryTxt = document.createTextNode(ownerCountryValue);

	var ownerStateHidden = document.createElement("input");
	ownerStateHidden.setAttribute("type", "hidden");
	ownerStateHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].stateGuid");
	ownerStateHidden.setAttribute("id", "statTblId" + rowCount);
	ownerStateHidden.setAttribute("value", ownerState);
	ownerAddressDetailCell.appendChild(ownerStateHidden);
	var ownerStateTxt = document.createTextNode(ownerStateValue);

	var ownerDistrictHidden = document.createElement("input");
	ownerDistrictHidden.setAttribute("type", "hidden");
	ownerDistrictHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].districtGuid");
	ownerDistrictHidden.setAttribute("id", "distTblId" + rowCount);
	ownerDistrictHidden.setAttribute("value", ownerDistrict);
	ownerAddressDetailCell.appendChild(ownerDistrictHidden);
	var ownerDistrictTxt = document.createTextNode(ownerDistrictValue);

	ownerAddressDetailCell.appendChild(ownerDistrictTxt);
	ownerAddressDetailCell.appendChild(ownerStateTxt);
	ownerAddressDetailCell.appendChild(ownerCountryTxt);
	ownerAddressDetailCell.appendChild(ownerPincodeTxt);

	var editHrefCell = addRow.insertCell(-1);
	var icon = document.createElement("I");
	icon.setAttribute("area-hidden", true);
	icon.setAttribute("class", 'fa fa-pencil-square-o');
	editHrefCell.appendChild(icon);

	var x = document.createElement("A");
	var t = document.createTextNode("EDIT");
	x.setAttribute("href", 'javascript:editOwnerRowOrganisation(' + rowCount
			+ ')');
	x.setAttribute("class", 'text-blue');
	x.appendChild(t);
	editHrefCell.appendChild(x);

	
	var delCell = addRow.insertCell(-1);
	var a = document.createElement("A");
	var r = document.createTextNode("REMOVE");
	a.setAttribute("href", 'javascript:removeOwner()');
	a.setAttribute("class", 'text-red');
	a.appendChild(r);
	delCell.appendChild(a);
	
	
	$('#organisationNameID').val('');
	$('#authorizedPersonNameID').val('');
	$('#panNumberID').val('');
	$('#countryCodeID').select2().trigger('change');
	$('#mobileNumberID').val('');
	$('#emailID').val('');
	if (multiple == 'false') {
		$('#ownershipPercentageID').val('100');
	} else {
		$('#ownershipPercentageID').val('');
	}
	$('#ownerAddressLine1ID').val('');
	$('#ownerAddressLine2ID').val('');
	$('#ownerPincodeID').val('');
	// $('#ownerCountryIDSelect').val('');
	// $('#ownerCountryIDSelect').select2().trigger('change');
	$('#ownerStateIDSelect').val('');
	$('#ownerStateIDSelect').select2().trigger('change');
	$('#ownerDistrictIDSelect').val('');
	$('#ownerDistrictIDSelect').select2().trigger('change');
//	$('#ownerRebateIDSelect').val('');
//	$('#ownerRebateIDSelect').select2().trigger('change');
	// Set Default Color
	setDefaultColorForOrg();
	addRow.setAttribute("class", "highlightRowGreen");
	addRow.setAttribute("id", "owner" + rowCount);
	$("#owner" + rowCount).removeClass("highlightRowGreen", 5000);
	if ($('#actionTypeID').val() != 'createupic') {
		window.scrollTo(0, 0);
	}

}

function addGovernmentOwner() {

	var actionType = $('#actionTypeID').val();

	var rebate = $('#ownerRebateIDSelect').val();

	if (rebate == "" || rebate == '' || rebate == null) {
		createSmallAlert("For Govt Properties Detail of Only one Representative is allowed.");
		// $('#ownerRebateIDSelect').focus(); should be coorected with owner
		// rebate in govt
		return;
	}

	var countryCode = $('#countryCodeID').find('option:selected').val();

	var governmentType = $('#governmentTypeIdSelect').val();
	var departmentName = $('#departmentID').val();
	var tanNumber = $('#tanNumberID').val();
	var authorizedPersonName = $('#authorizedPersonNameID').val();
	var mobileNumber = $('#mobileNumberID').val();
	var emailId = $('#emailID').val();
	var ownershipPercentage = $('#ownershipPercentageID').val();
	var ownerRebate = $('#ownerRebateIDSelect').find('option:selected').val();
	var ownerRebateValue = $('#ownerRebateIDSelect').find('option:selected')
			.text();

	var ownerAddressLine1 = $('#ownerAddressLine1ID').val();
	var ownerAddressLine2 = $('#ownerAddressLine2ID').val();
	var ownerPincode = $('#ownerPincodeID').val();
	var ownerCountry = $('#ownerCountryIDSelect').find('option:selected').val();
	var ownerCountryValue = $('#ownerCountryIDSelect').find('option:selected')
			.text();
	var ownerState = $('#ownerStateIDSelect').find('option:selected').val();
	var ownerStateValue = $('#ownerStateIDSelect').find('option:selected')
			.text();
	var ownerDistrict = $('#ownerDistrictIDSelect').find('option:selected')
			.val();
	var ownerDistrictValue = $('#ownerDistrictIDSelect')
			.find('option:selected').text();

	var table = document.getElementById("ownerTableGridID");
	var tbody = table.tBodies[0];
	var rowCount = tbody.rows.length;

	var multiple = $('#multipleOwnerID').val();

	// sanjay
	var editrow = $("#EditRow").val();

	// alert('editrow'+editrow);
	var editrowno = Number(editrow);
	var editrowpercentage = Number(0);
	var ownSum = Number(0);

	//filter to check all zeros
	if ($('#mobileNumberID').filter(function() {
				
        return parseInt(this.value, 16) !== 0;
    }).length === 0) {
    
		createSmallAlert('Enter valid Mobile no ');
		return;
}

	
	if (countryCode == 91 && mobileNumber.length != 10) {
		createSmallAlert('Enter valid Indian mobile no of 10 digits');
		return;
		}
	
	if (multiple == 'false' && editrow.length == 0 && rowCount > 0) {
		createSmallAlert('For Govt Properties Detail of Only one Representative is allowed');
		return;
	}

	for (var i = 0; i < rowCount; i++) {

		ownSum = ownSum + Number($('#ownrPercntgTblId' + i).val());

	}

	if (editrow != null && editrow.length > 0) {
		ownSum = ownSum - Number($('#ownrPercntgTblId' + editrowno).val());
		rowCount = editrowno;

	}

	if (Math.round(Number(ownershipPercentage) <= 0)) {
		createSmallAlert('ownership percentage should be from 1 to 100 %');
		return;
	}

	if (ownSum + Number(ownershipPercentage) > 100) {
		// createSmallAlert('Addition Not Allowed As Ownership Percentage Will
		// Be
		// Above Maximum By Adding');
		createSmallAlert('Addition of ownership percentage can not exceed 100%');
		return;
	}

	
	if (ownSum + Number(ownershipPercentage) == 100) {
		hideOwnerDetail(true);
	}
	
	
	if (multiple == 'false' && (ownSum + Number(ownershipPercentage) != 100)) {
		createSmallAlert('Ownership percentage should be 100%');
		return;
	}

	if (multiple == 'true' && (Number(ownershipPercentage) > 99.90)) {
		createSmallAlert('Maximum Individual Ownership Percentage permitted are 99.90 % for Joint Ownership Case .');
		hideOwnerDetail(false);
		return;
	}
	$("#EditRow").val('');

	if (editrow != null && editrow.length > 0) {
		removeSelectedOwner(editrow);

	}

	var addRow;
	if (editrow != null && editrow.length > 0) {
		addRow = tbody.insertRow(rowCount);
	} else {
		addRow = tbody.insertRow(-1);
	}

	/*
	 * var ownSum = Number(0); for (var i = 0; i < rowCount; i++) { ownSum =
	 * Number(ownSum) + Number($('#ownrPercntgTblId' + i).val()); } if
	 * ((Number(ownSum) + Number(ownershipPercentage)) > 100) {
	 * createSmallAlert('Addition of ownership percentage can not exceed 100%');
	 * return; }
	 * 
	 * var addRow = tbody.insertRow(-1);
	 */

	var governmentTypeCell = addRow.insertCell(-1);
	var governmentTypeHidden = document.createElement("input");
	governmentTypeHidden.setAttribute("type", "hidden");
	governmentTypeHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].governmentType");
	governmentTypeHidden.setAttribute("id", "ownrGvtTypId" + rowCount);

	governmentTypeHidden.setAttribute("value", governmentType);
	governmentTypeCell.appendChild(governmentTypeHidden);
	var governmentTypeTxt = document.createTextNode(governmentType);
	governmentTypeCell.appendChild(governmentTypeTxt);

	var departmentNameCell = addRow.insertCell(-1);
	var departmentNameHidden = document.createElement("input");
	departmentNameHidden.setAttribute("type", "hidden");
	departmentNameHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].department");
	departmentNameHidden.setAttribute("id", "deptId" + rowCount);
	departmentNameHidden.setAttribute("value", departmentName);
	departmentNameCell.appendChild(departmentNameHidden);
	var departmentNameTxt = document.createTextNode(departmentName);
	departmentNameCell.appendChild(departmentNameTxt);

	var tanNumberCell = addRow.insertCell(-1);
	var tanNumberHidden = document.createElement("input");
	tanNumberHidden.setAttribute("type", "hidden");
	tanNumberHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].tanNumber");
	tanNumberHidden.setAttribute("id", "gvtTanNoId" + rowCount);
	tanNumberHidden.setAttribute("value", tanNumber);
	tanNumberCell.appendChild(tanNumberHidden);
	var tanNumberTxt = document.createTextNode(tanNumber);
	tanNumberCell.appendChild(tanNumberTxt);

	var authorizedPersonNameCell = addRow.insertCell(-1);
	var authorizedPersonNameHidden = document.createElement("input");
	authorizedPersonNameHidden.setAttribute("type", "hidden");
	authorizedPersonNameHidden.setAttribute("name", "property.owners["
			+ rowCount + "].authorizedPersonName");
	authorizedPersonNameHidden.setAttribute("id", "authPersnId" + rowCount);
	authorizedPersonNameHidden.setAttribute("value", authorizedPersonName);
	authorizedPersonNameCell.appendChild(authorizedPersonNameHidden);
	var authorizedPersonNameTxt = document.createTextNode(authorizedPersonName);
	authorizedPersonNameCell.appendChild(authorizedPersonNameTxt);

	//country code
	var countryCodeCell = addRow.insertCell(-1);
	var countryCodeHidden = document.createElement("input");
	countryCodeHidden.setAttribute("type", "hidden");
	countryCodeHidden.setAttribute("id", "countryCodeTblId" + rowCount);
	countryCodeHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].mobCntryCode");
	countryCodeHidden.setAttribute("value", countryCode);
	countryCodeCell.appendChild(countryCodeHidden);
	var countryCodeTxt = document.createTextNode(countryCode);
	countryCodeCell.appendChild(countryCodeTxt);
	
	var mobileNumberCell = addRow.insertCell(-1);
	var mobileNumberHidden = document.createElement("input");
	mobileNumberHidden.setAttribute("type", "hidden");
	mobileNumberHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].mobileNumber");
	mobileNumberHidden.setAttribute("id", "mobileNoTblId" + rowCount);
	mobileNumberHidden.setAttribute("value", mobileNumber);
	mobileNumberCell.appendChild(mobileNumberHidden);
	var mobileNumberTxt = document.createTextNode(mobileNumber);
	mobileNumberCell.appendChild(mobileNumberTxt);

	var emailIDCell = addRow.insertCell(-1);
	var emailIDHidden = document.createElement("input");
	emailIDHidden.setAttribute("type", "hidden");
	emailIDHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].emailID");
	emailIDHidden.setAttribute("id", "emialtblId" + rowCount);
	emailIDHidden.setAttribute("value", emailId);
	emailIDCell.appendChild(emailIDHidden);
	var emailIDTxt = document.createTextNode(emailId);
	emailIDCell.appendChild(emailIDTxt);

	if (ownershipPercentage != null) {
		var ownershipPercentageCell = addRow.insertCell(-1);
		var ownershipPercentageHidden = document.createElement("input");
		ownershipPercentageHidden.setAttribute("id", "ownrPercntgTblId"
				+ rowCount);
		ownershipPercentageHidden.setAttribute("type", "hidden");
		ownershipPercentageHidden.setAttribute("name", "property.owners["
				+ rowCount + "].ownershipPercentage");
		ownershipPercentageHidden.setAttribute("value", ownershipPercentage);
		ownershipPercentageCell.appendChild(ownershipPercentageHidden);
		var ownershipPercentageTxt = document
				.createTextNode(ownershipPercentage);
		ownershipPercentageCell.appendChild(ownershipPercentageTxt);
	}

	// OWNER REBATE
	if (ownerRebate != null) {
		var ownerRebateCell = addRow.insertCell(-1);
		var ownershipRebateHidden = document.createElement("input");
		ownershipRebateHidden.setAttribute("id", "addedOwnerRebateID"
				+ rowCount);
		ownershipRebateHidden.setAttribute("type", "hidden");
		ownershipRebateHidden.setAttribute("name", "property.owners["
				+ rowCount + "].ownerRebateGuid");
		ownershipRebateHidden.setAttribute("value", ownerRebate);
		ownerRebateCell.appendChild(ownershipRebateHidden);
		var ownershipRebateTxt = document.createTextNode(ownerRebateValue);
		ownerRebateCell.appendChild(ownershipRebateTxt);
		var ownerRebate = document.createElement("input");
		ownerRebate.setAttribute("id", "addedOwnerID" + rowCount);
		ownerRebate.setAttribute("type", "hidden");
		ownerRebate.setAttribute("name", "property.owners[" + rowCount
				+ "].ownerRebate");
		ownerRebate.setAttribute("value", ownerRebateValue);
		ownerRebateCell.appendChild(ownerRebate);
	}

	var ownerAddressDetailCell = addRow.insertCell(-1);
	var ownerAddressLine1Hidden = document.createElement("input");
	ownerAddressLine1Hidden.setAttribute("type", "hidden");
	ownerAddressLine1Hidden.setAttribute("name", "property.owners[" + rowCount
			+ "].addressLine1");
	ownerAddressLine1Hidden.setAttribute("id", "adrs1TblId" + rowCount);
	ownerAddressLine1Hidden.setAttribute("value", ownerAddressLine1);
	ownerAddressDetailCell.appendChild(ownerAddressLine1Hidden);
	var ownerAddressLine1Txt = document.createTextNode(ownerAddressLine1);
	ownerAddressDetailCell.appendChild(ownerAddressLine1Txt);

	var ownerAddressLine2Hidden = document.createElement("input");
	ownerAddressLine2Hidden.setAttribute("type", "hidden");
	ownerAddressLine2Hidden.setAttribute("name", "property.owners[" + rowCount
			+ "].addressLine2");
	ownerAddressLine2Hidden.setAttribute("id", "adrs2TblId" + rowCount);
	ownerAddressLine2Hidden.setAttribute("value", ownerAddressLine2);
	ownerAddressDetailCell.appendChild(ownerAddressLine2Hidden);
	var ownerAddressLine2Txt = document.createTextNode(ownerAddressLine2);
	ownerAddressDetailCell.appendChild(ownerAddressLine2Txt);

	var ownerPincodeHidden = document.createElement("input");
	ownerPincodeHidden.setAttribute("type", "hidden");
	ownerPincodeHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].pincode");
	ownerPincodeHidden.setAttribute("id", "pinTblId" + rowCount);
	ownerPincodeHidden.setAttribute("value", ownerPincode);
	ownerAddressDetailCell.appendChild(ownerPincodeHidden);
	var ownerPincodeTxt = document.createTextNode(ownerPincode);

	var ownerCountryHidden = document.createElement("input");
	ownerCountryHidden.setAttribute("type", "hidden");
	ownerCountryHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].countryGuid");
	ownerCountryHidden.setAttribute("id", "cuntryTblId" + rowCount);
	ownerCountryHidden.setAttribute("value", ownerCountry);
	ownerAddressDetailCell.appendChild(ownerCountryHidden);
	var ownerCountryTxt = document.createTextNode(ownerCountryValue);

	var ownerStateHidden = document.createElement("input");
	ownerStateHidden.setAttribute("type", "hidden");
	ownerStateHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].stateGuid");
	ownerStateHidden.setAttribute("id", "statTblId" + rowCount);
	ownerStateHidden.setAttribute("value", ownerState);
	ownerAddressDetailCell.appendChild(ownerStateHidden);
	var ownerStateTxt = document.createTextNode(ownerStateValue);

	var ownerDistrictHidden = document.createElement("input");
	ownerDistrictHidden.setAttribute("type", "hidden");
	ownerDistrictHidden.setAttribute("name", "property.owners[" + rowCount
			+ "].districtGuid");
	ownerDistrictHidden.setAttribute("id", "distTblId" + rowCount);
	ownerDistrictHidden.setAttribute("value", ownerDistrict);
	ownerAddressDetailCell.appendChild(ownerDistrictHidden);
	var ownerDistrictTxt = document.createTextNode(ownerDistrictValue);

	ownerAddressDetailCell.appendChild(ownerDistrictTxt);
	ownerAddressDetailCell.appendChild(ownerStateTxt);
	ownerAddressDetailCell.appendChild(ownerCountryTxt);
	ownerAddressDetailCell.appendChild(ownerPincodeTxt);

	var editHrefCell = addRow.insertCell(-1);
	var icon = document.createElement("I");
	icon.setAttribute("area-hidden", true);
	icon.setAttribute("class", 'fa fa-pencil-square-o');
	editHrefCell.appendChild(icon);

	var x = document.createElement("A");
	var t = document.createTextNode("EDIT");
	x.setAttribute("href", 'javascript:editOwnerRowGovt(' + rowCount + ')');
	x.setAttribute("class", 'text-blue');
	x.appendChild(t);
	editHrefCell.appendChild(x);

	var delCell = addRow.insertCell(-1);
	var a = document.createElement("A");
	var r = document.createTextNode("REMOVE");
	a.setAttribute("href", 'javascript:removeOwner()');
	a.setAttribute("class", 'text-red');
	a.appendChild(r);
	delCell.appendChild(a);
	
	
	$('#governmentTypeIdSelect').val('');
	$('#governmentTypeIdSelect').select2().trigger('change');
	$('#departmentID').val('');
	$('#tanNumberID').val('');
	$('#authorizedPersonNameID').val('');
	$('#countryCodeID').select2().trigger('change');
	$('#mobileNumberID').val('');
	$('#emailID').val('');
	if (multiple == 'false') {
		$('#ownershipPercentageID').val('100');
	} else {
		$('#ownershipPercentageID').val('100');
	}
	$('#ownerAddressLine1ID').val('');
	$('#ownerAddressLine2ID').val('');
	$('#ownerPincodeID').val('');
	// $('#ownerCountryIDSelect').val('');
	// $('#ownerCountryIDSelect').select2().trigger('change');
	$('#ownerStateIDSelect').val('');
	$('#ownerStateIDSelect').select2().trigger('change');
	$('#ownerDistrictIDSelect').val('');
	$('#ownerDistrictIDSelect').select2().trigger('change');
//	$('#ownerRebateIDSelect').val('');
//	$('#ownerRebateIDSelect').select2().trigger('change');
	// Set Default Color
	setDefaultColorForGvtPage();
	addRow.setAttribute("class", "highlightRowGreen");
	addRow.setAttribute("id", "owner" + rowCount);
	$("#owner" + rowCount).removeClass("highlightRowGreen", 5000);
	if ($('#actionTypeID').val() != 'createupic') {
		window.scrollTo(0, 0);
	}
}

// Fetching code By GUID //Vikash
function fetchCodeByGuid(element) {
	var dddFlats = $('#dddFlats').val();
	var jantaFlats = $('#jantaFlats').val();
	var cghsFlats = $('#cghsFlats').val();
	var builderFloor = $('#builderFloor').val();
	var selectedGUID = element.value;
	if (selectedGUID != 0 && selectedGUID != '') {
		$
				.ajax({
					type : "GET",
					url : "web/citizen/property/getCode?filterValue="
							+ selectedGUID,
					cache : false,
					async : true,
					beforeSend : function() {

					},
					success : function(data, status, xhr) {
						if (data == dddFlats || data == jantaFlats
								|| data == cghsFlats) {
							return true;
						}
					}
				});
	} else {
		return false;
	}

}

$('#fetch').on(
		"click",
		function(e) {
			var colony = $('#colonyIDSelect').find('option:selected').val();
			var totallandarea = $('#landAreaID').val();
			var coveredarea = $('#coveredAreaID').val();
			var usefactor = $('#useFactorIDSelect').find('option:selected')
					.val();
			var structurefactor = $('#structureFactorIDSelect').find(
					'option:selected').val();
			var occupancyfactor = $('#occupancyFactorIDSelect').find(
					'option:selected').val();
			var agefactor = $('#ageFactorIDSelect').find('option:selected')
					.val();
			var exemption = $('#exemptionIDSelect').find('option:selected')
					.val();
			var propertytype = $('#propertyTypeIDSelect').find(
					'option:selected').val();

			if (colony == '') {
				createSmallAlert('Colony Is Mandatory');
				return;
			}
			if (totallandarea == '') {
				createSmallAlert('Total Land Area Is Mandatory');
				return;
			}
			if (coveredarea == '') {
				createSmallAlert('Covered Area Is Mandatory');
				return;
			}
			if (propertytype == '') {
				createSmallAlert('Property Type Is Mandatory');
				return;
			}
			if (usefactor == '') {
				createSmallAlert('Use Factor Is Mandatory');
				return;
			}
			if (occupancyfactor == '') {
				createSmallAlert('Occupancy Factor Is Mandatory');
				return;
			}
			if (agefactor == '') {
				createSmallAlert('Age Factor Is Mandatory');
				return;
			}
			if (propertytype == '') {
				createSmallAlert('Property Type Is Mandatory');
				return;
			}
			var reqURL = "web/citizen/property/taxCalc?cg=" + colony + "&tla="
					+ totallandarea + "&ca=" + coveredarea + "&uf=" + usefactor
					+ "&of=" + occupancyfactor + "&af=" + agefactor + "&pt="
					+ propertytype;
			if (structurefactor != '') {
				reqURL = reqURL + "&sf=" + structurefactor;
			}
			if (exemption != '') {
				reqURL = reqURL + "&e=" + exemption;
			}

			$.ajax({
				type : "GET",
				url : reqURL,
				cache : false,
				async : true,
				beforeSend : function() {
					$("#overlay").hide();
				},
				success : function(data, status, xhr) {
					if (data != null) {
						if (data.status == true) {
							showTab('2');
							$('#taxCalCulationLandAreaID').val(
									data.totalLandArea);
							$('#taxCalCulationCoveredAreaID').val(
									data.coveredArea);
							$('#taxCalCulationVacantLandID').val(
									data.vacantLandArea);
							$('#useFactorID').val(data.useFactorValue);
							$('#structureFactorID').val(
									data.structureFactorValue);
							$('#occupancyFactorID').val(
									data.occupancyFactorValue);
							$('#ageFactorID').val(data.ageFactorValue);
							$('#exemptionID').val(data.exemptionValue);
							$('#uavID').val(data.uav);
							$('#taxCategoryGuidID').val(data.taxCategoryGuid);
							$('#taxCategoryCodeID').val(data.taxCategoryCode);
							$('#taxCategoryNameID').val(data.taxCategoryName);
							$('#annaulValueID').val(data.annualValue);
							$('#taxRateID').val(data.taxRate);
							$('#taxCalculatedID').val(data.taxCalculated);
							$('#totalTaxID').val(data.totalTax);
							$('#fixedValueID').val(data.fixedFactorValue);
							$('#dueDateID').val(data.dueDate);
							$('#penalityAfterDueDateID').val(
									data.penalityAfterDueDate);
							$('#gracePeriodID').val(data.gracePeriod);
							$('#penalityAfteGracePeriodID').val(
									data.penalityAfterGracePeriod);
							$('#advanceRebateID').val(data.advancePayRebate);
						} else {
							$('#taxCalCulationLandAreaID').val('');
							$('#taxCalCulationCoveredAreaID').val('');
							$('#taxCalCulationVacantLandID').val('');
							$('#useFactorID').val('');
							$('#structureFactorID').val('');
							$('#occupancyFactorID').val('');
							$('#ageFactorID').val('');
							$('#exemptionID').val('');
							$('#uavID').val('');
							$('#taxCategoryGuidID').val('');
							$('#taxCategoryCodeID').val('');
							$('#taxCategoryNameID').val('');
							$('#annaulValueID').val('');
							$('#taxRateID').val('');
							$('#taxCalculatedID').val('');
							$('#totalTaxID').val('');
							$('#fixedValueID').val('');
							$('#dueDateID').val('');
							$('#penalityAfterDueDateID').val('');
							$('#gracePeriodID').val('');
							$('#penalityAfteGracePeriodID').val('');
							$('#advanceRebateID').val('');
						}
						createSmallAlert("Tax For UPIC ID : ' "
								+ $('#upid').val()
								+ " ' Calculated Successfully");
						$('#payTaxBtnId').prop('disabled', false);// Enable
						// 'Pay Tax'
						// Button

						// alert(data.statusMessage);
					} else {
						createSmallAlert("Error While Calculating Tax");
					}
					$("#overlay").hide();
				},
				error : function(e) {
					$("#overlay").hide();
				},
				complete : function() {
					$("#overlay").hide();
				}
			});
		});

// Add By Naveen Kumar(21/10/2019)

var blankfields = 0;
var isDrafted = false;

function validateOwnerForm(filter) {
	
	blankfields = 0;
	// var element = document.getElementById("ownerCategoryIDSelect");
	if (filter == 'G') {
		validateBlankfieldsForGvtDtlPage();
		if (blankfields == 0) {
			addGovernmentOwner();
			submitPropertyOwnerForm("ownerForm");
			
			 /* jQuery(':button').click(function () {
				    if (this.id == 'addOwnerDetailGovtBtnID') {
				    	console.log("Owner SAVE Button Clicked.");
				    	submitPropertyOwnerForm("ownerForm");
				    }
				    
				});*/
			
			
			

		}

	} else if (filter == 'I') {
		
	//var	otpValidatinStatus=$("#ownerOtpValidation").val();
		validateBlankfields();
		$("#mobileNumberID").removeAttr('readonly');
		$("#transfereeMobileNumsuc").hide();
		$("#otpgendiv").show();
		$("#otpvalidiv").hide();
		$("#validateOtpDiv").hide();
		$("#gntateOTP").prop('disabled', true);
		if (blankfields == 0) {
			
			var status = addIndividualOwner();
			
			console.log("Owner Validation Status : "+status);
			 if(status===true){
				  $("#transfereeEmailOtpSuss").hide();
	 			  $("#emailID").attr('readonly',false);
				 var isOwnrPrcntgValid = validateOwnerPercentage();
				// alert("isOwnrPrcntgValid : "+isOwnrPrcntgValid);
				 if(isOwnrPrcntgValid){
				 submitPropertyOwnerForm("ownerForm");
				 if(isNewProperty){
					// createSmallAlert('Details Saved Successfully.');
					 isNewProperty=false;
				 }
				 //alert("Owner saved in db");
				 console.log("Owner saved in db");
				 }else{
					 //alert("Owner % not valid");
					 console.log("Owner % not valid");
				 }

			 }else{
				 //alert("Owner Not save in db");
				 console.log("Owner Not save in db");
				 
			 }
			
			// For DISABLING ADDING MULTIPLE OWNERS IN CASE OF SINGLE OWNER
			if ($("#ownerTypeIDSelect option:selected").text() == 'SINGLE OWNER') {
				// $("#addOwnerDetailIndividualBtnID").prop('disabled', true);
			}

		}

	} else if (filter == 'O') {
		validateBlankfieldsForOrgPage();
		if (blankfields == 0) {
			addOrganisationOwner();
	    	submitPropertyOwnerForm("ownerForm");
			/* jQuery(':button').click(function () {
				    if (this.id == 'addOwnerDetailOrgBtnID') {
				    	console.log("Owner SAVE Button Clicked.");
				    	submitPropertyOwnerForm("ownerForm");
				    }
				    
				});*/
			
			
		}

	}
}


function validateOwnerPercentage(){
	 var table = document.getElementById("ownerTableGridID");

		var tbody = table.tBodies[0];
		var rowCount = tbody.rows.length;

		var ownSum = Number(0);
		for (var i = 0; i < rowCount; i++) {
			ownSum = ownSum + Number($('#ownrPercntgTblId' + i).val());
		}

		if (!isDrafted) {

			//alert("Owner % :"+ownSum);
			if ((rowCount > 0) && (ownSum <= 99.90)) {
				//createSmallAlert('Total ownership percentage should be more than 99.90 %');
				showTab('1');
				return false;
			}

			if (actionType != 'createupic') {
				/*var branchName = document.getElementById("branchNmId").value;
				var bankName = document.getElementById("bankNmId").value;
				var accountNo = document.getElementById("accountNoId").value;*/
			}

		
		}
		
		if(rowCount == 0){
			createSmallAlert("Please Add Owoner Before Submit");
			return false;
		}else{
		hideOwnerDetail(true);
		}
		
		hideOwnerDetail(true);
	return true;
	
}

function encData() {

	/*var accountNo = document.getElementById("accountNoId").value;

	if ((accountNo !== '')) {
		var encAcc = Encrypt(accountNo);
		document.getElementById("accountNoId").value = encAcc;

	}

	var bankName = document.getElementById("bankNmId").value;

	if (bankName !== '') {
		var encBankName = Encrypt(bankName);
		document.getElementById("bankNmId").value = encBankName;

	}

	var branchName = document.getElementById("branchNmId").value;

	if (branchName !== '') {
		var encBranchName = Encrypt(branchName);
		document.getElementById("branchNmId").value = encBranchName;
	}
*/
}

function validateForm() {
	if (!isDrafted) {
		if (document.getElementById("ownerTableGridID").rows.length > 1) {
			return true;
		}
		showTab('1');
		createSmallAlert("Please Click on SAVE button to add Owner Information . ");
		return false;
	} else {
		console.log("Button Clicked");
	}
}

function setDefaultColor(element) {
	element.style.borderColor = 'lightgray';
	element.style.backgroundColor = 'white';
}

function setDefaultColorForGvtPage() {
	var paintElement = document
			.getElementById('select2-governmentTypeIdSelect-container');
	setDefaultColor(paintElement.parentNode);

	element = document.getElementById("departmentID");
	setDefaultColor(element);

	element = document.getElementById("tanNumberID");
	setDefaultColor(element);

	element = document.getElementById("authorizedPersonNameID");
	setDefaultColor(element);

	element = document.getElementById("mobileNumberID");
	setDefaultColor(element);

	element = document.getElementById("emailID");
	setDefaultColor(element);

	element = document.getElementById("ownershipPercentageID");
	setDefaultColor(element);

	element = document.getElementById("ownerAddressLine1ID");
	setDefaultColor(element);

	element = document.getElementById("ownerAddressLine2ID");
	setDefaultColor(element);

	element = document.getElementById("ownerPincodeID");
	setDefaultColor(element);

	// element =
	// document.getElementById("select2-ownerCountryIDSelect-container");
	// alert(element.options[element.selectedIndex].text);
	// setDefaultColor(element);

	// element =
	// document.getElementById("select2-ownerStateIDSelect-container");
	// setDefaultColor(element);

	// element = document
	// .getElementById("select2-ownerDistrictIDSelect-container");
	// setDefaultColor(element);

	var paintElement = document
			.getElementById('select2-ownerDistrictIDSelect-container');
	setDefaultColor(paintElement.parentNode);

}

function setDefaultColorForFormInputs() {

	var element = document.getElementById("firstNameID");
	setDefaultColor(element);

	element = document.getElementById("middleNameID");
	setDefaultColor(element);

	element = document.getElementById("lastNameID");
	setDefaultColor(element);

	element = document.getElementById("mobileNumberID");
	setDefaultColor(element);

	element = document.getElementById("emailID");
	setDefaultColor(element);

	element = document.getElementById("panNumberID");
	setDefaultColor(element);

	element = document.getElementById("ownershipPercentageID");
	setDefaultColor(element);

	element = document.getElementById("ownerAddressLine1ID");
	setDefaultColor(element);

	element = document.getElementById("ownerAddressLine2ID");
	setDefaultColor(element);

	element = document.getElementById("ownerPincodeID");
	setDefaultColor(element);

	// element = document.getElementById("ownerCountryIDSelect");
	// alert(element.options[element.selectedIndex].text);

	// element = document.getElementById("ownerStateIDSelect");

	// element = document.getElementById("ownerDistrictIDSelect");
	var paintElement = document
			.getElementById('select2-ownerDistrictIDSelect-container');
	setDefaultColor(paintElement.parentNode);

}

function InvalidMsgForSelection(element) {

	var elementId = element.id;
	var paintElement = document.getElementById('select2-' + elementId
			+ '-container');

	if (paintElement != null) {
		if (element.selectedIndex < 1) {
			blankfields = 1;
			setErrorColor(paintElement.parentNode);
		} else {
			setSuccessColor(paintElement.parentNode);
		}
	}

}

function InvalidMsgForSelection_1(elementId, paintNodeId) {

	var element = document.getElementById(elementId);
	var paintNode = document.getElementById(paintNodeId);
	console.log("Element : " + element + ", paintNode : " + paintNode
			+ ", Selected Index : " + element.selectedIndex);

	if (element.selectedIndex < 1) {
		console.log("Selected");
		blankfields = 1;
		setErrorColor(paintNode.parentNode);
	} else {
		console.log("Not Selected");
		setSuccessColor(paintNode.parentNode);
	}

}

function InvalidMsgForDependentSelection(elementId, paintNodeId,
		dependentElementId, dependentPaintNodeId) {
	console.log("element : " + elementId + " Paint Element" + paintNodeId
			+ "\n Dependent Element : " + dependentElementId
			+ "Depenedent Paint : " + dependentPaintNodeId);
	var element = document.getElementById(elementId);
	var paintNode = document.getElementById(paintNodeId);

	var dependentElement = document.getElementById(dependentElementId);
	var dependentPaintNode = document.getElementById(dependentPaintNodeId);

	if (element.selectedIndex == 0) {

		setErrorColor(paintNode.parentNode);

	} else {

		setSuccessColor(paintNode.parentNode);

	}
	if (dependentElement.selectedIndex == 0) {

		setErrorColor(dependentPaintNode);
	} else {

		setSuccessColor(dependentPaintNode);
	}

}

/*
 * function calculateAge(element) { console.log("Value : "+element.value);
 * 
 * var yr = new Date(element.value).getFullYear(); var currentYr = new
 * Date().getFullYear();
 * 
 * console.log("Input : "+yr+"Current year : "+currentYr); console.log("Age :
 * "+(currentYr-yr));
 * 
 * if(yr > new Date()){ createSmallAlert("DOB Can Not be Greater Then Today.");
 * $('#ageID').val(""); $('#dobID').val("");
 * 
 * }else{ $('#ageID').val(currentYr - yr); }
 *  }
 */

function calculateAgeOwner(birthDateObj, format, delimiter, ageSetID) {
	var currentDate = new Date();
	var today = new Date(currentDate.getFullYear(), 05, 30);
	var birthDate = stringToDate(birthDateObj.value, format, delimiter);
	// alert("today : "+today);
	// alert("birthDate : "+birthDate);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = currentDate.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	if (age < 0) {
		createSmallAlert("DOB Can Not be Greater Then Today.");
		$('#ageID').val("");
		$('#dobID').val("");

	} else {
		document.getElementById(ageSetID).value = age;
	}
}

/*
 * function calculateAge(element) { console.log("Value :
 * "+element.value+"Current year : "+new Date().getFullYear()); var yr = new
 * Number(new Date(element.value)); var currentYr = new Number(new
 * Date().getFullYear());
 * 
 * console.log("Input : "+yr.getFullYear()+"Current year : "+new
 * Date().getFullYear()); if(yr == NaN) if(yr > new Date()){
 * createSmallAlert("DOB Can Not be Greater Then Today."); $('#ageID').val("");
 * $('#dobID').val("");
 * 
 * }else{ $('#ageID').val(currentYr - yr); // $('#ageID').val(new Number(new
 * Date().getFullYear() - yr.getFullYear())); } // console.log("YR :
 * "+yr.getFullYear()); // console.log("Age : "+new Number(new //
 * Date().getFullYear()-yr.getFullYear())); }
 */

function confirmForCancle() {

	bootbox.confirm("Please confirm do you want to go back?",
			function(result) {
				var amnesty =$("#amnestyCode").val();
				if (result && (amnesty != null && amnesty != '')) {
					window.location.replace("web/citizen/property/home?redirectionCondition=amnestyDashboard");
				}
				else if(result){
					window.location.replace("web/citizen/property/home");
				}
				console.log('This Was Logged in the Callback: '+ result);
			});

	/*
	 * var action = createConfirmDialog('Please submit the form before leave the
	 * page.\n Do you really want to leave page ?') ; //confirm('Please submit
	 * the form before leave the page.\n Do you really want to leave page ?');
	 * alert(action); if (action) {
	 * 
	 *  }
	 */
}
function confirmForCancleBunch() {
	
	bootbox.confirm("Please confirm do you want to go back?",
			function(result) {
				if(result){
					window.location.replace("web/citizen/property/bunch/loginPageBunch");
				}
			});
}

function checkPinNo(element) {
	console.log("Elements : " + element.value);
	var val = element.value;
	console.log(val.substring(0, 2));
	if (val.substring(0, 2) != 11) {
		createSmallAlert("Please Enter Valid 'Delhi' PIN No");
		element.value = '';

	}

}

function elementHideAndShow(element) {
	console.log("Hide Show called."
			+ element.options[element.selectedIndex].text);
	if (element.options[element.selectedIndex].text == 'VACANT LAND') {
		/*
		 * $("#flatNoDivID").hide(); $("#floorDivID").hide();
		 * $("#noOfFloorID").val(''); $("#noOfFloorID").removeAttr("required");
		 * $("#vacantCoverdAreaId").removeAttr("required");
		 * disableField('vacantCoverdAreaId'); $("#noOfFloorDivID").hide();
		 * $('[id^="taxFactorselecterId"]').hide();
		 */
		// $("#taxFactorselecterId").hide();
	} else {

		$("#flatNoDivID").show();
		$("#floorDivID").show();
		$("#noOfFloorDivID").show();
		$("#noOfFloorID").attr("required", "true");
		enableField('vacantCoverdAreaId');
		$("#vacantCoverdAreaId").attr("required", "true");

	}
	// loadPropertyType(element);

}

var blankfieldsPro = 0;
var errorMsg = "";
var setFocus = 0;
var blankfieldsFloorSection = 0;
var errorMsgFloorSection = "";

function validateBlankfieldsForPropertyPage() {

	blankfieldsPro = 0;
	errorMsg = "";
	setFocus = 0;

	var num = Number($("#noOfFloors").val());

	var element = document.getElementById("ownerCategoryIDSelect");
	var paintNode = document
			.getElementById("select2-ownerCategoryIDSelect-container");
	if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
		blankfieldsPro = 1;
		setErrorColor(paintNode.parentNode);
		errorMsg = errorMsg + "\n * Ownership category";

		if (setFocus == 0) {
			setFocus = 1;
			element.focus();
		}

		// return false ;

	} else {
		setSuccessColor(paintNode.parentNode);
	}

	var element = document.getElementById("ownerTypeIDSelect");
	var paintNode = document
			.getElementById("select2-ownerTypeIDSelect-container");
	if (element.selectedIndex == 0) {
		blankfieldsPro = 1;
		setErrorColor(paintNode.parentNode);
		errorMsg = errorMsg + "\n * Ownership Type";
		if (setFocus == 0) {
			setFocus = 1;
			element.focus();
		}
		// return false ;

	} else {
		setSuccessColor(paintNode.parentNode);
	}

	var element = document.getElementById("propertyCategoryIDSelect");
	var paintNode = document
			.getElementById("select2-propertyCategoryIDSelect-container");
	if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
		blankfieldsPro = 1;
		setErrorColor(paintNode.parentNode);
		errorMsg = errorMsg + "\n * Property Category";

		if (setFocus == 0) {
			setFocus = 1;
			element.focus();
		}
	} else {
		setSuccessColor(paintNode.parentNode);
	}

	/*
	 * var element = document.getElementById("propertyTypeIDSelect");
	 * 
	 * 
	 * var paintNode = document
	 * .getElementById("select2-propertyTypeIDSelect-container"); if
	 * (element.selectedIndex == 0 || element.value == 'CHOOSE') {
	 * //blankfieldsPro = 1; setErrorColor(paintNode.parentNode);
	 *  } else { setSuccessColor(paintNode.parentNode); }
	 */

	var element = document.getElementById("colonyIDSelect");
	var paintNode = document.getElementById("select2-colonyIDSelect-container");
	if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
		blankfieldsPro = 1;
		setErrorColor(paintNode.parentNode);
		errorMsg = errorMsg + "\n * Colony";
		if (setFocus == 0) {
			setFocus = 1;
			element.focus();
		}
	} else {
		setSuccessColor(paintNode.parentNode);
	}

	// var element = document.getElementById("plotHouseID");
	// if (element.value == "") {
	// blankfields = 1;
	// setErrorColor(element);
	// } else {
	// // blankfields = 0;
	// setSuccessColor(element);
	// }

	// var element = document.getElementById("blockPocketBuildingID");
	// if (element.value === "") {
	// blankfields = 1;
	// setErrorColor(element);
	// } else {
	// // blankfields = 0;
	// setSuccessColor(element);
	// }

	// var element = document.getElementById("flatNoID");
	// if (element.value == "") {
	// blankfields = 1;
	// setErrorColor(element);
	// } else {
	// // blankfields = 0;
	// setSuccessColor(element);
	// }

	/*
	 * var element = document.getElementById("addressLine1ID"); if
	 * (element.value == "") { blankfields = 1; setErrorColor(element); } else { //
	 * blankfields = 0; setSuccessColor(element); }
	 * 
	 * var element = document.getElementById("addressLine2ID"); if
	 * (element.value == "") { blankfields = 1; setErrorColor(element); } else { //
	 * blankfields = 0; setSuccessColor(element); }
	 */

	console.log('1111111');

	var element = document.getElementById("pincodeID");
	if (element.value.trim() == "") {
		blankfieldsPro = 1;
		setErrorColor(element);
		errorMsg = errorMsg + "\n * Pincode";
		if (setFocus == 0) {
			setFocus = 1;
			element.focus();
		}
	} else {
		setSuccessColor(element);
	}
	// alert("plot"+ document.getElementById("plotHouseID");

	// for address field
	var radioValue = $("input[name='plotHouseFlatFarmRdoBtn']:checked").val();
	
	var plotId = document.getElementById("plotHouseID");
	var farmId = document.getElementById("farmHouseID");

	if (radioValue == 'plot' && plotId.value == "") {
        
		showTab('0');
		
		blankfieldsPro = 1;
		setErrorColor(plotId);
		errorMsg = errorMsg + "\n * Plot/House/Flat/Shop Number";
		if (setFocus == 0) {
			setFocus = 1;
			plotId.focus();
		}
	

	} else if (radioValue == 'farmHouse' && farmId.value == "") {

		document.getElementById("farmHouseID").value = "";
		blankfieldsPro = 1;
		setErrorColor(farmId);
		errorMsg = errorMsg + "\n * Farm House Number";

		if (setFocus == 0) {
			setFocus = 1;
			farmHouseID.focus();
		}
	}

	var element = document.getElementById("countryIDSelect");
	var paintNode = document
			.getElementById("select2-countryIDSelect-container");
	if (element.selectedIndex == 0 || element.value == 'CHOOSE') {

		// setErrorColor(paintNode.parentNode);
	} else {

		// setSuccessColor(paintNode.parentNode);
	}

	var element = document.getElementById("stateIDSelect");
	var paintNode = document.getElementById("select2-stateIDSelect-container");
	if (element.selectedIndex == 0 || element.value == 'CHOOSE') {

		// setErrorColor(paintNode.parentNode);
	} else {

		// setSuccessColor(paintNode.parentNode);
	}

	console.log('22222');

	var element = document.getElementById("districtIDSelect");
	var paintNode = document
			.getElementById("select2-districtIDSelect-container");
	if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
		blankfieldsPro = 1;

		setErrorColor(paintNode.parentNode);
		errorMsg = errorMsg + "\n * District";
		if (setFocus == 0) {
			setFocus = 1;
			element.focus();
		}

	} else {
		setSuccessColor(paintNode.parentNode);
	}

	// var element = document.getElementById("landAreaID");
	// if (element.value == "") {
	// blankfields = 1;
	// setErrorColor(element);
	// } else {
	// // blankfields = 0;
	// setSuccessColor(element);
	// }

	// if(num!=null){
/*	var propeCat = $('#propertyCategoryIDSelect').find('option:selected').val();
	if (propeCat != null) {
		var categoryCode = document.getElementById(propeCat).value;
		if (categoryCode != null) {
			if (categoryCode == PROP_VACANT_CATEGORY) {
				num = -1;
			}
		}
	}
*/
	
	
	 var isVisible= $('#vacantLandDiv').is(':visible');
	
	var pro_cat_vacant= $('#vacantLandGuid').val();	 	
		var pro_cat_selected= $('#propertyCategoryIDSelect').val();
	 var flatChecked = $("#flatOptionCheckBox").is(":checked");
	 
	
	if( $('#vacantLandDiv').is(':visible') &&  flatChecked == false  && isVisible==true ) { 
		
		
		
		var vacLandAreaID = document.getElementById("vacantLandAreaId");
		var checked = $("#flatOptionCheckBox").is(":checked");
		
		if( (vacLandAreaID.value  <= 0 || vacLandAreaID.value  == '' || vacLandAreaID.value == "") && isVisible==true) {
			
			blankfieldsPro = 1;
			setErrorColor(vacLandAreaID);
			errorMsg = errorMsg + "\n * Vacant/Land Area Detail Not Valid , Pls Edit  & Save ";

			if (setFocus == 0) {
				setFocus = 1;
				vacLandAreaID.focus();
			}
		}
		
		
		
		var vacantCoverAreaID = document.getElementById("vacantCoverdAreaId");
		
if (vacantCoverAreaID.value  == '' || vacantCoverAreaID.value == "") {
			
			blankfieldsPro = 1;
			setErrorColor(vacantCoverAreaID);
			errorMsg = errorMsg + "\n * Vacant/Land Ground Covered Area";

			if (setFocus == 0) {
				setFocus = 1;
				vacantCoverAreaID.focus();
			}
		}
		
		///check
		var element = document.getElementById("propertyTypeIDSelect");
		var paintNode = document
				.getElementById("select2-propertyTypeIDSelect-container");
		if (element.selectedIndex == 0 || element.value == 'CHOOSE' || element.value == '') {
			blankfieldsPro = 1;

			setErrorColor(paintNode.parentNode);
			errorMsg = errorMsg + "\n * Vacant/Land Property Type";
			checkForPropertyType(element);
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
		
		var caNumberID = document.getElementById("caNumberID");
		
       if (caNumberID != null &&(caNumberID.value  == '' || caNumberID.value == "")) {
			
			blankfieldsPro = 1;
			setErrorColor(caNumberID);
			errorMsg = errorMsg + "\n * CA Number";

			if (setFocus == 0) {
				setFocus = 1;
				caNumberID.focus();
			}
		}
		
    var element = document.getElementById("discomIDSelect");
		var paintNode = document
				.getElementById("select2-discomIDSelect-container");
		if (element != null &&(element.selectedIndex == 0 || element.value == 'CHOOSE' || element.value == '')) {
			blankfieldsPro = 1;

			setErrorColor(paintNode.parentNode);
			errorMsg = errorMsg + "\n * Discom Code";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else if(paintNode != null){
			setSuccessColor(paintNode.parentNode);
		}
		
				
		var element = document.getElementById("ownerNameID");
		console.log("ELEMENT : " + element);
		if (element != null && element.value == "") {

			blankfieldsPro = 1;
			setErrorColor(element);
			errorMsg = errorMsg + "\n * Please verify CA Number";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {

			setSuccessColor(element);
		}
 	/*
		var paintNode = document
				.getElementById("select2-vacantLandOccupancyFactorIDSelect-container");
		if (element.selectedIndex == 0 || element.value == 'CHOOSE' || element.value == '') {
			blankfieldsPro = 1;

			setErrorColor(paintNode.parentNode);
			errorMsg = errorMsg + "\n * Vacant Land Occupancy Factor";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
		*/
		
		
		//alert("pro_cat_vacant "+pro_cat_vacant);
		//alert("pro_cat_selected "+pro_cat_selected);

		
		
		var element = document.getElementById("vacantLandUseFactorIDSelect");		
		//alert('hhhh'+element.value);
		
		//alert('pro_cat_vacant '+pro_cat_vacant);
		
		if( pro_cat_selected == pro_cat_vacant ){
		
		
		
		var paintNode = document.getElementById("select2-vacantLandUseFactorIDSelect-container");
		
		if (element.selectedIndex == 0 || element.value == 0 ||element.value == 'CHOOSE'|| element.value == '') {
			
			
			blankfieldsPro = 1;

			setErrorColor(paintNode.parentNode);
			errorMsg = errorMsg + "\n * Vacant/Land Use Factor";
			checkForUseFactor(element);
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
		
		
		var element = document.getElementById("vacantLandOccupancyFactorIDSelect");
		
		//alert("KKKK "+element.value);
		
		
		var paintNode = document
				.getElementById("select2-vacantLandOccupancyFactorIDSelect-container");
		if (element.selectedIndex == 0 || element.value == 'CHOOSE' || element.value == '') {
			blankfieldsPro = 1;

			setErrorColor(paintNode.parentNode);
			errorMsg = errorMsg + "\n * Vacant/Land Occupancy Factor";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}
		
		
		/*var element = document.getElementById("vacantLandExemptionIDSelect");
		var paintNode = document
				.getElementById("select2-vacantLandExemptionIDSelect-container");
		if (element.selectedIndex == 0 || element.value == 'CHOOSE' || element.value == '') {
			blankfieldsPro = 1;

			setErrorColor(paintNode.parentNode);
			errorMsg = errorMsg + "\n * Vacant/Land Exemption";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {
			setSuccessColor(paintNode.parentNode);
		}*/
		
		} else{
			var vacantLandArea = $("#vacantLandAreaId").val();
			var vacantCoverdArea = $("#vacantCoverdAreaId").val();
			if (vacantLandArea != 0 && vacantLandArea != '' && vacantCoverdArea != '') {
				var perc = calculatePercentage(vacantLandArea, vacantCoverdArea);
				
				if(perc < 25.00){					
					vacantLandBlockValidation();
				}
			}

		}

		
			
			
		
		
		
	//}
 }
	
	
	
	
		if( pro_cat_selected != pro_cat_vacant ){
			
			
			
			
	for (var i = 0; i <= num; i++) {

		var element = document.getElementById("coveredAreaID"+num);
		console.log("ELEMENT : " + element);
		if (element != null && element.value == "") {

			blankfieldsPro = 1;
			setErrorColor(element);
			errorMsg = errorMsg + "\n * Covered Area of floor/section";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {

			setSuccessColor(element);
		}
		

		var element = document.getElementById("floorID" + num + "Select");
		var paintNode = document.getElementById("select2-floorID" + num
				+ "Select-container");
		if (element != null) {
			if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
				blankfieldsPro = 1;
				setErrorColor(paintNode.parentNode);
				errorMsg = errorMsg + "\n * Floor ";
				if (setFocus == 0) {
					setFocus = 1;
					element.focus();
				}

			} else {
				setSuccessColor(paintNode.parentNode);
			}
		}

		var element = document.getElementById("useFactorID" + num + "Select");
		var paintNode = document.getElementById("select2-useFactorID" + num
				+ "Select-container");
		if (element != null) {
			if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
				blankfieldsPro = 1;
				setErrorColor(paintNode.parentNode);
				errorMsg = errorMsg + "\n * Use Factor ";
				checkForUseFactor(element);
				if (setFocus == 0) {
					setFocus = 1;
					element.focus();
				}

			} else {
				setSuccessColor(paintNode.parentNode);
			}
		}
		var element = document.getElementById("structureFactorID" + num
				+ "Select");
		var paintNode = document.getElementById("select2-structureFactorID"
				+ num + "Select-container");
		if (element != null) {
			if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
				blankfieldsPro = 1;
				setErrorColor(paintNode.parentNode);
				errorMsg = errorMsg + "\n * Structure Factor ";
				if (setFocus == 0) {
					setFocus = 1;
					element.focus();
				}

			} else {
				setSuccessColor(paintNode.parentNode);
			}
		}
		var element = document.getElementById("occupancyFactorID" + num
				+ "Select");
		var paintNode = document.getElementById("select2-occupancyFactorID"
				+ num + "Select-container");
		if (element != null) {
			if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
				blankfieldsPro = 1;
				setErrorColor(paintNode.parentNode);
				errorMsg = errorMsg + "\n * Occupancy Factor ";
				if (setFocus == 0) {
					setFocus = 1;
					element.focus();
				}

			} else {
				setSuccessColor(paintNode.parentNode);
			}
		}
		var element = document.getElementById("ageFactorID" + num + "Select");
		var paintNode = document.getElementById("select2-ageFactorID" + num
				+ "Select-container");
		if (element != null) {
			if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
				blankfieldsPro = 1;
				setErrorColor(paintNode.parentNode);
				errorMsg = errorMsg + "\n * Age Factor ";
				if (setFocus == 0) {
					setFocus = 1;
					element.focus();
				}

			} else {
				setSuccessColor(paintNode.parentNode);
			}
		}

		var element = document.getElementById("sectionPropertyCategoryID" + num
				+ "Select");
		var paintNode = document
				.getElementById("select2-sectionPropertyCategoryID" + num
						+ "Select-container");

		if (element != null) {
			if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
				blankfieldsPro = 1;
				setErrorColor(paintNode.parentNode);
				errorMsg = errorMsg + "\n * Floor/Section Property Category  ";
				if (setFocus == 0) {
					setFocus = 1;
					element.focus();
				}

			} else {
				setSuccessColor(paintNode.parentNode);
			}
		}

		 var element = document.getElementById("exemptionID" + num +"Select");
		 var paintNode = document.getElementById("select2-exemptionID" + num+ "Select-container");
		 if (element != null) {
		 /*if (element.selectedIndex == 0 || element.value == 'CHOOSE' || element.value == 'Select Exemption') {
		 blankfieldsPro=1;
		 setErrorColor(paintNode.parentNode);
		 errorMsg = errorMsg + "\n * Exemption   ";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}
		 } else {
		 setSuccessColor(paintNode.parentNode);
		 }*/
		 }

		var element = document
				.getElementById("propertyTypeID" + num + "Select");
		var paintNode = document.getElementById("select2-propertyTypeID" + num
				+ "Select-container");
		if (element != null) {
			if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
				blankfieldsPro = 1;
				setErrorColor(paintNode.parentNode);
				errorMsg = errorMsg + "\n * Floor/Section Property Type   ";
				checkForPropertyType(element);
				if (setFocus == 0) {
					setFocus = 1;
					element.focus();
				}

			} else {
				setSuccessColor(paintNode.parentNode);
			}
		}
		
		var element = document.getElementById("caNumberID"+num);
		console.log("ELEMENT : " + element);
		if (element != null && element.value == "") {

			blankfieldsPro = 1;
			setErrorColor(element);
			errorMsg = errorMsg + "\n * CA Number";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {

			setSuccessColor(element);
		}
		
		var element = document
				.getElementById("discomID" + num + "Select");
		var paintNode = document.getElementById("select2-discomID" + num
				+ "Select-container");
		if (element != null) {
			if (element.selectedIndex == 0 || element.value == 'CHOOSE') {
				blankfieldsPro = 1;
				setErrorColor(paintNode.parentNode);
				errorMsg = errorMsg + "\n * Select Discom   ";
				if (setFocus == 0) {
					setFocus = 1;
					element.focus();
				}

			} else {
				setSuccessColor(paintNode.parentNode);
			}
		}
		
		var element = document.getElementById("ownerNameID"+num);
		console.log("ELEMENT : " + element);
		if (element != null && element.value == "") {

			blankfieldsPro = 1;
			setErrorColor(element);
			errorMsg = errorMsg + "\n * Please verify CA Number";
			if (setFocus == 0) {
				setFocus = 1;
				element.focus();
			}

		} else {

			setSuccessColor(element);
		}
		
		
if( $('#covidDivCheckBox').is(':visible') ) { 
			
			var checked = $("#covidOptionCheckBox").is(":checked");
			var covidDeclaration = $("#covid_agree").is(":checked");
			
			
			
			if ((checked === true) && (covidDeclaration === false)) {
				
				blankfieldsPro = 1;
				setErrorColor(vacLandAreaID);
				errorMsg = errorMsg + "\n * Please select checkbox to avail  Covid-19 Incentive. ";

				if (setFocus == 0) {
					setFocus = 1;
					
				}
			}
	}
	
	
//		var element = document.getElementById("sectionPropertyCategoryID" + num + "Select");
//			if (commercialPropertyCategoryCodes.includes($("#" + element.value).val())) {
//				element = document.getElementById("tradeCategoryID" + num + "Select");
//				var paintNode = document.getElementById("select2-tradeCategoryID" + num
//								+ "Select-container");
//				if (element != null && (element.value == "" || element.value == '0')) {
//					
//						blankfieldsPro = 1;
//						setErrorColor(paintNode);
//						errorMsg = errorMsg + "\n * Please verify CA Number";
//						if (setFocus == 0) {
//							setFocus = 1;
//							element.focus();
//						}
//					} else {
//
//						setSuccessColor(paintNode);
//					}
//				
//
//			}

			
		
		
	}
	
}
		
	if($("#propertyTypeID0Select").val() !=null && $("#propertyTypeID0Select").val() != 0 ){
		
			var propertyCode = $("#"+$("#propertyTypeID0Select").val()).val();
			var ddaFlats = $('#dddFlats').val();
			var jantaFlats = $('#jantaFlats').val();
			var cghsFlats = $('#cghsFlats').val();
			var builderFloor = $('#builderFloor').val();
			if ($("#flatOptionCheckBox").is(":checked") && (propertyCode != ddaFlats  && propertyCode != jantaFlats
					&& propertyCode != cghsFlats && propertyCode != builderFloor)) {
				blankfieldsPro =blankfieldsPro+1;
				errorMsg = errorMsg + "\n * You have selected Residential plotted instead of  DDA/CGHS/BUILDER FLAT/DDA JANTA FLAT. ";
				$("#propertyTypeID0Select").focus();
			}
		}
	if( $('#actionTypeID').val() == 'update' ||  $('#actionTypeID').val()=='createlegacy')
	if($("#covidOptionCheckBox").is(":checked")){
		
	/*	if($("input[name="+$("#covidDoc").val()+"]").val()=="" || $("input[name="+$("#covidDoc").val()+"]").val()==null ){
			if($("#"+$("#covidDoc").val()).val() == null){
			blankfieldsPro =blankfieldsPro+1;
			errorMsg = errorMsg + "\n * PLEASE  UPLOAD COVID VACCINATION DOCUMENT FIRST. ";
			$("input[name="+$("#covidDoc").val()+"]").focus();}
		}
		*/
		
	}
	if (blankfieldsPro > 0) {
		
		if (errorMsg != '') {
			
			var item = "Please fill the following detail :\n" + errorMsg + "\n";
			if(newActonType != null && newActonType == 'pay-tax'){
				item = "Due to changes implemented by the MCD for the selected assessment year, the previously applicable factors have been deactivated. Kindly select the updated factor highlighted in red.";
			}
			createLargeAlert(item);
			showTab('0');

		}

		return false;
	} else {
		return true;
	}

	// if(blankfields == 0){
	// showTab('1');
	//		
	// }

}

function validatePropertyForm(action) {

	if (blankfieldsPro > 0) {

		showTab('0');
		blankfieldsPro = 0;
		return false;
	}

	var actionType = $("#actionTypeID").val();

	/*
	 * TOTAL LAND AREA(In Sq. mtr) vacantLandAreaId COVERED AREA(In Sq. mtr)
	 * vacantCoverdAreaId coveredAreaID
	 */

	// if ((!(($("#docType").prop("checked")) ||
	// ($("#docType1").prop("checked")) || ($("#docType2").prop("checked")) ))
	// && action != "createupic") {
	//		
	// createSmallAlert("Please select a radio button and upload the pdf file");
	// return false;
	// }
	// var docUpd = $("#docUpload").val();
	// if(docUpd == '' )
	// {
	// createSmallAlert("Browse and upload the pdf file ");
	// return false;
	//
	// }
	// var dropDownElements = document.getElementsByTagName("select");
	// //alert("Element : "+dropDownElements.length);
	// for(var i =0; i<dropDownElements.length;i++){
	// var dropDownElement = dropDownElements[i];
	// if(dropDownElement.required && !dropDownElement.readonly &&
	// !dropDownElement.disabled){
	// if(dropDownElement.value==0){
	// // setErrorColor(dropDownElement);
	// alert("' "+dropDownElement[dropDownElement.selectedIndex].innerHTML+" '
	// Not Valid Option");
	// return false;
	// }
	// // alert("In LOOP"+dropDownElement.value+", Text :
	// "+dropDownElement[dropDownElement.selectedIndex].innerHTML);
	// }else{
	// // alert(" Not Required, In LOOP"+dropDownElement.value+", Text :
	// "+dropDownElement[dropDownElement.selectedIndex].innerHTML);
	// }
	// }

	var vacantLandArea = $("#vacantLandAreaId").val();
	var vacantCoverdArea = $("#vacantCoverdAreaId").val();
	var floorNum = $("#noOfFloorID").val();

	if (vacantLandArea != 0 && vacantLandArea != '' && vacantCoverdArea != 0
			&& vacantCoverdArea != '') {
		if (Number(vacantLandArea) < Number(vacantCoverdArea)) {
			createSmallAlert("Total Land Area Cannot Be Less Than Covered Area in Vacant Land Area Detail");
			return false;
		}

		if ($('#noOfFloorID').length) {
			for (i = 0; i < $('#noOfFloorID').val(); i++) {
				if (parseInt($("#coveredAreaID"+i).val()) > parseInt($("#vacantCoverdAreaId").val())) {
					console.log("coveredAreaID : " + $("#coveredAreaID").val()
							+ "\n vacantCoverdAreaId : "
							+ $("#vacantCoverdAreaId").val());
					createSmallAlert("Covered Area For Tax Factors For Floor Cannot Be Greater Than The Covered Area In Vacant Land Area Detail");
					return false;
				}
			}

		}
		if ($('#coveredAreaID').length) {
			for (i = 0; i < floorNum; i++) {
			console.log("coveredAreaIDValue : " + $("#coveredAreaID").val());
			if (parseInt($("#coveredAreaID"+i).val()) > parseInt($("#vacantCoverdAreaId").val())) {
				console.log("coveredAreaID : " + $("#coveredAreaID").val()
						+ "\n vacantCoverdAreaId : "
						+ $("#vacantCoverdAreaId").val());
				createSmallAlert("Covered Area For Tax Factors For Floor Cannot Be Greater Than The Covered Area In Vacant Land Area Detail");
				return false;
			}
		}
		}
	}
	console.log('TRUE');
	/*if(!validateOwnerFinalTable()){
		return false;
	}*/
	// code to check 100 percent

	var table = document.getElementById("ownerTableGridID");
	if (table != null) {
		var tbody = table.tBodies[0];
		var rowCount = tbody.rows.length;

		var ownSum = Number(0);
		var dobVal = "";
		var mobNoVal = "";

		for (var i = 0; i < rowCount; i++) {
			ownSum = ownSum + Number($('#ownrPercntgTblId' + i).val());
			dobVal = document.getElementById("dobTblId" + i).value;
			mobNoVal = document.getElementById("mobileNoTblId" + i).value;
			validateOwnerAge();

			if (dobVal == '' || dobVal == null) {
				createSmallAlert('Please click Edit to add DoB   ');
				return false;
			}

			if (mobNoVal == '' || mobNoVal == null) {
				createSmallAlert('Please click Edit to add Mobile no   ');
				return false;
			}

		}
	}
	if (!isDrafted) {

		/*
		 * if(rowCount < 2 && Number(ownSum) <= 99.91 && actionType !=
		 * "createupic") {
		 * 
		 * createSmallAlert('Minimum two owners are required in case of joint
		 * owner'); showTab('1'); return false; }
		 */
		if ((rowCount > 0) && (ownSum <= 99.90)) {
			createSmallAlert('Total ownership percentage should be more than 99.90 %');
			showTab('1');
			return false;
		}

		if (actionType != 'createupic') {
			/*var branchName = document.getElementById("branchNmId").value;
			var bankName = document.getElementById("bankNmId").value;
			var accountNo = document.getElementById("accountNoId").value;*/
		}

		if(rowCount == 0){
			return false;
		}else{
		hideOwnerDetail(true);
		}
		/*
		 * if(accountNo == null || accountNo == ''){ createSmallAlert('Account
		 * Number cannot empty'); showTab('1'); return false; }
		 * 
		 * if(bankName == null || bankName == ''){ createSmallAlert('Bank Name
		 * cannot empty'); showTab('1'); return false; } if(branchName == null ||
		 * branchName == ''){ createSmallAlert('Branch Name cannot empty');
		 * showTab('1'); return false; }
		 * 
		 */
	}

	if (!isDrafted && action != 'createupic') {

		if (document.getElementById("ownerTableGridID") != null && document.getElementById("ownerTableGridID").rows.length > 1
				&& isValidOwnerTable()) {
			return true;
		}
     
		showTab('1');
		createSmallAlert("Please Click on SAVE button to add Owner Information. ");
		return false;
	} else {
		console.log("Button Clicked");
	}

}

function checkAlphabets(element) {
	var ptrn = /^[a-zA-Z ]+$/;
	// console.log("element.value : " + element.value);
	if (element.value != "") {
		if (ptrn.test(element.value)) {
			setSuccessColor(element);
		} else {
			blankfields = 1;
			element.value = "";
			setErrorColor(element);
		}
	}

}

function InvalidMsg(element) {
	// element.setCustomValidity("Please Enter Vlaue");

	if (element.value != "") {
		// console.log("Element Value : " + element.value);
		if (element.validity.patternMismatch) {
			blankfields = 1;
			setErrorColor(element);
			element.value = "";
		} else if (element.value < 0) {
			blankfields = 1;
			setErrorColor(element);

		} else {
			blankfields = 0;
			setSuccessColor(element);

		}
	} else {
		blankfields = 1;
		setErrorColor(element);

	}

}

function validateMobile(element) {
	if (element.value != "") {
		if (/^([0-9]{6,12})$/.test(element.value)) {
			// blankfields = 0;
			setSuccessColor(element);

		} else {
			blankfields = 1;
			element.value = "";
			setErrorColor(element);
		}
	} else {
		blankfields = 1;
		setErrorColor(element);

	}
}
function checkLength(element, length) {
	if (element.value.length >= length) {
		setSuccessColor(element);
	} else {
		element.value = "";
		blankfields = 1;
		setErrorColor(element);
		element.placeholder = "Minimum Name length is " + length;
	}

}

function validatePan(element) {

	if (element.value.length == 10) {
		setSuccessColor(element);
	} else {
		blankfields = 1;
		setErrorColor(element);
	}

}

function validateEmail(element) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (element.value != "") {
		if (re.test(element.value)) {
			// blankfields = 0;
			setSuccessColor(element);

		} else {
			blankfields = 1;
			element.value = "";
			setErrorColor(element);
		}
	} else {
		blankfields = 1;
		setErrorColor(element);
		// element.focus();

	}
}

function validatePin(element) {
	if (/^([0-9]{6})$/.test(element.value)) {
		// blankfields = 0;
		setSuccessColor(element);

	} else {
		blankfields = 1;
		setErrorColor(element);
	}
}

function checkDigits(obj) {
	var digits = obj.value.length;
}

function validateBlankfields() {

	blankfields = 0;

	var element = document.getElementById("firstNameID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		// blankfields = 0;
		setSuccessColor(element);
	}
	// var element = document.getElementById("middleNameID");
	// if (element.value == "") {
	// blankfields = 1;
	// setErrorColor(element);
	// } else {
	// // blankfields = 0;
	// setSuccessColor(element);
	// }
	/*
	 * var element = document.getElementById("lastNameID"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else { // blankfields =
	 * 0; setSuccessColor(element); }
	 */
	var element = document.getElementById("mobileNumberID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		// blankfields = 0;
		setSuccessColor(element);
	}
	var element = document.getElementById("emailID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {

		setSuccessColor(element);
	}
	/*
	 * var element = document.getElementById("panNumberID"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else { // blankfields =
	 * 0; setSuccessColor(element); }
	 * 
	 */
	var element = document.getElementById("ownershipPercentageID");
	if (element != null && element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		// blankfields = 0;
		setSuccessColor(element);
	}

	/*
	 * var element = document.getElementById("accountNoId"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else { blankfields = 0;
	 * setSuccessColor(element); }
	 * 
	 * var element = document.getElementById("bankNmId"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else { blankfields = 0;
	 * setSuccessColor(element); }
	 * 
	 * var element = document.getElementById("branchNmId"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else { blankfields = 0;
	 * setSuccessColor(element); }
	 */

	var element = document.getElementById("ownerAddressLine1ID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		// blankfields = 0;
		setSuccessColor(element);
	}
	/*
	 * var element = document.getElementById("ownerAddressLine2ID"); if
	 * (element.value == "") { blankfields = 1; setErrorColor(element); } else {
	 * setSuccessColor(element); }
	 * 
	 */
	var element = document.getElementById("ownerPincodeID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		// blankfields = 0;
		setSuccessColor(element);
	}
	// var element = document.getElementById("ownerCountryIDSelect");
	// var element2 =
	// document.getElementById("select2-ownerCountryIDSelect-container");
	// if (element.selectedIndex == 0 ||
	// element.options[element.selectedIndex].value == 'CHOOSE') {
	// blankfields=1;
	// setErrorColor(element2.parentNode);
	// } else {
	// setSuccessColor(element2.parentNode);
	// }

	// var element = document.getElementById("ownerStateIDSelect");
	// var element2 =
	// document.getElementById("select2-ownerStateIDSelect-container");
	//
	// if (element.selectedIndex == 0) {
	// blankfields=1;
	// setErrorColor(element2.parentNode);
	// } else {
	//
	// setSuccessColor(element2.parentNode);
	// }

	var element = document.getElementById("ownerDistrictIDSelect");
	var element2 = document
			.getElementById("select2-ownerDistrictIDSelect-container");
	// console.log("value : " + element.value + ", selectedIndex : "
	// + element.selectedIndex);
	if (element.selectedIndex == 0) {
		blankfields = 1;
		setErrorColor(element2.parentNode);
	} else {
		if(element2 != null)
		setSuccessColor(element2.parentNode);
	}

	if (document.getElementById("ownerTableGridID").rows.length >= 1) {

		// $('#accountNoId').attr("required", "required");
		// $('#bankNmId').attr("required", "required");
		// $('#branchNmId').attr("required", "required");

	}

}

/**
 * Blank Field Validations for ' GOVERNMENT DETAILS' Page.
 * 
 */
function validateBlankfieldsForGvtDtlPage() {

	var element = document.getElementById("governmentTypeIdSelect");
	var element2 = document
			.getElementById("select2-governmentTypeIdSelect-container");
	if (element.selectedIndex == 0 || element.value == 'CHOOSE'
			|| element.value == '') {
		blankfields = 1;
		setErrorColor(element2.parentNode);
	} else {
		setSuccessColor(element2.parentNode);
	}

	var element = document.getElementById("departmentID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		setSuccessColor(element);
	}

	var element = document.getElementById("tanNumberID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		setSuccessColor(element);
	}

	var element = document.getElementById("authorizedPersonNameID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		setSuccessColor(element);
	}

	var element = document.getElementById("mobileNumberID");
	 if (element.value == "") {
	 blankfields = 1;
	 setErrorColor(element);
	 } else {
	 setSuccessColor(element);
	 }

	var element = document.getElementById("emailID");
	 if (element.value == "") {
	 blankfields = 1;
	 setErrorColor(element);
	 } else {
	 setSuccessColor(element);
	 }

	var element = document.getElementById("ownershipPercentageID");
	if (element != null && element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		setSuccessColor(element);
	}

	/*
	 * var element = document.getElementById("accountNoId"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else { blankfields = 0;
	 * setSuccessColor(element); }
	 * 
	 * var element = document.getElementById("bankNmId"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else { blankfields = 0;
	 * setSuccessColor(element); }
	 * 
	 * var element = document.getElementById("branchNmId"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else { blankfields = 0;
	 * setSuccessColor(element); }
	 */

	var element = document.getElementById("ownerAddressLine1ID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		setSuccessColor(element);
	}

	/*
	 * var element = document.getElementById("ownerAddressLine2ID"); if
	 * (element.value == "") { blankfields = 1; setErrorColor(element); } else {
	 * blankfields = 0; setSuccessColor(element); }
	 * 
	 */
	var element = document.getElementById("ownerPincodeID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		setSuccessColor(element);
	}

	// var element = document.getElementById("ownerCountryIDSelect");
	// var element2 =
	// document.getElementById("select2-ownerCountryIDSelect-container");
	// if (element.selectedIndex == 0 ||
	// element.options[element.selectedIndex].text == 'CHOOSE') {
	// blankfields = 1;
	// setErrorColor(element2.parentNode);
	// } else {
	// setSuccessColor(element2.parentNode);
	// }

	// var element = document.getElementById("ownerStateIDSelect");
	// var element2 =
	// document.getElementById("select2-ownerStateIDSelect-container");
	// if (element.selectedIndex == 0 ) {
	// blankfields = 1;
	// setErrorColor(element2.parentNode);
	// } else {
	// setSuccessColor(element2.parentNode);
	// }

	var element = document.getElementById("ownerDistrictIDSelect");
	var element2 = document
			.getElementById("select2-ownerDistrictIDSelect-container");
	console.log("value : " + element.value + ", selectedIndex : "
			+ element.selectedIndex);
	if (element.selectedIndex < 1 || element.value == 'CHOOSE' ) {
		blankfields = 1;
		setErrorColor(element2.parentNode);
	} else {
		setSuccessColor(element);
	}

	if (document.getElementById("ownerTableGridID").rows.length >= 1) {

		// $('#accountNoId').attr("required", "required");
		// $('#bankNmId').attr("required", "required");
		// $('#branchNmId').attr("required", "required");

	}

}

/**
 * Blank Field Validations for ' ORGANIZATION' Page.
 * 
 */
function validateBlankfieldsForOrgPage() {

	var element = document.getElementById("organisationNameID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {

		setSuccessColor(element);
	}

	var element = document.getElementById("authorizedPersonNameID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {

		setSuccessColor(element);
	}

	/*
	 * var element = document.getElementById("panNumberID"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else {
	 * 
	 * setSuccessColor(element); }
	 */
	var element = document.getElementById("mobileNumberID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {

		setSuccessColor(element);
	}

	var element = document.getElementById("emailID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {

		setSuccessColor(element);
	}

	var element = document.getElementById("ownershipPercentageID");
	if (element && element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {

		setSuccessColor(element);
	}

	/*
	 * var element = document.getElementById("accountNoId"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else { blankfields = 0;
	 * setSuccessColor(element); }
	 * 
	 * var element = document.getElementById("bankNmId"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else { blankfields = 0;
	 * setSuccessColor(element); }
	 * 
	 * var element = document.getElementById("branchNmId"); if (element.value ==
	 * "") { blankfields = 1; setErrorColor(element); } else { blankfields = 0;
	 * setSuccessColor(element); }
	 */

	var element = document.getElementById("ownerAddressLine1ID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {

		setSuccessColor(element);
	}

	/*
	 * var element = document.getElementById("ownerAddressLine2ID"); if
	 * (element.value == "") { blankfields = 1; setErrorColor(element); } else {
	 * 
	 * setSuccessColor(element); }
	 * 
	 */
	var element = document.getElementById("ownerPincodeID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {

		setSuccessColor(element);
	}

	// var element = document.getElementById("ownerCountryIDSelect");
	// var element2 =
	// document.getElementById("select2-ownerCountryIDSelect-container");
	// if (element.selectedIndex == 0) {
	// blankfields = 1;
	// setErrorColor(element2.parentNode);
	// } else {
	// setSuccessColor(element2.parentNode);
	// }

	// var element = document.getElementById("ownerStateIDSelect");
	// var element2 =
	// document.getElementById("select2-ownerStateIDSelect-container");
	// if (element.selectedIndex == 0 ) {
	// blankfields = 1;
	// setErrorColor(element2.parentNode);
	// } else {
	// setSuccessColor(element2.parentNode);
	// }

	var element = document.getElementById("ownerDistrictIDSelect");
	var element2 = document
			.getElementById("select2-ownerDistrictIDSelect-container");
	if (element.selectedIndex == 0) {
		blankfields = 1;
		setErrorColor(element2.parentNode);
	} else {
		setSuccessColor(element2.parentNode);
	}

	if (document.getElementById("ownerTableGridID").rows.length >= 1) {

		// $('#accountNoId').attr("required", "required");
		// $('#bankNmId').attr("required", "required");
		// $('#branchNmId').attr("required", "required");

	}

}

function validateBlankfieldsPropertyDetailForm() {
	var element = document.getElementById("plotHouseID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		// blankfields = 0;
		setSuccessColor(element);
	}
	// var element = document.getElementById("blockPocketBuildingID");
	// if (element.value == "") {
	// blankfields = 1;
	// setErrorColor(element);
	// } else {
	// blankfields = 0;
	// setSuccessColor(element);
	// }
	var element = document.getElementById("flatNoID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		// blankfields = 0;
		setSuccessColor(element);
	}
	/*
	 * var element = document.getElementById("addressLine1ID"); if
	 * (element.value == "") { blankfields = 1; setErrorColor(element); } else {
	 * blankfields = 0; setSuccessColor(element); }
	 */
	/*
	 * var element = document.getElementById("addressLine2ID"); if
	 * (element.value == "") { blankfields = 1; setErrorColor(element); } else {
	 * blankfields = 0; setSuccessColor(element); }
	 */
	var element = document.getElementById("pincodeID");
	if (element.value.trim() == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		// blankfields = 0;
		setSuccessColor(element);
	}
	var element = document.getElementById("landAreaID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		// blankfields = 0;
		setSuccessColor(element);
	}
	var element = document.getElementById("coveredAreaID");
	if (element.value == "") {
		blankfields = 1;
		setErrorColor(element);
	} else {
		// blankfields = 0;
		setSuccessColor(element);
	}
}

function setErrorColor(element) {
	// console.log("setErrorColor "+elmenet);

	if (element) {
		element.style.borderColor = 'red';
		element.style.backgroundColor = 'rgb(255,0,0,0.1)';
		// element.focus();
	}
}
function setSuccessColor(element) {
	if (element != null) {
		element.style.borderColor = 'green';
		element.style.backgroundColor = 'rgb(0,255,0,0.1)';
	}
}

function printDoc() {
	$("#consentId").printThis({
		debug : false,
		importCSS : true,
		importStyle : true,
		printContainer : true,
		// loadCSS: "../css/style.css",
		pageTitle : "",
		removeInline : false,
		printDelay : 50,
		header : "",
		formValues : true,
		copyTagClasses : true
	});

	// var opn = window.open("","","");
	// if(opn!=null){
	// window.print();

	// }

}

function setDefaultColorForOrg() {

	var element = document.getElementById("organisationNameID");
	setDefaultColor(element);

	element = document.getElementById("authorizedPersonNameID");
	setDefaultColor(element);

	element = document.getElementById("mobileNumberID");
	setDefaultColor(element);

	element = document.getElementById("emailID");
	setDefaultColor(element);

	element = document.getElementById("panNumberID");
	setDefaultColor(element);

	element = document.getElementById("ownershipPercentageID");
	setDefaultColor(element);

	element = document.getElementById("ownerAddressLine1ID");
	setDefaultColor(element);

	element = document.getElementById("ownerAddressLine2ID");
	setDefaultColor(element);

	element = document.getElementById("ownerPincodeID");
	setDefaultColor(element);

	// element = document.getElementById("ownerCountryIDSelect");
	// alert(element.options[element.selectedIndex].text);

	// element = document.getElementById("ownerStateIDSelect");

	// element = document.getElementById("ownerDistrictIDSelect");
	// setDefaultColor(element);

	// var elementId = element.id;
	var paintElement = document
			.getElementById('select2-ownerDistrictIDSelect-container');
	setDefaultColor(paintElement.parentNode);

}

/*
 * $('#fetchCalculateBtn').on("click", function(e) { //
 * validateBlankfieldsPropertyDetailForm();
 * validateBlankfieldsForPropertyPage(); console.log("blankfields : " +
 * blankfields); if (blankfields == 0) { fetchCalculation(); } });
 */
function fetchCalculation() {
	alert("Tax Calculation.");
	var colony = $('#colonyIDSelect').find('option:selected').val();
	var totallandarea = $('#landAreaID').val();
	var coveredarea = $('#coveredAreaID').val();
	var usefactor = $('#useFactorIDSelect').find('option:selected').val();
	var structurefactor = $('#structureFactorIDSelect').find('option:selected')
			.val();
	var occupancyfactor = $('#occupancyFactorIDSelect').find('option:selected')
			.val();
	var agefactor = $('#ageFactorIDSelect').find('option:selected').val();
	var exemption = $('#exemptionIDSelect').find('option:selected').val();
	var propertytype = $('#propertyTypeIDSelect').find('option:selected').val();

	if (colony == '') {
		createSmallAlert('Colony Is Mandatory');
		return;
	}
	if (totallandarea == '') {
		createSmallAlert('Total Land Area Is Mandatory');
		return;
	}
	if (coveredarea == '') {
		createSmallAlert('Covered Area Is Mandatory');
		return;
	}
	if (propertytype == '') {
		createSmallAlert('Property Type Is Mandatory');
		return;
	}
	if (usefactor == '') {
		createSmallAlert('Use Factor Is Mandatory');
		return;
	}
	if (occupancyfactor == '') {
		createSmallAlert('Occupancy Factor Is Mandatory');
		return;
	}
	if (agefactor == '') {
		createSmallAlert('Age Factor Is Mandatory');
		return;
	}
	if (propertytype == '') {
		createSmallAlert('Property Type Is Mandatory');
		return;
	}
	var reqURL = "web/citizen/property/taxCalc?cg=" + colony + "&tla="
			+ totallandarea + "&ca=" + coveredarea + "&uf=" + usefactor
			+ "&of=" + occupancyfactor + "&af=" + agefactor + "&pt="
			+ propertytype;
	if (structurefactor != '') {
		reqURL = reqURL + "&sf=" + structurefactor;
	}
	if (exemption != '') {
		reqURL = reqURL + "&e=" + exemption;
	}

	$.ajax({
		type : "GET",
		url : reqURL,
		cache : false,
		async : true,
		beforeSend : function() {
			$("#overlay").hide();
		},
		success : function(data, status, xhr) {
			console.log("DATA : " + data);
			if (data != null) {

				console.log("LAND AREA : " + data.totalLandArea);
				$('#taxCalCulationLandAreaID').val(data.totalLandArea);

				$('#taxCalCulationCoveredAreaID').val(data.coveredArea);
				$('#taxCalCulationVacantLandID').val(data.vacantLandArea);
				$('#useFactorID').val(data.useFactorValue);
				$('#structureFactorID').val(data.structureFactorValue);
				$('#occupancyFactorID').val(data.occupancyFactorValue);
				$('#ageFactorID').val(data.ageFactorValue);
				$('#exemptionID').val(data.exemptionValue);
				$('#uavID').val(data.uav);
				$('#taxCategoryGuidID').val(data.taxCategoryGuid);
				$('#taxCategoryCodeID').val(data.taxCategoryCode);
				$('#taxCategoryNameID').val(data.taxCategoryName);
				$('#annaulValueID').val(data.annualValue);
				$('#taxRateID').val(data.taxRate);
				$('#taxCalculatedID').val(data.taxCalculated);
				$('#totalTaxID').val(data.totalTax);
				$('#fixedValueID').val(data.fixedFactorValue);
				$('#dueDateID').val(data.dueDate);
				$('#penalityAfterDueDateID').val(data.penalityAfterDueDate);
				$('#gracePeriodID').val(data.gracePeriod);
				$('#penalityAfteGracePeriodID').val(
						data.penalityAfterGracePeriod);
				$('#advanceRebateID').val(data.advancePayRebate);
				// alert("Tax For UPIC ID : ' " + $('#upid').val()
				// + " ' Calculated Successfully");
				$('#payTaxBtnId').prop('disabled', false);// Enable 'Pay Tax
				// Button'
				// setDefaultColorForFormInputs();
				$("#overlay").hide();
			} else {
				createSmallAlert("Error While Calculating Tax");
			}

		},
		error : function(e) {

		},
		complete : function() {
			$("#overlay").hide();
		}
	});
}

var tempACn = "";
var tempBankName = "";
var tempBranchName = "";
function calculateTaxNew() {
	
	var flg = validateBlankfieldsForPropertyPage();

	if (flg == true) {

		/*tempACn = document.getElementById("accountNoId").value;
		tempBankName = document.getElementById("bankNmId").value;
		tempBranchName = document.getElementById("branchNmId").value;

		encData();*/
		submitUpdatePassword();
		disableEditForCalcucation(true);
		/*
		 * var promises = [];
		 * 
		 * var numberOfFloors = $("#taxDetailsLengthID").val(); //alert('Number
		 * of times '+numberOfFloors); var i; for (i = 0; i <=numberOfFloors;
		 * i++) {
		 * 
		 * if(i == 0) { calculateVacantLandTax(); } else { var request =
		 * calculateSectionWiseTax(i); promises.push(request); } }
		 * $.when.apply(null, promises).done(function() {
		 * 
		 * //alert('Done'); })
		 */

		// calculateVacantLandTax();
		// calculateVacantLandTax();
		// ;
	} else {
		return false;
	}
}

function geoTagging() {
	var upicId = $("#upic").val();
	var reqURL = "web/citizen/property/rest/geoLocationData?upic="
		+ upicId;
	$.ajax({
		type: "GET",
		url: reqURL,
		cache: false,
		async: true,
		beforeSend: function() {

		},
		success: function(data, status, xhr) {
			var json = JSON.parse(data);
			var dataArr = json.data[0];

			if (dataArr != null) {
				var latitude = dataArr.latitude;
				var longitude = dataArr.longitude;
				var dialog = bootbox.dialog({
					message: "<div class='font-weight-bold'>Geo tagging has been done latitude =" + latitude + " and longitude =" + longitude + " .</div>",
					size: 'large',
					buttons: {
						close: {
							label: "Close",
							className: 'btn-danger m-4',
					    }
					}
				});
			}
			else {
				var dialog = bootbox.dialog({
					message: "<div class='font-weight-bold'>Geo tagging has not been done. If you wanted to do please click on this button</div>",
					size: 'large',
					buttons: {
						ok: {
							label: "Goe Tagging",
							className: 'btn-success m-4',
							callback: function() {
								window.open("https://mcdonline.nic.in/download.html", '_blank');
							}
						}
					}
				});
			}

		},
		error: function(e) {
	
		},
		complete: function() {
	
		}
	});
}

function calculateVacantLandTax() {
	alert("calculateVacantLandTax");

	var numberOfFloors = $("#taxDetailsLengthID").val();

	var colonyGuid = $('#colonyIDSelect').find('option:selected').val();
	var totallandarea = $('#vacantLandAreaId').val();
	var groundcoveredarea = $('#vacantCoverdAreaId').val();
	var vacantlandusefactor = $('#vacantLandUseFactorIDSelect').find(
			'option:selected').val();
	var vacantlandoccupancyfator = $('#vacantLandOccupancyFactorIDSelect')
			.find('option:selected').val();
	var vacantlandexemtion = $('#vacantLandExemptionIDSelect').find(
			'option:selected').val();
	var coveredarea = '';
	var coveredusefactor = '';
	var coveredstructurefactor = '';
	var coveredoccupancyfactor = '';
	var coveredagefactor = '';
	var coveredexemption = '';
	var propertyCategory = $('#propertyCategoryIDSelect').find(
			'option:selected').val();
	var ownerrebate = '';
	var propertytype = $('#propertyTypeIDSelect').find('option:selected').val();
	var ownerType = $('#ownerTypeIDSelect').find('option:selected').val();

	/*
	 * 9379b971-78a7-4e82-8dbc-4ccfc309ac11, 1000, 500, , ,
	 * f2fe0fca-4935-41ce-9341-3a7a8090d48a, undefined, undefined,
	 * undefined,undefined, undefined, undefined,
	 * ab04a7f8-2902-464a-81e2-fd44b099f5b7
	 */

	console.log("VALUES : " + colonyGuid + ',' + totallandarea + ', '
			+ groundcoveredarea + ', ' + vacantlandusefactor + ', '
			+ vacantlandoccupancyfator + ', ' + vacantlandexemtion + ', '
			+ coveredarea + ', ' + coveredusefactor + ', '
			+ coveredstructurefactor + ',' + coveredoccupancyfactor + ', '
			+ coveredagefactor + ', ' + coveredexemption + ', ' + propertytype
			+ ' , ' + propertyCategory + ' ,' + ownerType);

	var reqURL = "web/citizen/property/doGetTaxCalculation?cg=" + colonyGuid
			+ "&tla=" + totallandarea + "&gca=" + groundcoveredarea + "&pt="
			+ propertytype + "&pc=" + propertyCategory + "&ot=" + ownerType
			+ "&nof=" + numberOfFloors;
	if (vacantlandusefactor != '') {
		reqURL = reqURL + "&vluf=" + vacantlandusefactor;
	}
	if (vacantlandoccupancyfator != '') {
		reqURL = reqURL + "&vlof=" + vacantlandoccupancyfator;
	}
	if (vacantlandexemtion != '') {
		reqURL = reqURL + "&vle=" + vacantlandexemtion;
	}
	if (coveredarea != '') {
		reqURL = reqURL + "&ca=" + coveredarea;
	}
	if (coveredusefactor != '') {
		reqURL = reqURL + "&cuf=" + coveredusefactor;
	}
	if (coveredstructurefactor != '') {
		reqURL = reqURL + "&csf=" + coveredstructurefactor;
	}
	if (coveredoccupancyfactor != '') {
		reqURL = reqURL + "&cof=" + coveredoccupancyfactor;
	}
	if (coveredagefactor != '') {
		reqURL = reqURL + "&caf=" + coveredagefactor;
	}
	if (coveredexemption != '') {
		reqURL = reqURL + "&ce=" + coveredexemption;
	}
	if (ownerrebate != '') {
		reqURL = reqURL + "&or=" + ownerrebate;
	}
	console.log(reqURL);
	alert(reqURL);
	$.ajax({
		type : "GET",
		url : reqURL,
		cache : false,
		async : true,
		beforeSend : function() {

		},
		success : function(data, status, xhr) {
			showTab('2');
			$('#payTaxBtnId').prop('disabled', false);// Enable 'Pay Tax
			$("#taxPayable").empty();
			$("#taxPayable").html(data);
		},
		error : function(e) {

		},
		complete : function() {

			// calculateVacantLandTax();
		}
	});

}

function calculateSectionWiseTax(counter) {
	// alert('counter '+counter);
	var numberOfFloors = $("#taxDetailsLengthID").val();
	var i = counter - 1;
	var colonyGuid = $('#colonyIDSelect').find('option:selected').val();
	var totallandarea = $('#vacantLandAreaId').val();
	var groundcoveredarea = $('#vacantCoverdAreaId').val();
	var vacantlandusefactor = $('#vacantLandUseFactorIDSelect').find(
			'option:selected').val();
	var vacantlandoccupancyfator = $('#vacantLandOccupancyFactorIDSelect')
			.find('option:selected').val();
	var vacantlandexemtion = $('#vacantLandExemptionIDSelect').find(
			'option:selected').val();
	var coveredarea = $('#coveredAreaID' + i).val();
	var coveredusefactor = $('#useFactorID' + i + 'Select').find(
			'option:selected').val();
	var coveredstructurefactor = $('#structureFactorID' + i + 'Select').find(
			'option:selected').val();
	var coveredoccupancyfactor = $('#occupancyFactorID' + i + 'Select').find(
			'option:selected').val();
	var coveredagefactor = $('#ageFactorID' + i + 'Select').find(
			'option:selected').val();
	var coveredexemption = $('#exemptionID' + i + 'Select').find(
			'option:selected').val();
	var ownerrebate = '';
	var propertytype = $('#propertyTypeID' + i + 'Select').find(
			'option:selected').val();
	var propertyCategory = $('#propertyCategoryIDSelect').find(
			'option:selected').val();
	var ownerType = $('#ownerTypeIDSelect').find('option:selected').val();

	console.log("VALUES : " + colonyGuid + ',' + totallandarea + ', '
			+ groundcoveredarea + ', ' + vacantlandusefactor + ', '
			+ vacantlandoccupancyfator + ', ' + vacantlandexemtion + ', '
			+ coveredarea + ', ' + coveredusefactor + ', '
			+ coveredstructurefactor + ',' + coveredoccupancyfactor + ', '
			+ coveredagefactor + ', ' + coveredexemption + ', ' + propertytype
			+ ' , ' + propertyCategory + ' ,' + ownerType);

	var reqURL = "web/citizen/property/doGetTaxCalculation?cg=" + colonyGuid
			+ "&tla=" + totallandarea + "&gca=" + groundcoveredarea + "&pt="
			+ propertytype + "&pc=" + propertyCategory + "&ot=" + ownerType
			+ "&nof=" + numberOfFloors;

	if (vacantlandusefactor != '') {
		reqURL = reqURL + "&vluf=" + vacantlandusefactor;
	}
	if (vacantlandoccupancyfator != '') {
		reqURL = reqURL + "&vlof=" + vacantlandoccupancyfator;
	}
	if (vacantlandexemtion != '') {
		reqURL = reqURL + "&vle=" + vacantlandexemtion;
	}
	if (coveredarea != '') {
		reqURL = reqURL + "&ca=" + coveredarea;
	}
	if (coveredusefactor != '') {
		reqURL = reqURL + "&cuf=" + coveredusefactor;
	}
	if (coveredstructurefactor != '') {
		reqURL = reqURL + "&csf=" + coveredstructurefactor;
	}
	if (coveredoccupancyfactor != '') {
		reqURL = reqURL + "&cof=" + coveredoccupancyfactor;
	}
	if (coveredagefactor != '') {
		reqURL = reqURL + "&caf=" + coveredagefactor;
	}
	if (coveredexemption != '') {
		reqURL = reqURL + "&ce=" + coveredexemption;
	}
	if (ownerrebate != '') {
		reqURL = reqURL + "&or=" + ownerrebate;
	}
	console.log(reqURL);
	// alert(reqURL);
	$.ajax({
		type : "GET",
		url : reqURL,
		cache : false,
		async : true,
		beforeSend : function() {

		},
		success : function(data, status, xhr) {
			showTab('2');
			$('#payTaxBtnId').prop('disabled', false);// Enable 'Pay Tax
			$("#taxPayable").empty();
			$("#taxPayable").html(data);
			
		},
		error : function(e) {

		},
		complete : function() {

		}
	});

}

function calculateTax() {
	var colonyGuid = $('#colonyIDSelect').find('option:selected').val();
	var totallandarea = $('#vacantLandAreaId').val();
	var groundcoveredarea = $('#vacantCoverdAreaId').val();
	var vacantlandusefactor = $('#vacantLandUseFactorIDSelect').find(
			'option:selected').val();
	var vacantlandoccupancyfator = $('#vacantLandOccupancyFactorIDSelect')
			.find('option:selected').val();
	var vacantlandexemtion = $('#vacantLandExemptionIDSelect').find(
			'option:selected').val();
	var coveredarea = $('#coveredAreaID').val();
	var coveredusefactor = $('#useFactorIDSelect').find('option:selected')
			.val();
	var coveredstructurefactor = $('#structureFactorIDSelect').find(
			'option:selected').val();
	var coveredoccupancyfactor = $('#occupancyFactorIDSelect').find(
			'option:selected').val();
	var coveredagefactor = $('#ageFactorIDSelect').find('option:selected')
			.val();
	var coveredexemption = $('#exemptionIDSelect').find('option:selected')
			.val();
	var ownerrebate = '';
	var propertytype = $('#propertyTypeIDSelect').find('option:selected').val();

	console.log("VALUES : " + colonyGuid + ',' + totallandarea + ', '
			+ groundcoveredarea + ', ' + vacantlandusefactor + ', '
			+ vacantlandoccupancyfator + ', ' + vacantlandexemtion + ', '
			+ coveredarea + ', ' + coveredusefactor + ', '
			+ coveredstructurefactor + ',' + coveredoccupancyfactor + ', '
			+ coveredagefactor + ', ' + coveredexemption + ', ' + propertytype);

	var reqURL = "web/citizen/property/doGetTaxCalculation?cg=" + colonyGuid
			+ "&tla=" + totallandarea + "&gca=" + groundcoveredarea + "&pt="
			+ propertytype;
	if (vacantlandusefactor != '') {
		reqURL = reqURL + "&vluf=" + vacantlandusefactor;
	}
	if (vacantlandoccupancyfator != '') {
		reqURL = reqURL + "&vlof=" + vacantlandoccupancyfator;
	}
	if (vacantlandexemtion != '') {
		reqURL = reqURL + "&vle=" + vacantlandexemtion;
	}
	if (coveredarea != '') {
		reqURL = reqURL + "&ca=" + coveredarea;
	}
	if (coveredusefactor != '') {
		reqURL = reqURL + "&cuf=" + coveredusefactor;
	}
	if (coveredstructurefactor != '') {
		reqURL = reqURL + "&csf=" + coveredstructurefactor;
	}
	if (coveredoccupancyfactor != '') {
		reqURL = reqURL + "&cof=" + coveredoccupancyfactor;
	}
	if (coveredagefactor != '') {
		reqURL = reqURL + "&caf=" + coveredagefactor;
	}
	if (coveredexemption != '') {
		reqURL = reqURL + "&ce=" + coveredexemption;
	}
	if (ownerrebate != '') {
		reqURL = reqURL + "&or=" + ownerrebate;
	}
	console.log(reqURL);
	alert(reqURL);
	$.ajax({
		type : "GET",
		url : reqURL,
		cache : false,
		async : true,
		beforeSend : function() {

		},
		success : function(data, status, xhr) {
			showTab('2');
			$('#payTaxBtnId').prop('disabled', false);// Enable 'Pay Tax
			$("#taxPayable").empty();
			$("#taxPayable").html(data);
		},
		error : function(e) {

		},
		complete : function() {

		}
	});
}

function Section(element) {
	if (element.value > 5) {
		return;

	}
	var i = 0;
	$("div").remove(".taxFactorDiv");

	var floorNo = "";
	for (i; i < element.value; i++) {
		// if (i == 1) {
		// floorNo = i + "st";
		// } else if (i == 2) {
		// floorNo = i + "nd";
		// } else if (i == 3) {
		// floorNo = i + "rd";
		//
		// } else {
		// floorNo = i + "th";
		// }
		// if (i != -1) {

		var section = '<div class="col-md-12 padding-zero panel-forms taxFactorDiv"><ol class="breadcrumb"><li class="active"><i class="fa fa-list"></i><b class="modalmsz"> TAX FACTORS FOR FLOOR</b></li></ol><div class="col-sm-12 col-md-12"> <div id="floorDivID" class="col-sm-4 col-md-4">	<label class="control-label required" for="floorIDSelect">FLOOR</label>	<div class="input-group"><span class="input-group-addon"><i class="fa fa-th"></i></span><select id="floorIDSelect_'
				+ i
				+ 'Select" class="js-states form-control" name="property.taxDetail['
				+ i
				+ '].floor" onchange="InvalidMsgForSelection(this),floorOperationsAddonSections(this)" required><option value="" selected="selected">CHOOSE</option><c:forEach items="${floorOptions}" var="list">	<c:choose><c:when test="${list.optionGuid eq propertyTax.property.floorGuid}"><option value="<c:out value=\'${list.optionGuid}\'/>" selected="selected"><c:out value=\'${list.optionValue}\'/></option></c:when><c:otherwise><option value="<c:out value=\'${list.optionGuid}\'/>"><c:out value=\'${list.optionValue}\'/></option></c:otherwise></c:choose></c:forEach></select></div></div> <div id="totlLandAreaDivId_'
				+ i
				+ '"class="col-sm-4 col-md-4"><label class="control-label required" for="landAreaID">TOTAL LAND AREA(In Sq. mtr) </label><div class="input-group"><span class="input-group-addon"><i class="fa fa-th"></i></span> <input id="landAreaID" name="property.taxDetail['
				+ i
				+ '].landArea" value="" class="form-control" type="number" min="1" pattern="[1-9]{}" onchange="InvalidMsg(this)" required></div></div><div class="col-sm-4 col-md-4"><label class="control-label required"for="coveredAreaID">COVERED AREA(In Sq. mtr) </label><div class="input-group"><span class="input-group-addon"><i class="fa fa-th"></i></span> <input id="coveredAreaID" name="property.taxDetail['
				+ i
				+ '].coveredArea" value=""class="form-control" type="number" min="1" pattern="[1-9]{}" onchange="InvalidMsg(this)" required></div></div></div><div class="col-sm-12 col-md-12"><div class="col-sm-4 col-md-4"  style="max-width:33%; overflow:hidden;"><label class="control-label required" for="useFactorIDSelect">USE FACTOR </label><div class="input-group"><span class="input-group-addon"><i class="fa fa-th"></i></span><select id="useFactorIDSelect_'
				+ i
				+ 'Select" class="js-states form-control" name="property.taxDetail['
				+ i
				+ '].useFactorGuid" required onchange="InvalidMsgForSelection(this)"> <option value="" selected="selected">CHOOSE</option><c:forEach items="${useFactorOptions}" var="list"><c:choose><c:when test="${list.optionGuid eq propertyTax.property.taxDetail.useFactorGuid}"><option value="<c:out value=\'${list.optionGuid}\'/>" selected="selected"><c:out value=\'${list.optionValue}\'/></option></c:when><c:otherwise><option value="<c:out value=\'${list.optionGuid}\'/>"><c:out value=\'${list.optionValue}\'/></option></c:otherwise></c:choose></c:forEach></select></div></div><div class="col-sm-4 col-md-4"><label class="control-label required" for="structureFactorIDSelect">STRUCTURE FACTOR</label><div class="input-group"><span class="input-group-addon"><i class="fa fa-th"></i></span><select id="structureFactorIDSelect_'
				+ i
				+ 'Select" class="js-states form-control" name="property.taxDetail['
				+ i
				+ '].structureFactorGuid" required onchange="InvalidMsgForSelection(this)"><option value="" selected="selected">CHOOSE</option><c:forEach items="${structureFactorOptions}" var="list"><c:choose><c:when test="${list.optionGuid eq propertyTax.property.taxDetail.structureFactorGuid}"><option value="<c:out value=\'${list.optionGuid}\'/>" selected="selected"><c:out value=\'${list.optionValue}\'/></option></c:when><c:otherwise><option value="<c:out value=\'${list.optionGuid}\'/>"><c:out value=\'${list.optionValue}\'/></option></c:otherwise></c:choose></c:forEach></select></div></div><div class="col-sm-4 col-md-4"><label class="control-label required" for="occupancyFactorIDSelect">OCCUPANCY FACTOR</label><div class="input-group"><span class="input-group-addon"><i class="fa fa-th"></i></span><select id="occupancyFactorIDSelect_'
				+ i
				+ 'Select" class="js-states form-control" name="property.taxDetail['
				+ i
				+ '].occupancyFactorGuid" required onchange="InvalidMsgForSelection(this)"><option value="" selected="selected">CHOOSE</option><c:forEach items="${occupancyFactorOptions}" var="list"><c:choose><c:when test="${list.optionGuid eq propertyTax.property.taxDetail.occupancyFactorGuid}"><option value="<c:out value=\'${list.optionGuid}\'/>" selected="selected"><c:out value=\'${list.optionValue}\'/></option></c:when><c:otherwise><option value="<c:out value=\'${list.optionGuid}\'/>"><c:out value=\'${list.optionValue}\'/></option></c:otherwise></c:choose></c:forEach></select></div></div></div><div class="col-sm-12 col-md-12"><div class="col-sm-4 col-md-4"><label class="control-label required" for="ageFactorIDSelect">AGE FACTOR</label><div class="input-group"><span class="input-group-addon"><i class="fa fa-th"></i></span><select id="ageFactorIDSelect_'
				+ i
				+ 'Select" class="js-states form-control" name="property.taxDetail['
				+ i
				+ '].ageFactorGuid" required onchange="InvalidMsgForSelection(this)"><option value="" selected="selected">CHOOSE</option><c:forEach items="${ageFactorOptions}" var="list"><c:choose><c:when test="${list.optionGuid eq propertyTax.property.taxDetail.ageFactorGuid}"><option value="<c:out value=\'${list.optionGuid}\'/>" selected="selected"><c:out value=\'${list.optionValue}\'/></option></c:when><c:otherwise><option value="<c:out value=\'${list.optionGuid}\'/>"><c:out value=\'${list.optionValue}\'/></option></c:otherwise></c:choose></c:forEach></select></div></div><div class="col-sm-4 col-md-4"><label class="control-label" for="exemptionIDSelect">EXEPMTION </label><div class="input-group"><span class="input-group-addon"><i class="fa fa-th"></i></span><select id="exemptionIDSelect_'
				+ i
				+ 'Select" class="js-states form-control" name="property.taxDetail['
				+ i
				+ '].exemptionGuid"><option value="" selected="selected">CHOOSE</option><c:forEach items="${exemptionOptions}" var="list"><c:choose><c:when test="${list.optionGuid eq propertyTax.property.taxDetail.exemptionGuid}"><option value="<c:out value=\'${list.optionGuid}\'/>" selected="selected"><c:out value=\'${list.optionValue}\'/></option></c:when><c:otherwise><option value="<c:out value=\'${list.optionGuid}\'/>"><c:out value=\'${list.optionValue}\'/></option></c:otherwise></c:choose></c:forEach></select></div></div></div><label class="control-label"><h6 style="color:red">NOTE : Unique Property ID will be generated for each floor.</h6></label></div>';

		var para = document.createElement("div");
		var mainDiv = document.getElementById("boxDiv");
		mainDiv.appendChild(para);
		para.innerHTML = section;
		// call to data fill into USER FACTORS, STRUCTOR FACTOR ,AGE
		// FACTOR, OCCUPANCY FACTOR,EXEPMTION
		// variable [i] is used to create unique ID
		getFloorValue(i)
		getUseFactorsValue(i);
		getStructureFactorsValue(i);
		getOccupancyFactorsValue(i);
		getAgeFactorsValue(i);
		getExepmtionFactorsValue(i);
		// call to add 3ed party search in dropdown
		select2Refresh();
		// }

	}

}

function getFloorValue(number) {
	if (element != "") {
		var factorValues = [];
		var factorElement = document.getElementById("floorIDSelect");
		var i = 0;
		var destinationSelect = document.getElementById("floorIDSelect_"
				+ number + "Select");

		for (i; i < factorElement.length; i++) {
			var opetion = document.createElement("option");
			opetion.setAttribute("value", factorElement.options[i].value);
			// console.log("Text "+factorElement.options[i].text);
			// console.log("Value "+factorElement.options[i].value);
			opetion.text = factorElement.options[i].text;
			destinationSelect.add(opetion);

		}
	}
}

function getUseFactorsValue(number) {
	var factorValues = [];
	var factorElement = document.getElementById("useFactorIDSelect");
	var i = 0;
	var destinationSelect = document.getElementById("useFactorIDSelect_"
			+ number + "Select");

	for (i; i < factorElement.length; i++) {
		var opetion = document.createElement("option");
		opetion.setAttribute("value", factorElement.options[i].value);
		opetion.text = factorElement.options[i].text;
		destinationSelect.add(opetion);

	}
}

function getStructureFactorsValue(number) {
	var factorValues = [];
	var factorElement = document.getElementById("structureFactorIDSelect");
	var i = 0;
	var destinationSelect = document.getElementById("structureFactorIDSelect_"
			+ number + "Select");

	for (i; i < factorElement.length; i++) {
		var opetion = document.createElement("option");
		opetion.setAttribute("value", factorElement.options[i].value);
		opetion.text = factorElement.options[i].text;
		destinationSelect.add(opetion);

	}
}

function getOccupancyFactorsValue(number) {
	var factorValues = [];
	var factorElement = document.getElementById("occupancyFactorIDSelect");
	var i = 0;
	var destinationSelect = document.getElementById("occupancyFactorIDSelect_"
			+ number + "Select");

	for (i; i < factorElement.length; i++) {
		var opetion = document.createElement("option");
		opetion.setAttribute("value", factorElement.options[i].value);
		opetion.text = factorElement.options[i].text;
		destinationSelect.add(opetion);

	}
}

function getAgeFactorsValue(number) {
	var factorValues = [];
	var factorElement = document.getElementById("ageFactorIDSelect");
	var i = 0;
	var destinationSelect = document.getElementById("ageFactorIDSelect_"
			+ number + "Select");

	for (i; i < factorElement.length; i++) {
		var opetion = document.createElement("option");
		opetion.setAttribute("value", factorElement.options[i].value);
		opetion.text = factorElement.options[i].text;
		destinationSelect.add(opetion);

	}
}

function getExepmtionFactorsValue(number) {
	var factorValues = [];
	var factorElement = document.getElementById("exemptionIDSelect");
	var i = 0;
	var destinationSelect = document.getElementById("exemptionIDSelect_"
			+ number + "Select");

	for (i; i < factorElement.length; i++) {
		var opetion = document.createElement("option");
		opetion.setAttribute("value", factorElement.options[i].value);
		opetion.text = factorElement.options[i].text;
		destinationSelect.add(opetion);

	}
}

function concatePlotHouseNo() {
	var prefix = document.getElementById("plotHouseID");
	var main = document.getElementById("mainPlotHouseID");
	var suffix = document.getElementById("sufPlotHouseID");

	// SACHIN

	/*
	 * if (prefix.value != "" && main.value != "" && suffix.value != "") { var
	 * plotHouseNo = document.getElementById("plotHouseHiddenId");
	 * plotHouseNo.value = prefix.value + "/" + main.value + "/" + suffix.value;
	 *  } else { // alert("Please Enter Plot House No."); console.log("Please
	 * Enter Plot House No.");
	 *  }
	 */
}

function concateFloorNo() {
	var prefix = document.getElementById("flatNoID");
	var main = document.getElementById("mainFlatNoID");
	var suffix = document.getElementById("sufFlatNoID");

	if (prefix.value != "" && main.value != "" && suffix.value != "") {
		var plotHouseNo = document.getElementById("flatNoHiddenId");
		plotHouseNo.value = prefix.value + "/" + main.value + "/"
				+ suffix.value;
		// alert("Flat No : "+plotHouseNo.value);

	} else {
		// alert("Please Enter Flat No.");
		console.log("Please Enter Flat No.");

	}
}

function floorOperations(element) {
	console.log("ID : " + element.id);
	var id = element.id;
	console.log("Floor Selected value : "
			+ $("#floorIDSelect").find(":selected").val());
	if ($("#floorIDSelect").find(":selected").val() == '51839bfb-dd97-432e-b907-9019b5fbd84a') {
		$("#totlLandAreaDivId").show();

	} else {
		$("#totlLandAreaDivId").hide();

	}
}

function floorOperationsAddonSections(element) {
	// console.log("ID : "+element.id);
	var id = element.id;
	var noOfFloor = $("#noOfFloor").val();
	var i = 1;
	for (i; i <= noOfFloor; i++) {
		console.log("Floor Selected value From Addon Sections : "
				+ $("#floorIDSelect_" + i + "Select").find(":selected").val());
		if ($("#floorIDSelect_" + i + "Select").find(":selected").val() == '51839bfb-dd97-432e-b907-9019b5fbd84a') {
			$("#totlLandAreaDivId_" + i).show();

		} else {
			$("#totlLandAreaDivId_" + i).hide();

		}
	}
}

function checkVacantArea() {
	var land = $("#vacantLandAreaId").val();
	var cover = $("#vacantCoverdAreaId").val();

	if (land != "" && cover != "") {
		var vactlandarea = (Number(land) - Number(cover)).toFixed(2);
		if (Number(land) < Number(cover)) {
			createSmallAlert("Total Land Area Cannot Be Less Than Covered Area");
			$("#vacantCoverdAreaId").val("");
			$("#vacantLandId").val("");
		} else {
			$("#vacantLandId").val(vactlandarea);
			if (Number(land) > Number(cover)) {
				$("#vacantLandUseFactorIDSelect").select2("enable");
				$("#vacantLandOccupancyFactorIDSelect").select2("enable");
				$("#vacantLandExemptionIDSelect").select2("enable");
				$("#propertyTypeIDSelect").select2("enable");
			} else {
				$("#vacantLandUseFactorIDSelect").select2("enable");
				$("#vacantLandOccupancyFactorIDSelect").select2("enable");
				$("#vacantLandExemptionIDSelect").select2("enable");
				$("#propertyTypeIDSelect").select2("enable");
				// $("#vacantLandUseFactorIDSelect").select2("enable", false);
				// $("#vacantLandOccupancyFactorIDSelect").select2("enable",
				// false);
				// $("#vacantLandExemptionIDSelect").select2("enable", false);
				// $("#propertyTypeIDSelect").select2("enable", true);
			}
		}
	}
	// select2Refresh();
}

  function checkFloorCoverArea(element){
  
	  /* var id = element.id; var land = $("#vacantLandAreaId").val(); var
  vacLandCoverArea = $("#vacantCoverdAreaId").val(); var cover =
 $("#"+id).val(); if (land != "" && cover != "") { var vactlandarea =
  Number(land) - Number(cover); if (Number(land) < Number(cover)) {
  createSmallAlert("TOTAL LAND AREA CANNOT BE LESS THAN COVERED AREA");
  $("#"+id).val("");
   } }
 
if (vacLandCoverArea != "" && cover != "") { if (Number(vacLandCoverArea) <
  Number(cover)) { 
	createSmallAlert("COVERED AREA CANNOT BE MORE THAN THE  VACANT LAND AREA"); $("#"+id).val("");
}
 
   } */ }


// }
function checkBankAccount(element) {
	if (element.value != '') {
		if (element.value.length < 9 || element.value.length > 20) {

			element.value = '';
			createSmallAlert("A/C Number Could Be Between 9 To 20 Digits Length.");
			setErrorColor(element);

		}

		// else {
		// console.log(element.value.substring(0, 1));
		// if (element.value.substring(0, 2) == '00') {
		// element.value = '';
		// createSmallAlert("Please Enter valid A/C number");
		// setErrorColor(element);
		//
		// } else {
		// setSuccessColor(element);
		// }
		// }
	}
}

// function uploadFileProperties(element) {
// // console.log("File Length : " + element.files.length);
// var count = 0;
// var Contnr = document.getElementById("fileUploadContnrID");
// for (count; count < element.files.length; count++) {
// var fileNameHidden = document.createElement("input");
// fileNameHidden.setAttribute("type", "hidden");
// fileNameHidden.setAttribute("name", "property.propertyDoc[" + count
// + "].docName");
// fileNameHidden.setAttribute("value", element.files[count].name);
// Contnr.appendChild(fileNameHidden);
// // var firstNameTxt = document.createTextNode(firstName);
// // firstNameCell.appendChild(firstNameTxt);
// }
// }

var count = 0;
function uploadFileProperties(element) {
	// console.log("File Length : " + element.files.length);
	// var count = 0;
	//var Contnr = document.getElementById("fileUploadContnrID");

	// alert("Contnr is "+Contnr);

	// for (count; count < element.files.length; count++) {

	var fileNameHidden = document.createElement("input");
	fileNameHidden.setAttribute("type", "text");
	// fileNameHidden.setAttribute("name", "property.propertyDoc[" + count
	// + "].docName");

	fileNameHidden.setAttribute("name", "property.propertyDoc[" + count
			+ "].docName");
	// fileNameHidden.setAttribute("value", element.files[0].name);

	// var firstNameTxt = document.createTextNode(firstName);
	// firstNameCell.appendChild(firstNameTxt);

	// document.getElementById(element) = ""

	// file content checking

	// alert('sssssss') ;
	// var result = $('div#result');

	if (window.FileReader && window.Blob) {

		var file = element.files[0];
		if (file.size > 0) {

			if (file.size > 2097152) {
				alert('file size should be less than 2 MB');

				var docUpload = $("#" + element.id);

				docUpload.replaceWith(docUpload.val('').clone(true));

				return false;
			}

			var fileReader = new FileReader();
			fileReader.onloadend = function(e) {

				var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
				var header = '';

				for (var i = 0; i < arr.length; i++) {
					header += arr[i].toString(16);
				}

				// Check the file signature against known types
				var type = 'unknown';
				switch (header) {

				case '89504e47':
					type = 'unknown';
					break;
				case '47494638':
					type = 'unknown';
					break;
				case 'ffd8ffe0':
				case 'ffd8ffe1':
				case 'ffd8ffe2':
					type = 'unknown';
					break;
				case '25504446':
					type = 'application/pdf';
					break;
				}

				if (file.type !== type) {
					// result.html('<span style="color: red; ">Mime type
					// detected: ' + type + '. Does not match file
					// extension.</span>');

					alert('Not a pdf file upload correct file');

					var docUploadpdf = $("#" + element.id);

					docUploadpdf.replaceWith(docUploadpdf.val('').clone(true));

					return false;

				} else {
					fileNameHidden.setAttribute("value", element.files[0].name);
					return true;
				}
			};
			fileReader.readAsArrayBuffer(file);
		}

	} else {
		console.error('FileReader or Blob is not supported by browser.');
	}

	// }

	//Contnr.appendChild(fileNameHidden);
	count++;

}

function downloadFile(fileNm) {
	console.log("In Download.");
	$.ajax({
		type : "GET",
		url : "web/citizen/property/download?fileName=" + fileNm,
		cache : false,
		async : true,
		beforeSend : function() {

		},
		success : function(data, status, xhr) {
			createSmallAlert("File download successfull.");
		},
		error : function(e) {
			createSmallAlert("File Not Download.");
		},
		complete : function() {
			// select2Refresh();
		}
	});
}

function checkAddress(element) {
	var eleValue = element.value.toUpperCase();
	if (eleValue == 'YES') {
		console.log("Value : " + eleValue);
		$("#ownerAddressID").show();

		var plothousefarm = $("#plotHouseID").val() + $("#farmHouseID").val();
		var sectorPhase = $("#sectorID").val() + $("#laneID").val();
		// var blockPocket = $("#blockPocketBuildingID").val();
		var landmark = $("#addressLine1ID").val();
		var pincode = $("#pincodeID").val();

		if (plothousefarm != '' && pincode != '') {

			var address1 = plothousefarm + ', ' + sectorPhase;
			var address2 = landmark;

			$('#ownerAddressLine1ID').val(address1);
			$('#ownerAddressLine2ID').val(address2);
			$('#ownerPincodeID').val(pincode);

			var country = $('#countryIDSelect').find('option:selected').val();

			$('#ownerCountryIDSelect option[value=' + country + ']').attr(
					"selected", "selected");
			$('#ownerCountryIDSelect').trigger('change');

		} else {
			alert("Please fill all required fields in 'Property Detail'");

			document.getElementById('coresRadioYes').checked = false;
			document.getElementById('coresRadioNo').checked = true;
		}
	} else {
		console.log("Value : " + eleValue);
		$('#ownerAddressLine1ID').val('');
		$('#ownerAddressLine2ID').val('');
		$('#ownerPincodeID').val('');

		$('#ownerStateIDSelect').val('').change();

	}

}

function setDraft(event) {
	if (event.keyCode == 13) {
		return false; // on hitting enter key.
	}

	$("#draftHidnInputID").val("true");
	$("#submitHidnInputID").val("false");
	if ($('#colonyIDSelect').find('option:selected').val() == '') {
		createSmallAlert('Please select COLONY');
		return false;
	}
}

function plotHouseFlatFarmSelection() {
	var radioValue = $("input[name='plotHouseFlatFarmRdoBtn']:checked").val();
	if (radioValue == 'plot') {

		$("#mainPlotHouseID").val("");
		$("#sufPlotHouseID").val("");
		$("#farmHouseID").val("");
		
		// alert("Your are selected - " + "PLOT");
		$("#plotHouseID").prop("placeholder", "Plot No.");
		$("#mainPlotHouseID").prop("placeholder", "");
		$("#sufPlotHouseID").prop("placeholder", "");
		$("#farmHouseID").prop("placeholder", "");

		/*$("input:radio[name=plotHouseFlatFarmRdoBtn]").attr("disabled",true);*/
		$("#plotHouseID").prop("disabled", false);
		$("#mainPlotHouseID").prop("disabled", true);
		$("#sufPlotHouseID").prop("disabled", true);
		$("#farmHouseID").prop("disabled", true);

		$("#plotHouseID").prop("required", true);
		$("#mainPlotHouseID").prop("required", false);
		$("#sufPlotHouseID").prop("required", false);
		$("#farmHouseID").prop("required", false);

	} else if (radioValue == 'house') {

		$("#plotHouseID").val("");
		$("#sufPlotHouseID").val("");
		$("#farmHouseID").val("");

		// alert("Your are selected - " + "HOUSE");
		$("#plotHouseID").prop("placeholder", "");
		$("#mainPlotHouseID").prop("placeholder", "House No.");
		$("#sufPlotHouseID").prop("placeholder", "");
		$("#farmHouseID").prop("placeholder", "");

		$("#plotHouseID").prop("disabled", true);
		$("#mainPlotHouseID").prop("disabled", false);
		$("#sufPlotHouseID").prop("disabled", true);
		$("#farmHouseID").prop("disabled", true);

		$("#plotHouseID").prop("required", false);
		$("#mainPlotHouseID").prop("required", true);
		$("#sufPlotHouseID").prop("required", false);
		$("#farmHouseID").prop("required", false);

	} else if (radioValue == 'flat') {

		$("#plotHouseID").val("");
		$("#mainPlotHouseID").val("");
		$("#farmHouseID").val("");

		// alert("Your are selected - " + "FLAT");
		$("#plotHouseID").prop("placeholder", "");
		$("#mainPlotHouseID").prop("placeholder", "");
		$("#sufPlotHouseID").prop("placeholder", "Flat No.");
		$("#farmHouseID").prop("placeholder", "");

		$("#plotHouseID").prop("disabled", true);
		$("#mainPlotHouseID").prop("disabled", true);
		$("#sufPlotHouseID").prop("disabled", false);
		$("#farmHouseID").prop("disabled", true);

		$("#plotHouseID").prop("required", false);
		$("#mainPlotHouseID").prop("required", false);
		$("#sufPlotHouseID").prop("required", true);
		$("#farmHouseID").prop("required", false);

	} else if (radioValue == 'farmHouse') {

		$("#plotHouseID").val("");
		$("#mainPlotHouseID").val("");
		$("#sufPlotHouseID").val("");

		// alert("Your are selected - " + "FARM HOUSE");
		$("#plotHouseID").prop("placeholder", "");
		$("#mainPlotHouseID").prop("placeholder", "");
		$("#sufPlotHouseID").prop("placeholder", "");
		$("#farmHouseID").prop("placeholder", "Farm House");

		$("#plotHouseID").prop("disabled", true);
		$("#mainPlotHouseID").prop("disabled", true);
		$("#sufPlotHouseID").prop("disabled", true);
		$("#farmHouseID").prop("disabled", false);

		$("#plotHouseID").prop("required", false);
		$("#mainPlotHouseID").prop("required", false);
		$("#sufPlotHouseID").prop("required", false);
		$("#farmHouseID").prop("required", true);

	}

}

function sectorPhaseSelection() {
	var radioValue = $("input[name='sectorPhaseRdoBtn']:checked").val();
	if (radioValue == 'sector') {

		// $("#phaseID").val("");
		$("#laneID").val("");

		// alert("You select - "+radioValue);
		$("#sectorID").prop("placeholder", "Sector");
		$("#laneID").prop("placeholder", "");

		$("#sectorID").prop("disabled", false);
		$("#laneID").prop("disabled", true);

		$("#sectorID").prop("required", true);
		$("#laneID").prop("required", false);

	} else if (radioValue == 'lane') {

		$("#sectorID").val("");

		$("#laneID").prop("placeholder", "Pocket");
		$("#sectorID").prop("placeholder", "");

		$("#laneID").prop("disabled", false);
		$("#sectorID").prop("disabled", true);

		$("#sectorID").prop("required", false);
		$("#laneID").prop("required", true);

	}

}

/*
 * function sectorPhaseSelection(){ var radioValue =
 * $("input[name='sectorPhaseRdoBtn']:checked").val(); if(radioValue
 * =='sector'){
 * 
 * $("#phaseID").val("");
 * 
 *  // alert("You select - "+radioValue); $("#sectorID").prop("placeholder",
 * "Sector"); $("#phaseID").prop("placeholder", "");
 * 
 * $("#sectorID").prop("disabled", false); $("#phaseID").prop("disabled", true);
 * 
 * $("#sectorID").prop("required", true); $("#phaseID").prop("required", false);
 * 
 * }else if(radioValue == 'phase'){ $("#sectorID").val("");
 * 
 * $("#sectorID").prop("placeholder", ""); $("#phaseID").prop("placeholder",
 * "Phase");
 * 
 * $("#sectorID").prop("disabled", true); $("#phaseID").prop("disabled", false);
 * 
 * $("#sectorID").prop("required", false); $("#phaseID").prop("required", true);
 *  }
 *  }
 */

function laneStreetSelection() {
	var radioValue = $("input[name='laneStreetRdoBtn']:checked").val();
	if (radioValue == 'lane') {
		$("#streetID").val("");

		// alert("You select - "+radioValue);
		$("#laneID").prop("placeholder", "Lane");
		$("#streetID").prop("placeholder", "");

		$("#laneID").prop("disabled", false);
		$("#streetID").prop("disabled", true);

		// $("#laneID").prop("required", true);
		// $("#streetID").prop("required", false);

	} else if (radioValue == 'street') {

		$("#laneID").val("");

		$("#laneID").prop("placeholder", "");
		$("#streetID").prop("placeholder", "Street");

		$("#laneID").prop("disabled", true);
		$("#streetID").prop("disabled", false);

		// $("#laneID").prop("required", false);
		// $("#streetID").prop("required", true);

	}

}

function checkPercentageOfCoveredArea() {
	var vacantLandArea = $("#vacantLandAreaId").val();
	var vacantCoverdArea = $("#vacantCoverdAreaId").val();
	if (vacantLandArea != 0 && vacantLandArea != '' && vacantCoverdArea != '') {
		validateTotalLandAreaWithCoveredArea(vacantLandArea, vacantCoverdArea);
	}

}

function validateTotalLandAreaWithCoveredArea(totalLandArea, coveredLandArea) {
	var perc = calculatePercentage(totalLandArea, coveredLandArea);
	var isVacantLandOnInUse = $('input[name="property.isVacantLandInUse"]:checked').val();
	
	if (perc > 25.00 && isVacantLandOnInUse == 'NO' && $("#"+$("#propertyCategoryIDSelect").val()).val() != PROP_VACANT_CATEGORY ) {
	
		disableField("vacantLandUseFactorIDSelect");
		disableField("vacantLandOccupancyFactorIDSelect");
		disableField("vacantLandExemptionIDSelect");
	} else if (perc == 0.00 && $("#"+$("#propertyCategoryIDSelect").val()).val() == PROP_VACANT_CATEGORY) {
		disableFloorEntry(true);
		//$("#noOfFloorDivID").hide();
		//document.getElementById("noOfFloorDivID").style.display = "none";
		$("#addFloorBlock").hide();
	}else if (perc > 0.00 && $("#"+$("#propertyCategoryIDSelect").val()).val() == PROP_VACANT_CATEGORY) {
		disableFloorEntry(true);
		//createAlert('cannot be more than 0');
		
		
		$("#addFloorBlock").hide();
		$("#vacantCoverdAreaId").val("0");
		$("#vacantLandId").val(""+totalLandArea);
		//$("#noOfFloorDivID").hide();
		//document.getElementById("noOfFloorDivID").style.display = "none";
		
	}else {
		enableField("vacantLandUseFactorIDSelect");
		enableField("vacantLandOccupancyFactorIDSelect");
		enableField("vacantLandExemptionIDSelect");
		disableFloorEntry(false);	
	}
}

function enableField(id) {
	var isDisabled = $("#" + id).prop('disabled');
	if (isDisabled) {
		$("#" + id).prop("disabled", false);
	}
}

function disableField(id) {
	var isDisabled = $("#" + id).prop('disabled');
	if (!isDisabled) {
		$("#" + id).prop("disabled", true);
	}
}

function calculatePercentage(totalNum, obtainedNum) {
	// Please validate the inputs before sending here
	var perc = "";
	if (isNaN(totalNum) || isNaN(obtainedNum)) {
		perc = " ";
	} else {
		perc = ((obtainedNum / totalNum) * 100).toFixed(2);
	}
	return perc;
}

function validateOwnerFormOnPageLoad() {
	/*
	 * var element = document.getElementById("ownerCategoryIDSelect"); if
	 * (element.options[element.selectedIndex].text == 'INDIVIDUAL') { // For
	 * DISABLING ADDING MULTIPLE OWNERS IN CASE OF SINGLE OWNER
	 * if($("#ownerTypeIDSelect option:selected").text().trim() == 'SINGLE
	 * OWNER') { $("#addOwnerDetailIndividualBtnID").prop('disabled', true); }
	 *  }
	 */
}

$('.btn-number').click(function(e) {
	e.preventDefault();

	fieldName = $(this).attr('data-field');
	type = $(this).attr('data-type');
	var input = $("input[name='" + fieldName + "']");
	var currentVal = parseInt(input.val());
	if (!isNaN(currentVal)) {
		if (type == 'minus') {

			if (currentVal > input.attr('min')) {
				input.val(currentVal - 1).change();
			}
			if (parseInt(input.val()) == input.attr('min')) {
				$(this).attr('disabled', true);
			}

		} else if (type == 'plus') {

			if (currentVal < input.attr('max')) {
				input.val(currentVal + 1).change();
			}
			if (parseInt(input.val()) == input.attr('max')) {
				$(this).attr('disabled', true);
			}

		}
	} else {
		input.val(0);
	}
});
$('.input-number').focusin(function() {
	$(this).data('oldValue', $(this).val());
});
$('.input-number').change(
		function() {

			minValue = parseInt($(this).attr('min'));
			maxValue = parseInt($(this).attr('max'));
			valueCurrent = parseInt($(this).val());

			name = $(this).attr('name');
			if (valueCurrent >= minValue) {
				$(".btn-number[data-type='minus'][data-field='" + name + "']")
						.removeAttr('disabled')
			} else {
				// alert('Sorry, the minimum value was reached');
				$(this).val($(this).data(''));
			}
			if (valueCurrent <= maxValue) {
				$(".btn-number[data-type='plus'][data-field='" + name + "']")
						.removeAttr('disabled')
			} else {
				// alert('Sorry, the maximum value was reached');
				$(this).val($(this).data(''));
			}

		});
$(".input-number").keydown(
		function(e) {
			// Allow: backspace, delete, tab, escape, enter and .
			if ($.inArray(e.keyCode, [ 46, 8, 9, 27, 13, 190 ]) !== -1 ||
			// Allow: Ctrl+A
			(e.keyCode == 65 && e.ctrlKey === true) ||
			// Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
				// let it happen, don't do anything
				return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))
					&& (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		});

function submitUpdatePassword() {
	// alert('submitUpdatePassword');
	// $('#loadingDivID').show();
	var divID = "taxPayable";
	// var empGUID = divID;

	var noticeNo = $('[name="property.noticeNumber"]').val();

	
	var formData = new FormData();
	var params = $("#frmID").serializeArray();
	$.each(params, function(i, val) {
		formData.append(val.name, val.value);
	});
	
	$.ajax({
		type : 'POST',
		url : "web/citizen/property/doGetTaxCalculation",
		data : formData,
		cache : false,
		async : true,
		contentType : false,
		processData : false,
		beforeSend : function() {
			$("#overlay").show();
		},
		success : function(data, status, xhr) {
			/*document.getElementById("accountNoId").value = tempACn;
			document.getElementById("bankNmId").value = tempBankName;
			document.getElementById("branchNmId").value = tempBranchName;*/
			$("#" + divID).html("");
			$("#" + divID).html(data);

			tempACn = "";
			tempBankName = "";
			tempBranchName = "";

			// var form = $("#employeeInfoFormID");
			$("#overlay").hide();
			$(".hideCalcuution").hide();
		},
		error : function(jqXHR, exception) {
			$("#overlay").hide();
			//alert('error ' + jqXHR.status + " exception " + exception);

		},
		complete : function() {
			// alert('complete');
			showTab('2');
			if ($("#calculateStatus").val() == 'true') {
				$('#newPayTaxBtnId').prop('disabled', false);
				$('#payTaxBtnId').prop('disabled', false);
			} else {
				$('#newPayTaxBtnId').prop('disabled', true);
				$('#payTaxBtnId').prop('disabled', true);
				$("#payTaxButtonsEditDetails").show();
			}
			// $('#loadingDivID').hide();
			/*
			 * $('#loadingDivID').hide();
			 * $('[id^="datetimepicker"]').datetimepicker();
			 */
			var usercharges_flag = $("#usercharge_ptr_flag").val();
			if (usercharges_flag != null && usercharges_flag == "true" &&(noticeNo==undefined || noticeNo=='')) {
				console.log("USER CHarge");
				getUserChargePayment($("#upic").val(), $("#assissYear").val());
				}
			$("#overlay").hide();
		}
	});
	return true;
}

function alphaWithNumeric(e) {

	var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k > 47 && k < 58));

}

function alphaNumericWithSlash(e) {
    var k;
    document.all ? k = e.keyCode : k = e.which;

    // Allow: A-Z (65–90), a-z (97–122), 0–9 (48–57), Slash (47), Backspace (8)
    return (
        (k >= 48 && k <= 57) ||     // 0–9
        (k >= 65 && k <= 90) ||     // A–Z
        (k >= 97 && k <= 122) ||    // a–z
        k === 47 ||                 // slash (/)
        k === 8                     // backspace
    );
}

function alphaWithNumericDash(e) {

	var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k > 46 && k < 58) || k == 45);

}

function alpha(e) {
	/*
	 * var k; document.all ? k = e.keyCode : k = e.which; return ((k > 64 && k <
	 * 91) || (k > 96 && k < 123) || k == 8 || k==46 || k==32);
	 */
	onlyABCD(e);
}

function alphaWithPlusMinus(e) {
	var k;
	document.all ? k = e.keyCode : k = e.which;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 46
			|| k == 32 || k == 241);
}

function validLoginId(e) {
	var k;
	document.all ? k = e.keyCode : k = e.which;

	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 64
			|| k == 46 || k == 95 || k == 45 || (k > 47 && k < 58));
}

function onlyNumbers(evt) {

	if (window.event) { // IE
		var charCode = event.keyCode;
	} else { // Safari 4, Firefox 3.0.4
		var charCode = evt.which;
	}

	if (charCode > 31
			&& (charCode < 46 || charCode > 57 || charCode == 47
					|| charCode == 32 || charCode == 46))
		return false;

	return true;
}

function onlyNumbersNoPeriod(evt) {

	// var e = event || evt; // for trans-browser compatibility
	if (window.event) { // IE
		var charCode = event.keyCode;
	} else { // Safari 4, Firefox 3.0.4
		var charCode = evt.which;
	}
	if (charCode > 31 && (charCode <= 46 || charCode > 57))
		return false;

	return true;
}

function DisableRightClick(event) {
	// For mouse right click
	/*
	 * if (event.button==2) { alert("Right Clicking not allowed!");
	 * event.preventDefault(); }
	 */
}
function DisableCtrlKey(event) {
	/*
	 * if (event.ctrlKey==true && (event.which == '118' || event.which == '86'
	 * ||event.which == '67')) { alert("Don't COPY PASTE!");
	 * event.preventDefault(); }
	 */
}

function onlyABCD(evt) {
	// var e = event || evt; // for trans-browser compatibility
	if (window.event) { // IE
		var charCode = event.keyCode;
	} else { // Safari 4, Firefox 3.0.4
		var charCode = evt.which;
	}

	if (charCode > 32 && (charCode < 65 || charCode > 90)
			&& (charCode < 97 || charCode > 122))
		return false;
	if (charCode == 32)
		return true;
	return true;
}

// sanjay
function num_mob() {

	key = event.keyCode;
	if (key >= 48 && key <= 57)
		return true;
	else
		return false;
}

function decimal() {
	key = event.keyCode;
	if (key >= 48 && key <= 57 || key === 46)
		return true;
	else
		return false;
}

function decOwnPer(ele) {

	var str = ele.value;
	// alert('str'+str);

	if (str.includes(".")) {
		var dotPosition = str.indexOf(".");
		var theBitBeforeTheDot = str.substring(0, dotPosition);

		var theBitAfterTheDot = str.substring(dotPosition + 1, str.length);

		if (theBitAfterTheDot.length > 2) {
			ele.value = theBitBeforeTheDot + "."
					+ str.substring(dotPosition + 1, str.length - 1);

		}
	}
//	} else if (Number(str) > 100) {
//		ele.value = str.substring(0, str.length - 1);
//	}

}

function app_name() {

	key = event.keyCode;
	if ((key == 8) || (key == 32) || (key >= 34 && key <= 35) || (key == 38)
			|| (key >= 40 && key <= 41) || (key >= 43 && key <= 59)
			|| (key >= 63 && key <= 90) || (key == 92) || (key == 95)
			|| (key >= 97 && key <= 122) || (key == 126))
		return true;
	else
		return false;
}

function alphaNumHypen() {

	// alert("KEY : "+event.keyCode);
	key = event.keyCode;

	if ((key >= 65 && key <= 90) || (key == 32) || (key == 8) || (key == 45)
			|| (key >= 48 && key <= 57) || (key >= 96 && key <= 122)
			|| (key == 47))
		return true;
	else
		return false;
}

function nameVal() {

	key = event.keyCode;

	if ((key >= 65 && key <= 90) || (key == 40) || (key == 32) || (key == 41)
			|| (key == 46) || (key >= 97 && key <= 122))
		return true;
	else
		return false;
}

function alphanum() {

	key = event.keyCode;
	if ((key == 8) || (key == 32) || (key >= 65 && key <= 90)
			|| (key >= 48 && key <= 57) || (key >= 97 && key <= 122))
		return true;
	else
		return false;
}

function isValidOwnerTable() {
	var table = $("#ownerTableGridID");
	var actionType = $("#actionTypeID").val();

	for (i = 0; i < table.length; i++) {

		var percentage = $("#ownerTableGridID #ownrPercntgTblId" + i).val();
		var rebate;
		if ($("#ownerTableGridID #rebatGuidTblID") != null) {
			rebate = $("#ownerTableGridID #rebatGuidTblID"+ i).val();
		}
		if (rebate == null || rebate == '') {
			rebate = $("#ownerTableGridID #addedOwnerRebateID" + i).val();
		}
		if ((percentage == null || percentage == '')
				&& (rebate == null || rebate == '')) {
			createSmallAlert("Please fill Property Share %  and Rebate Category for every owner.");

			return false;

		}
		if ((percentage == null || percentage == '')) {
			createSmallAlert("Please fill Property Share %  for every owner.");

			return false;

		}
		if ((rebate == null || rebate == '')) {
			createSmallAlert("Please fill Rebate Category for every owner.");

			return false;

		}
	}
	return true;
}

function editOwnerRowCount(element) {
	rowCountGlobal = element.closest('tr').rowIndex - 1;
	// copyOwnerForUpdate(index);

	// removeSelectedOwner(row);
}

function enableDisableVacantLand() {
	
	var checked = $("#flatOptionCheckBox").is(":checked");
	var proTypeArray = document.getElementById("propertyTypeID0Select");
	if (checked) {
		$('#vacantLandAreaId').val(0);
		$('#vacantCoverdAreaId').val(0);
		$('#vacantLandId').val(0.00);
		$("#propertyTypeIDSelect").val($("#propertyTypeID0Select").val());
		/*var input = document.createElement("input");
		input.type = "hidden";
		input.name = "property.propertyTypeGuid"
		input.id = "propertyTypeIDSelectVacant";
		input.value = proTypeArray.options[proTypeArray.length - 1].value;
		var parent = document.getElementById("flatDivCheckBox");
		parent.appendChild(input);*/
	} else {
//		proTypeArray.options[0].selected = true;
		$("#propertyTypeIDSelect").trigger('change');
		$("#propertyTypeIDSelectVacant").attr('name','');
	}

	document.getElementById("vacantLandAreaId").readOnly = checked;
	document.getElementById("vacantCoverdAreaId").readOnly = checked;
	document.getElementById("propertyTypeIDSelect").readOnly = checked;
	document.getElementById("vacantLandUseFactorIDSelect").disabled = checked;
	document.getElementById("vacantLandOccupancyFactorIDSelect").disabled = checked;
	document.getElementById("vacantLandExemptionIDSelect").disabled = checked;
	if (checked) {
		document.getElementById("vacantLandDiv").style.display = "none";

	} else {
		document.getElementById("vacantLandDiv").style.display = "block";
	}

}

function enableDisableCovidDeclaration() {
	
	
	var checked = $("#covidOptionCheckBox").is(":checked");	
	
	
	if (checked) {
		document.getElementById("covidAgreeBox").style.display = "block";
		 $("input[name="+$("#covidDoc").val()+"]").attr('required', false);
		//document.getElementById("covid_agree").checked = false;
	} else {
		document.getElementById("covidAgreeBox").style.display = "none";
		$("input[name="+$("#covidDoc").val()+"]").attr('required', false);
	}

}

function enableDisableExemptionDeclaration() {
	
	var checked = $("#exemptionOptionCheckBox").is(":checked")  ;	
	
	
	if (checked) {
		document.getElementById("exemptionAgreeBox").style.display = "block";
		 $("input[name="+$("#covidDoc").val()+"]").attr('required', false);
		//document.getElementById("covid_agree").checked = false;
	} else {
		document.getElementById("exemptionAgreeBox").style.display = "none";
		$("input[name="+$("#covidDoc").val()+"]").attr('required', false);
	}
	
	return true;

}

function disableVacantLandForFlats() {
	var categoryCode = document.getElementById($('#propertyCategoryIDSelect')
			.find('option:selected').val()).value;
	if (categoryCode == PROP_RESIDENTIAL_CATEGORY) {
		document.getElementById("flatDivCheckBox").style.display = "block";
		$("#addFloorBlock").show();
		disableFloorEntry(false);
	} else if (categoryCode == PROP_VACANT_CATEGORY) {
		document.getElementById("flatDivCheckBox").style.display = "none";
		$("#vacantCoverdAreaId").val("0");		
		$("#addFloorBlock").hide();
		$("#isVacantLandInUseCheckBox").hide();
		disableFloorEntry(true);
	}else{
		
		document.getElementById("flatDivCheckBox").style.display = "none";
		$("#isVacantLandInUseCheckBox").show();
	}

	var propertyTypeGuidOption = document
			.getElementById('propertyTypeID0Select');
			
	var propertyTypeGuid ="";
	if(propertyTypeGuidOption != null){
		propertyTypeGuid = propertyTypeGuidOption.options[propertyTypeGuidOption.selectedIndex].value;
	}
	
	if(propertyTypeGuid !=null && propertyTypeGuid != 0 ){
		var propertyCode = document.getElementById(propertyTypeGuid).value;
		var ddaFlats = $('#dddFlats').val();
		var jantaFlats = $('#jantaFlats').val();
		var cghsFlats = $('#cghsFlats').val();
		var builderFloor = $('#builderFloor').val();
		if ((propertyCode == ddaFlats || propertyCode == jantaFlats
				|| propertyCode == cghsFlats || propertyCode == builderFloor)&& categoryCode != PROP_VACANT_CATEGORY) {
			document.getElementById("flatDivCheckBox").style.display = "block";
			document.getElementById("flatOptionCheckBox").checked = true;
			enableDisableVacantLand();
		}
	}
	

}

function disableFloorEntry(flag) {
	var categoryCode = document.getElementById($('#propertyCategoryIDSelect')
			.find('option:selected').val()).value;
	
		if(document.getElementById("coveredAreaID0")){
			document.getElementById("coveredAreaID0").disabled = flag;
		}
		if (flag) {
			document.getElementById("floorEntryDiv").style.display = "none";

			if (document.getElementById("coveredAreaID0") != null) {
				document.getElementById("coveredAreaID0").value = 0;
			}
			if (document.getElementById("addRemoveButton") != null) {
				document.getElementById("addRemoveButton").style.display = "none";
			}

		} else {
			document.getElementById("floorEntryDiv").style.display = "block";
			if (document.getElementById("addRemoveButton") != null) {
				document.getElementById("addRemoveButton").style.display = "block";
			}

		}
	
}
function updateVacantLandPropertyTypFlats(propertyTypeGuid) {
	
	var propertyTypeGuidOption = document
			.getElementById('propertyTypeID0Select');
	var propertyTypeGuid ="";
	if(propertyTypeGuidOption != null){
		propertyTypeGuid = propertyTypeGuidOption.options[propertyTypeGuidOption.selectedIndex].value;
	}
	if (propertyTypeGuid != null && propertyTypeGuid != '0'
			&& $("#flatOptionCheckBox").is(":checked")) {
		var propertyCode = document.getElementById(propertyTypeGuid).value;
		var ddaFlats = $('#dddFlats').val();
		var jantaFlats = $('#jantaFlats').val();
		var cghsFlats = $('#cghsFlats').val();
		var builderFloor = $('#builderFloor').val();
		if (propertyCode == ddaFlats || propertyCode == jantaFlats
				|| propertyCode == cghsFlats || propertyCode == builderFloor) {
//			$("#propertyTypeIDSelect").prop('selectedIndex',$("#propertyTypeID0Select").prop('selectedIndex'))
			$("#propertyTypeIDSelect").val(propertyTypeGuid);
			/*document.getElementById("propertyTypeIDSelectVacant").value = propertyTypeGuid;*/
			return true;
		}
	}

}

function hideShowNextButton(flag) {
	var actionType = $('#actionTypeID').val();
	if (flag) {
	/*	document.getElementById("propertySubmitTabId").style.display = "none";
		document.getElementById("ownerSubmitTabId").style.display = "block";*/
	} else {
		if(actionType == "pay-tax"){
			
			/*document.getElementById("propertySubmitTabId").style.display = "none";
			document.getElementById("ownerSubmitTabId").style.display = "none";*/
		}else{
			showTab('1');
		}
		/*document.getElementById("propertySubmitTabId").style.display = "block";
		document.getElementById("ownerSubmitTabId").style.display = "none";*/
	}
}

function updateHiddenInputValues() {

	var propertyType = document.getElementById("hiddenInputPropertyType");

		$.getJSON(
				"web/citizen/property/option?optionType=MST_PROPERTY_TYPE&filterValue="
						+ "", function(data, status) {
					for (var i = 0; i < data.length; i++) {
						var node = document.createElement("INPUT");
						node.setAttribute("value", data[i].optionCode);
						node.setAttribute("id", data[i].optionGuid);
						node.setAttribute("type", "hidden");
						if(propertyType != null){
							propertyType.appendChild(node);
						}
						

					}

				});
	
}

function isFlatTypeProperty(propertyTypeGuid) {
	if(propertyTypeGuid  == null || propertyTypeGuid == 0){
		return false;
	}
	propertyTypeCode = document.getElementById(propertyTypeGuid);
	if(propertyTypeCode  == null || propertyTypeCode == 0){
		return false;
	}
	var propertyCode = document.getElementById(propertyTypeGuid).value;
	var ddaFlats = $('#dddFlats').val();
	var jantaFlats = $('#jantaFlats').val();
	var cghsFlats = $('#cghsFlats').val();
	var builderFloor = $('#builderFloor').val();
	if (propertyCode == ddaFlats || propertyCode == jantaFlats
			|| propertyCode == cghsFlats || propertyCode == builderFloor) {
		$("#propertyTypeIDSelect").val(propertyTypeGuid);
		return true;
	} else {
		return false;
	}
}

$('#dob1DatePicker').datetimepicker({
	"allowInputToggle" : true,
	"showClose" : true,
	"showClear" : true,
	"showTodayButton" : true,
	// "format": "MM/DD/YYYY hh:mm:ss A",
	"maxDate" : 'now',
	"format" : "DD/MM/YYYY",

});
$('#dob1DatePicker').on('dp.change', function(ev) {
	var dobObject = document.getElementById("dobID");
	calculateAgeOwner(dobObject, 'DD/MM/YYYY', '/', 'ageID');
});

/*
 * $('#dob1DatePicker').datetimepicker({ locale : "ru", collapse:true,
 * ignoreReadonly:true, keepOpen:true });
 * 
 * $("#dob1DatePicker").on("dp.show", function (e) {
	  $(".day").on('click', function(){
	    $("a[data-action='togglePicker']").trigger('click');
	  });
	});

$("#dob1DatePicker").on("dp.change", function (e) {
	  $(".day").on('click', function(){
	    $("a[data-action='togglePicker']").trigger('click');
	  });
	});
 */


function uppercase(obj){
    obj.value = obj.value.toUpperCase();
}

function encMutationHomeData() {

	var regNo = document.getElementById("regno").value;

	if ((regNo !== '')) {

		var encRegNo = Encrypt(regNo);

		document.getElementById("regnoHidden").value = encRegNo;

	}
	
}

function dorisMutationData() {

	var regNo = document.getElementById("regNo").value;
	

	if ((regNo !== '')) {

		var encRegNo = Encrypt(regNo.trim());

		document.getElementById("dorisRegnoHidden").value = encRegNo;

	}
	
}




// validation on owner tab click
 $( "#ownerDetail-tab" ).click(function() {
	 
	var flg = validateBlankfieldsForPropertyPage();
	if(flg == true){
		hideShowNextButton(false);
	}
	else{
		hideShowNextButton(true);

		return false;
	}
	
	});
var isNewProperty=false;
 //validation on next button click
 $( "#nextOwnerButtonId" ).click(function() {
	 
	 
		var flg = validateBlankfieldsForPropertyPage();
		if(flg == true){
				$("#Declaration_Modal").remove();
				$("#propertySubmitTabId #submitID").css('display', 'block');
				if (document.getElementById("ownerTableGridID").rows.length > 1
						&& isValidOwnerTable()) {
					showTab('1');
					//encData();
					//submitPropertyForm();
//					hideShowNextButton(false);
					return true;
				}else{
					isNewProperty=true;
					createSmallAlert("Please Add Owner(s)! \nProperty could not be without Ownership.");
					showTab('1');
					
					
				}
				
				}else{
			return false;
		}
		});

 function submitPropertyForm(){
	 var divID = "taxPayable";
		// var empGUID = divID;


	 var formData = new FormData();
		var params = $("#frmID").serializeArray();
		$.each(params, function(i, val) {
			console.log("NAME : "+val.name+", Value : "+val.value);
			formData.append(val.name, val.value);
		});
		 
		$.ajax({
			type : 'POST',
			
			url : "web/citizen/property/submit",
			data : formData,
			cache : false,
			async : true,
			contentType : false,
			processData : false,
			beforeSend : function() {
				formData.append("ignorePayTax","true");
				
				 var filesLength = $('input[type="file"]').length;
				 console.log("File Lenght : "+filesLength);
				 var i;
				for(i = 0; i < filesLength; i++ ){
				var file = $('#docUpload'+(i+1)).get(0).files[0];
				var fileName =  $("#docUpload"+(i+1)).attr("name");
				if(file!=undefined){
				formData.append(fileName,file);
				console.log("---->>FILE NM : "+fileName+", file : "+file);
				}else{
					console.log("FILE NM : "+fileName+", file : "+file);
				}
				
			}
				$("#overlay").show();
			},
			success : function(data, status, xhr) {
				/*document.getElementById("accountNoId").value = tempACn;
				document.getElementById("bankNmId").value = tempBankName;
				document.getElementById("branchNmId").value = tempBranchName;*/
				//$("#" + divID).html("");
				//$("#" + divID).html(data);
				

				tempACn = "";
				tempBankName = "";
				tempBranchName = "";

				// var form = $("#employeeInfoFormID");
				$("#overlay").hide();
			},
			error : function(jqXHR, exception) {
				$("#overlay").hide();
			//	alert('error ' + jqXHR.status + " exception " + exception);

			},
			complete : function() {
				// alert('complete');
				
				// $('#loadingDivID').hide();
				/*
				 * $('#loadingDivID').hide();
				 * $('[id^="datetimepicker"]').datetimepicker();
				 */
				$("#overlay").hide();
			}
		});
		return true;
	 
	 
 }
 
 
 
  
 function submitPropertyOwnerForm(formType){
	
	 return true;
	 
	 var divID = "taxPayable";
		// var empGUID = divID;
console.log("FORM TYPE : "+formType);

		var formData = new FormData();
		var params = $("#frmID").serializeArray();
		$.each(params, function(i, val) {
			console.log("NAME : "+val.name+", Value : "+val.value);
			formData.append(val.name, val.value);
		});

		$.ajax({
			type : 'POST',
			url : "web/citizen/property/updatePartialForm",
			data : formData,
			cache : false,
			async : true,
			contentType : false,
			processData : false,
			beforeSend : function() {
				formData.append("formType",formType);
				$("#overlay").show();
			},
			success : function(data, status, xhr) {
				/*document.getElementById("accountNoId").value = tempACn;
				document.getElementById("bankNmId").value = tempBankName;
				document.getElementById("branchNmId").value = tempBranchName;*/
				//$("#" + divID).html("");
				//$("#" + divID).html(data);
                
				
				tempACn = "";
				tempBankName = "";
				tempBranchName = "";


				document.getElementById('coresRadioYes').checked = false;
				document.getElementById('coresRadioNo').checked = true;
				// var form = $("#employeeInfoFormID");
				$("#overlay").hide();
				//alert("success"+data);
			},
			error : function(jqXHR, exception) {
				$("#overlay").hide();
				//alert('error ' + jqXHR.status + " exception " + exception);
				//alert("success"+data);
			},
			complete : function() {
				// alert('complete');
				
				// $('#loadingDivID').hide();
				/*
				 * $('#loadingDivID').hide();
				 * $('[id^="datetimepicker"]').datetimepicker();
				 */
				document.getElementById('coresRadioYes').checked = false;
				document.getElementById('coresRadioNo').checked = true;
			
				$("#overlay").hide();
			}
		});
		return true;
	 
	 
 }


function editPropertyOnCalc(){
	disableEditForCalcucation(false);
}

function disableEditForCalcucation(flag){
	if(flag){
		$('#frmID input').attr('readonly', 'readonly');
		$('option:not(:selected)').attr('disabled', true);
		$("#propertySubmitTabId").hide();
		$("#ownerSubmitTabId").hide();
		$(".showHideClass").hide();

		showTab('2');
	}else{
		$("#propertySubmitTabId").show();
		$("#ownerSubmitTabId").show();
		$("#payTaxButtons").hide();
		$('#frmID input').attr('readonly', false);
		$('option:not(:selected)').attr('disabled', false);
		$(".showHideClass").show();

		showTab('0');
	}
	$("#zoneNameID,#wardNameID,#vacantLandId").attr('readonly', true);
}



function hideOwnerDetail(flag){
	
	if(flag){
		$("#submitID").show();
		$("#ownerEntryDivId").hide();
	}else{
		$("#submitID").hide();
		$("#ownerEntryDivId").show();
	}
}


/*function remapFactorOnForm(){
	var floor=$("#taxDetailsLengthID").val();
	for(i=0;i<=floor;i++){
		var categoryCode = $("#"+$("#sectionPropertyCategoryID"+i+"Select").val()).val();
		if(categoryCode != PROP_RESIDENTIAL_CATEGORY  && $('#actionTypeID').val() == 'createlegacy'){
			$("#sectionPropertyCategoryID"+i+"Select").val('');
		}
		$("#propertyTypeID"+i+"Select").trigger('change');
	}
	
}*/


function validateOwnerFinalTable() {
	
	if($("#ownerCatID").val() == 'INDIVIDUAL'){
	var rowCount = $("#ownerTableGridID").length();
		for (var i = 0; i < rowCount; i++) {
			if ($("#firstNmTblId" + i).val() == null
					|| $("#firstNmTblId" + i).val() == '')
				createSmallAlert("Please Edit " + (i + 1)
						+ " Owner and Fill Name For Owner");
			return false;

			if ($("#genderTblId" + i).val() == null
					|| $("#genderTblId" + i).val() == '')
				createSmallAlert("Please Edit " + (i + 1)
						+ " Owner and Select Gender For Owner");
			return false;

			if ($("#dobTblId" + i).val() == null
					|| $("#dobTblId" + i).val() == '')
				createSmallAlert("Please Edit " + (i + 1)
						+ " Owner and Fill D.O.B For Owner");
			return false;

			if ($("#countryCodeTblId" + i).val() == null
					|| $("#countryCodeTblId" + i).val() == '')
				createSmallAlert("Please Edit " + (i + 1)
						+ " Owner and Select Country Code For Owner");
			return false;

			if ($("#mobileNoTblId" + i).val() == null
					|| $("#mobileNoTblId" + i).val() == '')
				createSmallAlert("Please Edit " + (i + 1)
						+ " Owner and Fill Mobile Number For Owner");
			return false;

			if ($("#ownrPercntgTblId" + i).val() == null
					|| $("#ownrPercntgTblId" + i).val() == '')
				createSmallAlert("Please Edit " + (i + 1)
						+ " Owner and Fill Share For Owner");
			return false;

			if ($("#rebatGuidTblID" + i).val() == null
					|| $("#rebatGuidTblID" + i).val() == '')
				createSmallAlert("Please Edit " + (i + 1)
						+ " Owner and Select Reabate For Owner");
			return false;

			if ($("#adrs1TblId" + i).val() == null
					|| $("#adrs1TblId" + i).val() == '')
				createSmallAlert("Please Edit " + (i + 1)
						+ " Owner and Fill Address Of Owner");
			return false;

		}
	
	}
	return true;
}


function showMessage(ele) {
	 if( showMessage.done == true ) return;
	if ($('#actionTypeID').val() == 'createupic') {
		if (ele.value == null || ele.value == '') {
			createSmallAlert("Please Enter Valid Number , Otherwise Your Application will be rejected.");
		}
	}
	showMessage.done = true;
	return true;
}


/*---------------For  image------------------ */
function uploadFilePropertiesFtlimages(element) {
	
	
	if (window.FileReader && window.Blob) {

		var file = element.files[0];
		if(file!=undefined){
		var fileType=file.type;
			if (fileType.includes("pdf")) {
			fileType='application/pdf';
			}else if(file.name.split(".").length>2){
				element.value='';
				createSmallAlert("INVALID FILE FORMAT");
				return false;
			}
		
		if (file.size > 0) {
			var tradeSelect  = $('option:selected',$("#tradeTypeSelect")).attr('data-code'); 
			if(tradeSelect.toUpperCase().trim()==$("#tradeTypeHBCode").val().toUpperCase().trim()){
				$("#hbPhotographHiddenField").val("Photo Exists");
			}
			$("#photographHiddenField").val("Photo Exists");
			
			if (file.size > 20000) {
				createSmallAlert('FILE SIZE SHOULD BE LESS THAN 20KB');

				var docUpload = $("#" + element.id);

				docUpload.replaceWith(docUpload.val('').clone(true));

				return false;
			}
				if (!fileType.includes("image")) {
			
				createSmallAlert("NOT A JPEG/JPG/PNG FILE UPLOAD CORRECT FILE");
			element.value='';
			if($('#appImage').length>0 && $("#appPhotoPath").length>0) if($("#appPhotoPath").val()!='') $('#appImage').show();
	    	$('#appImage1').hide();

			return false;
			}
			
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            $('#appImage1').attr('src', e.target.result);
	        };
	        reader.readAsDataURL(file);
	        $('#appImage1').show();
			if($('#appImage').length>0 && $("#appPhotoPath").length>0) if($("#appPhotoPath").val()!='') $('#appImage').hide(); else $(".uploadStatus").hide();
		}
		}else{
			if($('#appImage').length>0 && $("#appPhotoPath").length>0) if($("#appPhotoPath").val()!='') $('#appImage').show(); else $(".uploadStatus").show();
	    	$('#appImage1').hide();
	    	return false;
		}	
	} else {
		console.error('FileReader or Blob is not supported by browser.');
	}

	
}

function vacantLandBlockValidation() {
	
	
	/*
	var element = document.getElementById("propertyTypeIDSelect");
	var paintNode = document
			.getElementById("select2-propertyTypeIDSelect-container");
	if (element.selectedIndex == 0 || element.value == 'CHOOSE' || element.value == '') {
		blankfieldsPro = 1;

		setErrorColor(paintNode.parentNode);
		errorMsg = errorMsg + "\n * Vacant Land Property Type";
		if (setFocus == 0) {
			setFocus = 1;
			element.focus();
		}

	} else {
		setSuccessColor(paintNode.parentNode);
	}
	
*/


var element = document.getElementById("vacantLandUseFactorIDSelect");		


//alert('pro_cat_vacant '+pro_cat_vacant);

//if( pro_cat_selected == pro_cat_vacant ){



var paintNode = document.getElementById("select2-vacantLandUseFactorIDSelect-container");

if (element.selectedIndex == 0 || element.value == 0 ||element.value == 'CHOOSE'|| element.value == '') {
	
	
	blankfieldsPro = 1;

	setErrorColor(paintNode.parentNode);
	errorMsg = errorMsg + "\n * Vacant Land Use Factor";
	if (setFocus == 0) {
		setFocus = 1;
		element.focus();
	}

} else {
	setSuccessColor(paintNode.parentNode);
}


var element = document.getElementById("vacantLandOccupancyFactorIDSelect");

//alert("KKKK "+element.value);


var paintNode = document
		.getElementById("select2-vacantLandOccupancyFactorIDSelect-container");
if (element.selectedIndex == 0 || element.value == 'CHOOSE' || element.value == '') {
	blankfieldsPro = 1;

	setErrorColor(paintNode.parentNode);
	errorMsg = errorMsg + "\n * Vacant Land Occupancy Factor";
	if (setFocus == 0) {
		setFocus = 1;
		element.focus();
	}

} else {
	setSuccessColor(paintNode.parentNode);
}


/*var element = document.getElementById("vacantLandExemptionIDSelect");
var paintNode = document
		.getElementById("select2-vacantLandExemptionIDSelect-container");
if (element.selectedIndex == 0 || element.value == 'CHOOSE' || element.value == '') {
	blankfieldsPro = 1;

	setErrorColor(paintNode.parentNode);
	errorMsg = errorMsg + "\n * Vacant Land Exemption";
	if (setFocus == 0) {
		setFocus = 1;
		element.focus();
	}

} else {
	setSuccessColor(paintNode.parentNode);
}*/

}
function disableAllInView(){
	$('input[type="text"], input[type="radio"] ,input[type="checkbox"], select').prop("disabled", true);
}

$("#nextButton").on('click',function(){
	showTab('1');
});



function isOtpValidatedOrNot(){
	
	
		
		$("#isOtpValidatedMobile").val(
			$(
					"input[name="
							+ $.escapeSelector('property.owners[' + "0"
									+ '].isOtpValidatedMobile') + "]").val());	
									
									
	$("#isOtpValidatedEmail").val(
			 $(
					"input[name="
							+ $.escapeSelector('property.owners[' + "0"
									+ '].isOtpValidatedEmail') + "]").val());
	
	
	    var ownerOtpValidation = $("#ownerOtpValidation").val();
	 	var otpval = $('#isOtpValidatedMobile').val();
	    var otpvalEmail = $('#isOtpValidatedEmail').val();
		 
	 if(ownerOtpValidation != null && ownerOtpValidation.toUpperCase() === 'FALSE'){
				return true;
	 
	 }
	 
	if('${#OWNER_OTP_VALIDATION}' != null && '${#OWNER_OTP_VALIDATION}'.toUpperCase() === 'FALSE'){
				return true;
			} 
	    
	
	/*if(otpvalEmail.toUpperCase() === 'TRUE' && otpval.toUpperCase() === 'FALSE'){
		createSmallAlert("Pls Edit and Validate Owner's Mobile Number");
		return false;
	}
	
	if(otpvalEmail.toUpperCase() === 'TRUE' && otpval.toUpperCase() === 'FALSE'){
		createSmallAlert("Pls Edit and Validate Owner's Mobile Number");
		return false;
	}
	
	
//	if(otpval.toUpperCase() === 'TRUE'  &&otpvalEmail.toUpperCase() === ''){
//		createSmallAlert("Pls Edit and Validate Owner's Email ID");
//		return false;
//	}
	
	
	if(otpvalEmail.toUpperCase() === 'TRUE'  &&otpval.toUpperCase() === ''){
		createSmallAlert("Pls Edit and Validate Owner's Mobile Number");
		return false;
	}
	
	
	
	if(otpval.toUpperCase() === 'TRUE' && otpvalEmail.toUpperCase() === 'TRUE'){
	
		return true;
	}
	
	if((otpval.toUpperCase() === ''  && otpvalEmail.toUpperCase() === '') ){
		createSmallAlert("Pls Edit and Validate Owner's Email ID And Mobile Number");
		return false;
		}
	else{
		return true;
	}*/
	if(otpval.toUpperCase() === 'TRUE' ){
		return true;
	}
	
	if(otpval.toUpperCase() === 'FALSE' ){
		createSmallAlert("Pls Edit and Validate Owner's Mobile Number");
		return false;
	}
		
	
	
	
}


function openVillageDiv(e) {
	
	//alert(e);
	var colonyName=$("#unauthorizedColonySelect").val();
	if(document.getElementById("villageDiv") != null){
	if (colonyName == 'LAL DORA' || colonyName == 'EXTENDED LAL DORA' || colonyName == 'EXTENDED ABADI OF RURAL VILLAGE.') {
		document.getElementById("villageDiv").style.display = "block";
		$("#villageName").prop('required',false);
		
		}
	else {
		document.getElementById("villageDiv").style.display = "none";
		$("#villageName").prop('required',false);
		}
	}	
}


var countFor5MB = 0;
function uploadFilePropertiesFor5MB(element) {
	// console.log("File Length : " + element.files.length);
	// var count = 0;
	//var Contnr = document.getElementById("fileUploadContnrID");

	// alert("Contnr is "+Contnr);

	// for (count; count < element.files.length; count++) {

	var fileNameHidden = document.createElement("input");
	fileNameHidden.setAttribute("type", "text");
	// fileNameHidden.setAttribute("name", "property.propertyDoc[" + count
	// + "].docName");

	fileNameHidden.setAttribute("name", "property.propertyDoc[" + count
			+ "].docName");
	// fileNameHidden.setAttribute("value", element.files[0].name);

	// var firstNameTxt = document.createTextNode(firstName);
	// firstNameCell.appendChild(firstNameTxt);

	// document.getElementById(element) = ""

	// file content checking

	// alert('sssssss') ;
	// var result = $('div#result');

	if (window.FileReader && window.Blob) {

		var file = element.files[0];
		if (file.size > 0) {

			if (file.size > 5242880) {
				alert('file size should be less than 5 MB');

				var docUpload = $("#" + element.id);

				docUpload.replaceWith(docUpload.val('').clone(true));

				return false;
			}

			var fileReader = new FileReader();
			fileReader.onloadend = function(e) {

				var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
				var header = '';

				for (var i = 0; i < arr.length; i++) {
					header += arr[i].toString(16);
				}

				// Check the file signature against known types
				var type = 'unknown';
				switch (header) {

				case '89504e47':
					type = 'unknown';
					break;
				case '47494638':
					type = 'unknown';
					break;
				case 'ffd8ffe0':
				case 'ffd8ffe1':
				case 'ffd8ffe2':
					type = 'unknown';
					break;
				case '25504446':
					type = 'application/pdf';
					break;
				}

				if (file.type !== type) {
					// result.html('<span style="color: red; ">Mime type
					// detected: ' + type + '. Does not match file
					// extension.</span>');

					alert('Not a pdf file upload correct file');

					var docUploadpdf = $("#" + element.id);

					docUploadpdf.replaceWith(docUploadpdf.val('').clone(true));

					return false;

				} else {
					fileNameHidden.setAttribute("value", element.files[0].name);
					return true;
				}
			};
			fileReader.readAsArrayBuffer(file);
		}

	} else {
		console.error('FileReader or Blob is not supported by browser.');
	}

	// }

	//Contnr.appendChild(fileNameHidden);
	countFor5MB++;

}

function checkManualCalculation() {
	if ($("#manualCalculationCheckBox").prop("checked") == true) {
		$("#manulaCalculationBlockId").show();
	}
	else {
		$("#manulaCalculationBlockId").hide();
	}
}


function checkReasonForDifferenceAm(element) {
	$("#otherReasonInputId").val('');
	if (element.value == "0") {
		$("#otherReasonId").show();
	} else {
		$("#otherReasonId").hide();
	}
}

function showhideForVacantLandAddSection(e,id,sectionIndex, showHide){
	
	
	if (e != 0 && e != '') {
		$.getJSON("web/citizen/property/option?optionType="+e+"&filterValue=",function(data, status) {
							
						var  propertyId = id + sectionIndex+ 'Select';
					   
					
							
							console.log("data length : " + data.length);
							$('#' + propertyId).empty();
								$('#' + propertyId).append(
									$("<option></option>").attr({
										value : 0,
									}).text("Select "));
							
						if(showHide){
							$('#' + propertyId).append(
											$("<option></option>").attr({
													value:data[0].optionGuid
													}).text(
													data[0].optionValue).attr("selected", "selected"));
						}else{
							for (var i = 0; i < data.length; i++) {
								$('#' + propertyId).append(
											$("<option></option>").attr({
													value:data[i].optionGuid
													}).text(
													data[i].optionValue));
								
							}
							
						}
							
							
							
						}
						);
	}
	
	if(showHide){
		var divId=id + sectionIndex+ 'SelectHideShow';
	 $('#'+divId).css('display', 'none');		
		divId='';
	}else{
		var divId=id + sectionIndex+ 'SelectHideShow';
	 $('#'+divId).css('display', 'block');		
		divId='';
	}
	
	
	
	
}
function checkVacantLandDetails(){
     $('*[id^=sectionPropertyCategoryID]').each(function() {
    			if($("#"+$(this).val()).val() == $("#vacantLandWithSectionPropertyCode").val()){
					var num =  $(this).attr('id').match(/\d+/)[0]; 
					for (let [key, value] of propertyVacantMasterMap) {
							showhideForVacantLandAddSection(key,value,num,true);
					}
		}
	});
	
}





          
function editCalculateOwnerAge() {
	//
	var format = 'DD/MM/YYYY';
	var delimiter = '/';
	var currentDate = new Date();
	var ownerRowcount = 0;
	var today = new Date(currentDate.getFullYear(), 05, 30);
     $('*[id^=dobTblId]').each(function() {
		var birthDate = stringToDate($("#dobTblId" + ownerRowcount)[0].value, format, delimiter);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = currentDate.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		if (age < 0) {
			createSmallAlert("DOB Can Not be Greater Then Today.");
			$('#ageID').val("");
			$('#dobID').val("");

		} else {
			document.getElementById('ageTblId' + ownerRowcount).value = age;
            console.log("7745"+ownerRowcount);
			if (age >= 60) {
				$.ajax({
					type: "GET",
					url: "web/citizen/property/rebateData",
					cache: false,
					async: false,
					beforeSend: function() {
					//	$("#overlay").show();

					},
					success: function(data) { 
						
						if (data != null) {
							$('#rebatGuidTblID' + ownerRowcount).attr("value", data.optionGuid);
							$('#rebatTblId' + ownerRowcount).attr("value", data.optionValue);
							$('#ownerTableGridID tr:eq('+(ownerRowcount+1)+') .rebateText').text(data.optionValue);
						}
					}
					,
					complete: {
					}
				});

			}
			

	}
	 ownerRowcount++;
	});
}

function handleFinalSubmit() {
    // Call the functions you want to execute
  //  var otpValidated = isOtpValidatedOrNot();
  if(newActonType != null && newActonType != 'demand_generate'){
	   var otpValidated = validateOwnerEmail(); 
  }

     
  
     var blankFieldsValidated = validateBlankfieldsForPropertyPage();
     var propertyFormValidated = validatePropertyForm();

    // Returning false to prevent the default form submission
    return otpValidated && blankFieldsValidated && propertyFormValidated;
}


function proprtyTypePreviousValue(e,id){
var idd=$("#"+$("#"+id).val()).val();
$("#previousValueForChangeOption").val(idd);
}

function getCAData(discomID,caNumberID,ownerNameID,ownerHideDiv,fetchDataDiv,caNameFound,cASupplyAddressDiv,supplyAddress) {
	
	if($("#"+caNumberID).val() != '100005710') {
		createSmallAlert("No data found in this CA Number");
		return;	
	}
    $.ajax({
			type : "GET",
			url : "web/citizen/property/getCaDetails?caNumber="+$("#"+caNumberID).val()+"&discomCode="+$("#"+discomID).val(),
			cache : false,
			async: true,
			//header:headers,
			beforeSend : function(xhr) {
				$("#overlay").show();
				var ca= $("#"+caNumberID).val();
	            var regex = /^[a-zA-Z0-9]{8,11}$/;
                var flag =regex.test(ca);
                if(!flag)
                {
                   createSmallAlert("CA Number should be alphanumeric and size between 8 to 11 digit.");
                }
			},
			success : function(data, status, xhr) {
				
				//alert(data);
				$("#"+fetchDataDiv).hide();
				let text1 = "";
				let address = "";
				let ownername = "";
				let connectionDate = "";
				let meterType = "";
				let load = "";
				let loadUnit = "";
                if(data != null ){
					
					var json  = JSON.parse(data);
					address  = 	 json.SUPPLY_ADDRESS.ADDRESS_FLOOR +" "
								+json.SUPPLY_ADDRESS.ADDRESS_HOUSENO+" "
								+json.SUPPLY_ADDRESS.ADDRESS_COLONY+" "
								+json.SUPPLY_ADDRESS.ADDRESS_LANDMARK+" "
								+json.SUPPLY_ADDRESS.DISCOM_DIV_NAME+" "
								+json.SUPPLY_ADDRESS.ADDRESS_PINCODE;
					 ownername = json['OWNER DETAILS'].Authorised_Person_Name;
					 connectionDate =  json.CONNECTION_DATE;	
					 meterType= json.CONNECTION_TYPE;
					 load =  json.LOAD_VALUE;
					 loadUnit = json.LOAD_UOM;		
				   //$("#"+caDetailDiv).show();
				  var encrypData = Encrypt(data)
				   var categoryDiv = "<div><h4>Data Found For CA:"+json.CA_NUMBER+"</h4> ";
				    categoryDiv = categoryDiv+"<table class='display table table-bordered table-hover text-center dataTable no-footer' ><thead><tr> <th>Owner Name</th><th>Supply Address</th><th>Meter Installation Date</th><th>Meter Type</th><th>Load</th></tr></thead><tbody>";
				    categoryDiv=categoryDiv+("<tr><td>"+ownername+"</td><td>"+ address+"</td>"+"<td>"+ connectionDate+"</td>"+"<td>"+ meterType+"</td><td>"+parseFloat(load).toFixed(2)+" "+loadUnit+"</td></tr>");
				    categoryDiv= categoryDiv+"</tbody></table>";
//				   /* categoryDiv= categoryDiv+"<a href='web/citizen/property/registerForUPIC?encryptedCaDetail="+encrypData+"'  class='btn  btn-primary actionservicesbtn' >"+
//							"Yes, This Belongs to me</a>";*/
					createAlert(categoryDiv);		
				    $("#"+ownerHideDiv).show();
				   $("#"+caNameFound).show();				
				   $("#"+ownerNameID).val(ownername);
				    $("#"+supplyAddress).val(address);
				   $("#"+cASupplyAddressDiv).show();	
				   
				}else{
					$("#"+ownerHideDiv).hide();
				   $("#"+caNameFound).hide();
				   createSmallAlert("No data found in this CA Number");		
				   
			   }
			   
			   /*
                jQuery.each(data, function(index, item) {
                 //now you can access properties using dot notation
                 if(index == 0)
                   text1 = item;
                 else
                   text1 = text1.concat(","+item);
               })
               //alert("concat string is :"+text1);
               if(text1 == "")
               {
				   $("#"+ownerHideDiv).hide();
				   $("#"+caNameFound).hide();
				   createSmallAlert("No data found in this CA Number");
			   }
               else
               {
				   $("#"+ownerHideDiv).show();
				   $("#"+caNameFound).show();				
				   $("#"+ownerNameID).val(text1);
			   }*/
			},
			error : function(e) {
				$("#overlay").hide();
			},
			complete : function() {
				//select2Refresh();
				$("#overlay").hide();
			}
		});
}



function getCADataUpdated(caNumberID) {
    debugger
    var colony = document.getElementById("colonyIDSelect").value;
    alert(colony)
    alert(caNumberID)

    $.ajax({
        type: "GET",
        url: "web/citizen/property/getCaDetailsUpdated?caNumber=" + $("#" + caNumberID).val() + "&colonyGuid=4783e7e5-c0ba-4051-9d68-3bd7001e5a66" ,
        cache: false,
        async: true,
        beforeSend: function (xhr) {
            $("#overlay").show();
        },
        success: function (data, status, xhr) {

           console.log(data);
            //$("#" + fetchDataDiv).hide();

            if (data != null && data.length > 0) {

                // CLEAR OLD ROWS
                $("#caDataTable tbody").empty();

                // POPULATE POPUP TABLE
            data.forEach(function(item) {
    let row = 
        "<tr>" +
            "<td>" + (item.ownerName ? item.ownerName : "--") + "</td>" +
            "<td>" + (item.address ? item.address : "--") + "</td>" +
            "<td>" + (item.caNumber ? item.caNumber : "--") + "</td>" +
        "</tr>";

    $("#caTable tbody").append(row);
});



                // SHOW POPUP
                $("#caDataModal").modal("show");
                 $("#overlay").hide();

            } else {

                $("#" + ownerHideDiv).hide();
                $("#" + caNameFound).hide();
                createSmallAlert("No data found in this CA Number");

            }

        },
        error: function (e) {
            $("#overlay").hide();
        },
        complete: function () {
            $("#overlay").hide();
        }
    });
}





function showCAData(caNumberID,discomID,fetchDataDiv,ownerNameDiv,ownerNameID,caNumFound){
	
	$("#"+ownerNameDiv).hide();
	$("#"+caNumFound).hide();
	$("#"+ownerNameID).val("");
	var caNumberID= $("#"+caNumberID).val();
	var regex = /^[a-zA-Z0-9]{8,11}$/;
    var flag =regex.test(caNumberID);
    if(!flag)
    {
        createSmallAlert("CA Number should be alphanumeric and size between 9 to 11 digit.");
    }
    var Discom= $("#"+discomID).val();
	if (caNumberID !== '' && Discom != 0 && flag) {
		$("#"+fetchDataDiv).show();
	}
	else
	 {
		$("#"+fetchDataDiv).hide();
	}
}
	
	
	
function checkValidCANumber(caNumberID) {

alert(caNumberID)

    var caValue = $("#" + caNumberID).val();
    var regex = /^[a-zA-Z0-9]{9,11}$/;   // corrected: 9 to 11 characters
    var isValid = regex.test(caValue);

    if (!isValid) {
        createSmallAlert("CA Number should be alphanumeric and size between 9 to 11 digits.");

        // Clear invalid input
        $("#" + caNumberID).val("");

        // Optional: focus back for easy re-entry
        $("#" + caNumberID).focus();
    }
}
	
function getUserChargePayment(upic, assYear){
	/*if(assYear == "2024-2025")
	{ */
	$.ajax({
			type : "GET",
			url : "web/citizen/property/ucharges/webapp/getTotalUserCharge?upic=" + upic + "&assYear=" + assYear,
			cache : false,
			async : true,
			beforeSend : function() {
				$("#overlay").show();
			},
			success : function(data, status, xhr) {
			//	console.log("data: "+data);
				//$("#userChargePaymentModelId").append(data);
				//var tempDiv = $('<div>').html(data);
				//var userChargeAmount = parseInt(tempDiv.find("#userChargeAmount").val());
			//	alert("userChargeAmount = "+userChargeAmount);
				$("#userChargeAmountId").val(data);
				$("#userChargesCheckboxId").on("change", function() {
				    getFinalDueAmount(this, data, 'isOnlyUCPaymentId');
				});
				
			   //	alert("userChargeAmountId = "+$("#userChargeAmountId").val(userChargeAmount))
				
				var finalTax = parseInt($("#finalTaxID").val());
				//var sumOfFinalTaxAndUsercharge = userChargeAmount + finalTaxID;

				//alert(sumOfFinalTaxAndUsercharge);
				/*var alreadyMnlTaxPaid = $("#alreadyMnlTaxPaid").val();
				if(alreadyMnlTaxPaid)
				{
					sumOfFinalTaxAndUsercharge = sumOfFinalTaxAndUsercharge-alreadyMnlTaxPaid;
				}*/
				//alert("test = "+finalTax);
				//$("#netTaxID").val(finalTax);
				//$("#finalTaxID").val(sumOfFinalTaxAndUsercharge);
				$("#userChargeCheckSection").show();
				$("#userChargeLoadingSection").hide();
			},
			error : function(e) {

			},
			complete : function() {
				$("#overlay").hide();
				select2Refresh();
			}
		});
/*}*/
}



function propertyDetailG8() {
    
    var upicId = $("#upicID1").val();
	if(upicId == null || upicId == "" || upicId.length <15) {
		alert("ENTER A VALID UPIC "+upicId);
		$("#upicID").addClass("is-invalid");
		$("#upicID").focus();
		return ;
	}else{
		$("#upicID").removeClass("is-invalid");
	}
    var reqURL = "web/citizen/property/getUpicDetails?Upic=" + upicId;
    
    $.ajax({
        type: "GET",
        url: reqURL,
        cache: false,
        async: true,
        beforeSend: function() {
          
        },
        success: function(data) {
                 if (data != null) {
                $("#fullNameID").val(data.ownerName);
                $("#mobileNumberID").val(data.mobileNumber);
                $("#emailID").val(data.emailId);
              //  $("#colonye1").val(data.colonyName);
				
				$("#colonye1").val(data.colonyGuid).trigger("change");

                $("#colonyGuid").val(data.colonyGuid);
				$("#addressID").val(data.address);
				

				 if (data.address == null) {
					 alert("UPIC "+upicId+" NOT FOUND");
				 }
				 
            } else {
                alert("No data returned from the server.");
            }
        },
        error: function(e) {
            alert("Error occurred while fetching data: " + e.responseText);
        },
        complete: function() {
            // Optional: Hide loader or re-enable button
        }
    });
}


/*function validateInput(input) {
	//
	// Ensure the input is a number and not empty
    if (input.trim() === "" || isNaN(input)) {
    createSmallAlert("Invalid input! Please enter number only.");	
    document.getElementById('floorNumberID').value="";
        return false;
    }
    // Convert the input to a number
    const number = parseInt(input, 10);
	document.getElementById('floorNumberID').value =00;

    // Check if the input is a number, has two digits, and is not greater than 20
    if (number >= 0 && number < 40 && Number.isInteger(number)) {
     document.getElementById('plotHouseID').value = document.getElementById('plotHouseID').value+","+number;
	document.getElementById('floorNumberID').value =number;
        return true;
    } else {
     createSmallAlert("Invalid input! Please enter floor number less than 40.");	
        return false;
    }
}*/

function validateFloorInput(input) {
	var flr = parseInt(input.selectedOptions[0].text.slice(0,2).replace(/^\D+/g, ''));
	if(isNaN(flr)){
		$("#floorNumberID").val("00");
	}else if(flr < 10){
		$("#floorNumberID").val("0"+flr);
	}else{
		$("#floorNumberID").val(flr);
	}
}

function validateOwnerEmail(){
	
	if ($("#emailOtpGenPtrFlag").val() != null && $("#emailOtpGenPtrFlag").val() == 'true') {
		
		var table = document.getElementById("ownerTableGridID");
		var tbody = table.tBodies[0];
		if($("#loginType").val() == 'U'){
			return true;
		}
		for (var rowCount = 0; rowCount < tbody.rows.length; rowCount++) {
			if ($("#emailtblValidateId" + rowCount).val() != null && $("#emailtblValidateId" + rowCount).val() == 'true') {
					return true;
			}
		}
		createMediumAlert("<span style='margin-left:30px'>Please verify Owner's e-mail address.</span>")
		return false;
	}
	return true;
}




function updateSections(amount) {
	
	
    const propertyTaxCheckbox = document.getElementById("propertyTaxCheckBoxId");
    const userChargesCheckbox = document.getElementById("userChargesCheckboxId");
	const isRevisedId = document.getElementById("isRevisedId").value === 'true';

    const propertyTaxSection = document.getElementById("propertyTaxSection");
    const userChargesSection = document.getElementById("userChargesSection");
    const totalAmountBox = document.getElementById("totalAmountBox");
    
     const isAmnesty = document.getElementById("isAmnesty").value === 'true';

    const isOnlyPTPaymentFromDb = document.getElementById("isOnlyPTPaymentId").value === "true";
    const isOnlyUCPaymentFromDb = document.getElementById("isOnlyUCPaymentId").value === "true";

    // Property Tax Section
    if (isOnlyPTPaymentFromDb && !isAmnesty && !isRevisedId) {
        propertyTaxSection.style.display = "none";
    } else {
        propertyTaxSection.style.display = propertyTaxCheckbox?.checked ? "block" : "none";
    }

    // User Charges Section (only if exists)
    if (userChargesCheckbox && userChargesSection) {
        if (isOnlyUCPaymentFromDb) {
            userChargesSection.style.display = "none";
        } else {
            userChargesSection.style.display = userChargesCheckbox.checked ? "block" : "none";
        }
    }

    // Show total if any section active
    const anyActive = (!isOnlyPTPaymentFromDb && propertyTaxCheckbox?.checked) ||
                      (!isOnlyUCPaymentFromDb && userChargesCheckbox?.checked) ||
                      isOnlyPTPaymentFromDb ||
                      isOnlyUCPaymentFromDb;

    totalAmountBox.style.display = anyActive ? "block" : "none";

    getFinalAmount();
}




function getFinalAmount() {
	
    const isAmnesty = document.getElementById("isAmnesty")?.value === "true";
	const isRevisedId = document.getElementById("isRevisedId").value === 'true';

    const propertyTaxCheckbox = document.getElementById("propertyTaxCheckBoxId");
    const userChargesCheckbox = document.getElementById("userChargesCheckboxId");

    const isOnlyPTPaymentFromDb = document.getElementById("isOnlyPTPaymentId")?.value === "true";
    const isOnlyUCPaymentFromDb = document.getElementById("isOnlyUCPaymentId")?.value === "true";

    const userChargeAmount = userChargesCheckbox ? parseFloat($("#userChargeAmountId").val()?.replace(/,/g, '')) || 0 : 0;
    const netTaxAmount = parseFloat($("#netTaxID").val()?.replace(/,/g, '')) || 0;
    const totalTaxAmount = parseFloat($("#totalTaxID").val()?.replace(/,/g, '')) || 0;

    const finalPropertyTax = netTaxAmount === 0 ? Math.round(totalTaxAmount) : netTaxAmount;

    let finalAmount = 0;

    if (isAmnesty) {
        // In Amnesty mode: Use current checkbox selections
        if (propertyTaxCheckbox?.checked) {
            finalAmount += finalPropertyTax;
        }
        if (userChargesCheckbox?.checked) {
            finalAmount += userChargeAmount;
        }
    }else if(isRevisedId){
		if (propertyTaxCheckbox?.checked) {
            finalAmount += finalPropertyTax;
        }
        /*if (userChargesCheckbox?.checked) {
            finalAmount += userChargeAmount;
        }*/
	}
	 else {
        // Normal (non-amnesty) mode: Use DB flags and checkboxes
        if (isOnlyPTPaymentFromDb && isOnlyUCPaymentFromDb) {
            finalAmount = finalPropertyTax + userChargeAmount;
        }
        else if (isOnlyPTPaymentFromDb && !isOnlyUCPaymentFromDb) {
            if (userChargesCheckbox?.checked) {
                finalAmount = userChargeAmount;
            }
        }
        else if (!isOnlyPTPaymentFromDb && isOnlyUCPaymentFromDb) {
            if (propertyTaxCheckbox?.checked) {
                finalAmount = finalPropertyTax;
            }
        }
        else {
            if (propertyTaxCheckbox?.checked) {
                finalAmount += finalPropertyTax;
            }
            if (userChargesCheckbox?.checked) {
                finalAmount += userChargeAmount;
            }
        }
    }

    // Round final amount before setting
    finalAmount = Math.round(finalAmount);
    $("#finalTaxID").val(finalAmount);
}



function handleUserChargeAvailability() {
    const showUserChargeRaw = $("#showUserChargeFlag").val();
    const showUserCharge = showUserChargeRaw?.trim() === "true";

    const ptCheckbox = $("#propertyTaxCheckBoxId");
    const ptSection = $("#propertyTaxSection");
    const ucSection = $("#userChargesSection");

    console.log("Hiding user charges and enabling PT by default");
    console.log("ptCheckbox length:", ptCheckbox.length);
    console.log("ptSection length:", ptSection.length);
    console.log("ucSection length:", ucSection.length);

    if (!showUserCharge) {
        if (ptCheckbox.length) {
            ptCheckbox.prop("checked", true);
        }

        if (ptSection.length) {
            ptSection.show();
        }

        if (ucSection.length) {
            ucSection.hide();
        }
    }
}



function checkPropertyCategoryForTrade(index,element) {
	if($("#showTradeCategoryFlag").val() != true){
		debugger;
		if (commercialPropertyCategoryCodes.includes($("#" +element.value).val())) {
			$("#tradeSelection" +index+"Div").show();
		}else{
			$("#tradeSelection" +index+"Div").hide();
		}
	}else{
		$("#tradeSelection" +index+"Div").hide();
	}
	
}


function validateOwnerAge() {
	var format = 'DD/MM/YYYY';
	var delimiter = '/';
	var currentDate = new Date();
	var ownerRowcount = 0;
	var today = new Date(currentDate.getFullYear(), 05, 30);
     $('*[id^=dobTblId]').each(function() {
		var birthDate = stringToDate($("#dobTblId" + ownerRowcount)[0].value, format, delimiter);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = currentDate.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		if (age < 0) {
			createSmallAlert("DOB Can Not be Greater Then Today.");
			$('#ageID').val("");
			$('#dobID').val("");

		} else {
			document.getElementById('ageTblId' + ownerRowcount).value = age;
          
	}
	 ownerRowcount++;
	});
}




function caheckForCaNo(caNo) {

	if (caNo == null || caNo == '') {
		createSmallAlert('CA IS NULL');
		return;
	}
	createSmallAlert('inside caheckForCaNo');

}