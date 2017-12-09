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
    alert("hello");
    var data = {};
    data.id = "77";
    data.name = "Greece";
    $.ajax({
                 type: 'DELETE',
                 url: 'http://localhost:3000/items',
                 contentType: 'application/json',
                 //data: JSON.stringify(data),
                 success: function(data) {
                         alert(data);
                 },
                 error: function(jqXHR, text, err) {
                         alert("error");
                 }
    });
});
