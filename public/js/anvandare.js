// Kör JavaScript när dom/htmlen är klar för att inte sätta events på något som inte finns redan.
$(document).ready(function () {

    popTable();

    // Lägger in alla värden i tablet.
    function popTable() {
        $.getJSON('/accountlist', function (data) {

            var tableContent = '';

            $.each(data, function () {
                tableContent += '<tr>';
                tableContent += '<td class="text-center">' + this.username + '</td>';
                tableContent += '<td class="text-center">' + this.type + '</td>';
                tableContent += '<td><a href="#" data-reveal-id="myModal"><center><label data-username="' + this.username + '" class="label alert deleteuser">Radera</label></a></center></td>';
                tableContent += '</tr>'
            });

            // Tar bort allt i table för att inte skapa dubbleter.
            $('#userList').empty();
            // Lägger till alla värden i table.
            $('#userList').append(tableContent);

            // När man klickar på en knapp med classen deleteuser så skickar man användarnamnet till function createModel.
            $('.deleteuser').on('click', function () {
                var userName = $(this).attr('data-username');
                createModal(userName);
            });
        });
    }

    // Skapar en model för att inte man ska råka klicka ta bort.
    function createModal(userName) {
        var modalContent = '';

        modalContent += '<h2>Varning!</h2>'
        modalContent += '<p class="lead">Är du säker på att du vill ta bort ' + userName + '?</p>'
        modalContent += '<div>'
        modalContent += '<a id="modalCancel" class="button secondary">Avbryt</a>'
        modalContent += '<a id="modalConfirm" class="button alert">Bekräfta</a>'
        modalContent += '</div>'
        modalContent += '<a class="close-reveal-modal">&#215;</a>'

        $('#myModal').empty();
        $('#myModal').append(modalContent);

        // Så model försvinner när man clickar på avbryt.
        $('#modalCancel').on('click', function () {
            $('#myModal').foundation('reveal', 'close');
        })

        // Model försvinner och skickar användarnamnet till deleteUser.
        $('#modalConfirm').on('click', function () {
            $('#myModal').foundation('reveal', 'close');
            deleteUser(userName);
        })
    }

    // Radera User
    function deleteUser(userName) {
        // Använder ajax för att ta bort användaren
        $.ajax({
            type: 'DELETE',
            url: '/deleteuser/' + userName
            // Får ett promis när ajax requesten är klar
        }).done(function (response) {
            // Kollar om det gick och ta bort användaren, annars skickar ett felmedelenade
            if (response.msg === '') {} else {
                alert('Error: ' + response.msg);
            }
            // Uppdaterar table
            popTable();
        });

    }

});
