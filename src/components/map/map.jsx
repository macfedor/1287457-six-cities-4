import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {PlaceType} from "../../consts.js";
import leaflet from "leaflet";

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

const MapConfig = {
  CENTER: [52.38333, 4.9],
  ZOOM: 12,
  ZOOM_CONTROL: false,
  MARKER: true
};

class Map extends PureComponent {

  componentDidMount() {
    this._initMap();
    this._addPoints();
  }

  _addPoints() {
    this.props.places.forEach((place) => {
      leaflet
        .marker(place.location, {icon})
        .addTo(this._map);
    });
  }

  _initMap() {
    this._map = leaflet.map(`map`, {
      center: MapConfig.CENTER,
      zoom: MapConfig.ZOOM,
      zoomControl: MapConfig.ZOOM_CONTROL,
      marker: MapConfig.MARKER
    });
    this._map.setView(MapConfig.CENTER, MapConfig.ZOOM);
    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);
  }

  render() {
    return (
      <section className="cities__map map"><div id="map" style={{height: `100%`}}></div></section>
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
      pro: PropTypes.bool.isRequired,
    }).isRequired,
    location: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired).isRequired,
};

export default Map;
