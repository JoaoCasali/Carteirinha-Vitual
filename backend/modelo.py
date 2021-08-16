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

# Classe que representa uma unidade de saúde
class Unidade_Saude(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Nome = db.Column(db.String(200))
    Cep = db.Column(db.String(50))
    Complemento = db.Column(db.String(100))
    CodVerificacao = db.Column(db.String(10)) # Será adiocionado um código para a verificação de funcionários

    def __str__(self):
        return str(self.Id)+ ', ' + self.Nome + ', ' + self.Cep + ', ' + self.Complemento + ', ' + self.CodVerificacao
    
    def json(self):
        return {
            "id": self.Id,
            "nome": self.Nome,
            "Cep": self.Cep,
            "Complemento": self.Complemento,
            "CodVerificacao": self.CodVerificacao
        }

# Classe filho que representa um funcionário da und. de saúde
class Funcionario(Pessoa):
    CodVerificacao = db.Column(db.String(10)) # Certificação do funcionário
    UnidadeSaudeId = db.Column(db.Integer, db.ForeignKey(Unidade_Saude.Id), nullable = False)
    UnidadeSaude = db.relationship('Unidade_Saude') # Associação com a unid. de saúde

    def __str__(self):
        return str(self.Id) + ', ' + self.NomeCompleto + ', ' + self.DtNascimento + ', ' + self.Genero + ', ' + self.Cpf + ', ' + \
        self.Email + ', ' + self.Senha + ', ' + self.CodVerificacao + ', ' + str(self.UnidadeSaudeId)

    def json(self):
        return {
            "id": self.Id,
            "nome": self.NomeCompleto,
            "dt_nascimento": self.DtNascimento,
            "genero": self.Genero,
            "cpf": self.Cpf,
            "email": self.Email,
            "senha": self.Senha,
            "CodVerificacao": self.CodVerificacao,
            "UnidadeSaudeId": self.UnidadeSaudeId,
            "UnidadeSaude": self.UnidadeSaude.json() # Reciclando a função da classe Unidade_Saude
        }

# Bloqueia as seguintes funções quando importado
if __name__ == "__main__":
    
    # Apaga arquivos já existentes para que não tenha repetição de dados
    if os.path.exists(arquivobd):
        os.remove(arquivobd)
    
    db.create_all() # Cria as tabelas do banco de dados

    # Inputs de informações
    us1 = Unidade_Saude(Nome = "Postinho da esquina", Cep = "10475221", Complemento = "Numero 14542", CodVerificacao = "hbf467hefn")
    f1 = Funcionario(NomeCompleto = "João Casali", DtNascimento = "11/07/2003", Genero = "M", Cpf = "052.827.732-44", Email = "joaocasali@gmail.com", \
    Senha = "joaozinho123", UnidadeSaude = us1, CodVerificacao = "hbf467hefn")
    
    # Adiciona na lista de commit
    db.session.add(us1)
    db.session.add(f1)
    db.session.commit() # Grava os dados no banco de dados

    todas = db.session.query(Funcionario).all() # Traz os dados do banco para uma lista 

    # Imprime as informações
    for i in todas:
        print("")
        print(i)
        print(i.json())
        print("")