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
    Cep = db.Column(db.String(50))
    Complemento = db.Column(db.String(100))
    CodVerificacao = db.Column(db.String(10)) # Será adiocionado um código para a verificação de funcionários

    # Formatação do print no terminal
    def __str__(self):
        return f'{str(self.Id)}, {self.Nome}, {self.Cep}, {self.Complemento}, {self.CodVerificacao}'
    
    # Criando arquivo Json para envio
    def json(self):
        return {
            "Id": self.Id,
            "Nome": self.Nome,
            "Cep": self.Cep,
            "Complemento": self.Complemento,
            "CodVerificacao": self.CodVerificacao
        }

# Classe filho que representa um funcionário da und. de saúde
class Funcionario(Pessoa):
    CodVerificacao = db.Column(db.String(10)) # Certificação do funcionário
    UnidadeSaudeId = db.Column(db.Integer, db.ForeignKey(Unidade_Saude.Id), nullable = True)
    UnidadeSaude = db.relationship('Unidade_Saude') # Associação com a unid. de saúde
    __mapper_args__ = { 
        'polymorphic_identity':'funcionario',
    }

    # Formatação do print no terminal
    def __str__(self):
        return f'{super().__str__()}, {self.CodVerificacao}, {str(self.UnidadeSaudeId)}, {str(self.UnidadeSaude)}, {self.Type}' 

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
            "CodVerificacao": self.CodVerificacao,
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
    Vacina = db.Column(db.String(200))
    DtAgendamento = db.Column(db.String(200))
    # Conexão com o cidadão
    IdCidadao = db.Column(db.Integer, db.ForeignKey(Pessoa.Id), nullable = True)
    Cidadao = db.relationship('Pessoa')
    # Conexão com a unidade de saude
    UnidadeSaudeId = db.Column(db.Integer, db.ForeignKey(Unidade_Saude.Id), nullable = True)
    UnidadeSaude = db.relationship('Unidade_Saude')

    # Formatação do print no terminal
    def __str__(self):
        return f'{str(self.Id)}, {self.Vacina}, {self.DtAgendamento}, {str(self.IdCidadao)}, {str(self.UnidadeSaudeId)}, {self.Cidadao}, {self.UnidadeSaude}'
    
    # Criando arquivo Json para envio
    def json(self):
        return {
            "Id": self.Id,
            "Vacina": self.Vacina,
            "DtAgendamento": self.DtAgendamento,
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

# Bloqueia as seguintes funções quando importado
if __name__ == "__main__":
    
    # Apaga arquivos já existentes para que não tenha repetição de dados
    if os.path.exists(arquivobd):
        os.remove(arquivobd)
    
    db.create_all() # Cria as tabelas do banco de dados

    # Inputs de informações
    us1 = Unidade_Saude(Nome = "Postinho da esquina", Cep = "10475221", Complemento = "Numero 14542", CodVerificacao = "hbf467hefn")
    f1 = Funcionario(NomeCompleto = "João Casali", DtNascimento = "2003-07-11", Genero = "M", Cpf = "052.827.732-44", Email = "joaocasali@gmail.com", \
    Senha = "joaozinho123", UnidadeSaude = us1, CodVerificacao = "hbf467hefn")
    
    c1 = Cidadao(NomeCompleto = "Djenifer Lima", DtNascimento = "2003-05-20", Genero = "F", Cpf = "180.728.569-58", Email = "limadjenifer@gmail.com", \
    Senha = "joaolindoS2", Cep = "16476261", Complemento = "ap 666", temComorbidades = True, TipoComorbidades = "Cardiopatia|miope|Feia")
    a1 = Agendamento(Vacina = "Covid-19", DtAgendamento = "2021-09-27", Cidadao = c1, UnidadeSaude = us1)
    e1 = Estoque(QtdVacina = "300", Descricao = "Covid-19 pfizer", UnidadeSaude = us1)
    # Adiciona na lista de commit
    db.session.add(us1)
    db.session.add(f1)
    db.session.add(c1)
    db.session.add(a1)
    db.session.add(e1)
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
    