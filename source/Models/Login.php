<?php 
class Login
{
    private $conn;
    
    public function __construct()
    {
        require_once 'source/Config.php';

        // Chamando o método connect da classe Database e inicializando um link de conexão
        $this->conn = connect();
    }

    /*
        ->> Operação de leitura
        ->> Quando chamado, este método retorna um registro no BD
    */
    public function login($usuario, $senha){
        $stmt = $this->conn->prepare("SELECT usuario,senha,id FRO9M usuarios WHERE usuario=? AND senha=?");
        $stmt->bindParam(1, $usuario, PDO::PARAM_STR);
        $stmt->bindParam(2, $senha, PDO::PARAM_STR);
        $stmt->execute();

        if ($stmt->rowCount() > 0):
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $_SESSION['usuario'] = $row['usuario'];
                $_SESSION['idAdmin'] = $row['id'];
                header('location:app/homepage.php');
            }
        else:
            // Caso o E-Mail e a Senha forem digitados incorretamente, essa estrutura retorna um aviso de erro
            echo "<h5 id='error'>Usuário ou senha digitado  incorretamente.</h6>";
        endif;
    }
}