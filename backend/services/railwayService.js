const search = async ({ from, to, date, passengers }) => {
    try {
        console.log("Railway Search:", {
            from,
            to,
            date,
            passengers
        });

        return [];
    } catch (error) {
        console.error("Railway Service Error:", error.message);
        throw error;
    }
};

module.exports = {
    search
};