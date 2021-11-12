from ast import Num
from config import *

# Classe pai para funcionário e cidadão
class Pessoa(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    NomeCompleto = db.Column(db.String(200))
    DtNascimento = db.Column(db.String(100))
    Genero = db.Column(db.String(1))
    Cpf = db.Column(db.String(100))
    Email = db.Column(db.String(100))
    Senha = db.Column(db.String(100))
    Type = db.Column(db.String(50)) # Discriminador
    __mapper_args__ = {
        'polymorphic_identity':'pessoa', 
        'polymorphic_on':Type # nome do campo que vincula os filhos
    }
    def __str__(self):
        return f'{self.Id}, {self.NomeCompleto}, {self.DtNascimento}, {self.Genero}, {self.Cpf}, {self.Email}, {self.Senha}'
        
# Classe que representa uma unidade de saúde
class Unidade_Saude(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Nome = db.Column(db.String(200))
    Email = db.Column(db.String(100))
    Senha = db.Column(db.String(100))
    Cep = db.Column(db.String(50))
    Complemento = db.Column(db.String(100))

    # Formatação do print no terminal
    def __str__(self):
        return f'{str(self.Id)}, {self.Nome}, {self.Cep}, {self.Complemento}'
    
    # Criando arquivo Json para envio
    def json(self):
        return {
            "Id": self.Id,
            "Nome": self.Nome,
            "Cep": self.Cep,
            "Complemento": self.Complemento,
            "Email": self.Email,
            "Senha": self.Senha,
        }

# Classe filho que representa um funcionário da und. de saúde
class Funcionario(Pessoa):
    UnidadeSaudeId = db.Column(db.Integer, db.ForeignKey(Unidade_Saude.Id), nullable = True)
    UnidadeSaude = db.relationship('Unidade_Saude') # Associação com a unid. de saúde
    __mapper_args__ = { 
        'polymorphic_identity':'funcionario',
    }

    # Formatação do print no terminal
    def __str__(self):
        return f'{super().__str__()}, {str(self.UnidadeSaudeId)}, {str(self.UnidadeSaude)}, {self.Type}' 

    # Criando arquivo Json para envio
    def json(self):
        return {
            "Id": self.Id,
            "NomeCompleto": self.NomeCompleto,
            "DtNascimento": self.DtNascimento,
            "Genero": self.Genero,
            "Cpf": self.Cpf,
            "Email": self.Email,
            "Senha": self.Senha,
            "UnidadeSaudeId": self.UnidadeSaudeId,
            "UnidadeSaude": self.UnidadeSaude.json(), # Reciclando a função da classe Unidade_Saude
            "Type": self.Type
        }
# Classe filho que representa um cliente da und. de saúde       
class Cidadao(Pessoa):
    Cep = db.Column(db.String(50))
    Complemento = db.Column(db.String(50))
    temComorbidades = db.Column(db.Boolean)
    TipoComorbidades = db.Column(db.String(200))
    __mapper_args__ = { 
        'polymorphic_identity':'cidadao',
    }

    # Formatação do print no terminal
    def __str__(self):
        return f'{super().__str__()}, {self.Cep}, {self.Complemento}, {str(self.temComorbidades)}, {self.TipoComorbidades}, {self.Type}'
    
    # Criando arquivo Json para envio
    def json(self):
        return {
            "Id": self.Id,
            "NomeCompleto": self.NomeCompleto,
            "DtNascimento": self.DtNascimento,
            "Genero": self.Genero,
            "Cpf": self.Cpf,
            "Email": self.Email,
            "Senha": self.Senha,
            "Cep": self.Cep,
            "Complemento": self.Complemento,
            "temComorbidades": self.temComorbidades,
            "TipoComorbidade": self.TipoComorbidades,
            "Type": self.Type
            }

# Casse que representa os agendamentos de vacina
class Agendamento(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    NomeVacina = db.Column(db.String(200))
    Data = db.Column(db.String(200))
    Status = db.Column(db.String(1)) #Padrão: R - recebido, A - agendado
    # Conexão com o cidadão
    IdCidadao = db.Column(db.Integer, db.ForeignKey(Pessoa.Id), nullable = True)
    Cidadao = db.relationship('Pessoa')
    # Conexão com a unidade de saude
    UnidadeSaudeId = db.Column(db.Integer, db.ForeignKey(Unidade_Saude.Id), nullable = True)
    UnidadeSaude = db.relationship('Unidade_Saude')

    # Formatação do print no terminal
    def __str__(self):
        return f'{str(self.Id)}, {self.NomeVacina}, {self.Data}, {self.Status}, {str(self.IdCidadao)}, {str(self.UnidadeSaudeId)}, {self.Cidadao}, {self.UnidadeSaude}'
    
    # Criando arquivo Json para envio
    def json(self):
        return {
            "Id": self.Id,
            "NomeVacina": self.NomeVacina,
            "Data": self.Data,
            "Status": self.Status,
            "IdCidadao": self.IdCidadao,
            "UnidadeSaudeId": self.UnidadeSaudeId,
            "Cidadao": self.Cidadao.json(),
            "UnidadeSaude": self.UnidadeSaude.json()
            }

# Classe que representa o estoque da Unidade de Saude
class Estoque(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    QtdVacina = db.Column(db.Integer)
    Descricao = db.Column(db.String(200))
    # Conexão com a unidade de saude
    UnidadeSaudeId = db.Column(db.Integer, db.ForeignKey(Unidade_Saude.Id), nullable = True)
    UnidadeSaude = db.relationship('Unidade_Saude')

    # Formatação do print no terminal
    def __str__(self):
        return f'{str(self.Id)}, {self.QtdVacina}, {self.Descricao}, {str(self.UnidadeSaudeId)}, {self.UnidadeSaude}'
    
    # Criando arquivo Json para envio
    def json(self):
        return {
            "Id": self.Id,
            "QtdVacina": self.QtdVacina,
            "Descricao": self.Descricao,
            "UnidadeSaudeId": self.UnidadeSaudeId,
            "UnidadeSaude": self.UnidadeSaude.json()
            }

class Vacina(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    NomeVacina = db.Column(db.String(50))
    Data = db.Column(db.String(10))
    Status = db.Column(db.String(1)) #Padrão: R - recebido, A - agendado
    # Conexão com o cidadão
    CidadaoId = db.Column(db.Integer, db.ForeignKey(Cidadao.Id), nullable = True)
    Cidadao = db.relationship('Cidadao')
    
    # Formatação do print no terminal
    def __str__(self):
        return f'{str(self.Id)}, {self.NomeVacina}, {self.Data}, {str(self.Status)}, {self.CidadaoId} {self.Cidadao}'
    
    # Criando arquivo Json para envio
    def json(self):
        return {
            "Id": self.Id,
            "NomeVacina": self.NomeVacina,
            "Data": self.Data,
            "Status": self.Status,
            "Cidadao": self.CidadaoId,
            "CidadaoId": self.Cidadao.json()
            }

# Bloqueia as seguintes funções quando importado
if __name__ == "__main__":
    
    # Apaga arquivos já existentes para que não tenha repetição de dados
    if os.path.exists(arquivobd):
        os.remove(arquivobd)
    
    db.create_all() # Cria as tabelas do banco de dados

    # Inputs de informações
    us1 = Unidade_Saude(Nome = "Postinho da esquina", Cep = "10475221", Complemento = "Numero 14542", Email = "postinho@gmail.com", Senha = "postinho123")
    us2 = Unidade_Saude(Nome = "Posto A", Cep = "12345-678", Complemento = "Numero 1549", Email = "postoA@gmail.com", Senha = "postAC123")
    us3 = Unidade_Saude(Nome = "Posto B", Cep = "87654-321", Complemento = "Numero 753", Email = "postoB@gmail.com", Senha = "postoB123")
    us4 = Unidade_Saude(Nome = "Posto C", Cep = "87456-321", Complemento = "Numero 159", Email = "postoC@gmail.com", Senha = "postoC123")

    f1 = Funcionario(NomeCompleto = "João Casali", DtNascimento = "2003-07-11", Genero = "M", Cpf = "052.827.732-44", Email = "joaocasali@gmail.com", \
    Senha = "joaozinho123", UnidadeSaude = us1)
    f2 = Funcionario(NomeCompleto = "Funcionario A", DtNascimento = "1999-11-11", Genero = "F", Cpf = "123.456.789-55", Email = "funcionario.01@gmail.com", \
    Senha = "funcionario1", UnidadeSaude = us2)
    f3 = Funcionario(NomeCompleto = "Funcionario B", DtNascimento = "2000-10-10", Genero = "M", Cpf = "234.567.891-33", Email = "funcionario.02@gmail.com", \
    Senha = "funcionario2", UnidadeSaude = us3)
    f4 = Funcionario(NomeCompleto = "Funcionario C", DtNascimento = "1975-08-25", Genero = "F", Cpf = "147.258.369-24", Email = "funcionario.03@gmail.com", \
    Senha = "funcionario3", UnidadeSaude = us4)

    c1 = Cidadao(NomeCompleto = "Djenifer Lima", DtNascimento = "2003-05-20", Genero = "F", Cpf = "180.728.569-58", Email = "limadjenifer@gmail.com", \
    Senha = "joaolindoS2", Cep = "16476261", Complemento = "ap 666", temComorbidades = True, TipoComorbidades = "Cardiopatia|miope|Feia")
    c2 = Cidadao(NomeCompleto = "Cidadão A", DtNascimento = "1980-08-08", Genero = "M", Cpf = "943.167.248-51", Email = "cidadao.01@gmail.com", \
    Senha = "cidadao1", Cep = "16385563", Complemento = "numero 154", temComorbidades = False)
    c3 = Cidadao(NomeCompleto = "Cidadão B", DtNascimento = "1845-07-07", Genero = "F", Cpf = "485.326.256-12", Email = "cidadao.02@gmail.com", \
    Senha = "cidadao2", Cep = "34587711", Complemento = "lote 12", temComorbidades = False)
    c4 = Cidadao(NomeCompleto = "Cidadão C", DtNascimento = "2000-11-06", Genero = "F", Cpf = "001-002-006-45", Email = "cidadao.03@gmail.com", \
    Senha = "cidadao3", Cep = "23698714", Complemento = "numero 45821", temComorbidades = True, TipoComorbidades = "Insuficiencia renal")

    a1 = Agendamento(NomeVacina = "Covid-19", Data = "2021-09-27", Status = "A", Cidadao = c1, UnidadeSaude = us1)

    e1 = Estoque(QtdVacina = "300", Descricao = "Covid-19 pfizer", UnidadeSaude = us1)

    v1 = Vacina(NomeVacina = "Hepatite B", Data = "10/10/2010", Status = "A", Cidadao = c1)
    v2 = Vacina(NomeVacina = "Influenza", Data = "11/10/2010", Status = "R", Cidadao = c1)
    v3 = Vacina(NomeVacina = "Tetravalente", Data = "12/10/2010", Status = "R", Cidadao = c1)
    v4 = Vacina(NomeVacina = "DT", Data = "13/10/2010", Status = "R", Cidadao = c1)
    v5 = Vacina(NomeVacina = "Pneumococo", Data = "14/10/2010", Status = "R", Cidadao = c1)
    v6 = Vacina(NomeVacina = "VOP", Data = "15/10/2010", Status = "A", Cidadao = c1)
    v7 = Vacina(NomeVacina = "BCG", Data = "10/10/1980", Status = "R", Cidadao = c2)
    v8 = Vacina(NomeVacina = "Hepatite B", Data = "12/10/1980", Status = "R", Cidadao = c2)
    v9 = Vacina(NomeVacina = "Tetravalente", Data = "20/10/2000", Status = "R", Cidadao = c2)
    v10 = Vacina(NomeVacina = "Febre Amarela", Data = "13/10/2000", Status = "R", Cidadao = c2)
    v11 = Vacina(NomeVacina = "Pneumococo", Data = "14/10/2020", Status = "R", Cidadao = c3)
    v12 = Vacina(NomeVacina = "Influenza", Data = "20/11/2021", Status = "A", Cidadao = c3)
    v13 = Vacina(NomeVacina = "BCG", Data = "06/11/2000", Status = "R", Cidadao = c4)
    v14 = Vacina(NomeVacina = "Hepatite B", Data = "06/11/2000", Status = "R", Cidadao = c4)
    v15 = Vacina(NomeVacina = "VORH", Data = "16/12/2000", Status = "R", Cidadao = c4)
    v16 = Vacina(NomeVacina = "Tetravalente", Data = "13/10/2002", Status = "R", Cidadao = c4)
    v17 = Vacina(NomeVacina = "HPV", Data = "08/10/2015", Status = "R", Cidadao = c4)
    v18 = Vacina(NomeVacina = "HPV", Data = "08/11/2015", Status = "R", Cidadao = c4)
    v19 = Vacina(NomeVacina = "HPV", Data = "10/12/2015", Status = "R", Cidadao = c4)


    
    # Adiciona na lista de commit
    db.session.add(us1)
    db.session.add(us2)
    db.session.add(us3)
    db.session.add(us4)
    db.session.add(f1)
    db.session.add(f2)
    db.session.add(f3)
    db.session.add(f4)
    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(a1)
    db.session.add(e1)
    db.session.add(v1)
    db.session.add(v2)
    db.session.add(v3)
    db.session.add(v4)
    db.session.add(v5)
    db.session.add(v6)
    db.session.add(v7)
    db.session.add(v8)
    db.session.add(v9)
    db.session.add(v10)
    db.session.add(v11)
    db.session.add(v12)
    db.session.add(v13)
    db.session.add(v14)
    db.session.add(v15)
    db.session.add(v16)
    db.session.add(v17)
    db.session.add(v18)
    db.session.add(v19)
    db.session.commit() # Grava os dados no banco de dados

    TodosPessoa = db.session.query(Pessoa).all() # Traz os dados do banco para uma lista 
    # Imprime as informações
    print("")
    for i in TodosPessoa:
        print(i)
        print(i.json())
        print("")

    TodosAgendamento = db.session.query(Agendamento).all()
    for i in TodosAgendamento:
        print(i)
        print(i.json())
        print("")
    
    TodosEstoque = db.session.query(Estoque).all()
    for i in TodosEstoque:
        print(i)
        print(i.json())
        print("")

    TodosVacina = db.session.query(Vacina).all()
    for i in TodosVacina:
        print(i)
        print(i.json())
        print("")
    