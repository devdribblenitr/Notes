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
        clientId: "clientId", 
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

