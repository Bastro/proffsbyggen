// Laddar när dom/htmlen är klar.
$(document).ready(function () {
    // Hämtar alla användarkonton i JSON.
    $.getJSON('/accountlist', function (data) {

        var liElements = '';

        // Skapar li element för alla konton.
        for (var i = 0; i < data.length; i++) {
            liElements += '<li data-username="' + data[i].username + '"class="text-center dropdown-rapport-project-li" href="#">' + data[i].username + '</li>';
        }

        // Lägger till liElements i dom/html
        $('#dropdown-rapport-project').append(liElements);

        // hämtar användarnamnet när användare klickar på fältet
        $('.dropdown-rapport-project-li').on('click', function () {
            // hämtar data attributet data-username värde
            var userName = $(this).attr('data-username');

            popTable(userName);
        });

    });

    function popTable(userName) {
        $.getJSON('/projectuserjobs', {
            // Får JSON data när man clickar på ett användarnamn
            clickedUser: userName
        }, function (data) {

            var tableContent = '';

            // Sparar tableContent i en string
            for (var i = 0; i < data.length; i++) {
                tableContent += '<tr>';
                tableContent += '<td class="text-center">' + data[i].jobs.date + '</td>';
                tableContent += '<td class="text-center">' + data[i].name + '</td>';
                tableContent += '<td class="text-center">' + data[i].jobs.workActivities + '</td>';
                tableContent += '<td class="text-center">' + data[i].jobs.busMaterials + '</td>';
                tableContent += '<td class="text-center">' + data[i].jobs.hours + '</td>';
                tableContent += '<td class="text-center">' + data[i].jobs.trips + '</td>';
                tableContent += '</tr>'
            }

            // Tar bort alla li element i ul listan så de inte blir dubbletter
            $('#rapportUser').empty();
            // Lägger till tableContent i ul elementet
            $('#rapportUser').append(tableContent);

            // Byter H1 title så man får feedback vilken användare man kollar på
            $('h1').empty();
            $('h1').append('<small>Användare rapporter - ' + userName + '</small>');

            $('.export-excel').on('click', function () {
                // function från lib
                ExcellentExport.excel(this, 'datatable', 'Sheet Name Here');
            });
        });
    }
});
