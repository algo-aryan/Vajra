window.onload = init;
function init() {
	initI();
	initII();
}

function initI() {
	
	const map = new ol.Map({
		view: new ol.View({
			zoom:10.40,
			minZoom:9,
			projection:'EPSG:4326'
		}),
		target: 'mapI'
	})
	
	const loginTitle = $('#loginTitle').val();
	if(loginTitle == 'SDMC') map.getView().setCenter([77.06,28.58]);
	if(loginTitle == 'NDMC') map.getView().setCenter([77.06,28.74]);
	if(loginTitle == 'EDMC') map.getView().setCenter([77.06,28.74]);
	if(loginTitle == 'MCD') map.getView().setCenter([77.06,28.64]);
	
	const stamenLayer = new ol.layer.Tile({ source: new ol.source.Stamen({ layer: 'watercolor' }) });
	map.addLayer(stamenLayer);
	
	const openStreetMapStandard = new ol.layer.Tile({ source: new ol.source.OSM() });
	map.addLayer(openStreetMapStandard);
	
	var styleRestrictionGen = new ol.style.Style({
	 		fill: new ol.style.Fill({
	    	color: "#ffffff00",
	  		}),
	  	stroke: new ol.style.Stroke({
	  		color: "#000000",
			width: .1
	  	})
	});  
      
	var featuresGen = [];
	var feat;
	var formatGen = new ol.format.WKT();
	var vectorLayerGen;
	function event(item, index) {
		feat = formatGen.readFeature(item, {
			dataProjection: 'EPSG:3857',
			featureProjection: 'EPSG:4326'
		});
		featuresGen[index] = feat;
		
	    var mask = new ol.filter.Mask({ 
	      feature: feat, 
	      wrapX: true,
	      inner: false, 
	      shadowWidth: 20,
	      fill: new ol.style.Fill({ color:[255,255,255,.3] }) 
	    });
	    openStreetMapStandard.addFilter(mask);
	} 
	
	$.ajax({
	    url: 'login/getMapGeometries', 
	    success: function(data) {
	
	    	if(data == '')
	    		snackBar('No Boundaries available to Render on Map!');
	    	else {
	    		data.forEach(event);
	    	}
	    }, 
		error: function(xhr) { 
			snackBar("Error Loading Boundaries..!");
		},
		complete : function (data) {
			
			vectorLayerGen = new ol.layer.VectorImage({
		 		source: new ol.source.Vector({
		  			features: featuresGen
		  		}),
		  		zIndex: 9999,
				style: styleRestrictionGen
			})
			map.addLayer(vectorLayerGen);
		}
	});  
	
/*	$.ajax({
  	    url: 'login/getVehicleData', 
  	    beforeSend: function() {
   			$('#spinnerAllRoute1').show();
   			$('#spinnerAllRoute2').show();
   	    },
  	    success: function(data) {
  	    	
  	    	if(data == '')
  	    		console.log('No Data Available to Render on Map!');
  	    	else {
				var features = [];
  	    		var czStyle = new ol.style.Style({
		          image: new ol.style.Icon({
		              src: 'static/images/cz.png',
		              scale: .7
		          })
			    });
			    var szStyle = new ol.style.Style({
		          image: new ol.style.Icon({
		              src: 'static/images/sz.png',
		              scale: .7
		          })
			    });
			    var nzStyle = new ol.style.Style({
		          image: new ol.style.Icon({
		              src: 'static/images/nz.png',
		              scale: .7
		          })
			    });
			    var wzStyle = new ol.style.Style({
		          image: new ol.style.Icon({
		              src: 'static/images/wz.png',
		              scale: .7
		          })
			    });
			    var snStyle = new ol.style.Style({
	          		image: new ol.style.Icon({
		              src: 'static/images/sn.png',
			          scale: .7
	          	  })
	    		});
		      	var ssStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			          src: 'static/images/ss.png',
		              scale: .7
			      })
			    }); 
		      	var rzStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			          src: 'static/images/rz.png',
		              scale: .7
			       })
			    });
		      	var kpStyle = new ol.style.Style({
			       image: new ol.style.Icon({
			         src: 'static/images/kp.png',
		             scale: .7
			       })
			    });
		      	var kbStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			          src: 'static/images/kb.png',
		              scale: .7
			       })
			    });
		      	var clStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			          src: 'static/images/cl.png',
		              scale: .7
			        })
			    });
		       	var spStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			          src: 'static/images/sp.png',
		              scale: .7
			       })
			    });
		      	var nlStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			          src: 'static/images/nl.png',
		              scale: .7
			       })
			    });
  	    		var format = new ol.format.WKT();
  	    		var c = 0;
  	    		data.forEach(function(item, index) {
					
					features[index] = format.readFeature(item, {
		      			dataProjection: 'EPSG 26918',
		      			featureProjection: 'EPSG:3857',
		      		});
		      		if(c == 0)
		      			features[index].setStyle(czStyle);
		      		if(c == 1)
		      			features[index].setStyle(szStyle);
		      		if(c == 2)
		      			features[index].setStyle(nzStyle);
		      		if(c == 3)
		      			features[index].setStyle(wzStyle);
		      		
		      		if(c == 4)
		      			features[index].setStyle(snStyle);
		      		if(c == 5)
		      			features[index].setStyle(ssStyle);
		      		if(c == 6)
		      			features[index].setStyle(rzStyle);
		      		if(c == 7)
		      			features[index].setStyle(kpStyle);
		      			
		      		if(c == 8)
		      			features[index].setStyle(kbStyle);
		      		if(c == 9)
		      			features[index].setStyle(clStyle);
		      		if(c == 10)
		      			features[index].setStyle(spStyle);
		      		if(c == 11)
		      			features[index].setStyle(nlStyle);
		      			
		      		c++;
		      		if(c == 12) c = 0;
				});

			  	var layer = new ol.layer.Vector({
		      		source: new ol.source.Vector({
		      		features: features
		      		})
		      	});
		      	map.addLayer(layer);
		      	
		      	var extent = vectorLayerGen.getSource().getExtent();
				map.getView().fit(extent);
		  	}
		},
   		complete : function (data) {
   			$('#spinnerAllRoute1').hide();
   			$('#spinnerAllRoute2').hide();
   		}
  	});*/
  	
  	
}

function initII() {

	const map = new ol.Map({
		view: new ol.View({
			zoom:10.40,
			minZoom:9,
			projection:'EPSG:4326'
		}),
		target: 'mapII'
	})
	
	const loginTitle = $('#loginTitle').val();
	if(loginTitle == 'SDMC') map.getView().setCenter([77.06,28.58]);
	if(loginTitle == 'NDMC') map.getView().setCenter([77.06,28.74]);
	if(loginTitle == 'EDMC') map.getView().setCenter([77.06,28.74]);
	if(loginTitle == 'MCD') map.getView().setCenter([77.06,28.64]);
	
	const stamenLayer = new ol.layer.Tile({ source: new ol.source.Stamen({ layer: 'watercolor' }) });
	map.addLayer(stamenLayer);
	
	const openStreetMapStandard = new ol.layer.Tile({ source: new ol.source.OSM() });
	map.addLayer(openStreetMapStandard);
	
	var styleRestrictionGen = new ol.style.Style({
	 		fill: new ol.style.Fill({
	    	color: "#ffffff00",
	  		}),
	  	stroke: new ol.style.Stroke({
	  		color: "#000000",
			width: .1
	  	})
	});  
      
	var featuresGen = [];
	var feat;
	var formatGen = new ol.format.WKT();
	var vectorLayerGen;
	function event(item, index) {
		feat = formatGen.readFeature(item, {
			dataProjection: 'EPSG:3857',
			featureProjection: 'EPSG:4326'
		});
		featuresGen[index] = feat;
		
	    var mask = new ol.filter.Mask({ 
	      feature: feat, 
	      wrapX: true,
	      inner: false, 
	      shadowWidth: 20,
	      fill: new ol.style.Fill({ color:[255,255,255,.3] }) 
	    });
	    openStreetMapStandard.addFilter(mask);
	} 
	
	$.ajax({
	    url: 'login/getMapGeometries', 
	    success: function(data) {
	
	    	if(data == '')
	    		snackBar('No Boundaries available to Render on Map!');
	    	else {
	    		data.forEach(event);
	    	}
	    }, 
		error: function(xhr) { 
			snackBar("Error Loading Boundaries..!");
		},
		complete : function (data) {
			
			vectorLayerGen = new ol.layer.VectorImage({
		 		source: new ol.source.Vector({
		  			features: featuresGen
		  		}),
		  		zIndex: 9999,
				style: styleRestrictionGen
			})
			map.addLayer(vectorLayerGen);
		}
	});
	
	$('.ol-attribution').hide(); 
	
/*	$.ajax({
  	    url: 'login/getAssetLocationData', 
  	    beforeSend: function() {
   			$('#spinnerAllRoute3').show();
   			$('#spinnerAllRoute4').show();
   	    },
  	    success: function(data) {
  	    	
  	    	if(data == '')
  	    		console.log('No Data Available to Render on Map!');
  	    	else {
				var features = [];
  	    		var czStyle = new ol.style.Style({
		          image: new ol.style.Icon({
		              src: 'static/images/asset/blue/landfill.png',
		              scale: .6
		          })
			    });
			    var szStyle = new ol.style.Style({
		          image: new ol.style.Icon({
		              src: 'static/images/asset/blue/bin.png',
		              scale: .6
		          })
			    });
			    var nzStyle = new ol.style.Style({
		          image: new ol.style.Icon({
		              src: 'static/images/asset/blue/dumping.png',
		              scale: .6
		          })
			    });
			    var wzStyle = new ol.style.Style({
		          image: new ol.style.Icon({
		              src: 'static/images/asset/blue/dustbin.png',
		              scale: .6
		          })
			    });
			    var snStyle = new ol.style.Style({
	          		image: new ol.style.Icon({
	              	src: 'static/images/asset/blue/energy-plant.png',
		            scale: .6
	          	  })
	    		});
		      	var ssStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			        src: 'static/images/asset/blue/dumping.png',
		            scale: .6
			      })
			    }); 
		      	var rzStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			        src: 'static/images/asset/blue/garbage.png',
		            scale: .6
			       })
			    });
		      	var kpStyle = new ol.style.Style({
			       image: new ol.style.Icon({
			       src: 'static/images/asset/blue/trash-can.png',
		           scale: .6
			       })
			    });
		      	var kbStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			        src: 'static/images/asset/blue/recycle-bin.png',
		            scale: .6
			       })
			    });
		      	var clStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			        src: 'static/images/asset/blue/recycle-centre.png',
		              scale: .6
			        })
			    });
		       	var spStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			        src: 'static/images/asset/blue/stree-corner-bin.png',
		            scale: .6
			       })
			    });
		      	var nlStyle = new ol.style.Style({
			        image: new ol.style.Icon({
			        src: 'static/images/asset/blue/trash.png',
		            scale: .6
			       })
			    });
  	    		var format = new ol.format.WKT();
  	    		var c = 0;
  	    		data.forEach(function(item, index) {
					
					features[index] = format.readFeature(item, {
		      			dataProjection: 'EPSG 26918',
		      			featureProjection: 'EPSG:3857',
		      		});
		      		if(c == 0)
		      			features[index].setStyle(czStyle);
		      		if(c == 1)
		      			features[index].setStyle(szStyle);
		      		if(c == 2)
		      			features[index].setStyle(nzStyle);
		      		if(c == 3)
		      			features[index].setStyle(wzStyle);
		      		
		      		if(c == 4)
		      			features[index].setStyle(snStyle);
		      		if(c == 5)
		      			features[index].setStyle(ssStyle);
		      		if(c == 6)
		      			features[index].setStyle(rzStyle);
		      		if(c == 7)
		      			features[index].setStyle(kpStyle);
		      			
		      		if(c == 8)
		      			features[index].setStyle(kbStyle);
		      		if(c == 9)
		      			features[index].setStyle(clStyle);
		      		if(c == 10)
		      			features[index].setStyle(spStyle);
		      		if(c == 11)
		      			features[index].setStyle(nlStyle);
		      			
		      		c++;
		      		if(c == 12) c = 0;
				});

			  	var layer = new ol.layer.Vector({
		      		source: new ol.source.Vector({
		      		features: features
		      		})
		      	});
		      	map.addLayer(layer);
		      	
		      	var extent = vectorLayerGen.getSource().getExtent();
				map.getView().fit(extent);
		  	}
		},
   		complete : function (data) {
   			$('#spinnerAllRoute3').hide();
   			$('#spinnerAllRoute4').hide();
   		}
  	});*/
}