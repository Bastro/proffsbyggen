$(document).ready(function () {

    popTable();

    function popTable() {

        $.getJSON('/projectsinfo', function (data) {
            var tableContent = '';

            $.each(data, function () {
                tableContent += '<tr>';
                tableContent += '<td class="text-center">' + this.name + '</td>';
                tableContent += '<td class="text-center">' + this.adress.adress + '</td>';
                tableContent += '<td class="text-center">' + this.adress.zipCode + '</td>';
                tableContent += '<td class="text-center">' + this.adress.city + '</td>';
                tableContent += '<td class="text-center">' + this.adress.phoneNumber + '</td>';
                tableContent += '<td class="text-center">' + this.adress.cadastral + '</td>';
                tableContent += '<td class="text-center">' + this.adress.apartmentRental + '</td>';
                // Bryter ner raden så den inte blir så lång
                tableContent += '<td>';
                tableContent += '<center>';
                tableContent += '<a href="#">';
                if (this.enable === false)
                    tableContent += '<label data-name="' + this.name + '" data-enable="' + this.enable + '" class="label success activateProject">Aktivera</label>';
                if (this.enable === true)
                    tableContent += '<label data-name="' + this.name + '" data-enable="' + this.enable + '" class="label orange activateProject">Pausa</label>';
                tableContent += '<label data-name="' + this.name + '" data-reveal-id="projectDeleteModal" class="label alert deleteProject">Radera</label>';
                tableContent += '</a>';
                tableContent += '</center>';
                tableContent += '</td>';

                tableContent += '</tr>'
            });

            $('#userList').empty();
            $('#userList').append(tableContent);
        });

        $('.deleteProject').on('click', function () {
            var projectName = $(this).attr('data-name');
            createModal(projectName);
        });

        $('.activateProject').on('click', function () {
            var projectName = $(this).attr('data-name');
            var enable = $(this).attr('data-enable');
            changeEable(projectName, enable);
        });
    };

    function createModal(projectName) {
        var modalContent = '';

        modalContent += '<h2>Varning!</h2>'
        modalContent += '<p class="lead">Är du säker på att du vill ta bort ' + projectName + '?</p>'
        modalContent += '<div>'
        modalContent += '<a id="modalCancel" class="button secondary">Avbryt</a>'
        modalContent += '<a id="modalConfirm" class="button alert">Bekräfta</a>'
        modalContent += '</div>'
        modalContent += '<a class="close-reveal-modal">&#215;</a>'

        $('#projectDeleteModal').empty();
        $('#projectDeleteModal').append(modalContent);

        $('#modalCancel').on('click', function () {
            $('#projectDeleteModal').foundation('reveal', 'close');
        });

        $('#modalConfirm').on('click', function () {
            $('#projectDeleteModal').foundation('reveal', 'close');
            deleteProject(projectName);
        });
    }

    // Radera Project
    function deleteProject(projectName) {
        $.ajax({
            type: 'DELETE',
            url: '/deleteproject/' + projectName,
            //- headers: { 'X-CSRF-Token': '{{token}}' },
            headers: {
                'X-CSRF-Token': $('meta[name="x-csrf-token"]').attr('content')
            },
        }).done(function (response) {
            if (response.msg === '') {} else {
                alert('Error: ' + response.msg);
            }
            popTable();
        });
    }

    // Aktiverar/Pausar project
    function changeEable(projectName, enable) {
        // Bool värdet i string format, så blir tvungen och göra en if else istället för !enable
        if (enable === 'false') {
            enable = true;
        } else {
            enable = false;
        }

        var data = {
            projectName: projectName,
            enable: enable
        };
        $.ajax({
            url: '/projectchangeenable',
            type: 'POST',
            data: data,
            //- headers: { 'X-CSRF-Token': '{{token}}' },
            headers: {
                'X-CSRF-Token': $('meta[name="x-csrf-token"]').attr('content')
            }
        });
        // Timeout så ingen crashar
        window.setTimeout(popTable, 500);
    }
});
