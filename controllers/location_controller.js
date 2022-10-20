const fetch = require('node-fetch');

module.exports = {
    fetchLocations: async (page) => {
        const limit = 10;
        let offset = (page - 1) * limit;

        return new Promise(async function (resolve, reject) {
            try {
                const locationResponse = await fetch(`https://countriesnow.space/api/v0.1/countries/capital`);

                if (locationResponse.status == 200) {
                    const locationJson = await locationResponse.json();
                    const locationData = locationJson.data;

                    let totalLocations = locationData.length;
                    let perPageLocation = locationData.slice(offset, offset + 10);
                    let totalPages = Math.ceil(totalLocations / limit);

                    let paginatedLocation = {
                        current_page: page,
                        total_pages: totalPages,
                        total_items: totalLocations,
                        has_prev: offset > 0,
                        has_next: page < totalPages,
                        locations: perPageLocation
                    }
                    resolve({
                        success: 1,
                        data: paginatedLocation
                    });
                } else {
                    resolve({
                        success: 0,
                        message: locationJson.message,
                    });
                }
            } catch (e) {
                console.log(e);
                resolve({
                    success: 0,
                    message: 'Something went wrong',
                });
            }
        });
    }
};