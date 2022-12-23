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


//scripts that fetch pdf from dropbox through adobe sdk api

const dropboxLink = "https://www.dropbox.com/s/365cduxrezkgear/carbohydrates.pdf?dl=0";
const clientId = "b027ee382d2b479bbc10cb4276213ac8";
const viewerOptions = {
    embedMode: "FULL_WINDOW",
    //embedMode: "SIZED_CONTAINER",
    defaultViewMode: "FIT_PAGE",
    showDownloadPDF: true,
    showPrintPDF: true,
    showLeftHandPanel: true,
    showAnnotationTools: true
    //embedMode = value ? 'SIZED_CONTAINER' : 'FULL_WINDOW';
};

document.addEventListener("adobe_dc_view_sdk.ready", function () {
    var urlToPDF = directLinkFromDropboxLink(dropboxLink);
    var adobeDCView = new AdobeDC.View({
        clientId: "b027ee382d2b479bbc10cb4276213ac8", 
        divId: "embeddedView"
    });
    adobeDCView.previewFile(
        {
            content: { promise: fetchPDF(urlToPDF) },
            metaData: { fileName: urlToPDF.split("/").slice(-1)[0] }
        },
        viewerOptions
    );
});

// Utility Functions:
// Return a Promise that fetches the PDF. 
function fetchPDF(urlToPDF) {
    return new Promise((resolve) => {
        fetch(urlToPDF)
            .then((resolve) => resolve.blob())
            .then((blob) => {
                resolve(blob.arrayBuffer());
            })
    })
}

// Converts a standar Dropbox link to a direct download link
function directLinkFromDropboxLink(dropboxLink) {
    return dropboxLink.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "");
}
(function () {
    if (Blob.arrayBuffer != "function") {
        Blob.prototype.arrayBuffer = myArrayBuffer;
    }

    function myArrayBuffer() {
        return new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.readAsArrayBuffer(this);
        });
    }
})();


//file that has to be uploaded by the user to be published

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
  