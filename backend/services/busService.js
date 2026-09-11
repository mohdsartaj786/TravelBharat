const search = async ({ from, to, date, passengers }) => {
    try {
        console.log("Bus Search:", {
            from,
            to,
            date,
            passengers
        });

        return [];
    } catch (error) {
        console.error("Bus Service Error:", error.message);
        throw error;
    }
};

module.exports = {
    search
};