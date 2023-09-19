function onPageLoad() {
    // beautifyPage();

    //Custom field DOM elements
    const customFieldsEl = document.querySelector(
        "body > table:nth-child(12) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td"
    );

    // Sending The Tracking
    const deliveryPartner = document.querySelector(
        "#custom_fields1 > td.default"
    ).innerText;

    if (deliveryPartner != "") {
        // append a button to the custom fields parent container
        customFieldsEl.innerHTML += `
            <button class="button send-tracking-btn">Send tracking sms</button>
        `;
        // access the send tracking html button
        const sendTrackingSmsBtn = document.querySelector(".send-tracking-btn");

        // attach an event listener to the send tracking html button
        sendTrackingSmsBtn.addEventListener("click", function () {
            sendTracking();
        });
    }
}

function beautifyPage() {
    // Adding Bootstrap
    const externalCssUrl =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css";

    // Create a <link> element to load the external CSS file.
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.type = "text/css";
    linkElement.href = externalCssUrl;

    // Append the <link> element to the <head> section of the webpage.
    document.head.appendChild(linkElement);
}

// Function to send the tracking message
function sendTracking() {
    const emailSubject = document.querySelector(
        "body > table:nth-child(7) > tbody > tr > td > table > tbody > tr:nth-child(10) > td.default"
    ).innerText;
    const [website, name, phone, orderNumber, orderStatus] =
        emailSubject.split("--");
    const deliveryPartner = document.querySelector(
        "#custom_fields1 > td.default"
    ).innerText;
    const trackingNumber = document.querySelector(
        "#custom_fields3 > td.default"
    ).innerText;
    let url = "";
    let encodedMessage = "";

    // Koombiyo --> works fine
    if (deliveryPartner === "Koombiyo") {
        encodedMessage = encodeURIComponent(
            `Hi ${name}, Your Order #${orderNumber} was shipped via Koombiyo. To track your order visit`
        );
        url = `https://e-sms.dialog.lk/api/v1/message-via-url/create/url-campaign?esmsqk=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTI5MCwiaWF0IjoxNjY5NTI5NzE3LCJleHAiOjQ3OTM3MzIxMTd9.SHDJkPj7Q79FYgaKSGCZ02W6_Y55VOVfiIUbZamKOrQ&list=${phone}&source_address=${website
            .replace("[", "")
            .replace(
                "]",
                ""
            )}.lk&message=${encodedMessage}%20https://koombiyodelivery.lk/Track/track_id?id=${trackingNumber}&phone=${phone}`;
        window.open(url, "_blank");
    }

    // Prompt --> works fine
    if (deliveryPartner === "Prompt") {
        encodedMessage = encodeURIComponent(
            `Hi ${name}, Your Order #${orderNumber} was shipped via Prompt Xpress. To track your order use ${trackingNumber} at`
        );
        url = `https://e-sms.dialog.lk/api/v1/message-via-url/create/url-campaign?esmsqk=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTI5MCwiaWF0IjoxNjY5NTI5NzE3LCJleHAiOjQ3OTM3MzIxMTd9.SHDJkPj7Q79FYgaKSGCZ02W6_Y55VOVfiIUbZamKOrQ&list=${phone}&source_address=Perfuma.lk&message=${encodedMessage}%20https://bit.ly/3ARm5d0`;
        window.open(url, "_blank");
    }

    // Perfuma Express Shipping --. Works fine
    if (deliveryPartner === "Perfuma") {
        const driverText = document.querySelector(
            "#custom_fields4 > td.default"
        ).innerText;

        if (driverText !== "") {
            const [driver, driverPhone] = driverText
                .replaceAll(" ", "")
                .split("--");
            encodedMessage = encodeURIComponent(
                `Good news ${name}! Your Order #${orderNumber} is on the way with Perfuma Express Service, and ${driver}'s your delivery guy (Call him at ${driverPhone}) for any delivery deets.`
            );
            url = `https://e-sms.dialog.lk/api/v1/message-via-url/create/url-campaign?esmsqk=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTI5MCwiaWF0IjoxNjY5NTI5NzE3LCJleHAiOjQ3OTM3MzIxMTd9.SHDJkPj7Q79FYgaKSGCZ02W6_Y55VOVfiIUbZamKOrQ&list=${phone}&source_address=${website
                .replace("[", "")
                .replace("]", "")}.lk&message=${encodedMessage}`;

            // opens the url and send the sms
            window.open(url, "_blank");
        } else {
            window.alert(
                "Driver not selected. Please select a delivery driver first!"
            );
        }
    }
}

window.addEventListener("load", onPageLoad);
