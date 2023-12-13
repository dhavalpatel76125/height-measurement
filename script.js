let startPoint = null;
let endPoint = null;

function main() {
    window.addEventListener("deviceorientation", onOrientationChange);

    document.getElementById("setStartPoint").addEventListener("click", setStartPoint);
    document.getElementById("setEndPoint").addEventListener("click", setEndPoint);

    navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then(function (signal) {
            const video = document.getElementById("myVideo");
            video.srcObject = signal;
            video.play();
        })
        .catch(function (err) {
            alert(err);
        });
}

function setStartPoint() {
    startPoint = parseFloat(document.getElementById("mySlider").value);
    document.getElementById("myLabel").innerHTML =
        "Starting Point: " + startPoint + " meters";
}

function setEndPoint() {
    endPoint = parseFloat(document.getElementById("mySlider").value);
    document.getElementById("myLabel").innerHTML =
        "Ending Point: " + endPoint + " meters";
}

function onOrientationChange(event) {
    // Extract rotation angles
    const alpha = event.alpha || 0; // Z-axis
    const beta = event.beta || 0;   // X-axis
    const gamma = event.gamma || 0; // Y-axis

    // Convert degrees to radians
    const alphaRad = alpha * (Math.PI / 180);
    const betaRad = beta * (Math.PI / 180);

    // Get distance to tree from your slider (in meters)
    const distToTree = parseFloat(document.getElementById("mySlider").value);

    // Calculate the height in different units (cm, meters, feet)
    const heightCm = distToTree * Math.tan(betaRad) * 100; // Convert to centimeters
    const heightM = distToTree * Math.tan(betaRad); // Meters
    const heightFt = distToTree * Math.tan(betaRad) * 3.28084; // Convert to feet

    // Update the displayed information
    document.getElementById("heightCm").innerHTML =
        "Height (cm): " + heightCm.toFixed(1) + " cm";
    document.getElementById("heightM").innerHTML =
        "Height (m): " + heightM.toFixed(2) + " m";
    document.getElementById("heightFt").innerHTML =
        "Height (ft): " + heightFt.toFixed(2) + " ft";
}
