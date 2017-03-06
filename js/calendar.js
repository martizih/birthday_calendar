window.onload = getData();

var myday = new Date(); //now
myday.setDate(1); //begin of month


var dates = [];
var data = [];


function reqListener()
{
  console.log(this.responseText);
}

function populateHTML()
{
    calendar = document.getElementById("calendar");
    calheader = document.getElementById("calheader");
    prev = document.getElementById("prev");
    next = document.getElementById("next");
    days = document.getElementById("days");
    weekdays =  document.getElementById("weekdays");
    text = document.getElementById("text");
    prev.onclick = function(){
        myday.setMonth(myday.getMonth() - 1);
        buildCalendar();
    };
    next.onclick = function(){
        myday.setMonth(myday.getMonth() + 1);
        buildCalendar();
    };
}

function makeStartPage()
{
    populateHTML();
    calendar.show();
    buildCalendar();
}

/* fetch Data from php */
function getData()
{
    var oReq = new XMLHttpRequest();
    oReq.onload = function() {
        data = JSON.parse(this.responseText);
        for(var i=0; i< data.length; i++){
            dates[i] = new Birthday(data[i])
        }

        //var res = alasql('SELECT * FROM ? WHERE name = ?', [data,'Martin']);
        //alert(res[0].name)
        makeStartPage();
    };
    /* Asynchronous Get */
    oReq.open("get", "../php/database.php", true);
    oReq.send();
}            
/* end fetch data */

function buildCalendar()
{
    calheader.clear();
    days.clear();
    weekdays.clear();

    calheader.addText(myday.getMonthString());
    calheader.add("br");
    calheader.addText(myday.getFullYear());

    var daysInMonth = myday.getdaysInMonth();
    var skipdays = (daysInMonth[0]).getWeekday();
    var weekdaysInMonth = Date.weekday_string;

    /* write weekdays as string onto the header */
    weekdays.addList(weekdaysInMonth, "weekdaysInMonth");

    /* skip some weekdays in the beginning of the month */
    days.addMultiple(skipdays, "daysInMonth");

    /* start filling the rest of the calendar */
    for(let i=0; i< daysInMonth.length; i++)
    {
        let day = days.add("li", "daysInMonth");
        day.addText( i + 1 );
        list = getDuedates(daysInMonth[i]);
        if(list.length>0)
        {
            day.onmouseover = onMouseOver(list);
            day.onmouseout = function(){
                text.clear();
            };
            day.style.color = "red";
        }
    }
}

function getDuedates(day)
{
    var list = [];
    //var res = alasql('SELECT * FROM ? WHERE birthday > ? AND birthday < ?', [data, '1993-01-01', '1993-12-31']);
    //alert(res[0].name)

    for(let j=0;j<dates.length;j++){
        if(dates[j].compare(day)){
            list.push(dates[j].name + ' ' + dates[j].surname);
        }
    }
    return list;
}
    
function onMouseOver(list)
{
    return function(){
        var textList = document.createElement("ul");
        for(var i=0; i< list.length; i++){
            textList.addText(list[i]);
            textList.add("br");
        }
        text.appendChild(textList);
    };
}
