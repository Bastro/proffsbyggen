var xl = require('excel4node');

app.get('/Excel', function(req, res){

    var wb = new xl.WorkBook();
    wb.debug=false;

    var ws = wb.WorkSheet('New Worksheet');

    ws.Cell(1,1).String('My String');
ws.Cell(2,1).Number(5);
ws.Cell(2,2).Number(10);
ws.Cell(2,3).Formula("A2+B2");
ws.Cell(2,4).Formula("A2/C2");

wb.write("Test1.xlsx");
