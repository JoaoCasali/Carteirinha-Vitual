from ast import Num
from config import *
class Pessoa(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    NomeCompleto = db.Column(db.String(200))
    DtNascimento = db.Column(db.String(100))
    Genero = db.Column(db.String(1))
    Cpf = db.Column(db.String(100))
    Email = db.Column(db.String(100))
    Senha = db.Column(db.String(100))
    def __str__(self):
        return str(self.Id)+ ', ' + self.NomeCompleto + ', ' + self.Dt_Nascimento + ', ' + self.Genero + ', ' + self.Cpf + ', ' + \
        + self.Email + ', ' + self.Senha
    
class Unidade_Saude(db.Model):
    Id = db.Column(db.Integer, primary_key=True)
    Nome = db.Column(db.String(200))
    Cep = db.Column(db.String(100))
    Complemento = db.Column(db.String(100))
    CodVerificacao = db.Column(db.String(10))

    def __str__(self):
        return str(self.Id)+ ', ' + self.Nome + ', ' + self.Cep + ', ' + self.Complemento + ', ' + self.CodVerificacao
    
    def json(self):
        return {
            "id": self.Id,
            "nome": self.NomeCompleto,
            "Cep": self.Cep,
            "Complemento": self.Complemento,
            "CodVerificacao": self.CodVerificacao
        }
class Funcionario(Pessoa):
    CodVerificacao = db.Column(db.String(10))
    UnidadeSaudeId = db.Column(db.Integer, db.ForgeinKey(Unidade_Saude.Id), nullable = False)
    UnidadeSaude = db.relationship('Unidade_Saude')

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
            "UnidadeSaude": self.UnidadeSaude.json()
        }

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)
    db.create_all() 

    p1 = Pessoa(nome = "João", sobrenome = "Casali", dt_nascimento = "11/07/2003", genero = "M", cpf = "052.827.732-44", carteirinha_sus = "3902139",
                endereco = "127 Salto Weish", cidade = "Blumenau", cep = "391203902", email = "joaovitorcasali@gmail.com", senha = "joaozinho",)
    p2 = Pessoa(nome = "Maria", sobrenome = "Marcondes", dt_nascimento = "07/10/1998", genero = "F", cpf = "052.732.827-44", carteirinha_sus = "0983218",
                endereco = "327 Velha", cidade = "Blumenau", cep = "091230213", email = "mariamarcondes@gmail.com", senha = "mariazinha",)

    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()

    todas = db.session.query(Pessoa).all()

    for i in todas:
        print(i)
        print(i.json())