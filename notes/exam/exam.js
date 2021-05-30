
    document.addEventListener("adobe_dc_view_sdk.ready", function()
    {
        var adobeDCView = new AdobeDC.View({clientId: clientId, divId: "adobe-dc-view"});
        adobeDCView.previewFile(
       {
          content:   {location: {url: "https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"}},
          metaData: {fileName: "Bodea Brochure.pdf"}
       });
    });
