import { Component, ViewChild} from '@angular/core';
import { Donor, FireLoopRef } from '../shared/sdk/models';
import { RealTime,DonorApi } from '../shared/sdk/services';
import * as moment from 'moment';
import { EsriLoaderService } from 'angular2-esri-loader';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToasterService,BodyOutputType } from 'angular2-toaster';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  mapProperties: __esri.MapProperties = {
    basemap: 'streets'
  };
  mapViewProperties: __esri.MapViewProperties = {
    zoom: 10,
    center: [15, 65]
  };
  map: __esri.Map;
  mapView: __esri.MapView;
  private locatorTask:__esri.Locator;

  pinsHash:any = {};
  donorChangeHandle:any;

  @ViewChild('modal') modal: ModalComponent;
  model: Donor = new Donor();
  private donorRef : FireLoopRef<Donor>;
  errorMessage:string = "";


  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;

  close() {
      this.modal.dismiss();     
  }

  save() {
      this.donorRef.create(this.model).subscribe((donor:Donor) => {
        this.modal.close();        
        var toast = {
          type: 'success',
          title: 'Your information is added successfully!',
          showCloseButton: true,
          body: '<h4>Keep this link private to edit or remove your information later</h4><a href="/donor/'+ donor.id +'">/donor/'+donor.id+'</a>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
      },(err:any)=>{
        this.errorMessage = err.error.message;
      });
  }

  constructor(private esriLoader: EsriLoaderService,private rt: RealTime,private toasterService: ToasterService) {
    if (window.navigator && window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition(
        (position:any)=>{
          this.mapViewProperties.center = [position.coords.longitude,position.coords.latitude];
          if (this.mapView) this.mapView.goTo(this.mapViewProperties.center);
        },
        (error:any)=>{
          console.dir(error);
        }
      );
    }

    this.rt.onReady().subscribe(() => {
      this.donorRef = this.rt.FireLoop.ref<Donor>(Donor);      
    },
    (error:any)=>{
      console.dir(error);
    });
  }


  addSearchAndLocateWidget(){
    this.esriLoader.loadModules([
    'esri/widgets/Locate',
    'esri/tasks/Locator',
    'esri/widgets/Search'
    ]).then(([Locate,Locator,Search]) => {
      var locateBtn = new Locate({
          view: this.mapView
      });
      // Add the locate widget to the top left corner of the view
      this.mapView.ui.add(locateBtn, {
        position: "top-left"
      });

      var searchWidget = new Search({
        view: this.mapView,
        popupOpenOnSelect:false,
        popupEnabled:false,
        resultGraphicEnabled:false
      });

      // Add the search widget to the very top left corner of the view
      this.mapView.ui.add(searchWidget, {
        position: "top-right",
        index: 0
      });

      this.locatorTask = new Locator({
          url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
      });
    });
  }

  refreshPins(donors:Donor[]){
    this.esriLoader.loadModules([
    'esri/Graphic',
    'esri/geometry/Point',
    'esri/symbols/SimpleMarkerSymbol'
    ]).then(([Graphic,Point,SimpleMarkerSymbol]) => {
      //first mark all invalid
      Object.keys(this.pinsHash).forEach((key)=>{
          this.pinsHash[key].valid = false;
      });

      donors.forEach((donor)=>{
        var point = new Point({
          longitude: donor.location.lng,
          latitude: donor.location.lat
        });

        // Create a symbol for drawing the point
        var markerSymbol = new SimpleMarkerSymbol({
          color: [226, 119, 40],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 2
          }
        });

        // Create a graphic and add the geometry and symbol to it
        var pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,
          attributes: donor,
          popupTemplate: { // autocasts as new PopupTemplate()
            title: "Donor",
            content:`First Name: {firstName}
                    <br />
                    Last Name: {lastName}
                    <br />
                    Email: <span onclick="this.innerHTML='{email}'">click to show</span>
                    <br />
                    Contact Number:<span onclick="this.innerHTML='{contactNumber}'">click to show</span>
                    <br />
                    Blood Group: {bloodGroup}
                    `

          }
        });

        //set new or existed one valid
        if (!this.pinsHash[donor.id]){
          this.pinsHash[donor.id] = {valid:true,pin:pointGraphic};
          this.mapView.graphics.add(pointGraphic);
        }else{
          this.pinsHash[donor.id].valid = true;
        }

      });

      //remove invalid ones
      Object.keys(this.pinsHash).forEach((key)=>{
        if (!this.pinsHash[key].valid){
          this.mapView.graphics.remove(this.pinsHash[key].pin);
          delete this.pinsHash[key];
        };
      });

    });
  }

  donorPopupOnClick(){
    this.mapView.on("click", (event)=>{
      var screenPoint = {
        x: event.x,
        y: event.y
      };

      // Search for graphics at the clicked location
      this.mapView.hitTest(screenPoint).then((response)=>{
        if(response.results.length>0){
          return;//response.results is an array of objects which have mapPoint and graphic
        }

        this.model = new Donor();
        this.model.bloodGroup = 'A';
        this.model.location = {lat:event.mapPoint.latitude,lng:event.mapPoint.longitude};
        this.errorMessage = '';   
        this.locatorTask.locationToAddress(event.mapPoint).then((response)=>{
          this.model.address = response.address.Match_addr;
        }).otherwise((err)=>{
          this.model.address = "";
        });
        //do not need waitting for locationToAddress to return address while user is playing the input form dialog
        this.modal.open();        
      });
    });
  }

  watchMapViewExtentChange(){
    var view = this.mapView;
    view.watch("extent", ()=>{
        if (!view.animation || view.animation.isFulfilled()){
          var lat = view.center.latitude;
          var lng = view.center.longitude;
          var maxDistance = Math.max(view.extent.width/2,view.extent.height/2);

          if (this.donorChangeHandle) this.donorChangeHandle.unsubscribe();


          if (!this.donorRef) return;

          this.donorChangeHandle = this.donorRef.on('change',{"where":{"location":{"near":{"lat":lat,"lng":lng},"maxDistance":maxDistance,"unit":"meters"}}}).subscribe((donors: Donor[]) => {
            this.refreshPins(donors);
          },(err:any)=>{
            console.dir(err);
          });
        }  
    });
  }


  onMapInit(mapInfo: {map: __esri.Map, mapView: __esri.MapView}) {
    this.map = mapInfo.map;
    this.mapView = mapInfo.mapView;

    this.addSearchAndLocateWidget();
    this.donorPopupOnClick();
    this.watchMapViewExtentChange();    
  }	
}