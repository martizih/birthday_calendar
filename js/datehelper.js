Date.weekday_string = 
['Mo','Tu','We','Th','Fr','Sa','So'];

Date.month_string =
[    
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

Date.prototype.getString = function()
{
    return this.toISOString().substring(0, 10);
}

Date.prototype.getWeekday = function()
{
    /* MO=0 to SU=6*/
    return ( this.getDay() - 1 ) % 7;
};

Date.prototype.getWeekdayString = function()
{
    var weekdays = this.weekday_string;
    return weekdays[ this.getWeekday() ];
};

Date.prototype.getMonthString = function()
{
    var monthNames = Date.month_string;
    return monthNames[ this.getMonth() ];
};

Date.prototype.getdaysInMonth = function()
{
    var year = this.getFullYear();
    var month = this.getMonth();
    var daysInMonth = [];

    var date = new Date(year,month,1,12,0,0,0);
    for(var i=2; date.getMonth() === month; i++)
    {
        daysInMonth.push(date);
        var date = new Date(year,month,i,12,0,0,0);
    }

    return daysInMonth;
};

function Birthday(jsonObject)
{
    if(jsonObject !== undefined)
    {
        this.date = new Date(jsonObject.birthday);
        this.name = jsonObject.name;
        this.surname = jsonObject.surname;
    }
    this.compare = function(date)
    {
            if
            (
                ( this.date.getMonth() == date.getMonth() ) &&
                ( this.date.getDate() == date.getDate() )
            )
            {
                return true;
            }else{
                return false;
            } 
    };
};
