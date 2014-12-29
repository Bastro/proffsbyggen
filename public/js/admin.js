$(document).ready(function () {

    $.getJSON('/accountlist', function (data) {

        var liElements = '';

        for (var i = 0; i < data.length; i++) {
            liElements += '<li data-username="' + data[i].username + '"class="text-center dropdown-rapport-project-li" href="#">' + data[i].username + '</li>';
        }

        $('#dropdown-rapport-project').append(liElements);

        $('.dropdown-rapport-project-li').on('click', function () {
            var userName = $(this).attr('data-username');
            popTable(userName);
        });

    });

    function popTable(userName) {
        $.getJSON('/projectuserjobs', {
            clickedUser: userName
        }, function (data) {

            var tableContent = '';

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

            $('h1').empty();
            $('h1').append('<small>Användare rapporter - ' + userName + '</small>');

            $('.export-excel').on('click', function () {
                // function från lib
                ExcellentExport.excel(this, 'datatable', 'Sheet Name Here');
            });
        });
    }
});
