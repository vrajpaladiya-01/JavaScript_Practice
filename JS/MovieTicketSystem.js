function bookTicket() {

    let name = document.getElementById("name").value;
    let age = Number(document.getElementById("age").value);
    let showTime = document.getElementById("showTime").value;
    let seatType = document.getElementById("seatType").value;
    let tickets = Number(document.getElementById("tickets").value);

    let result = document.getElementById("result");

    if (!name || age <= 0 || tickets <= 0 || !showTime || !seatType) {
        result.innerHTML = "❌ Please enter all valid details";
        return;
    }

    let price;

    switch (seatType) {
        case "silver":
            price = 150;
            break;
        case "gold":
            price = 250;
            break;
        case "platinum":
            price = 400;
            break;
        default:
            result.innerHTML = "❌ Invalid seat type";
            return;
    }

    let baseTotal = price * tickets;

    let showDiscount = 0;

    if (showTime === "morning") {
        showDiscount = 0.20;
    } else if (showTime === "afternoon") {
        showDiscount = 0.10;
    } else {
        showDiscount = 0;
    }

    let finalAmount = baseTotal - (baseTotal * showDiscount);

    let bookingType = tickets > 5 ? "Group Booking" : "Regular Booking";

    result.innerHTML = `
        <b>Hello ${name}</b><br><br>
        Seat Type: ${seatType}<br>
        Per Ticket Price: ₹${price}<br><br>
        Tickets: ${tickets}<br><br>

        Base Total: ₹${baseTotal}<br>
        Show Discount: ${showDiscount * 100}%<br>

        <b>Final Amount: ₹${Math.round(finalAmount)}</b><br><br>

        Booking Type: ${bookingType}
    `;
}