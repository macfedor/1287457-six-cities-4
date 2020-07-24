import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {PlaceType} from "../../consts.js";
import leaflet from "leaflet";

const iconDefault = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 41],
});

const iconActive = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [27, 41],
});

const MapConfig = {
  ZOOM_CONTROL: false,
  MARKER: true
};

class Map extends PureComponent {

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
    return this.props.places[0] ? this.props.places[0].city.coordinates : this.props.activePlace.coordinates;
  }

  _addPoints() {
    const markers = [];
    this.props.places.forEach((place) => {
      const marker = leaflet.marker(place.location.coordinates, {icon: iconDefault});
      markers.push(marker);
    });

    if (this.props.activePlace) {
      const marker = leaflet.marker(this.props.activePlace.coordinates, {icon: iconActive});
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
      zoom: this.props.places[0] ? this.props.places[0].city.zoom : this.props.activePlace.zoom,
      zoomControl: MapConfig.ZOOM_CONTROL,
      marker: MapConfig.MARKER
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

Map.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([PlaceType.APARTMENT, PlaceType.ROOM, PlaceType.HOUSE, PlaceType.HOTEL]).isRequired,
    rating: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    insideItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    host: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    reviews: PropTypes.array,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
  prefix: PropTypes.string.isRequired,
  activePlace: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  }),
};

export default Map;
