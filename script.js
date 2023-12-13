function onOrientationChange(event) {
    let angle = event.beta - 90;
    if (angle < 0) {
        angle = 0;
    }

    const distToTree = parseFloat(document.getElementById("mySlider").value);
    document.getElementById("myLabel").innerHTML =
        "Distance to tree: " + distToTree + " meters";

    // Calculate height in meters
    const heightInMeters = Math.tan(angle * (Math.PI / 180)) * distToTree;

    // Convert height to centimeters and feet
    const heightInCentimeters = heightInMeters * 100;
    const heightInFeet = heightInMeters * 3.28084;

    // Display height in meters, centimeters, and feet
    document.getElementById("heightInfo").innerHTML =
        heightInMeters.toFixed(1) + " m (" + angle.toFixed(1) + "&deg;)<br>" +
        heightInCentimeters.toFixed(1) + " cm<br>" +
        heightInFeet.toFixed(2) + " ft";
}
