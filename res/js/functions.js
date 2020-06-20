async function loadFont() {
    var font_huninn = new FontFace('huninn', 'url("res/font/jf-openhuninn-10.woff2") format("woff2")');
    return await font_huninn.load().then(loaded_face => {
        document.fonts.add(loaded_face);
        document.body.style.fontFamily = "'huninn', '微軟正黑體', 'Microsoft JhengHei', 'PingFang', sans-serif";
        return true;
    });
}

async function antiCheat() {
    let trash = [];
    let f = function(){
        for(var i = 0; i < 55; i++) trash.push(Math.floor(Math.random()*10e15).toString());
        while(trash.length > 100) trash.shift();
        let s = document.createElement("script");
        s.src = ("data:text/javascript;base64," +encodeURIComponent(btoa("var EncodedData=" + JSON.stringify(trash) + ";\ndebugger;\n")));
        document.body.appendChild(s);
        setTimeout(f, 100);
    };
    (()=>{f()})();
}
