// Datepicker koden
// Väljer språk och dagens datum som första val
$(function () {
    $('#dp3').fdatepicker({
        language: 'swe',
        todayHighlight: true
    });
});

// Hämtar alla namn på projektet som har aktiveras
$.getJSON('/projectnamesenable', function (data) {
    var optionElements = '';

    // Skapar alla alternativ man har att välja på
    for (var i = 0; i < data.length; i++) {
        optionElements += '<option value="' + data[i].name + '">' + data[i].name + '</option>';
    }

    // Tar bort alla li element i ul listan så de inte blir dubbletter
    $('#projectListEnable').empty();
    // Lägger till tableContent i ul elementet
    $('#projectListEnable').append(optionElements);
});
