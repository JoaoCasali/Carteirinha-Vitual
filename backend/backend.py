from config import *
from modelo import Funcionario
@app.route("/")
def padrao():
    return "backend operante"
@app.route("/listar_funcionario")
def listar_funcionarios():
    funcionarios = db.session.query(Funcionario).all()
    retorno = []
    for i in funcionarios:
        retorno.append(i.json())

    resposta = jsonify(retorno)
    return resposta

app.run(debug=True)