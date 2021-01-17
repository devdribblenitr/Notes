// navbar 
function openFunction(){
    document.getElementById("sidebar-wrapper").style.transform="translateX(0)";
    document.getElementById("toggler-icon").style.display="none";
    document.getElementById("closebtn").style.display="block";
}
function closeFunction(){
    document.getElementById("sidebar-wrapper").style.transform="translateX(-250px)";
    document.getElementById("closebtn").style.display="none";
    document.getElementById("toggler-icon").style.display="block";
}


var file, 
reader = new FileReader();

reader.onloadend = function(e) {
if (e.target.error != null) {
showError("File " + file.name + " could not be read.");
return;
} else {
google.script.run
  .withSuccessHandler(showSuccess)
  .uploadFileToGoogleDrive(e.target.result, file.name, $('input#name').val(), $('input#email').val());
}
};

function showSuccess(e) {
if (e === "OK") { 
$('#forminner').hide();
$('#success').show();
} else {
showError(e);
}
}

function submitForm() {

var files = $('#files')[0].files;

if (files.length === 0) {
showError("Please select a file to upload");
return;
}

file = files[0];
if (file.size > 1024 * 1024 * 5) {
showError("The file size should be < 5 MB. Please <a href='http://www.labnol.org/internet/file-upload-google-forms/29170/' target='_blank'>upgrade to premium</a> for receiving larger files in Google Drive");
return;
}

showMessage("Uploading file..");

reader.readAsDataURL(file);

}

function showError(e) {
$('#progress').addClass('red-text').html(e);
}

function showMessage(e) {
$('#progress').removeClass('red-text').html(e);
}


//restrictriction


function doGet(e) {
    return HtmlService.createHtmlOutputFromFile('forms.html').setTitle("Google File Upload by CTRLQ.org");
  }
  
  
  function uploadFileToGoogleDrive(data, file, name, email) {
    
    try {
      
      var dropbox = "Received Files";
      var folder, folders = DriveApp.getFoldersByName(dropbox);
      
      if (folders.hasNext()) {
        folder = folders.next();
      } else {
        folder = DriveApp.createFolder(dropbox);
      }
      
      var contentType = data.substring(5,data.indexOf(';')),
          bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
          blob = Utilities.newBlob(bytes, contentType, file),
          file = folder.createFolder([name, email].join(" ")).createFile(blob);
      
      return "OK";
      
    } catch (f) {
      return f.toString();
    }
    
  }
  //////////////////////////pdf reader
  
/* Helper function to render the file using PDF Embed API. */
function previewFile(filePromise, fileName) {
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "<YOUR_CLIENT_ID>",
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* pass file promise which resolve to arrayBuffer */
            promise: filePromise,
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: fileName
        }
    }, {});
}

/* Helper function to check if selected file is PDF or not. */
function isValidPDF(file) {
    if (file.type === "application/pdf") {
        return true;
    }
    if (file.type === "" && file.name) {
        var fileName = file.name;
        var lastDotIndex = fileName.lastIndexOf(".");
        return !(lastDotIndex === -1 || fileName.substr(lastDotIndex).toUpperCase() !== "PDF");
    }
    return false;
}

/* Helper function to listen for file upload and
 * creating Promise which resolve to ArrayBuffer of file data.
 **/
function listenForFileUpload() {
    var fileToRead = document.getElementById("file-picker");
    fileToRead.addEventListener("change", function (event) {
        var files = fileToRead.files;
        if (files.length > 0 && isValidPDF(files[0])) {
            var fileName = files[0].name;
            var reader = new FileReader();
            reader.onloadend = function (e) {
                var filePromise = Promise.resolve(e.target.result);
                previewFile(filePromise, fileName);
            };
            reader.readAsArrayBuffer(files[0]);
        }
    }, false);
}

  