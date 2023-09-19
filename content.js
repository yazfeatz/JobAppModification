function onPageLoad() {
    //Custom field DOM elements
    const customFieldsEl = document.querySelector("body > table:nth-child(12) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td");
    const deliveryPartner = document.querySelector("#custom_fields1 > td.default").innerText;
    const trackingNumber = document.querySelector("#custom_fields3 > td.default").innerText;

    // Check if the custom fileds for the delivery partner is filled
    if (deliveryPartner != "") {
        // append a button to the custom fields parent container
        customFieldsEl.innerHTML += `
            <button class="button send-tracking-btn">Send tracking sms</button>
        `
        // access the send tracking html button
        const sendTrackingSmsBtn = document.querySelector(".send-tracking-btn");
    
        // attach an event listener to the send tracking html button
        sendTrackingSmsBtn.addEventListener("click", function() {
            sendTracking()
        })
    }

}


// Function to send the tracking message
function sendTracking() {
    const emailSubject = document.querySelector("body > table:nth-child(7) > tbody > tr > td > table > tbody > tr:nth-child(10) > td.default").innerText;
    const [name, phone, orderNumber] = emailSubject.split("--");
    const deliveryPartner = document.querySelector("#custom_fields1 > td.default").innerText;
    const trackingNumber = document.querySelector("#custom_fields3 > td.default").innerText;
    const perfumaCustomerSupport = "0776995848"
    let url = ""
    let encodedMessage = ""

    // Koombiyo --> works fine
    if (deliveryPartner === "Koombiyo") {
        encodedMessage = encodeURIComponent(`Hi ${name}, Your Order #${orderNumber} was shipped via Koombiyo. To track your order visit`);
        url = `https://e-sms.dialog.lk/api/v1/message-via-url/create/url-campaign?esmsqk=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTI5MCwiaWF0IjoxNjY5NTI5NzE3LCJleHAiOjQ3OTM3MzIxMTd9.SHDJkPj7Q79FYgaKSGCZ02W6_Y55VOVfiIUbZamKOrQ&list=${phone}&source_address=Perfuma.lk&message=${encodedMessage}%20https://koombiyodelivery.lk/Track/track_id?id=${trackingNumber}&phone=${phone}`
        window.open(url, "_blank");
    }

    // Prompt --> works fine
    if (deliveryPartner === "Prompt") {
        encodedMessage = encodeURIComponent(`Hi ${name}, Your Order #${orderNumber} was shipped via Prompt Xpress. To track your order use ${trackingNumber} at`);
        url = `https://e-sms.dialog.lk/api/v1/message-via-url/create/url-campaign?esmsqk=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTI5MCwiaWF0IjoxNjY5NTI5NzE3LCJleHAiOjQ3OTM3MzIxMTd9.SHDJkPj7Q79FYgaKSGCZ02W6_Y55VOVfiIUbZamKOrQ&list=${phone}&source_address=Perfuma.lk&message=${encodedMessage}%20https://bit.ly/3ARm5d0`
        window.open(url, "_blank");
    }

    // Perfuma Express Shipping --. Works fine
    if (deliveryPartner === "Perfuma") {
        encodedMessage = encodeURIComponent(`Hi ${name}, Your Order #${orderNumber} was shipped via Perfuma Express Shipping. To know your order status call us at ${perfumaCustomerSupport}`);
        url = `https://e-sms.dialog.lk/api/v1/message-via-url/create/url-campaign?esmsqk=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTI5MCwiaWF0IjoxNjY5NTI5NzE3LCJleHAiOjQ3OTM3MzIxMTd9.SHDJkPj7Q79FYgaKSGCZ02W6_Y55VOVfiIUbZamKOrQ&list=${phone}&source_address=Perfuma.lk&message=${encodedMessage}`
        window.open(url, "_blank");
    }

    console.log(url)
}

window.addEventListener('load', onPageLoad);