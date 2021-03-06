$(document).ready(function () {

    var counter = 0;
    var check = false;
    var i = setInterval(function () {
        if (localStorage.getItem("flag")) {
            counter = 0;
            check = true;
            localStorage.removeItem("flag");
        }
        if (check) {
            counter++;
        }
        if (counter < 30) {
            $("#staging").html("Preprocessing the Data Bro!");
        }
        else if (counter > 30 && counter < 60) {
            $("#staging").html("Photo In");
        }
        else if (counter > 60) {
            $("#staging").html("Output Out");
        }

        var percentage = counter / 100;
        drawProgress(aProgress, percentage, $pCaption);
        if (counter == 100) {
            clearInterval(i);
        }
    }, 175);
    var $pc = $('#progressController');
    var $pCaption = $('.progress-bar p');
    var iProgress = document.getElementById('inactiveProgress');
    var aProgress = document.getElementById('activeProgress');
    var iProgressCTX = iProgress.getContext('2d');
    drawInactive(iProgressCTX);

    $pc.on('change', function () {
        var percentage = $(this).val() / 100;
        drawProgress(aProgress, percentage, $pCaption);
    });

    function drawInactive(iProgressCTX) {
        iProgressCTX.lineCap = 'square';

        //outer ring
        iProgressCTX.beginPath();
        iProgressCTX.lineWidth = 15;
        iProgressCTX.strokeStyle = '#e1e1e1';
        iProgressCTX.arc(137.5, 137.5, 129, 0, 2 * Math.PI);
        iProgressCTX.stroke();

        //progress bar
        iProgressCTX.beginPath();
        iProgressCTX.lineWidth = 0;
        iProgressCTX.fillStyle = '#e6e6e6';
        iProgressCTX.arc(137.5, 137.5, 121, 0, 2 * Math.PI);
        iProgressCTX.fill();

        //progressbar caption
        iProgressCTX.beginPath();
        iProgressCTX.lineWidth = 0;
        iProgressCTX.fillStyle = '#fff';
        iProgressCTX.arc(137.5, 137.5, 100, 0, 2 * Math.PI);
        iProgressCTX.fill();

    }
    function drawProgress(bar, percentage, $pCaption) {
        var barCTX = bar.getContext("2d");
        var quarterTurn = Math.PI / 2;
        var endingAngle = ((2 * percentage) * Math.PI) - quarterTurn;
        var startingAngle = 0 - quarterTurn;

        bar.width = bar.width;
        barCTX.lineCap = 'square';

        barCTX.beginPath();
        barCTX.lineWidth = 20;
        barCTX.strokeStyle = '#00B4FF';
        barCTX.arc(137.5, 137.5, 111, startingAngle, endingAngle);
        barCTX.stroke();

        $pCaption.text((parseInt(percentage * 100, 10)) + '%');
    }

    var percentage = $pc.val() / 100;
    drawProgress(aProgress, percentage, $pCaption);
});