Element.prototype.clear = function()
{
    this.innerHTML = "";
};

Element.prototype.hide = function()
{
    this.style.display = 'none';
};

Element.prototype.show = function()
{
    this.style.display = 'block';
};
 
Element.prototype.add = function
(
    type,
    className
)
{
    var element = document.createElement(type);
    if(className !== undefined){
        element.className = className;
    }
    this.appendChild(element);
    return element;
};

Element.prototype.addList = function
(
    list,
    className
)
{
    for(var i=0; i< list.length; i++)
    {
        var element = this.add("li", className);
        element.addText(list[i]);    
    }
};

Element.prototype.addMultiple = function
(
    number,
    className
)
{
    for(var i=0; i< number; i++)
    {
        var element = this.add("li", className);  
    }
};

Element.prototype.addText = function
(
    text
)
{
    var txt = document.createTextNode(text)
    this.appendChild(txt);
    return txt;
};

Element.prototype.addButton = function
(
    text,
    func
)
{
    var btn = document.createElement('input');
    btn.type = "button";
    btn.value = text;
    btn.onclick = func;
    this.appendChild(btn);
    return btn;
};

