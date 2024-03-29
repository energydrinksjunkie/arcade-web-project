var xmlDoc;
var games;

function loadXML()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
       xmlDoc = xhttp.responseXML;
       games=xmlDoc.getElementsByTagName("GAME");
       pocetna();
       logout();
       kategorije();
       developeri();
      }
    };
    xhttp.open("GET", "games.xml", true);
    xhttp.send();
}

setInterval(naslov, 1000);
var y=0;

function naslov()
{
    y++;
    if(y>5)
    {
        document.getElementById(5).style.color="rgba(251,63,63,1)";
        document.getElementById(5).style.textShadow="3px 7px rgba(174,70,252,1)";
        y=0;
    }
    var i;
    for(i=0;i<y+1;i++)
    {
        document.getElementById(i).style.color="rgba(251,63,63,1)";
        document.getElementById(i).style.textShadow="3px 7px rgba(174,70,252,1)";
    }
    document.getElementById(y).style.color="rgba(174,70,252,1)";
    document.getElementById(y).style.textShadow="3px 7px rgba(251,63,63,1)";
    
}

function kategorije()
{
    sveLista=document.getElementById("selectKategorija");
    kategorije=new Array();
    var i;
    for(i=0;i<games.length;i++)
    {
        kategorija=games[i].getElementsByTagName("CATEGORY")[0].childNodes[0].nodeValue;
        if(kategorije.indexOf(kategorija)===-1)
        {
            sveLista.innerHTML+="<option>"+kategorija+"</option>";
            kategorije.push(kategorija);
        }
    }
}

function developeri()
{
    selectDev=document.getElementById("selectDeveloper");
    devs=new Array();
    var i;
    for(i=0;i<games.length;i++)
    {
        developer=games[i].getElementsByTagName("DEVELOPER")[0].childNodes[0].nodeValue;
        if(devs.indexOf(developer)===-1)
        {
            selectDev.innerHTML+="<option>"+developer+"</option>";
            devs.push(developer);
        }
    }
    
}

function login()
{
    loginForma=document.getElementById("ulogujse");
    ulogovanForma=document.getElementById("ulogovan");
    avatar=document.getElementById("avatar").value;
    username=document.getElementById("user").value;
    password=document.getElementById("pass").value;
    email=document.getElementById("email").value;
    rodj=document.getElementById("birthday");
    drzava=document.getElementById("country").value;
    
    
    avatarSlika=document.getElementById("avatarSlika");
    usernameLog=document.getElementById("usernameUlogovan");
    emailLog=document.getElementById("emailUlogovan");
    drzavaLog=document.getElementById("drzavaUlogovan");
    godine=document.getElementById("godineUlogovan");
    avatarSlika=document.getElementById("avatarSlika");
    
    
    if(proveri(username, password, email, rodj, drzava, avatar))
    {
        
        usernameLog.innerHTML=username;
        emailLog.innerHTML=email;
        drzavaLog.innerHTML=drzava;
        rodjendan=new Date(rodj.value);
        god=new Date();
        godd=god.getFullYear()-rodjendan.getFullYear();
        godine.innerHTML=godd;
        avatarSlika.src=avatar;
        loginForma.style.display="none";
        ulogovanForma.style.display="block";
    }
}

function proveri(username, password, email, rodj, drzava, avatar)
{
    ind=1;
    userImg=document.getElementById("userImg");
    passImg=document.getElementById("passImg");
    emailImg=document.getElementById("emailImg");
    rodjImg=document.getElementById("rodjImg");
    drzavaImg=document.getElementById("drzavaImg");
    userReg=/^[a-zA-Z0-9\_\.]{6,12}$/;
    if(!userReg.test(username))
    {
        userImg.style.display="inline";
        ind=0;
    }
    else
    {
        userImg.style.display="none";
    }
    passReg=/^[a-zA-Z0-9\_\.\$\@\#\&\-\+]{6,18}$/;
    if(!passReg.test(password))
    {
        passImg.style.display="inline";
        ind=0;
    }
    else
    {
        passImg.style.display="none";
    }
    emailReg=/^[a-z0-9\_\.\-]{5,12}@[a-z0-9\-\.]{3,7}\.[a-z]{2,3}$/;
    if(!emailReg.test(email))
    {
        emailImg.style.display="inline";
        ind=0;
    }
    else
    {
        emailImg.style.display="none";
    }
    if(drzava==="Izaberite drzavu")
    {
        drzavaImg.style.display="inline";
        ind=0;
    }
    else
    {
        drzavaImg.style.display="none";
    }
    danas=new Date();
    rodjendan=new Date(rodj.value);
    if(rodjendan>danas || rodj.value==="")
    {
        rodjImg.style.display="inline";
        ind=0;
    }
    else
    {
        rodjImg.style.display="none";
    }
    if(avatar==="")
    {
        this.avatar="img/background1.gif";
    }
    
    if(ind)
    {
        return true;
    }
    return false;
}

function logout()
{
    loginForma=document.getElementById("ulogujse");
    ulogovanForma=document.getElementById("ulogovan");
    ulogovanForma.style.display="none";
    loginForma.style.display="block";
    
        
    userImg=document.getElementById("userImg");
    passImg=document.getElementById("passImg");
    emailImg=document.getElementById("emailImg");
    rodjImg=document.getElementById("rodjImg");
    drzavaImg=document.getElementById("drzavaImg");
    userImg.style.display="none";
    passImg.style.display="none";
    emailImg.style.display="none";
    rodjImg.style.display="none";
    drzavaImg.style.display="none";
}

function prikaziSve()
{
    filter();
    prikaz=document.getElementById("prikaziIgricu");
    main=document.getElementById("main");
    sve=document.getElementById("prikaziSve");
    prikaz.style.display="none";
    main.style.display="none";
    sve.style.display="block";
}

function pocetna()
{
    prikaz=document.getElementById("prikaziIgricu");
    main=document.getElementById("main");
    sve=document.getElementById("prikaziSve");
    prikaz.style.display="none";
    main.style.display="block";
    sve.style.display="none";
}

function filter()
{
    tabela=document.getElementById("tabela");
    search=document.getElementById("search").value;
    regEx= new RegExp(search,"ig");
    dev=document.getElementById("selectDeveloper").value;
    category=document.getElementById("selectKategorija").value;
    data="<tr><th>Naziv</th><th>Developer</th><th>Kategorija</th><th>Datum izlaska</th></tr>";
    var i;
    for(i=0;i<games.length;i++)
    {
        naziv=games[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
        developer=games[i].getElementsByTagName("DEVELOPER")[0].childNodes[0].nodeValue;
        kategorija=games[i].getElementsByTagName("CATEGORY")[0].childNodes[0].nodeValue;
        releaseDate=games[i].getElementsByTagName("RELEASED")[0].childNodes[0].nodeValue;
        if(regEx.test(naziv))
        {
            if(dev==="Izaberi" && category==="Izaberi")
            {
                data+="<tr onclick='prikazi("+i+")'><td>"+naziv+"</td><td>"+developer+"</td><td>"+kategorija+"</td><td>"+releaseDate+"</td></tr>";
            }
            else if(dev===developer && category==="Izaberi")
            {
                data+="<tr onclick='prikazi("+i+")'><td>"+naziv+"</td><td>"+developer+"</td><td>"+kategorija+"</td><td>"+releaseDate+"</td></tr>";
            }
            else if(dev==="Izaberi" && category===kategorija)
            {
                data+="<tr onclick='prikazi("+i+")'><td>"+naziv+"</td><td>"+developer+"</td><td>"+kategorija+"</td><td>"+releaseDate+"</td></tr>";
            }
            else if(dev===developer && category===kategorija)
            {
                data+="<tr onclick='prikazi("+i+")'><td>"+naziv+"</td><td>"+developer+"</td><td>"+kategorija+"</td><td>"+releaseDate+"</td></tr>";
            }
        }
        
    }
    tabela.innerHTML=data;
}

function prikazi(x)
{
    naziv=games[x].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
    developer=games[x].getElementsByTagName("DEVELOPER")[0].childNodes[0].nodeValue;
    kategorija=games[x].getElementsByTagName("CATEGORY")[0].childNodes[0].nodeValue;
    releaseDate=games[x].getElementsByTagName("RELEASED")[0].childNodes[0].nodeValue;
    img=games[x].getElementsByTagName("IMG")[0].childNodes[0].nodeValue;
    desc=games[x].getElementsByTagName("DESC")[0].childNodes[0].nodeValue;
    
    naslovIgre=document.getElementById("naslovIgre");
    developerIgre=document.getElementById("developerIgre");
    releaseIgre=document.getElementById("releaseIgre");
    slikaIgre=document.getElementById("slikaIgre");
    descIgre=document.getElementById("descIgre");
    
    naslovIgre.innerHTML=naziv+"_";
    developerIgre.innerHTML=developer;
    releaseIgre.innerHTML=releaseDate;
    slikaIgre.src=img;
    descIgre.innerHTML=desc;
    
    prikaz=document.getElementById("prikaziIgricu");
    main=document.getElementById("main");
    sve=document.getElementById("prikaziSve");
    main.style.display="none";
    sve.style.display="none";
    prikaz.style.display="block";
}