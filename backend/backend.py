from config import *
from modelo import Pessoa, Agendamento
@app.route("/")
def padrao():
    return "backend operante"
@app.route("/listar_pessoas")
def listar_pessoas():
    Pessoas = db.session.query(Pessoa).all()
    retorno = []
    for i in Pessoas:
        retorno.append(i.json())

    resposta = jsonify(retorno)
    return resposta
@app.route("/listar_agendamentos")
def listar_agendamentos():
    Agendamentos = db.session.query(Agendamento).all()
    retorno = []
    for i in Agendamentos:
        retorno.append(i.json())

    resposta = jsonify(retorno)
    return resposta

app.run(debug=True)