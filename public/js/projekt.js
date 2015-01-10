$(document).ready(function () {

    // Hämtar alla projektnamn
    $.getJSON('/projectnames', function (data) {
        var liElements = '';

        // Skapar en lista med alla projekt
        for (var i = 0; i < data.length; i++) {
            liElements += '<li data-name="' + data[i].name + '" class="text-center dropdown-rapport-project-li" href="#">' + data[i].name + '</li>';
        }

        // Lägger till listan
        $('#dropdown-rapport-project').append(liElements);

        // Hämtar projektnamnet som användaren klickar på
        $('.dropdown-rapport-project-li').on('click', function () {
            var projectName = $(this).attr('data-name');
            popTable(projectName);
        });

    });

    // Lägger in alla info i table
    function popTable(projectName) {
        var tableContent = '';

        $.getJSON('/project/' + projectName + '', function (data) {
            var jobs = (data.jobs);

            // Lägger till alla job i tableContent strängen
            $.each(jobs, function () {
                tableContent += '<tr>';
                tableContent += '<td class="text-center">' + this.username + '</td>';
                tableContent += '<td class="text-center">' + this.date + '</td>';
                tableContent += '<td class="text-center">' + this.workActivities + '</td>';
                tableContent += '<td class="text-center">' + this.busMaterials + '</td>';
                tableContent += '<td class="text-center">' + this.hours + '</td>';
                tableContent += '<td class="text-center">' + this.trips + '</td>';
                tableContent += '</tr>'
            });

            // Tar bort alla li element i ul listan så de inte blir dubbletter
            $('#projectList').empty();
            // Lägger till tableContent i ul elementet
            $('#projectList').append(tableContent);

            // Lägger till prjektet i h1 title för att få feedbacka till användare
            $('h1').empty();
            $('h1').append('<small class="">Project rapporter - ' + projectName + '</small>');

            // Exporterar excel till användarens egna dator
            $('.export-excel').on('click', function () {
                // function från lib
                ExcellentExport.excel(this, 'datatable', 'Sheet Name Here');
            });
        });
    }
});
