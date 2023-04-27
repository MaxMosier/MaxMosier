mapboxgl.accessToken =
    "pk.eyJ1IjoibWF4d3giLCJhIjoiY2xneWxreWlhMDd2MTNmbm1yanc4a3JqZyJ9.brbAhB8h2g970I8JZI-7FA";

const map = new mapboxgl.Map({
    container: "map", // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: "mapbox://styles/maxwx/clgyov7tx004z01rh8fv15kl3", // style URL
    center: [11.94,53.70238], // starting position [lng, lat]
    zoom: 9, // starting zoom
});
//
