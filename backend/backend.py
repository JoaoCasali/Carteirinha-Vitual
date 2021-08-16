from config import *
from modelo import Pessoa
@app.route("/")
def padrao():
    return "backend operante"
@app.route("/listar_pessoas")
def listar_plantas():
    pessoas = db.session.query(Pessoa).all()
    retorno = []
    for i in pessoas:
        retorno.append(i.json())

    resposta = jsonify(retorno)
    return resposta

app.run(debug=True)