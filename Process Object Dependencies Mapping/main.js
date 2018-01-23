/**
 * Process Object Dependencies Mapping
 * @author: Bartosz Buchcic
 * IBM Copyright
 */

window.onload = function () {
	var fileInput = document.getElementById('fileInput');
	var fileInput2 = document.getElementById('fileInput2');
	var fileInput3 = document.getElementById('fileInput3');
	var fileDisplayArea = document.getElementById('fileDisplayArea');

	fileInput3.addEventListener('change', function (e) {


		var file = fileInput3.files[0];
		var textType = /text.*/;
		var reader = new FileReader();
		var text;


		reader.onprogress = function (data) {
			if (data.lengthComputable) {
				var progress = parseInt(((data.loaded / data.total) * 100), 10);
				fileDisplayArea.innerHTML = " <div class='w3-light-grey progress' value=" + progress + " max='100'><div id='progressbar' class='w3-container w3-blue w3-center' style='width:" + progress + "%'>" + progress + "%</div></div>"
			}
		}

		reader.onload = function (e) {
			text = reader.result;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(text, "text/xml");

			var ExceptionList = xmlDoc.querySelectorAll('stage[type="Exception"] > exception');

			fileDisplayAreaHTML = "<tr><td>Exception Type</td><td>Exception Details</td></tr>";

			if (ExceptionList[0].parentElement.parentElement.getAttribute("name") != "") {

				fileDisplayAreaHTML = "<tr><td>Source</td><td>Exception Type</td><td>Exception Details</td></tr>";

			}

			for (i = 0; i < ExceptionList.length; i++) {

				var checker = 0;
				for (j = 0; j < i; j++) {
					if ((ExceptionList[j].getAttribute('type') == ExceptionList[i].getAttribute('type')) && (ExceptionList[j].getAttribute('detail') == ExceptionList[i].getAttribute('detail'))) {
						checker = 1;
					}
				}



				if (checker == 0 && (ExceptionList[i].getAttribute('type') != "" && ExceptionList[i].getAttribute('detail') != "")) {

					fileDisplayAreaHTML += "<tr>";
					if (ExceptionList[i].parentElement.parentElement.getAttribute("name") != "") {

						fileDisplayAreaHTML += "<td>" + ExceptionList[i].parentElement.parentElement.getAttribute("name") + "</td>";

					}
					fileDisplayAreaHTML += "<td>" + ExceptionList[i].getAttribute('type') + "</td>";
					fileDisplayAreaHTML += "<td>" + ExceptionList[i].getAttribute('detail') + "</td>";
					fileDisplayAreaHTML += "</tr>";
				}
			}



			fileDisplayArea.innerHTML = fileDisplayAreaHTML;

		}

		reader.readAsText(file);

	});


	fileInput2.addEventListener('change', function (e) {


		var file = fileInput2.files[0];
		var textType = /text.*/;
		var reader = new FileReader();
		var text;


		reader.onprogress = function (data) {
			if (data.lengthComputable) {
				var progress = parseInt(((data.loaded / data.total) * 100), 10);
				fileDisplayArea.innerHTML = " <div class='w3-light-grey progress' value=" + progress + " max='100'><div id='progressbar' class='w3-container w3-blue w3-center' style='width:" + progress + "%'>" + progress + "%</div></div>"
			}
		}

		reader.onload = function (e) {
			text = reader.result;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(text, "text/xml");

			var Subsheets = xmlDoc.querySelectorAll('process > subsheet[type="Normal"][published="True"]');
			var Stages_SubSheetInfo = xmlDoc.querySelectorAll('stage[type="SubSheetInfo"]');
			var Stages_Start = xmlDoc.querySelectorAll('stage[type="Start"]');
			var Stages_End = xmlDoc.querySelectorAll('stage[type="End"][name="End"]');

			fileDisplayAreaHTML = "<tr><td>Object</td><td>Action</td><td>Description</td><td>Input</td><td>Output</td><td>Pre-conditions</td><td>Post-conditions</td></tr>";


			for (i = 0; i < Subsheets.length; i++) {

				fileDisplayAreaHTML += "<tr>";

				fileDisplayAreaHTML += "<td>";

				fileDisplayAreaHTML += xmlDoc.querySelector('process').getAttribute('name');

				fileDisplayAreaHTML += "</td>";
				fileDisplayAreaHTML += "<td>";

				fileDisplayAreaHTML += Subsheets[i].querySelector('name').innerHTML;

				fileDisplayAreaHTML += "</td>";
				fileDisplayAreaHTML += "<td>";

				for (j = 0; j < Stages_SubSheetInfo.length; j++) {

					if (Stages_SubSheetInfo[j].querySelector('subsheetid').innerHTML == Subsheets[i].getAttribute('subsheetid')) {
						fileDisplayAreaHTML += Stages_SubSheetInfo[j].querySelector('narrative').innerHTML;
					}

				}

				fileDisplayAreaHTML += "</td>";
				fileDisplayAreaHTML += "<td>";

				if (Subsheets.length != 0) {

					for (j = 0; j < Stages_Start.length; j++) {

						if (Stages_Start[j].querySelector('subsheetid') != null) {

							if (Stages_Start[j].querySelector('subsheetid').innerHTML == Subsheets[i].getAttribute('subsheetid')) {
								var Inputs = Stages_Start[j].querySelectorAll('inputs > input');
								for (k = 0; k < Inputs.length; k++) {
									if (k > 0) {
										fileDisplayAreaHTML += '<br style="mso-data-placement:same-cell;" />'
									}
									fileDisplayAreaHTML += Inputs[k].getAttribute("name") + ' - ';
									fileDisplayAreaHTML += Inputs[k].getAttribute("type");
								}
							}

						}
					}
				}

				fileDisplayAreaHTML += "</td>";
				fileDisplayAreaHTML += "<td>";

				if (Subsheets.length = !0) {

					for (j = 0; j < Stages_End.length; j++) {

						if (Stages_End[j].querySelector('subsheetid') != null) {

							if (Stages_End[j].querySelector('subsheetid').innerHTML == Subsheets[i].getAttribute('subsheetid')) {

								var Outputs = Stages_End[j].querySelectorAll('outputs > output');
								for (k = 0; k < Outputs.length; k++) {
									if (k > 0) {
										fileDisplayAreaHTML += '<br style="mso-data-placement:same-cell;" />'
									}
									fileDisplayAreaHTML += Outputs[k].getAttribute("name") + ' - ';
									fileDisplayAreaHTML += Outputs[k].getAttribute("type");
								}
							}
						}
					}
				}

				fileDisplayAreaHTML += "</td>";
				fileDisplayAreaHTML += "<td>";

				if (Subsheets.length != 0) {

					for (j = 0; j < Stages_Start.length; j++) {

						if (Stages_Start[j].querySelector('subsheetid') != null) {

							if (Stages_Start[j].querySelector('subsheetid').innerHTML == Subsheets[i].getAttribute('subsheetid')) {
								var Inputs = Stages_Start[j].querySelectorAll('preconditions > condition');
								for (k = 0; k < Inputs.length; k++) {
									if (k > 0) {
										fileDisplayAreaHTML += '<br style="mso-data-placement:same-cell;" />'
									}
									fileDisplayAreaHTML += Inputs[k].getAttribute("narrative");
								}
							}

						}
					}
				}

				fileDisplayAreaHTML += "</td>";
				fileDisplayAreaHTML += "<td>";

				if (Subsheets.length != 0) {

					for (j = 0; j < Stages_Start.length; j++) {

						if (Stages_Start[j].querySelector('subsheetid') != null) {

							if (Stages_Start[j].querySelector('subsheetid').innerHTML == Subsheets[i].getAttribute('subsheetid')) {
								var Inputs = Stages_Start[j].querySelectorAll('preconditions > condition');
								for (k = 0; k < Inputs.length; k++) {
									if (k > 0) {
										fileDisplayAreaHTML += '<br style="mso-data-placement:same-cell;" />'
									}
									fileDisplayAreaHTML += Inputs[k].getAttribute("narrative");
								}
							}

						}
					}
				}

				fileDisplayAreaHTML += "</td>";

				fileDisplayAreaHTML += "</tr>";

			}


			fileDisplayArea.innerHTML = fileDisplayAreaHTML;

		}


		reader.readAsText(file);


	});


	fileInput.addEventListener('change', function (e) {
		var file = fileInput.files[0];
		var textType = /text.*/;


		var reader = new FileReader();
		var text;

		reader.onprogress = function (data) {
			if (data.lengthComputable) {
				var progress = parseInt(((data.loaded / data.total) * 100), 10);
				fileDisplayArea.innerHTML = " <div class='w3-light-grey progress' value=" + progress + " max='100'><div id='progressbar' class='w3-container w3-blue w3-center' style='width:" + progress + "%'>" + progress + "%</div></div>"
			}
		}

		reader.onload = function (e) {
			text = reader.result;
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(text, "text/xml");
			var BusinessObject = xmlDoc.querySelectorAll('process > process > stage[type="Action"]');

			fileDisplayAreaHTML = "<tr><td>Process</td><td>Object</td><td>Action</td><td>Description</td><td>Input</td><td>Output</td><td>Pre-conditions</td><td>Post-conditions</td></tr>";

			var ResourceAction = "";
			var ResourceObject = "";
			for (i = 0; i < BusinessObject.length; i++) {

				ResourceAction = BusinessObject[i].querySelector("resource").getAttribute("action");
				ResourceObject = BusinessObject[i].querySelector("resource").getAttribute("object");

				var checker = 0;
				for (j = 0; j < i; j++) {
					if (BusinessObject[j].querySelector("resource").getAttribute("action") == ResourceAction && BusinessObject[j].querySelector("resource").getAttribute("object") == ResourceObject) {
						checker = 1;
					}
				}

				if ((ResourceAction.length != "" || ResourceObject.length != "") && checker == 0) {

					fileDisplayAreaHTML += '<tr>';

					fileDisplayAreaHTML += '<td>' + BusinessObject[i].parentElement.getAttribute("name") + "</td>";


					switch (ResourceObject) {
						case "Blueprism.AutomateProcessCore.clsCollectionActions":
							ResourceObject = "Internal - Collections";
							break;
						case "Blueprism.Automate.clsWorkQueuesActions":
							ResourceObject = "Internal - Work Queues";
							break;
						case "clsCalendarsBusinessObject":
							ResourceObject = "Internal - Calendars";
							break;
						case "Blueprism.Automate.clsCredentialsActions":
							ResourceObject = "Internal - Credentials";
							break;
						case "BluePrism.AutomateAppCore.clsEnvironmentLockingBusinessObject":
							ResourceObject = "Internal - Environment Locking";
							break;
						case "EncryptionBusinessObject":
							ResourceObject = "Internal - Encryption";
							break;
					}

					fileDisplayAreaHTML += '<td>' + ResourceObject + "</td>";
					fileDisplayAreaHTML += '<td>' + ResourceAction + "</td>";

					fileDisplayAreaHTML += '<td>'
					var ObjectDescription = xmlDoc.querySelectorAll("object[name='" + ResourceObject + "'] > process[name='" + ResourceObject + "'] > stage[name='" + ResourceAction + "'][type='SubSheetInfo'] > narrative");
					if ((ResourceAction != "") && (ResourceObject != "") && (ObjectDescription.length != 0)) {

						fileDisplayAreaHTML += ObjectDescription[0].innerHTML;
					}
					fileDisplayAreaHTML += "</td>";

					var ObjectSubSheetInfo = xmlDoc.querySelectorAll("object[name='" + ResourceObject + "'] > process[name='" + ResourceObject + "'] > stage[name='" + ResourceAction + "'][type='SubSheetInfo'] > subsheetid");

					var ObjectInputs = xmlDoc.querySelectorAll("object[name='" + ResourceObject + "'] > process[name='" + ResourceObject + "'] > stage[name='Start'][type='Start'] > subsheetid");

					fileDisplayAreaHTML += '<td>';
					if (ObjectSubSheetInfo.length != 0) {
						for (j = 0; j < ObjectInputs.length; j++) {
							if (ObjectInputs[j].innerHTML == ObjectSubSheetInfo[0].innerHTML) {
								var ObjectInputs = ObjectInputs[j].parentElement.querySelectorAll("inputs > input");
								for (k = 0; k < ObjectInputs.length; k++) {
									if (k > 0) {
										fileDisplayAreaHTML += '<br style="mso-data-placement:same-cell;" />'
									}
									fileDisplayAreaHTML += ObjectInputs[k].getAttribute("name") + ' - ';
									fileDisplayAreaHTML += ObjectInputs[k].getAttribute("type");// breakline
								}
							}
						}
					}

					fileDisplayAreaHTML += '</td>';

					var ObjectOutputs = xmlDoc.querySelectorAll("object[name='" + ResourceObject + "'] > process[name='" + ResourceObject + "'] > stage[name='End'][type='End'] > subsheetid");

					fileDisplayAreaHTML += '<td>';
					if (ObjectSubSheetInfo.length != 0) {
						for (j = 0; j < ObjectOutputs.length; j++) {
							if (ObjectOutputs[j].innerHTML == ObjectSubSheetInfo[0].innerHTML) {
								var ObjectOutputs = ObjectOutputs[j].parentElement.querySelectorAll("outputs > output");
								for (k = 0; k < ObjectOutputs.length; k++) {
									if (k > 0) {
										fileDisplayAreaHTML += '<br style="mso-data-placement:same-cell;" />'
									}
									fileDisplayAreaHTML += ObjectOutputs[k].getAttribute("name") + ' - ';
									fileDisplayAreaHTML += ObjectOutputs[k].getAttribute("type");// breakline
								}
							}
						}
					}
					fileDisplayAreaHTML += '</td>';

					var ObjectInputs = xmlDoc.querySelectorAll("object[name='" + ResourceObject + "'] > process[name='" + ResourceObject + "'] > stage[name='Start'][type='Start'] > subsheetid");

					fileDisplayAreaHTML += '<td>';
					if (ObjectSubSheetInfo.length != 0) {
						for (j = 0; j < ObjectInputs.length; j++) {
							if (ObjectInputs[j].innerHTML == ObjectSubSheetInfo[0].innerHTML) {
								var ObjectInputs = ObjectInputs[j].parentElement.querySelectorAll("preconditions > condition");
								for (k = 0; k < ObjectInputs.length; k++) {
									if (k > 0) {
										fileDisplayAreaHTML += '<br style="mso-data-placement:same-cell;" />'
									}
									fileDisplayAreaHTML += ObjectInputs[k].getAttribute("narrative");// breakline
								}
							}
						}
					}

					fileDisplayAreaHTML += '</td>';

					var ObjectOutputs = xmlDoc.querySelectorAll("object[name='" + ResourceObject + "'] > process[name='" + ResourceObject + "'] > stage[name='Start'][type='Start'] > subsheetid");

					fileDisplayAreaHTML += '<td>';
					if (ObjectSubSheetInfo.length != 0) {
						for (j = 0; j < ObjectOutputs.length; j++) {
							if (ObjectOutputs[j].innerHTML == ObjectSubSheetInfo[0].innerHTML) {
								var ObjectOutputs = ObjectOutputs[j].parentElement.querySelectorAll("postconditions > condition");
								for (k = 0; k < ObjectOutputs.length; k++) {
									if (k > 0) {
										fileDisplayAreaHTML += '<br style="mso-data-placement:same-cell;" />'
									}
									fileDisplayAreaHTML += ObjectOutputs[k].getAttribute("narrative");// breakline
								}
							}
						}
					}
					fileDisplayAreaHTML += '</td>';



				}
				fileDisplayAreaHTML += '</tr>';
			}
			fileDisplayArea.innerHTML = fileDisplayAreaHTML;
		}

		reader.readAsText(file);

	});
}
