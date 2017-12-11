$(window).on('load', function() {
         $.ajax({
                 type: 'GET',
                 url: 'http://localhost:3000/items',
                 dataType: 'json',
                 success: function(data) {
                         for (var i=0; i<data.length;i++)
                         {
                                 var tr="<tr>";
                                 var td1="<td>"+data[i]["id"]+"</td>";
                                 var td2="<td>"+data[i]["name"]+"</td>";
                                 var td3="<td>"+data[i]["birth rate per 1000"]+"</td>";
                                 var td4="<td>"+data[i]["cell phones per 100"]+"</td>";
                                 var td5="<td>"+data[i]["children per woman"]+"</td>";
                                 var td6="<td>"+data[i]["electricity consumption per capita"]+"</td>";
                                 var td7="<td>"+data[i]["internet user per 100"]+"</td></tr>";
                                 /*var td8="<td>"+obj[i]["id"]+"</td>";
                                 var td9="<td>"+obj[i]["id"]+"</td>";
                                 var td10="<td>"+obj[i]["id"]+"</td>";
                                 var td11="<td>"+obj[i]["id"]+"</td>";
                                 var td12="<td>"+obj[i]["id"]+"</td>";
                                 var td13="<td>"+obj[i]["id"]+"</td>";
                                 var td14="<td>"+obj[i]["id"]+"</td>"; */
                                 $("#table_body").append(tr+td1+td2+td3+td4+td5+td6+td7);

                         }

                 }
    });

    $.ajax({
                 type: 'GET',
                 url: 'http://localhost:3000/properties',
                 dataType: 'json',
                 success: function(data) {
                         var opt1 = "<option>"+data[0]+"</option>";
                         var opt2 = "<option>"+data[1]+"</option>";
                         var opt3 = "<option>"+data[2]+"</option>";
                         var opt4 = "<option>"+data[3]+"</option>";
                         var opt5 = "<option>"+data[4]+"</option>";
                         var opt6 = "<option>"+data[5]+"</option>";
                         var opt7 = "<option>"+data[6]+"</option>";
                         var opt8 = "<option>"+data[7]+"</option>";
                         var opt9 = "<option>"+data[8]+"</option>";
                         var opt10 = "<option>"+data[9]+"</option>";
                         var opt11 = "<option>"+data[10]+"</option>";
                         var opt12 = "<option>"+data[11]+"</option>";
                         var opt13 = "<option>"+data[12]+"</option>";
                         var opt14 = "<option>"+data[13]+"</option>";
                         $("#prop_selection").append(opt1+opt2+opt3+opt4+opt5+opt6+opt7+opt8+opt9+opt10+opt11+opt12+opt13+opt14);
                 }
    });
});

$("#filter_submit").on('click', function() {
         var input = document.getElementById("country_filter_id");
         var inputrange = document.getElementById("country_filter_range");
         if (inputrange.value)
         {
                 var values = inputrange.value.split("-");
                 $.ajax({
                 type: 'GET',
                 url: 'http://localhost:3000/items/'+values[0]+'/'+values[1],
                 dataType: 'json',
                 success: function(data) {
                 for (var i=0; i<data.length;i++)
                         {
                                 var tr="<tr>";
                                 var td1="<td>"+data[i]["id"]+"</td>";
                                 var td2="<td>"+data[i]["name"]+"</td>";
                                 var td3="<td>"+data[i]["birth rate per 1000"]+"</td>";
                                 var td4="<td>"+data[i]["cell phones per 100"]+"</td>";
                                 var td5="<td>"+data[i]["children per woman"]+"</td>";
                                 var td6="<td>"+data[i]["electricity consumption per capita"]+"</td>";
                                 var td7="<td>"+data[i]["internet user per 100"]+"</td></tr>";
                                 /*var td8="<td>"+obj[i]["id"]+"</td>";
                                 var td9="<td>"+obj[i]["id"]+"</td>";
                                 var td10="<td>"+obj[i]["id"]+"</td>";
                                 var td11="<td>"+obj[i]["id"]+"</td>";
                                 var td12="<td>"+obj[i]["id"]+"</td>";
                                 var td13="<td>"+obj[i]["id"]+"</td>";
                                 var td14="<td>"+obj[i]["id"]+"</td>"; */
                                 $("#table_body").append(tr+td1+td2+td3+td4+td5+td6+td7);

                         }
                 }
    });
         }
         if (input.value)
         {
                 $.ajax({
                 type: 'GET',
                 url: 'http://localhost:3000/items'+input.value,
                 dataType: 'json',
                 success: function(data) {
                         var tr="<tr>";
                         var td1="<td>"+data["id"]+"</td>";
                         var td2="<td>"+data["name"]+"</td>";
                         var td3="<td>"+data["birth rate per 1000"]+"</td>";
                         var td4="<td>"+data["cell phones per 100"]+"</td>";
                         var td5="<td>"+data["children per woman"]+"</td>";
                         var td6="<td>"+data["electricity consumption per capita"]+"</td>";
                         var td7="<td>"+data["internet user per 100"]+"</td></tr>";
                         $("#table_body").append(tr+td1+td2+td3+td4+td5+td6+td7);
                 }
    });
    }
});

$("#add_submit").on('click', function() {
          var obj = {};
          var id = document.getElementById
          var senddata = JSON.stringify(obj);
          $.ajax({
                 type: 'POST',
                 url: 'http://localhost:3000/items',
                 contentType: 'application/json',
                 dataType: 'json',
                 data: obj,
                 success: function(data) {
                         alert(data);
                 },
                 error: function(request,msg,error) {
                         alert("error");
                 }
                 });
});

$("#rm_submit").on('click', function() {
         var input = document.getElementById("country_delete_id");
         if (input && input.value)
         {
                 $.ajax({
                 type: 'DELETE',
                 url: 'http://localhost:3000/items/'+input.value,
                 contentType: 'application/json',
                 success: function(data) {
                         alert(data);
                 },
                 error: function(request,msg,error) {
                         alert("error");
                 }
                 });
         }
         else
         {
                 $.ajax({
                 type: 'DELETE',
                 url: 'http://localhost:3000/items',
                 contentType: 'application/json',
                 success: function(data) {
                         alert(data);
                 },
                 error: function(request,msg,error) {
                         alert("error");
                 }
    });
         }

});