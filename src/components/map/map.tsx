import * as React from "react";
import * as leaflet from "leaflet";
import {Offer} from "../../types";

interface Props {
  places: Offer[];
  prefix: string;
  activePlace: Offer;
}

const iconDefault = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [27, 41],
});

const iconActive = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [27, 41],
});

const MapConfig = {
  ZOOM_CONTROL: false,
  MARKER: true
};

class Map extends React.PureComponent<Props, Record<string, unknown>> {
  _map: leaflet.Map;
  _markersGroup: leaflet.LayerGroup;

  componentDidMount() {
    this._initMap();
    this._addPoints();
  }

  componentDidUpdate() {
    this._removePoints();
    this._addPoints();
    this._map.panTo(this._getMapCenter());
  }

  _getMapCenter() {
    return this.props.activePlace ? this.props.activePlace.location.coordinates : this.props.places[0].city.coordinates;
  }

  _addPoints() {
    const markers = [];
    if (this.props.places) {
      this.props.places.forEach((place) => {
        const marker = leaflet.marker(place.location.coordinates, {icon: iconDefault});
        markers.push(marker);
      });
    }

    if (this.props.activePlace) {
      const marker = leaflet.marker(this.props.activePlace.location.coordinates, {icon: iconActive});
      markers.push(marker);
    }

    this._markersGroup = leaflet.layerGroup(markers);
    this._markersGroup.addTo(this._map);
  }

  _removePoints() {
    this._markersGroup.clearLayers();
    this._markersGroup = null;
  }

  _initMap() {
    this._map = leaflet.map(`map`, {
      center: this._getMapCenter(),
      zoom: this.props.activePlace ? this.props.activePlace.location.zoom : this.props.places[0].city.zoom,
      zoomControl: MapConfig.ZOOM_CONTROL,
    });
    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);
  }

  render() {
    return (
      <section className={`${this.props.prefix}__map map`}><div id="map" style={{height: `100%`}}></div></section>
    );
  }
}

export default Map;
