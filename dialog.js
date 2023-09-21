const statusCode = document.body;
statusCode.style.fontSize = "28px";
statusCode.style.fontFamily = "sans-serif";

if (statusCode.textContent == 1) {
    statusCode.textContent = "Successfully sent sms! Status code: 1";
    statusCode.style.color = "green";
} else {
    const statusCodeText = statusCode.textContent;
    statusCode.textContent = `Something went wrong! Status code: ${statusCodeText}`;
    statusCode.style.color = "crimson";
}
