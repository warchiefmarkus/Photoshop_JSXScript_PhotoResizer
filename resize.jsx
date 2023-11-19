/*
@@@BUILDINFO@@@ Resize.jsx 1.0.0.0
*/
var inputFolder = Folder.selectDialog("Select a folder to process");
var fileList = inputFolder.getFiles("*.JPG");

var doc;

for(var i=0; i<fileList.length; i++) {
	doc = open(fileList[i])
	doc = app.activeDocument;  
		
	doc.changeMode(ChangeMode.RGB);  

	var fHeight = doc.height;
	var fWidth =  ((doc.height/7)*5);

	var white = new SolidColor(); 
	white.rgb.hexValue = "FFFFFF";
	app.backgroundColor = white;

	if (doc.height>doc.width){
		if (((doc.height/7)*5)>doc.width){
			doc.resizeCanvas(fWidth,fHeight, AnchorPosition.MIDDLECENTER);
		}else{
			doc.resizeCanvas(doc.width,((doc.width/5)*7), AnchorPosition.MIDDLECENTER);
		}
	}
	else{
		doc.resizeCanvas(doc.width,((doc.width/7)*5), AnchorPosition.MIDDLECENTER);
	}

	var options = new ExportOptionsSaveForWeb();
	options.quality = 100;
	options.format = SaveDocumentType.JPEG;
	options.optimized = true;

	var newName = 'resized_'+doc.name+'.jpg';

	//-- check if folder exist if not create it
	var folder = new Folder(doc.path+'/resized');
	if(!folder.exists) folder.create();

	doc.exportDocument(File(doc.path+'/resized/'+newName),ExportType.SAVEFORWEB,options);
	
	//doc.close(SaveOptions.no)
}
