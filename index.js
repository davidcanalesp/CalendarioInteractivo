
let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
let currentDate = new Date ();
let currentDay = currentDate.getDate() //obtiene el número del día del mes de la fecha del ordenador
let dayOfWeek = currentDate.getDay();  //obtnemos el día de la semana donde 0 es domingo, 1 es lunes,... 7 es sábado
let monthNumber=currentDate.getMonth(); //obtenemos el número del mes. Enero: 0, Febrero: 1, ...
let currentYear=currentDate.getFullYear(); 


let dates = document.getElementById('dates'); // es el <div> donde dibujaremos los números de cada día
let month = document.getElementById('month');
let year = document.getElementById('year');
let prevMonth = document.getElementById('prev-month');// <div> con el  triangulito hacia la izquierda
let nextMonth = document.getElementById('next-month');// <div> con el  triangulito hacia la derecha

//Vamos a escribir en el encabezado del calendario el mes y el año

month.textContent= monthNames[monthNumber];
year.textContent= currentYear;

//console.log(startDay())
//console.log(isLeap())
//si imprimimos debemos obtener la fecha de este modo "2---10---2020"
console.log(dayOfWeek+'---'+currentDate+'---'+monthNumber+'---'+currentYear)

prevMonth.addEventListener ("click", ()=> calcPrevMonth() );
nextMonth.addEventListener ("click", () => calcNextMonth());

writeMonth(monthNumber)

///////////////////////////////////////////////////////
//
//        SECCIÓN DE DEFINICIÓN DE FUNCIONES
//
///////////////////////////////////////////////////////

//Función para determinar cuántos días tiene cada mes
function getTotalDays (month)
    {
        //if (month == -1) month = 11;

        if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11)
            return 31;
        else if (month == 3 || month == 5 || month == 8 || month == 10 )
                return 30;
        else return isLeap()? 29 : 28;
    }

//Para pintar los días usaremos la función writeMonth () a la que pasaremos el parámetro "month", el cual
//representa al mes que se indica en el encabezado del calendario.
function writeMonth (month)
    {
        //Veamos en qué día de la semana cae el día primero, supongamos que es el n (con n= 0 hasta n=6)
        //Por tanto necesitamos llenar con los últimos números del mes anterior las primeras n-1 celdas del grid.
        //Por ejemplo, si el día primero del mes es miercoles, debemos llenar las celdas de domingo a martes 
        //con los números de los últimos días del mes anterior, entonces necesitamos saber cuántos días tuvo
        //el mes pasado.
        let anotherDate = new Date ();
        anotherDate.setFullYear(currentYear, month, 1); //establecí una nueva fecha como si  fuera el día primerodel mes
        weekDayFirst = anotherDate.getDay(); //leemos en qué día de la semana cae el día primero
        console.log ('***'+weekDayFirst);
        /*if (dayOfWeek !== 0)
            {*/
                let daysInMonthBefore= getTotalDays (month-1); //pa' saber cuántos días tuvo el mes anterior
                let daysBefore = daysInMonthBefore - weekDayFirst + 1 //Se tiene que sumar 1 por aquello de que el domingo es día cero
                for (let i= daysBefore; i<= daysInMonthBefore; i++)
                    {
                        dates.innerHTML += `<div class='calendar__date calendar__item calendar__pastDays'>${i}</div>`; 
                    }
            //}
        
        //Tener en cuenta que vamos a escribir dentro del <div> con id "dates"
        for(let i=1; i <= getTotalDays(month); i++)
            {
                if (i==currentDay)
                        dates.innerHTML += `<div class='calendar__date calendar__item calendar__today'>${i}</div>`;
                else
                        dates.innerHTML += `<div class='calendar__date calendar__item'>${i}</div>`;
            }
    }

//isLeap() devuelve true si el año es bisiesto y false si no lo es
function isLeap()
    {
        return ((currentYear % 4)===0 )
    }

//startDay() regresa en qué día de la semana fue el día primero del mes actual. Se considera al Domingo  como el día 0    
function startDay ()
    {
        let start = new Date (currentYear, monthNumber, 1);
        return (start.getDay());
    }

//La siguiente función nos dice qué número de mes fue el mes anterior. Se considera a enero como
//el mes cero y se tiene que hacer el cálculo porque antes del cero va el 11, que corresponde a 
//diciembre, pero además tenemos que considerar que si retrocedimos al mes de diciembre también 
//descontar una unidad al número del año actual.
function calcPrevMonth()
    {
        if (monthNumber !==0) monthNumber--;
        else
            {
                monthNumber=11;
                currentYear--;
            }
        setNewDate()
    }


//De forma semejante al la anterior función ahora debemosnos calcular qué número de mes es el mes siguiente. Se considera a enero como
//el mes cero y se tiene que hacer el cálculo porque después del mes 11 se sigue el mes cero, que corresponde a 
//a enero, pero además tenemos que considerar que si pasamos de diciembre a enero también debemos incrementar
//una unidad al número del año actual.
function calcNextMonth()
    {
        if (monthNumber !==11) monthNumber++;
        else
            {
                monthNumber=0;
                currentYear++;
            }
        setNewDate()
    }


function setNewDate()
    {
        //Para modificar la vista de los  meses (el anterior o el posterior, según hayamos oprimido
        //las flechas "atrás" o "adelante") vamos a usar el mismo objeto que usamos para obtener la 
        //fecha de nuestro PC. Recordad que este objeto obtiene currentYear, monthNumber, y currentYear.
        
        //Ahora modificaremos el valor de currentDay para que represente el mes anterior o el del mes próximo
        currentDate.setFullYear (currentYear, monthNumber, currentDay)
        
        //cambiamos en el encabezado del calendario los valores del mes y año
        month.textContent= monthNames[monthNumber];
        year.textContent= currentYear;
        dates.textContent = '';
        writeMonth (monthNumber); 

    }





    