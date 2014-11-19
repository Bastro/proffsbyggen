<!doctype html>
<html class="no-js" lang="en">

<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Foundation 5.4.7 | Welcome</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.4.7/css/foundation.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.4.7/js/vendor/modernizr.js"></script>
<link rel="stylesheet" type="text/css" href="/jquery.datetimepicker.css"/ >
</head>

<body>
<form>
  <div class="row">
    <div class="large-6 columns">
      <label>Projekt:
        <input type="text" placeholder="" />
      </label>
    </div>
  </div>
  <div class="row">
    <div class="large-6 columns">
      <label>Arbetsmoment:
        <input type="text" placeholder="" />
      </label>
    </div>
    <div class="large-6 columns">
      <label>Material från bussen:
        <input type="text" placeholder="" />
      </label>
    </div>
    <div class="large-4 columns">
      <div class="row collapse">
      </div>
    </div>
  </div>
  <div class="row">
    <div class="large-2 columns">
      <label>Antal Timmar:
        <select>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
        </select>
      </label>
      <label>Antal Resor:
        <select>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
        </select>
      </label>
    </div>
  </div>
</div>

    <input type="date" name="Datum">

</form>
</body>
<script src="js/jquery-1.8.1,min.js"></script>
<script src="js/jquery-ui.js"></script>

<script>
    $('#Datum').datepicker();
</script>

</html>
