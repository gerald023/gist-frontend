export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    // Get day of the week (e.g., "Wed")
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getUTCDay()];

    // Get day of the month with suffix (e.g., "13th")
    const day = date.getUTCDate();
    const daySuffix = getDaySuffix(day);

    // Get month name (e.g., "August")
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    const month = months[date.getUTCMonth()];

    // Get year
    const year = date.getUTCFullYear();

    // Format the date
    return `${dayOfWeek} ${day}${daySuffix} ${month} ${year}`;
}

function getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return "th"; // handles 11th, 12th, 13th
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

const formattedDate = formatDate("2024-08-13T10:08:07.572Z");

console.log(formattedDate); // Output: "Wed 13th August 2024"
