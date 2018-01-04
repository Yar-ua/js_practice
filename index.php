<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Practice 13</title>

        <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="https://rawgit.com/wenzhixin/bootstrap-table/master/src/bootstrap-table.css">
   
    <style>
        .tasks {
            padding: 20px;
            padding-left: 40px;
        }
        .loader {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: #000;
            border-radius: 5px;
            opacity: 0.3;
            text-align: center;
            padding: 20px;
            min-height: 140px;
        }
    </style>
    
</head>
<body>
<div class="tasks">
<h4>
Данные для таблицы должны подтягиваться по ajax по url <code>ajax.php</code>.
Номенр текущей страницы должен быть чаcтью url (<i class="text-info">/page1</i>, <i class="text-info">/page2</i>...).<br />
Дожна быть возможность сортировки по всем с толбцам, параметры сортировки записывать как GET параметры (<i class="text-info">sort</i> и <i class="text-info">dir</i>).
Если приложение открыто в нескольких вкладках - то при изменении сортировки - она должна поменяться во всех вкладках.<br />
Когда сайт открывается первый раз (по <a href="http://main.hz/">ссылке</a>) - то в адресной строке должно отображаться <code>http://main.hz/page1</code>,
при этом данный адресс должен быть первым в истории посещений.<br />
Во время загрузки данных нужно отображать лоадер, а потом его скрывать.
</h4>
<br />

<div class="bootstrap-table">
    <div class="fixed-table-container">
        <div class="loader" id="loader"><img src="https://i.giphy.com/Mf9o6Z2CNs1eE.gif" height="100"></div>
        <table id="example" class="table table-striped table-bordered dataTable" cellspacing="0" width="100%" role="grid" aria-describedby="example_info" style="width: 100%;">
            <thead>
                <tr class="info">
                    <th data-field="id">
                        <div class="th-inner sortable both">
                            ID
                        </div>
                    </th>
                    <th data-field="name" dir="asc">
                        <div class="th-inner sortable both desc">
                            Марка
                        </div>
                    </th>
                    <th data-field="year" dir="desc">
                        <div class="th-inner sortable both asc">
                            Год выпуска
                        </div>
                    </th>
                    <th data-field="color">
                        <div class="th-inner sortable both">
                            Цвет
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="value">
                    <td>1</td>
                    <td>Renault Sandero</td>
                    <td>2012</td>
                    <td>Красный</td>
                </tr>
                <tr class="value">
                    <td>2</td>
                    <td>Renault Stepway</td>
                    <td>2015</td>
                    <td>Синий</td>
                </tr>
           
        </table>
    </div>
</div>
<div class="pull-right pagination">
    <ul class="pagination">
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">4</a></li>
        <li class="page-item"><a class="page-link" href="#">5</a></li>
    </ul>
</div>



<script>
// script for task

// скрыть/показать лоадер
function hideLoader(status){
    document.getElementsByClassName('loader')[0].hidden = status;
}


// скрыть существующие строки страницы
function clearTable() {
    a = document.getElementsByClassName('value');
    while (a.length > 0) {
        a[0].remove();
    };
};

// распарсить и присоединить данные полученные аяксом к таблицу
function loadTable(data){
    var tableBody = document.getElementsByTagName('tbody')[0];
    data.forEach(function(element) {

        var tr = document.createElement("tr"); 
        tr.setAttribute("class", "value");

        var newTr = '<td>' + element.id + '</td><td>' + element.name + '</td><td>' + element.year + '</td><td>' + element.color + '</td>';
        tr.innerHTML = newTr;
        tableBody.appendChild(tr);
    });

};


//послать аякс запрос и получить ответ в виде json
function sendAjax (page, sort, dir) {
    hideLoader(false);
    var xhr = new XMLHttpRequest();

    var url = 'http://localhost/ajax.php?page='+page+'&sort='+sort+'&dir='+dir;
    xhr.open('GET', url, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            setTimeout(function() {hideLoader(true)}, 300);
            clearTable();
            data = JSON.parse(xhr.responseText);
            loadTable(data);
        }
    } 
}

// перезагрузка сортировки на всех страницах
window.onblur = function() {
    window.onfocus = function(){
        loadPage();
    }
}

// получить аякс данные по номеру страницы
function getPage(e) {
    var page = e.target.innerHTML;
    history.pushState(page, "New page title", "/page" + page)
    stylePagination(page);
    //sendAjax(page, sort, dir);
    loadPage();
}

// загрузить страницу
function loadPage() {
    //page = localStorage.getItem('page') || 0
    page = location.pathname.split('/')[1].substring(4) || 0
    sort = localStorage.getItem('sort') || 'id'
    dir = localStorage.getItem('dir') || 'asc'
    sendAjax(page, sort, dir)
}


//делаем кнопки пагинации неактивными
function dropPagination(){
    for (var i = 0; i < pags.length; i++){
        pags[i].setAttribute('class', 'page-item');
    }
}

// делаем активной нажатую кнопку
function stylePagination(element){
    dropPagination();
    document.getElementsByClassName('page-item')[element-1].setAttribute('class', 'page-item active');
}


// обработчики событий
// определение коллекции объектов, на которые вешаются обработчики событий
var pags = document.getElementsByClassName('page-item');
var sortBtn = document.getElementsByTagName('th');

// при нажатии на кнопку пагинации
for (var i = 0; i < pags.length; i++){
    pags[i].addEventListener('click', getPage);
}

// при нажатии на кнопку сортировки
for (var i = 0; i < sortBtn.length; i++){
    sortBtn[i].addEventListener('click', function(){
        sort = this.getAttribute('data-field');
        dir = this.getAttribute('dir');
        
        localStorage.setItem("sort", sort);
        localStorage.setItem("dir", dir);
        loadPage();
    });
}




// действия при загрузке DOM
document.addEventListener("DOMContentLoaded", function(event) {
    loadPage();

});


/* 
сделать возможность чередования сортировки
открытие адреса первый раз по ссылке то отображение адреса и изменение истории посещений
*/

</script>
</div>
<br><br><br>



</body>
</html>




