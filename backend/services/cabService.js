const search = async ({ from, to, date, passengers }) => {
    try {
        console.log("Cab Search:", {
            from,
            to,
            date,
            passengers
        });

        return [];
    } catch (error) {
        console.error("Cab Service Error:", error.message);
        throw error;
    }
};

module.exports = {
    search
};