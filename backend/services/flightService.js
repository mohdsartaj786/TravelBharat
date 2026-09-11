const search = async ({ from, to, date, passengers }) => {
    try {
        console.log("Flight Search:", {
            from,
            to,
            date,
            passengers
        });

        return [];
    } catch (error) {
        console.error("Flight Service Error:", error.message);
        throw error;
    }
};

module.exports = {
    search
};