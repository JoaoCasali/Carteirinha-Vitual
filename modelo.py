from config import *
class Pessoa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    sobrenome = db.Column(db.String(100))
    dt_nascimento = db.Column(db.String(100))
    genero = db.Column(db.String(1))
    cpf = db.Column(db.String(100))
    carteirinha_sus = db.Column(db.String(100))
    endereco = db.Column(db.String(100))
    cidade = db.Column(db.String(100))
    cep = db.Column(db.String(100))
    email = db.Column(db.String(100))
    senha = db.Column(db.String(100))
    def __str__(self):
        return str(self.id)+ ', ' + self.nome + ', '+ self.sobrenome + ', '+ self.dt_nascimento + ', ' + self.genero + ', ' + self.cpf + ', ' + \
        self.carteirinha_sus + ', ' + self.endereco + ', ' + self.cidade + ', ' + self.cep + ', ' + self.email + ', ' + self.senha
    
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "sobrenome": self.sobrenome,
            "dt_nascimento": self.dt_nascimento,
            "genero": self.genero,
            "cpf": self.cpf,
            "carteirinha_sus": self.carteirinha_sus,
            "endereco": self.endereco,
            "cidade": self.cidade,
            "cep": self.cep,
            "email": self.email,
            "senha": self.senha
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

    # todas = db.session.query(Pessoa).all()

    # for i in todas:
    #     print(i)
    #     print(i.json())