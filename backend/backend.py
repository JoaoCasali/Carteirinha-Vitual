import re
from flask.templating import render_template
from sqlalchemy.sql.elements import Null

from werkzeug.utils import secure_filename
from config import *
from modelo import Pessoa, Agendamento, Cidadao, Vacina, Unidade_Saude, Funcionario
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

@app.route("/listar_funcionarios")
def listar_funcionarios():
    funcionarios = db.session.query(Funcionario).all()
    retorno = []
    for i in funcionarios:
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

@app.route("/listar_unidade")
def listar_unidade():
    pessoas = db.session.query(Unidade_Saude).all()
    retorno = []
    for i in pessoas:
        retorno.append(i.json())

    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/incluir_cidadao", methods=['post'])
def incluir_cidadao():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    # Variavel que identifica se tem erros
    semErro = True
    try: # tentar executar a operação
        # Recuperando dados do banco para fazer validação do CPF
        TodasPessoas = db.session.query(Pessoa).all()
        for i in TodasPessoas:
            # Caso o CPF passado já exista no sistema, muda a variavel semErro para False
            if i.Cpf == dados['Cpf']:
                resposta = jsonify({"resultado": "CPF", "detalhes": "CPF duplicado"})
                semErro = False
        # Caso a operação não tenha erros, faz o registro
        if semErro == True:
            nova = Cidadao(**dados) # criar a nova pessoa
            db.session.add(nova) # adicionar no BD
            db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/incluir_funcionario", methods=['post'])
def incluir_funcionario():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    # Variavel que identifica se tem erros
    semErro = True
    try: # tentar executar a operação
        # Recuperando dados do banco para fazer validação do CPF
        Todosfuncionarios = db.session.query(Funcionario).all()
        for i in Todosfuncionarios:
            # Caso o CPF passado já exista no sistema, muda a variavel semErro para False
            if i.Cpf == dados['Cpf']:
                resposta = jsonify({"resultado": "CPF", "detalhes": "CPF duplicado"})
                semErro = False
        # Caso a operação não tenha erros, faz o registro
        if semErro == True:
            nova = Funcionario(**dados) # criar a nova pessoa
            db.session.add(nova) # adicionar no BD
            db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/incluir_unidade", methods=['post'])
def incluir_unidade():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova pessoa
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    # Variavel que identifica se tem erros
    semErro = True
    try: # tentar executar a operação
        # Recuperando dados do banco para fazer validação do CPF
        TodasUnidades = db.session.query(Unidade_Saude).all()
        for i in TodasUnidades:
            # Caso o CPF passado já exista no sistema, muda a variavel semErro para False
            if i.Cep == dados['Cep']:
                resposta = jsonify({"resultado": "CEP", "detalhes": "CEP duplicado"})
                semErro = False
        # Caso a operação não tenha erros, faz o registro
        if semErro == True:
            nova = Unidade_Saude(**dados) # criar a nova pessoa
            db.session.add(nova) # adicionar no BD
            db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
        # informar mensagem de erro
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/login", methods=['post'])
def login():
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    TodasPessoas = db.session.query(Pessoa).all()
    resposta = jsonify({"resultado": "erro", "detalhes": "Usuário não encontrado"})
    for i in TodasPessoas:
        if i.Email == dados['Email'] and i.Senha == dados['Senha']:
            resposta = jsonify({"resultado": "ok", "detalhes": "Usuário encontrado", "usuario": i.json()})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

ALLOWED_EXTENSIONS = set(['png', 'jpeg', 'jpg'])
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload_file", methods=['post'])
def upload_file():
    resposta = jsonify({"mensagem":"tentando..."})
    if request.method == 'POST':
        file_val = request.files['file']
        file_val.filename = request.form['id'] + ".png"
        file_val.save(os.path.join(app.config['UPLOAD_FOLDER']+file_val.filename))
        resposta = jsonify({"mensagem":"ok"})

    return resposta

@app.route("/atualizar_cadastro", methods=['post'])
def atualizar_cadastro():
    
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    cidadao = Cidadao.query.filter_by(Cpf=dados['Cpf']).first()
    cidadao.NomeCompleto = dados['NomeCompleto']
    cidadao.DtNascimento = dados['DtNascimento']
    cidadao.Genero = dados['Genero']
    cidadao.Cpf = dados['Cpf']
    cidadao.Email = dados['Email']
    cidadao.Cep = dados['Cep']
    db.session.commit()
    resposta = jsonify({"resultado": "ok", "detalhes": "Mudanças executadas!", "usuario": cidadao.json()})
    return resposta

@app.route("/listar_vacinas")
def listar_vacinas():
    vacinas = db.session.query(Vacina).all()
    retorno = []
    for i in vacinas:
        retorno.append(i.json())

    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)