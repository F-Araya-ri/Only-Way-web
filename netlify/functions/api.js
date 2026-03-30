const axios = require("axios");

exports.handler = async function () {
  try {
    const placeId = "ChIJr3Yz8hTfoI8RroXSieDj_SM";

    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: placeId,
          key: process.env.GOOGLE_API_KEY,
          fields: "name,rating,user_ratings_total,reviews"
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };

  } catch (error) {
    console.error("ERROR REAL:", error.response?.data || error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.response?.data || error.message
      })
    };
  }
};