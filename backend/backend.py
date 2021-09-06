from config import *
from modelo import Pessoa, Agendamento
@app.route("/")
def padrao():
    return "backend operante"

@app.route("/listar_pessoas")
def listar_pessoas():
    pessoas = db.session.query(Pessoa).all()
    retorno = []
    for i in pessoas:
        retorno.append(i.json())

    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/listar_agendamentos")
def listar_agendamentos():
    agendamentos = db.session.query(Agendamento).all()
    retorno = []
    for i in agendamentos:
        retorno.append(i.json())

    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)