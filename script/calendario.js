document.addEventListener('DOMContentLoaded', function() {
    /*função para adicionar os dias do calendário corretamente na tabela*/
    const monthsBR = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
    const tableDays = document.getElementById('dias');
    function GetDaysCalendar(mes,ano){
        document.getElementById('mes').innerHTML = monthsBR[mes];
        document.getElementById('ano').innerHTML = ano;
        /*definindo as funções para primeiro dia da semana e último dia do mês*/
        let firstDayOfWeek = new Date(ano,mes,1).getDay()-1;
        let getLastDayThisMonth = new Date(ano,mes+1,0).getDate();

        /*função para atualizar o dia atual e os meses*/
        for(var i = -firstDayOfWeek,index = 0; i < (42-firstDayOfWeek); i++,index++){   
            let dt = new Date(ano,mes,i);
            let dtNow = new Date();
            let dayTable = tableDays.getElementsByTagName('td')[index];
            dayTable.classList.remove('mes-anterior');
            dayTable.classList.remove('proximo-mes');
            dayTable.classList.remove('dia-atual');
            dayTable.innerHTML = dt.getDate();
            /*função de decisão para definir o dia atual*/
            if(dt.getFullYear() == dtNow.getFullYear() && dt.getMonth() == dtNow.getMonth() && dt.getDate() == dtNow.getDate()){
                dayTable.classList.add('dia-atual');
            }
            /*função que define os meses anteriores ao atual*/
            if(i < 1){
                dayTable.classList.add('mes-anterior');
            }
            /*função que define os próximos meses em relação ao atual*/
            if(i > getLastDayThisMonth){
                dayTable.classList.add('proximo-mes');
            }
        }
    }
    /*comandos para exibir o mês e ano atuais*/
    let now = new Date();
    let mes = now.getMonth();
    let ano = now.getFullYear();
    GetDaysCalendar(mes,ano);
    /*puxando os botões do html pela classe*/
    const botao_proximo = document.getElementById('btn_prev');
    const botao_anterior = document.getElementById('btn_ant');
    /*função para alterar o mês exibido no calendário e retomar a contagem 
    quando passar de dezembro para janeiro e voltar de janeiro para dezembro
    e depois atualizar o mês mostrado.*/
    botao_proximo.onclick = function(){
        mes++;
        if(mes > 11){
            mes= 0;
            ano++;
        }
        GetDaysCalendar(mes,ano);
    };
    botao_anterior.onclick = function(){
        mes--;
        if(mes < 0){
            mes= 11;
            ano--;
        }
        GetDaysCalendar(mes,ano);
    };

});