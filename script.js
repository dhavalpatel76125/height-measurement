document.addEventListener("DOMContentLoaded", function() {
    const videoElement = document.getElementById("myVideo");
    const slider = document.getElementById("mySlider");
    const label = document.getElementById("myLabel");
    const heightInfo = document.getElementById("heightInfo");
    let calibratedBeta = 0;

    function initCamera() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(function(stream) {
                videoElement.srcObject = stream;
                videoElement.play();
            })
            .catch(function (err) {
                alert("Error accessing camera: " + err.message);
            });
    }

    function calculateHeight(angle, distance) {
        return Math.tan(angle * Math.PI / 180) * distance;
    }

    function metersToCentimeters(meters) {
        return meters * 100;
    }

    function metersToFeet(meters) {
        return meters * 3.28084;
    }

    function updateDisplay(event) {
        const angle = Math.max(event.beta - calibratedBeta - 90, 0);
        const distance = slider.value;
        const heightInMeters = calculateHeight(angle, distance);
        const heightInCentimeters = metersToCentimeters(heightInMeters);
        const heightInFeet = metersToFeet(heightInMeters);

        label.textContent = `Distance to object: ${distance} meters`;
        heightInfo.textContent = `${heightInMeters.toFixed(2)} m / ${heightInCentimeters.toFixed(1)} cm / ${heightInFeet.toFixed(2)} ft (${angle.toFixed(1)}°)`;
    }

    function calibrateOrientation(event) {
        calibratedBeta = event.beta;
        alert("Calibration complete. Please point your device towards the top of the object.");
    }

    window.addEventListener("deviceorientation", updateDisplay);
    slider.addEventListener("input", updateDisplay);
    videoElement.addEventListener("click", calibrateOrientation);

    initCamera();
});
