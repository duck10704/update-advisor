//var Pd = new Array("");
function loadProd(browser) {
	try {
		if(browser == "chrome") {
			disableButtonAndShowLoadingImg();
			UpdateAdivsor = document.getElementById("UpdateAdivsor");
		} else {
			if(!isInstallActiveX()) {	
				throw "not installed yet";
			} else {
				loadAdvisor(browser);
				disableButtonAndShowLoadingImg();
			}
		}
		var oGroup = document.getElementById("CLProd");
		for(i=0;i<Pd.length;i++){		
			// UpdateAdivsor.ProductRegPath = Pd[i];			
			getProductRegPath(i);
			
			if ( UpdateAdivsor.Param("Version") != "") {
		  		var nod1=document.createElement("input");
		  		nod1.type="hidden"
		  		nod1.name="Product";
		  		nod1.value=UpdateAdivsor.ProductName;
				oGroup.appendChild(nod1);
				
				var nod2=document.createElement("input");
		  		nod2.type="hidden"
		  		nod2.name="MJVersion";
		  		nod2.value=UpdateAdivsor.MajorVersion;
				oGroup.appendChild(nod2);

		  		var nod3=document.createElement("input");
		  		nod3.type="hidden"
		  		nod3.name="MIVersion";
		  		nod3.value=UpdateAdivsor.MinorVersion;
				oGroup.appendChild(nod3);

		  		var nod4=document.createElement("input");
		  		nod4.type="hidden"
		  		nod4.name="DisplayBuildNumber";
		  		nod4.value=UpdateAdivsor.Param("DisplayBuildNumber");
				oGroup.appendChild(nod4);
				
				var nod5=document.createElement("input");
		  		nod5.type="hidden"
		  		nod5.name="Vender";
		  		nod5.value=UpdateAdivsor.Param("CustomerNO");
				oGroup.appendChild(nod5);
				
				var nod6=document.createElement("input");
		  		nod6.type="hidden"
		  		nod6.name="BuildNumber";
		  		nod6.value=UpdateAdivsor.Param("BuildNumber");
				oGroup.appendChild(nod6);

		  		var nod7=document.createElement("input");
		  		nod7.type="hidden"
		  		nod7.name="SRNo";
		  		nod7.value=UpdateAdivsor.Param("SR");
				oGroup.appendChild(nod7);
				
				/*
				var nod8=document.createElement("input");
		  		nod8.type="hidden"
		  		nod8.name="clbdromnav.ax exist?";
		  		nod8.value=UpdateAdivsor.IsFileExist("clbdromnav.ax");
				oGroup.appendChild(nod8);
				
				var nod9=document.createElement("input");
		  		nod9.type="hidden"
		  		nod9.name="hddvdnav.ax exist?";
		  		nod9.value=UpdateAdivsor.IsFileExist("hddvdnav.ax");
				oGroup.appendChild(nod9);
				
				var nod10=document.createElement("input");
		  		nod10.type="hidden"
		  		nod10.name="regKey = BuildInfo\\SR_Ver";
		  		nod10.value=UpdateAdivsor.Registry("BuildInfo", "SR_Ver");
				oGroup.appendChild(nod10);  		
				*/
				
				var nod11=document.createElement("input");
		  		nod11.type="hidden"
		  		nod11.name="Channel";
		  		nod11.value=UpdateAdivsor.Param("Channel");
				oGroup.appendChild(nod11);
				
				var nod12=document.createElement("input");
		  		nod12.type="hidden"
		  		nod12.name="VersionType";
		  		nod12.value=UpdateAdivsor.Param("VersionType");
				oGroup.appendChild(nod12);
				
		  		var br=document.createElement("br");
		  		oGroup.appendChild(br);
			}
		}
		document.CLProd.submit(); // CLProd form submit
	} catch(e)	{
		//alert(e);
		$('#botton').show();
    	$('#botton3').hide();
		setTimeout(function() {reLoadProd(browser)}, 1000);
	}
	
	function reLoadProd(browser) {
		loadProd(browser);
	}
	
	function getProductRegPath(i) {
		UpdateAdivsor.ProductRegPath = getPd(i);
	}
	
	function getPd(i) {
		return Pd[i];
	}
	
	function isInstallActiveX() { 
		tester = false; 
		try { 
			getProductRegPath(0);
			if (UpdateAdivsor.Param("Version") != "") {
				// do nothing
			}
			tester = true;
		} catch (e) { 
			// catch the exception 
		} 
		return tester; 
	} 	
	
	function disableButtonAndShowLoadingImg() {
		// disable onmousedown event to prevent double click
		$('#botton').find('a').removeAttr("onmousedown");
		// replace image, show loading image
		$('#botton').find('a').css("background-image" , "url('../img/botton3.gif')");
	}
}